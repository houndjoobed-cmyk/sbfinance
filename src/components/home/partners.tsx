import Image from "next/image";

const partners = [
  { name: "Assurance 1", src: "/images/partenaires/Assurance 1.png" },
  { name: "Assurance 2", src: "/images/partenaires/Assurance 2.png" },
  { name: "Banque 1", src: "/images/partenaires/Banque 1.png" },
  { name: "Banque 2", src: "/images/partenaires/Banque 2.png" },
  { name: "Banque 3", src: "/images/partenaires/Bnaque 3.png" },
  { name: "Banque 4", src: "/images/partenaires/Banque 4.png" },
];

export function Partners() {
  return (
    <section className="py-8 bg-surface-muted overflow-hidden border-y border-outline-variant/30">
      <div className="relative flex overflow-hidden">
        {/* We need two identical divs moving side by side for a seamless loop */}
        <div className="animate-marquee flex gap-12 md:gap-24 px-6 md:px-12 items-center">
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="relative w-48 h-20 md:w-64 md:h-28 shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                fill
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
