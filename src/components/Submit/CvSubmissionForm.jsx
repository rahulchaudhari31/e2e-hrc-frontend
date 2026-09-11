import { useRef, useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, FolderOpen, TrendingUp, GraduationCap, Paperclip, Loader2, Send, X } from "lucide-react";
import { toast } from "react-toastify";
import { submitCv } from "../../services/submissionService";
import { inputClass, textareaClass, labelClass, FieldError } from "./formControls";
import SubmissionSuccess from "./SubmissionSuccess";

const EXPERIENCE_LEVELS = [
  "Entry Level (0-1 yrs)",
  "Junior (1-3 yrs)",
  "Mid-Level (3-5 yrs)",
  "Senior (5-8 yrs)",
  "Lead / Manager (8+ yrs)",
];

const EDUCATION_LEVELS = [
  "High School",
  "Diploma / Certificate",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD / Doctorate",
  "Other",
];

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  professionalTitle: "",
  skills: "",
  experienceLevel: "",
  education: "",
  coverMessage: "",
  resume: null,
};

export default function CvSubmissionForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error("Only PDF, DOC and DOCX files are allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 5MB.");
      return;
    }
    setForm((prev) => ({ ...prev, resume: file }));
    setErrors((prev) => (prev.resume ? { ...prev, resume: "" } : prev));
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_REGEX.test(form.email.trim()))
      next.email = "Please provide a valid email address.";
    if (!form.phone.trim()) next.phone = "Please enter your phone number.";
    if (!form.location.trim()) next.location = "Please enter your location.";
    if (!form.professionalTitle.trim())
      next.professionalTitle = "Please enter your professional title.";
    if (!form.experienceLevel) next.experienceLevel = "Please select experience level.";
    if (!form.education) next.education = "Please select your highest education.";
    if (!form.resume) next.resume = "Please attach your resume / CV.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const result = await submitCv(form);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <SubmissionSuccess
        title="CV Submitted!"
        message="Thank you. Our talent team has received your CV and will be in touch if there is a suitable match."
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="w-full rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-orange-500">
          <User size={20} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-[#004CA5]">
            Submit Your CV
          </h3>
          <p className="text-xs text-gray-500">
            Upload your resume below and our team will review it.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cv-fullName" className={labelClass}>
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="cv-fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className={`${inputClass(!!errors.fullName)} pl-11`}
              />
            </div>
            <FieldError message={errors.fullName} />
          </div>

          <div>
            <label htmlFor="cv-email" className={labelClass}>
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="cv-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                className={`${inputClass(!!errors.email)} pl-11`}
              />
            </div>
            <FieldError message={errors.email} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cv-phone" className={labelClass}>
              Phone Number
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="cv-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+44 7XXX XXXXXX"
                className={`${inputClass(!!errors.phone)} pl-11`}
              />
            </div>
            <FieldError message={errors.phone} />
          </div>

          <div>
            <label htmlFor="cv-location" className={labelClass}>
              Current Location
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="cv-location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="City, Country"
                className={`${inputClass(!!errors.location)} pl-11`}
              />
            </div>
            <FieldError message={errors.location} />
          </div>
        </div>

        <div>
          <label htmlFor="cv-professionalTitle" className={labelClass}>
            Professional Title
          </label>
          <div className="relative">
            <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              id="cv-professionalTitle"
              name="professionalTitle"
              type="text"
              value={form.professionalTitle}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
              className={`${inputClass(!!errors.professionalTitle)} pl-11`}
            />
          </div>
          <FieldError message={errors.professionalTitle} />
        </div>

        <div>
          <label htmlFor="cv-skills" className={labelClass}>
            Key Skills
          </label>
          <div className="relative">
            <FolderOpen size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              id="cv-skills"
              name="skills"
              type="text"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. JavaScript, Python, Project Management"
              className={`${inputClass(false)} pl-11`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cv-experienceLevel" className={labelClass}>
              Experience Level
            </label>
            <div className="relative">
              <TrendingUp size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <select
                id="cv-experienceLevel"
                name="experienceLevel"
                value={form.experienceLevel}
                onChange={handleChange}
                className={`${inputClass(!!errors.experienceLevel)} pl-11 ${form.experienceLevel ? "" : "text-gray-400"}`}
              >
                <option value="" disabled>
                  Select level
                </option>
                {EXPERIENCE_LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <FieldError message={errors.experienceLevel} />
          </div>

          <div>
            <label htmlFor="cv-education" className={labelClass}>
              Highest Education
            </label>
            <div className="relative">
              <GraduationCap size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <select
                id="cv-education"
                name="education"
                value={form.education}
                onChange={handleChange}
                className={`${inputClass(!!errors.education)} pl-11 ${form.education ? "" : "text-gray-400"}`}
              >
                <option value="" disabled>
                  Select education
                </option>
                {EDUCATION_LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <FieldError message={errors.education} />
          </div>
        </div>

        <div>
          <label htmlFor="cv-coverMessage" className={labelClass}>
            Cover Message
          </label>
          <textarea
            id="cv-coverMessage"
            name="coverMessage"
            rows={3}
            value={form.coverMessage}
            onChange={handleChange}
            placeholder="Tell us briefly about yourself and what you're looking for..."
            className={textareaClass(false)}
          />
        </div>

        <div>
          <span className={labelClass}>Attach Resume / CV</span>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`relative rounded-2xl border-2 border-dashed px-4 py-5 text-center transition-colors ${
              errors.resume
                ? "border-red-300 bg-red-50/50"
                : "border-gray-200 bg-gray-50/50 hover:border-[#0b3a91]/40"
            }`}
          >
            <input
              ref={fileInputRef}
              id="cv-resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="sr-only"
            />
            {form.resume ? (
              <div className="flex items-center justify-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Paperclip size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block truncate text-sm font-semibold text-gray-700">
                    {form.resume.name}
                  </span>
                  <span className="block text-xs text-gray-400">
                    {(form.resume.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setForm((prev) => ({ ...prev, resume: null }));
                    setErrors((prev) => ({ ...prev, resume: "" }));
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove resume"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center gap-1"
              >
                <Paperclip size={20} className="text-gray-400" aria-hidden="true" />
                <span className="text-sm font-medium text-[#0b3a91]">
                  Click to upload or drag &amp; drop
                </span>
                <span className="text-xs text-gray-400">
                  PDF, DOC, DOCX — max 5MB
                </span>
              </button>
            )}
          </div>
          <FieldError message={errors.resume} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0b3a91] to-[#1d56c9] px-6 py-3.5 font-semibold text-white shadow-md transition-colors hover:from-[#0a3380] hover:to-[#1a4cb3] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={18} aria-hidden="true" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={18} aria-hidden="true" />
              Submit CV
            </>
          )}
        </button>
      </form>
    </div>
  );
}