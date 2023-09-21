import * as React from "react";
import "./home-screen.styles.css";
import { useAppDispatch } from "../../hooks";
import { setCurrentStep } from "../../store/reducers/game-setup.reducer";
import { useNavigate } from "react-router-dom";

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleGameStart = () => {
    dispatch(setCurrentStep(1));
    navigate("/question/1");
  };

  return (
    <div className="home-screen-wrapper">
      <div className="home-screen-content">
        <div className="home-screen_image-wrapper">
          <img src="/images/hand.png" alt="hand" />
        </div>
        <div className="home-screen_text-wrapper">
          <h1 className="text-wrapper_text">Who wants to be a millionaire?</h1>
          <button className="text-wrapper_button" onClick={handleGameStart}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
