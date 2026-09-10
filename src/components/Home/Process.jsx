import { useEffect, useState } from "react";
import { getHowWeWork } from "../../services/homeServices/howWeWorkService";

const fallbackEmployerSteps = [
  { title: "Discovery", description: "Understanding your business, culture, and requirements." },
  { title: "Requirement Planning", description: "Defining the ideal candidate profile and timeline." },
  { title: "Candidate Search", description: "Active headhunting across our talent network." },
  { title: "Shortlisting", description: "Presenting only the best-matched candidates." },
  { title: "Interview Support", description: "Full coordination and coaching throughout." },
  { title: "Successful Hire", description: "Placement, onboarding support, and follow-up." },
];

const fallbackEmployeeSteps = [
  { title: "Register", description: "Create your profile and tell us about your goals." },
  { title: "CV Review", description: "Expert feedback to make your application stand out" },
  { title: "Job Matching", description: "We match you with roles that fit your experience." },
  { title: "Interview Preparation", description: "Tailored coaching and briefing for every interview" },
  { title: "Placement", description: "We negotiate the best offer on your behalf." },
  { title: "Career Support", description: "Ongoing support as your career progresses." },
];

function StepItem({ stepNumber, title, description, isBlue, isLast }) {
  return (
    <div className="flex items-start" style={{ gap: 16, padding: 0 }}>
      <div className="flex flex-col items-center" style={{ width: 36, minWidth: 36 }}>
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 36, height: 36,
            borderRadius: "50%",
            background: isBlue ? "#004CA5" : "#C8D96F",
          }}
        >
          <span
            className="font-heading font-bold"
            style={{
              fontSize: 12, lineHeight: "16px",
              color: isBlue ? "#FFFFFF" : "#004CA5",
              width: "fit-content",
            }}
          >
            {stepNumber}
          </span>
        </div>
        {!isLast && (
          <div
            style={{
              width: 1, height: 32,
              minHeight: 32,
              marginTop: 4,
              background: isBlue ? "#004CA5" : "#C8D96F",
              opacity: isBlue ? 0.2 : 0.5,
            }}
          />
        )}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 24 }}>
        <h4
          className="font-heading font-semibold"
          style={{ fontSize: 16, lineHeight: "22px", color: "#004CA5", margin: 0 }}
        >
          {title}
        </h4>
        <p
          className="font-body font-normal"
          style={{ fontSize: 14, lineHeight: "20px", color: "#64748B", margin: 0, marginTop: 4 }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function Process() {
  const [section, setSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await getHowWeWork();
        setSection(data || null);
      } catch {
        setSection(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSection();
  }, []);

  const employerSteps = (section?.employerSteps || [])
    .filter((step) => step.isActive !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  const employeeSteps = (section?.employeeSteps || [])
    .filter((step) => step.isActive !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const displayEmployer = employerSteps.length > 0 ? employerSteps : fallbackEmployerSteps;
  const displayEmployee = employeeSteps.length > 0 ? employeeSteps : fallbackEmployeeSteps;

  return (
    <section style={{ background: "#F8FAFC" }}>
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-8 pb-12 lg:pt-[35px] lg:pb-0">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2 lg:gap-1.5 mb-8 lg:mb-[70px]">
          <span
            className="font-body font-semibold"
            style={{
              background: "#E8EDF5", borderRadius: "50px",
              padding: "6px 12px", fontSize: 12, lineHeight: "16px",
              color: "#004CA5", display: "inline-flex", alignItems: "center", gap: 8,
            }}
          >
            Our Process
          </span>
          <h2
            className="font-heading font-[800] text-center"
            style={{ fontSize: "clamp(24px, 4vw, 36px)", lineHeight: "1.2", color: "#004CA5", margin: 0 }}
          >
            {section?.sectionTitle || "How We Work"}
          </h2>
          <p
            className="font-body font-normal text-center"
            style={{
              fontSize: "clamp(14px, 2vw, 18px)", lineHeight: "1.5", color: "#64748B",
              maxWidth: 775, padding: "10px 0", margin: 0,
            }}
          >
            {section?.sectionDescription || "Dedicated pathways for employers and job seekers, united by one commitment to success."}
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full justify-center">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse rounded-2xl bg-white p-6 shadow-sm w-full lg:w-[400px]" style={{ height: 500 }} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-0 w-full">

            {/* Employer Journey Column */}
            <div className="w-full lg:w-[503px] lg:flex-shrink-0">
              {/* Header Bar */}
              <div
                className="flex items-center"
                style={{
                  width: "100%", maxWidth: 503, height: 72, background: "#004CA5",
                  borderRadius: 16, padding: 16, gap: 12, boxSizing: "border-box",
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, background: "#C8D96F", borderRadius: 16 }}
                >
                  <span className="font-heading font-[800]" style={{ fontSize: 14, lineHeight: "20px", color: "#004CA5" }}>E</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold" style={{ fontSize: 16, lineHeight: "24px", color: "#FFFFFF", margin: 0 }}>Employer Journey</h3>
                  <p className="font-body font-normal" style={{ fontSize: 12, lineHeight: "16px", color: "rgba(255,255,255,0.6)", margin: 0 }}>From brief to successful hire</p>
                </div>
              </div>

              {/* Steps */}
              <div className="flex flex-col pt-6 lg:ml-11 pl-0 lg:pl-0" style={{ maxWidth: 416 }}>
                {displayEmployer.map((step, index) => (
                  <StepItem
                    key={step._id || step.title || index}
                    stepNumber={step.stepNumber || String(index + 1).padStart(2, "0")}
                    title={step.title}
                    description={step.description}
                    isBlue={true}
                    isLast={index === displayEmployer.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Center E2E Logo - desktop only */}
            <div
              className="hidden lg:flex flex-col items-center mx-auto px-4 lg:px-8"
              style={{ paddingTop: 140 }}
            >
              <div style={{ width: 160, height: 160, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div
                  style={{
                    width: 160, height: 160, borderRadius: "50%",
                    border: "1.6px dashed rgba(0,92,185,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "absolute", zIndex: 0,
                  }}
                />
                <div
                  style={{
                    width: 112, height: 112, borderRadius: "50%",
                    border: "1.6px solid rgba(0,92,185,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 80, height: 80, borderRadius: "50%",
                      background: "linear-gradient(135deg, #005CB9 0%, #003B7A 100%)",
                    }}
                  >
                    <span className="font-heading font-[800]" style={{ fontSize: 20, lineHeight: "28px", color: "#FFFFFF" }}>E2E</span>
                  </div>
                </div>
                <span style={{ position: "absolute", top: 0, left: "48%", width: "4%", height: 8, background: "#F5A300" }} />
                <span style={{ position: "absolute", bottom: 0, left: "48%", width: "4%", height: 8, background: "#F5A300" }} />
                <span style={{ position: "absolute", left: 0, top: "48%", width: 8, height: "4%", background: "#C8D96F" }} />
                <span style={{ position: "absolute", right: 0, top: "48%", width: 8, height: "4%", background: "#C8D96F" }} />
              </div>
              <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                <span className="font-body font-semibold" style={{ fontSize: 12, lineHeight: "16px", textAlign: "center", color: "#64748B" }}>Connecting</span>
                <span className="font-body font-semibold" style={{ fontSize: 12, lineHeight: "16px", textAlign: "center", color: "#004CA5" }}>Both Journeys</span>
              </div>
            </div>

            {/* Employee Journey Column */}
            <div className="w-full lg:w-[498px] lg:flex-shrink-0">
              {/* Header Bar */}
              <div
                className="flex items-center"
                style={{
                  width: "100%", maxWidth: 498, height: 72, background: "#C8D96F",
                  borderRadius: 16, padding: 16, gap: 12, boxSizing: "border-box",
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, background: "#004CA5", borderRadius: 16 }}
                >
                  <span className="font-heading font-[800]" style={{ fontSize: 14, lineHeight: "20px", color: "#F39308" }}>E</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold" style={{ fontSize: 16, lineHeight: "24px", color: "#004CA5", margin: 0 }}>Employee Journey</h3>
                  <p className="font-body font-normal" style={{ fontSize: 12, lineHeight: "16px", color: "rgba(0,59,122,0.6)", margin: 0 }}>From registration to career support</p>
                </div>
              </div>

              {/* Steps */}
              <div className="flex flex-col pt-6 lg:ml-10 pl-0 lg:pl-0" style={{ maxWidth: 416 }}>
                {displayEmployee.map((step, index) => (
                  <StepItem
                    key={step._id || step.title || index}
                    stepNumber={step.stepNumber || String(index + 1).padStart(2, "0")}
                    title={step.title}
                    description={step.description}
                    isBlue={false}
                    isLast={index === displayEmployee.length - 1}
                  />
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}

export default Process;
