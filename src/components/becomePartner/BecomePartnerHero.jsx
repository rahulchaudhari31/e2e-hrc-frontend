import heroBg from '../../assets/becomepartner/background become a partner.jpg';

export default function BecomePartnerHero() {
  return (
<section
        className="relative flex items-center px-4 md:px-16"
        style={{
          height: 201,
          background: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroBg}) center / cover no-repeat`,
          borderTop: '1px solid #EAE8E7',
        }}
      >
        <div
          className="w-full max-w-[1344px]"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          <h1
            className="text-white text-[28px] md:text-[48px]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              lineHeight: '28px',
              margin: 0,
            }}
          >
            Become Our <span style={{ color: '#F39308' }}>Trusted</span> Recruitment Partner
          </h1>
        </div>
      </section>
  );
}
