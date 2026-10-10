import type { DefaultSession } from "next-auth";
import type { ApiUser } from "./user.type";

declare module "next-auth" {
  interface User {
    user: ApiUser;
    token: string;
  }
  interface Session {
    user: ApiUser & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: ApiUser;
    token: string;
  }
}
