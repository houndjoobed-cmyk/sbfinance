import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { CandidatureForm } from '@/components/carrieres/candidature-form';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const offre = await prisma.offreEmploi.findUnique({
    where: { slug }
  });

  if (!offre) {
    return {
      title: 'Offre non trouvée',
    };
  }

  return {
    title: `${offre.titre} | SBF Carrières`,
    description: `Découvrez l'offre d'emploi pour le poste de ${offre.titre} chez Salem Braha Finance et postulez dès maintenant.`,
  };
}

export default async function OffreDetail({ params }: PageProps) {
  const { slug } = await params;
  const offre = await prisma.offreEmploi.findUnique({
    where: { slug }
  });

  if (!offre || !offre.estPublie) {
    notFound();
  }

  const missions = offre.missions as string[];
  const profil = offre.profil as string[];

  const parametres = await prisma.parametresSite.findUnique({ where: { id: 1 } });
  const bgUrl = parametres?.banniereAPropos || '/images/BANNIERE.png';

  return (
    <>
      <Section variant="primary" className="py-20 md:py-28 relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url('${bgUrl}')` }}></div>
        <div className="absolute inset-0 bg-primary-dark/70 z-0"></div>
        <div className="text-center max-w-4xl mx-auto relative z-10 reveal-up">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            {offre.titre}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/90">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Date limite: {offre.dateLimite}
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/50"></div>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              SBF - Microfinance
            </div>
          </div>
        </div>
      </Section>

      <Section variant="default" className="py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-on-surface-variant mb-8 reveal-up">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/carrieres" className="hover:text-primary transition-colors">Carrières</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-on-surface font-medium truncate max-w-50 md:max-w-none">{offre.titre}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Colonne Description */}
            <div className="lg:col-span-2 space-y-10 reveal-up delay-100">
              {/* Missions */}
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-dark border-b border-outline-variant pb-4">
                  Vos missions
                </h2>
                <ul className="space-y-4">
                  {missions.map((mission, index) => (
                    <li key={index} className="flex">
                      <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mr-3" />
                      <span className="text-on-surface-variant text-lg">{mission}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Profil & Compétences */}
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-dark border-b border-outline-variant pb-4">
                  Profil & Compétences requises
                </h2>
                <ul className="space-y-4">
                  {profil.map((critere, index) => (
                    <li key={index} className="flex">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mr-3" />
                      <span className="text-on-surface-variant text-lg">{critere}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Colonne Formulaire de candidature */}
            <div className="lg:col-span-1 reveal-up delay-200">
              <Card className="sticky top-24 shadow-lg border-primary/20">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-primary-dark mb-2">Postuler</h3>
                  <p className="text-on-surface-variant text-sm mb-6">
                    Envoyez-nous votre CV et votre lettre de motivation pour cette offre.
                  </p>
                  
                  <CandidatureForm offreId={offre.id} offreTitre={offre.titre} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
