import { useState } from 'react';

const LocalStorageInfo = () => {
  const [uso, setUso] = useState(0);
  const [resultadoTest, setResultadoTest] = useState('');

  const calcularUso = () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage.getItem(key);
        total += key.length + value.length;
      }
    }
    const usadoKB = (total * 2) / 1024;
    setUso(usadoKB.toFixed(2));
  };

  const testearLimite = () => {
    try {
      const clave = 'testData';
      let data = 'a';
      let veces = 0;

      while (true) {
        localStorage.setItem(clave, data);
        data += data; // duplicamos tamaño cada vez
        veces++;
      }
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        setResultadoTest('¡Límite alcanzado! localStorage no puede guardar más.');
      } else {
        setResultadoTest(`Error inesperado: ${e.message}`);
      }
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-md max-w-md mx-auto bg-white">
      <h2 className="text-xl font-bold mb-2">Información de Local Storage</h2>
      <p>Espacio usado: <strong>{uso} KB</strong></p>
      <button onClick={calcularUso} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        Calcular uso
      </button>

      <hr className="my-4" />

      <button onClick={testearLimite} className="px-4 py-2 bg-red-600 text-white rounded">
        Testear límite de almacenamiento
      </button>
      {resultadoTest && <p className="mt-2 text-red-500">{resultadoTest}</p>}
    </div>
  );
};

export default LocalStorageInfo;
