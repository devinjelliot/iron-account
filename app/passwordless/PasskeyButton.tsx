import { registerUser } from '@/utils/registerUser';

export default function PasskeyButton() {
    return (
        <button onClick={() => registerUser('notdevin')}>Register</button>
    )

}

// Path: app/passwordless/passkeyButton.tsx