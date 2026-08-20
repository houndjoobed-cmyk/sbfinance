import React from 'react';

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-[#0991b5]">
          <h3 className="text-gray-500 text-sm font-medium">Demandes en attente</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-[#0991b5]">
          <h3 className="text-gray-500 text-sm font-medium">Agences</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-[#0991b5]">
          <h3 className="text-gray-500 text-sm font-medium">Actualités publiées</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-[#0991b5]">
          <h3 className="text-gray-500 text-sm font-medium">Produits</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">15</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Bienvenue sur le portail d'administration SBF</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600">
            Utilisez le menu latéral pour gérer le contenu de votre site vitrine.
          </p>
        </div>
      </div>
    </div>
  );
}
