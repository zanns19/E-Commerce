"use client";

import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function ChatButton({ open, setOpen }) {
  return (
    <button
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      aria-label={open ? "Close chat" : "Open WhatsApp chat"}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-colors hover:bg-green-600"
    >
      {open ? (
        <IoClose size={30} />
      ) : (
        <FaWhatsapp size={30} />
      )}
    </button>
  );
}