// authCounter.ts:
export function authCounter(storedCounter: number, authenticatorCounter: number): boolean {
    // The authenticator counter must always be greater than the stored counter.
    return authenticatorCounter > storedCounter;
}

// if (authentication.authenticator.counter <= expected.counter)
// throw new Error(`Unexpected authenticator counter: ${authentication.authenticator.counter} (should be > ${expected.counter})`)
