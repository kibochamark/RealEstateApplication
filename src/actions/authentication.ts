"use server"

import { baseUrl } from "@/lib/globalvariables";
import axios from "axios";


interface UserData {
    email: string;
    password: string;
}

export const LoginUser = async (user: UserData) => {
    try {
        const data = await axios.post(baseUrl + "login", {
            ...user,
        });

        if (data.status == 200) {
            return [data.data, 200]
        }
        throw new Error("Failed to login user, invalid credentials")
    } catch (e: any) {
        return [e.message, 400];
    }
};