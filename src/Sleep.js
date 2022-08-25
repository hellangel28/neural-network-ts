"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const sleep = (ms) => {
    let currentTime = new Date().getTime();
    while ((new Date().getTime() - currentTime) < ms) {
    }
};
exports.sleep = sleep;
//# sourceMappingURL=Sleep.js.map