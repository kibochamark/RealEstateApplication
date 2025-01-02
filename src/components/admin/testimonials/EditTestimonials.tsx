"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader, Router, Star } from "lucide-react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { baseUrl } from "@/lib/globalvariables";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { updateTestimonial } from "@/actions/Testimonial";
import { RevalidatePath } from "@/components/globalcomponents/RevalidateCustomPath";
import { useRouter } from "next/navigation";

// Dynamically import QuillEditor to avoid SSR issues
const QuillEditor = dynamic(() => import("react-quill"), {
  loading: () => <p>Loading editor...</p>,
  ssr: false,
});

export default function EditTestimonials({
  testimonial,
}: {
  testimonial: {
    name: string;
    description: string;
    images: string[];
    onBehalfOf: string;
  };
}) {
  const { editdata } = useSelector((state: RootState) => state.property);
  const [uploadedImages, setUploadedImages] = useState<
    { url: string; Image: File }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const quillModules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formik = useFormik({
    initialValues: {
      name: editdata.name || "",
      description: editdata.description || "",
      onBehalfOf: editdata.onBehalfOf || "",
      rating: editdata.rating || 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      onBehalfOf: Yup.string().required("On Behalf Of is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
    
        const formData = new FormData();
        
        // Add image to FormData if one is uploaded
        if (uploadedImages.length === 1) {
          formData.append("image", uploadedImages[0].Image);
        }
        
        // Append the other fields as JSON string
        const updated = {
          ...values,
          userId: session?.user?.userid,
          id: editdata.id,
        };
        formData.append("json", JSON.stringify(updated));
    
        console.log("FormData content:", Array.from(formData.entries()));
    
        // const response = await fetch(baseUrl + "testimonial", {
        //   method: "PATCH",
        //   body: formData, // Directly use FormData here
        // });
    
        // if (!response.ok) {
        //   throw new Error("Failed to update testimonial");
        // }
    
        // const data = await response.json();
        // toast.success("Testimonial updated successfully");
        // console.log("Testimonial updated successfully:", data);
        const response = await updateTestimonial(formData);
        toast.success("Testimonial updated successfully");
        RevalidatePath("/intime-admin/testimonials");
        router.push("/intime-admin/testimonials");
      
      } catch (error) {
        console.error("Error updating testimonial:", error);
      } finally {
        setIsLoading(false);
      }
    },
    
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (files.length > 1) {
        toast.error(
          "Only one image is required. Please select a single image."
        );
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
        <CardTitle>Edit Testimony</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <QuillEditor
              theme="snow"
              modules={quillModules}
              value={formik.values.name}
              onChange={(content) => formik.setFieldValue("name", content)}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <QuillEditor
              theme="snow"
              modules={quillModules}
              value={formik.values.description}
              onChange={(content) =>
                formik.setFieldValue("description", content)
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer w-6 h-6 ${
                    star <= formik.values.rating
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => formik.setFieldValue("rating", star)}
                />
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="onBehalfOf"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              On Behalf Of
            </label>
            <QuillEditor
              theme="snow"
              modules={quillModules}
              value={formik.values.onBehalfOf}
              onChange={(content) =>
                formik.setFieldValue("onBehalfOf", content)
              }
            />
          </div>

          <div>
            <label
              htmlFor="images"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer"
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
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
              Update Testimony
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
