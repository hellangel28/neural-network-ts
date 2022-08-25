import {Network} from "../Network";
import {NetworkMutatorInterface} from "../NetworkMutatorInterface";

export interface Genome {
    network: Network;
    fitness: number;
}

export class Generation {
    public genomes: Genome[] = [];

    public getBestGenome(): Genome {
        let best: Genome;
        for (let genome of this.genomes) {
            if (!best || best.fitness < genome.fitness) {
                best = genome;
            }
        }
        return best;
    }
}

export class NetworkTraining {
    private readonly amountGenomesPerGeneration: number;
    private mutator: NetworkMutatorInterface;
    private readonly fitness: (genome: Genome) => number;
    private readonly startTraining: (genome: Genome) => void;
    private readonly tick: (genome: Genome) => boolean;
    private currentGeneration: Generation;


    constructor(
        amountGenomesPerGeneration: number,
        mutator: NetworkMutatorInterface,
        fitness: (genome: Genome) => number,
        startTraining: (genome: Genome) => void,
        tick: (genome: Genome) => boolean
    ) {
        this.amountGenomesPerGeneration = amountGenomesPerGeneration;
        this.mutator = mutator;
        this.fitness = fitness;
        this.startTraining = startTraining;
        this.tick = tick;
    }

    public async train(genome: Genome): Promise<Genome> {
        return new Promise<Genome>((resolve) => {
            this.currentGeneration = this.generateGeneration(genome);
            let promises: Promise<Genome>[] = [];
            for (let gen of this.currentGeneration.genomes) {
                promises.push(this.executeTraining(gen));
            }
            console.log("Training " + this.currentGeneration.genomes.length + " genomes ...");
            Promise.all(promises).then(() => resolve(this.currentGeneration.getBestGenome()))
        });
    }

    private generateGeneration(genome: Genome): Generation {
        let generation = new Generation();
        for (let i = 0; i < this.amountGenomesPerGeneration; ++i) {
            generation.genomes.push(this.createMutation(genome));
        }
        return generation;
    }

    private createMutation(genome: Genome) {
        let newGenome = JSON.parse(JSON.stringify(genome));
        this.mutator.mutate(newGenome.network);
        return newGenome;
    }

    private executeTraining(genome: Genome): Promise<Genome> {
        return new Promise((resolve) => {

            this.startTraining(genome);
            while (this.tick(genome)) {
            }
            genome.fitness = this.fitness(genome);

            resolve(genome);
        });
    }
}
