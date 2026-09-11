import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import teamPhoto from '../../assets/images/background coonecting reqrirment/background connectivity.jpeg';
import nameIcon from '../../assets/images/background coonecting reqrirment/NAME.png';
import mailIcon from '../../assets/images/background coonecting reqrirment/MAIL ICON.png';
import { getRecruitmentPartnersSection } from '../../services/becomePartnerService';

export default function PartnerFormSection() {
  const [sectionData, setSectionData] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', countryCode: '+971', contactNumber: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let mounted = true;
    getRecruitmentPartnersSection().then((data) => {
      if (mounted && data) setSectionData(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const title1 = sectionData?.title || 'Connecting';
  const title2 = sectionData?.highlightText || 'Recruitment Partners';
  const title3 = sectionData?.subtitle || 'Worldwide';
  const bgImage = sectionData?.backgroundImage || teamPhoto;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const err = {};
    if (!formData.name.trim()) err.name = 'Required';
    if (!formData.email.trim()) err.email = 'Required';
    if (!formData.contactNumber.trim()) err.contactNumber = 'Required';
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await axios.post('/api/partnership-enquiries', {
        name: formData.name,
        email: formData.email,
        countryCode: formData.countryCode,
        contactNumber: formData.contactNumber,
        message: formData.message,
      });
      setSubmitted(true);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-[#F6F3F2] pb-[180px] lg:pb-[220px]">
      <div className="max-w-[1440px] mx-auto px-6 xl:px-16">
        <div className="relative pt-4 lg:pt-16">
          <div
            className="relative w-full min-h-[340px] lg:h-[463px]"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className="px-4 md:px-16"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: -127,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                zIndex: 2,
              }}
            >
              <div
                className="w-full max-w-[576px]"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 24,
                  position: 'relative',
                }}
              >
                <h1
                  className="hidden lg:block"
                  style={{
                    position: 'absolute',
                    width: 647,
                    height: 212,
                    left: -20.17,
                    top: -96.11,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 60,
                    lineHeight: '70.4px',
                    letterSpacing: '-1.28px',
                    color: '#FFFFFF',
                    margin: 0,
                  }}
                >
                  <span style={{ display: 'block' }}>{title1}</span>
                  <span style={{ display: 'block' }}>{title2}</span>
                  <span style={{ display: 'block', color: '#F39308' }}>{title3}</span>
                </h1>
                <h1
                  className="lg:hidden text-white"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: '28px',
                    lineHeight: '34px',
                    letterSpacing: '-0.56px',
                    margin: 0,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                  }}
                >
                  {title1}<br />{title2}<br /><span style={{ color: '#F39308' }}>{title3}</span>
                </h1>
              </div>
            </div>
          </div>

          <div
            className="relative z-10 w-full mt-8 lg:mt-0 lg:absolute lg:left-[64%] lg:top-[124px] mx-auto"
            style={{
              maxWidth: '434px',
              width: 'calc(100% - 32px)',
            }}
          >
            <div
              className="bg-white p-6 md:p-8"
              style={{ borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', minHeight: '572px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '28px',
                    color: '#004CA5',
                    margin: 0,
                  }}
                >
                  Get in Touch with Our Partnership Team
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px',
                    lineHeight: '20px',
                    color: '#424752',
                    margin: 0,
                  }}
                >
                  Have questions about partnership opportunities or our global network? Fill out the form below and our team will get back to you shortly.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-semibold text-[#004CA5] text-base">Thank you!</p>
                  <p className="text-[#424752] text-sm">We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '19px', marginTop: '24px' }}>
                  <div>
                    <label
                      className="block"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: '20px', color: '#004CA5', fontWeight: 400, marginBottom: '8px' }}
                    >
                      Name
                    </label>
                    <div className="relative">
                      <img
                        src={nameIcon}
                        alt=""
                        className="absolute"
                        style={{ left: '16px', top: '30%', width: '13.33px', height: '13.33px', zIndex: 1 }}
                      />
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white"
                        style={{ height: '44px', padding: '13px 16px 13px 48px', border: '1px solid #F1F2F9', borderRadius: '12px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: '19px' }}
                      />
                    </div>
                    {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label
                      className="block"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: '20px', color: '#004CA5', fontWeight: 400, marginBottom: '8px' }}
                    >
                      Email
                    </label>
                    <div className="relative">
                      <img
                        src={mailIcon}
                        alt=""
                        className="absolute"
                        style={{ left: '16px', top: '30%', width: '16.67px', height: '13.33px', zIndex: 1 }}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white"
                        style={{ height: '44px', padding: '13px 16px 13px 48px', border: '1px solid #F1F2F9', borderRadius: '16px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: '19px' }}
                      />
                    </div>
                    {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label
                      className="block"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: '20px', color: '#004CA5', fontWeight: 400, marginBottom: '8px' }}
                    >
                      Contact Number
                    </label>
                    <div className="flex flex-col sm:flex-row" style={{ gap: '7.99px' }}>
                      <div className="relative w-full sm:w-[165px]">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="bg-white"
                          style={{ width: '100%', height: '44px', padding: '12px', border: '1px solid #F1F2F9', borderRadius: '16px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: '24px', color: '#1B1C1C' }}
                        >
                          <option value="+971">UAE +971</option>
                          <option value="+44">UK +44</option>
                          <option value="+1">US +1</option>
                          <option value="+91">IN +91</option>
                        </select>
                      </div>
                      <div className="relative" style={{ flex: 1 }}>
                        <input
                          type="tel"
                          name="contactNumber"
                          placeholder="(000) 000-0000"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className="w-full bg-white"
                          style={{ height: '44px', padding: '13px 16px', border: '1px solid #F1F2F9', borderRadius: '16px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Source Sans 3', sans-serif", fontSize: '16px', lineHeight: '16px' }}
                        />
                      </div>
                    </div>
                    {errors.contactNumber && <span className="text-red-500 text-xs mt-1 block">{errors.contactNumber}</span>}
                  </div>

                  <div>
                    <label
                      className="block"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: '20px', color: '#004CA5', fontWeight: 400, marginBottom: '8px', textTransform: 'uppercase' }}
                    >
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows={2}
                      placeholder="How can we help your business grow?"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-white resize-none"
                      style={{ height: '44px', padding: '13px 16px', border: '1px solid #F1F2F9', borderRadius: '16px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: '16px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full text-white"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '24px',
                      background: '#004CA5',
                      height: '44px',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
                      opacity: submitting ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => { if (!submitting) e.target.style.background = '#003b82'; }}
                    onMouseLeave={(e) => { e.target.style.background = '#004CA5'; }}
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}