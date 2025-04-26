import Papa from "papaparse";
import LZString from "lz-string";
import StorageService from "./StorageService";

// --- Helpers ---
const decompressCode = (compressedCode) => {
    const decompressed = LZString.decompressFromBase64(compressedCode);
    return JSON.parse(decompressed);
};

const compressCode = (questions) => {
    const json = JSON.stringify(questions);
    return LZString.compressToBase64(json); 
}

class Trivia {
    constructor(id, name, author, description, codigo) {
      this.id = id;
      this.name = name;
      this.author = author;
      this.description = description;
      this.questions = decompressCode(codigo);
      this.canBeExported = false;
    }
}

const storageService = new StorageService();

class TriviaService {

    loadAllTrivias() {
        return storageService.loadAllTrivias();
    }
    
    loadTrivias() {
        return storageService.loadTrivias();
    }

    loadLocalTrivias() {
        return storageService.loadLocalTrivias();
    }

    loadResolvedTrivias() {
        const trivias = storageService.loadAllTrivias();
        const resolvedTrivias = trivias.filter((trivia) => trivia.score !== undefined);
        return resolvedTrivias;
    }

    loadUnresolvedTrivias() {
        const trivias = storageService.loadAllTrivias();
        const unResolvedTrivias = trivias.filter((trivia) => trivia.score === undefined);
        return unResolvedTrivias;
    }

    searchTrivias(searchTerm) {
        const trivias = storageService.loadAllTrivias();
        const searchTermLower = searchTerm.toLowerCase();
        const searchResults = trivias.filter((trivia) => {
            return (
                trivia.name.toLowerCase().includes(searchTermLower) ||
                (trivia.author && trivia.author.toLowerCase().includes(searchTermLower)))
        });

        return searchResults;
    }
    

    deleteTrivia(trivia){
        storageService.removeFromTrivias(trivia);
    }


    markAsResolved(trivia,score) {
        if (!trivia.score || trivia.score < score){
            trivia.score = score;
        }
        storageService.markAsResolved(trivia);
    }

    saveTrivia(trivia){
        return storageService.saveTrivia(trivia);
    }


    async importTriviasNuevas() {
        const trivias = await this.importFromGoogle();
        const idActuales = storageService.getIDs();
        const nuevasTrivias = trivias.filter((trivia) => !idActuales.includes(trivia.id.toString()));

        if (nuevasTrivias.length === 0) {
            throw new Error("No hay nuevas trivias para importar"); 
        }
        storageService.saveNewTrivias(nuevasTrivias);
        return nuevasTrivias.length

    }

    async importAllTrivias() {
        const trivias = await this.importFromGoogle();
        storageService.saveTrivias(trivias);

        return trivias;
    }

    async importFromGoogle() {
        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQg3Lw9g7-dzxR06bUd3QNsrXN2wLuKADNpgueNfgYmu-cLLRwG66mzprF4bJaV57tr-F-EX-TnZY9d/pub?gid=1022024749&single=true&output=csv";
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`No se puedo traer las trivias intentelo devuelta mas tarde`);
            const csv = await response.text();
            const parsed = Papa.parse(csv, {
                header: true,
                skipEmptyLines: true,
                transformHeader: (h) => h.trim().toLowerCase().replaceAll(" ", "_")
        });
        const updatedTrivias = parsed.data
            .map(row => new Trivia(row.id, row.nombre_de_tu_trivia, row.autor, row.descripción, row.código));
        return updatedTrivias;
        } catch (error) {
            throw new Error(`No se puedo traer las trivias intentelo devuelta mas tarde`)
        }
    }



    async exportTrivia (trivia){

            const code = compressCode(trivia.questions);
            const formData = new FormData();
            formData.append("entry.361234476", trivia.name);
            if (trivia.description) {
                formData.append("entry.177312977", trivia.description);
            }
            if (trivia.author) {
                formData.append("entry.1384023895", trivia.author);
            }
            formData.append("entry.1369331431", code);
        
            fetch("https://docs.google.com/forms/d/e/1FAIpQLSfS6Wfv3Bs9mX2s8gfBLfvgTrYDb8_dVFBkBZv78G8_ub__oQ/formResponse", {
                method: "POST",
                mode: "no-cors",
                body: formData
            })
            .then(() => {
                storageService.triviaExported(trivia.id);
            })          

        return this.loadTrivias();   
    }

    

}

export default TriviaService; // Add default export
