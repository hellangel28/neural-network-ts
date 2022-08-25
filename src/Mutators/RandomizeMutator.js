"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomizeMutator = void 0;
class RandomizeMutator {
    mutate(network) {
        for (let layer of [network.input, ...network.hiddenLayers]) {
            for (let neuron of layer.neurons) {
                neuron.bias = 0;
                for (let synapse of neuron.synapses) {
                    synapse.weight = RandomizeMutator.createRandomNormalized();
                }
            }
        }
    }
    static createRandomNormalized() {
        return Math.random() * 2 - 1;
    }
}
exports.RandomizeMutator = RandomizeMutator;
//# sourceMappingURL=RandomizeMutator.js.map