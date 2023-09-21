import * as React from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import questionsContent from "../../content/questions.json";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { currentStepSelector } from "../../store/selectors";
import "./main-screen.styles.css";
import MainMenuButtonComponent from "./components/main-menu-button.component";
import RightMenuComponent from "../right-menu/right-menu.component";
import Burger from "./components/burger.component";
import { setCurrentStep } from "../../store/reducers/game-setup.reducer";

type Answer = {
  text: string;
  correct: boolean;
};
type QuestionsType = {
  [key: string | number]: {
    id: string;
    question: string;
    answers: Array<Answer>;
  };
};

type PageType = {
  page: string;
};

export const MainScreen: React.FC = () => {
  const { page } = useParams<PageType>();
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(currentStepSelector);
  const [isOpen, setOpen] = React.useState(false);
  const convertedPage = typeof page === "string" ? parseInt(page) : 1;

  const currentPage = currentStep || convertedPage;

  const { questions }: { questions: QuestionsType } = questionsContent;

  const currentQuestion = React.useMemo(() => {
    if (currentPage) {
      return questions[currentPage];
    }
  }, [currentPage]);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  React.useEffect(() => {
    dispatch(setCurrentStep(currentPage));
  }, [currentPage]);

  return (
    <div className="main-screen">
      <div className="main-screen_wrapper">
        {!isDesktopOrLaptop && <Burger open={isOpen} setOpen={setOpen} />}
        <div className="main-screen_content">
          <h1 className="main-screen_title">{currentQuestion?.question}</h1>
          <div className="main-screen_questions">
            {currentQuestion &&
              currentQuestion.answers.map((answer, key) => {
                return (
                  <MainMenuButtonComponent
                    answer={answer}
                    id={key.toString()}
                  />
                );
              })}
          </div>
        </div>
        <RightMenuComponent open={isOpen} />
      </div>
    </div>
  );
};

export default MainScreen;
