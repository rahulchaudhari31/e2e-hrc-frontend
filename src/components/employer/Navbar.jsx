import React from "react";
import { Linkedin, Twitter, Facebook, Instagram, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Employer", href: "#", active: true },
  { label: "Employee", href: "#" },
  { label: "Workforce Solutions", href: "#" },
  { label: "Become a Partner", href: "#" },
  { label: "Blogs", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Navbar() {
  return (
    <header className="w-full">
      {/* Top announcement bar */}
      <div className="bg-brand-black text-white text-sm py-2 px-4 flex items-center justify-between">
        <div className="flex-1 text-center">
          <a href="#vacancy" className="text-brand-orange hover:underline inline-flex items-center gap-1">
            Looking to hire exceptional talent? Submit a Vacancy
            <ArrowRight size={14} />
          </a>
        </div>
        <div className="hidden md:flex items-center gap-3 pr-2">
          <Linkedin size={14} className="cursor-pointer hover:text-brand-orange" />
          <Twitter size={14} className="cursor-pointer hover:text-brand-orange" />
          <Facebook size={14} className="cursor-pointer hover:text-brand-orange" />
          <Instagram size={14} className="cursor-pointer hover:text-brand-orange" />
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white py-3 px-4 md:px-10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-extrabold text-brand-orange">e2e</span>
          <div className="leading-tight ml-1">
            <p className="text-[10px] font-bold tracking-wide text-brand-navy">
              HUMAN RESOURCE
            </p>
            <p className="text-[9px] tracking-widest text-gray-500">CONSULTANCY</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "text-brand-orange font-semibold"
                  : "hover:text-brand-orange transition-colors"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button className="bg-brand-orange hover:bg-brand-orangeDark text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors">
          Submit Vacancy / CV
        </button>
      </div>
    </header>
  );
}
