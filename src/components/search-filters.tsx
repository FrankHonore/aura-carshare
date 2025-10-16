"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FilterValues {
  priceRange: [number, number];
  carTypes: string[];
  features: string[];
  transmission: string | null;
}

interface SearchFiltersProps {
  onApplyFilters: (filters: FilterValues) => void;
}

export function SearchFilters({ onApplyFilters }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    carType: true,
    features: true,
    transmission: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCarTypeChange = (type: string) => {
    setSelectedCarTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      priceRange,
      carTypes: selectedCarTypes,
      features: selectedFeatures,
      transmission: selectedTransmission,
    });
  };

  const handleClearFilters = () => {
    setPriceRange([0, 200]);
    setSelectedCarTypes([]);
    setSelectedFeatures([]);
    setSelectedTransmission(null);
    onApplyFilters({
      priceRange: [0, 200],
      carTypes: [],
      features: [],
      transmission: null,
    });
  };

  const FilterSection = ({ 
    title, 
    children, 
    section 
  }: { 
    title: string; 
    children: React.ReactNode; 
    section: keyof typeof expandedSections;
  }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {expandedSections[section] ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {expandedSections[section] && (
        <div className="mt-3">{children}</div>
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

      <FilterSection title="Price Range" section="price">
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="200"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Car Type" section="carType">
        <div className="space-y-2">
          {["Sedan", "SUV", "Hatchback", "Convertible", "Truck", "Electric"].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCarTypes.includes(type)}
                onChange={() => handleCarTypeChange(type)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Features" section="features">
        <div className="space-y-2">
          {["AC", "GPS", "Bluetooth", "USB", "Sunroof", "Leather Seats", "Backup Camera"].map((feature) => (
            <label key={feature} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Transmission" section="transmission">
        <div className="space-y-2">
          {["Automatic", "Manual"].map((transmission) => (
            <label key={transmission} className="flex items-center">
              <input
                type="radio"
                name="transmission"
                checked={selectedTransmission === transmission}
                onChange={() => setSelectedTransmission(transmission)}
                className="border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{transmission}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="space-y-2">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}