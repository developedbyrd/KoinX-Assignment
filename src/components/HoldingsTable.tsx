import { useEffect, useMemo, useRef, useState } from "react";
import type { Holding } from "../types";
import {
  formatCompactNumber,
  formatCurrencyAdaptive,
  formatHoldingAmount,
  formatSignedCurrencyAdaptive,
} from "../utils/format";

interface HoldingsTableProps {
  holdings: Holding[];
  selectedIds: Set<number>;
  onToggleSelect: (id: number) => void;
  onToggleSelectAll: (checked: boolean) => void;
}

export default function HoldingsTable({
  holdings,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: HoldingsTableProps) {
  const [showAll, setShowAll] = useState(false);
  const headerCheckboxRef = useRef<HTMLInputElement | null>(null);

  const visibleHoldings = useMemo(
    () => (showAll ? holdings : holdings.slice(0, 5)),
    [holdings, showAll],
  );

  const isAllSelected = useMemo(
    () =>
      holdings.length > 0 &&
      holdings.every((holding) => selectedIds.has(holding.id)),
    [holdings, selectedIds],
  );

  const isSomeSelected = useMemo(
    () =>
      holdings.some((holding) => selectedIds.has(holding.id)) && !isAllSelected,
    [holdings, isAllSelected, selectedIds],
  );

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeSelected;
    }
  }, [isSomeSelected]);

  return (
    <section className="rounded-lg bg-white px-4 py-5 shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:bg-[#1A1E2B] dark:text-white dark:shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <div className="mb-5">
        <h2 className="font-heading text-[22px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white md:text-[23px]">
          Holdings
        </h2>
      </div>

      <div className="max-h-[460px] overflow-auto dark:[scrollbar-color:#3E4966_#0E1018] dark:[scrollbar-width:thin]">
        <table className="min-w-[1180px] w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[58px]" />
            <col className="w-[278px]" />
            <col className="w-[190px]" />
            <col className="w-[176px]" />
            <col className="w-[174px]" />
            <col className="w-[174px]" />
            <col className="w-[180px]" />
          </colgroup>
          <thead>
            <tr className="text-[14px] font-medium text-[#0F172A] dark:text-white md:text-[15px]">
              <th className="sticky top-0 z-20 rounded-l-lg bg-[#EEF4FB] px-5 py-2 text-center align-middle dark:bg-[#0D0F17]">
                <input
                  ref={headerCheckboxRef}
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(event) => onToggleSelectAll(event.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded-[3px] border-2 border-slate-400 text-[#1557FF] focus:ring-[#1557FF] dark:border-slate-500 dark:text-[#5B80FF]"
                />
              </th>
              <th className="sticky top-0 z-20 bg-[#EEF4FB] px-5 py-2 text-left font-medium dark:bg-[#0D0F17]">
                Asset
              </th>
              <th className="sticky top-0 z-20 bg-[#EEF4FB] px-5 py-2 text-right font-medium dark:bg-[#0D0F17]">
                <div>Holdings</div>
                <div className="text-[13px] font-normal text-slate-500 dark:text-slate-400 md:text-[13px]">
                  Current Market Rate
                </div>
              </th>
              <th className="sticky top-0 z-20 bg-[#EEF4FB] px-5 py-2 text-right font-medium dark:bg-[#0D0F17]">
                Total Current Value
              </th>
              <th className="sticky top-0 z-20 bg-[#EEF4FB] px-5 py-2 text-right font-medium dark:bg-[#0D0F17]">
                Short-term
              </th>
              <th className="sticky top-0 z-20 bg-[#EEF4FB] px-5 py-2 text-right font-medium dark:bg-[#0D0F17]">
                Long-Term
              </th>
              <th className="sticky top-0 z-20 rounded-r-lg bg-[#EEF4FB] px-5 py-2 text-right font-medium dark:bg-[#0D0F17]">
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((item) => {
              const isSelected = selectedIds.has(item.id);
              const currentValue = item.currentPrice * item.totalHolding;

              return (
                <tr
                  key={item.id}
                  className={`border-b border-[#D9E3F3] transition-colors duration-150 ${
                    isSelected
                      ? "bg-[#EAF1FF] dark:bg-[#13234C]"
                      : "hover:bg-slate-50 dark:border-[#2D3245] dark:hover:bg-[#1F2436]"
                  }`}
                >
                  <td className="px-5 py-3 text-center align-middle">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(item.id)}
                      className="h-4 w-4 cursor-pointer rounded-[3px] border-2 border-slate-400 text-[#1557FF] focus:ring-[#1557FF] dark:border-slate-500 dark:text-[#5B80FF]"
                    />
                  </td>
                  <td className="px-5 py-3 align-middle">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.logo}
                        alt={item.coinName}
                        className="h-8 w-8 rounded-full object-cover"
                        onError={(event) => {
                          const imageElement = event.currentTarget;
                          imageElement.src =
                            "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
                        }}
                      />
                      <div className="leading-tight">
                        <div className="text-[16px] font-semibold text-slate-900 dark:text-white md:text-[15px]">
                          {item.coinName}
                        </div>
                        <div className="mt-1 text-[14px] text-slate-700 dark:text-slate-300 md:text-[13px]">
                          {item.coin}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right align-middle">
                    <div className="whitespace-nowrap text-[17px] font-medium text-slate-900 dark:text-white md:text-[16px]">
                      {formatHoldingAmount(item.totalHolding)} {item.coin}
                    </div>
                    <div className="mt-1 text-[13px] text-slate-500 dark:text-slate-400 md:text-[13px]">
                      {formatCurrencyAdaptive(item.currentPrice, 2, 6)}/
                      {item.coin}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right align-middle">
                    <div className="whitespace-nowrap text-[17px] font-semibold text-slate-900 dark:text-white md:text-[16px]">
                      {formatCurrencyAdaptive(currentValue, 2, 6)}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right align-middle">
                    <div
                      className={`whitespace-nowrap text-[17px] font-semibold md:text-[16px] ${
                        item.stcg.gain >= 0
                          ? "text-emerald-500 dark:text-emerald-300"
                          : "text-rose-500 dark:text-rose-400"
                      }`}
                    >
                      {formatSignedCurrencyAdaptive(item.stcg.gain, 2, 6)}
                    </div>
                    <div className="mt-1 text-[13px] text-slate-500 dark:text-slate-400 md:text-[13px]">
                      {formatCompactNumber(item.stcg.balance, 6)} {item.coin}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right align-middle">
                    <div
                      className={`whitespace-nowrap text-[17px] font-semibold md:text-[16px] ${
                        item.ltcg.gain >= 0
                          ? "text-emerald-500 dark:text-emerald-300"
                          : "text-rose-500 dark:text-rose-400"
                      }`}
                    >
                      {formatSignedCurrencyAdaptive(item.ltcg.gain, 2, 6)}
                    </div>
                    <div className="mt-1 text-[13px] text-slate-500 dark:text-slate-400 md:text-[13px]">
                      {formatCompactNumber(item.ltcg.balance, 6)} {item.coin}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right align-middle">
                    <div className="text-[17px] font-medium text-slate-900 dark:text-white md:text-[16px]">
                      {isSelected
                        ? `${formatHoldingAmount(item.totalHolding)} ${item.coin}`
                        : "-"}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {holdings.length > 5 ? (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 text-[16px] font-medium text-[#1557FF] underline decoration-1 underline-offset-[5px] transition hover:text-[#0f49d1] dark:text-[#5B80FF] dark:hover:text-[#8CA7FF]"
        >
          {showAll ? "View less" : "View all"}
        </button>
      ) : null}
    </section>
  );
}
