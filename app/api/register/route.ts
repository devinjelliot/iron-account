// pages/api/register.js
import { API_URL } from '@/constants/nextauth';
import { server } from '@passwordless-id/webauthn';

export async function POST(req: Request, res: Response) {
    try {
        const registration = await req.json();
        const challenge = registration.challenge;

        console.log("registration route", registration);
        console.log("challenge route", challenge);

        const expected = {
            challenge: challenge,
            origin: API_URL,
        };

        // Decode clientData from base64url to a JSON string
        const clientDataJson = Buffer.from(registration.registration.clientData, 'base64').toString('utf8');

        // Try parsing the JSON string into a JavaScript object
        try {
            const clientData = JSON.parse(clientDataJson);
            console.log('clientData', clientData);
        } catch (error) {
            console.error('Error parsing clientData:', error);
        }

        // Log the properties of the registration object
        console.log("registration.username", registration.registration.username);
        console.log("registration.credential", registration.registration.credential);
        console.log("registration.authenticatorData", registration.registration.authenticatorData);
        console.log("registration.clientData", registration.registration.clientData);

        console.log("expected", expected);
        const registrationParsed = await server.verifyRegistration(registration, expected);
        console.log("registrationParsed", registrationParsed);

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Registration verification error:', error);
        return Response.json({ success: false }, { status: 500 });
    }
}




