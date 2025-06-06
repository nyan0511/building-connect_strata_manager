import Image from 'next/image';

interface Facility {
  name: string;
  image: string;
  hours: string;
  booking: string;
  rules: string[];
  description: string;
}

interface FacilityCardProps {
  facility: Facility;
}

export default function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={facility.image}
          alt={facility.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{facility.name}</h3>
        <p className="text-gray-600 mb-4">{facility.description}</p>
        
        <div className="space-y-3">
          <div>
            <span className="font-medium text-gray-700">Operating Hours:</span>
            <span className="ml-2 text-gray-600">{facility.hours}</span>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">Booking:</span>
            <span className="ml-2 text-gray-600">{facility.booking}</span>
          </div>
          
          {facility.rules.length > 0 && (
            <div>
              <span className="font-medium text-gray-700">Usage Guidelines:</span>
              <ul className="mt-1 ml-4 text-sm text-gray-600">
                {facility.rules.map((rule, index) => (
                  <li key={index} className="list-disc">{rule}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Available
          </span>
        </div>
      </div>
    </div>
  );
} 