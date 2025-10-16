"use client";

import { useState, useMemo } from "react";
import { CarCard } from "@/components/car-card";
import { SearchFilters, FilterValues } from "@/components/search-filters";

// Mock data - in a real app, this would come from your database
const mockCars = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    color: "Silver",
    pricePerDay: 45,
    location: "Downtown Seattle",
    images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop"],
    features: ["AC", "GPS", "Bluetooth"],
    rating: 4.8,
    reviews: 24,
    owner: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" }
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    year: 2021,
    color: "Blue",
    pricePerDay: 35,
    location: "Capitol Hill",
    images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&h=400&fit=crop"],
    features: ["AC", "Bluetooth", "USB"],
    rating: 4.9,
    reviews: 31,
    owner: { name: "Jane Smith", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop" }
  },
  {
    id: "3",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    color: "White",
    pricePerDay: 85,
    location: "Belltown",
    images: ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop"],
    features: ["Autopilot", "Supercharging", "Premium Audio"],
    rating: 5.0,
    reviews: 12,
    owner: { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop" }
  },
  {
    id: "4",
    make: "BMW",
    model: "X3",
    year: 2022,
    color: "Black",
    pricePerDay: 75,
    location: "Queen Anne",
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop"],
    features: ["AC", "GPS", "Leather Seats", "Sunroof"],
    rating: 4.7,
    reviews: 18,
    owner: { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" }
  }
];

export default function CarsPage() {
  const [filters, setFilters] = useState<FilterValues>({
    priceRange: [0, 200],
    carTypes: [],
    features: [],
    transmission: null,
  });
  const [displayCount, setDisplayCount] = useState(6);
  const [sortBy, setSortBy] = useState("recommended");

  const filteredCars = useMemo(() => {
    return mockCars.filter((car) => {
      // Price filter
      if (car.pricePerDay > filters.priceRange[1]) {
        return false;
      }

      // Car type filter (basic matching)
      if (filters.carTypes.length > 0) {
        const carType = car.model.includes("Model 3") ? "Electric" :
                       car.model.includes("X3") ? "SUV" :
                       "Sedan";
        if (!filters.carTypes.includes(carType)) {
          return false;
        }
      }

      // Features filter
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every(feature =>
          car.features.includes(feature)
        );
        if (!hasAllFeatures) {
          return false;
        }
      }

      // Transmission filter (assuming all are automatic for mock data)
      if (filters.transmission && filters.transmission === "Manual") {
        return false;
      }

      return true;
    });
  }, [filters]);

  const sortedCars = useMemo(() => {
    const sorted = [...filteredCars];

    switch (sortBy) {
      case "price-low-high":
        return sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
      case "price-high-low":
        return sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
      case "rating-high-low":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "distance-nearest":
        // For mock data, just sort by location name
        return sorted.sort((a, b) => a.location.localeCompare(b.location));
      case "recommended":
      default:
        // Default order (by rating, then reviews)
        return sorted.sort((a, b) => {
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.reviews - a.reviews;
        });
    }
  }, [filteredCars, sortBy]);

  const displayedCars = useMemo(() => {
    return sortedCars.slice(0, displayCount);
  }, [sortedCars, displayCount]);

  const hasMoreCars = displayedCars.length < sortedCars.length;

  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setDisplayCount(6); // Reset display count when filters change
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Cars</h1>
          <p className="text-gray-600">Find the perfect car for your next trip</p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters onApplyFilters={handleApplyFilters} />
          </div>

          {/* Car Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {sortedCars.length} {sortedCars.length === 1 ? 'car' : 'cars'} available
                {displayedCars.length < sortedCars.length && ` (showing ${displayedCars.length})`}
              </p>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating-high-low">Rating: High to Low</option>
                <option value="distance-nearest">Distance: Nearest</option>
              </select>
            </div>

            {displayedCars.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreCars && (
                  <div className="text-center mt-8">
                    <button
                      onClick={handleLoadMore}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Load More Cars ({sortedCars.length - displayedCars.length} remaining)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}