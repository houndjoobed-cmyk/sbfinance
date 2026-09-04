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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET() {
  try {
    const offres = await prisma.offreEmploi.findMany({
      include: {
        _count: {
          select: { candidatures: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(offres);
  } catch (error) {
    console.error('API Offres GET Error:', error);
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

    if (!data.titre || !data.titre.trim()) {
      return NextResponse.json({ error: 'Le titre du poste est requis' }, { status: 400 });
    }

    let slug = data.slug ? slugify(data.slug) : slugify(data.titre);
    if (!slug) slug = `offre-${Date.now()}`;

    // Vérifier l'unicité du slug
    let uniqueSlug = slug;
    let counter = 1;
    while (await prisma.offreEmploi.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const missions = Array.isArray(data.missions) 
      ? data.missions.filter((m: any) => typeof m === 'string' && m.trim().length > 0)
      : [];

    const profil = Array.isArray(data.profil) 
      ? data.profil.filter((p: any) => typeof p === 'string' && p.trim().length > 0)
      : [];

    const nouvelleOffre = await prisma.offreEmploi.create({
      data: {
        titre: data.titre.trim(),
        slug: uniqueSlug,
        missions,
        profil,
        dateLimite: data.dateLimite || 'Non précisée',
        estPublie: data.estPublie ?? true,
      }
    });

    return NextResponse.json(nouvelleOffre, { status: 201 });
  } catch (error) {
    console.error('API Offres POST Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
