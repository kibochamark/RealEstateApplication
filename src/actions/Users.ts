"use server"

import { baseUrl } from "@/lib/globalvariables";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const postUserData = async (data: any) => {
    try {
      // Send the FormData directly, letting Axios handle the Content-Type header
      const res = await axios.post(baseUrl + "signup", data,{
        headers: {
            'Content-Type': 'application/json',
          },
      });
  
      // Check for successful response
      if (res.status === 201) {
        // revalidatePath("/intime-admin/managelisting");
        return [null, res.data];  // Return the data directly
      }
  
      // If not successful, throw an error
      throw new Error("Error posting property");
  
    } catch (e: any) {
      // Log the full error object for debugging purposes
      console.error("Error posting blog:", e);
  
      // Return the error message and status code
      return [e.response?.data?.message ?? e.message, e.response?.status ?? 400];
    }
  };

 
  export const getUserDataByCompanyId = async (id: number) => {
  

    try {
  
      const response = await axios.get(baseUrl + `/${id}/companyusers`);
      // console.log(response.data , "response.data------");

      if (response.status !== 200) throw new Error(response.data)
        // console.log(response?.data?.data , "response.data")
      return response?.data?.data ?? [];
      
    } catch (e: any) {
      return [e.message, 400];
    }
  };
  export const saveMessageToDb = async (message: string) => {
    try {
      const response = await fetch("/api/saveMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to save message to database");
      }

      const data = await response.json();
      console.log("Message saved successfully:", data);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  