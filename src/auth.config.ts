import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { LoginUser } from "./actions/authentication";


export default {
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {
                    label:"Email",
                    placeholder:"email",
                    type:"email"
                },
                password: {
                    label:"Password",
                    placeholder:"XXXXXX",
                    type:"password"
                },
            },
            authorize: async (credentials) => {
         
                let user = null

                // call our server action 
                const [data, status]= await LoginUser({
                    email:credentials.email as string,
                    password:credentials.password as string
                })

                if(status == 200) user= data
                if(status == 400)  throw new Error(data)
                return user
            },
        }),
    ],
    pages:{
        signIn: '/intimehomes/sign-in',
    }
}