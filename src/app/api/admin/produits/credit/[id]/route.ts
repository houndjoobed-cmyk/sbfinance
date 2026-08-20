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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const produit = await prisma.produitCredit.findUnique({
      where: { id: params.id }
    });
    if (!produit) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
    return NextResponse.json(produit);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const data = await request.json();

    const produit = await prisma.produitCredit.update({
      where: { id: params.id },
      data: {
        nom: data.nom,
        slug: data.slug,
        categorie: data.categorie,
        description: data.description,
        cible: data.cible,
        conditions: data.conditions,
        garantieExigee: data.garantieExigee,
        piecesAFournir: data.piecesAFournir,
        montantMin: data.montantMin ? Number(data.montantMin) : null,
        montantMax: data.montantMax ? Number(data.montantMax) : null,
        dureeMinMois: data.dureeMinMois ? Number(data.dureeMinMois) : null,
        dureeMaxMois: data.dureeMaxMois ? Number(data.dureeMaxMois) : null,
        tauxInteretAnnuel: data.tauxInteretAnnuel,
        periodicite: data.periodicite,
      }
    });

    return NextResponse.json(produit);
  } catch (error) {
    console.error('API ProduitCredit PUT Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    await prisma.produitCredit.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API ProduitCredit DELETE Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
