import buildingImage from '../../assets/assets/images/building.jpg';
import manImage from '../../assets/assets/images/Man.jpg';
import randomImage from '../../assets/assets/images/random image.jpg';

const rows = [
  {
    letter: 'H',
    eyebrow: 'People first, always',
    eyebrowColor: '#004CA5',
    title: 'Human Approach',
    desc: 'We believe recruitment is fundamentally a human process. Every candidate is a person with aspirations, every employer has a culture worth protecting. We listen, understand, and connect with genuine care.',
    stats: [
      { value: '500+', label: 'Active Clients' },
      { value: '98%', label: 'Satisfaction Rate' },
    ],
    image: buildingImage,
    statColor: '#004CA5',
    letterColor: 'rgba(0,76,165,0.1)',
    gradient: true,
    letterPos: { left: '402px', right: 'auto', top: '-25px' },
    rowWidth: '1325px',
    imageWidth: '496px',
    textWidth: '790px',
    textPadEyebrow: '36px',
    textPad: '1px 40px 40px 50px',
    titleWidth: '160px',
    statsPadTop: '20px',
  },
  {
    letter: 'R',
    eyebrow: 'Measurable outcomes',
    eyebrowColor: '#F39308',
    title: 'Results Driven',
    desc: 'Our track record speaks for itself. With a 98% client retention rate and thousands of successful placements, we\'re relentlessly focused on delivering outcomes that matter to your business.',
    stats: [
      { value: '10k+', label: 'Placements Made' },
      { value: '25+', label: 'Industries Served' },
    ],
    image: manImage,
    statColor: '#F39308',
    letterColor: 'rgba(243,147,8,0.1)',
    letterPos: { left: '30.89%', right: '44.28%', top: '1.21%' },
    imageOnRight: true,
    rowWidth: '1325px',
    imageWidth: '489.6px',
    textWidth: '755px',
    textPadEyebrow: '50px',
    textPad: '1px 40px 40px 50px',
    statsPadTop: '20px',
  },
  {
    letter: 'C',
    eyebrow: 'Long-term partnership',
    eyebrowColor: '#C9DB82',
    title: 'Commitment Always',
    desc: 'We don\'t disappear after placement. Our commitment to clients and candidates extends far beyond the hire date — with aftercare, check-ins, and genuine ongoing support at every stage.',
    stats: [
      { value: '15+', label: 'Years Experience' },
      { value: '4', label: 'UK Offices' },
    ],
    image: randomImage,
    statColor: '#C9DB82',
    letterColor: 'rgba(201,219,130,0.4)',
    letterPos: { left: '77.43%', right: '-1.66%', top: '0.01%' },
    gradient: true,
    rowWidth: '1325px',
    imageWidth: '489.6px',
    textWidth: '786px',
    textPadEyebrow: '58px',
    textPad: '1px 40px 40px 50px',
    statsPadTop: '20px',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="px-4 bg-white lg:pt-[46px] lg:pb-[6px]">
      <div className="mx-auto flex flex-col lg:gap-[30px]" style={{ maxWidth: '1440px' }}>
        <div className="flex flex-col items-center text-center lg:w-[1325px] lg:h-[83.99px] mx-auto">
          <span className="inline-flex items-center bg-[#E8EDF5] text-[#004CA5] font-body font-semibold text-[12px] leading-[16px] tracking-[0px] px-3 py-[6px] rounded-full">
            Why Choose E2E HRC
          </span>
          <h2 className="font-heading font-[800] text-3xl sm:text-4xl lg:text-[36px] lg:leading-[40px] tracking-[0px] text-[#004CA5] lg:mt-3">
            What makes us different
          </h2>
        </div>

        <div className="flex flex-col lg:gap-[30px]">
          {rows.map(({ letter, eyebrow, eyebrowColor, title, desc, stats, image, statColor, letterColor, letterPos, eyebrowBg, gradient, imageOnRight, rowWidth, imageWidth, textWidth, textPadEyebrow, textPad, statsPadTop, titleWidth }) => {
            const ImageBlock = (
              <div
                className="relative overflow-hidden shrink-0"
                style={{
                  width: imageWidth,
                  height: '420px',
                  borderRadius: '16px',
                  isolation: 'isolate',
                }}
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                {gradient && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(248,250,252,0.15) 100%)',
                    }}
                  />
                )}
              </div>
            );

            const TextBlock = (
              <div
                className="bg-[#F8FAFC] shrink-0 relative overflow-hidden"
                style={{
                  width: textWidth,
                  height: '420px',
                  borderRadius: '16px',
                  padding: textPad || '1px 40px 40px',
                  position: 'relative',
                }}
              >
                {/* Giant background letter */}
                <span
                  className="absolute pointer-events-none select-none"
                  style={{
                    left: letterPos?.left ?? 'auto',
                    right: letterPos?.right ?? '0',
                    top: letterPos?.top ?? '11.8px',
                    fontSize: '233.44px',
                    lineHeight: '233px',
                    color: letterColor,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 800,
                    zIndex: 0,
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </span>

                <div className="relative z-10 lg:w-[518.4px]">
                  <div className="lg:pb-[8px]">
                    {eyebrowBg ? (
                      <span className="inline-flex items-center bg-[#F39308] text-white font-body font-semibold text-[12px] leading-[16px] tracking-[1.2px] uppercase px-3 py-[6px] rounded-full">
                        {eyebrow}
                      </span>
                    ) : (
                      <span
                        className="font-body font-semibold text-[12px] leading-[16px] tracking-[1.2px] uppercase"
                        style={{ color: eyebrowColor }}
                      >
                        {eyebrow}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-[800] text-[30px] leading-[36px] text-[#004CA5] mt-2 mb-4" style={{ width: titleWidth || 'auto' }}>
                    {title}
                  </h3>
                  <p className="font-body font-[400] text-[16px] leading-[26px] text-[#475569]" style={{ maxWidth: '460px', height: '104px' }}>
                    {desc}
                  </p>
                  <div className="flex gap-6" style={{ paddingTop: statsPadTop || '20px' }}>
                    {stats.map(({ value, label }) => (
                      <div key={label}>
                        <p className="font-heading font-[800] text-[24px] leading-[32px]" style={{ color: statColor }}>
                          {value}
                        </p>
                        <p className="font-body font-medium text-[12px] leading-[16px] text-[#64748B] mt-1">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );

            return (
              <div
                key={letter}
                className="relative mx-auto hidden lg:block overflow-hidden bg-[#F8FAFC]"
                style={{ width: rowWidth, height: '420px', borderRadius: '20px' }}
              >
                <div
                  className="relative z-10 flex flex-row w-full h-full"
                  style={{ justifyContent: 'flex-start' }}
                >
                  {imageOnRight ? (
                    <>{TextBlock}{ImageBlock}</>
                  ) : (
                    <>{ImageBlock}{TextBlock}</>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col gap-6 lg:hidden mt-8">
          {rows.map(({ letter, eyebrow, eyebrowColor, title, desc, stats, image, statColor, gradient }) => (
            <div key={letter} className="bg-[#F8FAFC] rounded-2xl overflow-hidden">
              <div className="w-full h-[280px] overflow-hidden relative">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                {gradient && (
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(248,250,252,0.15) 100%)' }} />
                )}
              </div>
              <div className="p-6">
                <span className="font-body font-semibold text-[12px] leading-[16px] tracking-[1.2px] uppercase" style={{ color: eyebrowColor }}>
                  {eyebrow}
                </span>
                <h3 className="font-heading font-[800] text-2xl leading-[36px] text-[#004CA5] mt-1 mb-2">{title}</h3>
                <p className="font-body font-[400] text-sm leading-[26px] text-[#475569]">{desc}</p>
                <div className="flex gap-6 mt-4">
                  {stats.map(({ value, label }) => (
                    <div key={label}>
                      <p className="font-heading font-[800] text-xl" style={{ color: statColor }}>{value}</p>
                      <p className="font-body font-medium text-[12px] text-[#64748B]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
