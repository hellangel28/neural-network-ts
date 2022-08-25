"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkProcessor = void 0;
const Sigmoid_1 = require("./Sigmoid");
class NetworkProcessor {
    static processNetwork(network) {
        let previousLayer = null;
        for (let layer of [network.input, ...network.hiddenLayers, network.output]) {
            if (layer !== network.input) {
                this.clearLayer(layer);
            }
            if (previousLayer) {
                this.processLayer(network, previousLayer, previousLayer !== network.input);
            }
            previousLayer = layer;
        }
        for (let neuron of network.output.neurons) {
            if (neuron.value > 0) {
                neuron.value = (0, Sigmoid_1.Sigmoid)(neuron.value);
            }
        }
    }
    static processLayer(network, layer, sigmoidValue) {
        for (let neuron of layer.neurons) {
            if (neuron.value < neuron.bias)
                continue;
            if (sigmoidValue && neuron.value > 0) {
                neuron.value = (0, Sigmoid_1.Sigmoid)(neuron.value);
            }
            if (neuron.bias > neuron.value)
                continue;
            for (let synapse of neuron.synapses) {
                let target = this.resolveTarget(network, synapse);
                target.value += neuron.value * synapse.weight;
            }
        }
    }
    static clearLayer(layer) {
        for (let neuron of layer.neurons) {
            neuron.value = 0;
        }
    }
    static resolveTarget(network, synapse) {
        return [network.input, ...network.hiddenLayers, network.output][synapse.targetLayerIndex].neurons[synapse.targetNeuronIndex];
    }
}
exports.NetworkProcessor = NetworkProcessor;
//# sourceMappingURL=NetworkProcessor.js.map