import { registerUser } from '@/app/passwordless/registerUser';

export default function PasskeyButton() {
    return (
        <button onClick={() => registerUser('Greg Lyons')}>Register</button>

    )

}

// Path: app/passwordless/passkeyButton.tsx