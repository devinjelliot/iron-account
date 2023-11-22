// pages/api/register.js
import { API_URL } from '@/constants/nextauth';
import saveCredential from '@/utils/saveCredentialWebauthn';
import { server } from '@passwordless-id/webauthn';

export async function POST(req: Request, res: Response) {
    try {

        const { registration, challenge } = await req.json();

        const expected = {
            challenge: challenge,
            origin: API_URL,
        };

        const registrationParsed = await server.verifyRegistration(registration, expected);
        console.log('Registration parsed:', registrationParsed);
        saveCredential(registrationParsed.credential)
            .then((credential) => {
                console.log('Credential saved:', credential);
            })
            .catch((error) => {
                console.error('Failed to save credential:', error);
            });

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Registration verification error:', error);
        return Response.json({ success: false }, { status: 500 });
    }
}
