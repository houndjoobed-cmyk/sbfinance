import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { OffreForm } from '@/components/admin/offre-form';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: 'Modifier l\'Offre d\'emploi | Administration SBF',
};

export default async function ModifierOffrePage({ params }: PageProps) {
  const { id } = await params;

  const offre = await prisma.offreEmploi.findUnique({
    where: { id }
  });

  if (!offre) {
    notFound();
  }

  const initialData = {
    id: offre.id,
    titre: offre.titre,
    slug: offre.slug,
    dateLimite: offre.dateLimite,
    estPublie: offre.estPublie,
    missions: Array.isArray(offre.missions) ? (offre.missions as string[]) : [],
    profil: Array.isArray(offre.profil) ? (offre.profil as string[]) : [],
  };

  return <OffreForm initialData={initialData} isEditing={true} />;
}
