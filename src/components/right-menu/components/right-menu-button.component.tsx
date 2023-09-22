import React from "react";
import "./right-menu-button.styles.css";

export type RightMenuButtonComponentType = {
  text: string;
  active: boolean;
};

export const RightMenuButtonComponent: React.FC<
  RightMenuButtonComponentType
> = ({ text, active }) => {
  return (
    <button className={`right-menu_button border ${active ? "active" : ""}`}>
      <span className={"right-menu_button__text"}>{text}</span>
    </button>
  );
};

export default RightMenuButtonComponent;
