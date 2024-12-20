import React, { useState } from 'react';

export default function EditTestimanials() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImageUpload = (event:any) => {
    const files = event.target.files as FileList;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  return (
    <div className="w-full border-none shadow-none">
      <h2 className="text-2xl font-bold mb-4">Edit Testimony</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md h-32"
        ></textarea>
      </div>
      <div>
        <label htmlFor="images" className="block mb-2 font-medium text-gray-700">
          Images
        </label>
        <input type="file" id="images" multiple onChange={handleImageUpload} />
        <div className="mt-4">
          {uploadedImages.map((image, index) => (
            <img key={index} src={image} alt={`Uploaded Image ${index + 1}`} className="w-48 h-32 object-cover mr-4 mb-4" />
          ))}
        </div>
      </div>
    </div>
  );
}