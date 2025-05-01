import React, { useState, useEffect} from 'react';
import '../../assets/css/preguntaConOpciones.css';

const PreguntaConOpciones = ({ questionData, onAnswerCorrect, onAnswerIncorrect,alredyResponded }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

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
