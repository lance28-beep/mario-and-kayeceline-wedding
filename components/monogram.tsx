"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type MonogramProps = React.HTMLAttributes<HTMLSpanElement> & {
  color?: string
}

/**
 * Renders the monogram asset as a mask so the fill color
 * can be updated via the `color` prop (default #8EA58B).
 */
export function Monogram({
  className,
  color = "#8EA58B",
  style,
  "aria-label": ariaLabel,
  ...rest
}: MonogramProps) {
  return (
    <span
      {...rest}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      className={cn("inline-block", className)}
      style={{ aspectRatio: "418 / 197", ...style }}
    >
      <span
        aria-hidden="true"
        className="block w-full h-full"
        style={{
          backgroundColor: color,
          WebkitMaskImage: "url(/monogram/monogram.png)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          maskImage: "url(/monogram/monogram.png)",
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
        }}
      />
    </span>
  )
}

