import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader } from 'lucide-react';
import { Button } from "@/components/ui/button";
// ... (other imports, e.g., for formik, Yup, image upload handling, etc.)

export default function AddTestimonials() {
//   const [uploadedImages, setUploadedImages] = useState<PropertyImage[]>([]);
const [uploadedImages, setUploadedImages] = useState<{ url: string; Image: File }[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      // ... other fields you need
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('testimonial name is required'),
      description: Yup.string().required('Description is required'),
      // ... other validation rules
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      // Handle image uploads and other form data here
      // ... (use the uploadedImages state and formik values)

      try {
        // Send the form data to your server
        // const response = await postPropertyData(formData);
        // Handle the response, e.g., show success/error messages
        setIsLoading(false);
      } catch (error) {
        console.error('Error posting property:', error);
        setIsLoading(false);
        // Handle the error, e.g., show an error message
      }
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => {
        return {
          url: URL.createObjectURL(file),
          Image: file,
        };
      });
      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
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
        <form onSubmit={formik.handleSubmit} className="md:grid gap-4 md:grid-cols-1 grid-cols-1">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
            </label>
            <input
              {...formik.getFieldProps('name')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="james"
              required
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              {...formik.getFieldProps('description')}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary300 focus:border-primary300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="Write your thoughts here..."
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
          </div>

          <div>
            <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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