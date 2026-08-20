"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail } from 'lucide-react';

// Custom SVG components for Social Brands since they were removed from lucide-react
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" clipRule="evenodd" />
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.031 0C5.395 0 0 5.394 0 12.031c0 2.128.552 4.195 1.6 6.012L.15 24l6.103-1.602a11.967 11.967 0 005.778 1.488h.005c6.634 0 12.029-5.394 12.029-12.031 0-3.216-1.252-6.241-3.526-8.514A11.977 11.977 0 0012.031 0zm0 21.849h-.003c-1.802 0-3.567-.484-5.114-1.402l-.367-.217-3.805.998.997-3.722-.238-.378a10.027 10.027 0 01-1.53-5.275c0-5.525 44.97-10.016 10.023-10.016 2.677 0 5.193 1.042 7.085 2.935 1.892 1.893 2.934 4.409 2.934 7.086 0 5.525-44.969 10.018-10.023 10.018zM17.534 14.5c-.302-.152-1.785-.882-2.062-.982-.276-.1-.478-.152-.678.151-.2.302-.78 1-.955 1.203-.175.201-.35.226-.652.075-1.523-.76-2.529-1.393-3.483-2.915-.246-.395.242-.363.682-1.233.15-.302.075-.578-.075-.879-.15-.302-.678-1.637-.93-2.242-.244-.59-.493-.51-.678-.52-.175-.008-.377-.008-.578-.008-.2 0-.528.075-.804.377-.276.302-1.054 1.031-1.054 2.515 0 1.485 1.08 2.923 1.23 3.125.151.201 2.13 3.252 5.158 4.561.721.311 1.283.498 1.725.637.724.23 1.383.197 1.9.119.58-.088 1.785-.728 2.036-1.433.25-.704.25-1.307.175-1.433-.075-.126-.276-.201-.578-.352z" clipRule="evenodd" />
  </svg>
);

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith('/sbf-gestion')) return null;

  return (
    <footer className="relative overflow-hidden text-white border-t-4 border-accent">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-finance.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-primary-dark/95"></div>
      </div>

      {/* Background Scrolling Text */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none z-1 select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[100px] md:text-[160px] lg:text-[220px] font-black text-white/3 uppercase tracking-tighter whitespace-nowrap leading-none pr-16 md:pr-32">
              SBF Finance
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-max px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="bg-white p-2 rounded inline-block">
              <Image
                src="/images/logos/logo-sbf.png"
                alt="SBF Logo"
                width={140}
                height={45}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-primary-light text-sm leading-relaxed">
              Institution de microfinance au Bénin dédiée à l&apos;amélioration des conditions de vie via des services financiers inclusifs et responsables.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-light hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-light hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-light hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="https://wa.me/2290128305976" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:text-white transition-colors">
                <span className="sr-only">WhatsApp</span>
                <WhatsappIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/a-propos" className="text-primary-light hover:text-white transition-colors text-sm">
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link href="/produits" className="text-primary-light hover:text-white transition-colors text-sm">
                  Nos produits
                </Link>
              </li>
              <li>
                <Link href="/reseau" className="text-primary-light hover:text-white transition-colors text-sm">
                  Notre réseau d&apos;agences
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="text-primary-light hover:text-white transition-colors text-sm">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-light hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/produits/credit" className="text-primary-light hover:text-white transition-colors text-sm">
                  Crédits
                </Link>
              </li>
              <li>
                <Link href="/produits/epargne" className="text-primary-light hover:text-white transition-colors text-sm">
                  Épargne
                </Link>
              </li>
              <li>
                <Link href="/produits/appui" className="text-primary-light hover:text-white transition-colors text-sm">
                  Appui
                </Link>
              </li>
              <li>
                <Link href="/produits/conseil" className="text-primary-light hover:text-white transition-colors text-sm">
                  Conseil
                </Link>
              </li>
              <li>
                <Link href="/produits/formation" className="text-primary-light hover:text-white transition-colors text-sm">
                  Formation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact & Siège</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-accent mr-3 mt-0.5 shrink-0" />
                <span className="text-sm text-primary-light">
                  ZOGBO Carré 553 Lot 1907 M 072, Arconville / Abomey-Calavi
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-accent mr-3 mt-0.5 shrink-0" />
                <span className="text-sm text-primary-light">
                  +229 01 21 38 05 87 <br /> +229 01 61 09 20 32
                </span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-accent mr-3 mt-0.5 shrink-0" />
                <a href="mailto:contact@sbfinance.bj" className="text-sm text-primary-light hover:text-white transition-colors">
                  contact@sbfinance.bj
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-primary-light">
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} Salem Braha Finance. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <span>Agrément N° A.20.0126.L</span>
            <span className="hidden md:inline">•</span>
            <span>RCCM RB/COT/11 B 8264</span>
            <span className="hidden md:inline">•</span>
            <span>IFU 3201101797911</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
