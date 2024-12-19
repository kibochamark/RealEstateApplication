import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { JWT } from "next-auth/jwt";
import { type DefaultSession } from "next-auth";
import axios from "axios";

declare module "next-auth" {
    interface Session {
        user: {
            access_token: string;
            refresh_token: string;
            companyId: number;
            email: string;
            userid:number;

            username: string;
        };
    }

    interface User {
        user: {

            email:string;
            companyId: number;
            username: string;
            id:number;

        }
        token: {
            access_token: string;
            refresh_token: string;
        }


    }

    interface Token {
        access_token: string;
        refresh_token: string;
        companyId: number;
        userid:number;
        email: string | null;
        username: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        access_token: string;
        refresh_token: string;
        companyId: number;
        userid:number;
        email: string | null;
        username: string;
    }
}

export const {
    handlers: { GET, POST },

    auth,
    signIn,
    signOut,
} = NextAuth(authConfig);