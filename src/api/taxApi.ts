import { fetchCapitalGains, fetchHoldings } from "../mockData";
import type { CapitalGains, Holding } from "../types";

const shouldMockError = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  return params.get("mockError") === "1";
};

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export function getCapitalGains(): Promise<CapitalGains> {
  return fetchCapitalGains();
}

export function getHoldings(): Promise<Holding[]> {
  return fetchHoldings();
}

export async function getTaxDashboardData() {
  if (shouldMockError()) {
    await delay(300);
    throw new Error("Mock API error");
  }

  const [capitalGains, holdings] = await Promise.all([
    getCapitalGains(),
    getHoldings(),
  ]);

  return {
    capitalGains,
    holdings,
  };
}
