import AgenceFormPage from '../nouveau/page';

export default function EditAgencePage({ params }: { params: { id: string } }) {
  return <AgenceFormPage params={params} />;
}
