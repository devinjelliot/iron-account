import { generateNonce } from "@/utils/generateNonce";

export async function getChallenge() {
    const challenge = generateNonce(); // Your logic to generate a nonce
    return challenge;
}