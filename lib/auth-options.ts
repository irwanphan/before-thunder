import prisma from '@components/prisma';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { NextApiHandler } from 'next';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'user@app.id' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { body } = req;

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
    signIn: '/auth/signin',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        // token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email;
        // session.user.role = token.role;
      }

      return session;
    },
    // async jwt({ token, user}) {
    //   user && (token.user = user)
    //   return token
    // },
    // async signIn({ user, account, profile, email, credentials}) {

    //   const emailUser: any = user.email

    //   const allowedUser = await prisma.user.findFirst({
    //     where: {
    //       email: emailUser
    //     }
    //   })

    //   if (allowedUser !== null) {
    //     return true
    //   } else {
    //     return false
    //   }

    // },
    // async session({ session, token, user}) {
    //   const sessionUser: any = session.user?.email

    //   const allowedUser = await prisma.user.findFirst({
    //     where: {
    //       email: sessionUser
    //     },
    //   },);

    //   session.id = allowedUser?.id;
    //   session.token = token

    //   return session // The return type will match the one returned in `useSession()`
    // },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // }
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;
