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

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const agence = await prisma.agence.findUnique({
      where: { id: params.id }
    });
    
    if (!agence) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });

    return NextResponse.json(agence);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const data = await request.json();

    const agence = await prisma.agence.update({
      where: { id: params.id },
      data: {
        nom: data.nom,
        adresse: data.adresse,
        coordonneesGps: data.coordonneesGps,
        telephones: data.telephones,
        horaires: data.horaires,
        estSiege: data.estSiege,
      }
    });

    return NextResponse.json(agence);
  } catch (error) {
    console.error('API Agences PUT Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    await prisma.agence.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Agences DELETE Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
