'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function LogoutButton() {
  return (
    <button 
      onClick={async () => {
        await supabase.auth.signOut();
        window.location.href = '/sbf-gestion/login';
      }}
      className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-md transition-colors"
    >
      <LogOut className="w-5 h-5 mr-3" />
      Déconnexion
    </button>
  );
}
