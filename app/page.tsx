"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <main className="min-h-screen bg-white flex flex-col">
      
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 shadow-sm">
        
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#D4AF37]">
            HouseFinder
          </h1>

          {isSignedIn && <UserButton />}
        </div>

        {!isSignedIn && (
          <Link
            href="/auth"
            className="bg-[#D4AF37] text-white px-5 py-2 rounded-lg hover:opacity-90"
          >
            Sign In
          </Link>
        )}

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
            <Link
              href="/dashboard"
              className="bg-[#D4AF37] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 inline-block"
            >
              Go to Dashboard
            </Link>
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