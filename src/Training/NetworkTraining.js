"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkTraining = exports.Generation = void 0;
class Generation {
    genomes = [];
    getBestGenome() {
        let best;
        for (let genome of this.genomes) {
            if (!best || best.fitness < genome.fitness) {
                best = genome;
            }
        }
        return best;
    }
}
exports.Generation = Generation;
class NetworkTraining {
    amountGenomesPerGeneration;
    mutator;
    fitness;
    startTraining;
    tick;
    currentGeneration;
    constructor(amountGenomesPerGeneration, mutator, fitness, startTraining, tick) {
        this.amountGenomesPerGeneration = amountGenomesPerGeneration;
        this.mutator = mutator;
        this.fitness = fitness;
        this.startTraining = startTraining;
        this.tick = tick;
    }
    async train(genome) {
        return new Promise((resolve) => {
            this.currentGeneration = this.generateGeneration(genome);
            let promises = [];
            for (let gen of this.currentGeneration.genomes) {
                promises.push(this.executeTraining(gen));
            }
            console.log("Training " + this.currentGeneration.genomes.length + " genomes ...");
            Promise.all(promises).then(() => resolve(this.currentGeneration.getBestGenome()));
        });
    }
    generateGeneration(genome) {
        let generation = new Generation();
        for (let i = 0; i < this.amountGenomesPerGeneration; ++i) {
            generation.genomes.push(this.createMutation(genome));
        }
        return generation;
    }
    createMutation(genome) {
        let newGenome = JSON.parse(JSON.stringify(genome));
        this.mutator.mutate(newGenome.network);
        return newGenome;
    }
    executeTraining(genome) {
        return new Promise((resolve) => {
            this.startTraining(genome);
            while (this.tick(genome)) {
            }
            genome.fitness = this.fitness(genome);
            resolve(genome);
        });
    }
}
exports.NetworkTraining = NetworkTraining;
//# sourceMappingURL=NetworkTraining.js.map