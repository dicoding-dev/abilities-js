export declare abstract class StorageInterface {
    /**
     * This method called at initial, or any changes made after 'commit()' called.
     * It will retrieve all rules by specific userIdentification.
     *
     * @returns {(string[]|object[])} Can be a list of object that contains id and rule property.
     *                  Or, it can be a list of rule string (read only mode).
     */
    abstract onGetRulesByUserId(userIdentification: number | string): string[] | object[];
}
