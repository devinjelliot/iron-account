import { performKeygen } from "@/app/silence/keyGenLogic";

/*
    Silence is a protocol that allows for the creation of a shared secret between two parties.
    The secret is split into shares, and the shares are distributed to the parties.
    The secret can only be recovered if a certain number of shares are combined.
    The number of shares required to recover the secret is called the threshold.
    The threshold is set when the secret is created.
*/

export async function POST() {
    try {
        const keyshares = await performKeygen();
        return new Response(JSON.stringify({ keyshares }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
