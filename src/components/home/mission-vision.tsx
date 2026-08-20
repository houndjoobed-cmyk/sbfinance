import React from 'react';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Target, Eye } from 'lucide-react';
import { TypingAnimation } from '@/components/ui/typing-animation';
import Link from 'next/link';
import Image from 'next/image';

interface MissionVisionProps {
  mission: string;
  vision: string;
}

export function MissionVision({ mission, vision }: MissionVisionProps) {
  return (
    <Section variant="default" className="relative bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 reveal-left relative">
          {/* Background Large Text */}
          <div
            className="absolute top-0 left-0 -translate-y-8 w-full pointer-events-none -z-10 select-none overflow-hidden"
            aria-hidden="true"
          >
            <div className="animate-marquee">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-[80px] md:text-[120px] font-black text-slate-200/40 dark:text-slate-800/10 uppercase tracking-tighter whitespace-nowrap leading-none pr-16 md:pr-32">
                  Vision
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-dark mb-4">
              <TypingAnimation text="Notre Engagement" typeSpeed={50} />
            </h2>
            <p className="text-on-surface-variant text-sm tracking-[0.2em] uppercase font-semibold">
              Mission & Vision SBF
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                  <Target className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">Notre Mission</h3>
                <p className="text-on-surface-variant">
                  {mission || "Contribuer à l'amélioration des conditions de vie des personnes à faible revenu, notamment les femmes des zones urbaines et rurales, via des services financiers et non financiers adaptés et durables."}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                  <Eye className="h-6 w-6 text-primary-light" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">Notre Vision</h3>
                <p className="text-on-surface-variant">
                  {vision || "Être une institution de microfinance leader dans la finance inclusive, responsable et environnementale au Bénin à l'horizon 2035."}
                </p>
              </div>
            </div>
          </div>

          <Button asChild variant="primary" size="lg">
            <Link href="/a-propos">En savoir plus sur nous</Link>
          </Button>
        </div>

        <div className="relative h-100 rounded-none overflow-hidden shadow-lg reveal-left bg-surface-muted">
          <Image
            src="/images/home/mission-vision.jpg"
            alt="Équipe Salem Braha Finance au travail"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-dark opacity-10"></div>

          {/* Decorative elements */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent rounded-full opacity-20"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary rounded-full opacity-10"></div>
        </div>
      </div>
    </Section>
  );
}
