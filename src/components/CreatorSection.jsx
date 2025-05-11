import React, {useState, useEffect } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaTrash } from "react-icons/fa";
import PreguntaCreador from "./PreguntaCreador.jsx";
import TriviaForm from "./TriviaForm.jsx"
import TriviaService from "../service/TriviaService.js";  
import "../assets/css/creatorSection.css";

const triviaService = new TriviaService();

const CreatorSection = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [lastQuestionNumber, setLastQuestionNumber] = useState(0);
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [selectedTrivia, setSelectedTrivia] = useState(null);

  useEffect(() => {
    loadTempTrivias();
  }, []);

  useEffect(() => {
    if (questionsData.length > 0) {
      triviaService.saveTempCreation(questionsData);
    }
  }, [questionsData]);

  const loadTempTrivias = () => {
    const tempTrivias = triviaService.loadTempCreation();
    if (tempTrivias) {
      setQuestionNumber(tempTrivias.length);
      setLastQuestionNumber(tempTrivias.length);
      setQuestionsData(tempTrivias);
    }
    
  }
  const addQuestion = (newQuestion) => {
    
    if (questionNumber < lastQuestionNumber){
      setQuestionsData((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[questionNumber] = newQuestion;
        return updatedQuestions;
      });
    }
    else if (questionNumber === lastQuestionNumber){
      setQuestionsData((prevQuestions) => [...prevQuestions, newQuestion]);
      setLastQuestionNumber((prevLastQuestionNumber) => prevLastQuestionNumber + 1);
    }
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
  };



  // Nueva función para reroceder una pregunta
 
  const handleSave = (formData) => {
    try {
      const trivia = {
        id: null,
        name: formData.name.trim(),
        questions: questionsData,
        canBeExported: true,
        ...(formData.author && { author: formData.author }),
        ...(formData.description && {description:formData.description})
      };
      const triviaSaved = triviaService.saveTrivia(trivia);
      setSelectedTrivia(triviaSaved);
      triviaService.deleteTempCreation();
      toast.success("Trivia guardada exitosamente");
    } 
    catch (error) {
      toast.error("Error al guardar la trivia");
      console.error(error);
    }
  }

  const handleFinishQuestions = () => {
    if (questionsData.length === 0) {
      toast.error("La trivia debe tener al menos una pregunta");
      return;
    }
    confirmReady(true);
  };

  const handleShare = async () => {
    try {
      await triviaService.exportTrivia(selectedTrivia);
      toast.success("Trivia exportada correctamente");
    } catch (error) {
      toast.error("Error al exportar la trivia intentalo mas tarde");
    }
  };

  const handleBackButton = () => {
    setIsReadyToSave(false);
  }


  const confirmReady = () => {
    confirmAlert({
      title: 'Seguro que estas listo?',
      message: 'La pregunta actual no se guardara, ¿deseas continuar?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => setIsReadyToSave(true)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
};

  const handleBeforeQuestion = () => {
    if (questionNumber > 0) {
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber - 1);
    }
  }

  const handleNextQuestion = () => {
    if (questionNumber < lastQuestionNumber) {
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    }
  };

  const handleClickQuestion = (index) => {
    setQuestionNumber(index);
    
  }

  const handleDeleteQuestion = () => {
    if (questionNumber === lastQuestionNumber) {
      toast.error("No puedes eliminar una pregunta no guardada");
      return;
    }
    confirmAlert({
      title: 'Borrar Pregunta?',
      message: 'Esta acción no se puede deshacer, ¿deseas continuar?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            setQuestionsData((prevQuestions) => {
              const updatedQuestions = [...prevQuestions];
              updatedQuestions.splice(questionNumber, 1);
              return updatedQuestions;
            });
            setLastQuestionNumber((prevLastQuestionNumber) => prevLastQuestionNumber - 1);
            if (questionNumber === lastQuestionNumber) {
              setQuestionNumber((prevQuestionNumber) => prevQuestionNumber - 1);
            }
            toast.success("Pregunta eliminada");
          }

        },
        {
          label: 'No',
          onClick: () => {}
        }


      ]
    })
  }



  return (
    <div className="CreationPage">
    {!isReadyToSave ? (
      <div className="TriviaCreatorSection">
      <div className="QuestionsList">
        {questionsData.map((question, index) => (
          <div
            key={index}
            className={`Question ${index === questionNumber ? 'active' : ''}`}
            onClick={() => handleClickQuestion(index)}
          >
            <p>P {index + 1}</p>
          </div>
        ))}
         <div
          className={`Question ${questionNumber === lastQuestionNumber ? 'active' : ''}`}
          onClick={() => handleClickQuestion(lastQuestionNumber)}
          >
          <p>P {lastQuestionNumber + 1}</p>
          </div>
      </div>
      <div className="CreatorWindow">
          <div className="question-header">
            <h2>Pregunta numero {questionNumber + 1}</h2>
            <FaTrash
              className="trash-icon"
              onClick={() => handleDeleteQuestion()}
              title="Eliminar pregunta"
            />
          </div>
        <PreguntaCreador onAddQuestion={addQuestion} questionData={questionsData[questionNumber]} />
      </div>
      <div className="creator-buttons">
              <button onClick={handleBeforeQuestion} disabled={questionNumber < 1} aria-label="Pregunta anterior">Anterior</button>
              <button onClick={handleFinishQuestions} aria-label="Terminar y guardar trivia">Terminar Trivia</button>
              <button onClick={handleNextQuestion} disabled={questionNumber >= lastQuestionNumber} aria-label="Pregunta siguiente">Siguiente</button>
      </div>
    </div>
    ) : (
      <div className="ReadyToSave">
        <TriviaForm handleBackButton={handleBackButton} handleSave={handleSave} handleShare={handleShare}/>
      </div>
    )}
  </div>  
  )

};

export default CreatorSection;