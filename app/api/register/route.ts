// pages/api/register.js
import { API_URL } from '@/constants/nextauth';
import { server } from '@passwordless-id/webauthn';

export async function POST(req: any, res: any) {
    try {
        const registration = req.body;
        const challenge = registration.challenge;

        console.log("registration route", registration);
        console.log("challenge route", challenge);

        const expected = {
            challenge: challenge,
            origin: API_URL,
        };

        console.log("expected", expected);
        const registrationParsed = await server.verifyRegistration(registration, expected);

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Registration verification error:', error);
        return Response.json({ success: false }, { status: 500 });
    }
}




