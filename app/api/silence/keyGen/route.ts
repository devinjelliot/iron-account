import { performKeygen } from "./keyGenLogic";

export async function POST() {
    try {
        const keyshares = await performKeygen();
        return new Response(JSON.stringify({ keyshares }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
