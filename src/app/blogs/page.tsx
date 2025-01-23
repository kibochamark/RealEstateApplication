import { getAllBlogs } from "@/actions/Blog";
import BlogComponent from "@/components/BlogComponent";


export const dynamic = "force-dynamic"

export default async function BlogList() {
    const blogdetails = await getAllBlogs() ?? [] ;



    return (
        <div className="bg-gray-100  rounded-lg  mx-4 px-4 min-h-[50vh] py-8 mt-20">
            

            <BlogComponent blogdetails={blogdetails} />
        </div>
    )
}

