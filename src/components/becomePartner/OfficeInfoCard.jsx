import { useEffect, useCallback } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiCompass, FiX } from 'react-icons/fi';

const defaultData = {
  officeName: 'UK Head Office',
  address: ['Unit 2, 1204B Stratford Road, Hall Green,', 'Birmingham, B28 8AS, UK'],
  phone: '+44 (0) 121 778 2400',
  email: 'info@e2ehrc.co.uk',
  hours: 'Mon to Fri: 9AM to 6PM',
  aboutText:
    'Our UK head office is located in Birmingham, easily accessible by road and public transport. Our team is available to assist you with all your recruitment needs.',
  directionsQuery: 'Unit 2, 1204B Stratford Road, Hall Green, Birmingham, B28 8AS, UK',
};

export default function OfficeInfoCard({
  data = defaultData,
  isVisible,
  style,
  onClose,
  isModal = false,
  onMouseEnter,
  onMouseLeave,
}) {
  const { officeName, address, phone, email, hours, aboutText, directionsQuery } = data;

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isModal && isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModal, isVisible, handleKeyDown]);

  if (!isVisible) return null;

  const handleGetDirections = () => {
    const q = encodeURIComponent(directionsQuery);
    window.open(`https://maps.google.com/?q=${q}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {isModal && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 49,
          }}
        />
      )}
      <div
        role={isModal ? 'dialog' : 'tooltip'}
        aria-label={officeName}
        aria-modal={isModal}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          position: isModal ? 'fixed' : 'absolute',
          zIndex: 50,
          width: 380,
          maxWidth: '90vw',
          background: '#FFFFFF',
          borderRadius: 24,
          padding: '40px 32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
          opacity: 1,
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          ...(isModal
            ? {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }
            : style),
        }}
      >
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#FFFFFF',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <FiX size={16} color="#000" />
        </button>
      )}

      <h2
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: 28,
          color: '#004CA5',
          margin: 0,
          marginBottom: 24,
        }}
      >
        {officeName}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <InfoRow icon={FiMapPin} color="#004CA5">
          {address.map((line, i) => (
            <span key={i}>
              {line}
              {i < address.length - 1 && <br />}
            </span>
          ))}
        </InfoRow>

        <InfoRow icon={FiPhone} color="#004CA5">
          {phone}
        </InfoRow>

        <InfoRow icon={FiMail} color="#004CA5">
          {email}
        </InfoRow>

        <InfoRow icon={FiClock} color="#004CA5">
          {hours}
        </InfoRow>
      </div>

      <h3
        style={{
          fontWeight: 700,
          fontSize: 20,
          color: '#1B1C1C',
          margin: 0,
          marginTop: 24,
          marginBottom: 12,
        }}
      >
        About this Office
      </h3>

      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: '#424752',
          margin: 0,
          marginBottom: 24,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {aboutText}
      </p>

      <button
        onClick={handleGetDirections}
        style={{
          width: '100%',
          padding: 16,
          borderRadius: 9999,
          background: '#004CA5',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: 16,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#003b82')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#004CA5')}
      >
        <FiCompass size={18} color="#FFF" />
        Get Directions
      </button>
    </div>
    </>
  );
}

function InfoRow({ icon: Icon, color, children }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        marginBottom: 16,
        alignItems: 'flex-start',
      }}
    >
      <div style={{ flexShrink: 0, marginTop: 2 }}>
        <Icon size={18} color={color} />
      </div>
      <span
        style={{
          fontSize: 16,
          lineHeight: 1.5,
          color: '#1B1C1C',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {children}
      </span>
    </div>
  );
}
