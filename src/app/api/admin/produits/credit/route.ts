import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        }
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function GET() {
  try {
    const produitsCredit = await prisma.produitCredit.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(produitsCredit);
  } catch (error) {
    console.error('API ProduitCredit GET Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const data = await request.json();

    let slug = data.slug;
    if (!slug) {
      slug = data.nom
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const newCredit = await prisma.produitCredit.create({
      data: {
        nom: data.nom,
        slug: slug,
        categorie: data.categorie,
        description: data.description,
        cible: data.cible,
        conditions: data.conditions || [],
        garantieExigee: data.garantieExigee,
        piecesAFournir: data.piecesAFournir || [],
        montantMin: data.montantMin ? Number(data.montantMin) : null,
        montantMax: data.montantMax ? Number(data.montantMax) : null,
        dureeMinMois: data.dureeMinMois ? Number(data.dureeMinMois) : null,
        dureeMaxMois: data.dureeMaxMois ? Number(data.dureeMaxMois) : null,
        tauxInteretAnnuel: data.tauxInteretAnnuel || null,
        periodicite: data.periodicite || null,
        fraisEtEpargne: data.fraisEtEpargne || null,
        differeMois: data.differeMois ? Number(data.differeMois) : null,
      }
    });

    return NextResponse.json(newCredit, { status: 201 });
  } catch (error: any) {
    console.error('API ProduitCredit POST Error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ce slug existe déjà.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
