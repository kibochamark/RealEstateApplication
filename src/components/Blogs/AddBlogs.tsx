"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { postBlogData } from "@/actions/Blog";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import "react-quill/dist/quill.snow.css";
import { Suspense } from 'react';

// Dynamically import QuillEditor to avoid SSR issues
const QuillEditor = dynamic(() => import("react-quill"), { 
  loading: () => <p>Loading editor...</p>,
  ssr: false 
});

export default function AddBlogs() {
  const [uploadedImages, setUploadedImages] = useState<{ url: string; Image: File }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const quillModules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormats = [
    "header", "bold", "italic", "underline", "strike", "blockquote", "list",
    "bullet", "link", "image", "align", "color", "code-block"
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      shortDescription: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Blog name is required"),
      description: Yup.string().required("Description is required"),
      shortDescription: Yup.string().required("Short description is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const userId = session?.user?.userid;

        if (!userId) {
          toast.error("User ID not found. Please log in.");
          setIsLoading(false);
          return;
        }

        const updatedValues = {
          ...values,
          userId,
        };

        const formData = new FormData();

        if (uploadedImages.length > 0) {
          formData.append("image", uploadedImages[0].Image);
        }

        formData.append("json", JSON.stringify(updatedValues));

        const response = await postBlogData(formData);

        setIsLoading(false);
        if (!response[0]) {
          toast.success("Blog successfully posted");
          formik.resetForm();
          setUploadedImages([]);
        } else {
          toast.error("Error posting blog");
        }
      } catch (e:any) {
        setIsLoading(false);
        toast.error("Error posting blog", e);
      }
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (files.length > 1) {
        toast.error("Only one image is required. Please select a single image.");
      } else {
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
          <CardTitle className="text-2xl sm:text-3xl">Create New Blog</CardTitle>
        </CardHeader>
        <CardContent>


          <form onSubmit={formik.handleSubmit} className="space-y-8 bg-white">
            {/* Title */}
            <div className="space-y-2 ">
              <label htmlFor="name" className="block text-sm font-medium">Title</label>
              <div className="">
                <Suspense fallback={<div className="w-full bg-gray-100 rounded ">Loading editor...</div>}>
                  <QuillEditor
                    value={formik.values.name}
                    onChange={(content) => formik.setFieldValue("name", content)}
                    className="w-full bg-white border-none "
                    style={{ zIndex: -1 }} 
                    modules={quillModules}  
                    formats={quillFormats}  
                  />
                </Suspense>
              </div>
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label htmlFor="shortDescription" className="block text-sm font-medium">Short Description</label>
              <div className="relative">
                <Suspense fallback={<div className="w-full bg-gray-100 rounded min-h-[150px]">Loading editor...</div>}>
                  <QuillEditor
                    value={formik.values.shortDescription}
                    onChange={(content) => formik.setFieldValue("shortDescription", content)}
                    className="w-full bg-white rounded min-h-[100px]"
                    modules={quillModules}  
                    formats={quillFormats} 
                  />
                </Suspense>
              </div>
              {formik.touched.shortDescription && formik.errors.shortDescription && (
                <div className="text-red-500 text-sm">{formik.errors.shortDescription}</div>
              )}
            </div>

            {/* Full Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <div className="relative">
                <Suspense fallback={<div className="w-full bg-gray-100 rounded min-h-[250px]">Loading editor...</div>}>
                  <QuillEditor
                    value={formik.values.description}
                    onChange={(content) => formik.setFieldValue("description", content)}
                    className="w-full bg-white rounded min-h-[100px]"
                    modules={quillModules}  
                    formats={quillFormats}  
                  />
                </Suspense>
              </div>
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm">{formik.errors.description}</div>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label htmlFor="images" className="block text-sm font-medium">Blog Image</label>
              <input
                type="file"
                id="images"
                onChange={handleImageUpload}
                className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              />
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
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

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader className="animate-spin text-blue-500 w-6 h-6 mr-2" />
              ) : null}
              Create Blog
            </Button>
          </form>

          
        </CardContent>
      </Card>
  );
}
