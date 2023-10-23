import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/wards";

const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
  const response = await axios.get(API_URL);
  return response.data.wards;
});

const addWardAsync = createAsyncThunk("wards/addWardAsync", async (newWard) => {
  const response = await axios.post(API_URL, newWard);
  return response.data.wards;
});

const updateWardAsync = createAsyncThunk(
  "wards/updateWardAsync",
  async ({ id, updatedWard }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedWard);
    return response.data.wards;
  }
);

const deleteWardAsync = createAsyncThunk(
  "wards/deleteWardAsync",
  async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.wards;
  }
);

export { fetchWards, addWardAsync, updateWardAsync, deleteWardAsync };
