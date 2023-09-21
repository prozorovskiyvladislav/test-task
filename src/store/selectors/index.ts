import { RootState } from "../index";
import { createSelector } from "@reduxjs/toolkit";

export const gameSetupSelector = (state: RootState) => state.gameSetup;
export const currentPrizeSelector = createSelector(
  [gameSetupSelector],
  (setup) => setup.currentPrize,
);
export const currentStepSelector = createSelector(
  [gameSetupSelector],
  (setup) => setup.currentStep,
);
