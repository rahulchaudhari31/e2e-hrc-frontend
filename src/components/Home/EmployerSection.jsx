import { useEffect, useMemo, useState } from "react";
import { getEmployerSectionCards } from "../../services/employerSectionService";

function EmployerSection() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCards = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const response = await getEmployerSectionCards();
        if (isMounted) {
          const activeCards = (response?.data || [])
            .filter((card) => card.isActive !== false)
            .sort((a, b) => Number(a.displayOrder ?? a.displayorder ?? 0) - Number(b.displayOrder ?? b.displayorder ?? 0));
          setCards(activeCards);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
          setCards([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCards();

    return () => {
      isMounted = false;
    };
  }, []);

  const accentStyles = useMemo(
    () => [
      { background: "linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)", text: "#4338ca" },
      { background: "linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)", text: "#c2410c" },
      { background: "linear-gradient(135deg, #ecfeff 0%, #ffffff 100%)", text: "#0f766e" },
    ],
    []
  );

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-360 px-6 sm:px-10 lg:px-14">
        <div className="mb-12 text-center">
          <span className="inline-flex rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-700">
            Employer Section
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Flexible hiring support for employers and candidates
          </h2>
        </div>

        {isLoading ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse rounded-[28px] bg-white p-8 shadow-sm">
                <div className="h-4 w-24 rounded-full bg-slate-200" />
                <div className="mt-4 h-8 w-3/4 rounded bg-slate-200" />
                <div className="mt-4 h-20 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            Employer section content is temporarily unavailable.
          </div>
        ) : cards.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            No employer section cards available right now.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {cards.map((card, index) => {
              const titleLine = card.titleLine || '';
              const highlightedText = card.highlightedText || '';
              const badgeText = card.badgeText || '';
              const description = card.description || '';

              const isEmployer = card.cardType === 'employer';
              const employerBg = '#cde87a';
              const employeeBg = '#ffffff';
              const mainBlue = '#004CA5';
              const highlightOrange = '#FF8A00';

              return (
                <article
                  key={card._id || titleLine}
                  className="rounded-[28px] border border-slate-200 p-8 shadow-sm shadow-slate-200/50"
                  style={{ background: isEmployer ? employerBg : employeeBg, color: isEmployer ? '#ffffff' : mainBlue }}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] opacity-80">{badgeText}</p>
                  <h3 className="mt-4 text-2xl font-bold leading-tight">
                    {titleLine} {highlightedText ? <span className="mx-1" style={{ color: highlightOrange }}>{highlightedText}</span> : null}
                  </h3>
                  <p className="mt-4 text-sm leading-7 opacity-80">{description}</p>
                  {card.buttonText ? (
                    <a
                      href={card.buttonLink || '#'}
                      className="mt-6 inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition hover:opacity-90"
                      style={{ backgroundColor: highlightOrange, color: '#ffffff' }}
                    >
                      {card.buttonText}
                    </a>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default EmployerSection;
