// /[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
//import { authOptions } from "../auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        //WebauthnProvider,
    ],
};

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
