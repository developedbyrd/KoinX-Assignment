import { useState } from "react";

export default function HowItWorksTooltip() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        className="cursor-pointer text-[15px] font-semibold leading-none text-[#0A58FF] underline decoration-1 underline-offset-[5px] transition hover:text-[#0847cf] dark:text-[#4F7DFF] dark:hover:text-[#7EA4FF]"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        How it works?
      </button>

      {isVisible ? (
        <div className="absolute left-0 top-full z-30 mt-3 w-[390px] max-w-[calc(100vw-2rem)]">
          <div className="relative rounded-[14px] bg-[#111827] px-4 py-3 text-[14px] leading-[1.45] text-white shadow-[0_18px_30px_rgba(15,23,42,0.35)] dark:bg-white dark:text-slate-900 dark:shadow-[0_18px_30px_rgba(15,23,42,0.16)]">
            <span className="absolute left-16 top-[-6px] h-3 w-3 rotate-45 bg-[#111827] dark:bg-white" />
            Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh
            semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus
            dui consectetur.{" "}
            <span className="text-[#6BA3FF] underline underline-offset-2 dark:text-[#0A58FF]">
              Know More
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
