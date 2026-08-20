"use client";

import React, { useEffect, useCallback, useState } from 'react';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Section } from '@/components/layout/section';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialsProps {
  testimonials: Array<{
    text: string;
    author: string;
    role: string | null;
    initial: string;
  }>;
}

export function Testimonials({ testimonials }: TestimonialsProps) {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 5000, stopOnInteraction: true })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Section variant="default" className="overflow-hidden">
      <div className="relative text-center max-w-5xl mx-auto mb-16 mt-10 reveal-up">
        {/* Background Large Text with Marquee Animation */}
        <div 
          className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none -z-10 select-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="animate-marquee">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[80px] md:text-[130px] lg:text-[180px] font-black text-slate-200/40 dark:text-slate-800/10 uppercase tracking-tighter whitespace-nowrap leading-none pr-16 md:pr-32">
                Témoignages
              </span>
            ))}
          </div>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-primary-dark mb-4 relative z-10">
          <TypingAnimation text="Ce que disent nos clients" typeSpeed={50} />
        </h2>
        <p className="text-on-surface-variant text-sm tracking-[0.2em] uppercase font-semibold relative z-10">
          Notre plus grande fierté
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto reveal-up delay-100">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container py-4">
            {testimonials.map((testimonial, index) => (
              <div className="embla__slide flex-[0_0_100%] md:flex-[0_0_80%] px-4" key={index}>
                <Card className={`h-full border-0 ${index === selectedIndex ? 'shadow-xl scale-100 bg-primary text-white' : 'shadow-md scale-95 opacity-50 bg-white'} transition-all duration-500`}>
                  <CardContent className="p-8 md:p-12 text-center relative">
                    <Quote className={`h-12 w-12 mx-auto mb-6 ${index === selectedIndex ? 'text-white/20' : 'text-primary/10'}`} />
                    <p className={`text-xl md:text-2xl font-medium leading-relaxed mb-8 ${index === selectedIndex ? 'text-white' : 'text-on-surface'}`}>
                      "{testimonial.text}"
                    </p>
                    <div className="flex flex-col items-center justify-center">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-3 ${index === selectedIndex ? 'bg-white text-primary' : 'bg-surface-muted text-primary'}`}>
                        {testimonial.initial}
                      </div>
                      <h4 className={`font-bold ${index === selectedIndex ? 'text-white' : 'text-primary-dark'}`}>
                        {testimonial.author}
                      </h4>
                      <p className={`text-sm ${index === selectedIndex ? 'text-primary-light' : 'text-on-surface-variant'}`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2">
          <button
            className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-surface-muted transition-colors"
            onClick={scrollPrev}
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2">
          <button
            className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-surface-muted transition-colors"
            onClick={scrollNext}
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}
