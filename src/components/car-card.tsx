import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, User } from "lucide-react";

interface CarCardProps {
  car: {
    id: string;
    make: string;
    model: string;
    year: number;
    color: string;
    pricePerDay: number;
    location: string;
    images: string[];
    features: string[];
    rating: number;
    reviews: number;
    owner: {
      name: string;
      avatar: string;
    };
  };
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/cars/${car.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-sm font-semibold text-gray-900">
            ${car.pricePerDay}/day
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {car.year} {car.make} {car.model}
            </h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">
                {car.rating} ({car.reviews})
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{car.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={car.owner.avatar}
                alt={car.owner.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm text-gray-600 ml-2">{car.owner.name}</span>
            </div>
            <div className="text-sm text-gray-500">
              {car.color}
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {car.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="text-xs text-gray-500">
                +{car.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}