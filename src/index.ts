import {BlockType, JumpDuckGame, JumpDuckGenome, PlayerState} from "./Game/JumpDuckGame";
import {sleep} from "./Sleep";
import {Network} from "./Network";
import {NetworkBuilder} from "./NetworkBuilder";
import {RandomizeMutator} from "./Mutators/RandomizeMutator";
import {NetworkProcessor} from "./NetworkProcessor";
import {getHighestValueNeuronIndex} from "./NetworkUtils";
import {NetworkTraining} from "./Training/NetworkTraining";
import {RandomMutator} from "./Mutators/RandomMutator";
import {mapOne, mapTwo} from "./Game/JumpDuckGameMaps";

let startTraining = (genome: JumpDuckGenome) => {
    genome.game = new JumpDuckGame(mapTwo, 500);
};
let gameTick = (genome: JumpDuckGenome) => {

    let game = genome.game;
    let nextBlock = game.map[0];
    genome.network.input.neurons[0].value = nextBlock == BlockType.normal ? 1 : 0;
    genome.network.input.neurons[1].value = nextBlock == BlockType.lowBlockade ? 1 : 0;
    genome.network.input.neurons[2].value = nextBlock == BlockType.highBlockade ? 1 : 0;

    NetworkProcessor.processNetwork(genome.network);

    let highestIndex = getHighestValueNeuronIndex(genome.network.output);
    switch (highestIndex) {
        case "0":
            game.player.state = PlayerState.normal;
            break;
        case "1":
            game.player.state = PlayerState.ducking;
            break;
        case "2":
            game.player.state = PlayerState.jumping;
            break;
    }

    return genome.game.tick();
};

let training = new NetworkTraining(
    5000,
    new RandomMutator(0, 0.3),
    (genome: JumpDuckGenome) => {
        return genome.game.player.score;
    },
    startTraining,
    gameTick,
)

let network: Network = NetworkBuilder.createNetwork(3, 3, 1, 5);
let mutator = new RandomizeMutator();
mutator.mutate(network);
let startGenome: JumpDuckGenome = {
    game: null,
    network: network,
    fitness: 0
}

async function executeTraining(initialGenome: JumpDuckGenome) {
    console.log("Starting training ...");
    return training.train(initialGenome).then((genome: JumpDuckGenome) => {
        console.log("Finished training - best genome: " + genome.fitness);

        console.log("Playing best genome...");
        sleep(1500);
        return playGenome(genome).then(() => executeTraining(genome));
    })
}

async function playGenome(genome: JumpDuckGenome): Promise<JumpDuckGenome> {
    return new Promise<JumpDuckGenome>((resolve) => {
        let previousScore = genome.fitness;
        startTraining(genome);
        do {
            genome.game.render();
            console.log("Score: " + genome.game.player.score + "\nPrevious high-score: " + previousScore);
            console.log("Input normal: " + genome.network.input.neurons[0].value);
            console.log("Input low: " + genome.network.input.neurons[1].value);
            console.log("Input high: " + genome.network.input.neurons[2].value);
            console.log("Output normal: " + genome.network.output.neurons[0].value);
            console.log("Output duck: " + genome.network.output.neurons[1].value);
            console.log("Output jump: " + genome.network.output.neurons[2].value);
            sleep(200);
        }
        while (gameTick(genome))
        genome.game.render();
        console.log("Died!\nState: " + genome.game.player.state + "\nBlock: " + genome.game.lastBlock + "\nScore: " + genome.game.player.score);
        resolve(genome);
    })
}

executeTraining(startGenome);



