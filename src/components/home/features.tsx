import React from 'react';
import { Section } from '@/components/layout/section';
import { ArrowRight, ShieldCheck, TrendingUp, Users, Target, Award, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TypingAnimation } from '@/components/ui/typing-animation';

export function Features({ content }: { content?: any }) {
  const defaultFeatures = [
    {
      title: "Vision à l'horizon 2035",
      description: "Être une institution de microfinance leader dans la finance inclusive, responsable et environnementale au Bénin.",
      icon: "TrendingUp",
      image: "/images/home/mission-vision.jpg",
      link: "/a-propos"
    },
    {
      title: "Mission",
      description: "Contribuer à l'amélioration des conditions de vie des personnes à faible revenu via des services financiers et non financiers adaptés.",
      icon: "Users",
      image: "/images/home/rejoignez-nous.png",
      link: "/a-propos"
    },
    {
      title: "Nos Valeurs",
      description: "Le Respect, l'Intégrité et l'Efficacité guident toutes nos actions au quotidien.",
      icon: "ShieldCheck",
      image: "/images/home/Engagement.jpeg",
      link: "/a-propos"
    }
  ];

  const features = (content?.items && content.items.length > 0) ? content.items : defaultFeatures;

  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp': return <TrendingUp className="h-5 w-5 text-accent" />;
      case 'Users': return <Users className="h-5 w-5 text-accent" />;
      case 'ShieldCheck': return <ShieldCheck className="h-5 w-5 text-accent" />;
      case 'Target': return <Target className="h-5 w-5 text-accent" />;
      case 'Award': return <Award className="h-5 w-5 text-accent" />;
      case 'Heart': return <Heart className="h-5 w-5 text-accent" />;
      default: return <ShieldCheck className="h-5 w-5 text-accent" />;
    }
  };

  const defaultImgs = [
    "/images/home/mission-vision.jpg",
    "/images/home/rejoignez-nous.png",
    "/images/home/Engagement.jpeg"
  ];

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
        {features.map((feature: any, index: number) => {
          const cardImage = feature.image || defaultImgs[index % defaultImgs.length];

          return (
            <div
              key={index}
              className="bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col group overflow-hidden"
            >
              {/* Image de couverture avec icône flottante comme les cartes produits */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <Image
                  src={cardImage}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                {/* Badge Icône circulaire */}
                <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                  {getIcon(feature.icon)}
                </div>
              </div>

              {/* Contenu textuel */}
              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 grow">
                  {feature.description}
                </p>
                <Link
                  href={feature.link || "/a-propos"}
                  className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors mt-auto group/link"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
