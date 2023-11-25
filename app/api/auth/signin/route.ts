import { API_URL } from "@/constants/nextauth";

export async function POST(req: Request, res: Response) {
    try {

        const { authentication, challenge } = await req.json();

        const expected = {
            challenge: challenge,
            origin: API_URL,
        };



        return Response.json({ success: true, userId: userId }, { status: 200 });
    } catch (error) {
        console.error('Authentication verification error:', error);
        return Response.json({ success: false }, { status: 500 });
    }
}