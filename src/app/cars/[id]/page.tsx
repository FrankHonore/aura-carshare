import Image from "next/image";
import { Star, MapPin, Calendar, Users, Fuel, Settings, Shield } from "lucide-react";
import { BookingForm } from "@/components/booking-form";

// Mock data - in a real app, this would come from your database
const mockCar = {
  id: "1",
  make: "Toyota",
  model: "Camry",
  year: 2022,
  color: "Silver",
  licensePlate: "ABC-123",
  description: "A reliable and comfortable sedan perfect for city driving and weekend trips. Well-maintained with recent service records.",
  pricePerDay: 45,
  location: "Downtown Seattle",
  latitude: 47.6062,
  longitude: -122.3321,
  images: [
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1617531653520-bd466a8f2316?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop"
  ],
  features: ["AC", "GPS", "Bluetooth", "USB", "Backup Camera", "Cruise Control"],
  mileage: 35000,
  fuelType: "Gasoline",
  transmission: "Automatic",
  seats: 5,
  rating: 4.8,
  reviews: 24,
  owner: {
    id: "owner1",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop",
    joinedDate: "2021-03-15",
    totalTrips: 142,
    responseRate: 98
  }
};

const mockReviews = [
  {
    id: "1",
    author: "Sarah Miller",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    rating: 5,
    comment: "Great car and excellent communication from John. The car was clean and exactly as described.",
    date: "2024-01-15"
  },
  {
    id: "2",
    author: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    rating: 4,
    comment: "Reliable car for my business trip. Pickup was smooth and on time.",
    date: "2024-01-10"
  }
];

interface CarDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="col-span-2 relative h-64 md:h-80">
                  <Image
                    src={mockCar.images[0]}
                    alt={`${mockCar.make} ${mockCar.model}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                {mockCar.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="relative h-24 md:h-32">
                    <Image
                      src={image}
                      alt={`${mockCar.make} ${mockCar.model} ${index + 2}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Car Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {mockCar.year} {mockCar.make} {mockCar.model}
                </h1>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold ml-1">{mockCar.rating}</span>
                  <span className="text-gray-600 ml-1">({mockCar.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{mockCar.location}</span>
              </div>

              <p className="text-gray-700 mb-6">{mockCar.description}</p>

              {/* Car Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{mockCar.seats} seats</span>
                </div>
                <div className="flex items-center">
                  <Settings className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{mockCar.transmission}</span>
                </div>
                <div className="flex items-center">
                  <Fuel className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{mockCar.fuelType}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">📊</span>
                  <span className="text-gray-700">{mockCar.mileage.toLocaleString()} mi</span>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {mockCar.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Meet Your Host</h3>
              <div className="flex items-start space-x-4">
                <Image
                  src={mockCar.owner.avatar}
                  alt={mockCar.owner.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900">{mockCar.owner.name}</h4>
                  <p className="text-gray-600 mb-2">
                    Joined {new Date(mockCar.owner.joinedDate).toLocaleDateString()}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Total trips:</span>
                      <span className="ml-1 font-semibold">{mockCar.owner.totalTrips}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Response rate:</span>
                      <span className="ml-1 font-semibold">{mockCar.owner.responseRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reviews ({mockCar.reviews})
              </h3>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-start space-x-3">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-semibold text-gray-900">{review.author}</h5>
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-1">{review.comment}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <BookingForm car={mockCar} />
          </div>
        </div>
      </div>
    </div>
  );
}