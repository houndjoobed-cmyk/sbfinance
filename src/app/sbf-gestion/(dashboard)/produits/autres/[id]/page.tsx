import ProduitAutreFormPage from '../nouveau/page';

export default async function EditProduitAutrePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <ProduitAutreFormPage params={resolvedParams} />;
}
