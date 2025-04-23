import CreatorSection from './CreatorSection.jsx';
import PlaySection from './PlaySection.jsx';
import '../assets/css/modeSelected.css';

// Import MODES constants
import { MODES } from './Menu.jsx'; // Ensure the path is correct

const SelectorHandler = ({ mode, handleMenuButton }) => {
  return (
    <div className="ModeSelected">

      {mode === MODES.CREATOR ? (
        <CreatorSection />
      ) : mode === MODES.PLAY ? (
        <PlaySection handleMenuButton = {handleMenuButton}/>
      ) : null}
      <button onClick={() => handleMenuButton()}>Volver al Menu</button> 
    </div>
  );
};

export default SelectorHandler;
