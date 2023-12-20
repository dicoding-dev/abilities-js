"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadOnlyAbilityRepository = void 0;
const abilityChecker_1 = require("../comparator/abilityChecker");
const compiledRules_1 = require("../objects/compiledRules");
class ReadOnlyAbilityRepository {
    /**
     * @param {(string|number)} userId
     * @param {StorageInterface} storageInterface
     */
    constructor(userId, storageInterface) {
        this.userId = userId;
        this.storageInterface = storageInterface;
    }
    getChecker() {
        const rules = this.storageInterface.onGetRulesByUserId(this.userId);
        return new abilityChecker_1.AbilityChecker(new compiledRules_1.CompiledRules(rules));
    }
}
exports.ReadOnlyAbilityRepository = ReadOnlyAbilityRepository;
