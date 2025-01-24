import { getRecentBlogs } from "@/actions/Blog";
import { getproperties } from "@/actions/property";
import { getpropertytypes } from "@/actions/propertytype";
import { getTestimonials } from "@/actions/Testimonial";
import Aboutus from "@/components/aboutus";
import { RecentBlogs } from "@/components/Blogs/RecentBlogs";
import Component from "@/components/cards";
import { Categories } from "@/components/Categories";
import HeroSection from "@/components/herosection";
import Process from "@/components/Process";
import { AnimatedTestimonialsDemo } from "@/components/Testimonial";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import HeroSearchBar from "@/components/UpdatedLayout/HeroSearchBar";
import { FullScreenCarousel } from "@/components/UpdatedLayout/HeroSections";
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
    getTestimonials(),
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


      {/* <HeroSection propertytypes={propertyTypes} /> */}
      <div className="h-[100vh] relative w-full px-6">
        <FullScreenCarousel />
        {/* Search area */}
        <div className="absolute -bottom-10 z-30 flex justify-center mx-auto inset-x-0">
          <div className="w-fit bg-[#F0F8FF] py-2 px-4 rounded-lg shadow-lg backdrop-blur-lg">
            <h3 className="text-labelLarge p-2 font-bold">Find you next dream house</h3>
            <div className="my-2 p-2">
              <HeroSearchBar />
            </div>
          </div>

        </div>
      </div>


      {/* featured properties */}
      <Component properties={properties["properties"] || []} />


      {/* Available categories */}
      <section id="testimonials" className="w-full py-12 bg-gray-900">
        <h2 className="text-displayMedium font-semibold text-center pl-8 text-white mb-8">We Span a Versatile Of Categories</h2>
        <Categories />
      </section>


      <div className="">
        <Aboutus />
      </div>

      {/* Sale or rental process */}
      <div className="bg-primary300/10">
        <Process />
      </div>

      {/* Testimonials */}
      <section id="testimonials" className="w-full py-12 bg-gray-900">
        <h2 className="text-displayMedium font-semibold text-center pl-8 text-white mb-8">What Our Customers Say</h2>
        {/* <TestimonialSlider testimonials={testimonials} /> */}
        <AnimatedTestimonialsDemo testimonials={testimonials} />
      </section>


      <div className="bg-primary300/10">
        <RecentBlogs blogs={blogs} />
      </div>
    </Suspense>

  );
}
