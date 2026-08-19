import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/section';
import { ShieldCheck, TrendingUp, Users, Award, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: "Qui sommes-nous",
  description: "Découvrez l'histoire, la mission, la vision et les valeurs de Salem Braha Finance, votre partenaire financier au Bénin.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <Section variant="primary" className="pt-[160px] pb-16 md:pt-[200px] md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/hero/hero-agency.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay z-0"></div>
        
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl lg:text-[var(--font-size-hero)] font-bold text-white mb-6">
            Qui sommes-nous
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
            <h2 className="text-3xl font-bold text-primary-dark mb-6">Notre Histoire</h2>
            <div className="prose text-on-surface-variant">
              <p>
                Salem Braha Finance (SBF) est une institution de microfinance créée avec la volonté de proposer des solutions de financement adaptées aux réalités locales. Forte de 15 années d'expérience, SBF a su développer une expertise pointue dans l'accompagnement des populations béninoises.
              </p>
              <p>
                Agréée sous le N° A.20.0126.L et dotée d'un capital social de 138 000 000 FCFA, notre institution se positionne aujourd'hui comme un acteur incontournable de l'inclusion financière au Bénin, avec un accent particulier mis sur l'accompagnement des femmes en milieu urbain et rural.
              </p>
            </div>
          </div>
          <div className="bg-surface-muted rounded-2xl p-8 shadow-sm reveal-right">
            <h3 className="text-2xl font-bold text-primary-dark mb-6">SBF, c'est aussi :</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <BookOpen className="h-6 w-6 text-accent mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-on-surface">La Formation</h4>
                  <p className="text-sm text-on-surface-variant">Le renforcement de capacités de nos clients.</p>
                </div>
              </li>
              <li className="flex items-start">
                <TrendingUp className="h-6 w-6 text-accent mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-on-surface">L'Éducation Financière</h4>
                  <p className="text-sm text-on-surface-variant">Apprendre à mieux gérer ses ressources.</p>
                </div>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="h-6 w-6 text-accent mr-4 flex-shrink-0" />
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
          
          <div className="md:col-span-7 bg-primary text-white rounded-2xl p-8 md:p-12 shadow-[var(--shadow-card)]">
            <Users className="h-10 w-10 text-primary-light mb-6" />
            <h2 className="text-3xl font-bold mb-4">Notre Mission</h2>
            <p className="text-lg text-primary-light leading-relaxed">
              Contribuer à l'amélioration des conditions de vie des personnes à faible revenu, notamment les femmes des zones urbaines et rurales, via des services financiers et non financiers adaptés et durables.
            </p>
          </div>

          <div className="md:col-span-5 bg-white rounded-2xl p-8 shadow-[var(--shadow-card)]">
            <TrendingUp className="h-10 w-10 text-accent mb-6" />
            <h2 className="text-2xl font-bold text-primary-dark mb-4">Notre Vision</h2>
            <p className="text-on-surface-variant leading-relaxed">
              Être une institution de microfinance leader dans la finance inclusive, responsable et environnementale au Bénin à l'horizon 2035.
            </p>
          </div>

        </div>
      </Section>

      {/* Values */}
      <Section variant="default" className="text-center">
        <h2 className="text-3xl font-bold text-primary-dark mb-12 reveal-up">Nos Valeurs</h2>
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
    </>
  );
}
