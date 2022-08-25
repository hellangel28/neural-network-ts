import {Genome} from "../Training/NetworkTraining";

export enum PlayerState {
    normal = "normal",
    jumping = "jumping",
    ducking = "ducking",
}

export interface Player {
    state: PlayerState;
    score: number;
    dead: boolean;
}

export enum BlockType {
    normal = "normal",
    lowBlockade = "lowBlockade",
    highBlockade = "highBlockade",
}

export interface JumpDuckGenome extends Genome {
    game: JumpDuckGame;
}


export class JumpDuckGame {

    public player: Player = {
        dead: false,
        score: 0,
        state: PlayerState.normal,
    };
    public previousState: PlayerState = PlayerState.normal;

    public amountBlocks: number;
    public lastBlock: BlockType = null;
    public map: BlockType[];
    public maximumTicks: number;
    public executedTicks = 0;


    public constructor(map: BlockType[], maximumTicks: number) {
        this.map = JSON.parse(JSON.stringify(map));
        this.maximumTicks = maximumTicks;
        this.amountBlocks = map.length;
    }

    public tick(): boolean {
        if (this.player.dead) return false;
        ++this.executedTicks;
        if (this.executedTicks > this.maximumTicks) {
            this.player.dead = true;
            return true;
        }


        //handle movement
        if (this.player.state !== PlayerState.ducking && this.previousState == PlayerState.jumping) {
            this.player.state = PlayerState.normal;
        }

        //handle next block
        let currentBlock = this.lastBlock = this.map.shift();
        this.map.push(currentBlock);
        let hitLowBlockade = (currentBlock == BlockType.lowBlockade && this.player.state != PlayerState.jumping);
        let hitHighBlockade = (currentBlock == BlockType.highBlockade && this.player.state != PlayerState.ducking);
        if (hitHighBlockade || hitLowBlockade) {
            this.player.dead = true;
        } else {
            //increase score
            switch (this.player.state) {
                case PlayerState.normal:
                    this.player.score += 1;
                    break;
                case PlayerState.jumping:
                    this.player.score += .9;
                    break;
                case PlayerState.ducking:
                    this.player.score += .5;
                    break;
            }
        }

        this.previousState = this.player.state;
        return !this.player.dead;
    }

    public render() {
        console.clear();
        console.log("JumpDuckGame\n\n");
        let lines: string[] = [
            " ".repeat(this.amountBlocks + 1),
            " ".repeat(this.amountBlocks + 1),
            "_".repeat(this.amountBlocks + 1),
        ];


        //map
        let pos = 1;
        for (let block of this.map) {
            if (block == BlockType.highBlockade) {
                lines[1] = JumpDuckGame.replaceAt(lines[1], pos, "█")
            } else if (block == BlockType.lowBlockade) {
                lines[2] = JumpDuckGame.replaceAt(lines[2], pos, "█")
            }
            pos++;
        }

        //player
        if (this.player.state == PlayerState.jumping) {
            lines[0] = JumpDuckGame.replaceAt(lines[0], 0, "P");
            lines[1] = JumpDuckGame.replaceAt(lines[1], 0, "|");
        } else if (this.player.state == PlayerState.ducking) {
            lines[2] = JumpDuckGame.replaceAt(lines[2], 0, "p");
        } else if (this.player.state == PlayerState.normal) {
            lines[1] = JumpDuckGame.replaceAt(lines[1], 0, "p");
            lines[2] = JumpDuckGame.replaceAt(lines[2], 0, "|");
        }


        //render
        console.log(lines.join("\n"));
        console.log("\n\n");
    }

    private static replaceAt(text: string, index: number, replacement: string) {
        return text.substring(0, index) + replacement + text.substring(index + replacement.length);
    }

}