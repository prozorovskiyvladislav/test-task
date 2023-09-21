import { configureStore } from "@reduxjs/toolkit";
import gameSetupReducer from "./reducers/game-setup.reducer";

export const store = configureStore({
  reducer: {
    gameSetup: gameSetupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
