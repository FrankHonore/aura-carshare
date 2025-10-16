"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Car, User, LogOut, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Aura</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/cars" className="text-gray-700 hover:text-blue-600">
              Browse Cars
            </Link>
            {session && (
              <>
                <Link href="/list-car" className="text-gray-700 hover:text-blue-600">
                  List Your Car
                </Link>
                <Link href="/bookings" className="text-gray-700 hover:text-blue-600">
                  My Bookings
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <User className="h-5 w-5" />
                  <span>{session.user.name || session.user.email}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => signIn()}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign In
                </button>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/cars" className="block text-gray-700 hover:text-blue-600">
              Browse Cars
            </Link>
            {session && (
              <>
                <Link href="/list-car" className="block text-gray-700 hover:text-blue-600">
                  List Your Car
                </Link>
                <Link href="/bookings" className="block text-gray-700 hover:text-blue-600">
                  My Bookings
                </Link>
                <Link href="/profile" className="block text-gray-700 hover:text-blue-600">
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block text-gray-700 hover:text-red-600"
                >
                  Sign Out
                </button>
              </>
            )}
            {!session && (
              <>
                <button
                  onClick={() => signIn()}
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Sign In
                </button>
                <Link
                  href="/auth/signup"
                  className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}