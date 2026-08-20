import { cn } from "@/lib/utils";
import * as React from "react";

export function Avatar({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("relative flex shrink-0 overflow-hidden rounded-full", className)} {...props} />;
}

export function AvatarImage({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={cn("aspect-square size-full object-cover", className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("flex size-full items-center justify-center bg-slate-100", className)} {...props} />;
}
