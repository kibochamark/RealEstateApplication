"use server"

import { baseUrl } from "@/lib/globalvariables"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import axios from "axios"



export const getproperties = async()=>{
    const {isAuthenticated} = getKindeServerSession()

    if(await isAuthenticated()){

        try{

            const data = await axios.get(baseUrl + "properties")

            return data?.data?.data ?? []

        }catch(e:any){
            return [e.message, 400]
        }

    }else{
        return ["unauthorized", 403]
    }
}


export const getpropertyfeatures = async()=>{
    const {isAuthenticated} = getKindeServerSession()

    if(await isAuthenticated()){

        try{

            const data = await axios.get(baseUrl + "features")

            return data?.data?.data ?? []

        }catch(e:any){
            return [e.message, 400]
        }

    }else{
        return ["unauthorized", 403]
    }
}



