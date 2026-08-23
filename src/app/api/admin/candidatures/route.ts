import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const candidatures = await prisma.candidature.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        offre: {
          select: { titre: true }
        }
      }
    });
    return NextResponse.json(candidatures);
  } catch (error) {
    console.error('Erreur API admin candidatures:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
