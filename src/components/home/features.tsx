import React from 'react';
import { Section } from '@/components/layout/section';
import { ArrowRight, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { TypingAnimation } from '@/components/ui/typing-animation';

export function Features({ content }: { content?: any }) {
  const features = content?.items || [
    {
      title: "Vision à l'horizon 2035",
      description: "Être une institution de microfinance leader dans la finance inclusive, responsable et environnementale au Bénin.",
      icon: "TrendingUp",
      link: "/a-propos"
    },
    {
      title: "Mission",
      description: "Contribuer à l'amélioration des conditions de vie des personnes à faible revenu via des services financiers et non financiers adaptés.",
      icon: "Users",
      link: "/a-propos"
    },
    {
      title: "Nos Valeurs",
      description: "Le Respect, l'Intégrité et l'Efficacité guident toutes nos actions au quotidien.",
      icon: "ShieldCheck",
      link: "/a-propos"
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp': return <TrendingUp className="h-8 w-8 text-accent" />;
      case 'Users': return <Users className="h-8 w-8 text-accent" />;
      case 'ShieldCheck': return <ShieldCheck className="h-8 w-8 text-accent" />;
      default: return <ShieldCheck className="h-8 w-8 text-accent" />;
    }
  };

  return (
    <Section variant="default" className="bg-white -mt-8 relative z-30 pt-16">
      <div className="relative text-center max-w-5xl mx-auto mb-16 reveal-up">
        {/* Background Large Text */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none -z-10 select-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="animate-marquee">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[100px] md:text-[160px] lg:text-[220px] font-black text-slate-200/50 dark:text-slate-800/20 uppercase tracking-tighter whitespace-nowrap leading-none pr-16 md:pr-32">
                {content?.backgroundText || 'Atouts'}
              </span>
            ))}
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-primary-dark mb-4 relative z-10">
          <TypingAnimation text={content?.title || "Pourquoi SBF ?"} typeSpeed={50} />
        </h2>
        <p className="text-on-surface-variant text-sm tracking-[0.2em] uppercase font-semibold relative z-10">
          {content?.subtitle || "Nos piliers fondateurs"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature: any, index: number) => (
          <div key={index} className="bg-white p-8 shadow-(--shadow-card) border border-outline-variant hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
              {getIcon(feature.icon)}
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-4">{feature.title}</h3>
            <p className="text-on-surface-variant mb-6">{feature.description}</p>
            <Link
              href={feature.link}
              className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors group"
            >
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
