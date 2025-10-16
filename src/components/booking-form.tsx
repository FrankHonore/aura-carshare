"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Calendar, Clock, DollarSign, Shield } from "lucide-react";
import { addDays, differenceInDays } from "date-fns";

interface BookingFormProps {
  car: {
    id: string;
    make: string;
    model: string;
    pricePerDay: number;
  };
}

export function BookingForm({ car }: BookingFormProps) {
  const { data: session } = useSession();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = differenceInDays(end, start) || 1;
    return days * car.pricePerDay;
  };

  const handleBooking = async () => {
    if (!session) {
      alert("Please sign in to book a car");
      return;
    }

    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    setIsLoading(true);
    
    // Mock booking process
    setTimeout(() => {
      alert("Booking request sent! You'll receive a confirmation email soon.");
      setIsLoading(false);
    }, 2000);
  };

  const total = calculateTotal();
  const serviceFee = total * 0.1; // 10% service fee
  const finalTotal = total + serviceFee;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900">
          ${car.pricePerDay}
          <span className="text-lg font-normal text-gray-600">/day</span>
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Pick-up Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Return Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Pick-up Time
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>9:00 AM</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>12:00 PM</option>
            <option>1:00 PM</option>
            <option>2:00 PM</option>
            <option>3:00 PM</option>
            <option>4:00 PM</option>
            <option>5:00 PM</option>
          </select>
        </div>
      </div>

      {total > 0 && (
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">
                ${car.pricePerDay} × {differenceInDays(new Date(endDate), new Date(startDate)) || 1} days
              </span>
              <span className="text-gray-900">${total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service fee</span>
              <span className="text-gray-900">${serviceFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleBooking}
        disabled={isLoading || !startDate || !endDate}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Processing..." : session ? "Request to Book" : "Sign In to Book"}
      </button>

      <div className="mt-4 space-y-3 text-sm text-gray-600">
        <div className="flex items-center">
          <Shield className="w-4 h-4 mr-2 text-green-500" />
          <span>Free cancellation up to 24 hours before pickup</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-2 text-green-500" />
          <span>No hidden fees</span>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500 text-center">
        You won't be charged until your request is accepted by the host.
      </p>
    </div>
  );
}