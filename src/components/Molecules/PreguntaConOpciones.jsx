import React, { useState, useEffect} from 'react';
import '../../assets/css/preguntaConOpciones.css';

const PreguntaConOpciones = ({ questionData, onAnswerCorrect, onAnswerIncorrect,alredyResponded,isVoiceOn,handleSpeak }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [ampliada, setAmpliada] = useState(false);


  useEffect(() => {
    const options = [...questionData.o];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    if (alredyResponded) {
      setSelectedOption(questionData.r);
    }
    else{
      setSelectedOption(null);
    }
    setShuffledOptions(options);
  }, [questionData]);

  useEffect(() => {

    if (isVoiceOn) {
      handleSpeak(shuffledOptions);
    }
  }, [shuffledOptions]);


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
          setAmpliada(!ampliada);
        }}>
          <img 
            src={questionData.img} 
            alt="Imagen de la pregunta" 
            className={ampliada ? "ampliada" : ""}
          />
        </div>}
      <div className='PreguntaOpciones'>
        {shuffledOptions.map((option, index) => (
          <button
            className={`preguntaOpcion ${selectedOption !== null ? (option === questionData.r ? 'correcta' : (option === selectedOption ? 'incorrecta' : '')) : ''}`}
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PreguntaConOpciones;
