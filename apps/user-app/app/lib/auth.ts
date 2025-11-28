import db from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/signin",   
  },

  session: {
    strategy: "jwt",     
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        if (!credentials?.phone || !credentials?.password) return null;

        // Check user in DB
        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });

        // LOGIN FLOW
        if (existingUser) {
          const isValid = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (!isValid) return null;

          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.number,
          };
        }

        // SIGNUP FLOW (create new user)
        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const createdUser = await db.user.create({
          data: {
            number: credentials.phone,
            password: hashedPassword,
          },
        });

        return {
          id: createdUser.id.toString(),
          name: createdUser.name,
          email: createdUser.number,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },

    async redirect() {
      return "http://localhost:3000"; // fix redirect to port 3001
    },
  },
};
