import { client } from "@passwordless-id/webauthn";
import { signIn } from "next-auth/react";


export async function retrieveUser() {
    const response = await fetch('/api/getChallenge');
    const challengeData = await response.json();
    console.log('challenge signin', challengeData);

    const challenge = challengeData.challenge as string;
    console.log('challenge', challenge);

    const authentication = await client.authenticate([], challenge, {
        authenticatorType: 'auto',
        userVerification: 'required',
        timeout: 60000,
    })
    console.log('authentication', authentication);

    let authResponse;
    try {
        authResponse = await fetch('/api/authorize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                credentials: authentication,
                challenge: challenge,
            }),
        })
        console.log('authResponse', authResponse);
    } catch (error) {
        console.error('Error while sending the registration to the server', error);
        return;
    }

    const authResult = await authResponse.json();
    console.log('Authentication result', authResult);

    if (authResult.success) {
        // Authentication was successful 
        console.log('Authentication was successful', authResult.success);

        // Use the userId from the server response
        const userId = authResult.userId;
        console.log('userId client route', userId)

        // Now call signIn with the obtained userId
        signIn('credentials', { userId, redirect: false });
        console.log('signIn', signIn)

    }
}