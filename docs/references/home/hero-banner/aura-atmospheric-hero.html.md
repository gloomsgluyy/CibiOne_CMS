# Reference — Aura Atmospheric Hero

Sumber: code Aura Build yang dikirim PIC di chat untuk section Home / Hero Banner.

Deskripsi PIC:

Full-screen atmospheric hero section featuring layered image background with cursor-based radial reveal, custom dual cursor, animated title, navigation links, and a press-and-hold circular enter button. Styled primarily with Tailwind and custom CSS for cinematic landing pages.

Catatan pemakaian:

- Ini reference utama untuk mood Hero Banner.
- Implementasi project harus diubah ke React/TypeScript + Tailwind.
- Background image harus dynamic dari CMS/mock props.
- Custom cursor/radial reveal desktop only.
- Jangan pakai CDN Tailwind runtime di project.

```html
<div class="relative min-h-screen text-white selection:bg-white selection:text-black overflow-hidden font-serif"
  style="background-color: #1a1c1a;">
  <script src="https://cdn.tailwindcss.com/3.4.17"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400;1,600&family=Syncopate:wght@400;700&display=swap');

    :root {
      --cursor-x: 50vw;
      --cursor-y: 50vh;
      --reveal-size: 250px;
    }

    .bg-layer {
      position: fixed;
      inset: 0;
      background-image: url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2674&auto=format&fit=crop');
      background-size: cover;
      background-position: center;
    }

    .layer-sharp {
      z-index: 1;
      filter: brightness(0.9) contrast(1.1);
    }

    .layer-mist {
      z-index: 2;
      filter: blur(25px) grayscale(0.4) brightness(0.9);
      transform: scale(1.05);
      mask-image: radial-gradient(circle var(--reveal-size) at var(--cursor-x) var(--cursor-y), transparent 0%, rgba(0, 0, 0, 0.5) 40%, black 100%);
      -webkit-mask-image: radial-gradient(circle var(--reveal-size) at var(--cursor-x) var(--cursor-y), transparent 0%, rgba(0, 0, 0, 0.5) 40%, black 100%);
    }

    .noise {
      position: fixed;
      inset: 0;
      z-index: 3;
      opacity: 0.12;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
      mix-blend-mode: overlay;
    }

    .nav-link {
      position: relative;
      font-family: 'Syncopate', sans-serif;
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.7);
      transition: color 0.3s ease;
    }

    .nav-link:hover {
      color: white;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 1px;
      background: white;
      transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .nav-link:hover::after {
      width: 100%;
    }

    .cursor-outer {
      position: fixed;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 100;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s;
      mix-blend-mode: difference;
    }

    .cursor-inner {
      position: fixed;
      top: 0;
      left: 0;
      width: 4px;
      height: 4px;
      background: white;
      border-radius: 50%;
      pointer-events: none;
      z-index: 101;
      transform: translate(-50%, -50%);
    }
  </style>

  <div class="bg-layer layer-sharp"></div>
  <div class="bg-layer layer-mist" id="mistLayer"></div>
  <div class="noise"></div>

  <div class="fixed inset-0 z-10 p-10 grid grid-cols-3 grid-rows-3 pointer-events-none">
    <div class="col-start-1 row-start-1 flex items-start">
      <a href="#" class="pointer-events-auto group flex items-center gap-3">
        <div class="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        <span class="font-sans text-xs tracking-[0.3em] font-bold text-white/90" style="font-family: 'Syncopate', sans-serif;">SANCTUARY</span>
      </a>
    </div>

    <div class="col-start-3 row-start-1 flex justify-end items-start text-right">
      <div class="font-sans text-[0.6rem] tracking-widest text-white/50 flex flex-col gap-1"
        style="font-family: 'Syncopate', sans-serif;">
        <span>45.4215° N</span>
        <span>75.6972° W</span>
      </div>
    </div>

    <div class="col-start-1 col-span-3 row-start-2 flex flex-col items-center justify-center relative">
      <div class="relative z-10 text-center mix-blend-overlay">
        <h1 class="text-[clamp(4rem,12vw,16rem)] leading-[0.85] font-light italic tracking-tighter opacity-90">
          <span class="block hover:translate-x-4 transition-transform duration-1000 ease-out">Infinite</span>
          <span class="block ml-[20%] hover:-translate-x-4 transition-transform duration-1000 ease-out">Stillness</span>
        </h1>
      </div>
      <p class="mt-8 font-sans text-xs tracking-[0.5em] text-white/60 uppercase animate-[bounce_4s_infinite]"
        style="font-family: 'Syncopate', sans-serif;">
        Find solace in the unseen
      </p>
    </div>

    <div class="col-start-1 row-start-3 flex items-end">
      <nav class="flex flex-col gap-6 pointer-events-auto">
        <a href="#" class="nav-link">Essence</a>
        <a href="#" class="nav-link">Archive</a>
        <a href="#" class="nav-link">Ethos</a>
      </nav>
    </div>

    <div class="col-start-2 row-start-3 flex flex-col items-center justify-end pb-4">
      <div class="relative pointer-events-auto group cursor-none" id="holdButton">
        <svg width="80" height="80" class="transform -rotate-90">
          <circle cx="40" cy="40" r="38" stroke="rgba(255,255,255,0.1)" stroke-width="1" fill="none"></circle>
          <circle id="progressRing" cx="40" cy="40" r="38" stroke="white" stroke-width="1" fill="none"
            stroke-dasharray="238.76" stroke-dashoffset="238.76"></circle>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="font-sans text-[0.6rem] tracking-widest uppercase text-white/80" style="font-family: 'Syncopate', sans-serif;">Enter</span>
        </div>
      </div>
    </div>
  </div>

  <div class="cursor-inner" id="cursorInner"></div>
  <div class="cursor-outer" id="cursorOuter"></div>

  <script>
    (function() {
      const inner = document.getElementById('cursorInner');
      const outer = document.getElementById('cursorOuter');
      let mx = window.innerWidth / 2, my = window.innerHeight / 2;
      let cx = mx, cy = my;

      document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        inner.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      });

      function loop() {
        cx += (mx - cx) * 0.15;
        cy += (my - cy) * 0.15;
        outer.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
        document.documentElement.style.setProperty('--cursor-x', `${cx}px`);
        document.documentElement.style.setProperty('--cursor-y', `${cy}px`);
        requestAnimationFrame(loop);
      }
      loop();

      const btn = document.getElementById('holdButton');
      const ring = document.getElementById('progressRing');
      const circ = 2 * Math.PI * 38;
      let holdId;

      const start = () => {
        let startT = null;
        const dur = 1500;
        function step(t) {
          if (!startT) startT = t;
          const progress = Math.min((t - startT) / dur, 1);
          ring.style.strokeDashoffset = circ - (progress * circ);
          if (progress < 1) holdId = requestAnimationFrame(step);
          else window.location.reload();
        }
        holdId = requestAnimationFrame(step);
      };

      const end = () => {
        cancelAnimationFrame(holdId);
        ring.style.transition = 'stroke-dashoffset 0.3s ease-out';
        ring.style.strokeDashoffset = circ;
        setTimeout(() => ring.style.transition = 'none', 300);
      };

      btn.addEventListener('mousedown', start);
      btn.addEventListener('mouseup', end);
      btn.addEventListener('mouseleave', end);
      
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => outer.style.transform += ' scale(1.5)');
        el.addEventListener('mouseleave', () => outer.style.transform = outer.style.transform.replace(' scale(1.5)', ''));
      });
    })();
  </script>
</div>
```
