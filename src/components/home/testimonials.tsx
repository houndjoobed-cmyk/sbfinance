"use client";

import React, { useEffect, useCallback, useState } from 'react';
import { Section } from '@/components/layout/section';
import { Quote } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface TestimonialsProps {
  testimonials: Array<{
    text: string;
    author: string;
    role: string | null;
    initial: string;
  }>;
  content?: any;
}

export function Testimonials({ testimonials, content }: TestimonialsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 6000, stopOnInteraction: false })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect();
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="bg-primary/95 py-24 relative overflow-hidden">
      {/* Background Large Text with Marquee Animation */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none z-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[100px] md:text-[180px] lg:text-[250px] font-black text-white/5 uppercase tracking-tighter whitespace-nowrap leading-none pr-16 md:pr-32">
              {content?.backgroundText || 'Témoignages'}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center text-white">
        
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          {content?.title || "Ce qu'ils disent de nous"}
        </h2>
        {content?.subtitle && (
          <p className="text-white/80 text-sm tracking-[0.2em] uppercase font-semibold mb-12">
            {content.subtitle}
          </p>
        )}

        <div className="relative mx-auto reveal-up">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
              {testimonials.map((testimonial, index) => (
                <div className="flex-[0_0_100%] min-w-0 px-4" key={index}>
                  
                  <p className="text-lg md:text-2xl font-light italic leading-relaxed mb-10 text-white/90 max-w-4xl mx-auto">
                    {testimonial.text}
                  </p>
                  
                  <div className="flex items-center justify-center gap-4">
                    <Quote className="h-10 w-10 text-white fill-white rotate-180" />
                    <div className="text-left">
                      <h4 className="font-bold text-lg text-white">
                        {testimonial.author}
                      </h4>
                      {testimonial.role && (
                        <p className="text-xs tracking-wider text-white/70 uppercase mt-1">
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Navigation Lines */}
          <div className="flex justify-center items-center gap-2 mt-12">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-1 transition-all duration-300 ${
                  index === selectedIndex 
                    ? 'w-8 bg-white' 
                    : 'w-8 bg-transparent border border-white/50 hover:bg-white/30'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

