"use client";

import React, { useCallback } from 'react';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Landmark,
  Handshake,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { TypingAnimation } from '@/components/ui/typing-animation';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export function ProductsPreview() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
  }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const products = [
    {
      title: "Crédit",
      description: "Solutions de financement pour vos besoins de roulement, de consommation ou d'investissement.",
      icon: <Wallet className="h-5 w-5" />,
      image: "/images/products/credit-v2.jpg",
      link: "/produits/credit"
    },
    {
      title: "Épargne",
      description: "Sécurisez votre avenir avec nos produits d'épargne: Houenoussou, Allodo, Ahossou, Zédaga et Kondokpo.",
      icon: <Landmark className="h-5 w-5" />,
      image: "/images/products/epargne-v2.jpg",
      link: "/produits/epargne"
    },
    {
      title: "Appui",
      description: "Un soutien sur-mesure pour développer vos activités et pérenniser votre croissance.",
      icon: <Handshake className="h-5 w-5" />,
      image: "/images/products/appui-v2.jpg",
      link: "/produits/appui"
    },
    {
      title: "Conseil",
      description: "Expertise et accompagnement stratégique pour la gestion de votre entreprise.",
      icon: <Lightbulb className="h-5 w-5" />,
      image: "/images/products/conseil-v2.jpg",
      link: "/produits/conseil"
    },
    {
      title: "Formation",
      description: "Renforcez vos compétences avec nos programmes d'éducation financière et entrepreneuriale.",
      icon: <GraduationCap className="h-5 w-5" />,
      image: "/images/products/formation.jpg",
      link: "/produits/formation"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-surface-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* Header Section */}
        <div className="relative mb-16 pt-8 pb-4">
          {/* Background large text with marquee animation */}
          <div
            className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <div className="animate-marquee">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-[120px] md:text-[180px] font-black text-slate-200/40 uppercase tracking-tighter whitespace-nowrap leading-none pr-16 md:pr-32">
                  PRODUITS
                </span>
              ))}
            </div>
          </div>

          {/* Foreground content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">
              Découvrez nos produits
            </h2>
            <div className="text-slate-500 text-sm md:text-base font-bold tracking-[0.2em] uppercase">
              Nos services
            </div>
          </div>
        </div>

        <div className="hidden md:flex justify-end mb-6 gap-3 shrink-0 relative z-10">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white text-primary flex items-center justify-center hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            aria-label="Précédent"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white text-primary flex items-center justify-center hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            aria-label="Suivant"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Embla Carousel */}
        <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0 py-4" ref={emblaRef}>
          <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
            {products.map((product, index) => (
              <div
                key={index}
                className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_33.33%] min-w-0 pr-4 sm:pr-6"
              >
                <div className="bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col group overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Icon badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md">
                      {product.icon}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {product.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 grow">
                      {product.description}
                    </p>
                    <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white group-hover:bg-primary group-hover:text-white transition-colors">
                      <Link href={product.link}>
                        Découvrir
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Special Contact Card in the Carousel */}
            <div className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_33.33%] min-w-0 pr-4 sm:pr-6">
              <div className="bg-primary overflow-hidden shadow-lg h-full flex flex-col text-white">
                {/* Decorative top image area */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <Image
                    src="/images/hero/hero-community.jpg"
                    alt="Nos agences"
                    fill
                    className="object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-primary/60"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black text-white/20">?</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl font-bold mb-3">
                    Besoin d&apos;aide pour choisir ?
                  </h3>
                  <p className="text-primary-light text-sm leading-relaxed mb-6 grow">
                    Nos conseillers sont à votre disposition dans toutes nos agences pour vous orienter vers la solution la plus adaptée.
                  </p>
                  <Button asChild variant="accent" className="w-full text-white">
                    <Link href="/contact">
                      Nous contacter
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
