"use client";

export default function TestPage() {
  return (
    <div className="p-10">
      <button className="bg-green-500 text-white px-5 py-3 rounded">
        Hello
      </button>

      <a
        href="https://google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 block rounded bg-gray-200 p-3"
      >
        Google
      </a>
    </div>
  );
}