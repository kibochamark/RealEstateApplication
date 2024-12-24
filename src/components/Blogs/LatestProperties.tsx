import Image from 'next/image'
import Link from 'next/link'

export function LatestProperties({ properties }: { properties: any[] }) {
  console.log(properties, "properties");

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Latest Properties</h3>
      {properties.length === 0 && <p>No properties found</p>}
      <div className="space-y-4">
        {/* Slice the first 4 properties */}
        {properties.slice(0, 4).map((property: any) => (
          <Link key={property.id} href={`/listing/${property.id}`} className="flex items-center space-x-4 group">
            <div className="relative w-20 h-14 flex-shrink-0">
              <Image 
                src={
                  property?.images[0]?.url?.length > 0
                    ? property.images[0].url
                    : "/9.jpg" 
                }
                alt={property.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div>
              <h4 className="font-medium group-hover:text-blue-500 transition-colors">{property.name}</h4>
              <p className="text-sm text-gray-600">{property.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
