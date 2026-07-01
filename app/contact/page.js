import ContactInfo from "@/components/ContactInfo";
import GoogleMap from "@/components/GoogleMap";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Ahmad ElectroGas",
  description: "Get in touch with Ahmad ElectroGas.",
};

export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      {/* Page Heading */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Get In Touch
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          We'd love to hear from you. Whether you have a question about our
          products, pricing, or anything else, our team is ready to answer all
          your questions.
        </p>
      </section>

      {/* Contact Information */}
      <section className="mb-12">
        <ContactInfo />
      </section>

      {/* Google Map */}
      <section className="mb-12">
        <GoogleMap />
      </section>

      {/* Contact Form */}
      <section>
        <ContactForm />
      </section>
    </main>
  );
}