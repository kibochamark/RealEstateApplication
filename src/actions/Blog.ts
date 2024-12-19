"use server"

import { baseUrl } from "@/lib/globalvariables";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const postBlogData = async (data: any) => {
  
    try {
      // Ensure the data is properly serialized if it's not already in JSON format
      const res = await axios.post(baseUrl + "blog", data, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Make sure the content is treated as JSON
        }
      });
  
        if(res.status === 201){
          
          revalidatePath("/intime-admin/managelisting")
          return [null, res?.data ?? []]
        }
        throw new Error("Error posting property");
        
      // Return response data or empty array if no data returned
    } catch (e: any) {
      // Log the error and return a more descriptive error message
      console.error("Error posting property:", e);
      return [e.response?.data?.message ?? e.message, e.response?.status ?? 400];
    }
  };