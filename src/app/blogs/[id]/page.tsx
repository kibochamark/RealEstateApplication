import { getBlogByID } from "@/actions/Blog";
import { getproperties } from "@/actions/property";
import ReadMore from "@/components/Blogs/ReadMore";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";

interface PageProps {
  params: { id: number };
}

const Page = async ({ params }: PageProps) => {
  const { id } = params;

  try {
    const [blogPost, properties] = await Promise.all([getBlogByID(id), getproperties()]);

    //console.log(blogPost, "server blogs-------------------");

    return (
      <div className="w-full min-h-[50vh]">
        <div className="mt-20">
          <Suspense fallback={<Loader className="animate animate-spin text-secondary400" />}>
            <ReadMore blogPost={blogPost} properties={properties["properties"] || []} />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch blog post or properties:", error);
    return (
      <div className="w-full min-h-[50vh] flex justify-center items-center">
        <p>Error fetching data. Please try again later.</p>
      </div>
    );
  }
};

export default Page;