import React from 'react';
import PreguntaConOpciones from './PreguntaConOpciones.jsx';
import Pregunta from './Pregunta.jsx';

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
