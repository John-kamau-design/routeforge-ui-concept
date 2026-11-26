import React, { useState, useEffect, useRef } from 'react';
import {
  Pause,
  Play,
  Orbit,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';

const BASE_URL = 'https://routeforge.co.ke';

interface GlobeItem {
  id: string;
  title: string;
  store: string;
  tag: string;
  href: string;
  imageUrl: string;
}

const GLOBE_ITEMS: GlobeItem[] = [
  {
    id: 'sneakers-eu',
    title: 'Sneakers by EU Size',
    store: 'URurban Collection',
    tag: 'EU 38–45',
    href: `${BASE_URL}/shop?store=urban-collection`,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'luwama-meals',
    title: 'Chai, Mandazi & Chicken',
    store: 'Luwama Fast Food',
    tag: 'Jomoko, Thika',
    href: `${BASE_URL}/shop?store=luwama-fast-food`,
    imageUrl:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'zenimart-home',
    title: 'Home & Kitchen Picks',
    store: 'Zenimart Enterprise',
    tag: 'Household',
    href: `${BASE_URL}/shop?store=zenimart`,
    imageUrl:
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'caps-bags',
    title: 'Caps & Everyday Bags',
    store: 'URurban Collection',
    tag: 'Street Gear',
    href: `${BASE_URL}/products`,
    imageUrl:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'chips-bhajia',
    title: 'Masala Chips & Bhajia',
    store: 'Luwama Fast Food',
    tag: 'Hot Local Drop',
    href: `${BASE_URL}/shop?store=luwama-fast-food`,
    imageUrl:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'beauty-care',
    title: 'Beauty & Personal Care',
    store: 'Zenimart Enterprise',
    tag: 'Essentials',
    href: `${BASE_URL}/shop?store=zenimart`,
    imageUrl:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'full-catalog',
    title: 'All RouteForge Finds',
    store: 'Official Shop',
    tag: '13 Counties',
    href: `${BASE_URL}/shop`,
    imageUrl:
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=700&q=80',
  },
];

const ITEM_COUNT = GLOBE_ITEMS.length;
const ANGLE_STEP = 360 / ITEM_COUNT;
const RADIUS = 175; // 3D orbit radius in pixels

export function Showcase3D() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [rotY, setRotY] = useState<number>(0);
  const [rotX, setRotX] = useState<number>(-8);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const dragState = useRef<{
    active: boolean;
    moved: boolean;
    startX: number;
    startY: number;
    baseRotY: number;
    baseRotX: number;
  }>({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    baseRotY: 0,
    baseRotX: -8,
  });

  const phaseRef = useRef<number>(0);

  // Continuous multi-direction globe rotation when playing & not hovered/dragging
  useEffect(() => {
    if (!isPlaying || isHovered || dragState.current.active) return;

    let frameId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      phaseRef.current += dt * 0.65;

      // Spin around Y axis + gentle multi-axis pitch wave like a rotating globe
      setRotY((prev) => (prev + dt * 22) % 360);
      setRotX(-8 + Math.sin(phaseRef.current) * 9);

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, isHovered]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragState.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      baseRotY: rotY,
      baseRotX: rotX,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragState.current.moved = true;
    }

    setRotY(dragState.current.baseRotY + dx * 0.55);
    // Clamp vertical tilt so the globe stays readable
    const nextX = Math.max(-28, Math.min(24, dragState.current.baseRotX - dy * 0.35));
    setRotX(nextX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleReset = () => {
    phaseRef.current = 0;
    setRotY(0);
    setRotX(-8);
    setSelectedIndex(0);
  };

  const selectedItem = GLOBE_ITEMS[selectedIndex];

  return (
    <div className="mt-5 rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 shadow-2xl backdrop-blur-xl">
      {/* Top Bar: Title + Play/Pause + Reset */}
      <div className="flex items-center justify-between gap-2 pb-3">
        <div className="flex items-center gap-2">
          <Orbit className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold tracking-wider text-zinc-200 uppercase">
            3D Globe Showcase (7)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-lg border border-emerald-400/35 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-300 transition hover:bg-emerald-500/25"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3 w-3" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                Play 3D
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Reset 3D angle"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1.5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Interactive 3D Globe Stage (Drag anywhere to rotate manually) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ perspective: '950px', touchAction: 'none' }}
        className="relative flex h-60 w-full cursor-grab items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#070A12] active:cursor-grabbing"
      >
        {/* Subtle Globe Core Glow */}
        <div className="pointer-events-none absolute h-36 w-36 rounded-full bg-emerald-500/15 blur-2xl" />
        <div className="pointer-events-none absolute h-28 w-28 rounded-full border border-emerald-400/15" />

        {/* 3D Orbiting Ring */}
        <div
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transformStyle: 'preserve-3d',
          }}
          className="relative h-32 w-28"
        >
          {GLOBE_ITEMS.map((item, idx) => {
            const angle = idx * ANGLE_STEP;
            const isSelected = idx === selectedIndex;

            return (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (dragState.current.moved) return;
                  setSelectedIndex(idx);
                }}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                className={`group absolute inset-0 cursor-pointer overflow-hidden rounded-xl border transition-shadow ${
                  isSelected
                    ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.45)]'
                    : 'border-white/20 hover:border-emerald-300/70'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute right-1.5 bottom-1.5 left-1.5">
                  <span className="block truncate text-[10px] font-extrabold text-white">
                    {item.title}
                  </span>
                  <span className="block truncate text-[9px] font-semibold text-emerald-300">
                    {item.store}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helper Hint */}
        <span className="pointer-events-none absolute bottom-2 left-3 rounded-md bg-black/60 px-2 py-0.5 text-[10px] text-zinc-400">
          Drag in any direction · Click card to select
        </span>
      </div>

      {/* 7-Item Quick Selector Dots/Chips */}
      <div className="mt-3 flex items-center justify-between gap-1">
        {GLOBE_ITEMS.map((item, idx) => {
          const active = idx === selectedIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedIndex(idx);
                setRotY(-idx * ANGLE_STEP);
              }}
              className={`h-2 flex-1 rounded-full transition-all ${
                active
                  ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]'
                  : 'bg-white/15 hover:bg-white/35'
              }`}
              title={`${item.title} (${item.store})`}
              aria-label={`Select ${item.title}`}
            />
          );
        })}
      </div>

      {/* Selected Item Action Bar with Official RouteForge Page Link */}
      <div className="mt-3.5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 p-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-extrabold text-white">
            {selectedItem.title}
          </p>
          <p className="truncate text-[11px] text-zinc-400">
            {selectedItem.store} · <span className="text-emerald-300">{selectedItem.tag}</span>
          </p>
        </div>

        <a
          href={selectedItem.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-400 px-3.5 py-2 text-xs font-extrabold text-zinc-950 transition hover:bg-emerald-300"
        >
          <span>Shop Page</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}