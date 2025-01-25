"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import { postTestimonialData } from "@/actions/Testimonial";
import "react-quill/dist/quill.snow.css";

// Dynamically import QuillEditor to avoid SSR issues
const QuillEditor = dynamic(() => import("react-quill"), {
  loading: () => <p>Loading editor...</p>,
  ssr: false,
});

export default function AddTestimonials() {
  //   const [uploadedImages, setUploadedImages] = useState<PropertyImage[]>([]);
  const [uploadedImages, setUploadedImages] = useState<
    { url: string; Image: File }[]
  >([]);
  const [rating, setRating] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

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

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      rating: 0,
      onBehalfOf: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("testimonial name is required"),
      description: Yup.string().required("Description is required"),
      rating: Yup.number()
        .min(1, "Please select a rating")
        .required("Rating is required"), // Validation for rating
      onBehalfOf: Yup.string().required("On behalf of is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        console.log(values, "submitted");

        let requestdata={
          ...values,
          userId:session?.user.userid! as number
        }

        const formData = new FormData();

        // Append image if available
        if (uploadedImages.length === 1) {
          formData.append("image", uploadedImages[0].Image);
        }
        const updated = {
          ...values,
          userId: session?.user?.userid,
        };

        formData.append("json", JSON.stringify(updated));
        console.log(formData, "formdata");

        const response = await postTestimonialData(formData);

        if (!response[0]) {
          // console.log("Testimonial submitted successfully");
          toast.success("Testimonial added successfully");
          // Reset form and state
          formik.resetForm();
          setUploadedImages([]);
          setRating(0);
        } else {
          toast.error(" Testimonial already exist");
        }
      } catch (error) {
        toast.error("Error submitting testimonial");

        console.error("Error posting testimonial:", error);
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
        <CardTitle>Create New Testimony</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={formik.handleSubmit}
          className="md:grid gap-4 md:grid-cols-1 grid-cols-1"
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <QuillEditor
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              value={formik.values.name}
              onChange={(content) => formik.setFieldValue("name", content)} // Update Formik state
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <QuillEditor
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              value={formik.values.description} // Bind to Formik state
              onChange={(content) =>
                formik.setFieldValue("description", content)
              } // Update Formik state
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
          </div>

          {/* Rating Section */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer w-6 h-6 ${
                    star <= rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => {
                    setRating(star);
                    formik.setFieldValue("rating", star); // Update formik state
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="onBehalfOf"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              On Behalf Of
            </label>
            <QuillEditor
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              value={formik.values.onBehalfOf} // Bind to Formik state
              onChange={(content) =>
                formik.setFieldValue("onBehalfOf", content)
              } // Update Formik state
            />
            {formik.touched.onBehalfOf && formik.errors.onBehalfOf && (
              <div className="text-red-500">{formik.errors.onBehalfOf}</div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <label
              htmlFor="images"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Testimonial Images
            </label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageUpload}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
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
              Create Testimony
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
