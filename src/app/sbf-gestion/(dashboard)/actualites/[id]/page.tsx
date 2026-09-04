import ActualiteFormPage from '../nouveau/page';

export default async function EditActualitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <ActualiteFormPage params={resolvedParams} />;
}
