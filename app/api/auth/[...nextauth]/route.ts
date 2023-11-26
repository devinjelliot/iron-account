// /[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
    CredentialsProvider({
      id: "webauthn",
      name: "Webauthn",
      credentials: {},
      async authorize(credentials, req) {
        const authResponse = await fetch("/api/authorize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            credentials: credentials,
          }),
        });

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        return user;

      },
    }),

  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user object is available, it means this is the initial login
      if (user) {
        token.id = user.id; // Assuming `user.id` is the UUID
      }
      return token;
    },

    async session({ session, token }) {
      // Add the UUID to the session object
      session.user.id = token.id ? token.id.toString() : "";
      console.log("session", session);
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
};


export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };



// const user = await prisma.user.findUnique({
//   where: {
//     id: credentials.id,
//   },
// });

// if (user) {
//   return user;
// } else {
//   return null;
// }