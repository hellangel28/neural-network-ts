# Neural Network Stuff

## What is it?

It is a very simple neural network playing an even simpler game I called JumpDuckGame in my shear endless creativity.
The player will along the x-axis and has to jump/duck in order to evade blockades.
When jumping in one frame, the next frame can only be the normal or ducking state, flying is not possible.

A random genome will be generated with random weights and biases, and on the basis of that generations of 5000 genomes will be trained. The mutation of each of those genomes is
completely random, no back-propagation or anything like that (yet).

The best genome out of every training will be played, and after that, the next training will begin with the best genome of this generation as basis for the next generation.

### I/O

There are 3 inputs:

- 1 when the next block has no blockades, else 0
- 1 when the next block has a low blockade, else 0
- 1 when the next block has a high blockade, else 0

And there are 3 outputs:

- When player state should be normal
- When player state should be ducking
- When player state should be jumping

The highest output value wins, if input 1 is the highest, the player state will be normal, if 2, the state will be ducking and if 3, the state will be jumping.

### Score

For every tick, the player will get:

- 1 point when being in a normal state
- 0.9 points when jumping
- 0.5 points when ducking

### Example snapshots

```
JumpDuckGame


                                              
p    ██   ██        █    ███     ███          
|__█____█______________█_______█______█_█_____



Score: 4
Previous high-score: 6
Input normal: 1
Input low: 0
Input high: 0
Output normal: 0.6191815294852052
Output duck: -0.6035352641287246
Output jump: 0.5633228132818037

```

```
JumpDuckGame


                                              
 ██   ██        █    ███     ███              
p___█______________█_______█______█_█_______█_



Score: 4.5
Previous high-score: 283
Input normal: 1
Input low: 0
Input high: 0
Output normal: -0.5859755506342572
Output duck: -0.08648290063859931
Output jump: -0.1044683867827064

```

## Requirements

- TSC (Typescript Compiler)

### Optional

- NPM for `npm run <target>` shortcuts only

## Build it
All javascript files are part of the repository, a rebuild should not be needed.
However, if you want to play around yourself and change some stuff, execute `npm run build` or directly `tsc` to re-compile the typescript code to javascript.

## Run it

Execute `npm run start` or directly `node src/index.js` to execute it.