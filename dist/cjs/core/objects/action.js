"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
class Action {
    /**
     * @param {string} action the action name. Cannot be empty or null
     */
    constructor(action = '*') {
        var _a;
        this.action = (_a = action === null || action === void 0 ? void 0 : action.trim()) !== null && _a !== void 0 ? _a : '';
        if (this.action.length < 1) {
            throw new Error('Action must not be empty');
        }
    }
    /**
     * @returns string
     */
    get() {
        return this.action;
    }
    toString() {
        return this.get();
    }
}
exports.Action = Action;
