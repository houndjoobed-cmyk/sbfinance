"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, Settings, MessageSquare, Briefcase, UserPlus } from 'lucide-react';
import { LogoutButton } from '@/components/admin/logout-button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#111e36] text-white shrink-0 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">SBF Admin</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <Link href="/sbf-gestion" className="flex items-center px-4 py-3 text-gray-300 hover:bg-[#243048] hover:text-white rounded-md transition-colors">
            <Home className="w-5 h-5 mr-3" />
            Tableau de bord
          </Link>
          <Link href="/sbf-gestion/produits" className="flex items-center px-4 py-3 text-gray-300 hover:bg-[#243048] hover:text-white rounded-md transition-colors">
            <Briefcase className="w-5 h-5 mr-3" />
            Produits & Crédits
          </Link>
          <Link href="/sbf-gestion/agences" className="flex items-center px-4 py-3 text-gray-300 hover:bg-[#243048] hover:text-white rounded-md transition-colors">
            <Users className="w-5 h-5 mr-3" />
            Réseau d'Agences
          </Link>
          <Link href="/sbf-gestion/actualites" className="flex items-center px-4 py-3 text-gray-300 hover:bg-[#243048] hover:text-white rounded-md transition-colors">
            <FileText className="w-5 h-5 mr-3" />
            Actualités
          </Link>
          <Link href="/sbf-gestion/contacts" className="flex items-center px-4 py-3 text-gray-300 hover:bg-[#243048] hover:text-white rounded-md transition-colors">
            <MessageSquare className="w-5 h-5 mr-3 shrink-0" />
            Demandes
          </Link>
          <Link href="/sbf-gestion/candidatures" className={`flex items-center px-4 py-3 rounded-md transition-colors ${pathname.startsWith('/sbf-gestion/candidatures') ? 'bg-[#243048] text-white' : 'text-gray-300 hover:bg-[#243048] hover:text-white'}`}>
            <UserPlus className="w-5 h-5 mr-3 shrink-0" />
            Candidatures
          </Link>
          <Link href="/sbf-gestion/contenu-accueil" className={`flex items-center px-4 py-3 rounded-md transition-colors ${pathname.startsWith('/sbf-gestion/contenu-accueil') ? 'bg-[#243048] text-white' : 'text-gray-300 hover:bg-[#243048] hover:text-white'}`}>
            <Home className="w-5 h-5 mr-3 shrink-0" />
            Contenu Accueil
          </Link>
          <Link href="/sbf-gestion/contenu-mobilis" className={`flex items-center px-4 py-3 rounded-md transition-colors ${pathname.startsWith('/sbf-gestion/contenu-mobilis') ? 'bg-[#243048] text-white' : 'text-gray-300 hover:bg-[#243048] hover:text-white'}`}>
            <Briefcase className="w-5 h-5 mr-3 shrink-0" />
            Contenu Mobilis
          </Link>
          <Link href="/sbf-gestion/parametres" className={`flex items-center px-4 py-3 rounded-md transition-colors ${pathname.startsWith('/sbf-gestion/parametres') ? 'bg-[#243048] text-white' : 'text-gray-300 hover:bg-[#243048] hover:text-white'}`}>
            <Settings className="w-5 h-5 mr-3 shrink-0" />
            Paramètres
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
