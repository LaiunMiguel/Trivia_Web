import TriviasCreator from './TriviaCreator.jsx';
import TriviaSelector from './TriviaSelector.jsx';
import TriviasManajer from './TriviasManajer.jsx';
import '../assets/css/modeSelected.css';

// Import MODES constants
import { MODES } from './Menu.jsx'; // Ensure the path is correct

const ModeSelected = ({ mode, handleMenuButtom }) => {
  return (
    <div className="ModeSelected">

      {mode === MODES.CREATOR ? (
        <TriviasCreator />
      ) : mode === MODES.PLAY ? (
        <TriviaSelector />
      ) : mode === MODES.MANAGER ? (
        <TriviasManajer />
      ) : null}
      <button onClick={() => handleMenuButtom()}>Volver al Menu</button> 
    </div>
  );
};

export default ModeSelected;
