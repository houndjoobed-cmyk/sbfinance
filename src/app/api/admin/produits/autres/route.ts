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
    const produits = await prisma.produit.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(produits);
  } catch (error) {
    console.error('API Produit GET Error:', error);
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

    const newProduit = await prisma.produit.create({
      data: {
        type: data.type,
        nom: data.nom,
        slug: slug,
        description: data.description,
        contenuDetaille: data.contenuDetaille,
        image: data.image || null,
      }
    });

    return NextResponse.json(newProduit, { status: 201 });
  } catch (error: any) {
    console.error('API Produit POST Error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ce slug existe déjà.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
