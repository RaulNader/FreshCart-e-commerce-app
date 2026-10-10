import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { apiFetch } from "@/lib/api";
import { AUTH_SECRET } from "@/lib/auth-cookie";
import type { ApiUser } from "@/types/user.type";

interface SigninResponse {
  message: string;
  user: ApiUser;
  token: string;
}

export const authOptions: NextAuthOptions = {
  secret: AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // apiFetch throws the API's own message (e.g. wrong password),
        // which next-auth passes to signIn() as `error`.
        const payload = await apiFetch<SigninResponse>("/auth/signin", {
          method: "POST",
          body: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });

        const { id } = jwtDecode<{ id: string }>(payload.token);

        return {
          id,
          user: payload.user,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
