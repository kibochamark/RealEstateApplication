import React, { Suspense } from "react";
import {
  getAllproperties,
  getproperties,
  getPropertyById,
  getpropertyfeatures,
} from "@/actions/property";
import { Loader } from "lucide-react";
import PageView from "@/components/admin/property/Manageproperty";
import { getpropertytypes } from "@/actions/propertytype";
import EditProperty from "@/components/admin/property/EditProperty";
interface PageProps {
  params: { id: number };
}
// export const dynamic = "force-dynamic"
// interface Property{
//     params: {id: number};
// }

const page = async ({ params }: PageProps) => {
  const { id } = params;
 const properties = await getAllproperties() ?? []
    const features = await getpropertyfeatures() ?? []
    const propertytypes = await getpropertytypes() ?? []
  const propertyById = await getPropertyById(id) ?? [];

  // console.log(propertytypes, "propertypes,,,,,,,");
  // console.log(properties, "properties222,,,,,,,");
  // console.log(propertyById, "propertyById,,,,,,,");

  return (
    <div className="col-span-3 md:container">
      <Suspense
        fallback={<Loader className="animate animate-spin text-secondary400" />}
      >
        <EditProperty
          features={features}
          propertytypes={propertytypes}
          propertyById={propertyById}
        />
      </Suspense>
    </div>
  );
};

export default page;
