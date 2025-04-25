import "../assets/css/preguntaCreador.css";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PreguntaCreador = ({ onAddQuestion }) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);

  // Maneja la actualización de la pregunta
  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  // Maneja la actualización de las opciones
  const handleResponseChange = (index, value) => {
    if (index === 0) {
      setCorrectAnswer(value);
    }
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleToggleMultipleChoice = () => {
    setIsMultipleChoice((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionText || !correctAnswer) {
      if (!questionText) {
        toast.warning("Por favor, completa el campo de pregunta.");
        return;
      }
      toast.warning("Por favor, completa el campo de respuesta correcta.");
      return;
    }

    const newQuestion = {
      q: questionText, // pregunta
      r: correctAnswer, // respuesta correcta
      ...(isMultipleChoice && { o: options }), // opciones si es múltiple
    };

    onAddQuestion(newQuestion);

    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  return (
    <div className="question-creator">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pregunta:</label>
          <input 
            type="text"
            value={questionText}
            maxLength={100}
            onChange={handleQuestionChange}
            placeholder="Escribe la pregunta"
          />
        </div>

        <div className="multipleBox">
          <label htmlFor="multiple-choice">¿Es una pregunta de opción múltiple?</label>
          <input
            id="multiple-choice"
            type="checkbox"
            checked={isMultipleChoice}
            onChange={handleToggleMultipleChoice}
          />
        </div>

        {isMultipleChoice && (
          <>
            <div>
              <label>Opciones:</label>
              <div className="options-grid">
                {options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    maxLength={45}
                    onChange={(e) =>
                      handleResponseChange(index, e.target.value)
                    }
                    placeholder={
                      index === 0
                        ? "Respuesta correcta"
                        : "Respuesta incorrecta"
                    }
                    className={
                      index === 0 ? "correct-option" : "incorrect-option"
                    }
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {!isMultipleChoice && (
          <div>
            <label>Respuesta Correcta:</label>
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => handleResponseChange(0, e.target.value)}
              placeholder="Respuesta correcta"
              maxLength={45}
            />
          </div>
        )}

        <button type="submit">Agregar Pregunta</button>
      </form>
    </div>
  );
};

export default PreguntaCreador;
