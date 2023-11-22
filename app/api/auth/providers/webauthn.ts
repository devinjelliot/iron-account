
const WebauthnProvider = {
    id: 'webauthn',
    name: 'Webauthn',
    type: 'credentials',
    credentials: {

    },
    authorize: async (credentials: {}, req: Request) => {
        const user = await verifyUserWithWebauthn(req);
        if (user) {
            return Promise.resolve(user);
        }
        return Promise.resolve(null);
    },
};

// async function verifyUserWithWebauthn(req: Request) {
//   try {
//     const webAuthnResponse = req.body; // Make sure this matches the structure of the response from your client
//     console.log('WebAuthn response:', webAuthnResponse);

//     // Retrieve the stored credential ID and public key for this user
//     const userCredential = await prisma.credential.findUnique({
//       where: { credentialID: webAuthnResponse.id },
//     });

//     if (!userCredential) {
//       throw new Error('Credential not found');
//     }

//     // Expected data for verification (adjust according to your implementation)
//     const expected = {
//       challenge: webAuthnResponse.challenge, // The challenge that was sent to the client
//       origin: process.env.WEBSITE_URL, // Your website's origin
//       // Additional expected fields if necessary
//     };

//     // Verify the authentication response
//     await server.verifyAuthentication(webAuthnResponse, userCredential, expected);

//     // If verification is successful, retrieve and return the user
//     const user = await getUserById(userCredential.userId);
//     return user;
//   } catch (error) {
//     console.error('WebAuthn verification error:', error);
//     return null;
//   }
// }

// export default WebauthnProvider;
