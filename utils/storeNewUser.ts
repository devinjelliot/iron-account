import prisma from "../prisma/prisma"

export async function storeNewUser(user: any) {
    const newUser = await prisma.user.create({
        data: {
            credentials: {
                create: [
                    {
                        credentialID: "credentialId",
                        publicKey: "publicKey",
                        algorithm: "algorithm",
                    }
                ]
            }
        }
    })
    return newUser
}