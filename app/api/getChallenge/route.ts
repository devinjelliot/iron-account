import { generateNonce } from "@/utils/generateNonce";

// pages/api/getChallenge.js
export async function GET() {
    // Generate a unique challenge, for example, a random string or UUID
    const challenge = generateNonce(); // Implement this function
    console.log("challenge", challenge);

    // Store the challenge with the session or in a database with a timestamp

    return Response.json({ challenge })
}
