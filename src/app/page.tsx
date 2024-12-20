import { getproperties } from "@/actions/property";
import Aboutus from "@/components/aboutus";
import { RecentBlogs } from "@/components/Blogs/RecentBlogs";
import Component from "@/components/cards";
import HeroSection from "@/components/herosection";
import Process from "@/components/Process";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { Loader } from "lucide-react";
import { Suspense } from "react";

const testimonials = [
  {
    rating: 5,
    image: '/5.jpg',
    description: "I found my dream home thanks to this amazing platform!",
    userName: "Alice Johnson"
  },
  {
    rating: 4,
    image: '/5.jpg',
    description: "The process was smooth and the support team was incredibly helpful.",
    userName: "Bob Smith"
  },
  // Add more testimonials...
]


export const dynamic = "force-dynamic"



export default async function Home() {
  const properties = await getproperties() ?? []
  return (
    <Suspense fallback={<Loader className="animate animate-spin text-secondary400"/>}>
      <HeroSection />
      <Component properties={properties["properties"] || []}/>
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
      <RecentBlogs />
      </div>
    </Suspense>

  );
}
