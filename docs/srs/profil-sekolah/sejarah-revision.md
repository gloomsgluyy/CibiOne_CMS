# SRS: Sejarah Section - Revision

**Halaman**: Profil Sekolah  
**Section**: Sejarah  
**Fase**: Fase 1 (Frontend)  
**Status**: Done  
**Last Updated**: 2026-08-16

---

## 1. Overview

Revisi major untuk Sejarah Section dengan perubahan dari sticky cards design menjadi hero banner dengan scroll-triggered shrink animation yang transition ke vertical timeline layout.

### Objectives
- Implementasi hero banner dengan shrink animation saat scroll
- Timeline vertikal dengan scroll-animated progress line
- Smooth transition antara hero dan timeline
- Enhanced card design dengan backdrop blur dan gradient
- Responsive untuk semua screen sizes

---

## 2. Design Approach

### Previous Implementation
- Sticky cards yang stack saat scroll
- Multiple cards dengan sticky positioning

### New Implementation
- **Hero Section**: Full viewport height banner dengan sejarah singkat
  - Shrink dari 100vh ke 8vh saat scroll
  - Text size scaling animation
  - Blur dan fade out effect saat transition
- **Timeline Section**: Vertical timeline dengan progress line animation
  - 4 timeline entries (1965, 1990-2020, Prestasi, 2020-Sekarang)
  - Scroll-animated progress line
  - Enhanced cards dengan backdrop blur

---

## 3. Components Created/Modified

### 3.1 Timeline Component (NEW)
**File**: `components/ui/timeline.tsx` (100 lines)

**Features**:
- Vertical timeline layout dengan sticky year labels
- Scroll-animated progress line (gradient cyan-blue-white)
- Responsive grid (mobile: stacked, desktop: side-by-side)
- Custom scroll offset configuration

**Props**:
```typescript
interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

props: { data: TimelineEntry[] }
```

**Styling**:
- Background: #1b4d96 (blue theme)
- Progress line: 2px dengan gradient animation
- Sticky year labels pada scroll
- Responsive padding (pt-72 untuk title section)

### 3.2 Sejarah Section (MAJOR REWRITE)
**File**: `components/sections/profil-sekolah/sejarah-section.tsx` (241 lines)

**Structure**:
1. **Hero Banner** (sticky, top-0, z-20)
   - Initial: 100vh height, full screen
   - Shrinks to: 8vh height saat scroll progress 0-20%
   - Text scaling:
     - Subtitle: 2rem → 0.75rem
     - Title: 5.5rem → 1.25rem
   - Fade out dengan blur effect: scroll 15-21%
   - Background image dengan opacity 40%

2. **Timeline Section**
   - Fade in: scroll 22-25%
   - 4 historical entries dengan enhanced cards
   - Bottom padding: pb-32 untuk gap dengan section berikutnya

**Scroll Animation Timeline**:
```
0-20%:  Hero shrinks (100vh → 8vh)
15-21%: Hero fades out + blur (0-8px)
21-22%: Clean gap (hero gone, timeline not visible yet)
22-25%: Timeline fades in
```

**Timeline Data** (4 entries):
1. **1965 - Awal Mula Berdiri**
   - Founding story, 60+ years of education

2. **1990-2020 - Perkembangan Pesat**
   - 10 accredited programs, modern facilities

3. **Prestasi - Prestasi Gemilang**
   - Thousands of successful graduates

4. **2020-Sekarang - Era Digital & Inovasi**
   - Industry 4.0, teaching factory, digital transformation

---

## 4. Enhanced Card Design

### Card Styling
```tsx
className="group relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 
backdrop-blur-lg border border-white/30 rounded-3xl p-8 md:p-10 lg:p-12 
shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] 
transition-all duration-300 hover:scale-[1.02] hover:border-white/40"
```

**Features**:
- Gradient background (white/15 → white/5)
- Backdrop blur (lg)
- Subtle border (white/30)
- Colored shadows on hover (unique per card: blue/cyan variants)
- Gradient overlay on hover (from-{color}-500/10)
- Scale animation on hover (1.02)

### Icon Badges
- Gradient backgrounds (from-blue-400 to-blue-600, etc.)
- Shadow effects matching card color theme
- Rounded-xl styling
- 12x12 size (w-12 h-12)

---

## 5. Color Scheme

### Hero Section
- Background: #1b4d96 (primary blue)
- Text: white with drop-shadow
- Image overlay: opacity-40

### Timeline Section
- Background: #1b4d96 (matches hero)
- Progress line: gradient (from-transparent via-white/30)
- Animated line: gradient (from-cyan-400 via-blue-400 to-white)

### Cards
- Base: gradient white/15 to white/5
- Border: white/30 (hover: white/40)
- Shadows: colored (blue/cyan variants on hover)
- Text: white, white/95, white/90

---

## 6. Responsive Design

### Hero Text Sizing
- Mobile: Subtitle 2rem → 0.75rem, Title 5.5rem → 1.25rem
- Uses inline style with smooth transitions (0.3s ease-out)
- Scales proportionally on all viewports

### Timeline Layout
- Mobile: Year labels hidden, shown inline with content
- Desktop (md+): Year labels sticky on left, content on right
- Padding adjustments: pt-72 (title), pb-32 (bottom gap)

### Card Padding
- Small: p-8
- Medium: p-10
- Large: p-12

---

## 7. Animation Details

### Hero Shrink Animation
```typescript
useEffect(() => {
  if (scrollProgress <= 0.2) {
    const progress = scrollProgress / 0.2;
    height: 100 - (92 * progress); // 100vh → 8vh
    subtitleSize: 2 - (1.25 * progress); // 2rem → 0.75rem
    titleSize: 5.5 - (4.25 * progress); // 5.5rem → 1.25rem
  }
});
```

### Opacity Transforms
```typescript
scrollHintOpacity: [0, 0.08] → [1, 0]
heroOpacity: [0.15, 0.21] → [1, 0]
heroBlur: [0.15, 0.21] → [0, 8]
timelineOpacity: [0.22, 0.25] → [0, 1]
```

### Card Hover Effects
- scale-[1.02]: slight zoom
- Colored shadow transition
- Gradient overlay fade-in
- Border brightness increase

---

## 8. Technical Implementation

### Dependencies
- framer-motion (scroll animations, transforms, motion components)
- next/image (optimized images)
- React hooks (useRef, useEffect, useState)

### Performance Optimizations
- requestAnimationFrame untuk smooth scroll updates
- useTransform untuk GPU-accelerated animations
- Cleanup functions untuk prevent memory leaks
- Proper z-index layering (hero: z-20)

---

## 9. Section Configuration

### Container
- minHeight: 220vh (allows scroll space for all animations)
- Background: inherited from Timeline component (#1b4d96)

### Spacing
- Timeline title top: pt-72 (288px - ensures visibility after hero transition)
- Timeline bottom: pb-32 (128px - gap before next section)
- Cards: mb-8 internal spacing

---

## 10. Accessibility

- Semantic HTML structure (section, h2, h3, h4, p)
- Alt text untuk images
- Drop shadows untuk text readability over images
- Proper heading hierarchy
- Focus states untuk interactive elements
- Motion respects user preferences (smooth animations)

---

## 11. Browser Compatibility

- Modern browsers dengan CSS backdrop-filter support
- Graceful degradation untuk older browsers
- Tested on Chrome, Firefox, Safari, Edge
- Mobile responsive (iOS Safari, Chrome Mobile)

---

## 12. Known Issues & Solutions (Detailed Troubleshooting)

### Issue 1: Timeline Title Overlap with Hero Transition
**Problem**: Title "Perjalanan SMKN 1 Cibinong" overlapping with hero section during scroll transition. Text visible while hero still fading out, creating visual clash.

**Iteration 1**: Increased padding pt-32 (128px) and delayed timeline fade [0.14, 0.2]  
**Result**: Still overlapping during transition

**Iteration 2**: Further increased padding pt-40 (160px) and delayed timeline fade [0.18, 0.25]  
**Result**: Title not visible - scrolled past when timeline appeared

**Iteration 3**: Adjusted padding pt-24 (96px) and earlier timeline fade [0.20, 0.26]  
**Result**: Better but still slight overlap

**Final Solution**: 
- Increased padding to pt-72 (288px) - significantly lowers title position
- Adjusted hero fade out timing [0.15, 0.21] - completes earlier
- Timeline fade in [0.22, 0.25] - starts AFTER hero fully gone
- Clean 1% gap where neither visible (21-22%)
- Result: No overlap, smooth handoff

### Issue 2: Transition Feels Forced / Jarring
**Problem**: Abrupt transition between hero and timeline sections. User reported it feels "forced" and not smooth.

**Root Cause**: 
- Hero and timeline opacity overlapping during transition
- Transition ranges too short (felt rushed)
- No easing between section changes

**Solution**: 
- Extended hero shrink range: 0.15 → 0.2 (slower shrinking)
- Added blur effect on hero fade: 0-8px blur during [0.15, 0.21]
- Created clean gap: hero fades [0.15, 0.21], timeline fades [0.22, 0.25]
- No opacity overlap - hero must be gone before timeline appears
- Increased CSS transition duration: 0.2s → 0.3s ease-out
- Result: Natural, gradual transition without forced feeling

### Issue 3: Gap Between Sejarah and Visi Misi Sections
**Problem**: Spacing between timeline end and next section (Visi Misi) inconsistent with other section gaps.

**Iteration 1**: Set minHeight 300vh, timeline pb-20  
**Result**: Gap too large, lots of white space

**Iteration 2**: Reduced minHeight 250vh, timeline pb-8  
**Result**: Gap too small, sections feel cramped

**Final Solution**:
- Section minHeight: 220vh (balanced scroll space)
- Timeline bottom padding: pb-32 (128px)
- Result: Consistent gap matching other section spacing

### Issue 4: Scroll Hint Not Visible at Initial State
**Problem**: "Scroll untuk melihat lebih lanjut" text with bouncing arrow not visible when page loads. Hero appears but scroll indicator missing.

**Root Cause**:
- Scroll hint had conflicting opacity animations:
  - Framer Motion `initial={{ opacity: 0 }}` and `animate={{ opacity: 1 }}`
  - Style prop `style={{ opacity: scrollHintOpacity }}`
  - Style prop overrode animation, causing visibility issues
- Positioned inside flex container with absolute positioning (layout conflict)
- `mt-6` margin not working with absolute positioning

**Solution**:
- Removed conflicting `initial` and `animate` opacity props
- Only use `style={{ opacity: scrollHintOpacity }}` (value = 1 at scroll 0)
- Moved scroll hint outside flex container
- New structure: `absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center z-10`
- Separated icon and text into flex column layout with mb-2 spacing
- Increased icon size 20x20 → 24x24
- Increased bottom spacing bottom-8 → bottom-12 (48px)
- Changed text: `text-white/90` → `text-white font-medium`
- Added z-10 to ensure visibility above background
- Result: Scroll hint clearly visible at page load, fades out smoothly during scroll

### Issue 5: Hero Text Sizes Not Prominent Enough
**Problem**: Initial hero text "Sejarah Singkat" and "SMKN 1 Cibinong" not bold/prominent enough in initial full-screen state.

**Solution**:
- Increased subtitle: 1.5rem → 2rem (33% larger)
- Increased title: 4rem → 5.5rem (37.5% larger)
- Updated shrink calculations:
  - Subtitle: `2 - (1.25 * progress)` → 0.75rem
  - Title: `5.5 - (4.25 * progress)` → 1.25rem
- Result: More impactful, prominent text at initial state while maintaining readable shrunk sizes

### Issue 6: Structure Error - Duplicate Closing Tags
**Problem**: Syntax error with duplicate `</motion.div>` closing tag after scroll hint implementation, causing build failure.

**Root Cause**: Incorrect string replacement during scroll hint repositioning created extra closing tag.

**Solution**:
- Removed duplicate `</motion.div>` at line 234
- Fixed indentation hierarchy for proper nesting
- Verified structure: section → hero motion.div → hero div → (image + title + scroll hint) → proper closures → timeline
- Result: Clean code structure, no syntax errors

### Issue 7: Timeline Title Position Iteration Summary
**Problem**: Finding optimal position for "Perjalanan SMKN 1 Cibinong" title to avoid overlap while remaining visible.

**Padding Progression**:
1. pt-12 (48px) - Original, title overlapped
2. pt-32 (128px) - Still overlapping
3. pt-40 (160px) - Too high, title not visible when needed
4. pt-24 (96px) - Reduced, but still issues
5. pt-20 (80px) - Further reduced, overlap persisted
6. pt-56 (224px) - Increased significantly, better but not enough
7. **pt-72 (288px)** - FINAL: Perfect position, no overlap, fully visible

**Key Learning**: Timeline title needs significant top spacing (288px) due to:
- Hero section sticky positioning at top
- Scroll progress when timeline becomes visible
- Viewport height considerations
- User expects to see title when timeline content appears

---

## 13. Future Enhancements

- [ ] Add real school images (currently using placeholder /banner.jpeg)
- [ ] Consider adding parallax effect to hero background
- [ ] Add more timeline entries as school history grows
- [ ] Implement lazy loading untuk timeline cards
- [ ] Add CMS integration untuk editable timeline content

---

## 14. Files Modified

1. `components/ui/timeline.tsx` - NEW (100 lines)
2. `components/sections/profil-sekolah/sejarah-section.tsx` - REWRITTEN (241 lines)
3. `lib/utils.ts` - Updated cn() function with clsx + twMerge

---

## 15. Testing Checklist

**Hero Section:**
- [x] Hero starts at full 100vh height on page load
- [x] Hero shrink animation smooth di semua scroll speeds
- [x] Text sizes scale proportionally during shrink
- [x] Hero blur effect (0-8px) applies smoothly during fade
- [x] Scroll hint visible dan centered di bottom hero pada initial state
- [x] Scroll hint has bouncing arrow animation
- [x] Scroll hint fades out properly saat mulai scroll (0-8%)
- [x] Hero fades out completely before timeline appears
- [x] No overlap between hero dan timeline content
- [x] Background image loads dan displays correctly

**Timeline Section:**
- [x] Timeline title "Perjalanan SMKN 1 Cibinong" fully visible saat timeline muncul
- [x] Timeline fades in smoothly after hero disappears
- [x] No text overlap during hero-to-timeline transition
- [x] Progress line animates on scroll (gradient cyan-blue-white)
- [x] Year labels sticky positioning works on desktop
- [x] Cards hover effects working (scale 1.02, colored shadows)
- [x] Card backdrop blur dan gradient backgrounds display correctly
- [x] Icon badges dengan gradient shadows visible

**Responsive Design:**
- [x] Hero text readable di mobile (subtitle 2rem, title 5.5rem scales properly)
- [x] Timeline layout switches: desktop (side-by-side) vs mobile (stacked)
- [x] Scroll hint responsive (text-base md:text-lg)
- [x] Card padding adjusts (p-8 → p-10 → p-12)
- [x] Images responsive dan tidak distorted

**Spacing & Layout:**
- [x] Gap dengan Visi Misi section appropriate (pb-32 = 128px)
- [x] Timeline title top spacing sufficient (pt-72 = 288px)
- [x] Section minHeight (220vh) allows all animations
- [x] No unwanted white space atau layout breaks

**Performance & UX:**
- [x] Smooth scroll performance (no jank)
- [x] Animation tidak feels forced atau jarring
- [x] Transition timing feels natural
- [x] No duplicate closing tags atau syntax errors
- [x] All images load dengan proper priority

---

## 16. Approval

**Design Review**: ✅ Approved  
**Implementation**: ✅ Complete  
**Testing**: ✅ Passed  
**Deployment**: Ready

---

**Note**: Section ini merupakan salah satu dari 6 sections di Profil Sekolah page. Semua sections menggunakan consistent color scheme (#1e3a8a, #2563eb, #1b4d96, #eff7ff) dan Poppins font family.
