import prisma from '@/prisma/prisma'; // Ensure this path is correct for your project
import { v4 as uuidv4 } from 'uuid';


type CredentialData = {
  id: string;
  publicKey: string;
  algorithm: "ES256" | "RS256";
};

// Function to save the credential for a user
async function storeCredential(credentialData: CredentialData, initialCounter = 1) {
  try {

    const userId = uuidv4();
    console.log('userId uuid', userId);
    const user = await prisma.user.create({
      data: {
        id: userId,
      },
    });

    const credential = await prisma.credential.create({
      data: {
        credentialID: credentialData.id,
        publicKey: credentialData.publicKey,
        algorithm: credentialData.algorithm,
        counter: initialCounter,
        user: { connect: { id: user.id } }
      },
    });


    return { credential, userId };
  } catch (error) {
    console.error('Failed to save credential:', error);
    // Handle errors as appropriate for your application
    throw error;
  }
}

export default storeCredential;
