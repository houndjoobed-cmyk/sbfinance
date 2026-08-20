"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Section } from '@/components/layout/section';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - percentage, 4);
      
      countRef.current = Math.floor(end * easeProgress);
      setCount(countRef.current);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

interface NumbersProps {
  stats: Array<{
    value: number;
    label: string;
    suffix: string;
  }>;
}

export function Numbers({ stats }: NumbersProps) {

  return (
    <Section variant="primary" container={false} className="relative overflow-hidden py-16 md:py-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-finance.jpg"
          alt="Statistiques SBF"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/90"></div>
      </div>
      
      {/* Background Large Text */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none z-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[120px] md:text-[200px] lg:text-[260px] font-black text-white/5 uppercase tracking-tighter whitespace-nowrap leading-none pr-16 md:pr-32">
              Chiffres
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-display">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-primary-light text-sm md:text-base font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
