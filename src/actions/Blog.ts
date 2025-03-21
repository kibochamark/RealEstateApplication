"use server"

import { baseUrl } from "@/lib/globalvariables";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const postBlogData = async (formData: FormData) => {
    try {
      // Send the FormData directly, letting Axios handle the Content-Type header
      const res = await axios.post(baseUrl + "blog", formData);
  
      // Check for successful response
      if (res.status === 201) {
        revalidatePath("/intime-admin/blogs");
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
  

  export const getAllBlogs = async () => {
    try {
     
      const data = await axios.get(baseUrl + "blogs");
  
  
      // console.log(data, data.data)
  
      return data?.data?.data ?? [];
    } catch (e: any) {
      return [];
    }
  };
  export const getRecentBlogs = async (take:number) => {
    try {
     
      const data = await axios.get(baseUrl + "recentblogs", {
        params:{
          take:take
        }
      });
  
  
      // console.log(data, data.data)
  
      return data?.data?.data ?? [];
    } catch (e: any) {
      return [e.message, 400];
    }
  };

  export const getBlogByID = async (id: number) => {
    try {
      const res = await axios.get(`${baseUrl}${id}/blog`);
      return res.data?.data ?? []; // Access the data property from the response
    } catch (e: any) {
      console.error(e, "Error fetching blog data"); // Log the error for debugging
      return [];
    }
  };

  // export const updateBlogData = async (data: FormData) => {
  //   try {
  //     const res = await axios.patch(baseUrl + "blog", data);
  //     return res.data;
  //     } catch (e: any) {
  //       return [e.message, 400];
  //     }
  // }
  // export const updateBlogData = async (formData: FormData) => {
  //   try {
  //   const response = await fetch(baseUrl + "blog", {
  //     method: "PATCH",
  //     body: formData,
  //   });
  //   console.log(response, "response---");
  //   console.log(formData, "formdata---");
    
    
  
  //   if (!response.ok) {
  //     throw new Error("Failed to update testimonial");
  //   }
  
  //   const responseData = await response.json();
  //   revalidatePath("/intime-admin/testimonials");
  
  //   // console.log("Testimonial updated successfully:", responseData);
  // }catch (error) {
  //   console.error("Error updating testimonial:", error);
  //   return error;
  // }
  // };

  export const updateBlogData = async (formData: FormData) => {
    try {
      // Send the FormformData directly, letting Axios handle the Content-Type header
      const res = await axios.patch(baseUrl + "blog", formData);
  
      // Check for successful response
      if (res.status === 201) {
        revalidatePath("/intime-admin/blogs");
        return [null, res.data]; // Return the data directly
      }
  
      // If not successful, throw an error
      throw new Error("Error updating blogs");
    } catch (e: any) {
      // Log the full error object for debugging purposes
      console.error("Error updating blogs:", e);
  
      // Return the error message and status code
      return [e.response?.data?.message ?? e.message, e.response?.status ?? 400];
    }
  };