"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayEqual = void 0;
function isArrayEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (const itemA of a) {
        if (!b.find((predicate) => predicate === itemA)) {
            return false;
        }
    }
    return true;
}
exports.isArrayEqual = isArrayEqual;
