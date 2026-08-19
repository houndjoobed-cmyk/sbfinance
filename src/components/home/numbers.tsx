"use client";

import React, { useEffect, useRef, useState } from 'react';
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

export function Numbers() {
  const stats = [
    { value: 15, label: "Années d'expérience", suffix: "+" },
    { value: 5, label: "Points de service", suffix: "" },
    { value: 10000, label: "Clients satisfaits", suffix: "+" }, // Placeholder value, as actual wasn't specified yet
    { value: 138, label: "Millions FCFA Capital", suffix: "" },
  ];

  return (
    <Section variant="primary" className="relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white opacity-5"></div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center relative z-10">
        {stats.map((stat, index) => (
          <div key={index} className={`reveal-up delay-${(index + 1) * 100}`}>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-display">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-primary-light text-sm md:text-base font-medium uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
