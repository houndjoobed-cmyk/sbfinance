import AgenceFormPage from '../nouveau/page';

export default async function EditAgencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <AgenceFormPage params={resolvedParams} />;
}
