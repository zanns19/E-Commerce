"use client";

import { useState } from "react";
import { Send, RotateCcw } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully!");

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="py-14">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">

          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Contact Us
            </h2>

            <p className="mt-3 text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name & Email */}

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              />

            </div>

            {/* Subject */}

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={form.subject}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
            />

            {/* Message */}

            <textarea
              rows="6"
              name="message"
              placeholder="Type your message..."
              required
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-sky-500"
            />

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-4">

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                <Send size={18} />

                {loading ? "Sending..." : "Send Message"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg transition"
              >
                <RotateCcw size={18} />
                Reset
              </button>

            </div>

            <p className="text-sm text-gray-500">
              Your information is Safe and will only be used to respond to your message.
            </p>

          </form>

        </div>

      </div>
    </section>
  );
}