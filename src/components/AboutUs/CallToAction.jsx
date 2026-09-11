import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import submitImg from "../../assets/images/Career Growth imgs/submit.png";
import uploadImg from "../../assets/images/Career Growth imgs/upload.png";
import { getActiveAboutCTA } from "../../services/aboutus/aboutCallToActionService";

const FALLBACK = {
  title: "Ready to Build Your Future?",
  description:
    "Whether you are an organization seeking elite talent or a professional looking for your next strategic career move, E2E Consultancy is your trusted partner.",
  button1Text: "Submit a Vacancy",
  button1Link: "/submit-vacancy",
  button2Text: "Upload CV",
  button2Link: "/submit-cv",
};

const CallToAction = () => {
  const [cta, setCta] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getActiveAboutCTA().then((d) => {
      if (isMounted && d) setCta(d);
    });
    return () => { isMounted = false; };
  }, []);

  const title = cta?.title || FALLBACK.title;
  const description = cta?.description || FALLBACK.description;
  const button1Text = cta?.button1Text || FALLBACK.button1Text;
  const button1Link = cta?.button1Link || FALLBACK.button1Link;
  const button2Text = cta?.button2Text || FALLBACK.button2Text;
  const button2Link = cta?.button2Link || FALLBACK.button2Link;

  return (
    <section className="px-6 md:px-16 py-16 bg-blue-900">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-blue-200 max-w-xl mx-auto mb-8 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to={button1Link}
            className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium px-6 py-3 rounded-full flex items-center gap-2"
          >
            {button1Text}
            <img src={submitImg} alt="" style={{ width: "13.33px", height: "16.67px" }} />
          </Link>
          <Link
            to={button2Link}
            className="border border-white/40 hover:bg-white/10 transition-colors text-white font-medium px-6 py-3 rounded-full flex items-center gap-2"
          >
            {button2Text}
            <img src={uploadImg} alt="" style={{ width: "13.33px", height: "16.67px" }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;