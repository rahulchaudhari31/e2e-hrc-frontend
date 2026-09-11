import { useState } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";

export default function SubmissionSuccess({ title, message, onReset }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-2xl">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 size={44} className="text-emerald-600" />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-[#0b3a91]">{title}</h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
        {message}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0b3a91] to-[#1d56c9] px-6 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
        >
          <RotateCcw size={16} aria-hidden="true" />
          Submit another response
        </button>
      )}
    </div>
  );
}