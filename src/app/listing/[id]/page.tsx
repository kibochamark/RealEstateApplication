import { getPropertyById } from '@/actions/property';
import PropertyDetail from '@/components/propertydetails';
import React from 'react';

interface PageProps {
  params: { id: number };
}

const Page = async ({ params }: PageProps) => {
  const { id } = params; // Extract id from the route parameters
  const property = await getPropertyById(id) ?? {}; // Fetch property details using id

  console.log(property, 'propertypage');

  return (
    <div className="w-full">
      <div className="mt-20">
        <PropertyDetail property={property} />
      </div>
    </div>
  );
};

export default Page;
