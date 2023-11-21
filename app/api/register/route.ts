// pages/api/register.js
import { API_URL } from '@/constants/nextauth';
import { server } from '@passwordless-id/webauthn';

export async function POST(req: Request, res: Response) {
    try {

        const { registration, challenge } = await req.json();

        const expected = {
            challenge: challenge,
            origin: API_URL,
        };

        const registrationParsed = await server.verifyRegistration(registration, expected);

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Registration verification error:', error);
        return Response.json({ success: false }, { status: 500 });
    }
}
