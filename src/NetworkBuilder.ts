import {Layer, Network, Neuron, Synapse} from "./Network";


export class NetworkBuilder {

    public static createNetwork(inputs: number, outputs: number, hiddenLayers: number, neuronsPerHiddenLayer: number): Network {
        let network: Network = <Network>{
            input: this.createLayer(inputs),
            hiddenLayers: Array(hiddenLayers).fill(0).map(() => this.createLayer(neuronsPerHiddenLayer)),
            output: this.createLayer(outputs),
        };
        this.connectNetwork(network);
        return network;
    }

    public static createLayer(neurons: number): Layer {
        return <Layer>{
            neurons: Array(neurons).fill(0).map(() => <Neuron>{
                synapses: [],
                bias: 0,
                value: 0
            }),
        };
    }


    public static connectNetwork(network: Network): void {
        let previousLayer: Layer = null;
        for (let i = 0; i < [network.input, ...network.hiddenLayers, network.output].length; i++) {
            let layer = [network.input, ...network.hiddenLayers, network.output][i];
            if (previousLayer) {
                this.connectLayers(previousLayer, layer, i.toString());
            }
            previousLayer = layer;
        }
    }

    public static connectLayers(a: Layer, b: Layer, layerIndex: string): void {
        for (let aNeuron of a.neurons) {
            for (let i = 0; i < b.neurons.length; i++) {
                aNeuron.synapses.push(<Synapse>{
                    targetLayerIndex: layerIndex,
                    targetNeuronIndex: i.toString(),
                    weight: 0
                });
            }
        }
    }
}