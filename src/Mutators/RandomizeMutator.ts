import {NetworkMutatorInterface} from "../NetworkMutatorInterface";
import {Network} from "../Network";

export class RandomizeMutator implements NetworkMutatorInterface {
    public mutate(network: Network): void {
        for (let layer of [network.input, ...network.hiddenLayers]) {
            for (let neuron of layer.neurons) {
                neuron.bias = 0;
                for (let synapse of neuron.synapses) {
                    synapse.weight = RandomizeMutator.createRandomNormalized();
                }
            }
        }
    }

    private static createRandomNormalized() {
        return Math.random() * 2 - 1;
    }
}