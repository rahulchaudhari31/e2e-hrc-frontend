import { FiGlobe, FiHome, FiLayers } from 'react-icons/fi';

import trustPhoto from '../../assets/images/background coonecting reqrirment/build on trust.jpg';

const checkItems = [
  {
    title: 'Extensive Global Network',
    desc: 'Access to a vast pool of passive candidates and international clients.',
    icon: FiGlobe,
  },
  {
    title: 'UK Headquarters, Global Footprint',
    desc: 'Benefit from our established presence and compliance expertise across major markets.',
    icon: FiHome,
  },
  {
    title: 'Deep Sector Expertise',
    desc: 'Leverage our specialised knowledge across healthcare, IT, finance, engineering, hospitality, and more.',
    icon: FiLayers,
  },
];

export default function BuiltOnTrustSection() {
  return (
    <section className="bg-[#FBF9F8] py-[100px]">
      <div className="max-w-[1440px] mx-auto px-6 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-x-[64px] gap-y-12 items-center">
          <div className="relative w-full lg:w-[568px] lg:h-[500px] shrink-0">
            <div className="hidden lg:block absolute" style={{ left: '48px', top: '8px', width: '459px', height: '487px' }}>
              <div className="absolute inset-0 border border-[#F39308]" style={{ borderWidth: '1.2px' }} />
              <div className="absolute" style={{ left: '12px', top: '12px', width: '435px', height: '463px' }}>
                <img
                  src={trustPhoto}
                  alt="Our team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="relative lg:hidden w-full max-w-[520px] mx-auto">
              <img
                src={trustPhoto}
                alt="Our team collaboration"
                className="w-full h-[380px] md:h-[440px] object-cover rounded-[8px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 max-w-[568px]">
            <h2
              className="text-[24px] md:text-[32px] leading-[32px] md:leading-[40px]"
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 600,
                letterSpacing: '-0.32px',
                color: '#003679',
              }}
            >
              Built on Trust and Transparency Since 2007
            </h2>
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#424752',
              }}
            >
              At E2E HRC, we believe that true partnership goes beyond transactional referrals. We build strategic alliances grounded in mutual respect, shared ethical standards, and a commitment to delivering exceptional talent solutions worldwide.
            </p>
            <div className="flex flex-col gap-6 pt-4">
              {checkItems.map((item, i) => {
                const Icon = item.icon;
                return (
                <div key={i} className="flex gap-4 items-start">
                  <div
                    className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(0, 54, 121, 0.1)' }}
                  >
                    <Icon size={14} color="#003679" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4
                      className="text-[18px] md:text-[20px] leading-[26px] md:leading-[28px]"
                      style={{
                        fontFamily: "'Hanken Grotesk', sans-serif",
                        fontWeight: 600,
                        color: '#1B1C1C',
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-[14px] md:text-[16px] leading-[22px] md:leading-[24px]"
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontWeight: 400,
                        color: '#424752',
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
