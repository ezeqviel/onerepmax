import { useState } from 'react';
import { calcularOneRepMax } from './utils/onerepmax';
import TablaResultados from './componentes/TablaResultados';

function App() {
  const [peso, setPeso] = useState('');
  const [reps, setReps] = useState('');
  const [mostrarTabla, setMostrarTabla] = useState(false);
  
  // Nuevos estados para almacenar los valores usados en el cálculo
  const [valoresCalculados, setValoresCalculados] = useState<{
    peso: number;
    reps: number;
    onerepmax: number;
  } | null>(null);

  const pesoUsado = parseFloat(peso);
  const repsHechas = parseInt(reps);

  const handleCalcular = () => {
    // Verifico si el valor es NaN
    const pesoUsado = isNaN(parseFloat(peso)) ? 0 : parseFloat(peso);
    const repsHechas = isNaN(parseInt(reps)) ? 0 : parseInt(reps);

    // Reinicio estos estados para evitar errores
    setValoresCalculados(null);
    setMostrarTabla(false);

    if(isNaN(pesoUsado) || pesoUsado <= 0){
      alert('El peso debe ser un número positivo.');
      setPeso('')
      setMostrarTabla(false);
      return;
    }

    if(isNaN(repsHechas) || repsHechas <= 0){
      alert('La cantidad de reps debe ser un número positivo.');
      setReps('');      
      setMostrarTabla(false);
      return;
    }

    if (pesoUsado && repsHechas) {
      // Calculamos el 1RM solo al hacer clic      
      const onerepmax = calcularOneRepMax(pesoUsado, repsHechas);
      
      setValoresCalculados({
        peso: pesoUsado,
        reps: repsHechas,
        onerepmax,
      });
      setMostrarTabla(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-black">Calculadora de 1RM</h1>

      <div className="flex flex-col gap-4 w-full max-w-sm mb-4">
        <input
          type="number"
          placeholder="Peso levantado (kg)"
          value={peso}
          onChange={e => setPeso(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleCalcular(); }}
          min="1"
          className="input-style"
        />

        <input
          type="number"
          placeholder="Repeticiones"
          value={reps}
          onChange={e => setReps(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleCalcular(); }}
          min="1"
          className="input-style"
        />
        
        <button
          onClick={handleCalcular}
          disabled={!pesoUsado || !repsHechas}
          className="btn-Calcular"
        >
          Calcular
        </button>
      </div>

      
      {mostrarTabla && valoresCalculados && (
        <TablaResultados valoresCalculados={valoresCalculados} />
      )}
    </div>
  );
}

export default App;