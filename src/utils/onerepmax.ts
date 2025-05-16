// Formato del peso
export function formatoPeso(peso: number): string {
    return Number.isInteger(peso) ? peso.toString() : peso.toFixed(1);
}

// Cálculo de 1RM
export const calcularOneRepMax = (peso: number, reps: number): number => {
    // Si estoy entre 1 y 10 uso Brzycki
    if(reps > 1 && reps <= 10) return brzycki(peso, reps);

    // Sino Epley
    return epley(peso, reps);
};

// Fórmula de Epley para 1RM
const epley = (peso: number, reps: number): number => {
    if (reps === 1) return peso;
    return peso * (1+(reps/30));
};

// Fórmula de Brzycki para 1RM
const brzycki = (peso: number, reps: number): number => {
    if (reps === 1) return peso;
    return peso * (36 / (37 - reps));
};

// Variación de la fórmula de Brzycki para 1RM
const brzycki2 = (peso: number, reps: number): number => {
  return peso / (1.0278 - 0.0278 * reps);
};

const lombardi = (peso: number, reps: number): number => {
  return peso * Math.pow(reps, 0.10);
};

const oconner = (peso: number, reps: number): number => {
  return peso * (1 + 0.025 * reps);
};

const wathan = (peso: number, reps: number): number => {
  return (100 * peso) / (48.8 + 53.8 * Math.exp(-0.075 * reps));
};

const schwartz = (peso: number, reps: number): number => {
  return (peso * 100) / (52.2 + 41.9 * Math.exp(-0.055 * reps));
};
