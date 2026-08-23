import Image from "next/image";
import { Section } from "@/components/layout/section";

export function Partners({ content }: { content?: any }) {
  const partnersList = content?.items?.length > 0 ? content.items : [
    { id: 1, name: 'Assurance 1', image: '/images/partenaires/Assurance 1.png' },
    { id: 2, name: 'Banque 1', image: '/images/partenaires/Banque 1.png' },
    { id: 3, name: 'Banque 2', image: '/images/partenaires/Banque 2.png' },
    { id: 4, name: 'Banque 3', image: '/images/partenaires/Bnaque 3.png' },
    { id: 5, name: 'Ecobank', image: '/images/partenaires/Ecobank.png' },
  ];

  return (
    <section className="py-12 bg-surface-muted overflow-hidden border-y border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-8">
          {content?.title || "Ils nous font confiance"}
        </p>
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex gap-12 md:gap-24 px-6 md:px-12 items-center">
            {[...partnersList, ...partnersList, ...partnersList, ...partnersList].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="relative w-48 h-20 md:w-64 md:h-28 shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={partner.image || partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
