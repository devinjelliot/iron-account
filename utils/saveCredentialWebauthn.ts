import prisma from '@/prisma/prisma'; // Ensure this path is correct for your project
import { v4 as uuidv4 } from 'uuid';


type CredentialData = {
  id: string;
  publicKey: string;
  algorithm: string;
};

// Function to save the credential for a user
async function saveCredential(credentialData: CredentialData) {
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

export default saveCredential;
