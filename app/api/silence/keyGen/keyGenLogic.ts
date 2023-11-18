import {
    P1Keygen,
    P1KeyshareV2,
    P2Keygen,
    generateSessionId,
} from "@silencelaboratories/two-party-ecdsa-js";
import { P2KeyshareV2 } from "@silencelaboratories/two-party-ecdsa-js/dist/types";

export async function performKeygen(): Promise<[P1KeyshareV2, P2KeyshareV2]> {
    console.time("keygen");
    const sessionId = await generateSessionId();
    const p1 = await P1Keygen.init(sessionId);
    const p2 = await P2Keygen.init(sessionId);

    // Round 1
    const msg1 = await p1.genMsg1();
    const msg2 = await p2.processMsg1(msg1);

    // Round 2
    const [p1Keyshare, msg3] = await p1.processMsg2(msg2);

    const p2Keyshare = await p2.processMsg3(msg3);
    console.timeEnd("keygen");

    return [p1Keyshare, p2Keyshare];
}
