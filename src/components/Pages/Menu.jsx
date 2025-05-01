import "../../assets/css/menu.css";
import { useNavigate } from "react-router";


export const MODES = {
  CREATOR: "Creator",
  PLAY: "Play",
  MENU: "Menu"
};

const Menu = () => {
  const navigate = useNavigate(); // Usa useNavigate

  const handleModeChange = (newMode) => {
    if (newMode === MODES.CREATOR) {
      navigate("/Create");
    } else if (newMode === MODES.PLAY) {
      navigate("/Play"); // Cambia la ruta a /Play
    }
  };

  return (
    <div className="Menu">
          <div className="mode-selector">
            <button onClick={() => handleModeChange(MODES.CREATOR)}>Crea tu Trivia</button>
            <button onClick={() => handleModeChange(MODES.PLAY)}>Juega una Trivia</button>
        </div>
    </div>

  );
};

export default Menu;
