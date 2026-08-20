import TemoignageFormPage from '../nouveau/page';

export default function EditTemoignagePage({ params }: { params: { id: string } }) {
  return <TemoignageFormPage params={params} />;
}
