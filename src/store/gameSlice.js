import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosApi";
import { saveAs } from "file-saver"; // Import FileSaver for file download handling

// Initial state for games
const initialState = {
  games: [],
  file: [],
  searchError: null,
  loading: false,
  downloadData: null,
  downloadError: null,
};

// Helper function to handle API errors
const handleApiError = (error) => {
  return error?.response?.data || "An unexpected error occurred";
};

// Async thunk to fetch games from the API
export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (gameData, { rejectWithValue }) => {
    try {
      const response = await api.post("/searchGames", gameData);
      const games = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      return games;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Async thunk to handle the download action (non-file response)
export const downloadGame = createAsyncThunk(
  "games/downloadGame",
  async (downloadData, { rejectWithValue }) => {
    try {
      const response = await api.get("/downloadGame", { params: downloadData });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Async thunk to handle file download action
export const downloadFile = createAsyncThunk(
  "games/downloadFile",
  async (downloadData, { rejectWithValue }) => {
    try {
      const response = await api.get("/downloadGame", {
        params: downloadData,
        responseType: "blob", // Important to specify responseType as blob for file download
      });

      const fileBlob = response.data;
      const fileName = downloadData?.fileName || "downloaded_file"; // Default filename if not provided
      saveAs(fileBlob, fileName); // Trigger the download using FileSaver.js

      return { success: true, fileName };
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.searchError = action.payload;
    },
    clearGames: (state) => {
      state.games = [];
      state.searchError = null;
    },
    clearDownloadData: (state) => {
      state.downloadData = null;
      state.downloadError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchGames states
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.searchError = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.searchError = action.payload;
      })

      // Handling downloadGame states
      .addCase(downloadGame.pending, (state) => {
        state.loading = true;
        state.downloadError = null;
      })
      .addCase(downloadGame.fulfilled, (state, action) => {
        state.loading = false;
        state.downloadData = action.payload;
      })
      .addCase(downloadGame.rejected, (state, action) => {
        state.loading = false;
        state.downloadError = action.payload;
      })

      // Handling downloadFile states
      .addCase(downloadFile.pending, (state) => {
        state.loading = true;
        state.downloadError = null;
      })
      .addCase(downloadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.downloadData = {
          success: true,
          fileName: action.payload.fileName,
        };
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.loading = false;
        state.downloadError = action.payload;
      });
  },
});

// Export actions and reducer
export const gameActions = gameSlice.actions;
export default gameSlice;
