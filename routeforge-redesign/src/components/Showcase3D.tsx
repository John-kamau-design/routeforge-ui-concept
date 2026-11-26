import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play, ExternalLink, RotateCcw } from 'lucide-react';

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
const RADIUS_X = 210;
const RADIUS_Z = 140;

export function Showcase3D() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [rotY, setRotY] = useState<number>(0);
  const [tiltX, setTiltX] = useState<number>(0.18);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const normalized = (((-rotY % 360) + 360) % 360);
    const nearest = Math.round(normalized / ANGLE_STEP) % ITEM_COUNT;
    setSelectedIndex(nearest);
  }, [rotY]);

  useEffect(() => {
    if (!isPlaying || isHovered) return;

    let frameId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      phaseRef.current += dt * 0.55;

      setRotY((prev) => (prev + dt * 22) % 360);
      setTiltX(0.18 + Math.sin(phaseRef.current) * 0.14);

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, isHovered]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const move = e.deltaY + e.deltaX;
    if (Math.abs(move) < 1) return;

    setRotY((prev) => prev - e.deltaY * 0.18 - e.deltaX * 0.22);
    setTiltX((prev) => Math.max(-0.45, Math.min(0.45, prev - e.deltaY * 0.0006)));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const dx = currentX - touchStart.current.x;
    const dy = touchStart.current.y - currentY;
    touchStart.current = { x: currentX, y: currentY };

    setRotY((prev) => prev - dy * 0.7 + dx * 0.55);
    setTiltX((prev) => Math.max(-0.45, Math.min(0.45, prev - dy * 0.0018)));
  };

  const handleTouchEnd = () => {
    touchStart.current = null;
  };

  const handleReset = () => {
    phaseRef.current = 0;
    setRotY(0);
    setTiltX(0.18);
    setSelectedIndex(0);
  };

  const selectedItem = GLOBE_ITEMS[selectedIndex];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-4">
      {/* Controls Bar */}
      <div className="mb-3 flex w-full max-w-md items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur-md transition hover:bg-white/10"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset rotation"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] p-1 text-zinc-300 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>

        <span className="text-[11px] text-zinc-400">Scroll or swipe in any direction</span>

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

      {/* Centered Free-Roaming 3D Globe Stage */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative flex h-72 w-full items-center justify-center overflow-visible select-none"
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {GLOBE_ITEMS.map((item, idx) => {
            const theta = ((idx * ANGLE_STEP + rotY) * Math.PI) / 180;
            const x = Math.sin(theta) * RADIUS_X;
            const z = Math.cos(theta) * RADIUS_Z; // +RADIUS_Z = front, -RADIUS_Z = back
            const y = Math.sin(theta) * RADIUS_Z * tiltX;

            const normalizedDepth = (z + RADIUS_Z) / (2 * RADIUS_Z); // 0 (back) to 1 (front)
            const scale = 0.68 + normalizedDepth * 0.42;
            const opacity = 0.52 + normalizedDepth * 0.48;
            const zIndex = Math.round(10 + normalizedDepth * 40);
            const isSelected = idx === selectedIndex;

            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedIndex(idx)}
                style={{
                  transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) scale(${scale.toFixed(3)})`,
                  opacity,
                  zIndex,
                }}
                className={`absolute h-36 w-28 overflow-hidden rounded-xl border transition-shadow duration-150 ${
                  isSelected
                    ? 'border-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.45)]'
                    : 'border-white/25 hover:border-emerald-300/80'
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
              </a>
            );
          })}
        </div>
      </div>

      {/* Centered Active Item Label */}
      <p className="mt-1 text-center text-xs font-bold text-zinc-200">
        {selectedItem.title}{' '}
        <span className="font-normal text-zinc-400">· {selectedItem.store}</span>
      </p>
    </div>
  );
}