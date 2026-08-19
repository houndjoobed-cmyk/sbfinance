import React from 'react';
import { Section } from '@/components/layout/section';
import { ArrowRight, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export function Features() {
  const features = [
    {
      title: "Vision à l'horizon 2035",
      description: "Être une institution de microfinance leader dans la finance inclusive, responsable et environnementale au Bénin.",
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      link: "/a-propos"
    },
    {
      title: "Mission",
      description: "Contribuer à l'amélioration des conditions de vie des personnes à faible revenu via des services financiers et non financiers adaptés.",
      icon: <Users className="h-8 w-8 text-accent" />,
      link: "/a-propos"
    },
    {
      title: "Nos Valeurs",
      description: "Le Respect, l'Intégrité et l'Efficacité guident toutes nos actions au quotidien.",
      icon: <ShieldCheck className="h-8 w-8 text-accent" />,
      link: "/a-propos"
    }
  ];

  return (
    <Section variant="muted" className="-mt-8 relative z-30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-xl p-8 shadow-[var(--shadow-card)] hover-lift reveal-up delay-${(index + 1) * 100}`}
          >
            <div className="bg-primary/5 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              {feature.icon}
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
