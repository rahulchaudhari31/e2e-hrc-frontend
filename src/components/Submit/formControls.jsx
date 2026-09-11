export const inputClass = (error) =>
  `w-full rounded-full border bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 ${
    error
      ? "border-red-300 focus:border-red-400 focus:ring-red-200"
      : "border-gray-200 focus:border-[#0b3a91] focus:ring-[#0b3a91]/30"
  }`;

export const textareaClass = (error) =>
  `${inputClass(error)} rounded-2xl resize-none`;

export const labelClass = "mb-1.5 block text-sm font-semibold text-[#0b3a91]";

export function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs font-medium text-red-500" role="alert">
      {message}
    </p>
  );
}