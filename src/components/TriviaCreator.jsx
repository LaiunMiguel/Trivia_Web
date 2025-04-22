import React, { useState } from "react";
import PreguntaCreador from "./PreguntaCreador.jsx";
import { handleShareGoogle } from "../utils/triviaUtils.js";
import "../assets/css/triviaCreator.css";

const TriviaCreator = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState(""); 
  const [description, setDescription] = useState("");
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [isReadyToShare, setIsReadyToShare] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedTrivia, setSelectedTrivia] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("");


  const addQuestion = (newQuestion) => {
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    setQuestionsData((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleSave = () => {
    if (name.trim() === "") {
      alert("El nombre de la trivia es obligatorio");
      return false;
    }

    const deck = {
      name: name,
      questions: questionsData,
      canBeExported: true,
      ...(author && { author: author }),
      ...(description && { description: description })
    };

    try {
      const existingDecks = JSON.parse(localStorage.getItem("trivia_decks")) || [];
      
      existingDecks.push(deck);
      
      localStorage.setItem("trivia_decks", JSON.stringify(existingDecks));

      alert("Deck saved successfully!");
      setIsReadyToShare(true);
      setSelectedTrivia(deck);
      setIsSaved(true);
      setSelectedIndex(existingDecks.length - 1);
    } catch (error) {
      console.error("Error saving deck:", error);
      alert("Error saving deck. Please try again.");
    }
  };

  const handleFinishQuestions = () => {
    if (questionsData.length === 0) {
      alert("No se puede guardar un deck sin preguntas");
      return;
    }
    setIsReadyToSave(true);
  };

  const handleShare = () => {
    setIsReadyToShare(false);
    handleShareGoogle(selectedTrivia, selectedIndex);
  };

  return (
    <div className="DeckCreator">
      {!isReadyToSave ? (
        <div className="creator-menu">
          <h2>Pregunta numero {questionNumber}</h2>
          <PreguntaCreador onAddQuestion={addQuestion} />
          <button onClick={handleFinishQuestions}>Terminar Trivia</button>
        </div>
      ) : (
        <div className="config-menu">
          <input
            type="text"
            placeholder="Eligir nombre para tu trivia"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Autor (Opcional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripcion (Opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleSave}  disabled={isSaved}>Guardar Trivia</button>
          <button onClick={handleShare} disabled={!isReadyToShare}>
            Subir Trivia
          </button>
        </div>
      )}
    </div>
  );
};

export default TriviaCreator;