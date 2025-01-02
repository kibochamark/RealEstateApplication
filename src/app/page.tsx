import { getRecentBlogs } from "@/actions/Blog";
import { getproperties } from "@/actions/property";
import { getpropertytypes } from "@/actions/propertytype";
import { getTestimonials } from "@/actions/Testimonial";
import Aboutus from "@/components/aboutus";
import { RecentBlogs } from "@/components/Blogs/RecentBlogs";
import Component from "@/components/cards";
import HeroSection from "@/components/herosection";
import Process from "@/components/Process";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { Loader } from "lucide-react";
import { Suspense } from "react";

// const testimonials = [
//   {
//     rating: 5,
//     image: '/5.jpg',
//     description: "I found my dream home thanks to this amazing platform!",
//     userName: "Alice Johnson"
//   },
//   {
//     rating: 4,
//     image: '/5.jpg',
//     description: "The process was smooth and the support team was incredibly helpful.",
//     userName: "Bob Smith"
//   },
//   // Add more testimonials...
// ]


export const dynamic = "force-dynamic"



export default async function Home() {

  const [propertiesResult, propertyTypesResult, blogresult, testimonialsResult] = await Promise.allSettled([
    getproperties(),
    getpropertytypes(),
    getRecentBlogs(3),
    getTestimonials() ,
  ]);

  const properties =
    propertiesResult.status === "fulfilled" ? propertiesResult.value : [];
  const propertyTypes =
    propertyTypesResult.status === "fulfilled" ? propertyTypesResult.value : [];

  const blogs = blogresult.status === "fulfilled" ? blogresult.value : [];


  const testimonials = testimonialsResult.status === "fulfilled" ? testimonialsResult.value : [];
  console.log(testimonials, "pp")



  return (
    <Suspense fallback={<Loader className="animate min-h-[50vh] animate-spin text-secondary400" />}>
      <HeroSection propertytypes={propertyTypes} />
      <Component properties={properties["properties"] || []} />
      <div className="">
        <Aboutus />
      </div>
      <div className="bg-primary300/10">
        <Process />
      </div>
      <section id="testimonials" className="w-full py-12 bg-transparent ">
        <h2 className="text-2xl font-semibold text-center mb-8">What Our Customers Say</h2>
        <TestimonialSlider testimonials={testimonials} />
      </section>
      <div className="bg-primary300/10">
        <RecentBlogs blogs={blogs} />
      </div>
    </Suspense>

  );
}
