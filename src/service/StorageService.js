

class StorageService {

    saveTrivias(trivias) {

        const ids = trivias.map((trivia) => trivia.id);

        localStorage.setItem("Trivia_decks", JSON.stringify(trivias));
        localStorage.setItem("Trivias_IDs", JSON.stringify(ids));
    }

    saveNewTrivias(trivias) {
        const ids = trivias.map((trivia) => trivia.id);

        const triviasData = JSON.parse(localStorage.getItem("Trivia_decks")) || [];
        const Trivias_IDs = JSON.parse(localStorage.getItem("Trivias_IDs")) || [];

        triviasData.push(...trivias);
        Trivias_IDs.push(...ids);

        localStorage.setItem("Trivia_decks", JSON.stringify(triviasData));
        localStorage.setItem("Trivias_IDs", JSON.stringify(Trivias_IDs));
    }

    saveTrivia(trivia) {
        const existingDecks = JSON.parse(localStorage.getItem("local_trivia_decks")) || [];
      
        trivia.id = existingDecks.length;
        existingDecks.push(trivia);
      
        localStorage.setItem("local_trivia_decks", JSON.stringify(existingDecks));
        return trivia;
    }

    loadAllTrivias() {
        const triviasData = JSON.parse(localStorage.getItem("Trivia_decks")) || [];
        const triviasLocales = JSON.parse(localStorage.getItem("local_trivia_decks")) || [];

        triviasData.push(...triviasLocales);

        return triviasData;
    }

    loadTrivias() {
        const triviasData = JSON.parse(localStorage.getItem("Trivia_decks")) || [];

        return triviasData;
    }

    loadLocalTrivias() {
        const triviasLocales = JSON.parse(localStorage.getItem("local_trivia_decks")) || [];
        return triviasLocales;
    }

    markAsResolved(triviaResolved) {
        
        if (triviaResolved.canBeExported) {
            const triviasLocales = JSON.parse(localStorage.getItem("local_trivia_decks"));
            const updatedTriviasLocales = triviasLocales.filter((trivia) => trivia.id !== triviaResolved.id);
            updatedTriviasLocales.push(triviaResolved);
            localStorage.setItem("local_trivia_decks", JSON.stringify(updatedTriviasLocales));
            return updatedTriviasLocales;
        }

            const trivias = JSON.parse(localStorage.getItem("Trivia_decks"));
            const updatedTrivias = trivias.filter((trivia) => trivia.id !== triviaResolved.id);
            updatedTrivias.push(triviaResolved);
            localStorage.setItem("Trivia_decks", JSON.stringify(updatedTrivias));
            return updatedTrivias;
        
    }

    triviaExported(triviaId) {
        const triviasLocales = JSON.parse(localStorage.getItem("local_trivia_decks")); 
        const trivia = triviasLocales.find((trivia) => trivia.id === triviaId);
        trivia.canBeExported = false;

        const updatedTriviasLocales = triviasLocales.filter((trivia) => trivia.id !== triviaId);
        localStorage.setItem("local_trivia_decks", JSON.stringify(updatedTriviasLocales));

        const triviasData = JSON.parse(localStorage.getItem("Trivia_decks")) || [];
        triviasData.push(trivia);
        localStorage.setItem("Trivia_decks", JSON.stringify(triviasData));

    }

    removeFromTrivias(trivia) {
        if (trivia.canBeExported) {
            const triviasData = JSON.parse(localStorage.getItem("local_trivia_decks"));
            const updatedTrivias = triviasData.filter((t) => t.id !== trivia.id);
            localStorage.setItem("local_trivia_decks", JSON.stringify(updatedTrivias));
        } else {
            const triviasData = JSON.parse(localStorage.getItem("Trivia_decks"));
            const updatedTrivias = triviasData.filter((t) => t.id !== trivia.id);
            localStorage.setItem("Trivia_decks", JSON.stringify(updatedTrivias));
        }
    }

    getIDs() {
        const IDs = JSON.parse(localStorage.getItem("Trivias_IDs")) || [];
        return IDs;
    }

}

export default StorageService;
