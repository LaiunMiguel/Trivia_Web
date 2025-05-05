import "../../assets/css/menu.css";
import { useNavigate } from "react-router";
import React, { useState, useEffect, useRef } from "react";


export const MODES = {
  CREATOR: "Creator",
  PLAY: "Play",
  MENU: "Menu"
};

const Menu = () => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const menuRef = useRef(null);

  const handleModeChange = (newMode) => {
    if (newMode === MODES.CREATOR) {
      navigate("/Create");
    } else if (newMode === MODES.PLAY) {
      navigate("/Play"); // Cambia la ruta a /Play
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleHelpButton = () => {
    setShowInfo(prev => !prev);
  }

  return (
    <div className="Menu">
        <div className="mode-selector">
            <button onClick={() => handleModeChange(MODES.CREATOR)}>Crea tu Trivia</button>
            <button onClick={() => handleModeChange(MODES.PLAY)}>Juega una Trivia</button>
        </div>
        <div className="ayuda_button" ref={menuRef} >
            <button onClick={() => handleHelpButton()}>?</button>
        </div>

        {showInfo && (
          <div className="ayuda-container">
          <h2>Información de los modos</h2>
          <p>
            <strong>Crear tu Trivia:</strong> Te permite crear una trivia con preguntas infinitas. 
            El orden de las respuestas se randomiza automáticamente. Las trivias creadas se pueden 
            guardar y exportar para que otros usuarios las jueguen. No es necesario exportarlas en el momento: 
            también podés exportarlas más tarde desde la sección "Jugar".
          </p>
          <p>
            <strong>Jugar una Trivia:</strong> Podés elegir una trivia para jugar, importar trivias creadas por otros 
            usuarios, definir el tiempo para responder y decidir si las preguntas se presentan en el orden original 
            o de forma aleatoria.
          </p>
        </div>
        )}

    </div>

  );
};

export default Menu;
