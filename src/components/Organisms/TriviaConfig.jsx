import React, { useState, useEffect, useRef} from "react";
import TriviaSelected from "./TriviaSelected.jsx";
import TriviaService from "../../service/TriviaService.js";
import { useParams } from 'react-router';
import { toast } from "react-toastify";


const TriviaConfig = () => {
  const { trivia_id } = useParams();
  const [isConfigured, setIsConfigured] = useState(false);
  const [timeChosen, setTimeChosen] = useState(60);
  const [randomSort, setRandomSort] = useState(false);
  const [vozActive, setVozActive] = useState(false);
  const [triviaSelected, setTriviaSelected] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const menuRef = useRef(null);

  
  // --- Voz ---
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // --- Service ---
  const triviaService = new TriviaService();

  useEffect(() => {
    const trivia = triviaService.getTriviaById(trivia_id);
    setTriviaSelected(trivia);
  }, [trivia_id]);

  useEffect(() => {
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);
  }, [vozActive]);

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

  const handleFinish = (score) => {
    triviaService.markAsResolved(triviaSelected, score);
  }

  const handeChangeRandomSort = () => {
    setRandomSort(prev => !prev);
  }

  const handeChangeVozActive = () => {
    setVozActive(prev =>!prev);
  }

  const handleImport = async () => {
    setIsImporting(true);
    try {
      await triviaService.importOnly(trivia_id);
      toast.success("Trivia importada correctamente");
      setTriviaSelected(triviaService.getTriviaById(trivia_id));
    } catch (error) {
      toast.error(error.message);
    }  }

  const handleComenzar = () => {
    if (timeChosen <= 0) {
      toast.error("El tiempo debe ser mayor a 0");
      return;
    }
    if (vozActive && !selectedVoice) {
      toast.error("Debe seleccionar una voz");
      return;
    }
    setIsConfigured(true);
  };

  const handleHelpButton = () => {
    setShowInfo(prev =>!prev);
  }

  return (
    <div className="ConfigTrivia">
      {!triviaSelected ? (
      <div className="final-score">
        <h2>No tienes esta trivia!</h2>
        <h2>Prueba importarla si existe!</h2>
        <button onClick={handleImport} disabled ={isImporting}>Importar</button>
      </div>
      ) : !isConfigured ? (
        <div className="deck-config">
          <h1>Configuración de Trivia</h1>
          <div className="deck-config-menu">
            <p>Elige el tiempo de la trivia:</p>
            <input
              type="number"
              value={timeChosen}
              onChange={(e) => setTimeChosen(e.target.value)}
            />
            <p>Las preguntas se dan en orden aleatorio:</p>
            <input
              id="multiple-choice"
              type="checkbox"
              checked={randomSort}
              onChange={handeChangeRandomSort}
            />
            <p>Voz Lectora:</p>
            <input
              id="multiple-choice"
              type="checkbox"
              checked={vozActive}
              onChange={handeChangeVozActive}
            />
          </div>
          {vozActive && 
            <select value={selectedVoice?.name || ""} onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value);
                  setSelectedVoice(voice);
                }}>
                  <option value="">Seleccionar voz</option>
                  {voices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
            </select>}


          <div className="ayuda-play" ref={menuRef}>
          <button onClick={() => handleComenzar()}>Comenzar</button>
            <button onClick={() => handleHelpButton()}>?</button>
          </div>


          {showInfo && (
          <div className="ayuda-container-play">
            <h2>¿Cómo jugar y configurar la trivia?</h2>
            <p><strong>Tiempo:</strong> Elige el tiempo para responder cada pregunta.</p>
            <p><strong>Orden aleatorio:</strong> Marca esta opción si quieres que el orden en que aparecen las preguntas sea aleatorio </p>
            <p><strong>Voz lectora:</strong> Marca esta opción si quieres activar la voz lectora. <strong>Importante</strong> las voces disponibles dependen de tu navegador.<br/></p>
            <p><strong>Cómo se juega:</strong> Responde cada pregunta seleccionando la opción correcta o si no tienen opciones dando vuelta la tarjeta.</p>
            <p><strong>Voz activa:</strong>Si activaste la voz, las preguntas se leerán en voz alta y despues las opciones.</p>
            <p><strong>Imagenes:</strong> La trivia puede contener imagenes al presionarlas aumentan su tamaño.</p>
          </div>
          )}
        </div>
      ) : (
        <TriviaSelected questionsData={triviaSelected} timeChosen={timeChosen} handleFinish={handleFinish} randomSort={randomSort} isVoiceOn={vozActive} voiceSelected={selectedVoice}/>
      )}
    </div>
  );
};

export default TriviaConfig;
