import Link from "next/link";
import ContactInfo from "@/components/ContactInfo";
import GoogleMap from "@/components/GoogleMap";
import ContactForm from "@/components/ContactForm";
import ContactFaq from "@/components/ContactFaq";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  Award,
  Headphones,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const metadata = {
  title: "Contact Us | Ahmad ElectroGas - Showroom & Support",
  description:
    "Get in touch with Ahmad ElectroGas. Speak with our appliance specialists, get instant WhatsApp quotes, visit our Muridwala showroom, or submit an inquiry.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50/60 pb-20 pt-8 sm:pt-12">
      {/* Decorative Ambient Background Gradients */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-full -translate-x-1/2 max-w-7xl">
          <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="absolute top-12 right-1/4 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center py-6 sm:py-10">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-sky-500 animate-pulse" />
              <span>Dedicated Customer Assistance • Fast Response</span>
            </div>

            {/* Main Page Title */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Let's Connect With{" "}
              <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Ahmad ElectroGas
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
              Have questions about our home appliances, instant geysers, gas fittings, or need quotation advice? Our specialists are here to assist you every day.
            </p>

            {/* Fast Action Buttons Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <a
                href="https://wa.me/923356599132?text=Hello%20Ahmad%20ElectroGas,%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:shadow-emerald-600/30 active:scale-95"
              >
                <FaWhatsapp className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+923350729306"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 hover:text-sky-600 active:scale-95"
              >
                <Phone className="h-4 w-4 text-sky-600" />
                <span>+92 335 0729306</span>
              </a>

              <a
                href="mailto:ahmadhassanmufti@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 hover:text-violet-600 active:scale-95"
              >
                <Mail className="h-4 w-4 text-violet-600" />
                <span>Email Us</span>
              </a>

              <a
                href="https://maps.google.com/?q=Ahmad+Gas+Center+Muridwala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 hover:text-amber-600 active:scale-95"
              >
                <MapPin className="h-4 w-4 text-amber-600" />
                <span>Visit Showroom</span>
              </a>
            </div>
          </section>

          {/* Contact Information Cards */}
          <section className="mt-8 mb-12 sm:mb-16">
            <ContactInfo />
          </section>

          {/* Main 2-Column Section: Form + Map & Quick Support */}
          <section className="mb-12 sm:mb-16">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              {/* Left: Contact Form (7 cols on lg) */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>

              {/* Right: Map + WhatsApp Support Hub (5 cols on lg) */}
              <div className="space-y-6 lg:col-span-5">
                {/* 1. Google Map Embed Card */}
                <GoogleMap />

                {/* 2. Instant WhatsApp Direct Support Card */}
                <div className="relative overflow-hidden rounded-3xl border border-emerald-900/30 bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] p-6 sm:p-7 text-white shadow-xl shadow-emerald-950/20">
                  <div className="pointer-events-none absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-white/10 blur-xl" />

                  <div className="relative">
                    <div className="flex items-center gap-2 text-emerald-200">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-300 animate-ping" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Live WhatsApp Helpline
                      </span>
                    </div>

                    <h3 className="mt-2 text-xl font-bold text-white">
                      Need Instant Appliance Guidance?
                    </h3>

                    <p className="mt-1.5 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                      Connect directly with our showroom sales desk. Ask about live inventory, best discounts, delivery quotes, or request product demonstration clips.
                    </p>

                    <div className="mt-5 flex flex-col sm:flex-row gap-3">
                      <a
                        href="https://wa.me/923356599132?text=Hello%20Ahmad%20ElectroGas,%20I%20need%20assistance%20with%20products"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-emerald-800 shadow-md transition-all hover:bg-emerald-50 hover:shadow-lg active:scale-95"
                      >
                        <FaWhatsapp className="h-4 w-4 text-emerald-600" />
                        <span>Chat With Sales Team</span>
                      </a>

                      <a
                        href="tel:+923356599132"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Direct Call</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3. Assurance & Trust Badges */}
                <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                    The Ahmad ElectroGas Guarantee
                  </h4>
                  <div className="space-y-3.5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          100% Genuine Branded Appliances
                        </p>
                        <p className="text-[11px] sm:text-xs text-slate-500">
                          Direct distributor partnerships with official factory warranties.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          Safe & Reliable Nationwide Delivery
                        </p>
                        <p className="text-[11px] sm:text-xs text-slate-500">
                          Secure packaging and tracked shipping across Pakistan.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                        <Headphones className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          Dedicated After-Sales & Parts Support
                        </p>
                        <p className="text-[11px] sm:text-xs text-slate-500">
                          Assistance with installation, troubleshooting, and spare components.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions Section */}
          <section className="mb-12 sm:mb-16">
            <ContactFaq />
          </section>
        </div>
      </div>
    </main>
  );
}