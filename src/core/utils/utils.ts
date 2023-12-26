export function isArrayEqual(a: any[], b: any[]) {
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