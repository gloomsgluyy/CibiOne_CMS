"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, cardVariants } from "@/components/ui/card-testimonial-utils/card";
import { RatingStars } from "@/components/ui/card-testimonial-utils/rating-stars";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

interface AuthorProps extends React.HTMLAttributes<HTMLDivElement> {
  authorName: string;
  avatarUrl?: string;
  description?: string;
}

interface CardTestimonialProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  testimonialQuote: string;
  testimonialAuthor: AuthorProps;
  testimonialRating?: number;
}

const CardTestimonialContext = React.createContext<Pick<CardTestimonialProps, "testimonialQuote" | "testimonialAuthor" | "testimonialRating"> | undefined>(undefined);

function useCardTestimonialContext() {
  const context = React.useContext(CardTestimonialContext);
  if (!context) throw new Error("Testimonial components must be used within CardTestimonial");
  return context;
}

export function CardTestimonial({ testimonialQuote, testimonialAuthor, testimonialRating, className, children, variant, ...props }: CardTestimonialProps) {
  return (
    <CardTestimonialContext.Provider value={{ testimonialQuote, testimonialAuthor, testimonialRating }}>
      <Card className={cn(className)} variant={variant} {...props}>{children}</Card>
    </CardTestimonialContext.Provider>
  );
}

export function TestimonialAuthor({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { testimonialAuthor: { authorName, avatarUrl, description } } = useCardTestimonialContext();
  return (
    <div className={className} {...props}>
      <Avatar className="size-10">
        {avatarUrl && <AvatarImage src={avatarUrl} alt={`Portrait of ${authorName}`} />}
        {!avatarUrl && <AvatarFallback>{authorName.split(" ").map((name) => name[0]).join("")}</AvatarFallback>}
      </Avatar>
      <div>
        <h4 className="block text-lg font-semibold tracking-tight md:text-xl">{authorName}</h4>
        <span className="block text-sm text-slate-500">{description}</span>
      </div>
      {children}
    </div>
  );
}

export function TestimonialRating({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <RatingStars className={className} rating={useCardTestimonialContext().testimonialRating ?? 0} {...props} />;
}

export function TestimonialQuote({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return <blockquote className={className} {...props}>{useCardTestimonialContext().testimonialQuote}</blockquote>;
}
