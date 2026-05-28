import { useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Header from './components/Header';
import HowItWorksTooltip from './components/HowItWorksTooltip';
import NotesDropdown from './components/NotesDropdown';
import GainsCard from './components/GainsCard';
import HoldingsTable from './components/HoldingsTable';
import { loadTaxDashboard, toggleAllIds, toggleSelectedId } from './features/tax/taxSlice';
import {
  calculateCapitalGainsSummary,
  calculateHarvestedCapitalGains,
  calculateTaxSavings,
} from './utils/capitalGains';

export default function App() {
  const dispatch = useAppDispatch();
  const { capitalGains, holdings, selectedIds, status, error } = useAppSelector(
    (state) => state.tax,
  );
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (hasRequestedRef.current) {
      return;
    }

    hasRequestedRef.current = true;
    dispatch(loadTaxDashboard());
  }, [dispatch]);

  const selectedHoldings = useMemo(
    () => holdings.filter((holding) => selectedIds.includes(holding.id)),
    [holdings, selectedIds],
  );

  const postGains = useMemo(() => {
    if (!capitalGains) {
      return null;
    }

    return calculateHarvestedCapitalGains(capitalGains, selectedHoldings);
  }, [capitalGains, selectedHoldings]);

  const preSummary = useMemo(() => {
    if (!capitalGains) {
      return null;
    }

    return calculateCapitalGainsSummary(capitalGains);
  }, [capitalGains]);

  const postSummary = useMemo(() => {
    if (!postGains) {
      return null;
    }

    return calculateCapitalGainsSummary(postGains);
  }, [postGains]);

  const savings = useMemo(() => {
    if (!preSummary || !postSummary) {
      return 0;
    }

    return calculateTaxSavings(preSummary.realised, postSummary.realised);
  }, [preSummary, postSummary]);

  const showSavings = useMemo(() => {
    if (!preSummary || !postSummary) {
      return false;
    }

    return preSummary.realised > postSummary.realised;
  }, [preSummary, postSummary]);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="relative isolate min-h-screen overflow-x-hidden bg-gradient-to-b from-[#F7FBFF] to-[#EDF4FF] font-sans text-slate-900 dark:bg-[#0B0D15] dark:text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(21,87,255,0.08),_transparent_30%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_32%)]" />
        <div className="relative z-10">
          <Header />
          <main className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-[1680px] items-center justify-center px-5 py-8 dark:bg-[#0a0a12] md:px-8 lg:px-10">
            <div className="max-w-[520px] rounded-[20px] border border-white/80 bg-white/95 p-8 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100">
              <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-[#1557FF]" />
              <p className="mt-5 text-[15px] leading-[1.6] text-slate-600 dark:text-slate-300">
                Loading capital gains and holdings...
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (status === 'failed' || error || !capitalGains || !preSummary || !postSummary) {
    return (
      <div className="relative isolate min-h-screen overflow-x-hidden bg-gradient-to-b from-[#F7FBFF] to-[#EDF4FF] font-sans text-slate-900 dark:bg-[#0B0D15] dark:text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(21,87,255,0.08),_transparent_30%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_32%)]" />
        <div className="relative z-10">
          <Header />
          <main className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-[1680px] items-center justify-center px-5 py-8 dark:bg-[#0a0a12] md:px-8 lg:px-10">
            <div className="max-w-[520px] rounded-[20px] border border-white/80 bg-white/95 p-8 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1F2] text-[#E11D48]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01M10.29 3.86l-8.01 14A2 2 0 003.01 21h17.98a2 2 0 001.73-3.14l-8.01-14a2 2 0 00-3.46 0z"
                  />
                </svg>
              </div>
              <h2 className="mt-5 text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-slate-100">
                Unable to load dashboard
              </h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-slate-600 dark:text-slate-300">
                {error || 'The mock API request failed. Please try again.'}
              </p>
              <button
                type="button"
                onClick={() => dispatch(loadTaxDashboard())}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1557FF] px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#0f49d1] cursor-pointer"
              >
                Retry
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
      <div className="relative isolate min-h-screen overflow-x-hidden bg-gradient-to-b from-[#F7FBFF] to-[#EDF4FF] font-sans text-slate-900 dark:bg-[#0B0D15] dark:text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(21,87,255,0.08),_transparent_30%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_32%)]" />
      <div className="relative z-10">
        <Header />

        <main className="relative z-10 mx-auto w-full max-w-[1680px] px-4 pt-6 pb-8 dark:bg-[#0a0a12] sm:px-5 sm:pt-8 sm:pb-10 md:px-16 lg:px-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-2 sm:gap-3 md:gap-4">
              <h1 className="font-heading text-[24px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[28px] lg:text-[36px] dark:text-white">
                Tax Harvesting
              </h1>
              <HowItWorksTooltip />
            </div>

            <NotesDropdown />

            <GainsCard
              preGains={capitalGains!}
              postGains={postGains!}
              preSummary={preSummary!}
              postSummary={postSummary!}
              savings={savings}
              showSavings={showSavings}
            />

            <HoldingsTable
              holdings={holdings}
              selectedIds={new Set(selectedIds)}
              onToggleSelect={(id) => dispatch(toggleSelectedId(id))}
              onToggleSelectAll={(checked) => dispatch(toggleAllIds(checked))}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
