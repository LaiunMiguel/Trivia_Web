import React from 'react';
import PreguntaConOpciones from '../Molecules/PreguntaConOpciones.jsx';
import Pregunta from '../Molecules/Pregunta.jsx';

const PreguntaHandler = ({ questionData, onAnswerCorrect, onAnswerIncorrect }) => {
  if (questionData.o) {
    return (
      <PreguntaConOpciones 
        questionData ={questionData}
        onAnswerCorrect={onAnswerCorrect}
        onAnswerIncorrect={onAnswerIncorrect}
      />
    );
  } else {
    return (
      <Pregunta
        questionData ={questionData}
        onAnswerCorrect={onAnswerCorrect}
        onAnswerIncorrect={onAnswerIncorrect  }
      />
    );
  }
};

export default PreguntaHandler;
