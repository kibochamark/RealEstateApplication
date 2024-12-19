import Credentials from "next-auth/providers/credentials";
import NextAuth, { NextAuthConfig } from "next-auth";
import { LoginUser } from "./actions/authentication";


export default {
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {
                    label: "Email",
                    placeholder: "email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    placeholder: "XXXXXX",
                    type: "password"
                },
            },
            authorize: async (credentials) => {

                let user = null

                // call our server action 
                const [data, status] = await LoginUser({
                    email: credentials.email as string,
                    password: credentials.password as string
                })


                if (status == 200) user = data
                if (status == 400) throw new Error(data)
                return user
            },
        }),
    ],
    pages: {
        signIn: '/intimehomes/sign-in',
    },
    callbacks: {
        jwt: async ({ token, user }) => {

            if (user) {
                token = {
                    access_token: user?.token.access_token,
                    refresh_token: user?.token.refresh_token,
                    email: user.user.email,
                    userid:user.user.userid,
                    username: user.user.username,
                    companyId: user.user.companyId
                }
            }





            // Approach 4: Session inactivity handling (log the user out)
            // You can implement an "inactivity timer" here to check user activity

            return token;
        },
        session: async ({ session, token }) => {
            session = {
              
                user: {
                    userid:token.userid,
                    access_token: token.access_token as string,
                    refresh_token: token.refresh_token as string,
                    companyId: token.companyId as number,
                    email: token.email as string,
                    username: token.username as string
                },



            };
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;