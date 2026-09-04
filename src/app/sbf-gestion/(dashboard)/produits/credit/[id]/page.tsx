import ProduitCreditFormPage from '../nouveau/page';

export default async function EditProduitCreditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <ProduitCreditFormPage params={resolvedParams} />;
}
