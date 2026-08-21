import React from 'react';
import type { Metadata } from 'next';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Section } from '@/components/layout/section';
import { ShieldCheck, TrendingUp, Users, Award, BookOpen } from 'lucide-react';
import prisma from "@/lib/prisma";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Qui sommes-nous",
  description: "Découvrez l'histoire, la mission, la vision et les valeurs de Salem Braha Finance, votre partenaire financier au Bénin.",
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  let parametres = null;
  try {
    parametres = await prisma.parametresSite.findUnique({ where: { id: 1 } }) as any;
  } catch (error) {
    console.error("Database fetch error:", error);
  }
  if (!parametres) {
    parametres = {
      id: 1,
      mission: "Contribuer à l'amélioration des conditions de vie des personnes à faible revenu, notamment les femmes des zones urbaines et rurales, via des services financiers et non financiers adaptés et durables.",
      vision: "Être une institution de microfinance leader dans la finance inclusive, responsable et environnementale au Bénin à l'horizon 2035.",
      valeurs: [],
      anneeCreation: 2009,
      nombreAgences: 5,
      nombreClients: 10000,
      telephonePrincipal: '',
      emailPrincipal: '',
      adresseSiege: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - parametres.anneeCreation;

  return (
    <>
      {/* Page Header */}
      <Section variant="primary" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-primary-dark">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url('${parametres.banniereAPropos || '/images/banniere-interne.png'}')` }}
        ></div>
        
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl lg:text-(--font-size-hero) font-bold text-white mb-6">
            <TypingAnimation text="Qui sommes-nous" typeSpeed={50} />
          </h1>
          <p className="text-xl text-primary-light">
            Une institution financière engagée pour le développement socio-économique du Bénin.
          </p>
        </div>
      </Section>

      {/* History & Identity */}
      <Section variant="default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <h2 className="text-3xl font-bold text-primary-dark mb-6"><TypingAnimation text="Notre Histoire" typeSpeed={50} /></h2>
            <div className="prose text-on-surface-variant whitespace-pre-line">
              {parametres.histoireTexte || (
                `Salem Braha Finance (SBF) est une institution de microfinance créée avec la volonté de proposer des solutions de financement adaptées aux réalités locales. Forte de ${experienceYears} années d'expérience, SBF a su développer une expertise pointue dans l'accompagnement des populations béninoises.\n\nAgréée sous le N° A.20.0126.L et dotée d'un capital social de 138 000 000 FCFA, notre institution se positionne aujourd'hui comme un acteur incontournable de l'inclusion financière au Bénin, avec un accent particulier mis sur l'accompagnement des femmes en milieu urbain et rural.`
              )}
            </div>
          </div>
          <div className="bg-surface-muted p-8 shadow-sm reveal-right">
            <h3 className="text-2xl font-bold text-primary-dark mb-6">SBF, c'est aussi :</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <BookOpen className="h-6 w-6 text-accent mr-4 shrink-0" />
                <div>
                  <h4 className="font-bold text-on-surface">La Formation</h4>
                  <p className="text-sm text-on-surface-variant">Le renforcement de capacités de nos clients.</p>
                </div>
              </li>
              <li className="flex items-start">
                <TrendingUp className="h-6 w-6 text-accent mr-4 shrink-0" />
                <div>
                  <h4 className="font-bold text-on-surface">L'Éducation Financière</h4>
                  <p className="text-sm text-on-surface-variant">Apprendre à mieux gérer ses ressources.</p>
                </div>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="h-6 w-6 text-accent mr-4 shrink-0" />
                <div>
                  <h4 className="font-bold text-on-surface">L'Assurance Conseil</h4>
                  <p className="text-sm text-on-surface-variant">Sécuriser vos activités commerciales.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Mission / Vision Bento Grid */}
      <Section variant="light">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 reveal-up">
          
          <div className="md:col-span-7 bg-primary text-white p-8 md:p-12 shadow-(--shadow-card)">
            <Users className="h-10 w-10 text-primary-light mb-6" />
            <h2 className="text-3xl font-bold mb-4"><TypingAnimation text="Notre Mission" typeSpeed={50} /></h2>
            <p className="text-lg text-primary-light leading-relaxed">
              {parametres.mission}
            </p>
          </div>

          <div className="md:col-span-5 bg-white p-8 shadow-(--shadow-card)">
            <TrendingUp className="h-10 w-10 text-accent mb-6" />
            <h2 className="text-2xl font-bold text-primary-dark mb-4"><TypingAnimation text="Notre Vision" typeSpeed={50} /></h2>
            <p className="text-on-surface-variant leading-relaxed">
              {parametres.vision}
            </p>
          </div>

        </div>
      </Section>

      {/* Values */}
      <Section variant="default" className="text-center">
        <h2 className="text-3xl font-bold text-primary-dark mb-12 reveal-up"><TypingAnimation text="Nos Valeurs" typeSpeed={50} /></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="reveal-up delay-100">
            <div className="w-20 h-20 mx-auto bg-surface-muted rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-3">Respect</h3>
            <p className="text-on-surface-variant">Considération et écoute mutuelle dans toutes nos interactions avec nos clients et partenaires.</p>
          </div>
          <div className="reveal-up delay-200">
            <div className="w-20 h-20 mx-auto bg-surface-muted rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-3">Intégrité</h3>
            <p className="text-on-surface-variant">Transparence, honnêteté et éthique professionnelle dans la gestion de vos ressources.</p>
          </div>
          <div className="reveal-up delay-300">
            <div className="w-20 h-20 mx-auto bg-surface-muted rounded-full flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-3">Efficacité</h3>
            <p className="text-on-surface-variant">Rapidité et qualité de service pour répondre aux besoins pressants de nos membres.</p>
          </div>
        </div>
      </Section>


      {/* Mot du DG */}
      {parametres.motDuDg && (
        <Section variant="light">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {parametres.motDuDgImage && (
              <div className="lg:col-span-4 reveal-left">
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden shadow-xl border-4 border-white">
                  <Image 
                    src={parametres.motDuDgImage} 
                    alt="Mot du Directeur Général" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <div className={`lg:col-span-${parametres.motDuDgImage ? '8' : '12'} reveal-right`}>
              <h2 className="text-3xl font-bold text-primary-dark mb-6">Mot du Directeur Général</h2>
              <div className="prose prose-lg text-on-surface-variant whitespace-pre-line italic relative">
                <span className="absolute -top-6 -left-6 text-6xl text-primary/20 font-serif">"</span>
                {parametres.motDuDg}
                <span className="absolute -bottom-6 -right-6 text-6xl text-primary/20 font-serif">"</span>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Gouvernance */}
      {parametres.gouvernanceTexte && (
        <Section variant="default">
          <div className="max-w-4xl mx-auto text-center reveal-up">
            <h2 className="text-3xl font-bold text-primary-dark mb-8"><TypingAnimation text="Notre Gouvernance" typeSpeed={50} /></h2>
            <div className="prose text-on-surface-variant whitespace-pre-line text-left bg-white p-8 shadow-sm border border-gray-100">
              {parametres.gouvernanceTexte}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
