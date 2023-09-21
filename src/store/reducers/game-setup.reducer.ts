import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GameSetupState {
  currentStep: number;
  currentPrize: number;
  initialPrize: number;
}

const initialState: GameSetupState = {
  currentStep: 0,
  currentPrize: 0,
  initialPrize: 500,
};

const gameSetupSlice = createSlice({
  name: "gameSetup",
  initialState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    incrementCurrentPrize(state) {
      if (state.currentPrize) {
        state.currentPrize = state.currentPrize * 2;
        return;
      }
      state.currentPrize = state.initialPrize * 2;
    },
    gameReset(state) {
      state.currentStep = 1;
      state.currentPrize = 0;
    },
  },
});

export const { incrementCurrentPrize, setCurrentStep, gameReset } =
  gameSetupSlice.actions;

export default gameSetupSlice.reducer;
