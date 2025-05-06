export function formatoPeso(peso: number): string {
    return Number.isInteger(peso) ? peso.toString() : peso.toFixed(1);
}