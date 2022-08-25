"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomMutator = void 0;
class RandomMutator {
    minStep;
    maxStep;
    constructor(minStep, maxStep) {
        this.minStep = minStep;
        this.maxStep = maxStep;
    }
    mutate(network) {
        for (let layer of [network.input, ...network.hiddenLayers]) {
            for (let neuron of layer.neurons) {
                neuron.bias += this.getRandomStep();
                for (let synapse of neuron.synapses) {
                    synapse.weight += this.getRandomStep();
                }
            }
        }
    }
    getRandomStep() {
        let step = this.minStep + (Math.random() * (this.maxStep - this.minStep));
        if (Math.random() > .7) {
            step *= -1;
        }
        return step;
    }
}
exports.RandomMutator = RandomMutator;
//# sourceMappingURL=RandomMutator.js.map