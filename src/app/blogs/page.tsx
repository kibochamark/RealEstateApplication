import { getAllBlogs } from "@/actions/Blog";
import BlogComponent from "@/components/BlogComponent";


export const dynamic = "force-dynamic"

export default async function BlogList() {
    const blogdetails = await getAllBlogs();



    return (
        <div className="bg-gray-100 mx-auto px-4 py-8 mt-20">

            <BlogComponent blogdetails={blogdetails} />
        </div>
    )
}

