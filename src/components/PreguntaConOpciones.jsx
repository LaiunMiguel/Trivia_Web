import React, { useState, useEffect} from 'react';
import '../assets/css/preguntaConOpciones.css';

const PreguntaConOpciones = ({ questionData, onAnswerCorrect, onAnswerIncorrect,alreadyResponded,isVoiceOn,handleSpeak }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [zoom, setZoom] = useState(false);


  useEffect(() => {
    const handleSpeakQuestion = (options) => {
      if (isVoiceOn) {
        handleSpeak(options);     
      }
    }
    const options = shuffleArray(questionData.o);
    setShuffledOptions(options);
    handleSpeakQuestion(options);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionData]);


  useEffect(() => {
    if (alreadyResponded && selectedOption === null) {
      setShuffledOptions(questionData.o);
      setSelectedOption(questionData.r);
    }
    else if (!alreadyResponded){
      setSelectedOption(null);
    }
  
  }, [alreadyResponded, questionData, selectedOption]);



  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === questionData.r) {
      onAnswerCorrect(); 
    }
    else{
      onAnswerIncorrect();
    }
  }

  return (
    <div className='preguntaTarjetaOpciones'>
      <h2>{questionData.q}</h2>
      {questionData.img && 
        <div className="imagen-container" onClick={(e) => {
          e.stopPropagation();
          setZoom(!zoom);
        }}>
          <img 
            src={questionData.img} 
            alt="Imagen de la pregunta" 
            className={zoom ? "zoomed" : ""}
          />
        </div>}
      <div className='PreguntaOpciones'>
        {shuffledOptions.map((option, index) => (
          <button
            className={`preguntaOpcion ${selectedOption !== null ? (option === questionData.r ? 'correcta' : (option === selectedOption ? 'incorrecta' : '')) : ''}`}
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            aria-label={option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PreguntaConOpciones;

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}