import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between ">
        {/* Logo */}
        <div className="text-xl font-bold"><span className="text-red-500">POL</span>ONOVAM</div>

        {/* Navigation */}
        <nav className="space-x-8 hidden md:flex">
          <a href="#home" className="hover:text-red-500 transition">Anasayfa</a>
          <a href="#about" className="hover:text-red-500 transition">Hakkımızda</a>
        <a href="#package" className="hover:text-red-500 transition">Danismanlik</a>

          <a href="#contact" className="hover:text-red-500 transition">İletişim</a>

        </nav>
      </div>
    </header>
  );
}
