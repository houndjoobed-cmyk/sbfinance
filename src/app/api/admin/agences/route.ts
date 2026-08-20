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
    const agences = await prisma.agence.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(agences);
  } catch (error) {
    console.error('API Agences GET Error:', error);
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

    const nouvelleAgence = await prisma.agence.create({
      data: {
        nom: data.nom,
        adresse: data.adresse,
        coordonneesGps: data.coordonneesGps || null,
        telephones: data.telephones || [],
        horaires: data.horaires,
        estSiege: data.estSiege ?? false,
      }
    });

    return NextResponse.json(nouvelleAgence, { status: 201 });
  } catch (error) {
    console.error('API Agences POST Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
