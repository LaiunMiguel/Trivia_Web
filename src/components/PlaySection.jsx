import React, { useState, useEffect } from "react";
import LoadingMenu from "./LoadingMenu.jsx";
import TriviaConfig from "./TriviaConfig.jsx";
import TriviaDetails from "./TriviaDetails.jsx";
import TriviaService from "../service/TriviaService.js";
import PlayMenu from "./PlayMenu.jsx";  
import "../assets/css/playSection.css";
import { toast } from "react-toastify";



const PlaySection = ({ handleMenuButton }) => {
  // --- State ---
  const [triviaSelected, setTriviaSelected] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [triviasData, setTriviasData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [isLoading, setIsLoading] = useState(false);

  // --- Service ---
  const triviaService = new TriviaService();

  // --- Effects ---
  useEffect(() => {
    handleTodasMisTrivias();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Handlers ---
  const handleTriviaSelection = (trivia) => {
    setTriviaSelected(trivia);
    setIsConfigured(true);
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

  
  const handleExport = async (triviaToShare) => {
    await triviaService.exportTrivia(triviaToShare);
    handleTodasMisTrivias();
    toast.success("Trivia exportada correctamente");
  };
  
  const handleImportNewTrivias = async () =>  {
      try {
        const CantDeTrivas = await triviaService.importTriviasNuevas();
        toast.success("Se importaron " + CantDeTrivas + " trivias nuevas!!");
        handleTodasMisTrivias();
      }
      catch (error) {
        toast.error(error.message);
      }
    };
    
    const handleImportAllTrivias = async () => {
      setIsLoading(true);
      try {
        await triviaService.importAllTrivias();
        handleTodasMisTrivias();
        toast.success("Todas las trivias importadas correctamente");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
  const handleDelete = (trivia) => {
    triviaService.deleteTrivia(trivia); 
    handleTodasMisTrivias();
    toast.success("Trivia eliminada correctamente");
  }
  
  const handleRandomTrivia = () => {
    const randomIndex = Math.floor(Math.random() * triviasData.length);
    const randomTrivia = triviasData[randomIndex];
    setTriviaSelected(randomTrivia);
    setIsConfigured(true);
  };
  
  const handleFinish = (score) => {
    triviaService.markAsResolved(triviaSelected,score);
    handleTodasMisTrivias();
  }
  
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
      ) : !isConfigured ? (
        <>
          <PlayMenu
            handleMenuButton={handleMenuButton}
            handleRandomTrivia={handleRandomTrivia}
            handleLocalTrivias={handleLocalTrivias}
            handleTriviasResueltas={handleTriviasResueltas}
            handleTriviasNoResueltas={handleTriviasNoResueltas}
            handleTodasMisTrivias={handleTodasMisTrivias}
            handleImportNewTrivias={handleImportNewTrivias}
            handleImportAllTrivias={handleImportAllTrivias}
          />
          <div className="trivia-list">
          
          {pageTrivias.map((trivia,index) => (
              <TriviaDetails
                key={index}
                triviaData={trivia}
                handleClick={handleTriviaSelection}
                handleShare={handleExport}
                handleDelete={handleDelete}
                />
              ))}
          </div>
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>←</button>
            <span>Página {currentPage}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= triviasData.length}>→</button>
          </div>
        </>
      ) : (
        <TriviaConfig triviaSelected={triviaSelected} handleFinish={handleFinish} />
      )}
    </div>
  );
};

export default PlaySection;

            
   