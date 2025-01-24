// import { Star } from 'lucide-react';
// import Image from 'next/image';
// export interface User {
//     id: number;
//     username: string;
//     email: string;
//     password: string;
//     salt: string;
//     firstname: string;
//     lastname: string;
//     contact: string;
//     role: string;
//     createdAt: string;
//     updatedAt: string;
//     companyId: number;
//   }

import { AnimatedTestimonials } from "./ui/animated-testimonials";

  
export interface TestimonialProps {
  quote: string; name: string; designation: string; imageUrl: string; 
}
  

// export function Testimonial({
//   name,
//   rating,
//   imageUrl,
//   description,
//   user,
//   onBehalfOf,
// }: TestimonialProps) {

//   return (
//     <div className="flex flex-col items-center p-6 outline-none">
//   {/* Stars */}
//   <div className="flex mb-4">
//     {[...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
//       />
//     ))}
//   </div>
//   {/* User Image */}
//   <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
//     <Image
//       src={imageUrl || '/7.jpg'}
//       alt={user.username}
//       layout="fill"
//       objectFit="cover"
//     />
//   </div>
//   {/* Description with quotes */}
//   <div className="relative w-full">
//     {/* Opening quote */}
//     <span className="absolute text-primary400 top-0 left-0 ml-[3rem] text-4xl sm:text-5xl md:text-6xl text-primary -translate-x-1/2 -translate-y-1/2">&#x275D;</span>
//     <p className="text-gray-600 dark:text-white text-center mb-4 px-8" dangerouslySetInnerHTML={{ __html: name }}></p>
//     <p className="text-gray-600 dark:text-white text-center mb-4 px-8" dangerouslySetInnerHTML={{ __html: description }}></p>
    
//     {/* Closing quote */}
//     <span className="absolute bottom-0 right-0 text-4xl sm:text-5xl md:text-6xl translate-x-1/2 translate-y-1/2 text-primary400">&#x275E;</span>
//   </div>
//   {/* Username */}
//   <p className="font-semibold text-primary300" dangerouslySetInnerHTML={{ __html: onBehalfOf }}></p>
// </div>
//   );
// }

export function AnimatedTestimonialsDemo({testimonials}:{testimonials:TestimonialProps[]}) {
  // const testimonials: { quote: string; name: string; designation: string; src: string; }[] = [
  //   {
  //     quote:
  //       "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
  //     name: "Sarah Chen",
  //     designation: "Product Manager at TechFlow",
  //     src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     quote:
  //       "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
  //     name: "Michael Rodriguez",
  //     designation: "CTO at InnovateSphere",
  //     src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     quote:
  //       "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
  //     name: "Emily Watson",
  //     designation: "Operations Director at CloudScale",
  //     src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     quote:
  //       "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
  //     name: "James Kim",
  //     designation: "Engineering Lead at DataPro",
  //     src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     quote:
  //       "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
  //     name: "Lisa Thompson",
  //     designation: "VP of Technology at FutureNet",
  //     src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  // ];
  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}
