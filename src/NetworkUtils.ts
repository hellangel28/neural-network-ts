import {Layer} from "./Network";

export const getHighestValueNeuronIndex = (layer: Layer) => {
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
}