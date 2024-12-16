"use server";

import { baseUrl } from "@/lib/globalvariables";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";

export const getproperties = async () => {
  try {
    const data = await axios.get(baseUrl + "properties");

    return data?.data?.data ?? [];
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
        'Content-Type': 'application/json',  // Make sure the content is treated as JSON
      }
    });

    // Return response data or empty array if no data returned
    return res?.data ?? [];
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
    console.log(res, "res----------");
    
  } catch (e: any) {
    console.error("Error patching property:", e);
    return [e.response?.data?.message ?? e.message, e.response?.status ?? 400];
  }
};


