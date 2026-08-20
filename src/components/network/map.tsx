"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export interface MapAgency {
  id: string;
  name: string;
  position: [number, number];
  address: string;
  phone: string;
  hours: string;
}

interface MapProps {
  agencies: MapAgency[];
}

export default function Map({ agencies }: MapProps) {
  useEffect(() => {
    // Leaflet config happens only on the client
    L.Marker.prototype.options.icon = customIcon;
  }, []);

  // Center on Abomey-Calavi / Cotonou area
  const center: [number, number] = [6.42, 2.36];

  return (
    <div className="h-full w-full">
      <MapContainer center={center} zoom={12} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {agencies.map((agency) => (
          <Marker key={agency.id} position={agency.position} icon={customIcon}>
            <Popup className="sbf-popup">
              <div className="p-1">
                <h3 className="font-bold text-primary-dark text-base mb-1">{agency.name}</h3>
                <p className="text-sm text-on-surface-variant mb-2">{agency.address}</p>
                <div className="text-sm font-medium mb-1 flex items-center">
                  <span className="text-accent mr-1">Tél:</span> {agency.phone}
                </div>
                <div className="text-xs text-on-surface-variant">
                  {agency.hours}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
