"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaGithub } from "react-icons/fa";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#071724] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Company */}
          <div>
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/nav.png"
                alt="Ahmad ElectroGas"
                width={50}
                height={50}
                className="rounded-full transition-transform duration-500 group-hover:rotate-180"
              />
              <h2 className="text-2xl font-bold">
                Ahmad <span className="text-sky-400">ElectroGas</span>
              </h2>
            </Link>

            <p className="mt-5 text-gray-300 leading-7 ">
              Ahmad ElectroGas has been serving Pakistani kitchens for
              decades by providing quality cooking appliances with
              modern technology, reliability, and excellent customer
              service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/" className="hover:text-sky-400">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-sky-400">Products</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sky-400">About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="">
            <h3 className="text-xl font-semibold mb-5">Contact Us</h3>
            <div className="space-y-4 text-gray-300 " >
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <a href="tel:+923356599132" className="hover:text-sky-400">
                  +92 335 6599132
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <a href="mailto:ahmadhassanmufti@gmail.com" className="hover:text-sky-400">
                  ahmadhassanmufti@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1" />
                <p>Main Rajana Road, Muridwala, Faisalabad, Pakistan</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-normal gap-5 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition"
              >
                <FaFacebookF size={22} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition"
              >
                <FaInstagram size={22} />
              </a>

              <a
                href="https://wa.me/923356599132"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaWhatsapp size={22} />
              </a>

              <a
                href="https://github.com/zanns19"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}


        {/* Bottom */}
        <div className="w-full max-w-7xl mx-auto p-1.5 sm:p-4 md:pt-4">
          <span className="flex justify-center text-sm sm:text-lg md:text-2xl my-3 sm:my-6 text-white font-bold text-center">
            © {currentYear} Ahmad ElectroGas. All Rights Reserved.
          </span>
          <span className="flex justify-center text-sm sm:text-md text-white sm:text-center dark:text-gray-400">
            Developed by:&nbsp;
            <a
              href="https://github.com/zanns19"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link1 font-bold text-[#FFFFFF] hover:text-[#0E6BA8]"
            >
              Zuhair Anns Anwar
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}