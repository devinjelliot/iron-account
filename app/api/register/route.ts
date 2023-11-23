// pages/api/register.js
import { API_URL } from '@/constants/nextauth';
import { createInitialSession } from '@/utils/createInitialSession';
import saveCredential from '@/utils/saveCredentialWebauthn';
import { server } from '@passwordless-id/webauthn';

export async function POST(req: Request, res: Response) {
    try {
        await createInitialSession();

        const { registration, challenge } = await req.json();

        const expected = {
            challenge: challenge,
            origin: API_URL,
        };

        const registrationParsed = await server.verifyRegistration(registration, expected);
        console.log('Registration parsed:', registrationParsed);

        const { userId } = await saveCredential(registrationParsed.credential);
        console.log('userId register route', userId);


        // saveCredential(registrationParsed.credential)
        //     .then((credential) => {
        //         console.log('Credential saved:', credential);
        //     })
        //     .catch((error) => {
        //         console.error('Failed to save credential:', error);
        //     });

        return Response.json({ success: true, userId: userId }, { status: 200 });
    } catch (error) {
        console.error('Registration verification error:', error);
        return Response.json({ success: false }, { status: 500 });
    }
}
