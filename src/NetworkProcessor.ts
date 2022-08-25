import {Layer, Network, Neuron, Synapse} from "./Network";
import {Sigmoid} from "./Sigmoid";

export class NetworkProcessor {
    public static processNetwork(network: Network): void {
        let previousLayer: Layer = null;

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
                neuron.value = Sigmoid(neuron.value);
            }
        }
    }

    private static processLayer(network: Network, layer: Layer, sigmoidValue: boolean) {
        for (let neuron of layer.neurons) {
            if (neuron.value < neuron.bias) continue;
            if (sigmoidValue && neuron.value > 0) {
                neuron.value = Sigmoid(neuron.value);
            }

            if (neuron.bias > neuron.value) continue;

            for (let synapse of neuron.synapses) {
                let target = this.resolveTarget(network, synapse);
                target.value += neuron.value * synapse.weight;
            }
        }
    }

    private static clearLayer(layer: Layer) {
        for (let neuron of layer.neurons) {
            neuron.value = 0;
        }
    }

    private static resolveTarget(network: Network, synapse: Synapse): Neuron {
        return [network.input, ...network.hiddenLayers, network.output][synapse.targetLayerIndex].neurons[synapse.targetNeuronIndex];
    }
}