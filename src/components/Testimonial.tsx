import { Star } from 'lucide-react';
import Image from 'next/image';
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    salt: string;
    firstname: string;
    lastname: string;
    contact: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    companyId: number;
  }
  
  export interface TestimonialProps {
    id: number;
    name: string;
    imageUrl: string;
    public_id: string;
    description: string;
    userId: number;
    onBehalfOf: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    user: User;
  }
  

export function Testimonial({
  name,
  rating,
  imageUrl,
  description,
  user,
  onBehalfOf,
}: TestimonialProps) {

  return (
    <div className="flex flex-col items-center p-6 outline-none">
  {/* Stars */}
  <div className="flex mb-4">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))}
  </div>
  {/* User Image */}
  <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
    <Image
      src={imageUrl || '/7.jpg'}
      alt={user.username}
      layout="fill"
      objectFit="cover"
    />
  </div>
  {/* Description with quotes */}
  <div className="relative w-full">
    {/* Opening quote */}
    <span className="absolute text-primary400 top-0 left-0 ml-[3rem] text-4xl sm:text-5xl md:text-6xl text-primary -translate-x-1/2 -translate-y-1/2">&#x275D;</span>
    <p className="text-gray-600 dark:text-white text-center mb-4 px-8" dangerouslySetInnerHTML={{ __html: name }}></p>
    <p className="text-gray-600 dark:text-white text-center mb-4 px-8" dangerouslySetInnerHTML={{ __html: description }}></p>
    
    {/* Closing quote */}
    <span className="absolute bottom-0 right-0 text-4xl sm:text-5xl md:text-6xl translate-x-1/2 translate-y-1/2 text-primary400">&#x275E;</span>
  </div>
  {/* Username */}
  <p className="font-semibold text-primary300" dangerouslySetInnerHTML={{ __html: onBehalfOf }}></p>
</div>
  );
}
