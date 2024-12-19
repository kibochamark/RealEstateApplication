"use server";

import { baseUrl } from "@/lib/globalvariables";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const getproperties = async (limit=200, page=1) => {
  try {
    const searchparams = new URLSearchParams()
    searchparams.append('limit', limit.toString())
    searchparams.append('page', page.toString())
    const data = await axios.get(baseUrl + "properties", {
      params:searchparams
    });


    // console.log(data, data.data)

    return data?.data?.data ?? [];
  } catch (e: any) {
    return [e.message, 400];
  }
};
export const getAllproperties = async () => {
  try {
   
    const data = await axios.get(baseUrl + "allproperties");


    // console.log(data, data.data)

    return data?.data?.data ?? [];
  } catch (e: any) {
    return [e.message, 400];
  }
};


export const getPropertyById = async (id: number) => {
  
  try {
    const response = await axios.get(baseUrl + `/${id}/property`);
    return response?.data ?? []; 
  } catch (e: any) {
    return [e.message, 400]; 
  }
};


export const getSimilarPropertyById = async (id: number) => {
  
  try {
    
    const response = await axios.get(baseUrl + `/${id}/similarproperties`);
    if(response.status !== 200) throw new Error(response.data)
    return response?.data ?? []; 
  } catch (e: any) {
    return [e.message, 400]; 
  }
};



export const getpropertyfeatures = async () => {
  try {
    const data = await axios.get(baseUrl + "features");

    return data?.data?.data ?? [];
  } catch (e: any) {
    return [e.message, 400];
  }
};


export const postProperty = async (data: any) => {
  
  try {
    // Ensure the data is properly serialized if it's not already in JSON format
    const res = await axios.post(baseUrl + "property", data, {
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



export const patchProperty = async (data: any) => {
  try {
    const res = await axios.patch(baseUrl + `propertytype`, data, {
      headers: {
        'Content-Type': 'application/json',  
      }
    });

    return res?.data ?? [];
    
  } catch (e: any) {
    console.error("Error patching property:", e);
    return [e.response?.data?.message ?? e.message, e.response?.status ?? 400];
  }
};


