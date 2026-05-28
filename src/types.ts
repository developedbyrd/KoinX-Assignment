export interface GainLossDetails {
  balance: number;
  gain: number;
}

export interface Holding {
  id: number;
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainLossDetails;
  ltcg: GainLossDetails;
}

export interface GainsCategory {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: GainsCategory;
  ltcg: GainsCategory;
}

export interface CapitalGainsSummary {
  stcgNet: number;
  ltcgNet: number;
  realised: number;
}
