import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Numbers } from "@/components/home/numbers";
import { MissionVision } from "@/components/home/mission-vision";
import { ProductsPreview } from "@/components/home/products-preview";
import { NewsPreview } from "@/components/home/news-preview";
import { Testimonials } from "@/components/home/testimonials";
import { JoinUs } from "@/components/home/join-us";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// This runs on the server during SSG/SSR
export default async function Home() {
  let parametres = null;
  let recentNews: any[] = [];
  let publishedTestimonials: any[] = [];

  try {
    parametres = await prisma.parametresSite.findUnique({ where: { id: 1 } }) as any;
    
    recentNews = await prisma.actualite.findMany({
      where: { estPublie: true },
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    publishedTestimonials = await prisma.temoignage.findMany({
      where: { estAffiche: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
  } catch (error) {
    console.error("Database fetch error:", error);
  }
  
  if (!parametres) {
    parametres = {
      id: 1,
      mission: '',
      vision: '',
      valeurs: [],
      anneeCreation: 2009,
      nombreAgences: 5,
      nombreClients: 10000,
      telephonePrincipal: '',
      emailPrincipal: '',
      adresseSiege: '',
      createdAt: new Date(),
      updatedAt: new Date()
    } as any;
  }

  // Calculate experience dynamically based on creation year
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - parametres.anneeCreation;

  const stats = [
    { value: experienceYears, label: "Années d'expérience", suffix: "+" },
    { value: parametres.nombreAgences, label: "Points de service", suffix: "" },
    { value: parametres.nombreClients, label: "Clients satisfaits", suffix: "+" },
    { value: 138, label: "Millions FCFA Capital", suffix: "" },
  ];



  // Format testimonials for the component
  const formattedTestimonials = publishedTestimonials.map((t: any) => ({
    text: t.texte,
    author: t.nom,
    role: t.role,
    initial: t.nom.charAt(0).toUpperCase()
  }));

  // Fallback testimonials if none are found in the DB
  const defaultTestimonials = [
    {
      text: "Grâce au crédit de SBF, j'ai pu agrandir ma boutique et diversifier mes produits. Leur accompagnement a été précieux.",
      author: "Mme. Amoussou",
      role: "Commerçante au marché Dantokpa",
      initial: "A"
    },
    {
      text: "Les conditions d'épargne 'Ahossou' m'ont permis de sécuriser l'avenir de mes enfants avec un taux très avantageux.",
      author: "M. Kossi",
      role: "Artisan menuisier",
      initial: "K"
    }
  ];

  const displayTestimonials = formattedTestimonials.length > 0 ? formattedTestimonials : defaultTestimonials;

  // Parse hero carousel if available
  let heroSlides = undefined;
  if (parametres.heroCarousel && Array.isArray(parametres.heroCarousel)) {
    heroSlides = parametres.heroCarousel;
  }

  return (
    <>
      <Hero carouselSlides={heroSlides} />
      <Features />
      <Numbers stats={stats} />
      <MissionVision mission={parametres.mission} vision={parametres.vision} />
      <ProductsPreview />
      <NewsPreview news={recentNews} />
      <Testimonials testimonials={displayTestimonials} />
      <JoinUs />
    </>
  );
}
