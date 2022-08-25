"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JumpDuckGame = exports.BlockType = exports.PlayerState = void 0;
var PlayerState;
(function (PlayerState) {
    PlayerState["normal"] = "normal";
    PlayerState["jumping"] = "jumping";
    PlayerState["ducking"] = "ducking";
})(PlayerState = exports.PlayerState || (exports.PlayerState = {}));
var BlockType;
(function (BlockType) {
    BlockType["normal"] = "normal";
    BlockType["lowBlockade"] = "lowBlockade";
    BlockType["highBlockade"] = "highBlockade";
})(BlockType = exports.BlockType || (exports.BlockType = {}));
class JumpDuckGame {
    player = {
        dead: false,
        score: 0,
        state: PlayerState.normal,
    };
    previousState = PlayerState.normal;
    amountBlocks;
    lastBlock = null;
    map;
    maximumTicks;
    executedTicks = 0;
    constructor(map, maximumTicks) {
        this.map = JSON.parse(JSON.stringify(map));
        this.maximumTicks = maximumTicks;
        this.amountBlocks = map.length;
    }
    tick() {
        if (this.player.dead)
            return false;
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
        }
        else {
            //increase score
            switch (this.player.state) {
                case PlayerState.normal:
                case PlayerState.jumping:
                    this.player.score += 1;
                    break;
                case PlayerState.ducking:
                    this.player.score += .5;
                    break;
            }
        }
        this.previousState = this.player.state;
        return !this.player.dead;
    }
    render() {
        console.clear();
        console.log("JumpDuckGame\n\n");
        let lines = [
            " ".repeat(this.amountBlocks + 1),
            " ".repeat(this.amountBlocks + 1),
            "_".repeat(this.amountBlocks + 1),
        ];
        //map
        let pos = 1;
        for (let block of this.map) {
            if (block == BlockType.highBlockade) {
                lines[1] = JumpDuckGame.replaceAt(lines[1], pos, "█");
            }
            else if (block == BlockType.lowBlockade) {
                lines[2] = JumpDuckGame.replaceAt(lines[2], pos, "█");
            }
            pos++;
        }
        //player
        if (this.player.state == PlayerState.jumping) {
            lines[0] = JumpDuckGame.replaceAt(lines[0], 0, "P");
            lines[1] = JumpDuckGame.replaceAt(lines[1], 0, "|");
        }
        else if (this.player.state == PlayerState.ducking) {
            lines[2] = JumpDuckGame.replaceAt(lines[2], 0, "p");
        }
        else if (this.player.state == PlayerState.normal) {
            lines[1] = JumpDuckGame.replaceAt(lines[1], 0, "p");
            lines[2] = JumpDuckGame.replaceAt(lines[2], 0, "|");
        }
        //render
        console.log(lines.join("\n"));
        console.log("\n\n");
    }
    static replaceAt(text, index, replacement) {
        return text.substring(0, index) + replacement + text.substring(index + replacement.length);
    }
}
exports.JumpDuckGame = JumpDuckGame;
//# sourceMappingURL=JumpDuckGame.js.map