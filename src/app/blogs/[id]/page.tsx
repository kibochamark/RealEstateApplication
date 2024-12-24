import { getBlogByID} from "@/actions/Blog";
import { getproperties, getPropertyById, getSimilarPropertyById } from "@/actions/property";
import ReadMore from "@/components/Blogs/ReadMore";
import PropertyDetail from "@/components/propertydetails";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";

interface PageProps {
  params: { id: number };

}

const Page = async ({ params }: PageProps) => {
  const { id } = params; 
  const [blogPost, properties] = await Promise.all([getBlogByID(id), getproperties()]);
  

  return (
    <div className="w-full min-h-[50vh]">
      <div className="mt-20">
        <Suspense
          fallback={
            <Loader className="animate animate-spin text-secondary400" />
          }
        >
          <ReadMore blogPost={blogPost} properties={properties["properties"] || []} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
