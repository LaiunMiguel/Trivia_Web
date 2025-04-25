import React, { useState } from "react";
import "../assets/css/playMenu.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SearchTrivia from "./SearchTrivia";

const PlayMenu = ({
  handleMenuButton,
  handleRandomTrivia,
  handleTodasMisTrivias,
  handleLocalTrivias,
  handleTriviasResueltas,
  handleTriviasNoResueltas,
  handleImportNewTrivias,
  handleImportAllTrivias,
  handleSearchTrivia,
}) => {

  const [sectionsOpen, setSectionsOpen] = useState({
    MisTrivias: false,
    Jugar: false,
    Importar: false,
    Navegacion: false,
  });
  
  const toggleSection = (section) => {
    setSectionsOpen((prev) => ({
      MisTrivias: false,
      Jugar: false,
      Importar: false,
      Navegacion: false,
      [section]: !prev[section],
    }));
  };
  
  

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

  const handleSearch = (filters) => {
      handleSearchTrivia(filters);
  };

  return (
    <div className="PlayMenu">
      <section className={`menu-section ${sectionsOpen.MisTrivias ? "open" : ""}`}>
        <h3 onClick={() => toggleSection('MisTrivias')}><span></span>Mis Trivias</h3>
          {sectionsOpen.MisTrivias && (
            <div className="menu-section-content">
              <button onClick={handleTodasMisTrivias}>Ver Todas las Trivias</button>
              <button onClick={handleTriviasResueltas}>Ver Trivias Completadas</button>
              <button onClick={handleTriviasNoResueltas}>Ver Trivias Pendientes</button>
              <button onClick={handleLocalTrivias}>Mis trivias sin subirr</button>
            </div>
          )}
      </section>

      <section className={`menu-section ${sectionsOpen.Jugar ? "open" : ""}`}>
        <h3 onClick={() => toggleSection('Jugar')}>Jugar</h3>
        {sectionsOpen.Jugar && (
            <div className="menu-section-content">
                <button onClick={handleRandomTrivia}>Jugar Trivia Aleatoria</button>
              </div>
        )}
      </section>

      <section className={`menu-section ${sectionsOpen.Importar ? "open" : ""}`}>
      <h3 onClick={() => toggleSection('Importar')}>Importar trivias</h3>

        {sectionsOpen.Importar && (
            <div className="menu-section-content">
                <button onClick={handleImportNewTrivias}>Importar trivias nuevas</button>
                <button onClick={confirmImport}>Importar todas las trivias</button>
              </div>
            )}
      </section>

      <section className={`menu-section ${sectionsOpen.Navegacion ? "open" : ""}`}>
      <h3 onClick={() => toggleSection('Navegacion')}>Búsqueda</h3>
        {sectionsOpen.Navegacion && (
              <div className="menu-section-content">
                <SearchTrivia onSearch={handleSearch} />

                <button onClick={handleMenuButton}>Volver al Menu</button>
              </div>
            )}
      </section>
    </div>
  );
};

export default PlayMenu;