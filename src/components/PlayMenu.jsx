import React from "react";
import "../assets/css/playMenu.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const PlayMenu = ({
  handleMenuButton,
  handleRandomTrivia,
  handleTodasMisTrivias,
  handleLocalTrivias,
  handleTriviasResueltas,
  handleTriviasNoResueltas,
  handleImportNewTrivias,
  handleImportAllTrivias,
}) => {

  
  const confirmImport = () => {
    confirmAlert({
      title: 'Confirmar importar',
      message: 'Importar todas las trivias traera las eliminadas y reiniciara las trivias completas. ¿Estás seguro?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => handleImportAllTrivias()
        },
        {
          label: 'No',
          onClick: () => {} // o cerrar modal sin acción
        }
      ]
    });
};





  return (
    <div className="PlayMenu">
        <button onClick={handleTodasMisTrivias}>Ver Todas las Trivias</button>
        <button onClick={handleTriviasResueltas}>Ver Trivias Completadas</button>
        <button onClick={handleTriviasNoResueltas}>Ver Trivias Pendientes</button>
        <button onClick={handleRandomTrivia}>Jugar Trivia Aleatoria</button>
        <button onClick={handleLocalTrivias}>Trivias sin Subir</button>
        <button onClick={handleImportNewTrivias}>Importar Trivias Nuevas</button>
        <button onClick={confirmImport}>Importar Todas las Trivias Online</button>
        <button onClick={handleMenuButton}>Volver al Menú</button>
    </div>
  );
};

export default PlayMenu;