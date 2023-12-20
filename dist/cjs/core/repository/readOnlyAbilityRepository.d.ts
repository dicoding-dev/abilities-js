import { AbilityChecker } from "../comparator/abilityChecker";
import { StorageInterface } from "../storage/storageInterface";
export declare class ReadOnlyAbilityRepository {
    /**
     * @type {StorageInterface}
     */
    private storageInterface;
    /**
     * @type {(string|number)}
     */
    private userId;
    /**
     * @param {(string|number)} userId
     * @param {StorageInterface} storageInterface
     */
    constructor(userId: (string | number), storageInterface: StorageInterface);
    getChecker(): AbilityChecker;
}
