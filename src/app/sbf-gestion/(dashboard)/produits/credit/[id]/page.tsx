import ProduitCreditFormPage from '../nouveau/page';

export default function EditProduitCreditPage({ params }: { params: { id: string } }) {
  return <ProduitCreditFormPage params={params} />;
}
