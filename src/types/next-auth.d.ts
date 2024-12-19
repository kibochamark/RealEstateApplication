import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userid:number;
      access_token: string;
      refresh_token: string;
      companyId: number;
      email: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    access_token: string;
    refresh_token: string;
    companyId: number;
    email: string;
    userid:number;

    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    companyId: number;
    email: string;
    userid:number;

    username: string;
  }
}
