import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import loadingSlice from "./loadingSlice";
import gameSlice from "./gameSlice";

const platformStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
    loading: loadingSlice.reducer,
    game: gameSlice.reducer,
  },
});

export default platformStore;
