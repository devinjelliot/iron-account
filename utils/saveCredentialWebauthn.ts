import prisma from '@/prisma/prisma'; // Ensure this path is correct for your project

type CredentialData = {
  id: string;
  publicKey: string;
  algorithm: string;
};

// Function to save the credential for a user
async function saveCredential(userId: number, credentialData: CredentialData) {
  try {
    // Use the Prisma client to create a new Credential record
    const credential = await prisma.credential.create({
      data: {
        credentialID: credentialData.id,
        publicKey: credentialData.publicKey,
        algorithm: credentialData.algorithm,
        user: { connect: { id: userId } },
      },
    });

    return credential;
  } catch (error) {
    console.error('Failed to save credential:', error);
    // Handle errors as appropriate for your application
    throw error;
  }
}

export default saveCredential;
