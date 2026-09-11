import { useState, useEffect } from 'react';
import { FiMapPin, FiClock, FiGlobe } from 'react-icons/fi';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

import dropIcon from '../../assets/images/about us images/drop icon.png';
import { getHeadOffice, getContactCard } from '../../services/contactUsService';

const ALLOWED_DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export default function ContactFormSection() {
  const [headOffice, setHeadOffice] = useState(null);
  const [contactCard, setContactCard] = useState(null);

  useEffect(() => {
    let mounted = true;

    Promise.all([getHeadOffice(), getContactCard()]).then(
      ([ho, cc]) => {
        if (!mounted) return;
        if (ho) setHeadOffice(ho);
        if (cc) setContactCard(cc);
      }
    );

    return () => {
      mounted = false;
    };
  }, []);

  const headOfficeTitle = headOffice?.title || 'Head Office Birmingham';
  const headOfficeAddress = headOffice
    ? [headOffice.address_line, headOffice.city, headOffice.state, headOffice.postal_code, headOffice.country]
        .filter(Boolean)
        .join(', ')
    : '1204B Stratford Road, Hall Green, Birmingham, West Midlands, B28 8AS';
  const openingHoursTitle = headOffice?.opening_hours_title || 'Opening Hours';
  const openingHoursLines =
    headOffice?.opening_hours ||
    'Monday \u2013 Friday: 09:00 \u2013 18:00\nSaturday \u2013 Sunday: Closed';
  const globalInquiriesTitle = headOffice?.global_inquiries_title || 'Global Inquiries';
  const globalInquiriesDescription =
    headOffice?.global_inquiries_description ||
    'Available via virtual consultation in GMT, GST, and IST time zones.';

  const cardTitle = contactCard?.title || 'Ready to Connect? Contact Us Today.';
  const phoneRow = {
    label: contactCard?.phone_title || 'Call Us',
    value: contactCard?.phone_number || '+44 121 778 2400',
  };
  const emailRow = {
    label: contactCard?.email_title || 'Email Us',
    value: contactCard?.email_address || 'info@e2ehrc.co.uk',
  };
  const officeRow = {
    label: contactCard?.office_title || 'Visit Office',
    value: contactCard?.office_address || 'Birmingham, B28 8AS',
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    role: '',
    subject: '',
    message: '',
    attachment: null,
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const selected = e.target.files?.[0] || null;
    if (!selected) return;
    const isImage = selected.type.startsWith('image/');
    if (!isImage && !ALLOWED_DOC_TYPES.includes(selected.type)) {
      toast.error('Only images and documents (PDF, DOC, DOCX) are allowed.');
      e.target.value = '';
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB.');
      e.target.value = '';
      return;
    }
    setFormData((prev) => ({ ...prev, attachment: selected }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('First name and last name are required.');
      return;
    }
    if (!formData.company.trim()) {
      toast.error('Company is required.');
      return;
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      toast.error('Please provide a valid email address.');
      return;
    }
    if (!formData.subject.trim()) {
      toast.error('Subject is required.');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Message is required.');
      return;
    }

    const iamMap = {
      '': 'employer',
      employer: 'employer',
      employee: 'job_seeker',
      partner: 'recruitment_partner',
      other: 'other',
    };

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('firstName', formData.firstName.trim());
      payload.append('lastName', formData.lastName.trim());
      payload.append('company', formData.company.trim());
      payload.append('email', formData.email.trim());
      payload.append('iam', iamMap[formData.role] || 'other');
      payload.append('subject', formData.subject.trim());
      payload.append('message', formData.message.trim());
      if (formData.attachment) {
        payload.append('attachment', formData.attachment);
      }

      await axios.post('/api/contact/enquiries', payload);

      toast.success(
        'Your enquiry has been submitted. Our team will get back to you shortly.'
      );
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        role: '',
        subject: '',
        message: '',
        attachment: null,
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-[#F6F3F2] contact-section" style={{ padding: '64px 0' }}>
      <div
        className="mx-auto flex flex-col lg:flex-row contact-container"
        style={{ maxWidth: '1312px', gap: '77px', padding: '0 16px' }}
      >
        {/* LEFT COLUMN: FORM CARD */}
        <div
          className="w-full bg-white form-card"
          style={{
            maxWidth: '772px',
            flex: 1,
            borderRadius: '24px',
            padding: '48px',
            boxShadow: '0px 8px 24px rgba(0,0,0,0.04)',
          }}
        >
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: '30px',
              lineHeight: '40px',
              letterSpacing: '-0.32px',
              color: '#1B1C1C',
              margin: 0,
            }}
          >
            Send Us A Message
          </h2>

          <form onSubmit={handleSubmit} style={{ marginTop: '32px' }}>
            {/* Row 1: First Name / Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6" style={{ gap: '24px 24px' }}>
              <div>
                <label
                  htmlFor="firstName"
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.96px',
                    textTransform: 'uppercase',
                    color: '#424752',
                    marginBottom: '11px',
                  }}
                >
                  FIRST NAME
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white placeholder-[#6B7280]"
                  style={{
                    padding: '13px 16px',
                    height: '44px',
                    border: '1px solid #F1F2F9',
                    borderRadius: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '23px',
                    color: '#1B1C1C',
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.96px',
                    textTransform: 'uppercase',
                    color: '#424752',
                    marginBottom: '11px',
                  }}
                >
                  LAST NAME
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white placeholder-[#6B7280]"
                  style={{
                    padding: '13px 16px',
                    height: '44px',
                    border: '1px solid #F1F2F9',
                    borderRadius: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '23px',
                    color: '#1B1C1C',
                  }}
                />
              </div>
            </div>

            {/* Row 2: Company / Email */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px', marginTop: '36px' }}>
              <div>
                <label
                  htmlFor="company"
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.96px',
                    textTransform: 'uppercase',
                    color: '#424752',
                    marginBottom: '11px',
                  }}
                >
                  COMPANY
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white placeholder-[#6B7280]"
                  style={{
                    padding: '13px 16px',
                    height: '44px',
                    border: '1px solid #F1F2F9',
                    borderRadius: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '23px',
                    color: '#1B1C1C',
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.96px',
                    textTransform: 'uppercase',
                    color: '#424752',
                    marginBottom: '11px',
                  }}
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white placeholder-[#6B7280]"
                  style={{
                    padding: '13px 16px',
                    height: '44px',
                    border: '1px solid #F1F2F9',
                    borderRadius: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '23px',
                    color: '#1B1C1C',
                  }}
                />
              </div>
            </div>

            {/* Row 3: I am a... / Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px', marginTop: '36px' }}>
              <div>
                <label
                  htmlFor="role"
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.96px',
                    textTransform: 'uppercase',
                    color: '#424752',
                    marginBottom: '11px',
                  }}
                >
                  I AM A...
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-white"
                  style={{
                    padding: '10px 16px',
                    border: '1px solid #F1F2F9',
                    borderRadius: '16px',
                    outline: 'none',
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#1B1C1C',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="employer">Employer Looking for Talent</option>
                  <option value="employee">Job Seeker / Candidate</option>
                  <option value="partner">Recruitment Partner</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.96px',
                    textTransform: 'uppercase',
                    color: '#424752',
                    marginBottom: '11px',
                  }}
                >
                  SUBJECT
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Executive Search Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white placeholder-[#6B7280]"
                  style={{
                    padding: '13px 16px',
                    height: '44px',
                    border: '1px solid #F1F2F9',
                    borderRadius: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '23px',
                    color: '#1B1C1C',
                  }}
                />
              </div>
            </div>

            {/* Row 4: Your Message */}
            <div style={{ marginTop: '36px' }}>
              <label
                htmlFor="message"
                style={{
                  display: 'block',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '12px',
                  lineHeight: '16px',
                  letterSpacing: '0.96px',
                  textTransform: 'uppercase',
                  color: '#424752',
                  marginBottom: '11px',
                }}
              >
                YOUR MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="How can we help your business grow?"
                value={formData.message}
                onChange={handleChange}
                  className="w-full bg-white resize-none placeholder-[#6B7280]"
                style={{
                  padding: '16px 16px 88px',
                  height: '128px',
                  border: '1px solid #F1F2F9',
                  borderRadius: '16px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#1B1C1C',
                  overflow: 'hidden',
                }}
              />
            </div>

            {/* Row 5: Attach Resume / Brief */}
            <div style={{ marginTop: '36px' }}>
              <label
                htmlFor="attachment"
                style={{
                  display: 'block',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '12px',
                  lineHeight: '16px',
                  letterSpacing: '0.96px',
                  textTransform: 'uppercase',
                  color: '#424752',
                  marginBottom: '11px',
                }}
              >
                ATTACH RESUME / BRIEF (OPTIONAL)
              </label>
              <label
                htmlFor="attachment"
                className="flex flex-col items-center justify-center w-full cursor-pointer attach-dropzone"
                style={{
                  border: '2px dashed #F1F2F9',
                  borderRadius: '16px',
                  height: '123px',
                  padding: '32px',
                  gap: '15px',
                  boxSizing: 'border-box',
                }}
              >
                <img src={dropIcon} alt="" width={22} height={16} />
                <p
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#424752',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {formData.attachment
                    ? formData.attachment.name
                    : 'Click to upload or drag and drop'}
                </p>
                <input
                  id="attachment"
                  name="attachment"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Row 6: Submit Button */}
            <div style={{ marginTop: '32px' }}>
              <button
                type="submit"
                disabled={submitting}
                className="w-full text-white border-none cursor-pointer"
                style={{
                  background: '#004CA5',
                  borderRadius: '16px',
                  height: '44px',
                  padding: '16px 0',
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '28px',
                  boxShadow: '0px 8px 24px rgba(0,0,0,0.04)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: submitting ? 0.7 : 1,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => { if (!submitting) e.target.style.background = '#003b82'; }}
                onMouseLeave={(e) => { e.target.style.background = '#004CA5'; }}
              >
                {submitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: INFO SIDE */}
        <div className="w-full lg:w-[464px] shrink-0 flex flex-col info-side" style={{ gap: '32px' }}>
          {/* Head Office Birmingham Card */}
          <div
            className="w-full bg-white info-card"
            style={{
              borderRadius: '24px',
              padding: '40px',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0px 8px 24px rgba(0,0,0,0.04)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '28px',
                color: '#004CA5',
                margin: 0,
              }}
            >
              {headOfficeTitle}
            </h3>

            <div className="flex flex-col" style={{ gap: '24px', marginTop: '24px' }}>
              <div className="flex gap-4 items-start">
                <FiMapPin size={16} color="#004CA5" className="shrink-0" style={{ marginTop: '2px' }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#1B1C1C',
                  }}
                >
                  {headOfficeAddress}
                </span>
              </div>

              <div className="flex gap-4 items-start">
                <FiClock size={20} color="#004CA5" className="shrink-0" />
                <div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#1B1C1C',
                    }}
                  >
                    {openingHoursTitle}
                  </span>
                  <br />
                  {openingHoursLines.split('\n').map((line, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: '#424752',
                      }}
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <FiGlobe size={20} color="#004CA5" className="shrink-0" />
                <div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#1B1C1C',
                    }}
                  >
                    {globalInquiriesTitle}
                  </span>
                  <br />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#424752',
                    }}
                  >
                    {globalInquiriesDescription}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ready to Connect Card */}
          <div
            className="w-full bg-white"
            style={{
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0px 8px 24px rgba(0,0,0,0.04)',
            }}
          >
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '28px',
                color: '#000000',
                margin: 0,
              }}
            >
              {cardTitle}
            </h3>

            <div className="flex flex-col" style={{ gap: '16px', marginTop: '32px' }}>
              <div
                className="bg-white connect-row"
                style={{
                  border: '1px solid rgba(228,226,225,0.5)',
                  borderRadius: '24px',
                  padding: '29px 32px',
                  boxShadow: '0px 8px 24px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(0,54,121,0.1)',
                  }}
                >
                  <FaPhoneAlt size={18} color="#004CA5" />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '15px',
                      lineHeight: '28px',
                      color: '#1B1C1C',
                      margin: 0,
                    }}
                  >
                    {phoneRow.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#424752',
                      margin: 0,
                    }}
                  >
                    {phoneRow.value}
                  </p>
                </div>
              </div>

              <div
                className="bg-white connect-row"
                style={{
                  border: '1px solid rgba(228,226,225,0.5)',
                  borderRadius: '24px',
                  padding: '29px 32px',
                  boxShadow: '0px 8px 24px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(0,54,121,0.1)',
                  }}
                >
                  <FaEnvelope size={18} color="#004CA5" />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '15px',
                      lineHeight: '28px',
                      color: '#1B1C1C',
                      margin: 0,
                    }}
                  >
                    {emailRow.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#424752',
                      margin: 0,
                    }}
                  >
                    {emailRow.value}
                  </p>
                </div>
              </div>

              <div
                className="bg-white connect-row"
                style={{
                  border: '1px solid rgba(228,226,225,0.5)',
                  borderRadius: '24px',
                  padding: '29px 32px',
                  boxShadow: '0px 8px 24px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(0,54,121,0.1)',
                  }}
                >
                  <FaMapMarkerAlt size={18} color="#004CA5" />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '15px',
                      lineHeight: '28px',
                      color: '#1B1C1C',
                      margin: 0,
                    }}
                  >
                    {officeRow.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#424752',
                      margin: 0,
                    }}
                  >
                    {officeRow.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
