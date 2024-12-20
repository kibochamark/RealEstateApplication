"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader } from 'lucide-react';
import { Button } from '../ui/button';
import { postBlogData } from '@/actions/Blog';
import toast from 'react-hot-toast';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';

export default function AddBlogs() {
  const [uploadedImages, setUploadedImages] = useState<{ url: string; Image: File }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {data: session} =  useSession();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      shortDescription: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Blog name is required'),
      description: Yup.string().required('Description is required'),
      shortDescription: Yup.string().required('Short description is required'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
    
        // Get session data
        // const session = await auth(); // Ensure auth() returns session with userId
        const userId = session?.user?.userid;
        console.log(session, userId, "Session data");
        
    
        if (!userId) {
          toast.error("User ID not found. Please log in.");
          setIsLoading(false);
          return;
        }
    
        // Add userId to values
        const updatedValues = {
          ...values,
          userId, // Include the userId from session
        };
    
        // Remove unwanted data (e.g., `images` key from `values`)
        const formattedValues = Object.entries(updatedValues).filter(([key]) => key !== "images");
    
        console.log(Object.fromEntries(formattedValues), "Submitting form Blog");
    
        // Prepare `FormData`
        const formData = new FormData();
    
        // Append uploaded images to `FormData`
        
          formData.append(`image`, uploadedImages[0].Image); // Assuming `Image` contains the actual `File` object
       
    
        // Append JSON data as a string to `FormData`
        formData.append("json", JSON.stringify(Object.fromEntries(formattedValues)));
    
        // Send the `FormData` to the server
        const response = await postBlogData(formData);
    
        // Handle the response
        setIsLoading(false);
        if (!response[0]) {
          console.log("Blog successfully posted:", response);
          toast.success("Blog successfully posted");
          formik.resetForm();
          setUploadedImages([]);
        } else {
          console.error("Error posting blog:", response);
          toast.error("Error posting blog");
        }
      } catch (error) {
        console.error("Error posting blog:", error);
        setIsLoading(false);
        toast.error("Error posting blog");
      }
    },
    
    
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (files.length > 1) {
        // Display error message
        toast.error("Only one image is required. Please select a single image.");
      } else {
        // Clear error and update the image
        const file = files[0];
        const newImage = {
          url: URL.createObjectURL(file),
          Image: file,
        };
        setUploadedImages([newImage]);
      }
    }
  };

  const handleImageDelete = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle>Create New Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="md:grid gap-4 md:grid-cols-1 grid-cols-1">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Title
            </label>
            <input
              {...formik.getFieldProps('name')}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter blog title"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label htmlFor="shortDescription" className="block mb-2 text-sm font-medium">
              Short Description
            </label>
            <input
              {...formik.getFieldProps('shortDescription')}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter a short description"
            />
            {formik.touched.shortDescription && formik.errors.shortDescription && (
              <div className="text-red-500">{formik.errors.shortDescription}</div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium">
              Description
            </label>
            <textarea
              {...formik.getFieldProps('description')}
              rows={4}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter blog description"
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
          </div>

          <div>
            <label htmlFor="images" className="block mb-2 text-sm font-medium">
              Blog Image
            </label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageUpload}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image.url} alt={`Uploaded ${index + 1}`} className="w-full h-32 object-cover rounded" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-0 right-0 m-1"
                    onClick={() => handleImageDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {isLoading ? (
            <Button type="submit" className="w-full" disabled>
              <Loader className="animate-spin text-blue-500 w-8 h-8" />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Create Blog
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
