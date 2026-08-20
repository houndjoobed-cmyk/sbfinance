import React from 'react';
import Image from 'next/image';

export function DgQuote() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-stretch">
        {/* Photo DG — left side */}
        <div className="relative min-h-100 md:min-h-125 bg-gray-100">
          <Image
            src="/images/home/dg.png"
            alt="Dr. Ahonon Houekin Augustine — Directrice Générale de SBF"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            quality={90}
          />
        </div>

        {/* Quote — right side */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-16 bg-white">
          {/* Big quote mark */}
          <svg
            className="w-14 h-14 text-primary/30 mb-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.464-.674-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.464-.674-2.917-1.179z" />
          </svg>

          <blockquote className="text-lg md:text-xl lg:text-2xl font-semibold text-on-surface leading-relaxed mb-8">
            Notre mission dépasse la simple gestion de l&apos;argent&nbsp;; nous
            protégeons vos efforts. Chez SBF, nous croyons que chaque
            trajectoire, qu&apos;elle soit dans le secteur formel ou informel,
            mérite d&apos;être sécurisée et valorisée. Bienvenue dans notre
            communauté de progrès.
          </blockquote>

          <div>
            <p className="text-primary font-bold text-lg">
              Dr. Ahonon Houekin Augustine
            </p>
            <p className="text-on-surface-variant text-sm">
              Directrice Générale, Salem Braha Finance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
