import { registerUser } from '@/app/passwordless/registerUser';

export default function PasskeyButton() {
    return (
        <button onClick={() => registerUser('Ghengis Kahn')}>Register</button>

    )

}

// Path: app/passwordless/passkeyButton.tsx