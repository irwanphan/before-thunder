import prisma from "@components/prisma";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "user@app.id" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const body = req.body;

        if (!body?.email || !body?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: body.email,
          },
        });

        if (!user) return null;
        if (!bcrypt.compareSync(body.password, user?.password)) return null;

        return {
          id: user.id.toString(),
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.userId = token.userId;
        session.user.role = token.role;
      }

      return session;
    },
  },
};