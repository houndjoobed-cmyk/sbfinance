"use client";

import React, { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';

const defaultSlides = [
  {
    id: "1",
    image: "/images/hero/osez-entreprendre.png",
    title: "Osez entreprendre, nous finançons la suite",
    subtitle: "Des solutions de financement adaptées pour accompagner la croissance de vos activités.",
    cta: "Découvrir nos crédits",
    href: "/produits/credit"
  },
  {
    id: "2",
    image: "/images/hero/cultivons-la-prosperite.png",
    title: "Cultivons la prospérité ensemble",
    subtitle: "Votre partenaire financier de confiance pour bâtir un avenir solide et sécurisé.",
    cta: "Notre mission",
    href: "/a-propos"
  },
  {
    id: "3",
    image: "/images/hero/soutenir-economie-locale.png",
    title: "Soutenir l'économie locale",
    subtitle: "Nous accompagnons les commerçants et artisans béninois dans leur développement.",
    cta: "Voir nos produits",
    href: "/produits"
  },
  {
    id: "4",
    image: "/images/hero/banniere-05.png",
    title: "Pour une finance inclusive et responsable",
    subtitle: "Nous favorisons l'inclusion financière des populations à travers tout le Bénin.",
    cta: "Notre réseau",
    href: "/reseau",
    objectPosition: "center 10%"
  }
];

import { TypingAnimation } from '@/components/ui/typing-animation';
import { cn } from '@/lib/utils';

export interface HeroSettings {
  autoplayDelay?: number;
  enableZoom?: boolean;
  overlayOpacity?: number;
  textAnimation?: 'typing' | 'fade' | 'slide';
  pauseOnHover?: boolean;
}

export function Hero({ 
  carouselSlides,
  settings 
}: { 
  carouselSlides?: any[];
  settings?: HeroSettings;
}) {
  const displaySlides = carouselSlides && carouselSlides.length > 0 ? carouselSlides : defaultSlides;

  const autoplayDelay = (settings?.autoplayDelay && settings.autoplayDelay >= 2000) ? settings.autoplayDelay : 6000;
  const pauseOnHover = settings?.pauseOnHover ?? true;
  const enableZoom = settings?.enableZoom ?? true;
  const overlayOpacity = settings?.overlayOpacity !== undefined ? settings.overlayOpacity : 20;
  const textAnimation = settings?.textAnimation || 'typing';

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: true }, [
    Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: pauseOnHover })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    <div className="relative w-full aspect-video lg:aspect-auto lg:h-[85vh] xl:h-[95vh] lg:min-h-150">
      <div className="embla h-full absolute inset-0" ref={emblaRef}>
        <div className="embla__container h-full">
          {displaySlides.map((slide, index) => (
            <div className="embla__slide relative h-full shrink-0 grow-0 basis-full" key={index}>
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image || '/images/hero/hero-finance.jpg'}
                  alt={slide.title || 'SBF'}
                  fill
                  sizes="100vw"
                  quality={90}
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  style={{ objectPosition: slide.objectPosition || 'center' }}
                  className={cn("object-cover", index === selectedIndex && enableZoom ? "animate-zoom" : "")}
                />
                {/* Dark Overlay for text readability */}
                <div 
                  className="absolute inset-0 transition-colors duration-300" 
                  style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center py-4 lg:py-0 lg:pt-32">
                <div className="mx-auto max-w-7xl px-4 lg:px-8 w-full">
                  <div className="max-w-2xl reveal-up">
                    <h1
                      className={cn(
                        "text-lg md:text-3xl lg:text-5xl xl:text-(--font-size-hero) font-bold leading-tight mb-2 lg:mb-6 drop-shadow-lg",
                        textAnimation === 'fade' && "animate-fade-in"
                      )}
                      style={{ color: '#ffffff' }}
                    >
                      {textAnimation === 'typing' && index === selectedIndex ? (
                        <TypingAnimation text={slide.title || ''} typeSpeed={45} />
                      ) : (
                        slide.title || ''
                      )}
                    </h1>
                    <p className="text-xs md:text-base lg:text-xl mb-3 lg:mb-8 max-w-xl drop-shadow-md line-clamp-2 lg:line-clamp-none" style={{ color: '#d6e3ff' }}>
                      {slide.subtitle || ''}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-4">
                      {slide.cta && (
                        <Button asChild variant="accent" className="h-8 px-3 text-xs md:h-10 md:px-5 md:text-sm lg:h-12 lg:px-8 lg:text-base">
                          <Link href={slide.href || '#'}>{slide.cta}</Link>
                        </Button>
                      )}
                      <Button asChild variant="outline" className="h-8 px-3 text-xs md:h-10 md:px-5 md:text-sm lg:h-12 lg:px-8 lg:text-base text-white border-white hover:bg-white/10 hover:text-white">
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
