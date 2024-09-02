import { createSlice } from "@reduxjs/toolkit";
import { portalThunk } from "./thunk";

export interface PortalState {
  somePortalBoolean: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PortalState = {
  somePortalBoolean: false,
  status: "idle",
  error: null,
};

export const portalSlice = createSlice({
  name: "portal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(portalThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(portalThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.somePortalBoolean = action.payload.somePortalBoolean;
      })
      .addCase(portalThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default portalSlice.reducer;
