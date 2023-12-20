import { AbilityChecker } from "../comparator/abilityChecker.js";
import { CompiledRules } from "../objects/compiledRules.js";
export class ReadOnlyAbilityRepository {
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
        return new AbilityChecker(new CompiledRules(rules));
    }
}
