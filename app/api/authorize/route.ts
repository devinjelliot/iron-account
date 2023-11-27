import { API_URL } from "@/constants/nextauth";
import prisma from "@/prisma/prisma";
import { server as WebauthnServer } from "@passwordless-id/webauthn";

export async function POST(req: Request, res: Response) {
    try {
        const { credentials, challenge } = await req.json();
        //console.log('credentials', credentials);

        const credentialId = credentials.credentialId as string;
        //console.log('credentialId', credentialId);

        const storedCredentials = await prisma.credential.findUnique({
            where: { credentialID: credentialId },
            include: { user: true },
        });
        //console.log('storedCredentials', storedCredentials);

        if (!storedCredentials) {
            return Response.json({ success: false }, { status: 401 });
        }

        let algorithm: "RS256" | "ES256";
        if (storedCredentials.algorithm === "RS256" || storedCredentials.algorithm === "ES256") {
            algorithm = storedCredentials.algorithm;
        } else {
            return Response.json({ success: false }, { status: 500 });
        }
        //console.log('algorithm', algorithm);

        const credentialKey = {
            id: storedCredentials.credentialID,
            publicKey: storedCredentials.publicKey,
            algorithm: algorithm,
        };
        //console.log('credentialKey', credentialKey);

        const storedCounter = storedCredentials.counter;
        console.log('storedCounter', storedCounter);

        const expected = {
            challenge: challenge,
            origin: API_URL,
            userVerified: true,
            counter: 1,
        };
        //console.log('expected', expected);

        const verification = await WebauthnServer.verifyAuthentication(credentials, credentialKey, expected);
        console.log('Verification result:', verification);

        // The authenticator needs to return a counter that is greater than the stored counter before we can authenticate the user && update the stored counter
        // const authCountValid = authCounter(storedCounter, verification.authenticator.counter);
        // console.log('authCountValid', authCountValid);
        // console.log('verification.authenticator.counter', verification.authenticator.counter);

        if (verification) {

            await prisma.credential.update({
                where: { credentialID: credentialId },
                data: { counter: verification.authenticator.counter },
            });

            const user = await prisma.user.findUnique({
                where: { id: storedCredentials.userId },
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
