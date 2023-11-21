import { storeData } from '@/utils/localStorage';
import { client } from '@passwordless-id/webauthn';

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

    const { success } = await registerResponse.json()
    console.log('success', success)
    storeData('credential', success.credential)

    if (success) {
        // Registration was successful 
        console.log('Registration was successful', success)

    }
    else {
        // Registration failed
        console.error('Registration failed')
    }
}

export default function PasskeyButton() {
    return (
        <button onClick={() => registerUser('notdevin')}>Register</button>
    )

}

// Path: app/passwordless/passkeyButton.tsx