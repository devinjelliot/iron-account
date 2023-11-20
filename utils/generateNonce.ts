// utils/generateNonce.js

/**
 * Generates a secure, random nonce.
 * @return {string} A unique nonce.
 */
export function generateNonce() {
    const randomBuffer = new Uint8Array(32);
    if (typeof window !== 'undefined' && window.crypto) {
        // For browser environments
        window.crypto.getRandomValues(randomBuffer);
    } else {
        // For Node.js environments
        require('crypto').randomFillSync(randomBuffer);
    }
    return Buffer.from(randomBuffer).toString('hex');
}
