export function Sigmoid(x: number) {
    return 1 / (1 + Math.exp(-x));
}