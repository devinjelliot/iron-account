// app/mutations/register.ts
import { server } from '@passwordless-id/webauthn';

export async function register(input: any) {
    try {
        const registration = input.registrationData;
        const expected = {
            challenge: input.challenge,
            origin: process.env.WEBSITE_URL,
        };

        // TODO: Key is locally stored now, will need a db to be useful
        const registrationParsed = await server.verifyRegistration(registration, expected);


        return { success: true };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false };
    }
}