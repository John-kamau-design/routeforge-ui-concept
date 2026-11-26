import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play, ExternalLink } from 'lucide-react';

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
const RADIUS = 170;

export function Showcase3D() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [rotY, setRotY] = useState<number>(0);
  const [rotX, setRotX] = useState<number>(-6);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const touchStartY = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  // Sync selected card to whichever item is closest to front-facing
  useEffect(() => {
    const normalized = (((-rotY % 360) + 360) % 360);
    const nearest = Math.round(normalized / ANGLE_STEP) % ITEM_COUNT;
    setSelectedIndex(nearest);
  }, [rotY]);

  // Continuous multi-direction rotation when playing and not hovered
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    let frameId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      phaseRef.current += dt * 0.6;

      setRotY((prev) => (prev + dt * 20) % 360);
      setRotX(-6 + Math.sin(phaseRef.current) * 8);

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, isHovered]);

  // Vertical scroll / swipe-like wheel rotation over the 3D stage
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) < 2) return;
    setRotY((prev) => prev + e.deltaY * 0.14);
    setRotX((prev) => Math.max(-22, Math.min(18, prev - e.deltaY * 0.03)));
  };

  // Vertical touch swipe (up/down) to rotate the 3D globe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY.current - currentY;
    touchStartY.current = currentY;

    setRotY((prev) => prev + deltaY * 0.65);
    setRotX((prev) => Math.max(-22, Math.min(18, prev - deltaY * 0.12)));
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
  };

  const selectedItem = GLOBE_ITEMS[selectedIndex];

  return (
    <div className="mx-auto mt-6 flex w-full max-w-md flex-col items-center">
      {/* Minimal Floating Controls: Play/Pause + Active Item Link */}
      <div className="mb-2 flex w-full items-center justify-between px-1">
        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur-md transition hover:bg-white/10"
        >
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <span className="text-[11px] text-zinc-400">Swipe / scroll up or down</span>

        <a
          href={selectedItem.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-emerald-400 px-3 py-1 text-[11px] font-extrabold text-zinc-950 transition hover:bg-emerald-300"
        >
          <span>Shop</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Frameless 3D Globe Stage */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: '950px' }}
        className="relative flex h-60 w-full items-center justify-center overflow-visible select-none"
      >
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
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedIndex(idx)}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                className={`absolute inset-0 overflow-hidden rounded-xl border transition-shadow ${
                  isSelected
                    ? 'border-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.45)]'
                    : 'border-white/20 hover:border-emerald-300/70'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute right-1.5 bottom-1.5 left-1.5">
                  <span className="block truncate text-[10px] font-extrabold text-white">
                    {item.title}
                  </span>
                  <span className="block truncate text-[9px] font-semibold text-emerald-300">
                    {item.store}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Subtle Centered Caption */}
      <p className="mt-1 text-center text-xs font-bold text-zinc-200">
        {selectedItem.title}{' '}
        <span className="font-normal text-zinc-400">· {selectedItem.store}</span>
      </p>
    </div>
  );
}