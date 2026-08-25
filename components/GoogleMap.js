"use client";

import { MapPin, Navigation, ExternalLink } from "lucide-react";

export default function GoogleMap() {
  const mapDirectionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Ahmad+Gas+Center+Muridwala";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
      {/* Map Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 p-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Ahmad Gas Center</h4>
            <p className="text-xs text-slate-500">Main Rajana Road, Muridwala, Faisalabad</p>
          </div>
        </div>

        <a
          href={mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-sky-600 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-sky-50 hover:text-sky-700 hover:ring-sky-200 active:scale-95 shrink-0"
        >
          <Navigation className="h-3.5 w-3.5" />
          <span>Get Directions</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      </div>

      {/* Embedded Google Map */}
      <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] bg-slate-100">
        <iframe
          title="Ahmad ElectroGas Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.7834268003567!2d72.7177987!3d30.892719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922e195758dd1f9%3A0xf022e121e5761e9c!2sAhmad%20Gas%20Center!5e0!3m2!1sen!2s!4v1754218253878!5m2!1sen!2s"
          className="h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}