import { AbilityChecker } from "../comparator/abilityChecker";
import { CompiledRules } from "../objects/compiledRules";
import { StorageInterface } from "../storage/storageInterface";

export class ReadOnlyAbilityRepository {
    
    /**
     * @type {StorageInterface}
     */
    private storageInterface: StorageInterface;

    /**
     * @type {(string|number)}
     */
    private userId: (string|number);

    /**
     * @param {(string|number)} userId 
     * @param {StorageInterface} storageInterface 
     */
    constructor(userId: (string | number), storageInterface: StorageInterface) {
        this.userId = userId;
        this.storageInterface = storageInterface;
    }


    getChecker() {
        const rules = this.storageInterface.onGetRulesByUserId(this.userId);
        return new AbilityChecker(new CompiledRules(rules));
    }
}
