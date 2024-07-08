import { createSlice } from "@reduxjs/toolkit";
import { eligibilityThunk } from "./thunk";

export interface EligibilityState {
  isOptedIn: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EligibilityState = {
  isOptedIn: false,
  status: "idle",
  error: null,
};

export const eligibilitySlice = createSlice({
  name: "eligibility",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(eligibilityThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(eligibilityThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isOptedIn = action.payload.isOptedIn;
      })
      .addCase(eligibilityThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default eligibilitySlice.reducer;
