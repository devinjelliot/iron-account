import { client } from '@passwordless-id/webauthn';
import { signIn } from 'next-auth/react';

async function registerUser(username: string) {
    const response = await fetch('/api/getChallenge');
    const challengeData = await response.json();
    console.log('challengeData', challengeData)

    const challenge = challengeData.challenge as string;
    console.log('challenge', challenge)

    const registration = await client.register(username, challenge, {
        authenticatorType: 'auto',
        userVerification: 'required',
        timeout: 60000,
        attestation: false,
        userHandle: window.crypto.getRandomValues(new Uint8Array(16)).toString(),
        debug: false,
    })

    let registerResponse;
    try {
        registerResponse = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                registration: registration,
                challenge: challenge,
            }),
        })
    } catch (error) {
        console.error('Error while sending the registration to the server', error);
        return;
    }

    const registrationResult = await registerResponse.json();
    console.log('Registration result', registrationResult);

    if (registrationResult.success) {
        // Registration was successful 
        console.log('Registration was successful', registrationResult.success);

        // Use the userId from the server response
        const userId = registrationResult.userId;
        console.log('userId client route', userId)

        // Now call signIn with the obtained userId
        signIn('credentials', { userId, redirect: false });
        console.log('signIn', signIn)

    } else {
        // Registration failed
        console.error('Registration failed');
    }
}

export default function PasskeyButton() {
    return (
        <button onClick={() => registerUser('notdevin')}>Register</button>
    )

}

// Path: app/passwordless/passkeyButton.tsx