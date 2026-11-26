import { Showcase3D } from './components/Showcase3D';
import { useState } from 'react';
import {
  MapPin,
  ArrowUpRight,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Smartphone,
  Building2,
  PhoneCall,
  ChevronRight,
  PackageCheck,
  Sparkles,
  Menu,
  X,
  Download,
  Clock,
  Navigation,
  Layers,
  Zap,
  Store,
} from 'lucide-react';

const BASE_URL = 'https://routeforge.co.ke';

interface StorePreview {
  id: string;
  name: string;
  tagline: string;
  category: string;
  hub: string;
  eta: string;
  description: string;
  highlights: { label: string; meta: string }[];
  accentGradient: string;
  pillStyle: string;
  href: string;
}

const STORES: StorePreview[] = [
  {
    id: 'urban-collection',
    name: 'URurban Collection',
    tagline: 'Streetwear, EU-Sized Footwear & Tech',
    category: 'Sneakers & Accessories',
    hub: 'Kenya-wide Dispatch',
    eta: 'Same-day / Next-day',
    description:
      'Browse sneakers by exact EU size, plus caps, bags and phones from URurban Collection with verified delivery options across Kenya.',
    highlights: [
      { label: 'Sneakers by EU Size', meta: 'EU 38 – 45 Filterable' },
      { label: 'Caps & Everyday Bags', meta: 'Verified Stock' },
      { label: 'Smartphones & Gear', meta: 'Tracked Rider Drop' },
    ],
    accentGradient: 'from-indigo-500/20 via-violet-500/10 to-transparent',
    pillStyle: 'bg-indigo-500/15 text-indigo-300 border-indigo-400/30',
    href: `${BASE_URL}/shop?store=urban-collection`,
  },
  {
    id: 'luwama-fast-food',
    name: 'Luwama Fast Food',
    tagline: 'Hot Kenyan Classics & Street Favorites',
    category: 'Food & Hot Meals',
    hub: 'Jomoko, Thika',
    eta: '25 – 40 mins local',
    description:
      'Order fresh Kenyan chai, mandazi, chips, bhajia and chicken from Luwama Fast Food for fast local delivery in Jomoko, Thika.',
    highlights: [
      { label: 'Kenyan Chai & Mandazi', meta: 'Fresh Morning & Evening' },
      { label: 'Masala Chips & Bhajia', meta: 'Hot-Pack Dispatch' },
      { label: 'Fried & Grilled Chicken', meta: 'Jomoko & Thika Zone' },
    ],
    accentGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    pillStyle: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
    href: `${BASE_URL}/shop?store=luwama-fast-food`,
  },
  {
    id: 'zenimart',
    name: 'Zenimart Enterprise',
    tagline: 'Home, Kitchen & Personal Care Essentials',
    category: 'Home & Beauty',
    hub: 'Multi-Zone Fulfillment',
    eta: 'Scheduled / Express',
    description:
      'Shop everyday home, kitchen, beauty and personal care essentials bundled into one doorstep delivery.',
    highlights: [
      { label: 'Kitchen & Homeware', meta: 'Daily Household Picks' },
      { label: 'Beauty & Skincare', meta: 'Authentic Essentials' },
      { label: 'Personal Care', meta: 'Fast Basket Checkout' },
    ],
    accentGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    pillStyle: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    href: `${BASE_URL}/shop?store=zenimart`,
  },
];

interface CountyItem {
  name: string;
  region: 'Metro' | 'Central' | 'Coast' | 'Rift & West' | 'North';
  note: string;
}

const COUNTIES: CountyItem[] = [
  { name: 'Nairobi', region: 'Metro', note: 'High-density rider zones & same-day merchant dispatch' },
  { name: 'Kiambu', region: 'Metro', note: 'Active coverage including Thika, Jomoko, Ruiru & Kikuyu' },
  { name: 'Kajiado', region: 'Metro', note: 'Kitengela, Ongata Rongai & Ngong corridor coverage' },
  { name: 'Machakos', region: 'Metro', note: 'Syokimau, Mlolongo, Athi River & Machakos town zones' },
  { name: 'Mombasa', region: 'Coast', note: 'Island & mainland pin-verified local deliveries' },
  { name: 'Kilifi', region: 'Coast', note: 'Select coastal town zones checked at checkout' },
  { name: 'Nakuru', region: 'Rift & West', note: 'Nakuru metro & surrounding delivery pins' },
  { name: 'Uasin Gishu', region: 'Rift & West', note: 'Eldoret hub & scheduled regional drops' },
  { name: 'Kakamega', region: 'Rift & West', note: 'Town center & verified address zones' },
  { name: 'Nyeri', region: 'Central', note: 'Central highland merchant & parcel coverage' },
  { name: 'Mandera', region: 'North', note: 'Regional dispatch options confirmed at checkout' },
  { name: 'Marsabit', region: 'North', note: 'Regional dispatch options confirmed at checkout' },
  { name: 'Wajir', region: 'North', note: 'Regional dispatch options confirmed at checkout' },
];

const REGIONS = ['All', 'Metro', 'Central', 'Coast', 'Rift & West', 'North'] as const;

export function App() {
  const [activeStoreId, setActiveStoreId] = useState<string>(STORES[0].id);
  const [selectedCounty, setSelectedCounty] = useState<string>('Kiambu');
  const [regionFilter, setRegionFilter] = useState<(typeof REGIONS)[number]>('All');
  const [pinLandmark, setPinLandmark] = useState<string>('Jomoko, Thika');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const activeStore = STORES.find((s) => s.id === activeStoreId) || STORES[0];
  const activeCountyObj = COUNTIES.find((c) => c.name === selectedCounty) || COUNTIES[0];
  const filteredCounties =
    regionFilter === 'All' ? COUNTIES : COUNTIES.filter((c) => c.region === regionFilter);

  return (
    <div className="relative min-h-screen bg-[#07090E] text-zinc-100 selection:bg-emerald-400 selection:text-zinc-950">
      {/* Ambient Background Glows + Architectural Grid */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="bg-grid-pattern absolute inset-0 opacity-100" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/12 blur-[130px]" />
        <div className="absolute top-[38%] -left-40 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[500px] rounded-full bg-emerald-500/8 blur-[130px]" />
      </div>

      {/* FLOATING GLASS NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090E]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <a href={BASE_URL} className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Navigation className="h-4 w-4 rotate-45" />
            </span>
            <span>
              routeforge<span className="text-emerald-400">.</span>
            </span>
          </a>

          {/* Desktop Center Nav Pill */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-xs font-semibold text-zinc-300 md:flex">
            <a href={`${BASE_URL}/shop`} className="rounded-full px-3.5 py-1.5 transition hover:bg-white/10 hover:text-white">
              Shop
            </a>
            <a href={`${BASE_URL}/products`} className="rounded-full px-3.5 py-1.5 transition hover:bg-white/10 hover:text-white">
              Browse products
            </a>
            <a href="#stores" className="rounded-full px-3.5 py-1.5 transition hover:bg-white/10 hover:text-white">
              Local stores
            </a>
            <a href="#coverage" className="rounded-full px-3.5 py-1.5 transition hover:bg-white/10 hover:text-white">
              Delivery zones
            </a>
            <a href={`${BASE_URL}/integrations`} className="rounded-full px-3.5 py-1.5 transition hover:bg-white/10 hover:text-white">
              For businesses
            </a>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`${BASE_URL}/login`}
              className="rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white"
            >
              Office sign in
            </a>
            <a
              href={`${BASE_URL}/shop`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-400 px-4 py-2 text-xs font-extrabold text-zinc-950 shadow-[0_0_25px_rgba(52,211,153,0.3)] transition hover:bg-emerald-300"
            >
              Open Shop
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-200 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#0B0F17] px-4 py-5 md:hidden">
            <div className="flex flex-col space-y-2 text-sm font-medium text-zinc-200">
              <a href={`${BASE_URL}/shop`} className="rounded-lg px-3 py-2 hover:bg-white/5">Shop</a>
              <a href={`${BASE_URL}/products`} className="rounded-lg px-3 py-2 hover:bg-white/5">Browse products</a>
              <a href={`${BASE_URL}/shop/install`} className="rounded-lg px-3 py-2 hover:bg-white/5">Get the app</a>
              <a href={`${BASE_URL}/integrations`} className="rounded-lg px-3 py-2 hover:bg-white/5">For businesses</a>
              <div className="grid grid-cols-2 gap-2 pt-3">
                <a href={`${BASE_URL}/login`} className="rounded-xl border border-white/15 py-2.5 text-center text-xs font-bold text-white">
                  Office sign in
                </a>
                <a href={`${BASE_URL}/shop`} className="rounded-xl bg-emerald-400 py-2.5 text-center text-xs font-extrabold text-zinc-950">
                  Explore shop
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* HERO SECTION: Interactive Command Center Feel */}
        <section className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Pitch */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold tracking-wider text-emerald-300 uppercase">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Good finds. Local connections.
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:leading-[1.06]">
                Local shops in Kenya,{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-indigo-300 bg-clip-text text-transparent">
                  delivered to your pin.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                Shop food, sneakers, accessories, beauty and home essentials from verified local stores.
                Check delivery for your exact address in Kenya and track every step in RouteForge.
              </p>

              {/* CTA Cluster */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <a
                  href={`${BASE_URL}/shop`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-7 py-4 text-sm font-extrabold text-zinc-950 shadow-[0_0_35px_rgba(52,211,153,0.28)] transition hover:-translate-y-0.5 hover:bg-emerald-300"
                >
                  Explore the shop
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={`${BASE_URL}/shop?signup=1`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/[0.08]"
                >
                  Create customer account
                </a>
              </div>

              {/* Micro Metrics / Trust Strip */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:max-w-lg">
                <div>
                  <p className="text-xl font-extrabold text-white">13</p>
                  <p className="text-xs text-zinc-400">Active Counties</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-emerald-400">Live</p>
                  <p className="text-xs text-zinc-400">Pin-Based Rates</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-white">Web + App</p>
                  <p className="text-xs text-zinc-400">Unified Account</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Card: Live Pin & Route Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-2xl backdrop-blur-xl sm:p-7">
                {/* Top Status Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-xs font-bold tracking-wider text-zinc-200 uppercase">
                      Delivery Pin Simulator
                    </span>
                  </div>
                             <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-2xl backdrop-blur-xl sm:p-7">
              
              </div>

                            <Showcase3D />
            </div>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                    Kenya Network
                  </span>
                </div>

                {/* Form Controls */}
                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="hero-county" className="block text-xs font-semibold text-zinc-300">
                      County
                    </label>
                    <select
                      id="hero-county"
                      value={selectedCounty}
                      onChange={(e) => setSelectedCounty(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#0C101A] px-3.5 py-3 text-sm font-semibold text-white focus:border-emerald-400 focus:outline-none"
                    >
                      {COUNTIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name} County ({c.region})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="hero-pin" className="block text-xs font-semibold text-zinc-300">
                      Exact Estate, Stage or Landmark
                    </label>
                    <div className="relative mt-1.5">
                      <MapPin className="pointer-events-none absolute top-3.5 left-3.5 h-4 w-4 text-emerald-400" />
                      <input
                        id="hero-pin"
                        type="text"
                        value={pinLandmark}
                        onChange={(e) => setPinLandmark(e.target.value)}
                        placeholder="Enter street, stage or building..."
                        className="w-full rounded-xl border border-white/15 bg-[#0C101A] py-3 pr-4 pl-10 text-sm text-white placeholder-zinc-500 focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Live Route Simulation Readout */}
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.07] p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-emerald-300">
                          {selectedCounty} {pinLandmark ? `· ${pinLandmark}` : ''}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-300">
                          {activeCountyObj.note}. Exact rider fee & availability confirm at checkout.
                        </p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    </div>
                  </div>

                  <a
                    href={`${BASE_URL}/shop`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-extrabold text-zinc-950 transition hover:bg-zinc-200"
                  >
                    Verify pin & browse eligible shops
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE LOCAL STORES SHOWCASE (Bento Switcher) */}
        <section id="stores" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
                A little closer · Featured Merchants
              </p>
              <h2 className="mt-1.5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                From local shops to your doorstep.
              </h2>
            </div>
            <a
              href={`${BASE_URL}/products`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-300 hover:text-emerald-200"
            >
              Browse full catalog
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Interactive Store Tabs + Active Spotlight Bento */}
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            {/* Left Store Selector Stack */}
            <div className="flex flex-col gap-3 lg:col-span-5">
              {STORES.map((store) => {
                const isSelected = store.id === activeStore.id;
                return (
                  <button
                    key={store.id}
                    type="button"
                    onClick={() => setActiveStoreId(store.id)}
                    className={`group rounded-2xl border p-5 text-left transition-all ${
                      isSelected
                        ? 'border-emerald-400/50 bg-white/[0.09] shadow-[0_0_30px_rgba(16,185,129,0.12)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`rounded-md border px-2.5 py-0.5 text-[11px] font-bold ${store.pillStyle}`}>
                        {store.category}
                      </span>
                      <span className="text-xs font-medium text-zinc-400">{store.hub}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <h3 className="text-lg font-extrabold text-white">{store.name}</h3>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          isSelected ? 'translate-x-1 text-emerald-400' : 'text-zinc-500'
                        }`}
                      />
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">{store.tagline}</p>
                  </button>
                );
              })}
            </div>

            {/* Right Active Store Spotlight Card */}
            <div className="lg:col-span-7">
              <div
                className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br ${activeStore.accentGradient} bg-[#0C1019] p-7 sm:p-9`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold text-zinc-200">
                      <Store className="h-3.5 w-3.5 text-emerald-400" />
                      {activeStore.hub}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                      <Clock className="h-3.5 w-3.5" />
                      {activeStore.eta}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
                    {activeStore.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {activeStore.description}
                  </p>

                  {/* Storefront Highlights Grid */}
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {activeStore.highlights.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-sm"
                      >
                        <p className="text-xs font-bold text-white">{item.label}</p>
                        <p className="mt-1 text-[11px] font-medium text-emerald-300/90">{item.meta}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <span className="text-xs text-zinc-400">
                    Direct storefront link on routeforge.co.ke
                  </span>
                  <a
                    href={activeStore.href}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-extrabold text-zinc-950 transition hover:bg-emerald-300"
                  >
                    Shop {activeStore.name}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS: Connected Flow Cards */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-10">
            <div className="max-w-xl">
              <p className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
                From find to front door
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                Simple steps. Clear updates.
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Choose your find',
                  desc: 'Browse products and select the exact colour, EU size or meal option you want.',
                  icon: ShoppingBag,
                },
                {
                  step: '02',
                  title: 'Set your delivery',
                  desc: 'Save your delivery pin and review the available delivery and payment options.',
                  icon: MapPin,
                },
                {
                  step: '03',
                  title: 'Follow your order',
                  desc: 'Track live order progress in My orders, then share feedback after delivery.',
                  icon: PackageCheck,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-white/10 bg-[#0B0F18] p-6 transition hover:border-emerald-400/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-400">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xl font-extrabold text-zinc-600">{item.step}</span>
                    </div>
                    <h3 className="mt-5 text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* INTERACTIVE COUNTY COVERAGE EXPLORER */}
        <section id="coverage" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-7 sm:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
                  Delivery in Kenya
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                  A local shop, a delivery that fits.
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-zinc-300">
                  Filter supported counties by region. Coverage and charges are checked at checkout; a
                  county listing does not promise every address is served.
                </p>
              </div>

              {/* Region Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {REGIONS.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setRegionFilter(region)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      regionFilter === region
                        ? 'bg-emerald-400 text-zinc-950'
                        : 'border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* County Grid */}
            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredCounties.map((county) => {
                const active = county.name === selectedCounty;
                return (
                  <button
                    key={county.name}
                    type="button"
                    onClick={() => setSelectedCounty(county.name)}
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-3 text-left transition ${
                      active
                        ? 'border-emerald-400 bg-emerald-500/15 text-white'
                        : 'border-white/10 bg-[#0B0F18] text-zinc-300 hover:border-white/25'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{county.name}</p>
                      <p className="text-[10px] text-zinc-400">{county.region}</p>
                    </div>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        active ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-zinc-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#0B0F18] p-4 sm:flex-row sm:items-center">
              <p className="text-xs text-zinc-300">
                <strong className="text-emerald-300">{selectedCounty}:</strong> {activeCountyObj.note}.
              </p>
              <a
                href={`${BASE_URL}/shop`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-zinc-950 hover:bg-zinc-200"
              >
                Check my delivery area
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* BENTO ECOSYSTEM: Merchant Ops + Mobile Apps + Direct Support */}
        <section className="mx-auto max-w-7xl px-4 pt-6 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Merchant Workspace Bento (7 Cols) */}
            <div className="flex flex-col justify-between rounded-3xl border border-indigo-400/25 bg-gradient-to-br from-indigo-950/50 via-[#0B0F18] to-[#0B0F18] p-7 sm:p-9 lg:col-span-7">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-300">
                  <Building2 className="h-3.5 w-3.5" />
                  For Businesses & Logistics Partners
                </div>
                <h2 className="mt-5 text-2xl font-extrabold text-white sm:text-3xl">
                  Deliveries for your business
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  RouteForge gives approved merchants a dedicated workspace for pickup branches,
                  delivery requests and rider coordination. Explore the integration guide and speak
                  to us about your service area.
                </p>

                {/* Mini Dispatch Capabilities Pills */}
                <div className="mt-6 grid grid-cols-3 gap-2.5">
                  <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                    <Layers className="h-4 w-4 text-indigo-400" />
                    <p className="mt-2 text-xs font-bold text-white">Pickup Branches</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                    <Zap className="h-4 w-4 text-emerald-400" />
                    <p className="mt-2 text-xs font-bold text-white">Delivery Requests</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                    <Truck className="h-4 w-4 text-amber-400" />
                    <p className="mt-2 text-xs font-bold text-white">Rider Dispatch</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                <a
                  href={`${BASE_URL}/integrations`}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-400"
                >
                  Explore merchant integrations
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={`${BASE_URL}/merchant`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-zinc-200 hover:bg-white/5"
                >
                  Merchant hub
                </a>
              </div>
            </div>

            {/* Mobile Apps + Support Bento (5 Cols) */}
            <div className="flex flex-col justify-between gap-6 lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-[#0B0F18] p-7">
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-zinc-200">
                  <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
                  Cross-Device Sync
                </div>
                <h3 className="mt-4 text-xl font-extrabold text-white">Take your finds with you</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Install RouteForge on iPhone or Android, or shop in your browser. Each connects to
                  the same shop and customer account.
                </p>

                <div className="mt-5 space-y-2.5">
                  <a
                    href={`${BASE_URL}/downloads/routeforge-customer-1.0.apk`}
                    className="flex items-center justify-between rounded-xl bg-emerald-400 px-4 py-3 text-xs font-extrabold text-zinc-950 transition hover:bg-emerald-300"
                  >
                    <span>Download Android Customer App (APK)</span>
                    <Download className="h-4 w-4" />
                  </a>
                  <a
                    href={`${BASE_URL}/shop/install`}
                    className="flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-xs font-bold text-white transition hover:bg-white/10"
                  >
                    <span>Install on iPhone or iPad</span>
                    <ArrowUpRight className="h-4 w-4 text-zinc-400" />
                  </a>
                </div>
              </div>

              {/* Support Card */}
              <div className="rounded-3xl border border-white/10 bg-[#0B0F18] p-6">
                <p className="text-xs font-bold text-white">A real person, a little help.</p>
                <p className="mt-1 text-xs text-zinc-400">
                  Need help placing an order or checking a delivery?
                </p>
                <a
                  href="tel:+254769689216"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 py-3 text-sm font-extrabold text-emerald-300 transition hover:bg-emerald-500/20"
                >
                  <PhoneCall className="h-4 w-4" />
                  +254 769 689 216
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-[#05070B]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <a href={BASE_URL} className="text-lg font-extrabold tracking-tight text-white">
              routeforge<span className="text-emerald-400">.</span>
            </a>
            <p className="mt-1 text-xs text-zinc-500">
              RouteForge by SHADOWNET · Shopping and delivery in Kenya.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-zinc-400">
            <a href={`${BASE_URL}/shop`} className="hover:text-white">Shop</a>
            <a href={`${BASE_URL}/products`} className="hover:text-white">Products</a>
            <a href={`${BASE_URL}/shop/terms`} className="hover:text-white">Ordering & delivery</a>
            <a href={`${BASE_URL}/shop/privacy`} className="hover:text-white">Privacy</a>
            <a href={`${BASE_URL}/merchant`} className="hover:text-white">Merchant hub</a>
            <a href={`${BASE_URL}/login`} className="hover:text-white">Office sign in</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;