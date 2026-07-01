export default function GoogleMap() {
  return (
    <section>
      <div className="overflow-hidden rounded-2xl shadow-lg">

        <iframe
          title="Ahmad ElectroGas Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.7834268003567!2d72.7177987!3d30.892719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922e195758dd1f9%3A0xf022e121e5761e9c!2sAhmad%20Gas%20Center!5e0!3m2!1sen!2s!4v1754218253878!5m2!1sen!2s"
          className="w-full h-[300px] md:h-[500px]"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

      </div>
    </section>
  );
}