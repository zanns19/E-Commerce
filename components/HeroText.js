"use client";

import { useEffect, useState } from "react";

export default function HeroText() {
  const headingWords =
    "Welcome to Ahmad ElectroGas".split("");

  const paragraphWords =
    "Our aim is to provide quality products to your doorstep.".split("");

  const [headingIndex, setHeadingIndex] = useState(0);
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [showParagraph, setShowParagraph] = useState(false);

  // Heading typing
  useEffect(() => {
    if (headingIndex >= headingWords.length) {
      const timer = setTimeout(() => {
        setShowParagraph(true);
      }, 50);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setHeadingIndex((prev) => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [headingIndex]);

  // Paragraph typing
  useEffect(() => {
    if (!showParagraph) return;

    if (paragraphIndex >= paragraphWords.length) return;

    const timer = setTimeout(() => {
      setParagraphIndex((prev) => prev + 1);
    }, 75);

    return () => clearTimeout(timer);
  }, [showParagraph, paragraphIndex]);

  return (
    <section className="z-20 px-2 text-center">
      <div className="max-w-4xl rounded-lg border-2 border-[#E6EEF6] bg-[#F3F6FA]/80 px-1 py-2 shadow-xl sm:px-6 sm:py-4 lg:px-10 lg:py-10">

        {/* Heading */}
        <h1 className="mb-5 text-[15px] font-extrabold text-[#0B2540] sm:text-2xl md:text-[30px] lg:text-[34px] xl:text-[40px]">
          {headingWords.slice(0, headingIndex).map((char, index) => (
            <span
              key={index}
              className={
                index >= 16
                  ? "text-[#00789a]"
                  : ""
              }
            >
              {char}
            </span>
          ))}

          {!showParagraph && (
            <span className="animate-pulse">|</span>
          )}
        </h1>

        {/* Paragraph */}
        <p
          className={`text-[10px] font-bold text-green-800 transition-opacity duration-500 sm:text-lg md:text-2xl xl:text-3xl ${
            showParagraph ? "opacity-100" : "opacity-0"
          }`}
        >
          {paragraphWords
            .slice(0, paragraphIndex)
            .map((char, index) => (
              <span key={index}>{char}</span>
            ))}

          {showParagraph &&
            paragraphIndex < paragraphWords.length && (
              <span className="animate-pulse">|</span>
            )}
        </p>

      </div>
    </section>
  );
}