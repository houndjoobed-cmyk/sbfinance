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

    const dataObj = parametres as any;
    const themeConfig = dataObj.themeConfig || dataObj.accueilContenu?.themeConfig || null;

    return NextResponse.json({
      ...dataObj,
      themeConfig
    });
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
    const anneeCreation = Number(data.anneeCreation);
    const nombreAgences = Number(data.nombreAgences);
    const nombreClients = Number(data.nombreClients);

    const updateData: Record<string, any> = {};
    if (data.mission !== undefined) updateData.mission = data.mission;
    if (data.vision !== undefined) updateData.vision = data.vision;
    if (data.valeurs !== undefined) updateData.valeurs = data.valeurs;
    if (Number.isFinite(anneeCreation)) updateData.anneeCreation = anneeCreation;
    if (Number.isFinite(nombreAgences)) updateData.nombreAgences = nombreAgences;
    if (Number.isFinite(nombreClients)) updateData.nombreClients = nombreClients;
    if (data.telephonePrincipal !== undefined) updateData.telephonePrincipal = data.telephonePrincipal;
    if (data.emailPrincipal !== undefined) updateData.emailPrincipal = data.emailPrincipal;
    if (data.adresseSiege !== undefined) updateData.adresseSiege = data.adresseSiege;
    if (data.heroCarousel !== undefined) updateData.heroCarousel = data.heroCarousel;
    if (data.histoireTexte !== undefined) updateData.histoireTexte = data.histoireTexte;
    if (data.gouvernanceTexte !== undefined) updateData.gouvernanceTexte = data.gouvernanceTexte;
    if (data.banniereAPropos !== undefined) updateData.banniereAPropos = data.banniereAPropos;
    if (data.motDuDg !== undefined) updateData.motDuDg = data.motDuDg;
    if (data.motDuDgImage !== undefined) updateData.motDuDgImage = data.motDuDgImage;
    if (data.accueilContenu !== undefined) updateData.accueilContenu = data.accueilContenu;
    if (data.mobilisContenu !== undefined) updateData.mobilisContenu = data.mobilisContenu;
    if (data.epargneContenu !== undefined) updateData.epargneContenu = data.epargneContenu;
    
    if (data.themeConfig !== undefined) {
      updateData.themeConfig = data.themeConfig;
      // Sauvegarder également dans accueilContenu pour résilience totale si le serveur dev n'a pas redémarré
      const currentAccueil = (updateData.accueilContenu && typeof updateData.accueilContenu === 'object')
        ? updateData.accueilContenu
        : (typeof data.accueilContenu === 'object' ? data.accueilContenu : {});
      updateData.accueilContenu = {
        ...currentAccueil,
        themeConfig: data.themeConfig
      };
    }

    let result;
    try {
      result = await prisma.parametresSite.upsert({
        where: { id: 1 },
        update: updateData,
        create: {
          id: 1,
          mission: updateData.mission || '',
          vision: updateData.vision || '',
          valeurs: updateData.valeurs || [],
          anneeCreation: updateData.anneeCreation ?? 2009,
          nombreAgences: updateData.nombreAgences ?? 5,
          nombreClients: updateData.nombreClients ?? 0,
          telephonePrincipal: updateData.telephonePrincipal || '+229 01 21 38 05 87',
          emailPrincipal: updateData.emailPrincipal || 'contact@sbfinance.bj',
          adresseSiege: updateData.adresseSiege || 'ZOGBO Carré 553 Lot 1907 M 072, Arconville',
          ...updateData
        }
      });
    } catch (err: any) {
      // Si le processus dev Node tourne depuis avant le prisma generate et ne connaît pas encore themeConfig
      if (err.message?.includes('themeConfig') || err.message?.includes('Unknown argument')) {
        const fallbackData = { ...updateData };
        delete fallbackData.themeConfig;
        result = await prisma.parametresSite.upsert({
          where: { id: 1 },
          update: fallbackData,
          create: {
            id: 1,
            mission: fallbackData.mission || '',
            vision: fallbackData.vision || '',
            valeurs: fallbackData.valeurs || [],
            anneeCreation: fallbackData.anneeCreation ?? 2009,
            nombreAgences: fallbackData.nombreAgences ?? 5,
            nombreClients: fallbackData.nombreClients ?? 0,
            telephonePrincipal: fallbackData.telephonePrincipal || '+229 01 21 38 05 87',
            emailPrincipal: fallbackData.emailPrincipal || 'contact@sbfinance.bj',
            adresseSiege: fallbackData.adresseSiege || 'ZOGBO Carré 553 Lot 1907 M 072, Arconville',
            ...fallbackData
          }
        });
      } else {
        throw err;
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Parametres POST Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return POST(request);
}
