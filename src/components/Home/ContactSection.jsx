import React, { useState, useRef, useEffect } from "react";
import { Check, Phone, Mail, User, Paperclip, ChevronDown, ArrowRight, Search } from "lucide-react";
import { getContactCta } from "../../services/contactCtaService";
import groupIcon from "../../assets/images/Career Growth imgs/Group.png";

/**
 * ContactSection.jsx
 *
 * NOTE: Only the UI/markup/styling has been updated to match the provided
 * screenshot. The submit handler below (`handleSubmit`) is a placeholder —
 * wire it back up to your existing API call / form logic exactly as it was
 * before. Do not change the API integration itself, only drop your existing
 * fetch/axios/mutate call into `handleSubmit`.
 */

// Full country list with ISO flag emoji + dial code
const COUNTRIES = [
  { name: "Afghanistan", code: "AF", dial: "+93", flag: "🇦🇫" },
  { name: "Albania", code: "AL", dial: "+355", flag: "🇦🇱" },
  { name: "Algeria", code: "DZ", dial: "+213", flag: "🇩🇿" },
  { name: "Andorra", code: "AD", dial: "+376", flag: "🇦🇩" },
  { name: "Angola", code: "AO", dial: "+244", flag: "🇦🇴" },
  { name: "Argentina", code: "AR", dial: "+54", flag: "🇦🇷" },
  { name: "Armenia", code: "AM", dial: "+374", flag: "🇦🇲" },
  { name: "Australia", code: "AU", dial: "+61", flag: "🇦🇺" },
  { name: "Austria", code: "AT", dial: "+43", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "AZ", dial: "+994", flag: "🇦🇿" },
  { name: "Bahamas", code: "BS", dial: "+1242", flag: "🇧🇸" },
  { name: "Bahrain", code: "BH", dial: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", code: "BD", dial: "+880", flag: "🇧🇩" },
  { name: "Belarus", code: "BY", dial: "+375", flag: "🇧🇾" },
  { name: "Belgium", code: "BE", dial: "+32", flag: "🇧🇪" },
  { name: "Belize", code: "BZ", dial: "+501", flag: "🇧🇿" },
  { name: "Benin", code: "BJ", dial: "+229", flag: "🇧🇯" },
  { name: "Bhutan", code: "BT", dial: "+975", flag: "🇧🇹" },
  { name: "Bolivia", code: "BO", dial: "+591", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", code: "BA", dial: "+387", flag: "🇧🇦" },
  { name: "Botswana", code: "BW", dial: "+267", flag: "🇧🇼" },
  { name: "Brazil", code: "BR", dial: "+55", flag: "🇧🇷" },
  { name: "Brunei", code: "BN", dial: "+673", flag: "🇧🇳" },
  { name: "Bulgaria", code: "BG", dial: "+359", flag: "🇧🇬" },
  { name: "Burkina Faso", code: "BF", dial: "+226", flag: "🇧🇫" },
  { name: "Burundi", code: "BI", dial: "+257", flag: "🇧🇮" },
  { name: "Cambodia", code: "KH", dial: "+855", flag: "🇰🇭" },
  { name: "Cameroon", code: "CM", dial: "+237", flag: "🇨🇲" },
  { name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦" },
  { name: "Chad", code: "TD", dial: "+235", flag: "🇹🇩" },
  { name: "Chile", code: "CL", dial: "+56", flag: "🇨🇱" },
  { name: "China", code: "CN", dial: "+86", flag: "🇨🇳" },
  { name: "Colombia", code: "CO", dial: "+57", flag: "🇨🇴" },
  { name: "Congo", code: "CG", dial: "+242", flag: "🇨🇬" },
  { name: "Costa Rica", code: "CR", dial: "+506", flag: "🇨🇷" },
  { name: "Croatia", code: "HR", dial: "+385", flag: "🇭🇷" },
  { name: "Cuba", code: "CU", dial: "+53", flag: "🇨🇺" },
  { name: "Cyprus", code: "CY", dial: "+357", flag: "🇨🇾" },
  { name: "Czech Republic", code: "CZ", dial: "+420", flag: "🇨🇿" },
  { name: "Denmark", code: "DK", dial: "+45", flag: "🇩🇰" },
  { name: "Djibouti", code: "DJ", dial: "+253", flag: "🇩🇯" },
  { name: "Dominican Republic", code: "DO", dial: "+1809", flag: "🇩🇴" },
  { name: "Ecuador", code: "EC", dial: "+593", flag: "🇪🇨" },
  { name: "Egypt", code: "EG", dial: "+20", flag: "🇪🇬" },
  { name: "El Salvador", code: "SV", dial: "+503", flag: "🇸🇻" },
  { name: "Estonia", code: "EE", dial: "+372", flag: "🇪🇪" },
  { name: "Ethiopia", code: "ET", dial: "+251", flag: "🇪🇹" },
  { name: "Fiji", code: "FJ", dial: "+679", flag: "🇫🇯" },
  { name: "Finland", code: "FI", dial: "+358", flag: "🇫🇮" },
  { name: "France", code: "FR", dial: "+33", flag: "🇫🇷" },
  { name: "Gabon", code: "GA", dial: "+241", flag: "🇬🇦" },
  { name: "Gambia", code: "GM", dial: "+220", flag: "🇬🇲" },
  { name: "Georgia", code: "GE", dial: "+995", flag: "🇬🇪" },
  { name: "Germany", code: "DE", dial: "+49", flag: "🇩🇪" },
  { name: "Ghana", code: "GH", dial: "+233", flag: "🇬🇭" },
  { name: "Greece", code: "GR", dial: "+30", flag: "🇬🇷" },
  { name: "Guatemala", code: "GT", dial: "+502", flag: "🇬🇹" },
  { name: "Guinea", code: "GN", dial: "+224", flag: "🇬🇳" },
  { name: "Haiti", code: "HT", dial: "+509", flag: "🇭🇹" },
  { name: "Honduras", code: "HN", dial: "+504", flag: "🇭🇳" },
  { name: "Hong Kong", code: "HK", dial: "+852", flag: "🇭🇰" },
  { name: "Hungary", code: "HU", dial: "+36", flag: "🇭🇺" },
  { name: "Iceland", code: "IS", dial: "+354", flag: "🇮🇸" },
  { name: "India", code: "IN", dial: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", dial: "+62", flag: "🇮🇩" },
  { name: "Iran", code: "IR", dial: "+98", flag: "🇮🇷" },
  { name: "Iraq", code: "IQ", dial: "+964", flag: "🇮🇶" },
  { name: "Ireland", code: "IE", dial: "+353", flag: "🇮🇪" },
  { name: "Israel", code: "IL", dial: "+972", flag: "🇮🇱" },
  { name: "Italy", code: "IT", dial: "+39", flag: "🇮🇹" },
  { name: "Jamaica", code: "JM", dial: "+1876", flag: "🇯🇲" },
  { name: "Japan", code: "JP", dial: "+81", flag: "🇯🇵" },
  { name: "Jordan", code: "JO", dial: "+962", flag: "🇯🇴" },
  { name: "Kazakhstan", code: "KZ", dial: "+7", flag: "🇰🇿" },
  { name: "Kenya", code: "KE", dial: "+254", flag: "🇰🇪" },
  { name: "Kuwait", code: "KW", dial: "+965", flag: "🇰🇼" },
  { name: "Kyrgyzstan", code: "KG", dial: "+996", flag: "🇰🇬" },
  { name: "Laos", code: "LA", dial: "+856", flag: "🇱🇦" },
  { name: "Latvia", code: "LV", dial: "+371", flag: "🇱🇻" },
  { name: "Lebanon", code: "LB", dial: "+961", flag: "🇱🇧" },
  { name: "Lesotho", code: "LS", dial: "+266", flag: "🇱🇸" },
  { name: "Liberia", code: "LR", dial: "+233", flag: "🇱🇷" },
  { name: "Libya", code: "LY", dial: "+218", flag: "🇱🇾" },
  { name: "Liechtenstein", code: "LI", dial: "+423", flag: "🇱🇮" },
  { name: "Lithuania", code: "LT", dial: "+370", flag: "🇱🇹" },
  { name: "Luxembourg", code: "LU", dial: "+352", flag: "🇱🇺" },
  { name: "Macau", code: "MO", dial: "+853", flag: "🇲🇴" },
  { name: "Madagascar", code: "MG", dial: "+261", flag: "🇲🇬" },
  { name: "Malawi", code: "MW", dial: "+265", flag: "🇲🇼" },
  { name: "Malaysia", code: "MY", dial: "+60", flag: "🇲🇾" },
  { name: "Maldives", code: "MV", dial: "+960", flag: "🇲🇻" },
  { name: "Mali", code: "ML", dial: "+223", flag: "🇲🇱" },
  { name: "Malta", code: "MT", dial: "+356", flag: "🇲🇹" },
  { name: "Mauritania", code: "MR", dial: "+222", flag: "🇲🇷" },
  { name: "Mauritius", code: "MU", dial: "+230", flag: "🇲🇺" },
  { name: "Mexico", code: "MX", dial: "+52", flag: "🇲🇽" },
  { name: "Moldova", code: "MD", dial: "+373", flag: "🇲🇩" },
  { name: "Monaco", code: "MC", dial: "+377", flag: "🇲🇨" },
  { name: "Mongolia", code: "MN", dial: "+976", flag: "🇲🇳" },
  { name: "Montenegro", code: "ME", dial: "+382", flag: "🇲🇪" },
  { name: "Morocco", code: "MA", dial: "+212", flag: "🇲🇦" },
  { name: "Mozambique", code: "MZ", dial: "+258", flag: "🇲🇿" },
  { name: "Myanmar", code: "MM", dial: "+95", flag: "🇲🇲" },
  { name: "Namibia", code: "NA", dial: "+264", flag: "🇳🇦" },
  { name: "Nepal", code: "NP", dial: "+977", flag: "🇳🇵" },
  { name: "Netherlands", code: "NL", dial: "+31", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", dial: "+64", flag: "🇳🇿" },
  { name: "Nicaragua", code: "NI", dial: "+505", flag: "🇳🇮" },
  { name: "Niger", code: "NE", dial: "+227", flag: "🇳🇪" },
  { name: "Nigeria", code: "NG", dial: "+234", flag: "🇳🇬" },
  { name: "North Macedonia", code: "MK", dial: "+389", flag: "🇲🇰" },
  { name: "Norway", code: "NO", dial: "+47", flag: "🇳🇴" },
  { name: "Oman", code: "OM", dial: "+968", flag: "🇴🇲" },
  { name: "Pakistan", code: "PK", dial: "+92", flag: "🇵🇰" },
  { name: "Panama", code: "PA", dial: "+507", flag: "🇵🇦" },
  { name: "Papua New Guinea", code: "PG", dial: "+675", flag: "🇵🇬" },
  { name: "Paraguay", code: "PY", dial: "+595", flag: "🇵🇾" },
  { name: "Peru", code: "PE", dial: "+51", flag: "🇵🇪" },
  { name: "Philippines", code: "PH", dial: "+63", flag: "🇵🇭" },
  { name: "Poland", code: "PL", dial: "+48", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", dial: "+351", flag: "🇵🇹" },
  { name: "Qatar", code: "QA", dial: "+974", flag: "🇶🇦" },
  { name: "Romania", code: "RO", dial: "+40", flag: "🇷🇴" },
  { name: "Russia", code: "RU", dial: "+7", flag: "🇷🇺" },
  { name: "Rwanda", code: "RW", dial: "+250", flag: "🇷🇼" },
  { name: "Saudi Arabia", code: "SA", dial: "+966", flag: "🇸🇦" },
  { name: "Senegal", code: "SN", dial: "+221", flag: "🇸🇳" },
  { name: "Serbia", code: "RS", dial: "+381", flag: "🇷🇸" },
  { name: "Singapore", code: "SG", dial: "+65", flag: "🇸🇬" },
  { name: "Slovakia", code: "SK", dial: "+421", flag: "🇸🇰" },
  { name: "Slovenia", code: "SI", dial: "+386", flag: "🇸🇮" },
  { name: "Somalia", code: "SO", dial: "+252", flag: "🇸🇴" },
  { name: "South Africa", code: "ZA", dial: "+27", flag: "🇿🇦" },
  { name: "South Korea", code: "KR", dial: "+82", flag: "🇰🇷" },
  { name: "Spain", code: "ES", dial: "+34", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "LK", dial: "+94", flag: "🇱🇰" },
  { name: "Sudan", code: "SD", dial: "+249", flag: "🇸🇩" },
  { name: "Sweden", code: "SE", dial: "+46", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", dial: "+41", flag: "🇨🇭" },
  { name: "Syria", code: "SY", dial: "+963", flag: "🇸🇾" },
  { name: "Taiwan", code: "TW", dial: "+886", flag: "🇹🇼" },
  { name: "Tajikistan", code: "TJ", dial: "+992", flag: "🇹🇯" },
  { name: "Tanzania", code: "TZ", dial: "+255", flag: "🇹🇿" },
  { name: "Thailand", code: "TH", dial: "+66", flag: "🇹🇭" },
  { name: "Togo", code: "TG", dial: "+228", flag: "🇹🇬" },
  { name: "Tunisia", code: "TN", dial: "+216", flag: "🇹🇳" },
  { name: "Turkey", code: "TR", dial: "+90", flag: "🇹🇷" },
  { name: "Turkmenistan", code: "TM", dial: "+993", flag: "🇹🇲" },
  { name: "Uganda", code: "UG", dial: "+256", flag: "🇺🇬" },
  { name: "Ukraine", code: "UA", dial: "+380", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "AE", dial: "+971", flag: "🇦🇪" },
  { name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧" },
  { name: "United States", code: "US", dial: "+1", flag: "🇺🇸" },
  { name: "Uruguay", code: "UY", dial: "+598", flag: "🇺🇾" },
  { name: "Uzbekistan", code: "UZ", dial: "+998", flag: "🇺🇿" },
  { name: "Venezuela", code: "VE", dial: "+58", flag: "🇻🇪" },
  { name: "Vietnam", code: "VN", dial: "+84", flag: "🇻🇳" },
  { name: "Yemen", code: "YE", dial: "+967", flag: "🇾🇪" },
  { name: "Zambia", code: "ZM", dial: "+260", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", dial: "+263", flag: "🇿🇼" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    attachment: null,
  });

  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find((c) => c.code === "AE")
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [ctaData, setCtaData] = useState(null);
  const [ctaLoading, setCtaLoading] = useState(true);
  const [ctaError, setCtaError] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchContactCta = async () => {
      setCtaLoading(true);
      setCtaError(false);

      try {
        const response = await getContactCta();
        if (isMounted) {
          setCtaData(response || null);
        }
      } catch (err) {
        if (isMounted) {
          setCtaError(true);
          setCtaData(null);
        }
      } finally {
        if (isMounted) {
          setCtaLoading(false);
        }
      }
    };

    fetchContactCta();

    return () => {
      isMounted = false;
    };
  }, []);

  const contactCta = ctaData?.data || ctaData;
  const ctaActive = contactCta?.isActive !== false;
  const badgeText = contactCta?.badgeText || "Ready to get started?";
  const headingLine1 = contactCta?.headingLine1 || "Let's Build";
  const highlightText = contactCta?.highlightText || "Success";
  const headingLine2 = contactCta?.headingLine2 || "Together";
  const description =
    contactCta?.description ||
    "Whether you're hiring exceptional talent or searching for your next opportunity, we are here to help every step of the way.";
  const feature1 = contactCta?.feature1 || "Dedicated consultant assigned to you";
  const feature2 = contactCta?.feature2 || "Response within 24 hours";
  const button1Text = contactCta?.button1Text || "Hire Talent";
  const button2Text = contactCta?.button2Text || "Explore Opportunities";

  if (!ctaLoading && !ctaError && contactCta && !ctaActive) {
    return null;
  }

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachment: e.target.files?.[0] || null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: keep your existing API integration / submit logic here.
    console.log("Form submitted:", {
      ...formData,
      countryCode: selectedCountry.dial,
    });
  };

  return (
    <section className="relative w-full bg-[#0b3a91] py-16 px-4 sm:px-6 lg:px-12 overflow-hidden mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="text-white">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {ctaLoading ? "Loading CTA..." : badgeText}
          </span>

          <h2 className="text-4xl sm:text-5xl font-serif font-bold leading-tight mb-6">
            {headingLine1}{" "}
            <span className="text-amber-400">{highlightText}</span>
            <br />
            {headingLine2}
          </h2>

          <p className="text-white/80 text-base sm:text-lg max-w-md mb-8">
            {description}
          </p>

          <div className="space-y-3 mb-10">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full border border-emerald-400">
                <Check className="w-3 h-3 text-emerald-400" strokeWidth={3} />
              </span>
              <span className="text-white/90">{feature1}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full border border-emerald-400">
                <Check className="w-3 h-3 text-emerald-400" strokeWidth={3} />
              </span>
              <span className="text-white/90">{feature2}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 transition-colors text-[#0b3a91] font-semibold px-6 py-3 rounded-full"
            >
              {button1Text}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-transparent border border-white/40 hover:border-white transition-colors text-white font-semibold px-6 py-3 rounded-full"
            >
              {button2Text}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - FORM CARD (scrollable) */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-auto lg:mx-0 lg:ml-auto h-[560px] flex flex-col">
          {/* Header (fixed, not part of scroll area) */}
          <div className="flex items-start justify-between mb-3 shrink-0">
            <div className="flex-1 pr-3">
              <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "20px", lineHeight: "1.2", color: "#004CA5", margin: 0 }}>
                Get in Touch with Our Employee Team
              </h3>
            </div>
            <div className="shrink-0">
              <img src={groupIcon} alt="" style={{ width: "80px", height: "60px", opacity: 1 }} />
            </div>
          </div>

          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: "1.5", color: "#6F6C8F", margin: 0, marginBottom: "16px" }}>
            Have questions about job opportunities, applications, or workplace
            support? Fill out the form below and our team will get back to you
            shortly.
          </p>

          {/* Scrollable form body */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto pr-2 space-y-4 contact-scroll"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-[#0b3a91] mb-1.5"
              >
                Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full rounded-full border border-gray-200 pl-11 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b3a91]/30 focus:border-[#0b3a91]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#0b3a91] mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-gray-200 pl-11 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b3a91]/30 focus:border-[#0b3a91]"
                />
              </div>
            </div>

            {/* Contact Number with full country code dropdown */}
            <div ref={dropdownRef} className="relative">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-semibold text-[#0b3a91] mb-1.5"
              >
                Contact Number
              </label>
              <div className="flex items-center rounded-full border border-gray-200 pl-2 pr-4 py-1.5 focus-within:ring-2 focus-within:ring-[#0b3a91]/30 focus-within:border-[#0b3a91]">
                <Phone className="w-4 h-4 text-gray-400 ml-2 mr-2 shrink-0" />

                <button
                  type="button"
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-1 pr-3 border-r border-gray-200 shrink-0"
                >
                  <span className="text-base leading-none">{selectedCountry.flag}</span>
                  <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                    {selectedCountry.dial}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="(000) 000-0000"
                  className="w-full bg-transparent pl-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                />
              </div>

              {/* Country dropdown panel */}
              {dropdownOpen && (
                <div className="absolute z-20 mt-2 w-72 max-w-[90vw] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-2 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        autoFocus
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search country or code"
                        className="w-full rounded-full border border-gray-200 pl-8 pr-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b3a91]/30"
                      />
                    </div>
                  </div>
                  <ul className="max-h-56 overflow-y-auto contact-scroll">
                    {filteredCountries.length === 0 && (
                      <li className="px-4 py-3 text-sm text-gray-400">No matches found</li>
                    )}
                    {filteredCountries.map((c) => (
                      <li key={c.code}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCountry(c);
                            setDropdownOpen(false);
                            setSearch("");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-base leading-none">{c.flag}</span>
                          <span className="text-sm text-gray-700 flex-1 truncate">{c.name}</span>
                          <span className="text-sm text-gray-400">{c.dial}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Attachment */}
            <div>
              <label
                htmlFor="attachment"
                className="block text-sm font-semibold text-[#0b3a91] mb-1.5"
              >
                Attachment
              </label>
              <label
                htmlFor="attachment"
                className="flex items-center gap-3 w-full rounded-full border border-gray-200 px-4 py-3 text-sm text-gray-400 cursor-pointer hover:border-gray-300 transition-colors"
              >
                <Paperclip className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="truncate">
                  {formData.attachment ? formData.attachment.name : "Upload your resume / CV"}
                </span>
                <input
                  id="attachment"
                  name="attachment"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-[#0b3a91] to-[#1d56c9] hover:from-[#0a3380] hover:to-[#1a4cb3] transition-colors text-white font-semibold py-3.5 rounded-full shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Slim, visible scrollbar to match the screenshot's scroll affordance */}
      <style>{`
        .contact-scroll {
          scrollbar-width: thin;
          scrollbar-color: #c7d2e8 transparent;
        }
        .contact-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .contact-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .contact-scroll::-webkit-scrollbar-thumb {
          background-color: #c7d2e8;
          border-radius: 9999px;
        }
        .contact-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #a9b9e0;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
