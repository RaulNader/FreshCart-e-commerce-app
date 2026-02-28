import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    user: {
      role: string;
      email: string;
      name: string;
    };
    token: string;
  }
  interface Session {
    user: {
      role: string;
      email: string;
      name: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      role: string;
      email: string;
      name: string;
    };
    token: string;
  }
}
