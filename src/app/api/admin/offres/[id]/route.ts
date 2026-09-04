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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const offre = await prisma.offreEmploi.findUnique({
      where: { id },
      include: {
        candidatures: {
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { candidatures: true }
        }
      }
    });

    if (!offre) {
      return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 });
    }

    return NextResponse.json(offre);
  } catch (error) {
    console.error('API Offre GET [id] Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    const updateData: Record<string, any> = {};

    if (data.titre !== undefined) updateData.titre = data.titre.trim();
    if (data.dateLimite !== undefined) updateData.dateLimite = data.dateLimite;
    if (data.estPublie !== undefined) updateData.estPublie = Boolean(data.estPublie);

    if (data.slug !== undefined && data.slug.trim()) {
      const newSlug = slugify(data.slug);
      // Vérifier si un autre poste utilise ce slug
      const existing = await prisma.offreEmploi.findFirst({
        where: {
          slug: newSlug,
          NOT: { id }
        }
      });
      if (!existing) {
        updateData.slug = newSlug;
      }
    }

    if (Array.isArray(data.missions)) {
      updateData.missions = data.missions.filter((m: any) => typeof m === 'string' && m.trim().length > 0);
    }

    if (Array.isArray(data.profil)) {
      updateData.profil = data.profil.filter((p: any) => typeof p === 'string' && p.trim().length > 0);
    }

    const updated = await prisma.offreEmploi.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('API Offre PUT [id] Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.offreEmploi.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Offre DELETE [id] Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
