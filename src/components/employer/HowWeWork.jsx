import { useEffect, useState } from "react";
import { getEmployerHowWeWorkSteps } from "../../services/employer/howWeWorkService";

function HowWeWorkSkeleton() {
  return (
    <section className="relative w-full bg-[linear-gradient(135deg,#F0D7A4_0%,#E9C65C_25%,#D8AE32_50%,#F4E4C3_75%,#F7F3EA_100%)] py-16 px-6 md:px-16 overflow-hidden">
      <div className="relative z-10 text-center mb-14 animate-pulse">
        <div className="h-5 bg-gray-200 rounded-full w-48 mx-auto mb-4" />
        <div className="h-10 md:h-12 bg-gray-200 rounded-full w-72 mx-auto" />
      </div>
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 max-w-5xl mx-auto text-center">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col items-center px-4">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 bg-gray-200 rounded-md" />
            </div>
            <div className="h-5 bg-gray-200 rounded-full w-32 mb-3" />
            <div className="h-4 bg-gray-200 rounded-full w-40" />
          </div>
        ))}
      </div>
    </section>
  );
}

function HowWeWorkFallback({ message = "The How We Work section is currently unavailable. Please check back later." }) {
  return (
    <section className="relative w-full bg-[linear-gradient(135deg,#F0D7A4_0%,#E9C65C_25%,#D8AE32_50%,#F4E4C3_75%,#F7F3EA_100%)] py-16 px-6 md:px-16 overflow-hidden">
      <div className="relative z-10 text-center mb-14">
        <p className="text-gray-700 tracking-widest text-sm font-semibold mb-2">HOW WE WORK</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy">How We Work</h2>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto rounded-3xl bg-white/80 p-10 text-center shadow-lg">
        <p className="text-gray-700">{message}</p>
      </div>
    </section>
  );
}

export default function HowWeWork() {
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const staticSection = {
    badgeText: "HOW WE WORK",
    sectionTitle: "How We Work",
    sectionDescription: "",
  };

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const response = await getEmployerHowWeWorkSteps();
        const payload = response?.data || response;

        if (Array.isArray(payload) && payload.length > 0) {
          setSteps(payload);
        } else {
          setSteps([]);
        }
      } catch (error) {
        console.error("Error fetching employer how we work steps:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadSteps();
  }, []);

  if (isLoading) return <HowWeWorkSkeleton />;
  if (hasError) return <HowWeWorkFallback />;
  if (steps.length === 0) return <HowWeWorkFallback message="No active How We Work steps are available yet." />;

  return (
    <section className="relative w-full bg-[linear-gradient(135deg,#F0D7A4_0%,#E9C65C_25%,#D8AE32_50%,#F4E4C3_75%,#F7F3EA_100%)] py-16 px-6 md:px-16 overflow-hidden">
      <div className="relative z-10 text-center mb-14">
        {staticSection.badgeText && (
          <p className="text-gray-700 tracking-widest text-sm font-semibold mb-2">{staticSection.badgeText}</p>
        )}
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy">{staticSection.sectionTitle}</h2>
        {staticSection.sectionDescription && (
          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-gray-700">{staticSection.sectionDescription}</p>
        )}
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 max-w-5xl mx-auto text-center">
        {steps.map((step, index) => (
          <div key={step._id || `${step.title}-${index}`} className="flex flex-col items-center px-4">
            <div className="relative w-16 h-16 flex items-center justify-center mb-4">
              <div className="absolute inset-0 bg-brand-green/40 rotate-45 rounded-md" />
              <span className="relative z-10 text-brand-navy font-bold text-xl">{String(step.order || index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">{step.title}</h3>
            <p className="text-sm text-gray-700 max-w-55">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}