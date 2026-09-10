import heroBg from '../../assets/images/about us images/about us background.jpg';

export default function HeroSection() {
  return (
    <section
      style={{
        width: '1440px',
        maxWidth: '100%',
        height: '515px',
        padding: '55px 0px 55px 64px',
        background: `linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroBg}) center / cover no-repeat`,
        borderTop: '1px solid #EAE8E7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
      }}
      className="hero-section"
    >
      <h1
        className="hero-heading"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          fontSize: '60px',
          lineHeight: '48px',
          color: '#FFFFFF',
          margin: 0,
          whiteSpace: 'nowrap',
          marginBottom: '60px',
        }}
      >
        Connect With <span style={{ color: '#F39308' }}>E2E HRC</span>
      </h1>
    </section>
  );
}
