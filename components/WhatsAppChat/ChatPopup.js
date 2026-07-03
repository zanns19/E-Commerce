"use client";

import Image from "next/image";
import Link from "next/link";
import PoweredBy from "./PoweredBy";

export default function ChatPopup({ open }) {
  return (
    <div
      className={`fixed bottom-40 right-4 sm:right-10 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right z-50
        ${
          open
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-90 invisible"
        }
      `}
    >
      {/* Header */}
      <div className="bg-green-500 p-4 flex items-center gap-3 text-white">
        <div className="bg-green-600 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-7 h-7"
          >
            <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.2 1.6 6.03L0 24l6.18-1.63A11.96 11.96 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
          </svg>
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            Start a Conversation
          </h3>

          <p className="text-sm text-green-100">
            Hi! Click below to chat on WhatsApp
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">

        <p className="text-gray-600 text-sm mb-4">
          Our team usually replies within a few minutes.
        </p>

        {/* Customer Support Card */}
        <a
          href="https://wa.me/923356599132"
          target="_blank"
          className="flex items-center gap-4 rounded-xl bg-gray-100 hover:bg-gray-200 p-3 transition"
        >
          <div className="bg-green-500 rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-7 h-7"
            >
              <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.2 1.6 6.03L0 24l6.18-1.63A11.96 11.96 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
            </svg>
          </div>

          <div>
            <p className="font-semibold">
              Customer Support
            </p>

            <p className="text-xs text-gray-500">
              Click to chat
            </p>
          </div>
        </a>

        {/* Powered By */}
        <PoweredBy />

      </div>
    </div>
  );
}