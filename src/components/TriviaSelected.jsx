import React, { useState, useEffect } from "react";
import PreguntaHandler from "./PreguntaHandler.jsx";
import Timer from "./Timer.jsx";
import ShareMenu from "./ShareMenu.jsx";
import "../assets/css/TriviaSelected.css";
import { useNavigate } from 'react-router';

const TriviaSelected = ({ questionsData, timeChosen,handleFinish,randomSort,isVoiceOn,voiceSelected }) => {
  const [cantPreguntas, setCantPreguntas] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [preguntas, setPreguntas] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isAnswered , setIsAnswered ] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [lastQuestionAnswered, setLastQuestionAnswered] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (randomSort) {
      const shuffledQuestions = [...questionsData.questions].sort(
        () => Math.random() - 0.5
      );
      setPreguntas(shuffledQuestions);
    }
    else {
      setPreguntas(questionsData.questions);
    }
    setCantPreguntas(questionsData.questions.length);
  }, [questionsData, randomSort]);

  const handleSiguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1  ) {
      if(preguntaActual >= lastQuestionAnswered) {
        setIsAnswered(false);
        setIsTimerActive(true);
      }
      setPreguntaActual((prev) => prev + 1);
    }
    else {
      setIsFinish(true);
      handleFinish(puntaje);
    }
  };

  const handleAnteriorPregunta = () => {
    if (preguntaActual > 0) {
      setPreguntaActual((prev) => prev - 1);
      setIsAnswered(true);
      setIsTimerActive(false);
    }
  }

  const handleAnswer = () => {
    if(preguntaActual >= lastQuestionAnswered) {
      setLastQuestionAnswered(preguntaActual);  
    }
    setIsAnswered(true);
    setIsTimerActive(false);

  };

  const handleCorrectAnswer = () => {
    setPuntaje((prev) => prev + 1);
    handleAnswer(); 
  }
  
  const handleIncorrectAnswer = () => {
    handleAnswer();
  }

  const handleTimeUp = () => {
    handleSiguientePregunta();
  };

  return (
    <div className="MazoPregunta">
      <h1>Trivia: {questionsData.name}</h1>
      {!isFinish ? (
        <>
          <div className="score-info">
            <h2>Pregunta: {preguntaActual+1} /  {cantPreguntas}</h2>
            <h2>Puntaje: {puntaje}</h2>
            <h2>Tiempo restante: <Timer key={preguntaActual} timeLimit={timeChosen} onTimeUp={handleTimeUp} isActive={isTimerActive} /></h2>
          </div>
            {preguntas.length > 0 && (
              <PreguntaHandler questionData={preguntas[preguntaActual]} onAnswerCorrect={handleCorrectAnswer} onAnswerIncorrect={handleIncorrectAnswer} alreadyResponded={isAnswered} isVoiceOn={isVoiceOn} voiceSelected={voiceSelected} />
            )}
          <div className="pregunta-buttons">
              <button onClick={handleAnteriorPregunta} disabled={preguntaActual === 0} aria-label="Anterior">Anterior</button>
              <button onClick={handleSiguientePregunta} disabled={!isAnswered} aria-label="Siguiente">Siguiente</button>
          </div>
        </>
      ) : (
        <div className="final-score">
          <h2>¡Has terminado!</h2>
          <h2>Respondiste correctamente {puntaje} de {cantPreguntas} preguntas</h2>
          <div className="final-score-buttons">
            {!questionsData.id.startsWith("local") && (
                <ShareMenu 
                  url={window.location.href}
                  text="¡Juega esta trivia!" 
                />
            )}
            <button onClick={() => {navigate("/Play")}} aria-label="Volver al Menu" >Volver al Menu</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default TriviaSelected;