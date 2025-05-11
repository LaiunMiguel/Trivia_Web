import React, { useState, useEffect, useRef } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';
import SearchTrivia from "./SearchTrivia";
import "../assets/css/playMenu.css";

const PlayMenu = ({
  handleMenuButton,
  handleRandomTrivia,
  handleRandomTriviaTotal,
  handleTodasMisTrivias,
  handleLocalTrivias,
  handleTriviasResueltas,
  handleTriviasNoResueltas,
  handleImportNewTrivias,
  handleSearchTrivia,
}) => {
  const [sectionsOpen, setSectionsOpen] = useState({
    MisTrivias: false,
    Jugar: false,
    Importar: false,
    Navegacion: false,
  });

  const menuRef = useRef(null);

  const toggleSection = (section) => {
    setSectionsOpen((prev) => ({
      MisTrivias: false,
      Jugar: false,
      Importar: false,
      Navegacion: false,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSectionsOpen({
          MisTrivias: false,
          Jugar: false,
          Importar: false,
          Navegacion: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (filters) => {
    handleSearchTrivia(filters);
  };



  return (
    <div className="PlayMenu" ref={menuRef}>
      <section className={`menu-section ${sectionsOpen.MisTrivias ? "open" : ""}`}>
        <h3 onClick={() => toggleSection('MisTrivias')}><span></span>Mis Trivias</h3>
        {sectionsOpen.MisTrivias && (
          <div className="menu-section-content">
            <button onClick={handleTodasMisTrivias} aria-label="Ver todas las trivias">Ver Todas las Trivias</button>
            <button onClick={handleTriviasResueltas} aria-label="Ver trivias completadas">Ver Trivias Completadas</button>
            <button onClick={handleTriviasNoResueltas} aria-label="Ver trivias pendientes">Ver Trivias Pendientes</button>
            <button onClick={handleLocalTrivias} aria-label="Ver trivias locales">Mis trivias sin subir</button>
          </div>
        )}
      </section>

      <section className={`menu-section ${sectionsOpen.Jugar ? "open" : ""}`}>
        <h3 onClick={() => toggleSection('Jugar')}>Jugar</h3>
        {sectionsOpen.Jugar && (
          <div className="menu-section-content">
            <button onClick={handleRandomTrivia} aria-label="Jugar trivia aleatoria de las filtradas">Jugar Trivia Aleatoria de las filtradas</button>
            <button onClick={handleRandomTriviaTotal} aria-label="Jugar trivia aleatoria">Jugar Trivia Aleatoria</button>
          </div>
        )}
      </section>

      <section className={`menu-section ${sectionsOpen.Importar ? "open" : ""}`}>
        <h3 onClick={() => toggleSection('Importar')}>Importar trivias</h3>
        {sectionsOpen.Importar && (
          <div className="menu-section-content">
            <button onClick={handleImportNewTrivias} aria-label="Importar trivias nuevas">Importar trivias nuevas</button>
          </div>
        )}
      </section>

      <section className={`menu-section ${sectionsOpen.Navegacion ? "open" : ""}`}>
        <h3 onClick={() => toggleSection('Navegacion')}>Búsqueda</h3>
        {sectionsOpen.Navegacion && (
          <div className="menu-section-content">
            <SearchTrivia onSearch={handleSearch} />
            <button onClick={handleMenuButton} aria-label="Volver al menú">Volver al Menu</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default PlayMenu;