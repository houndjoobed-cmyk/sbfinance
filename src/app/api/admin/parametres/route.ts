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
    const parametres = await prisma.parametresSite.findUnique({
      where: { id: 1 }
    });

    if (!parametres) {
      // Retourne les valeurs par défaut si non trouvé
      return NextResponse.json({
        mission: '',
        vision: '',
        valeurs: [],
        anneeCreation: 2009,
        nombreAgences: 5,
        nombreClients: 0,
        telephonePrincipal: '+229 01 21 38 05 87',
        emailPrincipal: 'contact@sbfinance.bj',
        adresseSiege: 'ZOGBO Carré 553 Lot 1907 M 072, Arconville'
      });
    }

    return NextResponse.json(parametres);
  } catch (error) {
    console.error('API Parametres GET Error:', error);
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
    
    // Validate or sanitize if necessary
    const updateData = {
      mission: data.mission,
      vision: data.vision,
      valeurs: data.valeurs,
      anneeCreation: Number(data.anneeCreation),
      nombreAgences: Number(data.nombreAgences),
      nombreClients: Number(data.nombreClients),
      telephonePrincipal: data.telephonePrincipal,
      emailPrincipal: data.emailPrincipal,
      adresseSiege: data.adresseSiege,
      heroCarousel: data.heroCarousel,
      histoireTexte: data.histoireTexte,
      gouvernanceTexte: data.gouvernanceTexte,
      banniereAPropos: data.banniereAPropos,
      motDuDg: data.motDuDg,
      motDuDgImage: data.motDuDgImage,
      accueilContenu: data.accueilContenu,
      mobilisContenu: data.mobilisContenu
    };

    const result = await prisma.parametresSite.upsert({
      where: { id: 1 },
      update: updateData,
      create: {
        id: 1,
        ...updateData
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Parametres POST Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
