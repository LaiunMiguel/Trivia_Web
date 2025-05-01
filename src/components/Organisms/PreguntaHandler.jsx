import React from 'react';
import PreguntaConOpciones from '../Molecules/PreguntaConOpciones.jsx';
import Pregunta from '../Molecules/Pregunta.jsx';

const PreguntaHandler = ({ questionData, onAnswerCorrect, onAnswerIncorrect, alredyResponded }) => {
  if (questionData.o) {
    return (
      <PreguntaConOpciones 
        questionData ={questionData}
        onAnswerCorrect={onAnswerCorrect}
        onAnswerIncorrect={onAnswerIncorrect}
        alredyResponded={alredyResponded}
      />
    );
  } else {
    return (
      <Pregunta
        questionData ={questionData}
        onAnswerCorrect={onAnswerCorrect}
        onAnswerIncorrect={onAnswerIncorrect  }
        alredyResponded={alredyResponded}
      />
    );
  }
};

export default PreguntaHandler;
