"use client";

import React, { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TypingAnimation } from '@/components/ui/typing-animation';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const defaultSlides = [
  {
    id: "1",
    image: "/images/hero/hero-women.jpg",
    title: "Osez entreprendre, nous finançons la suite",
    subtitle: "Des solutions de financement adaptées pour accompagner la croissance de vos activités.",
    cta: "Découvrir nos crédits",
    href: "/produits/credit"
  },
  {
    id: "2",
    image: "/images/hero/hero-finance.jpg",
    title: "Cultivons la prospérité ensemble",
    subtitle: "Votre partenaire financier de confiance pour bâtir un avenir solide et sécurisé.",
    cta: "Notre mission",
    href: "/a-propos"
  },
  {
    id: "3",
    image: "/images/hero/hero-market.jpg",
    title: "Soutenir l'économie locale",
    subtitle: "Nous accompagnons les commerçants et artisans béninois dans leur développement.",
    cta: "Voir nos produits",
    href: "/produits"
  },
  {
    id: "4",
    image: "/images/hero/hero-community.jpg",
    title: "Pour une finance inclusive et responsable",
    subtitle: "Nous favorisons l'inclusion financière des populations à travers tout le Bénin.",
    cta: "Notre réseau",
    href: "/reseau"
  }
];

export function Hero({ carouselSlides }: { carouselSlides?: any[] }) {
  const displaySlides = carouselSlides && carouselSlides.length > 0 ? carouselSlides : defaultSlides;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
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
    <div className="relative w-full h-150 md:h-175 lg:h-[80vh] min-h-125">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {displaySlides.map((slide, index) => (
            <div className="embla__slide relative h-full shrink-0 grow-0 basis-full" key={index}>
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image || '/images/hero/hero-finance.jpg'}
                  alt={slide.title || 'SBF'}
                  fill
                  priority={index === 0}
                  className={`object-cover transition-transform duration-10000 ${index === selectedIndex ? 'scale-110' : 'scale-100'}`}
                />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-linear-to-r from-primary-dark/80 via-primary-dark/60 to-transparent"></div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center pt-37.5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl reveal-up">
                    <h1
                      className="text-4xl md:text-5xl lg:text-(--font-size-hero) font-bold leading-tight mb-6 drop-shadow-lg"
                      style={{ color: '#ffffff' }}
                    >
                      <TypingAnimation text={slide.title || ''} typeSpeed={40} />
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-w-xl drop-shadow-md" style={{ color: '#d6e3ff' }}>
                      {slide.subtitle || ''}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {slide.cta && (
                        <Button asChild size="lg" variant="accent">
                          <Link href={slide.href || '#'}>{slide.cta}</Link>
                        </Button>
                      )}
                      <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white">
                        <Link href="/contact">Nous contacter</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
