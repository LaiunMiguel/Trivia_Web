import React, { useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../../assets/css/triviaDetails.css";

const TriviaDetails = ({triviaData, handleClick, handleShare, handleDelete}) => {

    const [isSharing, setIsSharing] = useState(false);

    const confirmDelete = (trivia) => {
        confirmAlert({
          title: 'Confirmar eliminación',
          message: '¿Estás seguro de que deseas eliminar esta trivia?',
          buttons: [
            {
              label: 'Sí',
              onClick: () => handleDelete(trivia)
            },
            {
              label: 'No',
              onClick: () => {}
            }
          ]
        });
    };

    

    const handleSharePersonal = () => {
        setIsSharing(true);
        handleShare(triviaData);
    }

    const handleDeleteButton = (trivia) => {
        confirmDelete(trivia);
    }

    return (
      <div className="trivia-details">
          <div className="details" onClick={() => handleClick(triviaData)} style={{cursor: "pointer"}}>
            <h3>Detalles de la Trivia</h3>
            <p><strong>Nombre:</strong> {triviaData.name || "Sin nombre"}</p>
            {triviaData.score ? 
            <p><strong>Maximo Puntaje:</strong> {triviaData.score}</p> : null}
            <div className="detailsBasicInfo">
            <p><strong>Autor:</strong> {triviaData.author || "Desconocido"}</p>
            <p><strong>Preguntas:</strong> {triviaData.questions?.length || 0}</p>
            </div>
            <p className="descripcion" ><strong>Decripcion:</strong> {triviaData.description || "Sin decripcion"}</p>
            
          </div>
          <div className="triviaDetailsButtons">
            <button onClick={() => handleClick(triviaData)}>Jugar</button>
            {triviaData.canBeExported ? (
              <button onClick={() => handleSharePersonal()} disabled={isSharing}>Compartir</button>
            ) : null}
            <button onClick={() => handleDeleteButton(triviaData)}>Borrar</button>
          </div>
      </div>
    )
}

export default TriviaDetails;