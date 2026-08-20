"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "accent" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

import { Slot } from "@radix-ui/react-slot";
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    
    // We add liquid-btn to trigger the pseudo-element in globals.css
    // isolation-isolate ensures the z-index: -1 pseudo-element stays above the background but below the text
    const baseStyles = "liquid-btn relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 group hover:scale-[1.03] active:scale-[0.95] isolate";
    
    // Tailwind classes mapping
    const variants = {
      default: "bg-surface-white text-on-surface border border-outline hover:text-white",
      primary: "bg-primary text-white shadow-[var(--shadow-button)]",
      accent: "bg-accent text-white shadow-[var(--shadow-button)]",
      outline: "border border-primary text-primary hover:text-white",
      ghost: "text-primary hover:text-white",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-12 rounded-lg px-8 text-base",
      icon: "h-10 w-10",
    };

    const Comp = asChild ? Slot : "button";
    
    // Determine the liquid fill color
    const fillColors = {
      default: "var(--color-primary)",
      primary: "var(--color-primary-dark)",
      accent: "var(--color-accent-hover)",
      outline: "var(--color-primary)",
      ghost: "var(--color-primary)",
      link: "transparent",
    };
    
    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        style={{
          '--liquid-fill': fillColors[variant]
        } as React.CSSProperties}
        ref={ref as any}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
