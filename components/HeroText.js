"use client";

import { useEffect, useState } from "react";

export default function HeroText() {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecond(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="z-20 px-4 text-center">
      <div className="max-w-4xl rounded-lg border-2 border-[#E6EEF6] bg-[#F3F6FA]/80 px-3 py-2 shadow-xl sm:px-8 sm:py-4 lg:px-12 lg:py-10">

        <h1 className="mb-2 text-[15px] font-extrabold text-[#0B2540] sm:text-2xl md:text-[30px] lg:text-[34px] xl:text-[40px]">
          Welcome to Ahmad{" "}
          <span className="text-[#00789a]">
            ElectroGas
          </span>
        </h1>

        <p
          className={`text-[10px] font-bold text-green-800 transition-all duration-700 sm:text-lg md:text-2xl xl:text-3xl ${
            showSecond
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          Our aim is to provide quality products to your doorstep.
        </p>

      </div>
    </section>
  );
}