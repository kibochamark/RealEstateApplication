"use server"
import { auth } from "@/auth";
import { baseUrl } from "@/lib/globalvariables";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const getTestimonials = async () => {
    try {

        const data = await axios.get(baseUrl + "gettestimonials");


        // console.log(data, data.data)

        return data?.data?.data ?? [];
    } catch (e: any) {
        return [];
    }

}


export const postTestimonialData = async (data: FormData) => {
    try {
        // Send the FormData directly, letting Axios handle the Content-Type header
        const res = await axios.post(baseUrl + "testimonial", data);

        // Check for successful response
        if (res.status === 201) {
            // revalidatePath("/intime-admin/blogs");
            return [null, res.data];  // Return the data directly
        }

        // If not successful, throw an error
        throw new Error("Error posting testimonials");

    } catch (e: any) {
        // Log the full error object for debugging purposes
        console.error("Error posting testimonials:", e);

        // Return the error message and status code
        return [e.response?.data?.message ?? e.message, e.response?.status ?? 400];
    }
};