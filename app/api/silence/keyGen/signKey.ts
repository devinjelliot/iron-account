import {
    P1Signer,
    P2Signer,
    generateSessionId
} from "@silencelaboratories/two-party-ecdsa-js";

import { randomBytes } from "crypto";
import { performKeygen } from "./keyGenLogic";

async function signature() {
    const keyshares = await performKeygen();
    if (keyshares === null) {
        throw new Error("Keygen failed");
    }

    console.time("signature");

    const sessionId = await generateSessionId();
    const messageHash = randomBytes(32);
    console.log("messageHash", messageHash.toString("hex"));

    console.log("pubkey", keyshares[0].data.root_public_key);

    const p1 = await P1Signer.init(sessionId, keyshares[0], messageHash, "m");
    const p2 = await P2Signer.init(sessionId, keyshares[1], messageHash, "m");

    // Round 1
    const msg1 = await p1.genMsg1();
    const msg2 = await p2.processMsg1(msg1);

    // Round 2
    const [sign, msg3] = await p1.processMsg2(msg2);
    const signature = await p2.processMsg3(msg3);
    console.timeEnd("signature");
    console.log("p1Sign", sign.sign);
    console.log("p2Sign", signature.sign);
}

signature();
