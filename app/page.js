import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import HeroCarousel from "@/components/HeroCarousel";
import CategorySection from "@/components/CategorySection";
import {
  Truck,
  ShieldCheck,
  Headphones,
  Store,
  Flame,
  Utensils,
  Gauge,
  Sliders,
  Layers,
  Percent,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";

const CATEGORY_ORDER = [
  "Kitchen",
  "Instant Gyser",
  "Regulator",
  "Valves",
  "Accessories",
  "Discount",
];

const TRUST_FEATURES = [
  {
    icon: Truck,
    title: "Nationwide Safe Delivery",
    desc: "Carefully packed & tracked shipping across Pakistan",
  },
  {
    icon: ShieldCheck,
    title: "100% Genuine Appliances",
    desc: "Authorized brand warranty cards included",
  },
  {
    icon: Headphones,
    title: "Live WhatsApp Support",
    desc: "Instant video demos & real-time pricing",
  },
  {
    icon: Store,
    title: "Showroom Backed Since 1992",
    desc: "Physical inspection in Muridwala, Faisalabad",
  },
];

const CATEGORY_PILLS = [
  { name: "Kitchen", icon: Utensils, href: "#category-kitchen" },
  { name: "Instant Gyser", icon: Flame, href: "#category-instant-gyser" },
  { name: "Regulator", icon: Gauge, href: "#category-regulator" },
  { name: "Valves", icon: Sliders, href: "#category-valves" },
  { name: "Accessories", icon: Layers, href: "#category-accessories" },
  { name: "Discount", icon: Percent, href: "#category-discount" },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  await connectDB();

  const products = await Product.find({ featured: true })
    .sort({ createdAt: -1 })
    .lean();

  // Convert ObjectId to string.
  const formattedProducts = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

  // Group products by category, keeping the schema's category order.
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    products: formattedProducts.filter((p) => p.category === category),
  })).filter((group) => group.products.length > 0);

  return (
    <main className="min-h-screen bg-slate-50/50 pb-16">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Trust & Value Highlights Bar */}
      <section className="mx-auto -mt-6 sm:-mt-8 relative z-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 rounded-3xl border border-slate-200/80 bg-white/95 p-4 sm:p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md">
          {TRUST_FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex items-center gap-3 rounded-2xl p-2.5 transition-all hover:bg-slate-50/80"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="hidden sm:block text-[11px] text-slate-500 mt-0.5">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Category Quick-Nav Jump Pills */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1 hidden sm:inline-block">
              Quick Browse:
            </span>
            {CATEGORY_PILLS.map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.name}
                  href={cat.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 active:scale-95 shrink-0"
                >
                  <Icon className="h-3.5 w-3.5 text-sky-600" />
                  <span>{cat.name}</span>
                </a>
              );
            })}
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors shrink-0 pr-1"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* 4. Product Categories Sections */}
      <div className="space-y-6 sm:space-y-10 mt-6">
        {grouped.map((group, index) => (
          <div key={group.category}>
            <CategorySection
              title={group.category}
              products={group.products}
            />

            {/* Middle Seasonal Promo Banner after 2nd category */}
            {index === 1 && (
              <section className="mx-auto my-8 sm:my-12 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl border border-sky-900/20 bg-gradient-to-r from-[#071724] via-[#0B2540] to-[#071724] p-6 sm:p-10 text-white shadow-2xl">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />
                  <div className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />

                  <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                      <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 border border-sky-400/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Exclusive Distributor Pricing</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Planning a Kitchen Renovation or Heating Upgrade?
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Talk with our appliance specialists for bundle discounts on gas geysers, hobs, regulators, and high-flow safety valves.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <a
                        href="https://wa.me/923356599132?text=Hello%20Ahmad%20ElectroGas,%20I%20want%20a%20bundle%20quote"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500 active:scale-95"
                      >
                        <FaWhatsapp className="h-4 w-4" />
                        <span>Get Instant Quote</span>
                      </a>

                      <Link
                        href="/discount"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
                      >
                        <span>View Deals</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        ))}
      </div>

      {/* 5. Video Showcase & Showroom Demonstration */}
      <section className="mx-auto mt-12 sm:mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/40">
          <div className="mx-auto max-w-2xl text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3.5 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
              <Play className="h-3.5 w-3.5 fill-sky-600 text-sky-600" />
              <span>Live Showroom & Product Demonstration</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Watch Our Products in Action
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Take a closer look at our appliance craftsmanship, safety testing, and burner efficiency directly from our showroom floor.
            </p>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-slate-900/10 aspect-video">
            <iframe
              className="h-full w-full border-0"
              src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1269131610914058%2F&show_text=false&width=560&t=0"
              title="Ahmad ElectroGas Video Demonstration"
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
