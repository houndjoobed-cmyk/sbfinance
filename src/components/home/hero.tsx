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
    image: "/images/hero/Osez entreprendre.png",
    title: "Osez entreprendre, nous finançons la suite",
    subtitle: "Des solutions de financement adaptées pour accompagner la croissance de vos activités.",
    cta: "Découvrir nos crédits",
    href: "/produits/credit"
  },
  {
    id: "2",
    image: "/images/hero/Cultivons la prospérité.png",
    title: "Cultivons la prospérité ensemble",
    subtitle: "Votre partenaire financier de confiance pour bâtir un avenir solide et sécurisé.",
    cta: "Notre mission",
    href: "/a-propos"
  },
  {
    id: "3",
    image: "/images/hero/Soutenir l'économie local.png",
    title: "Soutenir l'économie locale",
    subtitle: "Nous accompagnons les commerçants et artisans béninois dans leur développement.",
    cta: "Voir nos produits",
    href: "/produits"
  },
  {
    id: "4",
    image: "/images/hero/BANNIERE 05.png",
    title: "Pour une finance inclusive et responsable",
    subtitle: "Nous favorisons l'inclusion financière des populations à travers tout le Bénin.",
    cta: "Notre réseau",
    href: "/reseau",
    objectPosition: "center 10%"
  }
];

export function Hero({ carouselSlides }: { carouselSlides?: any[] }) {
  const displaySlides = carouselSlides && carouselSlides.length > 0 ? carouselSlides : defaultSlides;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: false }, [
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
    <div className="relative w-full h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-150">
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
                  sizes="150vw"
                  quality={100}
                  priority={index === 0}
                  style={{ objectPosition: slide.objectPosition || 'center' }}
                  className={`object-cover ${index === selectedIndex ? 'animate-zoom' : ''}`}
                />
                {/* Dark Overlay for text readability — no gradient */}
                <div className="absolute inset-0 bg-black/30"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center pt-28 md:pt-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl reveal-up">
                    <h1
                      className="text-4xl md:text-5xl lg:text-(--font-size-hero) font-bold leading-tight mb-6 drop-shadow-lg"
                      style={{ color: '#ffffff' }}
                    >
                      {index === selectedIndex ? (
                        <TypingAnimation text={slide.title || ''} typeSpeed={40} />
                      ) : (
                        slide.title || ''
                      )}
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
                        <Link href="/contacts">Nous contacter</Link>
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
