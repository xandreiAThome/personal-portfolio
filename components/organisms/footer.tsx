export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/30 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm text-foreground/50 font-light">
          © {currentYear} xandrei@home Cosmic Portfolio.
        </div>
        <div className="text-sm text-foreground/50 font-light mt-4 md:mt-0">
          Powered by Next.js, React & Tailwind CSS
        </div>
      </div>
    </footer>
  );
}
