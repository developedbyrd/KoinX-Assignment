import type { CapitalGains, CapitalGainsSummary, Holding } from "../types";

export function calculateCapitalGainsSummary(
  gains: CapitalGains,
): CapitalGainsSummary {
  const stcgNet = gains.stcg.profits - gains.stcg.losses;
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses;

  return {
    stcgNet,
    ltcgNet,
    realised: stcgNet + ltcgNet,
  };
}

export function calculateHarvestedCapitalGains(
  baseGains: CapitalGains,
  selectedHoldings: Holding[],
) {
  const nextGains: CapitalGains = {
    stcg: { ...baseGains.stcg },
    ltcg: { ...baseGains.ltcg },
  };

  for (const holding of selectedHoldings) {
    if (holding.stcg.gain > 0) {
      nextGains.stcg.profits += holding.stcg.gain;
    } else if (holding.stcg.gain < 0) {
      nextGains.stcg.losses += Math.abs(holding.stcg.gain);
    }

    if (holding.ltcg.gain > 0) {
      nextGains.ltcg.profits += holding.ltcg.gain;
    } else if (holding.ltcg.gain < 0) {
      nextGains.ltcg.losses += Math.abs(holding.ltcg.gain);
    }
  }

  return nextGains;
}

export function calculateTaxSavings(preRealised: number, postRealised: number) {
  return preRealised > postRealised ? preRealised - postRealised : 0;
}
