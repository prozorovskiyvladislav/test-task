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
    <a
      href="#"
      className={`right-menu_button border ${active ? "active" : ""}`}
    >
      <span className={"right-menu_button__text"}>{text}</span>
    </a>
  );
};

export default RightMenuButtonComponent;
