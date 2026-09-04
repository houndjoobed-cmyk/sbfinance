import React from 'react';
import { OffreForm } from '@/components/admin/offre-form';

export const metadata = {
  title: 'Nouvelle Offre d\'emploi | Administration SBF',
};

export default function NouvelleOffrePage() {
  return <OffreForm isEditing={false} />;
}
