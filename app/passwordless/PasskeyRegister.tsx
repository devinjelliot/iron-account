import { registerUser } from '@/app/passwordless/registerUser';

export default function PasskeyButton() {
    return (
        <button onClick={() => registerUser('Mario Lopez')}>Register</button>

    )

}

// Path: app/passwordless/passkeyButton.tsx