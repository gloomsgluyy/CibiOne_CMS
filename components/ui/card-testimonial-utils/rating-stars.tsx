import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import * as React from "react";

export function RatingStars({ rating, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { rating: number }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label={`${rating} dari 5 bintang`} {...props}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className={cn("size-5", index < rating && "fill-current")} />
      ))}
    </div>
  );
}
