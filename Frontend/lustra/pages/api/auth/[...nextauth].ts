import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { DefaultSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';

declare module 'next-auth' {
  interface User {
    token: string;
  }
  interface Session {
    user: {
      accessToken: string;
      email: string;
      id: string;
    } & DefaultSession["user"];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    email: string;
    id: string;
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined, req: { headers?: Record<string, string | string[]> }) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
              email: credentials.email,
              password: credentials.password
            }
          );

          if (response.data.token) {
            return {
              id: response.data.user.id,
              email: response.data.user.email,
              name: response.data.user.name,
              token: response.data.token
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token || '';
        token.email = user.email || '';
        token.id = user.id || '';
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
});
