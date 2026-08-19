"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

const MapWithNoSSR = dynamic(() => import('@/components/network/map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] bg-surface-muted rounded-xl flex items-center justify-center border border-outline-variant animate-pulse">
      <div className="text-primary/50 flex flex-col items-center">
        <MapPin className="h-10 w-10 mb-4 animate-bounce" />
        <p className="font-medium">Chargement de la carte...</p>
      </div>
    </div>
  )
});

export function MapWrapper() {
  return <MapWithNoSSR />;
}
