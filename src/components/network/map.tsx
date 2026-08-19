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

// Coordinates approximate based on Cotonou / Abomey-Calavi area
const agencies = [
  {
    id: 1,
    name: "Arconville (Siège)",
    position: [6.435, 2.348] as [number, number],
    address: "ZOGBO Carré 553 Lot 1907 M 072, Arconville / Abomey-Calavi",
    phone: "+229 01 21 38 05 87",
    hours: "Lun-Ven: 08:00 - 17:00 | Sam: 09:00 - 13:00"
  },
  {
    id: 2,
    name: "Agence de Zogbo",
    position: [6.386, 2.383] as [number, number],
    address: "Zogbo central",
    phone: "+229 01 61 09 20 32",
    hours: "Lun-Ven: 08:00 - 17:00 | Sam: 09:00 - 13:00"
  },
  {
    id: 3,
    name: "Agence de Tankpè",
    position: [6.468, 2.327] as [number, number],
    address: "Carrefour Tankpè, Abomey-Calavi",
    phone: "+229 01 28 30 59 76",
    hours: "Lun-Ven: 08:00 - 17:00 | Sam: Fermé"
  },
  {
    id: 4,
    name: "Agence de Togba",
    position: [6.480, 2.290] as [number, number],
    address: "Togba Centre",
    phone: "+229 01 21 38 05 87",
    hours: "Lun-Ven: 08:00 - 17:00 | Sam: 09:00 - 13:00"
  },
  {
    id: 5,
    name: "Division Crédit aux Fonctionnaires",
    position: [6.360, 2.410] as [number, number],
    address: "Cotonou Centre",
    phone: "+229 01 61 09 20 32",
    hours: "Lun-Ven: 08:00 - 17:00 | Sam: Fermé"
  }
];

export default function Map() {
  useEffect(() => {
    // Leaflet config happens only on the client
    L.Marker.prototype.options.icon = customIcon;
  }, []);

  // Center on Abomey-Calavi / Cotonou area
  const center: [number, number] = [6.42, 2.36];

  return (
    <div className="w-full h-full min-h-[500px] z-0 relative rounded-xl overflow-hidden shadow-md border border-outline-variant">
      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={false} 
        className="w-full h-full absolute inset-0"
      >
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
