"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircleQuestion } from "lucide-react";

const FAQS = [
  {
    question: "How quickly will I receive a reply to my message?",
    answer:
      "For urgent inquiries, our WhatsApp team responds within a few minutes during regular business hours (8:00 AM – 6:00 PM). Messages sent through the contact form or email are typically answered within 12 to 24 hours.",
  },
  {
    question: "Can I inspect the products physically before purchasing?",
    answer:
      "Yes, absolutely! We welcome you to visit our main showroom at Main Rajana Road, Muridwala, District Faisalabad. If you are located in another city, our team can share live high-resolution photos and video walkarounds of any appliance via WhatsApp.",
  },
  {
    question: "Do you deliver home & gas appliances across Pakistan?",
    answer:
      "Yes, we provide reliable nationwide delivery across Pakistan for all appliances including instant geysers, gas heaters, valves, cooking hobs, and accessories, safely packaged to prevent transit damage.",
  },
  {
    question: "What warranty coverage is included with appliances?",
    answer:
      "All branded appliances come with official manufacturer warranty cards. Our team assists customers throughout the warranty lifecycle for genuine replacement parts and technical support.",
  },
  {
    question: "Do you offer wholesale / bulk pricing for dealers and contractors?",
    answer:
      "Yes, Ahmad ElectroGas is an authorized distributor. For bulk orders, construction projects, or retail dealership inquiries, please select the 'Bulk / Wholesale Deal' topic or contact our sales team directly.",
  },
];

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/40">
      <div className="mx-auto max-w-2xl text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3.5 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
          <MessageCircleQuestion className="h-4 w-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Got Questions? We Have Answers.
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Everything you need to know about contacting us, orders, delivery, and showroom visits.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-sky-300 bg-sky-50/30 shadow-sm"
                  : "border-slate-200/80 bg-white hover:border-slate-300"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-semibold text-slate-900">
                  {faq.question}
                </span>
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                    isOpen
                      ? "bg-sky-600 text-white rotate-180"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out px-5 overflow-hidden ${
                  isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 pb-0 opacity-0"
                }`}
              >
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
