import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/preguntas.css';

const PreguntaConOpciones = ({ questionData, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    // Shuffle options when questionData changes
    const options = [...questionData.o];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
    setSelectedOption(null);
  }, [questionData]);

  const handleOptionClick = useCallback((option) => {
    setSelectedOption(option);
    onAnswer();
  }, [onAnswer]);

  return (
    <div className='preguntaTarjeta'>
      <h2>{questionData.q}</h2>
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
