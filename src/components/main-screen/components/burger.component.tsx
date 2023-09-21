import React from "react";
import "./burger.styles.css";

export type BurgerType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Burger: React.FC<BurgerType> = ({ open, setOpen }) => {
  return (
    <button className="burger-button" onClick={() => setOpen(!open)}>
      <div className={`burger-line ${open ? "open" : ""}`} />
      <div className={`burger-line ${open ? "open" : ""}`} />
      <div className={`burger-line ${open ? "open" : ""}`} />
    </button>
  );
};

export default Burger;
