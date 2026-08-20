import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  width: number;
  height?: number;
  name: string;
  description: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
  onLogoClick?: (logo: Logo, index: number) => void;
};

export function LogoCloud({ className, logos, onLogoClick, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={60} reverse={false} speed={80}>
        {logos.map((logo, index) => (
          <img
            alt={logo.alt}
            className="pointer-events-auto h-12 select-none md:h-16 lg:h-20 brightness-0 invert cursor-pointer hover:scale-110 transition-transform duration-300"
            height={logo.height || "auto"}
            key={`logo-${logo.alt}-${index}`}
            loading="lazy"
            src={logo.src}
            width={logo.width || "auto"}
            onClick={() => onLogoClick?.(logo, index)}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
