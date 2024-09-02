/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setEligibilityCheckFlag } from "./slice";

export const eligibilityThunk: any = createAsyncThunk(
  "eligibility/fetch",
  async (_, { dispatch, rejectWithValue, getState }) => {
    const state = getState();
    const eligibilityCheckFlag = (state as any).eligibilityReducer
      .eligibilityCheckFlag;

    // If the flag is already true, don't run the thunk
    if (eligibilityCheckFlag) return;

    try {
      // Set the flag to true to prevent future runs
      dispatch(setEligibilityCheckFlag(true));

      console.count("eligibilityThunk runs");

      // Simulate async operation with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return the desired data
      console.log("eligibilityThunk resolved");
      return { isOptedIn: true };
    } catch (error: any) {
      // If an error occurs, reset the flag to allow retries
      dispatch(setEligibilityCheckFlag(false));
      return rejectWithValue(error.message);
    }
  }
);
