import {
  CardTestimonial,
  TestimonialQuote,
} from "@/components/ui/card-testimonial";
import { QuoteIcon } from "lucide-react";

const quote = "Setiap prestasi lahir dari kerja keras, semangat belajar, dan keberanian untuk terus berkembang. Kami bangga melihat siswa-siswi kami mengasah kompetensi, mengembangkan potensi, dan meraih berbagai pencapaian yang membawa nama sekolah ke tingkat yang lebih tinggi.";

export function SchoolQuote() {
  return (
    <section aria-label="Quote prestasi" className="relative z-20 h-0 px-4 md:px-8">
      <CardTestimonial
        testimonialQuote={quote}
        testimonialAuthor={{
          authorName: "Sugiyo, S.Pd, M.Pd",
          description: "Kepala SMKN 1 Cibinong",
        }}
        className="relative mx-auto min-h-[360px] w-full max-w-3xl -translate-y-1/2 justify-center border-t-4 border-t-blue-600 px-5 py-8 shadow-[0_24px_70px_rgba(2,8,23,0.2)] sm:h-[280px] sm:min-h-0 sm:px-8 sm:py-6"
      >
        <span className="pointer-events-none absolute -right-2 -top-16 text-[11rem] font-serif leading-none text-blue-600/[0.06]" aria-hidden="true">
          &rdquo;
        </span>
        <div className="relative flex text-base sm:text-lg">
          <sup><QuoteIcon className="size-5 fill-slate-200 stroke-none sm:size-6" /></sup>
          <TestimonialQuote className="my-2 leading-relaxed" />
          <sup className="self-end"><QuoteIcon className="size-5 fill-slate-200 stroke-none sm:size-6" /></sup>
        </div>
      </CardTestimonial>
    </section>
  );
}
