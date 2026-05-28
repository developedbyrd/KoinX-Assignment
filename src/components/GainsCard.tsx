import type { CapitalGains, CapitalGainsSummary } from "../types";
import {
  formatCurrencyAdaptive,
  formatSignedCurrencyAdaptive,
} from "../utils/format";

interface GainsCardProps {
  preGains: CapitalGains;
  postGains: CapitalGains;
  preSummary: CapitalGainsSummary;
  postSummary: CapitalGainsSummary;
  savings: number;
  showSavings: boolean;
}

interface GainPanelProps {
  title: string;
  isPrimary: boolean;
  gains: CapitalGains;
  summary: CapitalGainsSummary;
  footerLabel: string;
  footerValue: number;
  savings?: number;
  showSavings?: boolean;
}

function GainRow({
  label,
  shortTerm,
  longTerm,
  isPrimary,
  isEmphasized = false,
}: {
  label: string;
  shortTerm: string;
  longTerm: string;
  isPrimary: boolean;
  isEmphasized?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1.15fr_1fr_1fr] items-center gap-3 py-2 text-[14px] md:text-[15px] ${
        isEmphasized ? "pt-1 font-semibold" : "font-medium"
      } ${isPrimary ? "text-white" : "text-slate-900 dark:text-white"}`}
    >
      <span
        className={isPrimary ? "text-white" : "text-slate-900 dark:text-white"}
      >
        {label}
      </span>
      <span className="text-center">{shortTerm}</span>
      <span className="text-center">{longTerm}</span>
    </div>
  );
}

function GainPanel({
  title,
  isPrimary,
  gains,
  summary,
  footerLabel,
  footerValue,
  savings,
  showSavings,
}: GainPanelProps) {
  return (
    <section
      className={`flex h-full flex-col rounded-lg px-4 py-2 ${
        isPrimary
          ? "bg-[linear-gradient(180deg,_#3191FF_0%,_#006AF5_100%)] text-white shadow-[0_28px_70px_rgba(7,89,196,0.28)] dark:shadow-[0_28px_70px_rgba(0,0,0,0.36)]"
          : "bg-white text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:bg-[#1A1E2B] dark:text-white dark:shadow-[0_22px_55px_rgba(0,0,0,0.28)]"
      }`}
    >
      <h2 className="font-heading text-[20px] font-semibold tracking-[-0.02em] md:text-[21px] dark:text-white">
        {title}
      </h2>

      <div className="mt-4 flex-1">
        <div className="grid grid-cols-[1.15fr_1fr_1fr] items-center gap-3 pb-1 text-[14px] md:text-[15px]">
          <span />
          <span
            className={`text-center font-medium ${
              isPrimary ? "text-white" : "text-slate-700 dark:text-slate-200"
            }`}
          >
            Short-term
          </span>
          <span
            className={`text-center font-medium ${
              isPrimary ? "text-white" : "text-slate-700 dark:text-slate-200"
            }`}
          >
            Long-term
          </span>
        </div>

        <GainRow
          label="Profits"
          shortTerm={formatSignedCurrencyAdaptive(gains.stcg.profits, 0, 6)}
          longTerm={formatSignedCurrencyAdaptive(gains.ltcg.profits, 0, 6)}
          isPrimary={isPrimary}
        />
        <GainRow
          label="Losses"
          shortTerm={formatSignedCurrencyAdaptive(-gains.stcg.losses, 0, 6)}
          longTerm={formatSignedCurrencyAdaptive(-gains.ltcg.losses, 0, 6)}
          isPrimary={isPrimary}
        />
        <GainRow
          label="Net Capital Gains"
          shortTerm={formatSignedCurrencyAdaptive(summary.stcgNet, 0, 6)}
          longTerm={formatSignedCurrencyAdaptive(summary.ltcgNet, 0, 6)}
          isPrimary={isPrimary}
          isEmphasized
        />
      </div>

      <div className="mt-4 flex items-center gap-3 md:gap-4">
        <span
          className={`font-heading text-xl font-medium ${
            isPrimary ? "text-white" : "text-slate-900 dark:text-white"
          }`}
        >
          {footerLabel}
        </span>
        <span
          className={`text-[24px] font-semibold tracking-[-0.03em] ${
            isPrimary ? "text-white" : "text-slate-900 dark:text-white"
          }`}
        >
          {formatCurrencyAdaptive(footerValue, 0, 6)}
        </span>
      </div>

      {showSavings && savings !== undefined && savings > 0 ? (
        <div className="mt-auto flex items-center gap-2 pt-5 text-[13px] font-medium text-white md:text-[14px]">
          <span className="text-[18px] leading-none">🎉</span>
          <span>
            You are going to save upto{" "}
            <span className="whitespace-nowrap">
              {formatCurrencyAdaptive(savings, 0, 6)}
            </span>
          </span>
        </div>
      ) : (
        <div className="mt-auto" />
      )}
    </section>
  );
}

export default function GainsCard({
  preGains,
  postGains,
  preSummary,
  postSummary,
  savings,
  showSavings,
}: GainsCardProps) {
  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-2">
      <GainPanel
        title="Pre Harvesting"
        isPrimary={false}
        gains={preGains}
        summary={preSummary}
        footerLabel="Realised Capital Gains:"
        footerValue={preSummary.realised}
      />

      <GainPanel
        title="After Harvesting"
        isPrimary
        gains={postGains}
        summary={postSummary}
        footerLabel="Effective Capital Gains:"
        footerValue={postSummary.realised}
        savings={savings}
        showSavings={showSavings}
      />
    </div>
  );
}
