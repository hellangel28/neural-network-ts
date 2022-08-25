
export interface Synapse {
    targetLayerIndex: string;
    targetNeuronIndex: string;
    weight: number;
}

export interface Neuron {
    bias: number;
    synapses: Synapse[];
    value: number;
}

export interface Layer {
    neurons: Neuron[];
}

export interface Network {
    input: Layer;
    hiddenLayers: Layer[];
    output: Layer;
}