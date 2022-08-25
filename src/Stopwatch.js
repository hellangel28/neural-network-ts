"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stopwatch = void 0;
class Stopwatch {
    startTime;
    start() {
        this.startTime = this.getCurrentTime();
    }
    getCurrentTime() {
        return new Date().getTime();
    }
    getTime() {
        if (!this.startTime)
            return 0;
        return this.getCurrentTime() - this.startTime;
    }
    getMs() {
        return this.getTime() / 1000;
    }
}
exports.Stopwatch = Stopwatch;
//# sourceMappingURL=Stopwatch.js.map