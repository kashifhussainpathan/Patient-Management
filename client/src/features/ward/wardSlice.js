import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWards,
  addWardAsync,
  updateWardAsync,
  deleteWardAsync,
} from "./wardApi";

const initialState = {
  wards: [],
  status: "idle",
  error: null,
  showWardForm: false,
};

const wardSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {
    setShowWardForm: (state, action) => {
      state.showWardForm = action.payload;
    },
  },
  extraReducers: {
    [fetchWards.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWards.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = action.payload;
    },
    [fetchWards.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = action.payload;
    },
    [addWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedWards = action.payload;
      state.wards = updatedWards;
    },
    [updateWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = action.payload;
    },
    [deleteWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { setShowWardForm } = wardSlice.actions;

export default wardSlice.reducer;
