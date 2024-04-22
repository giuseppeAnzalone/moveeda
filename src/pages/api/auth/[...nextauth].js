import dbConnect from "../../../../libs/dbConnect";
import User from "../../../../models/User";
import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      secret: process.env.NEXTAUTH_SECRET,
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "mario.rossi",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();

        if (credentials == null) return null;

        try {
          const user = await User.findOne({ username: credentials.username });
          if (user) {
            const isMatch = await bcryptjs.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user._id,
          name: user.name,
          username: user.username,
          type: user.type,
          city: user.city,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
