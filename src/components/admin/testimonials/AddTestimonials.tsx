"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import { postTestimonialData } from "@/actions/Testimonial";
// ... (other imports, e.g., for formik, Yup, image upload handling, etc.)

export default function AddTestimonials() {
  //   const [uploadedImages, setUploadedImages] = useState<PropertyImage[]>([]);
  const [uploadedImages, setUploadedImages] = useState<
    { url: string; Image: File }[]
  >([]);
  const [rating, setRating] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      rating: 0,
      onBehalfOf: "",
      userId: session?.user?.userid,
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

        const formData = new FormData();

        // Append image if available
        if (uploadedImages.length === 1) {
          formData.append("image", uploadedImages[0].Image);
        }

        formData.append("json", JSON.stringify(values));
        console.log(formData, "formdata");

        // const response = await axios.post('http://localhost:8000/api/v1/testimonial', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });
        const response = await postTestimonialData(formData);

        if (!response[0]) {
          console.log("Testimonial submitted successfully");
          // Reset form and state
          formik.resetForm();
          setUploadedImages([]);
          setRating(0);
        } else {
          console.error("Error submitting testimonial");
        }
      } catch (error) {
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
            <input
              {...formik.getFieldProps("name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="james"
              required
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
            <textarea
              {...formik.getFieldProps("description")}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary300 focus:border-primary300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="Write your thoughts here..."
            ></textarea>
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
              onBehalfOf
            </label>
            <input
              {...formik.getFieldProps("onBehalfOf")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="james"
              required
            />
            {formik.touched.onBehalfOf && formik.errors.onBehalfOf && (
              <div className="text-red-500">{formik.errors.onBehalfOf}</div>
            )}
          </div>

          <div>
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
