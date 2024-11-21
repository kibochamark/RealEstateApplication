import { Star } from 'lucide-react'
import Image from 'next/image'

export interface TestimonialProps {
    rating: number
    image: string
    description: string
    userName: string
}

export function Testimonial({ rating, image, description, userName }: TestimonialProps) {
    return (
        <div className="flex flex-col items-center p-6  outline-none" >
            <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
            <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
                <Image src={image} alt={userName} layout="fill" objectFit="cover" />
            </div>
            <p className="text-gray-600 dark:text-white text-center mb-4">{description}</p>
            <p className="font-semibold text-primary300">{userName}</p>
        </div>
    )
}

