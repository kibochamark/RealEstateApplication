import Contact from '@/components/Contact';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';
// import { FaHeart } from 'react-icons/fa'; // Importing the love icon

export const dynamic = "force-dynamic"



const page = () => {
  return (
    <Suspense fallback={<Loader className='animate animate-spin text-secondary400' />}>
      <Contact />
    </Suspense>
  )
}

export default page