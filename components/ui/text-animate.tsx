"use client";

import type { HTMLAttributes } from "react";

type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "popIn"
  | "shiftInUp"
  | "rollIn"
  | "whipIn"
  | "whipInUp"
  | "calmInUp";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
  type?: AnimationType;
  delay?: number;
  duration?: number;
}

const animationClass: Record<AnimationType, string> = {
  fadeIn: "animate-text-fade-in",
  fadeInUp: "animate-text-fade-in-up",
  popIn: "animate-text-pop-in",
  shiftInUp: "animate-text-shift-in-up",
  rollIn: "animate-text-roll-in",
  whipIn: "animate-text-whip-in",
  whipInUp: "animate-text-whip-in-up",
  calmInUp: "animate-text-calm-in-up",
};

function TextAnimate({
  text,
  type = "whipInUp",
  delay = 0,
  duration = 0.75,
  className = "",
  ...props
}: Props) {
  return (
    <h2
      className={`flex overflow-hidden text-center text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] ${className}`}
      {...props}
    >
      {Array.from(text).map((letter, index) => (
        <span
          aria-hidden="true"
          className={`inline-block ${animationClass[type]}`}
          key={`${letter}-${index}`}
          style={{
            animationDelay: `${delay + index * 0.01}s`,
            animationDuration: `${duration}s`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </h2>
  );
}

export { TextAnimate };
export default TextAnimate;
