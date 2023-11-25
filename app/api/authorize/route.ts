import { authCounter } from "@/app/passwordless/authCounter";
import { API_URL } from "@/constants/nextauth";
import prisma from "@/prisma/prisma";
import { server as WebauthnServer } from "@passwordless-id/webauthn";

export async function POST(req: Request, res: Response) {
    try {
        const { credentials, challenge } = await req.json();
        console.log('credentials', credentials);

        const credentialId = credentials.credentialId as string;
        console.log('credetialId', credentialId);

        const storedCredentials = await prisma.credential.findUnique({
            where: { credentialID: credentialId },
            include: { user: true },

        });
        console.log('storedCredentials', storedCredentials);

        if (!storedCredentials) {
            return Response.json({ success: false }, { status: 401 });
        }


        let algorithm: "RS256" | "ES256";

        if (storedCredentials.algorithm === "RS256" || storedCredentials.algorithm === "ES256") {
            algorithm = storedCredentials.algorithm;
        } else {
            // Handle the case where the algorithm is not one of the expected types
            return Response.json({ success: false }, { status: 500 });
        }
        console.log('algorithm', algorithm);

        const credentialKey = {
            id: storedCredentials.credentialID,
            publicKey: storedCredentials.publicKey,
            algorithm: algorithm,
        }
        console.log('credentialKey', credentialKey);

        const expected = {
            challenge: challenge,
            origin: API_URL,
            userVerified: true,
            counter: storedCredentials.counter,
        };
        console.log('expected', expected);

        const verification = await WebauthnServer.verifyAuthentication(credentials, credentialKey, expected);
        console.log('Verification result:', verification);

        const isFirstAuthentication = storedCredentials.counter === 0;

        const authCount = authCounter(storedCredentials.counter, verification.authenticator.counter, isFirstAuthentication);

        if (verification && authCount) {
            // Update the counter in the database
            await prisma.credential.update({
                where: { credentialID: credentials.credentialId },
                data: { counter: verification.authenticator.counter },
            });

            const user = await prisma.user.findUnique({
                where: {
                    id: storedCredentials.user.id,
                },
            });

            return Response.json({ success: true, user: user }, { status: 200 });
        } else {
            return Response.json({ success: false }, { status: 401 });
        }

    } catch (error) {

        console.error('Assertion verification error:', error);
        return Response.json({ success: false }, { status: 500 });
    }
}