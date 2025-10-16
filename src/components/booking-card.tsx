import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Phone, MessageCircle, Star } from "lucide-react";

interface BookingCardProps {
  booking: {
    id: string;
    carId: string;
    car: {
      make: string;
      model: string;
      year: number;
      image: string;
      licensePlate: string;
    };
    startDate: string;
    endDate: string;
    totalCost: number;
    status: "PENDING" | "CONFIRMED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
    owner: {
      name: string;
      phone: string;
    };
  };
}

export function BookingCard({ booking }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "ACTIVE":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-gray-100 text-gray-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const isActive = booking.status === "CONFIRMED" || booking.status === "ACTIVE";
  const isPast = booking.status === "COMPLETED" || booking.status === "CANCELLED";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-start space-x-4 mb-4 md:mb-0">
          <Image
            src={booking.car.image}
            alt={`${booking.car.make} ${booking.car.model}`}
            width={100}
            height={80}
            className="rounded-lg object-cover"
          />
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {booking.car.year} {booking.car.make} {booking.car.model}
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>
            
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-2 text-center">🚗</span>
                <span>License: {booking.car.licensePlate}</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-2 text-center">👤</span>
                <span>Host: {booking.owner.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:items-end space-y-3">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">${booking.totalCost}</p>
            <p className="text-sm text-gray-600">Total Cost</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {isActive && (
              <>
                <a
                  href={`tel:${booking.owner.phone}`}
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call Host
                </a>
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Message
                </button>
              </>
            )}
            
            {isPast && booking.status === "COMPLETED" && (
              <button className="flex items-center px-3 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
                <Star className="w-4 h-4 mr-1" />
                Leave Review
              </button>
            )}
            
            <Link
              href={`/bookings/${booking.id}`}
              className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}