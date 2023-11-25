import { retrieveUser } from "./retrieveUser";

export async function PasskeySignIn() {
    return (
        <button onClick={() => retrieveUser()}>Sign In</button>
    )
}