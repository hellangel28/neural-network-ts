"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JumpDuckGame_1 = require("./Game/JumpDuckGame");
const Sleep_1 = require("./Sleep");
const NetworkBuilder_1 = require("./NetworkBuilder");
const RandomizeMutator_1 = require("./Mutators/RandomizeMutator");
const NetworkProcessor_1 = require("./NetworkProcessor");
const NetworkUtils_1 = require("./NetworkUtils");
const NetworkTraining_1 = require("./Training/NetworkTraining");
const RandomMutator_1 = require("./Mutators/RandomMutator");
const JumpDuckGameMaps_1 = require("./Game/JumpDuckGameMaps");
let startTraining = (genome) => {
    genome.game = new JumpDuckGame_1.JumpDuckGame(JumpDuckGameMaps_1.mapTwo, 500);
};
let gameTick = (genome) => {
    let game = genome.game;
    let nextBlock = game.map[0];
    genome.network.input.neurons[0].value = nextBlock == JumpDuckGame_1.BlockType.normal ? 1 : 0;
    genome.network.input.neurons[1].value = nextBlock == JumpDuckGame_1.BlockType.lowBlockade ? 1 : 0;
    genome.network.input.neurons[2].value = nextBlock == JumpDuckGame_1.BlockType.highBlockade ? 1 : 0;
    NetworkProcessor_1.NetworkProcessor.processNetwork(genome.network);
    let highestIndex = (0, NetworkUtils_1.getHighestValueNeuronIndex)(genome.network.output);
    switch (highestIndex) {
        case "0":
            game.player.state = JumpDuckGame_1.PlayerState.normal;
            break;
        case "1":
            game.player.state = JumpDuckGame_1.PlayerState.ducking;
            break;
        case "2":
            game.player.state = JumpDuckGame_1.PlayerState.jumping;
            break;
    }
    return genome.game.tick();
};
let training = new NetworkTraining_1.NetworkTraining(5000, new RandomMutator_1.RandomMutator(0, 0.3), (genome) => {
    return genome.game.player.score;
}, startTraining, gameTick);
let network = NetworkBuilder_1.NetworkBuilder.createNetwork(3, 3, 1, 5);
let mutator = new RandomizeMutator_1.RandomizeMutator();
mutator.mutate(network);
let startGenome = {
    game: null,
    network: network,
    fitness: 0
};
async function executeTraining(initialGenome) {
    console.log("Starting training ...");
    return training.train(initialGenome).then((genome) => {
        console.log("Finished training - best genome: " + genome.fitness);
        console.log("Playing best genome...");
        (0, Sleep_1.sleep)(1500);
        return playGenome(genome).then(() => executeTraining(genome));
    });
}
async function playGenome(genome) {
    return new Promise((resolve) => {
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
            (0, Sleep_1.sleep)(200);
        } while (gameTick(genome));
        genome.game.render();
        console.log("Died!\nState: " + genome.game.player.state + "\nBlock: " + genome.game.lastBlock + "\nScore: " + genome.game.player.score);
        resolve(genome);
    });
}
executeTraining(startGenome);
//# sourceMappingURL=index.js.map