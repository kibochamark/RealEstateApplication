"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FieldArray, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppDispatch, RootState } from "@/store/store";
import * as Yup from "yup";
import { FeatureBadges } from "./features";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { patchProperty } from "@/actions/property";
import toast from "react-hot-toast";

export default function EditProperty({
  features,
  propertytypes,
}: {
  features: any;
  propertytypes: any;
}) {
  //   const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { editdata } = useSelector((state: RootState) => state.property);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [value, setValue] = useState(null);

  console.log(editdata, "edit");

  //   useEffect(() => {
  //     dispatch(fetchFeatures());
  //     dispatch(fetchPropertyTypes());
  //     dispatch(fetchLocations());
  //   }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: editdata?.name || "", 
      description: editdata?.description || "",
      location: editdata?.location || "",
      street_address: editdata?.street_address || "",
      city: editdata?.city || "",
      saleType: editdata?.saleType || "Sale", // default value "Sale"
      featured: editdata?.featured || false,
      propertyType: editdata?.propertyType || "", 
      size: editdata?.size || "",
      distance: editdata?.distance || "",
      price: editdata?.price || 0,
      pricepermonth: editdata?.pricepermonth || 0,
      features: editdata?.features || [],
      state: editdata?.state || "",
      country: editdata?.country || "",
      area: editdata?.area || "",
      bedrooms: editdata?.bedrooms || 0,
      images: uploadedImages, // You can keep this in sync with the state
    },
    onSubmit: (values) => {
        console.log("Updated values:", values);
        try{
            patchProperty(values); 
            toast.success("Property updated successfully")
            router.push("/intime-admin/managelisting"); // Navigate after submission
        }catch(e){
            toast.error("Error updating property");
            console.log(e);
        }
        // Submit to updateData function
      },
  });

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
      setFieldValue("images", [...uploadedImages, ...newImages]);
    }
  };

  const handleImageDelete = (
    index: number,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setFieldValue("images", newImages);
  };

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (error) {
  //     return <div>Error: {error}</div>;
  //   }

  return (
    <Card className="w- border-none shadow-none">
      <CardHeader>
        <CardTitle>Edit property</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="md:grid gap-4 md:grid-cols-3 grid-cols-1"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Property title
            </label>
            <input
              onChange={(e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              defaultValue={formik.values.name}
              name="name"
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="John"
              required
            />
            {/* {formik.errors.name && formik.touched.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="description"
              defaultValue={formik.values.description}
              id=""
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary300 focus:border-primary300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="Write your thoughts here..."
            ></textarea>

            {/* {formik.errors.description && formik.touched.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a sale type
            </label>
            <select
              id=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="saleType"
              defaultValue={formik.values.saleType}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
            >
              <option disabled>Choose a sale type</option>
              <option value="Sale">Sale</option>
              <option value="Rent">Rental</option>
            </select>
            {/* {formik.errors.saleType && formik.touched.saleType && (
              <div className="text-red-500">{formik.errors.saleType}</div>
            )} */}
          </div>

          <hr className="my-4 md:col-span-3 col-span-1" />

          <div>
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Property Location
            </label>
            {/* <select id="location"
                            defaultValue={formik.values.location}

                            name='location' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300">
                            <option selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                        </select> */}
            {/* <GooglePlacesAutocomplete
                            selectProps={{
                                value,
                                onChange: setValue,
                            }}
                            onLoadFailed={(error) => (
                                console.error("Could not inject Google script", error)
                            )}
                            autocompletionRequest={{
                                bounds: [
                                    { lat: 50, lng: 50 },
                                    { lat: 100, lng: 100 }
                                ],
                                componentRestrictions: {
                                    country: ['ke'],
                                }
                            }}
                            apiKey='d8f480b55msh9b5c4d05232d6c8p1d2848jsn6f501098217d'
                        /> */}
            {/* {formik.errors.location && formik.touched.location && (
              <div className="text-red-500">{formik.errors.location}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Street Address
            </label>
            <input
              type="text"
              id=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="street_address"
              defaultValue={formik.values.street_address}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="234 street"
              required
            />
            {/* {formik.errors.street_address && formik.touched.street_address && (
              <div className="text-red-500">{formik.errors.street_address}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="city"
              defaultValue={formik.values.city}
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="Nairobi"
              required
            />
            {/* {formik.errors.city && formik.touched.city && (
              <div className="text-red-500">{formik.errors.city}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              State
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="state"
              defaultValue={formik.values.state}
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="kiambu"
              required
            />
            {/* {formik.errors.state && formik.touched.state && (
              <div className="text-red-500">{formik.errors.state}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="country"
              defaultValue={formik.values.country}
              id="country"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="Kenya"
              required
            />
            {/* {formik.errors.country && formik.touched.country && (
              <div className="text-red-500">{formik.errors.country}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Area
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="area"
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="runda"
              required
            />
            {/* {formik.errors.area && formik.touched.area && (
              <div className="text-red-500">{formik.errors.area}</div>
            )} */}
          </div>

          <hr className="my-4 col-span-3" />

          <div className="mt-6">
            <input
              id="default-checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="featured"
              defaultChecked={formik.values.featured}
              type="checkbox"
              value=""
              className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-primary300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Featured
            </label>
          </div>

          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a property type
            </label>
            <select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="propertyType"
              defaultValue={formik.values.propertyType}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
            >
              <option disabled>Choose a property type</option>
              {propertytypes?.map(
                (type: { name: string; id: number }, idx: number) => {
                  return (
                    <option value={type.id} key={idx}>
                      {type.name}
                    </option>
                  );
                }
              )}
            </select>
            {/* {formik.errors.propertyType && formik.touched.propertyType && (
              <div className="text-red-500">{formik.errors.propertyType}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor="size"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Size
            </label>
            <input
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="size"
              defaultValue={formik.values.size}
              min={0}
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="0"
              required
            />
            {/* {formik.errors.size && formik.touched.size && (
              <div className="text-red-500">{formik.errors.size}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor="distance"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Distance
            </label>
            <input
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="distance"
              defaultValue={formik.values.distance}
              id="distance"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="0"
              required
            />
            {/* {formik.errors.distance && formik.touched.distance && (
              <div className="text-red-500">{formik.errors.distance}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="price"
              defaultValue={formik.values.price}
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="0.00"
              required
            />
            {/* {formik.errors.price && formik.touched.price && (
              <div className="text-red-500">{formik.errors.price}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price per month
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="pricepermonth"
              defaultValue={formik.values.pricepermonth}
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="0"
              required
            />
            {/* {formik.errors.pricepermonth && formik.touched.pricepermonth && (
              <div className="text-red-500">{formik.errors.pricepermonth}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Bedrooms
            </label>
            <input
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="bedrooms"
              defaultValue={formik.values.bedrooms}
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              placeholder="0"
              required
            />
            {/* {formik.errors.bedrooms && formik.touched.bedrooms && (
              <div className="text-red-500">{formik.errors.bedrooms}</div>
            )} */}
          </div>

          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Property features
            </label>

            <FeatureBadges
              features={features}
              selectedFeatures={formik.values.features}
              onFeatureToggle={function (feature: string): void {
                if (formik.values.features?.find((f) => f == feature)) {
                  formik.setFieldValue(
                    "features",
                    formik.values.features.filter((f) => f !== feature)
                  );
                } else {
                  formik.setFieldValue("features", [
                    ...formik.values.features,
                    feature,
                  ]);
                }
              }}
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Images
            </label>
            <input
              id="images"
              name="images"
              type="file"
              multiple
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary300 dark:focus:border-primary300"
              onChange={(event) =>
                handleImageUpload(event, formik.setFieldValue)
              }
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-0 right-0 m-1"
                    onClick={() =>
                      handleImageDelete(index, formik.setFieldValue)
                    }
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Update Property
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
