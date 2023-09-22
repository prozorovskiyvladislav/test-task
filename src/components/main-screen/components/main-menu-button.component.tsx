import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import "./main-menu-button.styles.css";
import { useNavigate } from "react-router-dom";
import { currentStepSelector } from "../../../store/selectors";
import {
  incrementCurrentPrize,
  setCurrentStep,
} from "../../../store/reducers/game-setup.reducer";

export type MainMenuButtonComponentType = {
  answer: {
    text: string;
    correct: boolean;
  };
  id: string;
};

const answerPrefix: { [key: string]: string } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
};

const LAST_STEP = 12;
const ONE_STEP = 1;

export const MainMenuButtonComponent: React.FC<MainMenuButtonComponentType> = ({
  answer,
  id,
}) => {
  const { text, correct } = answer;
  const currentStep = useAppSelector(currentStepSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (correct && currentStep != LAST_STEP) {
      navigate(`/question/${currentStep + ONE_STEP}`);
      dispatch(setCurrentStep(currentStep + ONE_STEP));
      dispatch(incrementCurrentPrize());
    } else {
      navigate("/result");
    }
  };
  return (
    <button className="main-menu_button border" onClick={handleButtonClick}>
      {id && (
        <span className="main-menu_button__prefix">{answerPrefix[id]} </span>
      )}
      <span className={"main-menu_button__text"}>{text}</span>
    </button>
  );
};

export default MainMenuButtonComponent;
