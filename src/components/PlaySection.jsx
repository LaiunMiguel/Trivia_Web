import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";
import TriviaService from "../service/TriviaService.js";
import LoadingMenu from "./LoadingMenu.jsx";
import TriviaDetails from "./TriviaDetails.jsx";
import PlayMenu from "./PlayMenu.jsx";  
import "../assets/css/playSection.css";



const PlaySection = ({ handleMenuButton }) => {
  // --- State ---
  const [triviasData, setTriviasData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // --- Service ---
  const triviaService = new TriviaService();

  // --- Effects ---
  useEffect(() => {
    handleTodasMisTrivias();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [triviasData])


  // --- Handlers ---
  const handleTriviaSelection = (trivia) => {
    navigate("/Play/"+ trivia.id);
  };

  const handleLocalTrivias = () => {
    const misTrivias = triviaService.loadLocalTrivias();
    setTriviasData(misTrivias); 
  }

  const handleTodasMisTrivias = () => {
    const todasTrivias = triviaService.loadAllTrivias();
    setTriviasData(todasTrivias);
  }

  const handleTriviasResueltas = () => {
    const resueltasTrivias = triviaService.loadResolvedTrivias();
    setTriviasData(resueltasTrivias);
  }

  const handleTriviasNoResueltas = () => {
    const noResueltasTrivias = triviaService.loadUnresolvedTrivias();
    setTriviasData(noResueltasTrivias);
  }


  const handleSearchTrivia = async (searchTerm) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      const filteredTrivias = triviaService.searchTrivias(searchTerm);
      if (filteredTrivias.length === 0) {
        toast.error("No se encontraron trivias con ese parametro");
      }
      setTriviasData(filteredTrivias);
    } finally {
      setIsLoading(false);
    }
  }

  
  const handleExport = async (triviaToShare) => {
    await triviaService.exportTrivia(triviaToShare);
    handleTodasMisTrivias();
    toast.success("Trivia exportada correctamente");
  };
  
  const handleImportNewTrivias = async () =>  {
    navigate("/Import");
    };

  const handleDelete = (trivia) => {
    triviaService.deleteTrivia(trivia); 
    handleTodasMisTrivias();
    toast.success("Trivia eliminada correctamente");
  }
  
  const handleRandomTrivia = () => {
    if (triviasData.length === 0) {
      toast.error("No hay trivias para elegir :(");
      return;
    }
    const randomIndex = Math.floor(Math.random() * triviasData.length);
    const randomTrivia = triviasData[randomIndex];
    handleTriviaSelection(randomTrivia);
  };

  const handleRandomTriviaTotal = () => {
    const todasTrivias = triviaService.loadAllTrivias();
    if (todasTrivias.length === 0) {
      toast.error("No tienes trivias importa alguna :)");
      return;
    }
    const randomIndex = Math.floor(Math.random() * todasTrivias.length);
    const randomTrivia = todasTrivias[randomIndex];
    handleTriviaSelection(randomTrivia);
  };
  
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  
  // --- Pagination ---
  const pageTrivias = triviasData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // --- Render ---
  return (
    <div className="PlaySection">
      {isLoading ? (
        <LoadingMenu />
      ):(
        <>
          <PlayMenu
            handleMenuButton={handleMenuButton}
            handleRandomTrivia={handleRandomTrivia}
            handleRandomTriviaTotal={handleRandomTriviaTotal}
            handleLocalTrivias={handleLocalTrivias}
            handleTriviasResueltas={handleTriviasResueltas}
            handleTriviasNoResueltas={handleTriviasNoResueltas}
            handleTodasMisTrivias={handleTodasMisTrivias}
            handleImportNewTrivias={handleImportNewTrivias}
            handleSearchTrivia={handleSearchTrivia}
          />
        
          {pageTrivias.length === 0 ? (
            <div className="empty-list">
              <h2>No hay trivias que cumplan esas caracteriticas</h2>
            </div>
          ) : (
            <div className="trivia-list">
              {pageTrivias.map((trivia) => (
                <TriviaDetails
                  key={trivia.id}
                  triviaData={trivia}
                  handleClick={handleTriviaSelection}
                  handleShare={handleExport}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
            )}
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Anterior Pagina">←</button>
            <span>Página {currentPage}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= triviasData.length} aria-label="Siguiente Pagina">→</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaySection;

            
   