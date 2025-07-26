import { formatoPeso } from '../utils/onerepmax';

interface ValoresCalculados {
	peso: number;
	reps: number;
	onerepmax: number;
}

interface Props {
	valoresCalculados: ValoresCalculados;
}

function TablaResultados({ valoresCalculados }: Props) {
	const porcentajes =  [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
	const repeticiones = [1,   2,  4,  6,  8,  10, 12, 16, 20, 24, 30];

	return (
		<>
			<p className="text-xl mb-4 text-black">
				Tu 1RM estimado: <strong>{valoresCalculados.onerepmax.toFixed(1)} kg</strong>
			</p>

			{/* <table className="table-auto border-collapse w-full max-w-md bg-white shadow rounded text-black"> */}
			<table className="table-auto border-collapse w-full max-w-md bg-white shadow rounded-lg overflow-hidden text-black">
				<thead>
					<tr className="bg-blue-200">
						<th className="cellTable rounded-tl-lg">%</th>
						<th className="cellTable">Peso (kg)</th>
						<th className="cellTable rounded-tr-lg">Reps aprox</th>
					</tr>
				</thead>

				<tbody>
					{porcentajes.map((pct, index) => {
						const pesoPct = (valoresCalculados.onerepmax * pct) / 100;
						const isLast = index === porcentajes.length - 1;
						return (
							<tr key={pct} className="text-center">
								<td className={`cellTable ${isLast ? 'rounded-bl-lg' : ''}`}>{pct}%</td>
								<td className="cellTable">{formatoPeso(pesoPct)}</td>
								<td className={`cellTable ${isLast ? 'rounded-br-lg' : ''}`}>{repeticiones[index]}</td>
							</tr>
						);
					})}
				</tbody>

			</table>
		</>
	);
}

export default TablaResultados;
