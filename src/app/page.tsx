import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Numbers } from "@/components/home/numbers";
import { MissionVision } from "@/components/home/mission-vision";
import { ProductsPreview } from "@/components/home/products-preview";
import { NewsPreview } from "@/components/home/news-preview";
import { Testimonials } from "@/components/home/testimonials";
import { DgQuote } from "@/components/home/dg-quote";
import { Partners } from "@/components/home/partners";
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

  // Calculate experience dynamically based on creation year (Disabled to use fixed 15+)
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - parametres.anneeCreation;

  const stats = [
    { value: 15, label: "Années d'expérience", suffix: "+" },
    { value: parametres.nombreAgences, label: "Points de service", suffix: "" },
    { value: parametres.nombreClients, label: "Clients satisfaits", suffix: "+" },
    { value: "1,5", label: "Milliard FCFA Capital", suffix: "" },
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

  // Default content matching the dashboard default
  const defaultContent = {
    hero: [
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
    ],
    dgQuote: {
      image: "/images/home/dg-new.png",
      quote: "Notre mission dépasse la simple gestion de l'argent ; nous protégeons vos efforts. Chez SBF, nous croyons que chaque trajectoire, qu'elle soit dans le secteur formel ou informel, mérite d'être sécurisée et valorisée. Bienvenue dans notre communauté de progrès.",
      author: "Dr. Ahonon Houekin Augustine",
      role: "Directrice Générale, Salem Braha Finance"
    },
    features: {
      backgroundText: "Atouts",
      title: "Pourquoi SBF ?",
      subtitle: "Nos piliers fondateurs",
      items: [
        { title: "Vision à l'horizon 2035", description: "Être une institution de microfinance leader dans la finance inclusive, responsable et environnementale au Bénin.", icon: "TrendingUp", link: "/a-propos" },
        { title: "Mission", description: "Contribuer à l'amélioration des conditions de vie des personnes à faible revenu via des services financiers et non financiers adaptés.", icon: "Users", link: "/a-propos" },
        { title: "Nos Valeurs", description: "Le Respect, l'Intégrité et l'Efficacité guident toutes nos actions au quotidien.", icon: "ShieldCheck", link: "/a-propos" }
      ]
    },
    missionVision: {
      image: "/images/home/Engagement.jpeg",
      backgroundText: "Vision",
      title: "Plus que du financement, un véritable partenaire de croissance.",
      buttonText: "En savoir plus sur nous",
      buttonLink: "/a-propos"
    },
    partners: {
      title: "Ils nous font confiance",
      items: [] as any[]
    },
    productsPreview: {
      backgroundText: "Produits",
      title: "Nos Offres de Crédit",
      subtitle: "Nos piliers fondateurs"
    },
    newsPreview: {
      backgroundText: "ACTUALITÉS",
      title: "Restez informés",
      subtitle: "Les dernières nouveautés"
    },
    testimonials: {
      title: "Ce qu'ils disent de nous",
      subtitle: "Découvrez les retours d'expérience"
    },
    joinUs: {
      image: "/images/home/REJOIGNEZ-NOUS.png",
      title: "Rejoignez-nous",
      text: "Travailler chez SBF, c'est rejoindre une institution engagée auprès de ses clients",
      buttons: [
        { id: "1", text: "Demande de crédit", link: "/contacts" },
        { id: "2", text: "Compte d'épargne", link: "/produits" },
        { id: "3", text: "Nos offres d'emploi", link: "/carrieres" }
      ]
    }
  };

  const content = parametres?.accueilContenu ? { ...defaultContent, ...(parametres.accueilContenu as any) } : defaultContent;

  // Parse hero carousel if available
  let heroSlides = undefined;
  if (content.hero && Array.isArray(content.hero) && content.hero.length > 0) {
    heroSlides = content.hero;
  } else if (parametres.heroCarousel && Array.isArray(parametres.heroCarousel)) {
    heroSlides = parametres.heroCarousel;
  }

  return (
    <>
      <Hero carouselSlides={heroSlides} />
      <Features content={content.features} />
      <Numbers stats={stats} />
      <MissionVision mission={parametres.mission} vision={parametres.vision} content={content.missionVision} />
      <Partners content={content.partners} />
      <DgQuote content={content.dgQuote} />
      <ProductsPreview content={content.productsPreview} />
      <NewsPreview news={recentNews} content={content.newsPreview} />
      <Testimonials testimonials={displayTestimonials} content={content.testimonials} />
      <JoinUs content={content.joinUs} />
    </>
  );
}
