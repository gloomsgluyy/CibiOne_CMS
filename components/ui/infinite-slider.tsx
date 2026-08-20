"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  className?: string;
  onCenterIndexChange?: (index: number) => void;
  activeIndex?: number;
  isTransitioning?: boolean;
}

export interface InfiniteSliderRef {
  moveOneStep: () => void;
  pause: () => void;
  resume: () => void;
}

export const InfiniteSlider = forwardRef<InfiniteSliderRef, InfiniteSliderProps>(function InfiniteSlider({
  children,
  gap = 16,
  speed = 35, // Reduced from 50 to 35 for slower movement
  className,
  onCenterIndexChange,
  activeIndex = 0,
  isTransitioning = false,
}, ref) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const translateXRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [itemWidth, setItemWidth] = useState<number>(0);
  
  const items = React.Children.toArray(children);
  const totalItems = items.length;

  // Calculate item width on mount and resize
  useEffect(() => {
    const updateItemWidth = () => {
      if (itemsRef.current[0]) {
        const rect = itemsRef.current[0].getBoundingClientRect();
        setItemWidth(rect.width + gap);
      }
    };

    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    return () => window.removeEventListener('resize', updateItemWidth);
  }, [gap, items.length]);

  // Move one step forward (single slot movement)
  const moveOneStep = () => {
    if (!itemWidth || !sliderRef.current) return;
    
    const stepDistance = itemWidth; // ONE slot = itemWidth + gap (already calculated)
    const startX = translateXRef.current;
    const targetX = startX - stepDistance; // Move left (forward)
    const duration = 550; // 550ms for smooth one-step transition
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeInOutCubic) for smooth feel
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const currentX = startX + (targetX - startX) * eased;
      translateXRef.current = currentX;
      
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${currentX}px)`;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    moveOneStep: () => {
      moveOneStep();
    },
    pause: () => {
      isPausedRef.current = true;
    },
    resume: () => {
      isPausedRef.current = false;
    }
  }));

  // Auto-scroll animation
  useEffect(() => {
    if (!itemWidth || totalItems === 0) return;
    
    let isActive = true;
    const sequenceLength = totalItems * itemWidth;

    const animate = () => {
      if (!isActive || isPausedRef.current || isTransitioning) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Move continuously - speed reduced from 50 to 35
      translateXRef.current -= speed / 60; // Normalize to 60fps
      
      // Seamless loop: when we've moved one full sequence, reset position
      // but visually it looks continuous because we have duplicates
      if (Math.abs(translateXRef.current) >= sequenceLength) {
        translateXRef.current = 0;
      }
      
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${translateXRef.current}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, itemWidth, totalItems, isTransitioning]);

  // Center focus effect and detect center logo
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !itemWidth) return;

    let isActive = true;

    const updateFocusAndDetectCenter = () => {
      if (!isActive || !container) return;

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      const logos = container.querySelectorAll<HTMLElement>('.logo-item');
      logos.forEach((logo, visualIndex) => {
        const logoRect = logo.getBoundingClientRect();
        const logoCenterX = logoRect.left + logoRect.width / 2;
        const distance = Math.abs(centerX - logoCenterX);
        
        // Track closest logo
        if (distance < closestDistance) {
          closestDistance = distance;
          // Convert visual index to logical index
          closestIndex = visualIndex % totalItems;
        }

        // Apply center focus effect
        const maxDistance = containerRect.width / 2;
        const proximity = Math.max(0, Math.min(1, 1 - distance / maxDistance));

        const scale = 0.92 + proximity * 0.16; // 0.92 to 1.08
        const opacity = 0.75 + proximity * 0.25; // 0.75 to 1.0

        logo.style.transform = `scale(${scale})`;
        logo.style.opacity = `${opacity}`;
      });

      // Notify parent of center index change
      if (onCenterIndexChange && !isTransitioning) {
        onCenterIndexChange(closestIndex);
      }

      animationFrameRef.current = requestAnimationFrame(updateFocusAndDetectCenter);
    };

    const rafId = requestAnimationFrame(updateFocusAndDetectCenter);

    return () => {
      isActive = false;
      cancelAnimationFrame(rafId);
    };
  }, [onCenterIndexChange, totalItems, itemWidth, isTransitioning]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex overflow-hidden", className)}
    >
      <div
        ref={sliderRef}
        className="flex items-center"
        style={{ 
          gap: `${gap}px`,
          transition: 'none',
          willChange: 'transform'
        }}
      >
        {/* Original sequence */}
        {items.map((item, index) => (
          <div 
            key={`item-${index}`} 
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="flex-shrink-0 logo-item"
            style={{ transition: 'transform 0.2s ease, opacity 0.2s ease' }}
          >
            {item}
          </div>
        ))}
        {/* Duplicate sequence for seamless loop */}
        {items.map((item, index) => (
          <div 
            key={`duplicate-${index}`} 
            className="flex-shrink-0 logo-item"
            style={{ transition: 'transform 0.2s ease, opacity 0.2s ease' }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
});
