import {useState} from 'react';
import {formatoPeso} from './utils/onerepmax';


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
      const onerepmax = repsHechas === 1 
        ? pesoUsado 
        : pesoUsado * (36 / (37 - repsHechas));
      
      setValoresCalculados({
        peso: pesoUsado,
        reps: repsHechas,
        onerepmax,
      });
      setMostrarTabla(true);
    }
  };

  const porcentajes =  [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
  const repeticiones = [1,   2,  4,  6,  8,  10, 12, 16, 20, 24, 30];

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
          className="input-style"
        />

        <input
          type="number"
          placeholder="Repeticiones"
          value={reps}
          onChange={e => setReps(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleCalcular(); }}
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

      {/* Tabla condicional - Usa valoresCalculados en lugar de los estados directos */}
      {mostrarTabla && valoresCalculados && (
        <>
          <p className="text-xl mb-4 text-black">
            Tu 1RM estimado: <strong>{valoresCalculados.onerepmax.toFixed(1)} kg</strong>
          </p>
          <table className="table-auto border-collapse w-full max-w-md bg-white shadow rounded text-black">
            <thead>
              <tr className="bg-gray-300">
                <th className="cellTable">%</th>
                <th className="cellTable">Peso (kg)</th>
                <th className="cellTable">Reps aprox</th>
              </tr>
            </thead>
            <tbody>
              {porcentajes.map((pct, index) => {
              const pesoPct = (valoresCalculados.onerepmax * pct) / 100;
              return (
                  <tr key={pct} className="text-center">
                    <td className="cellTable">{pct}%</td>
                    <td className="cellTable">{formatoPeso(pesoPct)}</td>
                    <td className="cellTable">{repeticiones[index]}</td> {/* Usamos el índice para emparejar los arrays */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;