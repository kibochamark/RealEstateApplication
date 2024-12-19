import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      name?: string | null | undefined;
      email?: string | null | undefined;
      picture?: string | null | undefined;
      connectionString:string;
      userRole:string;
      userName:string;
      token:string;
      institutionName: string;
      branches: string;
      saccoName: string;
    }
  }
}