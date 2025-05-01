import React, {useState } from "react";
import { toast } from "react-toastify";
import PreguntaCreador from "../Molecules/PreguntaCreador.jsx";
import TriviaForm from "../Molecules/TriviaForm.jsx"
import TriviaService from "../../service/TriviaService.js";  
import "../../assets/css/triviaCreator.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const triviaService = new TriviaService();

const CreatorSection = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [selectedTrivia, setSelectedTrivia] = useState(null);

  const addQuestion = (newQuestion) => {
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    setQuestionsData((prevQuestions) => [...prevQuestions, newQuestion]);
  };

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
    console.log(selectedTrivia)
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


  return (
    <div className="DeckPage">   
      <div className="DeckCreator">
        {!isReadyToSave ? (
          <div className="creator-menu">
            <h2>Pregunta numero {questionNumber}</h2>
            <PreguntaCreador onAddQuestion={addQuestion} />
            <button onClick={handleFinishQuestions}>Terminar Trivia</button>
          </div>
        ) : (
          <TriviaForm handleBackButton={handleBackButton} handleSave={handleSave} handleShare={handleShare}/>
        )}
      </div>
    </div>
  );

};

export default CreatorSection;