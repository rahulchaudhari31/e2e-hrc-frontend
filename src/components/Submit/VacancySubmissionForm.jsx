import { useState } from "react";
import { Briefcase, Building2, MapPin, Loader2, Send, FolderOpen, Tag, CalendarDays, Clock, User, Mail, TrendingUp } from "lucide-react";
import { toast } from "react-toastify";
import { submitVacancy } from "../../services/submissionService";
import { inputClass, textareaClass, labelClass, FieldError } from "./formControls";
import SubmissionSuccess from "./SubmissionSuccess";

const CATEGORIES = [
  "IT / Software",
  "Finance / Accounting",
  "Healthcare",
  "Engineering",
  "Sales & Marketing",
  "Human Resources",
  "Operations / Logistics",
  "Customer Service",
  "Education",
  "Other",
];

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"];

const EXPERIENCE_LEVELS = [
  "Entry Level (0-1 yrs)",
  "Junior (1-3 yrs)",
  "Mid-Level (3-5 yrs)",
  "Senior (5-8 yrs)",
  "Lead / Manager (8+ yrs)",
];

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const initialForm = {
  contactName: "",
  email: "",
  company: "",
  jobTitle: "",
  category: "",
  location: "",
  employmentType: "",
  salaryRange: "",
  experienceLevel: "",
  description: "",
  skills: "",
  deadline: "",
};

export default function VacancySubmissionForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const validate = () => {
    const next = {};
    if (!form.contactName.trim()) next.contactName = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_REGEX.test(form.email.trim()))
      next.email = "Please provide a valid email address.";
    if (!form.company.trim()) next.company = "Please enter your company name.";
    if (!form.jobTitle.trim()) next.jobTitle = "Please enter the job title.";
    if (!form.category) next.category = "Please select a category.";
    if (!form.location.trim()) next.location = "Please enter the location.";
    if (!form.employmentType) next.employmentType = "Please select employment type.";
    if (!form.experienceLevel) next.experienceLevel = "Please select experience level.";
    if (!form.description.trim())
      next.description = "Please provide a job description.";
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
      const result = await submitVacancy(form);
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
        title="Vacancy Submitted!"
        message="Thank you. Our recruitment team has received your vacancy and will get back to you within 24 hours."
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="w-full rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-orange-500">
          <Briefcase size={20} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-[#004CA5]">
            Submit a Vacancy
          </h3>
          <p className="text-xs text-gray-500">
            Fill in the details below — our team responds within 24 hours.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vacancy-contactName" className={labelClass}>
              Contact Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="vacancy-contactName"
                name="contactName"
                type="text"
                value={form.contactName}
                onChange={handleChange}
                placeholder="Your full name"
                className={`${inputClass(!!errors.contactName)} pl-11`}
              />
            </div>
            <FieldError message={errors.contactName} />
          </div>

          <div>
            <label htmlFor="vacancy-email" className={labelClass}>
              Contact Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="vacancy-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={`${inputClass(!!errors.email)} pl-11`}
              />
            </div>
            <FieldError message={errors.email} />
          </div>
        </div>

        <div>
          <label htmlFor="vacancy-company" className={labelClass}>
            Company
          </label>
          <div className="relative">
            <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              id="vacancy-company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              placeholder="Company name"
              className={`${inputClass(!!errors.company)} pl-11`}
            />
          </div>
          <FieldError message={errors.company} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vacancy-jobTitle" className={labelClass}>
              Job Title
            </label>
            <input
              id="vacancy-jobTitle"
              name="jobTitle"
              type="text"
              value={form.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Senior React Developer"
              className={inputClass(!!errors.jobTitle)}
            />
            <FieldError message={errors.jobTitle} />
          </div>

          <div>
            <label htmlFor="vacancy-category" className={labelClass}>
              Category
            </label>
            <select
              id="vacancy-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`${inputClass(!!errors.category)} ${form.category ? "" : "text-gray-400"}`}
            >
              <option value="" disabled>
                Select category
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <FieldError message={errors.category} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vacancy-location" className={labelClass}>
              Location
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="vacancy-location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="City, Country / Remote"
                className={`${inputClass(!!errors.location)} pl-11`}
              />
            </div>
            <FieldError message={errors.location} />
          </div>

          <div>
            <label htmlFor="vacancy-employmentType" className={labelClass}>
              Employment Type
            </label>
            <div className="relative">
              <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <select
                id="vacancy-employmentType"
                name="employmentType"
                value={form.employmentType}
                onChange={handleChange}
                className={`${inputClass(!!errors.employmentType)} pl-11 ${form.employmentType ? "" : "text-gray-400"}`}
              >
                <option value="" disabled>
                  Select type
                </option>
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <FieldError message={errors.employmentType} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vacancy-salaryRange" className={labelClass}>
              Salary Range
            </label>
            <div className="relative">
              <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="vacancy-salaryRange"
                name="salaryRange"
                type="text"
                value={form.salaryRange}
                onChange={handleChange}
                placeholder="e.g. £35k - £45k"
                className={`${inputClass(false)} pl-11`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="vacancy-experienceLevel" className={labelClass}>
              Experience Level
            </label>
            <div className="relative">
              <TrendingUp size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <select
                id="vacancy-experienceLevel"
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
        </div>

        <div>
          <label htmlFor="vacancy-description" className={labelClass}>
            Job Description
          </label>
          <textarea
            id="vacancy-description"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the role, responsibilities and requirements..."
            className={textareaClass(!!errors.description)}
          />
          <FieldError message={errors.description} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vacancy-skills" className={labelClass}>
              Key Skills
            </label>
            <div className="relative">
              <FolderOpen size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="vacancy-skills"
                name="skills"
                type="text"
                value={form.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, AWS"
                className={`${inputClass(false)} pl-11`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="vacancy-deadline" className={labelClass}>
              Application Deadline
            </label>
            <div className="relative">
              <CalendarDays size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="vacancy-deadline"
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                className={`${inputClass(false)} pl-11`}
              />
            </div>
          </div>
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
              Submit Vacancy
            </>
          )}
        </button>
      </form>
    </div>
  );
}