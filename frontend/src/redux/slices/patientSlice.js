import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FhirAPI from "@/api/fhirAPI";

// Async Thunks
export const fetchPatientProfile = createAsyncThunk(
  "patient/fetchPatientProfile",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await FhirAPI.getPatientProfile(patientId);
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch patient profile.");
    }
  }
);

export const fetchLabResults = createAsyncThunk(
  "patient/fetchLabResults",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await FhirAPI.getLabResults(patientId);
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch lab results.");
    }
  }
);

export const fetchVitals = createAsyncThunk(
  "patient/fetchVitals",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await FhirAPI.getVitals(patientId);
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch vitals.");
    }
  }
);

// Slice
const patientSlice = createSlice({
  name: "patient",
  initialState: {
    profile: null,
    labResults: [],
    vitals: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPatientData(state) {
      state.profile = null;
      state.labResults = [];
      state.vitals = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Patient Profile
      .addCase(fetchPatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Lab Results
      .addCase(fetchLabResults.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchLabResults.fulfilled, (state, action) => {
        state.labResults = action.payload;
      })
      .addCase(fetchLabResults.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Vitals
      .addCase(fetchVitals.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchVitals.fulfilled, (state, action) => {
        state.vitals = action.payload;
      })
      .addCase(fetchVitals.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearPatientData } = patientSlice.actions;
export default patientSlice.reducer;
