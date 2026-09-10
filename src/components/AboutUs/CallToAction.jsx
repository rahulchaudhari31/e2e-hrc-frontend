import React from "react";
import submitImg from "../../assets/images/Career Growth imgs/submit.png";
import uploadImg from "../../assets/images/Career Growth imgs/upload.png";

const CallToAction = () => {
  return (
    <section className="px-6 md:px-16 py-16 bg-blue-900">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Build Your Future?
        </h2>
        <p className="text-blue-200 max-w-xl mx-auto mb-8 leading-relaxed">
          Whether you are an organization seeking elite talent or a
          professional looking for your next strategic career move, E2E
          Consultancy is your trusted partner.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium px-6 py-3 rounded-full flex items-center gap-2">
            Submit a Vacancy
            <img src={submitImg} alt="" style={{ width: "13.33px", height: "16.67px" }} />
          </button>
          <button className="border border-white/40 hover:bg-white/10 transition-colors text-white font-medium px-6 py-3 rounded-full flex items-center gap-2">
            Upload CV
            <img src={uploadImg} alt="" style={{ width: "13.33px", height: "16.67px" }} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
