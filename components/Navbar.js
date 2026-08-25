"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Package,
  Percent,
  Info,
  Phone,
  Search,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const NAV_LINKS = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
  },
  {
    name: "Deals",
    href: "/discount",
    icon: Percent,
    badge: "Sale",
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Phone,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for enhanced navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle navbar search click -> focus products search bar
  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (pathname === "/products") {
      const searchInput = document.getElementById("product-search-input");
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.dispatchEvent(new CustomEvent("focus-product-search"));
      }
    } else {
      router.push("/products?focus=search");
    }
  };

  // Don't render storefront Navbar on Admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/80"
          : "bg-white/90 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3 shrink-0">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-sky-100 bg-sky-50 shadow-xs transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/nav.png"
                alt="Ahmad ElectroGas Logo"
                width={44}
                height={44}
                priority
                className="object-cover transition-transform duration-500 group-hover:rotate-180"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl leading-none">
                Ahmad <span className="text-sky-600">Electro</span>
                <span className="text-amber-500">Gas</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider text-gray-400 uppercase mt-0.5">
                Appliances &amp; Fittings
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-sky-50 text-sky-700 shadow-2xs"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="rounded-full bg-red-500 px-1.5 py-0.2 text-[10px] font-bold uppercase text-white shadow-2xs">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Quick Button */}
            <button
              type="button"
              onClick={handleSearchClick}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600 active:scale-95 cursor-pointer"
              title="Search catalog"
              aria-label="Search catalog"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Direct WhatsApp Action */}
            <a
              href="https://wa.me/923356599132"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all duration-200 hover:bg-emerald-700 hover:shadow-md active:scale-95"
            >
              <FaWhatsapp className="h-4 w-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={handleSearchClick}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 shadow-xs transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600 active:scale-95"
              aria-label="Search catalog"
              title="Search catalog"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-100 focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden border-t border-gray-100 bg-white/98 backdrop-blur-xl ${
          isOpen ? "max-h-96 opacity-100 shadow-lg" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-sky-600 text-white shadow-xs"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4.5 w-4.5 ${isActive ? "text-white" : "text-gray-400"}`} />
                  <span>{link.name}</span>
                </div>

                {link.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      isActive ? "bg-white/20 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* WhatsApp CTA in Mobile Menu */}
          <div className="pt-3">
            <a
              href="https://wa.me/923356599132"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-xs hover:bg-emerald-700"
            >
              <FaWhatsapp className="h-4 w-4" />
              <span>Chat &amp; Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

  

