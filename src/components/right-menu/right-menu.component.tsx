import React from "react";
import moneyPyramidContent from "../../content/money-pyramid.json";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { currentStepSelector } from "../../store/selectors";
import RightMenuButtonComponent from "./components/right-menu-button.component";
import "./right-menu.styles.css";

type MoneyPyramidType = {
  id: number;
  text: string;
};
type RightMenuComponentType = {
  open: boolean;
};

export const RightMenuComponent: React.FC<RightMenuComponentType> = ({
  open,
}) => {
  const { moneyPyramid }: { moneyPyramid: MoneyPyramidType[] } =
    moneyPyramidContent;
  const { page } = useParams();
  const currentStep = useAppSelector(currentStepSelector);
  const currentPage = currentStep || page;

  const pyramidList = React.useMemo(() => {
    return moneyPyramid.reverse();
  }, []);
  return (
    <div className={`right-menu_wrapper ${open ? "open" : ""}`}>
      {pyramidList.map((pyramid) => (
        <RightMenuButtonComponent
          text={pyramid.text}
          active={currentPage == pyramid.id}
        />
      ))}
    </div>
  );
};

export default RightMenuComponent;
