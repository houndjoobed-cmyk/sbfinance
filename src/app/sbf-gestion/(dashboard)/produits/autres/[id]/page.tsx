import ProduitAutreFormPage from '../nouveau/page';

export default function EditProduitAutrePage({ params }: { params: { id: string } }) {
  return <ProduitAutreFormPage params={params} />;
}
