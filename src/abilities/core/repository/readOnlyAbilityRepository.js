import { AbilityChecker } from "../comparator/abilityChecker";
import { CompiledRules } from "../objects/compiledRules";
import { StorageInterface } from "../storage/storageInterface";

export class ReadOnlyAbilityRepository {
    
    /**
     * @type {StorageInterface}
     */
    #storageInterface;

    /**
     * @type {(string|number)}
     */
    #userId;

    /**
     * @param {(string|number)} userId 
     * @param {StorageInterface} storageInterface 
     */
    constructor(userId, storageInterface) {
        this.#userId = userId;
        this.#storageInterface = storageInterface;
    }


    getChecker() {
        const rules = this.#storageInterface.onGetRulesByUserId(this.#userId);
        return new AbilityChecker(new CompiledRules(rules));
    }
}
