import React, { useState, useRef } from 'react';
import { ArrowUpRight, Rotate3d, Tag } from 'lucide-react';

const BASE_URL = 'https://routeforge.co.ke';

interface ShowcaseItem {
  id: string;
  title: string;
  store: string;
  badge: string;
  priceTag: string;
  imageUrl: string;
  href: string;
  accent: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'sneakers',
    title: 'EU-Sized Street Sneakers',
    store: 'URurban Collection',
    badge: 'EU 38 – 45',
    priceTag: 'Kenya-wide Delivery',
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    href: `${BASE_URL}/shop?store=urban-collection`,
    accent: 'from-indigo-500/30 to-emerald-500/20',
  },
  {
    id: 'meals',
    title: 'Chai, Mandazi & Crispy Chicken',
    store: 'Luwama Fast Food',
    badge: 'Jomoko, Thika',
    priceTag: '25–40 min Hot Drop',
    imageUrl:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    href: `${BASE_URL}/shop?store=luwama-fast-food`,
    accent: 'from-amber-500/30 to-orange-500/20',
  },
  {
    id: 'essentials',
    title: 'Home, Kitchen & Beauty Picks',
    store: 'Zenimart Enterprise',
    badge: 'Daily Essentials',
    priceTag: 'Express Basket',
    imageUrl:
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80',
    href: `${BASE_URL}/shop?store=zenimart`,
    accent: 'from-emerald-500/30 to-teal-500/20',
  },
];

export function Showcase3D() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const activeItem = SHOWCASE_ITEMS[selectedIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max tilt of +/- 16 degrees for crisp 3D depth
    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="mt-5 rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 shadow-2xl backdrop-blur-xl">
      {/* Header Row */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Rotate3d className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold tracking-wider text-zinc-200 uppercase">
            3D Shop Preview
          </span>
        </div>
        <span className="text-[11px] font-medium text-zinc-400">
          Move cursor to rotate · Click to shop
        </span>
      </div>

      {/* 3D Perspective Stage */}
      <div style={{ perspective: '1000px' }} className="py-1">
        <a
          ref={cardRef}
          href={activeItem.href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${
              isHovering ? 1.02 : 1
            })`,
            transformStyle: 'preserve-3d',
            transition: isHovering
              ? 'transform 80ms ease-out'
              : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className={`group relative block overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br ${activeItem.accent} bg-[#0B0F18] p-4 shadow-xl`}
        >
          {/* Dynamic Specular Glare Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18), transparent 60%)`,
            }}
          />

          {/* Floating 3D Image Layer */}
          <div
            style={{ transform: 'translateZ(28px)' }}
            className="relative h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900"
          >
            <img
              src={activeItem.imageUrl}
              alt={activeItem.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090E]/90 via-[#07090E]/20 to-transparent" />

            {/* Top Floating Badges */}
            <div className="absolute top-2.5 right-2.5 left-2.5 flex items-center justify-between">
              <span className="rounded-lg border border-white/15 bg-black/65 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                {activeItem.store}
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-400 px-2.5 py-1 text-[11px] font-extrabold text-zinc-950 shadow-md">
                <Tag className="h-3 w-3" />
                {activeItem.badge}
              </span>
            </div>

            {/* Bottom Floating Caption */}
            <div className="absolute right-3 bottom-2.5 left-3 flex items-end justify-between">
              <div>
                <p className="text-sm font-extrabold text-white">{activeItem.title}</p>
                <p className="text-[11px] font-medium text-emerald-300">{activeItem.priceTag}</p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-950 shadow-lg transition-transform group-hover:scale-110">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </a>
      </div>

      {/* Bottom Thumbnail / Item Selector Pills */}
      <div className="mt-3.5 grid grid-cols-3 gap-2">
        {SHOWCASE_ITEMS.map((item, idx) => {
          const active = idx === selectedIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`flex items-center gap-2 rounded-xl border p-1.5 text-left transition ${
                active
                  ? 'border-emerald-400/60 bg-emerald-500/15 text-white'
                  : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-zinc-200'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-7 w-7 shrink-0 rounded-lg object-cover"
              />
              <span className="truncate text-[11px] font-bold">
                {item.store.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}