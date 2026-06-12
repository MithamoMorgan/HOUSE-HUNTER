"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type County = {
  id: number;
  name: string;
};

export default function DashboardPage() {
  const [counties, setCounties] = useState<County[]>([]);
  const [loading, setLoading] = useState(true);

  // MODAL STATE
  const [open, setOpen] = useState(false);

  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchCounties() {
      try {
        const res = await fetch("/api/counties");
        const data = await res.json();
        setCounties(data);
      } catch (err) {
        console.error("Failed to load counties", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCounties();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#D4AF37]">
          HouseFinder
        </h1>

        <Link
          href="/"
          className="text-[#D4AF37] font-semibold hover:underline"
        >
          Home
        </Link>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">
          Find Apartments
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-[#D4AF37] text-white px-6 py-3 rounded-lg shadow hover:opacity-90"
        >
          Start Search
        </button>

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">

              <h2 className="text-xl font-bold text-[#D4AF37] mb-4">
                Search Properties
              </h2>

              {/* COUNTY */}
              <label className="text-sm font-semibold">County</label>
              <select
                className="w-full border p-2 rounded mb-4"
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
              >
                <option value="">Select County</option>
                {counties.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* TOWN */}
              <label className="text-sm font-semibold">Town</label>
              <select
                className="w-full border p-2 rounded mb-4"
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value)}
                disabled={!selectedCounty}
              >
                <option value="">Select Town</option>
                <option>Nairobi CBD</option>
                <option>Westlands</option>
                <option>Karen</option>
              </select>

              {/* CATEGORY */}
              <label className="text-sm font-semibold">Category</label>
              <select
                className="w-full border p-2 rounded mb-4"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={!selectedTown}
              >
                <option value="">Select Category</option>
                <option>Bedsitter</option>
                <option>Single Room</option>
                <option>1 Bedroom</option>
                <option>2 Bedroom</option>
                <option>3 Bedroom</option>
              </select>

              {/* ACTIONS */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Close
                </button>

                <button
                  disabled={!selectedCategory}
                  className="bg-[#D4AF37] text-white px-4 py-2 rounded disabled:opacity-50"
                  onClick={() => {
                    setOpen(false);
                    // later: route to results page
                    console.log({
                      selectedCounty,
                      selectedTown,
                      selectedCategory,
                    });
                  }}
                >
                  Search
                </button>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#D4AF37] text-white text-center py-4">
        © 2026 HouseFinder. All rights reserved.
      </footer>

    </div>
  );
}