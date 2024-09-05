/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { log } from "../../logger";

export const eligibilityThunk: any = createAsyncThunk(
  "eligibility/fetch",
  async (_, { rejectWithValue }) => {
    try {
      log("eligibilityThunk runs", "gray");

      // Simulate async operation with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      log("eligibilityThunk resolved", "gray");
      return { isOptedIn: false };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
