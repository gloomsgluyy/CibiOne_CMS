"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type InfiniteSliderProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  reverse?: boolean;
};

export function InfiniteSlider({
  children,
  gap = 42,
  speed = 80,
  reverse = false,
  className,
  ...props
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn("relative flex overflow-hidden", className)}
    >
      <div
        className="flex shrink-0 animate-infinite-scroll"
        style={{
          gap: `${gap}px`,
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {childrenArray}
      </div>
      <div
        className="flex shrink-0 animate-infinite-scroll"
        style={{
          gap: `${gap}px`,
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
        aria-hidden="true"
      >
        {childrenArray}
      </div>
    </div>
  );
}
