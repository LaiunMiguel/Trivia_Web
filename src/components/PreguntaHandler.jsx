import React from 'react';
import PreguntaConOpciones from './PreguntaConOpciones.jsx';
import Pregunta from './Pregunta.jsx';

const PreguntaHandler = ({ questionData, onAnswer }) => {
  if (questionData.o) {
    return (
      <PreguntaConOpciones 
        questionData ={questionData}
        onAnswer     = {onAnswer}
      />
    );
  } else {
    return (
      <Pregunta
        questionData ={questionData}
        onAnswer     ={onAnswer}
      />
    );
  }
};

export default PreguntaHandler;
