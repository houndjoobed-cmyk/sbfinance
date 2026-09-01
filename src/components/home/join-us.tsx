"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function JoinUs({ content }: { content?: any }) {
  return (
    <section className="relative w-full min-h-125 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content?.image || "/images/home/rejoignez-nous.png"}
          alt="Rejoignez-nous"
          fill
          sizes="100vw"
          quality={100}
          className="object-cover object-[center_15%]"
          priority
        />
        {/* Dark Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center py-24">

        <p className="text-white md:text-lg font-medium tracking-wide mb-4 reveal-up">
          {content?.text || "Travailler chez SBF, c'est rejoindre une institution engagée auprès de ses clients"}
        </p>

        <h2 className="text-5xl md:text-7xl font-bold text-white mb-16 reveal-up delay-100 drop-shadow-sm">
          {content?.title || "Rejoignez-nous"}
        </h2>

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center w-full max-w-4xl reveal-up delay-200">
          {content?.buttons && content.buttons.length > 0 ? (
            content.buttons.map((btn: any, index: number) => (
              <Button
                key={index}
                asChild
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white border-none min-w-55 py-6 font-semibold uppercase tracking-wide group"
              >
                <Link href={btn.link || "#"}>
                  {btn.text}
                </Link>
              </Button>
            ))
          ) : (
            <>
              <Button
                asChild
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white border-none min-w-55 py-6 font-semibold uppercase tracking-wide group"
              >
                <Link href="/produits#credit">
                  Demande de crédit
                </Link>
              </Button>

              <Button
                asChild
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white border-none min-w-55 py-6 font-semibold uppercase tracking-wide group"
              >
                <Link href="/produits">
                  Compte d'épargne
                </Link>
              </Button>

              <Button
                asChild
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white border-none min-w-55 py-6 font-semibold uppercase tracking-wide group"
              >
                <Link href="/carrieres">
                  Nos offres d'emploi
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
