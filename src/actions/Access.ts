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