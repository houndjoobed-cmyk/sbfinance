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
    const temoignage = await prisma.temoignage.findUnique({
      where: { id: params.id }
    });
    if (!temoignage) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
    return NextResponse.json(temoignage);
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

    const temoignage = await prisma.temoignage.update({
      where: { id: params.id },
      data: {
        nomClient: data.nomClient,
        profession: data.profession,
        message: data.message,
        photo: data.photo,
        estAffiche: data.estAffiche,
      }
    });

    return NextResponse.json(temoignage);
  } catch (error) {
    console.error('API Temoignage PUT Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    await prisma.temoignage.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Temoignage DELETE Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
