// /[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
//import { authOptions } from "../auth";
//import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        // CredentialsProvider({
        //     id: "webauthn",
        //     name: "Webauthn",
        //     async authorize(credentials, req) {
        //         const user = await prisma.user.findUnique({
        //             where: { 
    ],
};

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
