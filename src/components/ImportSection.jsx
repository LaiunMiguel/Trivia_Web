import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import TriviaService from '../service/TriviaService.js';
import TriviaDetails from './TriviaDetails.jsx';
import LoadingMenu from './LoadingMenu.jsx';
import '../assets/css/playSection.css';
import '../assets/css/ImportSection.css'

const ImportSection = () => {
    const navigate = useNavigate();
    const triviaService = new TriviaService();
    const [triviaData, setTriviaData] = useState([]);
    const [ignoredTrivias, setIgnoredTrivias] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [seeIgnored, setSeeIgnored] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [currentTrivias, setCurrentTrivias] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        const fetchTrivias = async () => {
            try {
                const misIgnored = await triviaService.importIgnoredAndDeletedTrivias();
                setIgnoredTrivias(misIgnored);
            } catch {
                setIgnoredTrivias([]);
            }
            try {
                const misNuevas = await triviaService.importTriviasNuevas();
                setTriviaData(misNuevas);
            } catch {
                setTriviaData([]);
            }
            setIsLoading(false);
        };
        fetchTrivias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const data = seeIgnored ? ignoredTrivias : triviaData;
        const total = Math.ceil(data.length / itemsPerPage);
        const startIdx = (currentPage - 1) * itemsPerPage;
        setCurrentTrivias(data.slice(startIdx, startIdx + itemsPerPage));
        setTotalPages(total);
        if (currentPage > total && total > 0) {
            setCurrentPage(total);
        }
    }, [seeIgnored, triviaData, ignoredTrivias, currentPage, itemsPerPage]);

    const handleImport = (trivia) => {
        triviaService.saveTriviaImported(trivia);
        toast.success("Se importó " + trivia.name + " con éxito!");
        handleRemoveFromList(trivia);
    }

    const handleIgnore = (trivia) => {
        triviaService.ignoreTrivia(trivia.id);
        toast.success("Se ignoró " + trivia.name + ", ya no aparecerá!");
        handleRemoveFromList(trivia);
    }

    const handleRemoveFromList = (trivia) => {
        if (seeIgnored) {
            const filtered = ignoredTrivias.filter((t) => t.id !== trivia.id);
            setIgnoredTrivias(filtered);
        } else {
            const filtered = triviaData.filter((t) => t.id !== trivia.id);
            setTriviaData(filtered);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleTodasMisTrivias = () => {
        navigate("/Play");
    }

    const handleCrearTrivia = () => {
        navigate("/Create");
    }

    return (
        <>
        {isLoading ? (
            <LoadingMenu />
        ) : (
            currentTrivias.length === 0 ? (
                <div className='trivia-importSection-empty'>
                    <h1>No hay más trivias nuevas para importar :(</h1>
                    <h2>Juega una de las que tienes</h2>
                    <button onClick={handleTodasMisTrivias}>Ir a mis trivias</button>
                    <h2>¿Por qué no creas una?</h2>
                    <button onClick={handleCrearTrivia}>Ir a crear</button>
                    <h2>¿Quieres ver una de las ignoradas o eliminadas?</h2>
                    <button onClick={() => setSeeIgnored(!seeIgnored)} disabled={ignoredTrivias.length <= 0}>Ver ignoradas</button>
                </div>
            ) : (
                <div className='trivia-importSection'>
                    <h1>{seeIgnored ? "Trivias Ignoradas o Eliminadas" : "Trivias Nuevas"}</h1>
                    {!seeIgnored ? (
                        <>
                        <h2>Si no te gustan las trivias, puedes ignorarlas y no aparecerán en el listado</h2>
                        <button onClick={() => setSeeIgnored(true)} disabled={ignoredTrivias.length <= 0}>Ver Trivias Ignoradas o Eliminadas</button>
                        </>
                    ) : (
                        <button onClick={() => setSeeIgnored(false)} disabled={triviaData.length <= 0}>Ver Trivias Nuevas</button>
                    )}
                    <div className="trivia-list">
                        {currentTrivias.map((trivia) => (
                            <TriviaDetails
                                key={trivia.id}
                                triviaData={trivia}
                                handleShare={handleImport}
                                handleDelete={!seeIgnored ? handleIgnore : () => {}}
                                isImported={true}
                                isIgnored={seeIgnored}
                            />
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "16px", gap: "8px" }}>
                        <button onClick={handlePrevPage} disabled={currentPage === 1} aria-label="Página anterior">
                            Anterior
                        </button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} aria-label="Página siguiente">
                            Siguiente
                        </button>
                    </div>
                </div>
            )
        )}
        </>
    )
}

export default ImportSection;
