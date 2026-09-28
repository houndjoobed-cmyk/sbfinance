import prisma from '../src/lib/prisma';

async function main() {
  const param = await prisma.parametresSite.findFirst();
  if (param && param.accueilContenu) {
    const contenu: any = param.accueilContenu;
    
    // Update only the productsServices part
    contenu.productsServices = {
      backgroundText: "PRODUITS",
      title: "Nos offres & Promotions",
      subtitle: "Ce que nous offrons",
      items: [
        { id: "1", title: "Crédit", description: "Solutions de financement pour vos besoins de roulement, de consommation ou d'investissement.", image: "/images/products/credit-v2.jpg", link: "/produits/credit" },
        { id: "2", title: "Épargne", description: "Sécurisez votre avenir avec nos produits d'épargne: Houenoussou, Allodo, Ahossou, Zédaga et Kondokpo.", image: "/images/products/epargne-v2.jpg", link: "/produits/epargne" },
        { id: "3", title: "Appui", description: "Un soutien sur-mesure pour développer vos activités et pérenniser votre croissance.", image: "/images/products/appui.png", link: "/produits/appui" },
        { id: "4", title: "Conseil", description: "Expertise et accompagnement stratégique pour la gestion de votre entreprise.", image: "/images/products/conseil.jpeg", link: "/produits/conseil" },
        { id: "5", title: "Formation", description: "Renforcez vos compétences avec nos programmes d'éducation financière et entrepreneuriale.", image: "/images/products/formation.jpeg", link: "/produits/formation" },
        { id: "6", title: "Autres offres", description: "Découvrez nos offres personnalisées pour répondre à vos besoins spécifiques.", image: "/images/products/autre.jpeg", link: "/produits" }
      ]
    };

    await prisma.parametresSite.update({
      where: { id: param.id },
      data: { accueilContenu: contenu }
    });
    console.log("Database updated successfully");
  } else {
    console.log("No ParametresSite found");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
