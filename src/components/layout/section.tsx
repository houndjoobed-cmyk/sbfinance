import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "muted" | "primary" | "light";
  container?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", container = true, children, ...props }, ref) => {
    
    const variants = {
      default: "bg-surface-white",
      muted: "bg-surface-muted",
      primary: "bg-primary text-white",
      light: "bg-primary-light",
    };

    return (
      <section
        ref={ref}
        className={cn(
          "py-[var(--spacing-section)]", 
          variants[variant],
          className
        )}
        {...props}
      >
        {container ? (
          <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    )
  }
)
Section.displayName = "Section"

export { Section }
