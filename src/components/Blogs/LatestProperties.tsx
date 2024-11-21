import Image from 'next/image'
import Link from 'next/link'

// This would typically come from an API or database
const latestProperties = [
  { id: '1', title: 'Modern Apartment in City Center', image: '/placeholder.svg?height=80&width=120', price: '$250,000' },
  { id: '2', title: 'Spacious Family Home with Garden', image: '/placeholder.svg?height=80&width=120', price: '$450,000' },
  { id: '3', title: 'Luxury Penthouse with Ocean View', image: '/placeholder.svg?height=80&width=120', price: '$1,200,000' },
  { id: '4', title: 'Cozy Cottage in the Countryside', image: '/placeholder.svg?height=80&width=120', price: '$180,000' },
]

export function LatestProperties() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Latest Properties</h3>
      <div className="space-y-4">
        {latestProperties.map((property) => (
          <Link key={property.id} href={`/properties/${property.id}`} className="flex items-center space-x-4 group">
            <div className="relative w-20 h-14 flex-shrink-0">
              <Image src={property.image} alt={property.title} layout="fill" objectFit="cover" className="rounded" />
            </div>
            <div>
              <h4 className="font-medium group-hover:text-blue-500 transition-colors">{property.title}</h4>
              <p className="text-sm text-gray-600">{property.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

