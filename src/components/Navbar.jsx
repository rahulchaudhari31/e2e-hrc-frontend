import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AnnouncementBar from "./AnnouncementBar";
import logo from "../assets/images/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Employer", path: "/employer" },
    { name: "Workforce Solutions", path: "/workforce-solutions" },
    { name: "Employee", path: "/employee" },
    { name: "Become a Partner", path: "/Become-partner" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact Us", path: "/contact" },
  ];

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-700 font-semibold"
      : "text-[#1b2a41] hover:text-blue-700";

  return (
    <>
      <AnnouncementBar />
      <nav className="sticky top-0 z-[9999] bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-6 lg:px-14">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="E2E HRC" className="h-10 sm:h-12" />
          </NavLink>

          <div className="hidden items-center gap-7 text-sm font-medium xl:flex">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClass}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <button className="hidden rounded-full bg-orange-400 px-6 py-3 text-sm font-bold text-white hover:bg-orange-500 lg:block">
            Submit Vacancy / CV
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-[#1b2a41] hover:bg-slate-100 xl:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg xl:hidden">
            <div className="flex flex-col gap-4 text-sm font-medium">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={linkClass}
                >
                  {link.name}
                </NavLink>
              ))}

              <button className="mt-2 rounded-full bg-orange-400 px-6 py-3 text-sm font-bold text-white hover:bg-orange-500">
                Submit Vacancy / CV
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;