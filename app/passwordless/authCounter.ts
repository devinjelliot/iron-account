export function authCounter(storedCounter: number, authenticatorCounter: number, isFirstAuthentication: boolean): boolean {
    if (isFirstAuthentication) {
        return authenticatorCounter <= 1;
    } else {
        return authenticatorCounter <= storedCounter;
    }
}