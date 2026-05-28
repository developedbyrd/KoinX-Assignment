import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getTaxDashboardData } from "../../api/taxApi";
import type { CapitalGains, Holding } from "../../types";

type TaxStatus = "idle" | "loading" | "succeeded" | "failed";

interface TaxState {
  capitalGains: CapitalGains | null;
  holdings: Holding[];
  selectedIds: number[];
  status: TaxStatus;
  error: string | null;
}

const initialState: TaxState = {
  capitalGains: null,
  holdings: [],
  selectedIds: [],
  status: "idle",
  error: null,
};

export const loadTaxDashboard = createAsyncThunk(
  "tax/loadTaxDashboard",
  async () => getTaxDashboardData(),
);

const taxSlice = createSlice({
  name: "tax",
  initialState,
  reducers: {
    toggleSelectedId(state, action: PayloadAction<number>) {
      const id = action.payload;
      const index = state.selectedIds.indexOf(id);

      if (index >= 0) {
        state.selectedIds.splice(index, 1);
        return;
      }

      state.selectedIds.push(id);
    },
    toggleAllIds(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.selectedIds = state.holdings.map((holding) => holding.id);
        return;
      }

      state.selectedIds = [];
    },
    clearSelection(state) {
      state.selectedIds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTaxDashboard.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadTaxDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.capitalGains = action.payload.capitalGains;
        state.holdings = action.payload.holdings;
        state.selectedIds = [];
      })
      .addCase(loadTaxDashboard.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to load holdings and capital gains.";
      });
  },
});

export const { toggleSelectedId, toggleAllIds, clearSelection } =
  taxSlice.actions;
export default taxSlice.reducer;
