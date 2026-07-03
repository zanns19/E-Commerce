"use client";

import Image from "next/image";

export default function PoweredBy() {
  return (
    <div className="mt-6 flex justify-center">
      <a
        href="https://github.com/zanns19"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
      >
        <Image
          src="/mylogo.png"
          alt="Logo"
          width={34}
          height={34}
          className="invert"
          style={{
            width: "34px",
            height: "34px",
          }}
        />

        <div className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 rounded-lg bg-black px-3 py-2 text-xs whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-100">
          Powered by <strong>Zuhair Anns Anwar</strong>
        </div>
      </a>
    </div>
  );
}