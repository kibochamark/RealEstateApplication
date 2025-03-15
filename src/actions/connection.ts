"use server";
import { baseUrl } from "@/lib/globalvariables";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const getConnections = async () => {
  try {
    const data = await axios.get(baseUrl + "connections");

    // console.log(data, data.data)

    return data?.data?.data ?? [];
  } catch (e: any) {
    return [];
  }
};

export const postConnectionData = async (data:{
  name:string;
  email:string;
  message:string;
  phone:string;
}) => {
  try {

    console.log(data, "data")
    // Send the FormData directly, letting Axios handle the Content-Type header
    const res = await axios.post(baseUrl + "connection", data);

    // Check for successful response
    if (res.status === 201) {
      revalidatePath("/intime-admin/connections");
      return [res.data, res.status]; // Return the data directly
    }

    // If not successful, throw an error
    throw new Error("Error posting connection");
  } catch (e: any) {
    // Log the full error object for debugging purposes
    console.error("Error posting connection:", e);

    // Return the error message and status code
    return [e.response?.data?.message ?? e.message, e.response?.status ?? 400];
  }
};

export const updateConnection = async (formData: {
  name:string;
  email:string;
  message:string;
  phone:string;
}) => {
  
  try {
  const response = await axios.patch(baseUrl + "testimonial",  
    formData
  );

  if (response.status != 201) {
    throw new Error("Failed to update testimonial");
  }

  revalidatePath("/intime-admin/connections");

  // console.log("Testimonial updated successfully:", responseData);
}catch (error) {
  console.error("Error updating testimonial:", error);
  return error;
}
};
