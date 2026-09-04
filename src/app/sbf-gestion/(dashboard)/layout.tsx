"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  MessageSquare, 
  Briefcase, 
  UserPlus, 
  MessageCircle, 
  Landmark, 
  Globe,
  Palette,
  CreditCard
} from 'lucide-react';
import { LogoutButton } from '@/components/admin/logout-button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Tableau de bord', href: '/sbf-gestion', icon: Home, exact: true },
    { label: 'Produits & Crédits', href: '/sbf-gestion/produits', icon: CreditCard },
    { label: 'Contenu Épargne', href: '/sbf-gestion/contenu-epargne', icon: Landmark },
    { label: "Réseau d'Agences", href: '/sbf-gestion/agences', icon: Users },
    { label: 'Actualités', href: '/sbf-gestion/actualites', icon: FileText },
    { label: 'Témoignages', href: '/sbf-gestion/temoignages', icon: MessageCircle },
    { label: 'Demandes Contacts', href: '/sbf-gestion/contacts', icon: MessageSquare },
    { label: "Offres d'emploi", href: '/sbf-gestion/offres', icon: Briefcase },
    { label: 'Candidatures', href: '/sbf-gestion/candidatures', icon: UserPlus },
    { label: 'Contenu Accueil', href: '/sbf-gestion/contenu-accueil', icon: Globe },
    { label: 'Apparence & Thème', href: '/sbf-gestion/apparence', icon: Palette },
    { label: 'Contenu Mobilis', href: '/sbf-gestion/contenu-mobilis', icon: Landmark },
    { label: 'Paramètres', href: '/sbf-gestion/parametres', icon: Settings },
  ];

  return (
    <div 
      className="min-h-screen bg-gray-100 flex flex-col md:flex-row admin-scope"
      style={{
        '--color-primary': '#01438F',
        '--color-primary-dark': '#00326e',
        '--color-accent': '#EB001B',
        '--color-accent-hover': '#c80017',
        '--radius-button': '0px'
      } as React.CSSProperties}
    >
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#111e36] text-white shrink-0 flex flex-col">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">SBF Admin</h2>
            <p className="text-xs text-gray-400">Gestion de contenu</p>
          </div>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#0991b5] text-white shadow-sm' 
                    : 'text-gray-300 hover:bg-[#243048] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 mr-3 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800">
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
