import React, { useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../assets/css/triviaDetails.css";

const TriviaDetails = ({
  triviaData,
  handleClick = () => {},
  handleShare = () => {},
  handleDelete = () => {},
  isImported = false,
  isIgnored = false
}) => {

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

    const handleIgnoreButton = (trivia) => {
      confirmAlert({
        title: '¿Estás seguro?',
        message: 'Quieres que esta trivia no te aparezca más?',
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
        
    }

    

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
            <p className="descripcion" ><strong>Descripción:</strong> {triviaData.description || "Sin descripción"}</p>           
          </div>
          {!isImported ? (
          <div className="triviaDetailsButtons">
            <button onClick={() => handleClick(triviaData)} aria-label="Jugar trivia">Jugar</button>
            {triviaData.canBeExported ? (
            <button onClick={() => handleSharePersonal()} disabled={isSharing} aria-label="Compartir trivia">Compartir</button>
            ) : null}
            <button onClick={() => handleDeleteButton(triviaData)} aria-label="Borrar trivia">Borrar</button>
          </div> ) : (
          <div className="triviaDetailsButtons">
            <button onClick={() => handleShare(triviaData)} aria-label="Importar Trivia">Importar Trivia</button>
            <button onClick={() => handleIgnoreButton(triviaData)} disabled={isIgnored} aria-label="Ignorar Trivia">Ignorar Trivia</button>
          </div>
          )}
      </div>
    )
}

export default TriviaDetails;