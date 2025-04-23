import React, { useState } from "react";
import SelectorHandler from "./SelectorHandler";
import "../assets/css/menu.css";

export const MODES = {
  CREATOR: "Creator",
  PLAY: "Play",
  MENU: "Menu"
};

const Menu = () => {
  const [mode, setMode] = useState(MODES.MENU); // New state for mode selection

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleMenuButton = () => {
    setMode(MODES.MENU); 
  }

  return (
    <div className="Menu">
      {mode === MODES.MENU ? (
        <div className="menu">
          <div className="mode-selector">
            <button onClick={() => handleModeChange(MODES.CREATOR)}>Crear una Trivia</button>
            <button onClick={() => handleModeChange(MODES.PLAY)}>Juegar Trivia</button>
          </div>
        </div>
      ) : (
        <SelectorHandler mode={mode} handleMenuButton={handleMenuButton} />
      )}
    </div>

  );
};

export default Menu;
