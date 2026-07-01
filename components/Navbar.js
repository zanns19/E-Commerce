"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/nav.png"
              alt="Ahmad ElectroGas"
              width={45}
              height={45}
              className="rounded-full transition-transform duration-500 group-hover:rotate-180"
            />

            <h1 className="text-2xl font-bold text-gray-700">
              Ahmad{" "}
              <span className="text-sky-600">
                ElectroGas
              </span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-sky-600 after:transition-all after:duration-300
                  ${
                    pathname === link.href
                      ? "text-sky-600 after:w-full"
                      : "text-gray-600 hover:text-sky-600 after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-sky-600"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isOpen ? "max-h-80 mt-5" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-4 rounded-xl bg-gray-50 p-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-2 transition ${
                    pathname === link.href
                      ? "bg-sky-600 text-white"
                      : "text-gray-700 hover:bg-sky-100"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
  

