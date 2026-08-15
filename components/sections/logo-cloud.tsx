import { InfiniteSlider, InfiniteSliderRef } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
  onCenterIndexChange?: (index: number) => void;
  activeIndex?: number;
  isTransitioning?: boolean;
};

export const LogoCloud = forwardRef<InfiniteSliderRef, LogoCloudProps>(
  function LogoCloud({ className, logos, onCenterIndexChange, activeIndex, isTransitioning, ...props }, ref) {
    return (
      <div
        {...props}
        className={cn(
          "overflow-hidden py-8 md:py-12 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] cursor-default",
          className
        )}
      >
        <InfiniteSlider 
          ref={ref}
          gap={42} 
          speed={120}
          onCenterIndexChange={onCenterIndexChange}
          activeIndex={activeIndex}
          isTransitioning={isTransitioning}
        >
          {logos.map((logo) => (
            <img
              alt={logo.alt}
              className="pointer-events-none h-24 md:h-32 lg:h-40 select-none object-contain"
              height={logo.height || "auto"}
              key={`logo-${logo.alt}`}
              loading="lazy"
              src={logo.src}
              width={logo.width || "auto"}
            />
          ))}
        </InfiniteSlider>
      </div>
    );
  }
);
