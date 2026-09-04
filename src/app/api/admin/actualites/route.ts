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
    const actualites = await prisma.actualite.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(actualites);
  } catch (error) {
    console.error('API Actualites GET Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const data = await request.json();
    
    // Auto-generate slug from title if not provided
    let slug = data.slug;
    if (!slug) {
      slug = data.titre
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      // Ensure unique slug
      const existing = await prisma.actualite.findUnique({ where: { slug } });
      if (existing) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const nouvelleActualite = await prisma.actualite.create({
      data: {
        titre: data.titre,
        slug: slug,
        extrait: data.extrait,
        contenu: data.contenu,
        image: data.image || null,
        images: Array.isArray(data.images) ? data.images : [],
        categorie: data.categorie,
        lienExterne: data.lienExterne || null,
        estPublie: data.estPublie ?? true,
      }
    });

    return NextResponse.json(nouvelleActualite, { status: 201 });
  } catch (error: any) {
    console.error('API Actualites POST Error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ce slug existe déjà. Choisissez un titre différent.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
