"use server"

import { baseUrl } from "@/lib/globalvariables";
import axios from "axios";

export const getAccess = async () => {
    try {
      const data = await axios.get(baseUrl + "requestusersaccess");
  
      return data?.data?.data ?? [];
    } catch (e: any) {
      return [e.message, 400];
    }
  };

export const postAccess = async (email:string) => {
    try {
    
      const res = await axios.post(baseUrl + "requestuser", {
        email
      });

      console.log(res, "xdhshd")

      if(res.status == 201){
        return [res.data, 201]
      }

      throw new Error("Failed to create resource")
    } catch (e: any) {
      return [e.message, 400];
    }
  };

