"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { postUserData } from '@/actions/Users';


//generate random password
const generateRandomPassword = (length = 12) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
export default function AddUsers() {
  const [uploadedImages, setUploadedImages] = useState<{ url: string; Image: File }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultPassword, setDefaultPassword] = useState("");

  const {data: session} =  useSession();

  const formik = useFormik({
    initialValues: {
      username: '',
      firstname: '',  // You can set a random name here if necessary
      lastname: '',  // You can set a random name here if necessary
      email: '',  // You can set a random email here if necessary
      contact: '',  // You can set a random contact here if necessary
      password: defaultPassword,  // Default password
      confimpassword: defaultPassword,  // Default password
    //   confirmpassword: 'Nju12345678!',  // Confirm password
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Username is required'),
      firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      contact: Yup.string().required('Contact is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    //   confirmpassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
        try {
          setIsLoading(true);
      
          // Get session data
          const companyId = session?.user?.companyId;
          
          if (!companyId) {
            toast.error("User ID not found. Please log in.");
            setIsLoading(false);
            return;
          }
      
          // Add companyId to values
          const updatedValues = {
            ...values,
            companyId, // Include the companyId from session
          };
      
          console.log(values, "Form Data---");
          console.log(updatedValues, "Updated Form Data---");
          
          // Send the JSON payload to the server
          const response = await postUserData(updatedValues);
      
          // Handle the response
          setIsLoading(false);
          if (!response[0]) {
            toast.success("User successfully created");
            formik.resetForm();
            setUploadedImages([]); // Clear uploaded images
          } else {
            toast.error("Error creating user");
          }
        } catch (error) {
          setIsLoading(false);
          toast.error("Error creating user");
        }
      },
      
  });
  useEffect(() => {
    setDefaultPassword(generateRandomPassword());
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (files.length > 1) {
        toast.error("Only one image is required. Please select a single image.");
      } else {
        const file = files[0];
        const newImage = { url: URL.createObjectURL(file), Image: file };
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
        <CardTitle>Create New User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="md:grid gap-4 md:grid-cols-2 grid-cols-1">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium">
              Username
            </label>
            <input
              {...formik.getFieldProps('username')}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500">{formik.errors.username}</div>
            )}
          </div>
          <div>
            <label htmlFor="firstname" className="block mb-2 text-sm font-medium">
              First Name
            </label>
            <input
              {...formik.getFieldProps('firstname')}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter first name"
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className="text-red-500">{formik.errors.firstname}</div>
            )}
          </div>

          <div>
            <label htmlFor="lastname" className="block mb-2 text-sm font-medium">
              Last Name
            </label>
            <input
              {...formik.getFieldProps('lastname')}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter last name"
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className="text-red-500">{formik.errors.lastname}</div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              {...formik.getFieldProps('email')}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="contact" className="block mb-2 text-sm font-medium">
              Contact
            </label>
            <input
              {...formik.getFieldProps('contact')}
              className="bg-gray-50 border text-sm rounded-lg w-full p-2.5"
              placeholder="Enter contact number"
            />
            {formik.touched.contact && formik.errors.contact && (
              <div className="text-red-500">{formik.errors.contact}</div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Default Password
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
              Create user
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
