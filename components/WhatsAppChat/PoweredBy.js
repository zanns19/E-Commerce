"use client";

import Image from "next/image";
import Link from "next/link";

export default function PoweredBy() {
  return (
    <div className="flex justify-center mt-6">

      <Link
        href="https://github.com/zanns19"
        target="_blank"
        className="relative group"
      >
        <Image
          src="/mylogo.png"
          alt="Logo"
          width={34}
          height={34}
          className="invert"
        />

        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            bottom-full
            mb-3
            opacity-0
            group-hover:opacity-100
            group-hover:-translate-y-2
            transition-all
            duration-300
            whitespace-nowrap
            bg-black
            text-white
            px-3
            py-2
            rounded-lg
            text-xs
          "
        >
          Powered by <strong>Zuhair Anns Anwar</strong>
        </div>

      </Link>

    </div>
  );
}