"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <main className="min-h-screen bg-white flex flex-col">
      
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 shadow-sm">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-[#D4AF37]">
            HouseFinder
          </h1>
        </div>

        {/* Right Side */}
        <div>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link
              href="/auth"
              className="bg-[#D4AF37] text-white px-5 py-2 rounded-lg hover:opacity-90"
            >
              Sign In
            </Link>
          )}
        </div>

      </header>

      {/* Hero Section */}
      <section
        className="flex-1 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.png')",
        }}
      >
        <div className="max-w-3xl text-center px-6 bg-black/40 p-8 rounded-xl">
          <h2 className="text-5xl font-bold text-white mb-6">
            Find a House With Ease
          </h2>

          <p className="text-xl text-white mb-10">
            Browse houses across Kenya and save time, money,
            and unnecessary agent fees.
          </p>

          {!isSignedIn ? (
            <Link
              href="/auth"
              className="bg-[#D4AF37] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 inline-block"
            >
              Get Started
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-4">
              
              <Link
                href="/dashboard"
                className="bg-[#D4AF37] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 inline-block"
              >
                Go to Dashboard
              </Link>

              <p className="text-xl text-white mb-10">
                Join us today and become a partner. As a caretaker or landlord,
                you can list your apartments, share property details, and easily let tenants know
                when vacancies are available.
              </p>

              <Link
                href="/admin"
                className="bg-[#D4AF37] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 inline-block"
              >
                Join Us
              </Link>

            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#D4AF37] text-white text-center py-4">
        © 2026 HouseFinder. All rights reserved.
      </footer>

    </main>
  );
}