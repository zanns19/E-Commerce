"use client";

import { useEffect, useState } from "react";

export default function ProductDescription({ text }) {
  const [limit, setLimit] = useState(56);

  useEffect(() => {
    const update = () => {
      setLimit(window.innerWidth >= 640 ? 82 : 56);
    };

    update();

    window.addEventListener("resize", update);

    return () =>
      window.removeEventListener("resize", update);
  }, []);

  const short =
    text.length > limit
      ? text.substring(0, limit) + "..."
      : text;

  return (
    <p className="text-sm text-gray-700 h-16 overflow-hidden">
      {short}
    </p>
  );
}