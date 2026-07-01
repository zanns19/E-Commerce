
  "use client";

  import { useEffect, useRef, useState } from "react";
import { Gulzar } from "next/font/google";

const gulzar = Gulzar({
  subsets: ["arabic"],
  weight: "400",
});

  export default function AboutPage() {
    const [openYear, setOpenYear] = useState("1992");
    const revealRef = useRef([]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove("translate-y-70", "opacity-0");
            entry.target.classList.add("translate-y-0", "opacity-100");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.1 }
      );
      revealRef.current.forEach((el) => el && observer.observe(el));
      return () => observer.disconnect();
    }, []);

    const years = [
      { year: "1992", text: `Ahmad ElectroGas embarked on its journey in 1992, starting as a small distribution business with a passion for delivering quality products to the community.` },
      { year: "2005", text: `Over the next decade, after 2005 we solidified our foundation and expanded our reach. A significant milestone came when we became the authorized dealer for two renowned national brands.` },
      { year: "2020", text: `After three decades, from 2020, Ahmad ElectroGas has evolved into a leading distributor of Home Appliances, partnering with multiple esteemed companies.` },
      { year: "2025", text: `Now we continue to evolve, we're excited to launch our website, allowing us to deliver our products directly to your doorstep.` },
    ];

    return (
      <div className="md:max-w-[1270px] mx-auto px-0.5">
        <section className="container mx-auto px-2 py-2 sm:px-4 sm:py-4">
          <div className="bg-[#F3F6FA] py-7 px-1 sm:px-8 lg:px-12 rounded-lg shadow-xl text-center max-w-4xl mx-auto mt-10 mb-10">
            <h1 className="text-3xl flex justify-center sm:text-4xl md:text-6xl font-extrabold">
              <span className={`${gulzar.className} py-2 text-[#0E6BA8] pt-8 sm:p-6 sm:pt-10 md:pt-16`}>خُوش آمدید اَحمد الیکٹرو گیس مریدوالا</span>
            </h1>
          </div>

          <div className="bg-[#071724] text-[#E6F6FF] p-3 sm:p-10 my-5 rounded-lg">
            <h1 className={`${gulzar.className} text-center text-[16px] sm:text-3xl sm:text-[40px]`}>تباہی ہے اُن لوگوں کے لیے جو ناپ تول میں کمی کرتے ہیں</h1>
            <div className="text-end mr-1 opacity-75 sm:mr-6 text-[15px] sm:text-xl">
              <h1 className={`${gulzar.className}font-bold text-center text-md md:text-lg lg:text-xl gulzar mt-5`}>(سورۃ المطففین 83:1)</h1>
            </div>
          </div>

          <div>
            <hr className="border-b-4 opacity-40 border-gray-600 my-12" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 my-4">
            <div className="md:w-1/2">
              <div className="relative group mx-auto rounded-2xl overflow-hidden">
                <a href="/aboutlogo.png">
                  <img
                    ref={(el) => (revealRef.current[0] = el)}
                    src="/aboutlogo.png"
                    alt="Ahmad ElectroGas Facility"
                    className="reveal transform translate-y-70 opacity-0 transition-all duration-700 ease-out rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-[#e20219a1] opacity-70 flex items-center justify-center -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h3l2-3h8l2 3h3v13H3V7z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase md:text-left">The Clear Choice!</h2>
              <p className="text-[#596674] leading-relaxed">Ahmad ElectroGas with its presence in the Pakistani Kitchens for more than three decades has constantly endeavored to give homemakers the latest in technology and making cooking a luxurious and pleasurable experience.</p>
              <p className="text-[#596674] leading-relaxed">Our vast network of dealers and service centers across the country ensures unfailing service and support for ultimate consumer satisfaction.</p>
              <p className="text-[#596674] leading-relaxed">Ahmad ElectroGas’s products promise more efficient working and hassle-free life. It is this promise, and its utmost fulfilment, that has made Ahmad ElectroGas a trusted and loved household brand in the country.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ul className="list-disc list-inside space-y-2 text-[#596674]">
                  <li>3 Company Showrooms</li>
                  <li>1 Manufacturing &amp; Assembly Plants</li>
                  <li>100+ Exhibitions in Various Areas</li>
                </ul>
                <ul className="list-disc list-inside space-y-2 text-[#596674]">
                  <li>Most Trusted Brand Nationwide</li>
                  <li>Head Office in Muridwala. District Faisalabad, Punjab PAKISTAN</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-b-4 opacity-40 border-gray-600 mb-4 sm:mt-12 sm:mb-12" />

          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 p-3 sm:p-8 mt-3">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-3xl font-bold mb-6">HISTORY OF Ahmad ElectroGas</h1>
              {years.map((item) => (
                <div key={item.year} className="border-b border-gray-300 py-4">
                  <button className="flex items-center w-full text-left focus:outline-none" onClick={() => setOpenYear(openYear === item.year ? "" : item.year)}>
                    <span className="icon text-lg font-bold w-8 h-8 flex items-center justify-center bg-black text-white mr-2">{openYear === item.year ? "-" : "+"}</span>
                    <span className="text-3xl font-bold">{item.year}</span>
                  </button>
                  <div className={`content my-4 text-black overflow-hidden transition-all duration-500 ease-out ${openYear === item.year ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="pt-2">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1 max-w-lg">
              <div className="relative group mx-auto rounded-2xl overflow-hidden">
                <a href="/static/image/logo.jpg">
                  <img
                    ref={(el) => (revealRef.current[1] = el)}
                    src="/logo.jpg"
                    alt="Worker"
                    className="w-full h-auto rounded shadow reveal transform translate-y-70 opacity-0 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-[#e20219a1] opacity-70 flex items-center justify-center -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h3l2-3h8l2 3h3v13H3V7z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
