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
    const temoignages = await prisma.temoignage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(temoignages);
  } catch (error) {
    console.error('API Temoignage GET Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const data = await request.json();

    const nouveauTemoignage = await prisma.temoignage.create({
      data: {
        nom: data.nom,
        role: data.role || null,
        texte: data.texte,
        photo: data.photo || null,
        estAffiche: data.estAffiche ?? true,
      }
    });

    return NextResponse.json(nouveauTemoignage, { status: 201 });
  } catch (error) {
    console.error('API Temoignage POST Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
