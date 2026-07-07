"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroText from "./HeroText";
const slides = [
  "/crousel1.jpg",
  "/crousel2.jpg",
  "/crousel3.jpg",
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  return (
    <div className="relative w-full overflow-hidden">

      {/* Images */}
      <div className="relative h-44 sm:h-56 md:h-80 lg:h-96 xl:h-[720px]">

        {slides.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}

      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <HeroText />
      </div>

      {/* Previous */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/40 p-3 backdrop-blur hover:bg-white/70"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/40 p-3 backdrop-blur hover:bg-white/70"
      >
        <ChevronRight size={22} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3">

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              current === index
                ? "bg-white"
                : "bg-white/50"
            }`}
          />
        ))}

      </div>

    </div>
  );
}