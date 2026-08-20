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

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const data = await request.json();

    const contact = await prisma.demandeContact.update({
      where: { id: params.id },
      data: { estTraite: data.estTraite }
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('API Contacts PUT Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    await prisma.demandeContact.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Contacts DELETE Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
