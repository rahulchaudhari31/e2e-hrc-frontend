import { FiArrowRight } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const socialLinks = [
  { label: 'LinkedIn',  href: '#', Icon: FaLinkedinIn },
  { label: 'Twitter',   href: '#', Icon: FaTwitter    },
  { label: 'Facebook',  href: '#', Icon: FaFacebookF  },
  { label: 'Instagram', href: '#', Icon: FaInstagram  },
];

export default function AnnouncementBar() {
  return (
    <>
      <style>{`
        .ann-bar { height: 48px; width: 100%; background: #000; }
        .ann-bar-inner {
          display: flex; align-items: center; height: 100%;
          max-width: 1440px; margin: 0 auto;
          padding: 0 64px; position: relative;
        }
        .ann-link {
          position: absolute; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px;
          white-space: nowrap; font-size: 14px; font-weight: 500;
          color: #0073CF; text-decoration: none;
        }
        .ann-link:hover { color: #1C93F3; }
        .ann-social { margin-left: auto; display: flex; align-items: center; gap: 20px; }
        .ann-social a { color: #fff; transition: color 0.15s; }
        .ann-social a:hover { color: #0073CF; }
        @media (max-width: 1024px) {
          .ann-bar-inner { padding: 0 32px; }
          .ann-link { font-size: 12px; }
        }
        @media (max-width: 768px) {
          .ann-bar-inner { padding: 0 16px; }
          .ann-link { font-size: 11px; position: static; transform: none; margin: 0 auto; }
          .ann-social { display: none; }
        }
      `}</style>
      <div className="ann-bar">
        <div className="ann-bar-inner">
          <a href="#" className="ann-link">
            Looking to hire exceptional talent? Submit a Vacancy
            <FiArrowRight size={16} aria-hidden="true" />
          </a>
          <div className="ann-social">
            {socialLinks.map(({ label, href, Icon }) => (
              <a key={label} href={href} aria-label={label}>
                <Icon size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
