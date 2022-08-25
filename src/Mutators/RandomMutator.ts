import {NetworkMutatorInterface} from "../NetworkMutatorInterface";
import {Network} from "../Network";

export class RandomMutator implements NetworkMutatorInterface {
    private readonly minStep: number;
    private readonly maxStep: number;

    constructor(minStep: number, maxStep: number) {
        this.minStep = minStep;
        this.maxStep = maxStep;
    }

    public mutate(network: Network): void {
        for (let layer of [network.input, ...network.hiddenLayers]) {
            for (let neuron of layer.neurons) {
                neuron.bias += this.getRandomStep();
                for (let synapse of neuron.synapses) {
                    synapse.weight += this.getRandomStep();
                }
            }
        }
    }

    private getRandomStep(): number {
        let step = this.minStep + (Math.random() * (this.maxStep - this.minStep));
        if (Math.random() > .7) {
            step *= -1;
        }
        return step;
    }
}