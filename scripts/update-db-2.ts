import prisma from '../src/lib/prisma';

async function main() {
  const param = await prisma.parametresSite.findFirst();
  if (param && param.accueilContenu) {
    const contenu: any = param.accueilContenu;
    
    // Update the productsPreview part
    if (!contenu.productsPreview) {
      contenu.productsPreview = {};
    }
    contenu.productsPreview.backgroundText = "ACCOMPAGNEMENT";
    contenu.productsPreview.title = "Nous vous accompagnons";

    await prisma.parametresSite.update({
      where: { id: param.id },
      data: { accueilContenu: contenu }
    });
    console.log("Database updated successfully for productsPreview");
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
