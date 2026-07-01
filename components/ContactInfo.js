import {
  MapPin,
  Phone,
  Clock3,
  Mail,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

      {/* Address */}
      <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
        <div className="flex justify-center mb-5">
          <div className="bg-sky-100 p-4 rounded-full">
            <MapPin className="text-sky-600" size={32} />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">
          Our Address
        </h3>

        <p className="text-gray-600">
          Main Rajana Road,
        </p>

        <p className="text-gray-600">
          Muridwala,
        </p>

        <p className="text-gray-600">
          District Faisalabad
        </p>
      </div>

      {/* Phone */}

      <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
        <div className="flex justify-center mb-5">
          <div className="bg-sky-100 p-4 rounded-full">
            <Phone className="text-sky-600" size={32} />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">
          Our Phone
        </h3>

        <a
          href="tel:+923350729306"
          className="block text-gray-600 hover:text-sky-600"
        >
          +92 335 0729306
        </a>

        <a
          href="tel:+923356599132"
          className="block text-gray-600 hover:text-sky-600 mt-2"
        >
          +92 335 6599132
        </a>
      </div>

      {/* Working Hours */}

      <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
        <div className="flex justify-center mb-5">
          <div className="bg-sky-100 p-4 rounded-full">
            <Clock3 className="text-sky-600" size={32} />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">
          Working Hours
        </h3>

        <p className="text-gray-600">
          Monday - Sunday
        </p>

        <p className="text-gray-600">
          8:00 AM - 6:00 PM
        </p>

        <p className="text-gray-600 mt-2">
          Friday
        </p>

        <p className="text-gray-600">
          8:00 AM - 12:00 PM
        </p>
      </div>

      {/* Email */}

      <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
        <div className="flex justify-center mb-5">
          <div className="bg-sky-100 p-4 rounded-full">
            <Mail className="text-sky-600" size={32} />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">
          Email Address
        </h3>

        <a
          href="mailto:ahmadhassanmufti@gmail.com"
          className="block text-gray-600 lg:text-sm hover:text-sky-600 mt-2 break-all"
        >
          ahmadhassanmufti@gmail.com
        </a>

        <a
          href="mailto:ahmadhassanmufti015@gmail.com"
          className="block text-gray-600 lg:text-[13px] hover:text-sky-600 break-all"
        >
          ahmadhassanmufti015@gmail.com
        </a>
      </div>

    </section>
  );
}