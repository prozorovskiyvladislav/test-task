import * as React from "react";
import "./result-screen.styles.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  gameReset,
  setCurrentStep,
} from "../../store/reducers/game-setup.reducer";
import { useNavigate } from "react-router-dom";
import { currentPrizeSelector } from "../../store/selectors";

export const ResultScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentPrize = useAppSelector(currentPrizeSelector);
  const navigate = useNavigate();
  const handleGameReStart = () => {
    dispatch(gameReset());
    dispatch(setCurrentStep(1));
    navigate("/question/1");
  };

  return (
    <div className="result-screen-wrapper">
      <div className="result-screen-content">
        <div className="result-screen_image-wrapper">
          <img src="/images/hand.png" alt="hand" />
        </div>
        <div className="result-screen_text-wrapper">
          <h3 className="result-screen_text-wrapper_subtitle">Total Score:</h3>
          <h1 className="result-screen_text-wrapper_text">
            {`$ ${currentPrize} earned`}
          </h1>
          <button
            className="result-screen_text-wrapper_button"
            onClick={handleGameReStart}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
