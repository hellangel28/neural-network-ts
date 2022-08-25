import {Layer, Network, Neuron} from "./Network";

export class NetworkRenderer {
    public static renderNetwork(network: Network): string[] {
        let output: string[] = [];
        output.push("Network:");
        output.push("======");
        output.push("Input");
        output.push(...this.renderLayer(network.input));
        output.push("======");
        let i = 0;
        for (let layer of network.hiddenLayers) {
            output.push("Hidden layer #" + (++i) + " :\n");
            output.push(...this.renderLayer(layer));
            output.push("======");
        }
        output.push("Output:\n");
        output.push(...this.renderLayer(network.output));
        output.push("======");

        return output;
    }

    public static renderLayer(layer: Layer): string[] {
        let output: string[] = [];
        output.push("(Neurons: " + layer.neurons.length + ")");
        for (let neuron of layer.neurons) {
            output.push(...this.renderNeuron(neuron).map((val) => "   " + val));
        }
        output.push("");
        return output;
    }

    public static renderNeuron(neuron: Neuron): string[] {
        let output: string[] = [];
        output.push("(Value: " + neuron.value + " / Bias: " + neuron.bias + " /  Synapses: " + neuron.synapses.length + ")");
        let count = 0;
        for (let synapse of neuron.synapses) {
            output.push("   Syn #" + (++count) + " - Weight: " + synapse.weight);
        }
        return output;
    }
}