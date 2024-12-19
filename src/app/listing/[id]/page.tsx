import { getPropertyById, getSimilarPropertyById } from '@/actions/property';
import PropertyDetail from '@/components/propertydetails';
import React from 'react';

interface PageProps {
  params: { id: number };
}

const Page = async ({ params }: PageProps) => {
  const { id } = params; // Extract id from the route parameters
  const [property, similarProperties] = await Promise.all([
    getPropertyById(id),
    getSimilarPropertyById(id)
]);

  console.log(property, 'propertypage');

  return (
    <div className="w-full">
      <div className="mt-20">
        <PropertyDetail property={property} similarproperties={similarProperties} />
      </div>
    </div>
  );
};

export default Page;
