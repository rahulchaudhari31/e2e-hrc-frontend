import { useState, useEffect } from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import mapImage from '../assets/images/map.png';
import footerLogo from '../assets/images/e2e-logo.png';
import { getFooterCompany } from '../services/footer/footerCompanyService';
import { getFooterContact } from '../services/footer/footerContactService';
import { getFooterNavigation } from '../services/footer/footerNavigationService';
import { getFooterOfficeLocation } from '../services/footer/footerOfficeLocationService';

const DEFAULT_NAV_LINKS = [
  { label: 'Home', url: '/' },
  { label: 'About Us', url: '/about' },
  { label: 'Our Services', url: '/workforce-solutions' },
  { label: 'Latest Jobs', url: '/submit-vacancy' },
  { label: 'Expert Blogs', url: '/blogs' },
];

const extractData = (result) => (result && result.data ? result.data : null);

export default function Footer() {
  const [data, setData] = useState({
    company: null,
    contact: null,
    navigation: null,
    office: null,
  });

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const [company, contact, navigation, office] = await Promise.all([
          getFooterCompany(),
          getFooterContact(),
          getFooterNavigation(),
          getFooterOfficeLocation(),
        ]);
        if (!isMounted) return;
        setData({
          company: extractData(company) || null,
          contact: extractData(contact) || null,
          navigation: extractData(navigation) || null,
          office: extractData(office) || null,
        });
      } catch (error) {
        console.error('Failed to load footer data:', error);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const { company, contact, navigation, office } = data;

  const footerLogoUrl = company?.logo || footerLogo;
  const companyDescription =
    company?.description ||
    'Connecting exceptional talent with exceptional businesses across the UK, Europe, South Asia, and the GCC since 2007.';
  const contactTitle = contact?.sectionTitle || 'UK HEAD OFFICE';
  const contactAddress =
    contact?.address ||
    'Unit 2, 1204B Stratford Road, Hall Green, Birmingham, B28 8HN, UK';
  const contactPhone = contact?.phone || '+44 (0) 121 778 2400';
  const contactEmail = contact?.email || 'info@e2ehrc.co.uk';
  const navigationTitle = navigation?.title || 'NAVIGATION';
  const menuItems =
    navigation?.menuItems && navigation.menuItems.length > 0
      ? navigation.menuItems
      : DEFAULT_NAV_LINKS;
  const officeTitle = office?.title || 'Our Office Locations';
  const officeImage = office?.image || mapImage;
  const phoneHref = `tel:${contactPhone.replace(/[^+\d]/g, '')}`;

  return (
    <>
      <style>{`
        .footer-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 96px 98px 48px;
          gap: 80px;
          width: 100%;
          background: #000000;
          color: #ffffff;
          box-sizing: border-box;
        }
        .footer-inner {
          position: relative;
          width: 1245px;
          max-width: 1280px;
          height: 259px;
        }
        .footer-col {
          position: absolute;
          top: 0;
        }
        .footer-col.brand {
          left: 16px;
          right: 973.75px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 31.1px;
          height: 242.5px;
        }
        .footer-col.contact {
          left: 335.25px;
          right: 654.5px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px 0px 63px;
          gap: 32px;
          height: 251px;
        }
        .footer-col.nav {
          left: 654.5px;
          right: 335.25px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px 0px 35px;
          gap: 32px;
          height: 259px;
        }
        .footer-col.locations {
          left: 973.75px;
          right: 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px 0px 35px;
          gap: 32px;
          height: 333px;
        }
        .footer-brand-logo {
          width: 255.25px;
          height: 96.52px;
          object-fit: contain;
        }
        .footer-brand-text-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px 0px 0.875px;
          width: 255.25px;
          max-width: 320px;
          height: 114.88px;
        }
        .footer-brand-text {
          width: 255.25px;
          height: 114px;
          font-family: Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 23px;
          display: flex;
          align-items: center;
          color: #DBEAFE;
          margin: 0;
        }
        .footer-heading {
          font-family: Montserrat, sans-serif;
          font-weight: 700;
          font-size: 18px;
          line-height: 28px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #F39308;
          margin: 0;
        }
        .footer-heading.locations {
          height: 56px;
        }
        .footer-contact {
          font-style: normal;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 24px;
          width: 255.25px;
        }
        .footer-contact-row {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          padding: 0px;
          gap: 16px;
          width: 255.25px;
        }
        .footer-contact-row.center {
          align-items: center;
        }
        .footer-contact-icon {
          color: #F39308;
          flex-shrink: 0;
        }
        .footer-contact-text {
          font-family: Inter, sans-serif;
          font-size: 14px;
          line-height: 20px;
          color: #DBEAFE;
        }
        .footer-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 16px;
          width: 255.25px;
        }
        .footer-nav-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          width: 255.25px;
          height: 20px;
        }
        .footer-nav-link {
          width: 255.25px;
          height: 20px;
          font-family: Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          display: flex;
          align-items: center;
          color: #DBEAFE;
          text-decoration: none;
        }
        .footer-map {
          width: 255.25px;
          height: 210px;
          opacity: 1;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          width: 100%;
          max-width: 1245px;
          padding-top: 48px;
        }
        .footer-copy {
          font-family: Inter, sans-serif;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(191, 219, 254, 0.6);
          margin: 0;
        }
        @media (max-width: 1280px) {
          .footer-wrap {
            padding: 60px 32px 40px;
            gap: 48px;
          }
          .footer-inner {
            width: 100%;
            height: auto;
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            position: static;
          }
          .footer-col {
            position: static;
            width: calc(50% - 20px);
            height: auto;
            padding: 0;
          }
          .footer-col.brand { width: 100%; }
          .footer-brand-logo { width: 200px; height: auto; }
          .footer-brand-text-wrap { width: 100%; max-width: 100%; }
          .footer-brand-text { width: 100%; max-width: 400px; }
          .footer-contact { width: 100%; }
          .footer-nav-list { width: 100%; }
          .footer-map { width: 100%; height: auto; max-width: 255px; }
        }
        @media (max-width: 640px) {
          .footer-wrap {
            padding: 40px 20px 32px;
            gap: 32px;
          }
          .footer-inner {
            flex-direction: column;
            gap: 32px;
          }
          .footer-col {
            width: 100%;
          }
          .footer-bottom { padding-top: 24px; }
          .footer-brand-logo { width: 180px; }
        }
      `}</style>
      <footer className="footer-wrap">
        <div className="footer-inner">
          <div className="footer-col brand">
            <img src={footerLogoUrl} alt="E2E HRC Logo" className="footer-brand-logo" />
            <div className="footer-brand-text-wrap">
              <p className="footer-brand-text">{companyDescription}</p>
            </div>
          </div>
          <div className="footer-col contact">
            <h3 className="footer-heading">{contactTitle}</h3>
            <address className="footer-contact">
              <div className="footer-contact-row">
                <FiMapPin size={16} className="footer-contact-icon" style={{ marginTop: '2px' }} aria-hidden="true" />
                <span className="footer-contact-text">{contactAddress}</span>
              </div>
              <div className="footer-contact-row center">
                <FiPhone size={18} className="footer-contact-icon" aria-hidden="true" />
                <a href={phoneHref} className="footer-contact-text" style={{ textDecoration: 'none' }}>
                  {contactPhone}
                </a>
              </div>
              <div className="footer-contact-row center">
                <FiMail size={20} className="footer-contact-icon" aria-hidden="true" />
                <a href={`mailto:${contactEmail}`} className="footer-contact-text" style={{ textDecoration: 'none' }}>
                  {contactEmail}
                </a>
              </div>
            </address>
          </div>
          <div className="footer-col nav">
            <h3 className="footer-heading">{navigationTitle}</h3>
            <nav aria-label="Footer navigation">
              <ul className="footer-nav-list">
                {menuItems.map((link) => (
                  <li key={link.label || link.url} className="footer-nav-item">
                    <a href={link.url || '#'} className="footer-nav-link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="footer-col locations">
            <h3 className="footer-heading locations">{officeTitle}</h3>
            <img src={officeImage} alt="Office locations map" className="footer-map" />
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            Copyright &copy; 2026 by E2E Human Resource Consultancy Ltd | All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}
