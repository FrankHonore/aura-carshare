import { BookingCard } from "@/components/booking-card";
import { Calendar, Car, Clock } from "lucide-react";

// Mock booking data
const mockBookings = [
  {
    id: "1",
    carId: "1",
    car: {
      make: "Toyota",
      model: "Camry",
      year: 2022,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200&h=160&fit=crop",
      licensePlate: "ABC-123"
    },
    startDate: "2024-02-15",
    endDate: "2024-02-18",
    totalCost: 135,
    status: "CONFIRMED" as const,
    owner: {
      name: "John Doe",
      phone: "+1 (555) 123-4567"
    }
  },
  {
    id: "2",
    carId: "2",
    car: {
      make: "Honda",
      model: "Civic",
      year: 2021,
      image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=200&h=160&fit=crop",
      licensePlate: "XYZ-789"
    },
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    totalCost: 70,
    status: "COMPLETED" as const,
    owner: {
      name: "Jane Smith",
      phone: "+1 (555) 987-6543"
    }
  },
  {
    id: "3",
    carId: "3",
    car: {
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200&h=160&fit=crop",
      licensePlate: "ELC-456"
    },
    startDate: "2024-03-01",
    endDate: "2024-03-03",
    totalCost: 170,
    status: "PENDING" as const,
    owner: {
      name: "Mike Johnson",
      phone: "+1 (555) 456-7890"
    }
  }
];

export default function BookingsPage() {
  const activeBookings = mockBookings.filter(b => b.status === "CONFIRMED" || b.status === "PENDING");
  const pastBookings = mockBookings.filter(b => b.status === "COMPLETED" || b.status === "CANCELLED");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your car rentals and reservations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Bookings</h3>
                <p className="text-2xl font-bold text-blue-600">{activeBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Car className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Trips</h3>
                <p className="text-2xl font-bold text-green-600">{mockBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Hours Driven</h3>
                <p className="text-2xl font-bold text-purple-600">24</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Bookings</h2>
          {activeBookings.length > 0 ? (
            <div className="space-y-4">
              {activeBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Bookings</h3>
              <p className="text-gray-600 mb-4">You don't have any upcoming trips scheduled.</p>
              <a 
                href="/cars"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Cars
              </a>
            </div>
          )}
        </div>

        {/* Past Bookings */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Bookings</h2>
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Past Bookings</h3>
              <p className="text-gray-600">Your booking history will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}