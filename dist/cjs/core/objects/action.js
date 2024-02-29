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
        if (!this.action.match(/^(([a-zA-Z0-9_\-])+|([*]){1})$/)) {
            throw new Error('Invalid action naming. Please use a combination of lowercase letter, number, dash and underscore only or a single star (*) character');
        }
    }
    /**
     * @returns string
     */
    get() {
        return this.action;
    }
    wholeAction() {
        return this.get() === '*';
    }
    toString() {
        return this.get();
    }
    match(action) {
        if (this.wholeAction()) {
            return true;
        }
        return this.get() === action;
    }
}
exports.Action = Action;
