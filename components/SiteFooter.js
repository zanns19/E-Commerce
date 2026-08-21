export default function SiteFooter() {
  return (
    <footer className="border-t border-ink-600/10 bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-mist-300">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono font-semibold text-white">
              Ahmad<span className="text-electric">Electro</span>
              <span className="text-gas">Gas</span>
            </p>
            <p className="mt-1 max-w-sm text-mist-500">
              Electrical fittings, gas appliances, and installation services —
              done right, the first time.
            </p>
          </div>
          <p className="text-mist-500">
            © {new Date().getFullYear()} AhmadElectroGas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
