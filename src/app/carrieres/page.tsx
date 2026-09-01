import React from 'react';
import type { Metadata } from 'next';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Section } from '@/components/layout/section';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
  title: "Carrières & Offres d'emploi",
  description: "Rejoignez l'équipe de Salem Braha Finance. Consultez nos offres d'emploi et postulez en ligne.",
};

export default async function CarrieresPage() {
  const offres = await prisma.offreEmploi.findMany({
    where: {
      estPublie: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  let parametres = null;
  try {
    parametres = await prisma.parametresSite.findUnique({ where: { id: 1 } });
  } catch (error) {
    console.error("Database fetch error for parametres:", error);
  }

  const bgUrl = parametres?.banniereAPropos || '/images/banniere.png';

  return (
    <>
      <Section variant="primary" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url('${bgUrl}')` }}></div>
        <div className="absolute inset-0 bg-primary-dark/70 z-0"></div>
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            <TypingAnimation text="Nous rejoindre" typeSpeed={50} />
          </h1>
          <p className="text-xl text-white drop-shadow-md font-medium">
            Découvrez nos offres d'emploi et construisez votre carrière au sein d'une institution financière engagée.
          </p>
        </div>
      </Section>

      <Section variant="default">
        {offres.length === 0 ? (
          <div className="text-center py-16 reveal-up">
            <h3 className="text-2xl font-medium text-on-surface-variant mb-4">Aucune offre d'emploi disponible pour le moment</h3>
            <p className="text-on-surface-variant mb-8">N'hésitez pas à revenir consulter cette page régulièrement.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offres.map((offre: any, index: number) => (
              <Card key={offre.id} className={`flex flex-col h-full reveal-up delay-${(index % 3 + 1) * 100} group border-outline-variant/50 hover:shadow-lg transition-all`}>
                <div className="h-32 bg-white relative overflow-hidden rounded-t-xl flex items-center justify-center border-b border-outline-variant/30">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                  <Image 
                    src="/images/logos/logo-sbf.png" 
                    alt="SBF Logo" 
                    width={120} 
                    height={60} 
                    className="object-contain opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all drop-shadow-sm relative z-10 p-2" 
                  />
                </div>
                
                <div className="p-6 flex flex-col grow">
                  <CardHeader className="p-0 pb-2">
                    <div className="flex items-center text-on-surface-variant text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date limite : {offre.dateLimite}
                    </div>
                    <CardTitle className="text-xl text-primary-dark group-hover:text-primary transition-colors line-clamp-2">
                      {offre.titre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 py-2 grow">
                    <p className="text-on-surface-variant mb-4">
                      Rejoignez-nous pour contribuer au développement de notre institution.
                    </p>
                  </CardContent>
                  <CardFooter className="p-0 pt-4">
                    <Link 
                      href={`/carrieres/${offre.slug}`}
                      className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors"
                    >
                      Voir les détails et postuler
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
