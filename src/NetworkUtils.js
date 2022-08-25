"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHighestValueNeuronIndex = void 0;
const getHighestValueNeuronIndex = (layer) => {
    let highest = -1;
    let index = "0";
    for (let idx in layer.neurons) {
        let neuron = layer.neurons[idx];
        if (neuron.value > highest) {
            highest = neuron.value;
            index = idx;
        }
    }
    return index;
};
exports.getHighestValueNeuronIndex = getHighestValueNeuronIndex;
//# sourceMappingURL=NetworkUtils.js.map