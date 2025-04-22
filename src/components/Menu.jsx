import React, { useState } from "react";
import ModeSelector from "./ModeSelected";
import "../assets/css/menu.css";

export const MODES = {
  CREATOR: "Creator",
  MANAGER: "Manager",
  PLAY: "Play",
  MENU: "Menu"
};

const Menu = () => {
  const [mode, setMode] = useState(MODES.MENU); // New state for mode selection

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleMenuButtom = () => {
    setMode(MODES.MENU); 
  }

  return (
    <div className="Menu">
      {mode === MODES.MENU ? (
        <div className="menu">
          <div className="mode-selector">
            <button onClick={() => handleModeChange(MODES.CREATOR)}>Crear una Trivia</button>
            <button onClick={() => handleModeChange(MODES.MANAGER)}>Ver mis Trivia</button>
            <button onClick={() => handleModeChange(MODES.PLAY)}>Juegar Trivia</button>
          </div>
        </div>
      ) : (
        <ModeSelector mode={mode} handleMenuButtom={handleMenuButtom} />
      )}
    </div>
  );
};

export default Menu;
