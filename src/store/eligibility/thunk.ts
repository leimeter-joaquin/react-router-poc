/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { log } from "../../logger";

export const eligibilityThunk: any = createAsyncThunk(
  "eligibility/fetch",
  async (_, { rejectWithValue }) => {
    try {
      log("eligibilityThunk runs", "white");

      // Simulate async operation with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      log("eligibilityThunk resolved", "darkkhaki");
      return { isOptedIn: true };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
