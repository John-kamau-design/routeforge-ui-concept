import React, { useState } from 'react';

interface IconProps {
  className?: string;
}

function Icon({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

const MapPin = ({ className }: IconProps) => (
  <Icon className={className}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></Icon>
);
const ArrowUpRight = ({ className }: IconProps) => (
  <Icon className={className}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></Icon>
);
const ShoppingBag = ({ className }: IconProps) => (
  <Icon className={className}><path d="M6 8h12l1 13H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></Icon>
);
const Truck = ({ className }: IconProps) => (
  <Icon className={className}><path d="M3 6h11v11H3z" /><path d="M14 10h4l3 3v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></Icon>
);
const CheckCircle2 = ({ className }: IconProps) => (
  <Icon className={className}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></Icon>
);
const Smartphone = ({ className }: IconProps) => (
  <Icon className={className}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></Icon>
);
const Building2 = ({ className }: IconProps) => (
  <Icon className={className}><path d="M4 21V4h10v17M14 9h6v12M2 21h20" /><path d="M8 8h2M8 12h2M8 16h2M17 13h1M17 17h1" /></Icon>
);
const PhoneCall = ({ className }: IconProps) => (
  <Icon className={className}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2Z" /></Icon>
);
const Search = ({ className }: IconProps) => (
  <Icon className={className}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></Icon>
);
const ChevronRight = ({ className }: IconProps) => (
  <Icon className={className}><path d="m9 18 6-6-6-6" /></Icon>
);
const PackageCheck = ({ className }: IconProps) => (
  <Icon className={className}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="M3 8v8l9 5 9-5V8M12 13v8" /><path d="m9 18 2 2 4-4" /></Icon>
);
const ShieldCheck = ({ className }: IconProps) => (
  <Icon className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></Icon>
);
const Menu = ({ className }: IconProps) => (
  <Icon className={className}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>
);
const X = ({ className }: IconProps) => (
  <Icon className={className}><path d="M6 6l12 12M18 6 6 18" /></Icon>
);
const Download = ({ className }: IconProps) => (
  <Icon className={className}><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></Icon>
);

const BASE_URL = 'https://routeforge.co.ke';

interface StoreItem {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  tags: string[];
  accent: string;
  badgeBg: string;
  href: string;
}

const FEATURED_STORES: StoreItem[] = [
  {
    id: 'urban-collection',
    name: 'URurban Collection',
    category: 'Fashion & Footwear',
    location: 'Kenya-wide Delivery',
    description:
      'Browse sneakers by EU size, plus caps, bags and phones from URurban Collection. Check delivery options in Kenya.',
    tags: ['Sneakers (EU Sizes)', 'Caps & Bags', 'Phones'],
    accent: 'text-indigo-700',
    badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    href: `${BASE_URL}/shop?store=urban-collection`,
  },
  {
    id: 'luwama-fast-food',
    name: 'Luwama Fast Food',
    category: 'Hot Meals & Street Classics',
    location: 'Jomoko, Thika',
    description:
      'Order Kenyan chai, mandazi, chips, bhajia and chicken from Luwama Fast Food for delivery in Jomoko, Thika.',
    tags: ['Kenyan Chai & Mandazi', 'Chips & Bhajia', 'Chicken'],
    accent: 'text-amber-700',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-900',
    href: `${BASE_URL}/shop?store=luwama-fast-food`,
  },
  {
    id: 'zenimart',
    name: 'Zenimart Enterprise',
    category: 'Home, Kitchen & Beauty',
    location: 'Daily Essentials',
    description:
      'Shop home, kitchen, beauty and personal care essentials with fast local fulfillment.',
    tags: ['Home & Kitchen', 'Beauty', 'Personal Care'],
    accent: 'text-emerald-700',
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    href: `${BASE_URL}/shop?store=zenimart`,
  },
];

const SUPPORTED_COUNTIES = [
  'Nairobi',
  'Kiambu',
  'Kajiado',
  'Machakos',
  'Mombasa',
  'Nakuru',
  'Nyeri',
  'Uasin Gishu',
  'Kakamega',
  'Kilifi',
  'Mandera',
  'Marsabit',
  'Wajir',
];

const STEPS = [
  {
    number: '01',
    title: 'Choose your find',
    description:
      'Browse products and select the colour, size or option you want from verified local merchants.',
    icon: ShoppingBag,
  },
  {
    number: '02',
    title: 'Set your delivery',
    description:
      'Save your delivery pin and review the exact available delivery and payment options for your area.',
    icon: MapPin,
  },
  {
    number: '03',
    title: 'Follow your order',
    description:
      'See real-time order progress in My orders, then share feedback after doorstep delivery.',
    icon: PackageCheck,
  },
];

export function App() {
  const [selectedCounty, setSelectedCounty] = useState<string>('Nairobi');
  const [addressQuery, setAddressQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 selection:bg-emerald-600 selection:text-white">
      {/* Top Utility & Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <a
            href={BASE_URL}
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-zinc-950"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-emerald-400">
              <Truck className="h-4 w-4" />
            </span>
            <span>
              routeforge<span className="text-emerald-600">.</span>
            </span>
          </a>

          {/* Desktop Primary Nav */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-700 md:flex">
            <a
              href={`${BASE_URL}/shop`}
              className="transition-colors hover:text-zinc-950"
            >
              Shop
            </a>
            <a
              href={`${BASE_URL}/products`}
              className="transition-colors hover:text-zinc-950"
            >
              Browse products
            </a>
            <a
              href="#delivery-areas"
              className="transition-colors hover:text-zinc-950"
            >
              Delivery areas
            </a>
            <a
              href={`${BASE_URL}/shop/install`}
              className="transition-colors hover:text-zinc-950"
            >
              Get the app
            </a>
            <a
              href={`${BASE_URL}/integrations`}
              className="transition-colors hover:text-zinc-950"
            >
              For businesses
            </a>
          </nav>

          {/* Desktop Action Group */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`${BASE_URL}/login`}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            >
              Office sign in
            </a>
            <a
              href={`${BASE_URL}/shop`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800"
            >
              Explore shop
              <ArrowUpRight className="h-4 w-4 text-emerald-400" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 p-2 text-zinc-800 hover:bg-zinc-100 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col space-y-3 text-sm font-medium text-zinc-800">
              <a href={`${BASE_URL}/shop`} className="rounded-md px-2 py-1.5 hover:bg-zinc-100">
                Shop
              </a>
              <a href={`${BASE_URL}/products`} className="rounded-md px-2 py-1.5 hover:bg-zinc-100">
                Browse products
              </a>
              <a href={`${BASE_URL}/shop/install`} className="rounded-md px-2 py-1.5 hover:bg-zinc-100">
                Get the app
              </a>
              <a href={`${BASE_URL}/integrations`} className="rounded-md px-2 py-1.5 hover:bg-zinc-100">
                For businesses
              </a>
              <hr className="border-zinc-200" />
              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={`${BASE_URL}/login`}
                  className="w-full rounded-lg border border-zinc-300 py-2.5 text-center font-semibold text-zinc-900"
                >
                  Office sign in
                </a>
                <a
                  href={`${BASE_URL}/shop`}
                  className="w-full rounded-lg bg-zinc-950 py-2.5 text-center font-semibold text-white"
                >
                  Explore the shop
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION: High-Contrast Split Layout */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:py-20">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold tracking-wider text-emerald-900 uppercase">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              Good finds. Local connections.
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
              RouteForge Kenya —{' '}
              <span className="text-zinc-600">
                from local shops straight to your doorstep.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg">
              Shop food, sneakers, accessories, beauty and home essentials from local stores.
              Check delivery for your address in Kenya and follow your order in the RouteForge app.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a
                href={`${BASE_URL}/shop`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2"
              >
                Explore the shop
                <ArrowUpRight className="h-4 w-4 text-emerald-400" />
              </a>
              <a
                href={`${BASE_URL}/shop?signup=1`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-300 bg-white px-6 py-3.5 text-sm font-bold text-zinc-900 transition-all hover:border-zinc-950 hover:bg-zinc-50"
              >
                Create a customer account
              </a>
            </div>

            {/* Trust / Clarity Footnote */}
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-zinc-600">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" />
              <span>Delivery options depend on your exact location pin and the selected shop.</span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Delivery & Store Finder Card */}
          <div className="mt-12 lg:col-span-5 lg:mt-0">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-950 p-6 text-white shadow-xl sm:p-7">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <p className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
                    Instant Area Check
                  </p>
                  <h2 className="mt-0.5 text-lg font-bold text-white">
                    Check delivery to your pin
                  </h2>
                </div>
                <span className="rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-300 border border-zinc-800">
                  13 Counties
                </span>
              </div>

              {/* Interactive County + Area Input */}
              <div className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="county-select"
                    className="block text-xs font-semibold tracking-wide text-zinc-300 uppercase"
                  >
                    1. Select County
                  </label>
                  <select
                    id="county-select"
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm font-medium text-white focus:border-emerald-400 focus:outline-none"
                  >
                    {SUPPORTED_COUNTIES.map((county) => (
                      <option key={county} value={county}>
                        {county} County
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="area-input"
                    className="block text-xs font-semibold tracking-wide text-zinc-300 uppercase"
                  >
                    2. Neighbourhood / Landmark (Optional)
                  </label>
                  <div className="relative mt-1.5">
                    <Search className="pointer-events-none absolute top-3 left-3.5 h-4 w-4 text-zinc-400" />
                    <input
                      id="area-input"
                      type="text"
                      value={addressQuery}
                      onChange={(e) => setAddressQuery(e.target.value)}
                      placeholder="e.g. Jomoko Thika, Westlands, Syokimau..."
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-2.5 pr-4 pl-10 text-sm text-white placeholder-zinc-500 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Dynamic Preview Box */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3.5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <div className="text-xs leading-relaxed text-zinc-300">
                      <span className="font-semibold text-white">
                        {selectedCounty}
                        {addressQuery ? ` (${addressQuery})` : ''}
                      </span>{' '}
                      is on our active shop delivery list. Exact rider coverage and rates confirm at checkout.
                    </div>
                  </div>
                </div>

                <a
                  href={`${BASE_URL}/shop`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-zinc-950 transition-colors hover:bg-emerald-400"
                >
                  Check my delivery area in shop
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED LOCAL STORES SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold tracking-wider text-emerald-700 uppercase">
              A little closer
            </p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
              From local shops to your doorstep.
            </h2>
          </div>
          <a
            href={`${BASE_URL}/products`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950"
          >
            Browse all products
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Store Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURED_STORES.map((store) => (
            <a
              key={store.id}
              href={store.href}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-zinc-950 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${store.badgeBg}`}
                  >
                    {store.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600">
                    <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                    {store.location}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-zinc-950 group-hover:text-emerald-700 transition-colors">
                  {store.name}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-zinc-700">
                  {store.description}
                </p>

                {/* Item Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {store.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-sm font-bold text-zinc-950">
                <span>Visit storefront</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-zinc-950 group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS: Clean 3-Step High-Contrast Cards */}
      <section className="border-y border-zinc-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wider text-emerald-700 uppercase">
              From find to front door
            </p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
              Simple steps. Clear updates.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white">
                      <Icon className="h-5 w-5 text-emerald-400" />
                    </span>
                    <span className="font-mono text-2xl font-extrabold text-zinc-300">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-zinc-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DELIVERY COVERAGE IN KENYA */}
      <section id="delivery-areas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-bold tracking-wider text-emerald-700 uppercase">
                Delivery in Kenya
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                A local shop, a delivery that fits.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
                Looking for online shopping and delivery in Nairobi, Thika or another supported area?
                Set your exact delivery location in the shop to check the options available to you.
              </p>
              <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs leading-relaxed text-amber-950">
                <strong>Note on coverage:</strong> Coverage and charges are checked at checkout; a county
                listing does not promise every address is served.
              </p>
              <div className="mt-6">
                <a
                  href={`${BASE_URL}/shop`}
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
                >
                  Check my delivery area
                  <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Interactive County Pill Matrix */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-5 sm:p-6">
                <p className="text-xs font-bold tracking-wider text-zinc-600 uppercase">
                  Current Shop Delivery Counties ({SUPPORTED_COUNTIES.length})
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SUPPORTED_COUNTIES.map((county) => {
                    const active = selectedCounty === county;
                    return (
                      <button
                        key={county}
                        type="button"
                        onClick={() => setSelectedCounty(county)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                          active
                            ? 'border-zinc-950 bg-zinc-950 text-white shadow-xs'
                            : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            active ? 'bg-emerald-400' : 'bg-emerald-600'
                          }`}
                        />
                        {county}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs text-zinc-600">
                  Selected: <strong className="text-zinc-950">{selectedCounty}</strong> — Ready for address pin verification in shop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B MERCHANT & MOBILE APP SPLIT SECTION */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Merchant Operations Card (High-Contrast Dark Anchor) */}
          <div className="flex flex-col justify-between rounded-3xl bg-zinc-950 p-7 text-white sm:p-9">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-bold text-emerald-400">
                <Building2 className="h-3.5 w-3.5" />
                Merchant & Rider Workspace
              </div>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Deliveries for your business
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                RouteForge gives approved merchants a workspace for pickup branches, delivery requests and
                rider coordination. Explore the integration guide and speak to us about your service area.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800">
              <a
                href={`${BASE_URL}/integrations`}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-zinc-950 transition-colors hover:bg-emerald-400"
              >
                Explore merchant integrations
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={`${BASE_URL}/merchant`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 px-4 py-3 text-sm font-semibold text-zinc-200 hover:border-zinc-500 hover:text-white"
              >
                Merchant hub
              </a>
            </div>
          </div>

          {/* Customer App & Support Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-7 sm:p-9">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-800">
                <Smartphone className="h-3.5 w-3.5 text-zinc-950" />
                iOS, Android & Web Sync
              </div>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                Take your finds with you
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
                Install RouteForge on iPhone or Android, or shop in your browser. Each connects to the same
                shop and customer account.
              </p>

              {/* Download Actions */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={`${BASE_URL}/downloads/routeforge-customer-1.0.apk`}
                  className="flex items-center justify-between rounded-xl border border-zinc-950 bg-zinc-950 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
                >
                  <span>Android Customer App</span>
                  <Download className="h-4 w-4 text-emerald-400" />
                </a>
                <a
                  href={`${BASE_URL}/shop/install`}
                  className="flex items-center justify-between rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-bold text-zinc-950 transition-colors hover:border-zinc-950"
                >
                  <span>Install on iPhone / iPad</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Direct Human Support Bar */}
            <div className="mt-8 flex flex-col justify-between gap-3 rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-bold text-zinc-950">A real person, a little help.</p>
                <p className="text-xs text-zinc-600">
                  Need help placing an order or checking a delivery?
                </p>
              </div>
              <a
                href="tel:+254769689216"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-sm font-extrabold text-zinc-950 border border-zinc-300 shadow-2xs hover:border-zinc-950"
              >
                <PhoneCall className="h-4 w-4 text-emerald-700" />
                +254 769 689 216
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CLEAN FOOTER */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <a href={BASE_URL} className="text-lg font-extrabold tracking-tight text-zinc-950">
                routeforge<span className="text-emerald-600">.</span>
              </a>
              <p className="mt-1 text-xs text-zinc-600">
                RouteForge by SHADOWNET · Shopping and delivery in Kenya.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-zinc-700">
              <a href={`${BASE_URL}/shop`} className="hover:text-zinc-950">
                Shop
              </a>
              <a href={`${BASE_URL}/products`} className="hover:text-zinc-950">
                Products
              </a>
              <a href={`${BASE_URL}/shop/terms`} className="hover:text-zinc-950">
                Ordering & delivery
              </a>
              <a href={`${BASE_URL}/shop/privacy`} className="hover:text-zinc-950">
                Privacy
              </a>
              <a href={`${BASE_URL}/merchant`} className="hover:text-zinc-950">
                Merchant hub
              </a>
              <a href={`${BASE_URL}/login`} className="hover:text-zinc-950">
                Office sign in
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;