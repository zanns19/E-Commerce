"use client";

export default function ChatButton({ open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="
        relative
        flex
        items-center
        justify-center
        w-14
        h-14
        rounded-full
        bg-green-500
        hover:bg-green-600
        shadow-xl
        transition-all
        duration-300
      "
    >
      {/* WhatsApp Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        className={`absolute w-8 h-8 transition-all duration-300
        ${
          open
            ? "opacity-0 rotate-90 scale-75"
            : "opacity-100 rotate-0 scale-100"
        }`}
      >
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.2 1.6 6.03L0 24l6.18-1.63A11.96 11.96 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-2.08 0-4.1-.56-5.86-1.62l-.42-.25-3.65.96.98-3.55-.27-.43A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.27-7.74c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.16.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.14-.14.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.13-.23-.56-.47-.49-.64-.5-.16-.01-.36-.01-.55-.01-.19 0-.51.07-.78.36-.26.29-1.02 1-1.02 2.44 0 1.44 1.04 2.83 1.18 3.02.15.19 2.05 3.12 4.97 4.38.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.7-.7 1.94-1.38.24-.67.24-1.24.17-1.38-.07-.14-.26-.23-.55-.38z" />
      </svg>

      {/* Close Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        className={`absolute w-8 h-8 transition-all duration-300
        ${
          open
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-75"
        }`}
      >
        <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12l-4.9 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.9a1 1 0 001.41-1.41L13.41 12l4.9-4.89a1 1 0 000-1.4z" />
      </svg>
    </button>
  );
}