import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  glowIntensity?: "low" | "medium" | "high"
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = "default", size = "default", glowIntensity = "medium", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
      default: "bg-black border border-green-500 text-green-500 hover:bg-green-950 shadow-glow",
      outline: "bg-transparent border border-green-500 text-green-500 hover:bg-green-950/20 shadow-glow-subtle",
      ghost: "bg-transparent text-green-500 hover:bg-green-950/20 hover:shadow-glow-subtle",
    }

    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 text-sm",
      lg: "h-11 px-8",
    }

    const glowStyles = {
      low: "shadow-glow-low",
      medium: "shadow-glow-medium",
      high: "shadow-glow-high",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], glowStyles[glowIntensity], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)

NeonButton.displayName = "NeonButton"

export { NeonButton }
