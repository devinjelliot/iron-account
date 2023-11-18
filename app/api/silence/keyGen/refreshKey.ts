import {
    generateSessionId
} from "@silencelaboratories/two-party-ecdsa-js";
import { performKeygen } from "./keyGenLogic";

async function refresh() {
    const keyshares = await performKeygen();

    if (!keyshares) {
        throw new Error("Failed to generate keyshares");
    }

    console.log(
        "P1 keyshare pubkey:",
        `0x${keyshares[0].data.root_public_key.point}`,
    );
    console.log(
        "P2 keyshare pubkey:",
        `0x${keyshares[1].data.root_public_key.point}`,
    );
    const sessionId = await generateSessionId();

    /// Initialize with old keyshare
    const p1 = await keyshares[0].getRefreshInstance(sessionId);

    /// Initialize with old keyshare
    const p2 = await keyshares[1].getRefreshInstance(sessionId);

    // Round 1
    const msg1 = await p1.genMsg1();
    const msg2 = await p2.processMsg1(msg1);

    // Round 2
    const [p1Keyshare, msg3] = await p1.processMsg2(msg2);

    const p2Keyshare = await p2.processMsg3(msg3);

    console.log("Successfully refreshed keyshares!");
    console.log(
        "Public key after refresh (should remain the same as before): ",
        `0x${p1Keyshare.data.root_public_key.point}`,
    );
}

refresh();
