/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

export const eligibilityThunk: any = createAsyncThunk(
  "eligibility/fetch",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate async operation with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return the desired data
      return { isOptedIn: true };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
