import { useState } from "react";

const notes = [
  "Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.",
  "Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.",
  "Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.",
  "Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.",
  "Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.",
];

export default function NotesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="overflow-hidden rounded-lg border border-[#2D73FF] bg-[#EDF4FF] shadow-[0_10px_30px_rgba(37,99,235,0.05)] dark:border-[#4A74E7] dark:bg-[#182348] dark:shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-3 py-2 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-1 text-slate-900 dark:text-white">
          <span className="flex h-7 w-7 items-center justify-center text-[#1557FF] dark:text-[#6C95FF]">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 16v-4m0-4h.01M12 21a9 9 0 100-18 9 9 0 000 18z"
              />
            </svg>
          </span>
          <span className="text-[14px] font-semibold leading-tight md:text-[15px] dark:text-white">
            Important Notes &amp; Disclaimers
          </span>
        </div>

        <svg
          className={`h-5 w-5 shrink-0 text-slate-600 transition-transform duration-200 dark:text-slate-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.25"
            d="m6 9 6 6 6-6"
          />
        </svg>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="list-disc space-y-2 px-6 pb-5 pl-11 pr-6 text-[13px] leading-[1.45] text-slate-900 dark:text-slate-100 md:text-[14px]">
            {notes.map((note) => (
              <li key={note} className="pl-1">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
