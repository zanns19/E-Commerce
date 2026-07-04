"use client";

import { useEffect, useState } from "react";

export default function ProductDescription({ text }) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    const updateText = () => {
      const limit = window.innerWidth >= 640 ? 82 : 56;

      if (text.length <= limit) {
        setDescription(text);
      } else {
        const shortText = text.substring(0, limit);
        setDescription(shortText + "...");
      }
    };

    updateText();

    window.addEventListener("resize", updateText);

    return () => window.removeEventListener("resize", updateText);
  }, [text]);

  return description;
}