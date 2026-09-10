import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const navigation = ["Home", "About Us", "Our Services", "Latest Jobs", "Expert Blogs"];

export default function Footer() {
  return (
    <footer className="w-full bg-brand-black text-white pt-16 pb-6 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-1 mb-4">
            <span className="text-2xl font-extrabold text-brand-orange">e2e</span>
            <div className="leading-tight ml-1">
              <p className="text-[10px] font-bold tracking-wide text-white">
                HUMAN RESOURCE
              </p>
              <p className="text-[9px] tracking-widest text-gray-400">
                CONSULTANCY
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Connecting exceptional talent with exceptional businesses across
            the UK, Europe, South Asia, and the GCC since 2007.
          </p>
        </div>

        {/* UK Head Office */}
        <div>
          <h4 className="text-brand-orange font-bold text-sm tracking-wide mb-4">
            UK HEAD OFFICE
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 flex-shrink-0" />
              <span>Unit 2, 1204B Stratford Road, Hall Green, Birmingham, B28 8HN, UK</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="flex-shrink-0" />
              <span>+44 (0) 121 778 2400</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="flex-shrink-0" />
              <span>info@e2ehrc.co.uk</span>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-brand-orange font-bold text-sm tracking-wide mb-4">
            NAVIGATION
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            {navigation.map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-brand-orange transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Office locations */}
        <div>
          <h4 className="text-brand-orange font-bold text-sm tracking-wide mb-4">
            OUR OFFICE LOCATIONS
          </h4>
          <div className="relative bg-white/5 rounded-lg h-32 flex items-center justify-center text-xs text-gray-500">
            World map
            <span className="absolute bottom-3 right-6 bg-white text-brand-navy text-[10px] font-semibold px-2 py-1 rounded">
              India
            </span>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 pt-6">
        COPYRIGHT © 2024 BY E2E HUMAN RESOURCE CONSULTANCY LTD | ALL RIGHTS RESERVED
      </p>
    </footer>
  );
}
