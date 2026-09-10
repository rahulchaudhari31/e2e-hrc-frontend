import sectionImage from '../../assets/images/Section - 3. Our Workforce Solutions (1).png';

export default function Solutions() {
  return (
    <section id="solutions" className="w-full bg-bg-section">
      <img
        src={sectionImage}
        alt="Our Workforce Solutions"
        className="w-full h-auto block"
        style={{ maxWidth: '1440px', margin: '0 auto', display: 'block' }}
      />
    </section>
  );
}
