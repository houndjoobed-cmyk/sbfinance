import TemoignageFormPage from '../nouveau/page';

export default async function EditTemoignagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <TemoignageFormPage params={resolvedParams} />;
}
