"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function EditUser({ userData }: { userData: any }) {
  const [uploadedImages, setUploadedImages] = useState<{ url: string; file: File | null }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { editdata } = useSelector((state: RootState) => state.property);
  console.log(editdata);
  


  const formik = useFormik({
    initialValues: {
      username: editdata.username || "",
      firstname: editdata.firstname || "",
      lastname: editdata.lastname || "",
      email: editdata.email || "",
      contact: editdata.contact || "",
      password: editdata.password || "********",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      contact: Yup.string().required("Contact is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        // Mock API update call
        const response = await fetch("/api/users/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, images: uploadedImages }),
        });

        if (!response.ok) throw new Error("Failed to update user");

        toast.success("User successfully updated");
      } catch (error) {
        toast.error("Error updating user");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newImage = { url: URL.createObjectURL(file), file };
      setUploadedImages([newImage]);
    }
  };

  const handleImageDelete = () => {
    setUploadedImages([]);
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle>Edit User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium">
              Username
            </label>
            <input
              {...formik.getFieldProps("username")}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500">{formik.errors.username as string}</div>
            )}
          </div>

          <div>
            <label htmlFor="firstname" className="block mb-2 text-sm font-medium">
              First Name
            </label>
            <input
              {...formik.getFieldProps("firstname")}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter first name"
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className="text-red-500">{formik.errors.firstname as string}</div>
            )}
          </div>

          <div>
            <label htmlFor="lastname" className="block mb-2 text-sm font-medium">
              Last Name
            </label>
            <input
              {...formik.getFieldProps("lastname")}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter last name"
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className="text-red-500">{formik.errors.lastname as string}</div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              {...formik.getFieldProps("email")}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email as string}</div>
            )}
          </div>

          <div>
            <label htmlFor="contact" className="block mb-2 text-sm font-medium">
              Contact
            </label>
            <input
              {...formik.getFieldProps("contact")}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter contact"
            />
            {formik.touched.contact && formik.errors.contact && (
              <div className="text-red-500">{formik.errors.contact as string}</div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="text"
              value={formik.values.password}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              disabled
            />
          </div>

          <div>
            <label htmlFor="images" className="block mb-2 text-sm font-medium">
              User Image
            </label>
            <input
              type="file"
              id="images"
              onChange={handleImageUpload}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
            />
            {uploadedImages.length > 0 && (
              <div className="mt-4">
                <img
                  src={uploadedImages[0].url}
                  alt="Uploaded"
                  className="w-32 h-32 object-cover rounded mb-2"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleImageDelete}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="col-span-2">
            {isLoading ? (
              <Button type="submit" className="w-full" disabled>
                <Loader className="animate-spin text-blue-500 w-8 h-8" />
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Update User
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
