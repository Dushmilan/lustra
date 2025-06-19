import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const users = [
  {
    id: 1,
    email: 'test@example.com',
    password: '$2a$10$G5v6uQZyX7x9qY8z9p0eFuwQZyX7x9qY8z9p0eFuwQZyX7x9qY8z9' // password: 'test123'
  }
];

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = users.find(u => u.email === credentials.email);

        if (!user) {
          throw new Error('No user found');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // Convert id to string to match NextAuth's User type
        return {
          id: user.id.toString(),
          email: user.email
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
});
