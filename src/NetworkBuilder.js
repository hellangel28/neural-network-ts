"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkBuilder = void 0;
class NetworkBuilder {
    static createNetwork(inputs, outputs, hiddenLayers, neuronsPerHiddenLayer) {
        let network = {
            input: this.createLayer(inputs),
            hiddenLayers: Array(hiddenLayers).fill(0).map(() => this.createLayer(neuronsPerHiddenLayer)),
            output: this.createLayer(outputs),
        };
        this.connectNetwork(network);
        return network;
    }
    static createLayer(neurons) {
        return {
            neurons: Array(neurons).fill(0).map(() => ({
                synapses: [],
                bias: 0,
                value: 0
            })),
        };
    }
    static connectNetwork(network) {
        let previousLayer = null;
        for (let i = 0; i < [network.input, ...network.hiddenLayers, network.output].length; i++) {
            let layer = [network.input, ...network.hiddenLayers, network.output][i];
            if (previousLayer) {
                this.connectLayers(previousLayer, layer, i.toString());
            }
            previousLayer = layer;
        }
    }
    static connectLayers(a, b, layerIndex) {
        for (let aNeuron of a.neurons) {
            for (let i = 0; i < b.neurons.length; i++) {
                aNeuron.synapses.push({
                    targetLayerIndex: layerIndex,
                    targetNeuronIndex: i.toString(),
                    weight: 0
                });
            }
        }
    }
}
exports.NetworkBuilder = NetworkBuilder;
//# sourceMappingURL=NetworkBuilder.js.map