"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type County = {
  id: number;
  name: string;
};

type Town = {
  id: number;
  name: string;
  county_id: number;
};

export default function DashboardPage() {
  const router = useRouter();

  const [counties, setCounties] = useState<County[]>([]);
  const [towns, setTowns] = useState<Town[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function fetchTowns() {
      if (!selectedCounty) {
        setTowns([]);
        setSelectedTown("");
        return;
      }

      try {
        const res = await fetch(`/api/towns?countyId=${selectedCounty}`);
        const data = await res.json();

        setTowns(data);
        setSelectedTown("");
      } catch (err) {
        console.error("Failed to load towns", err);
      }
    }

    fetchTowns();
  }, [selectedCounty]);

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

      {/* MAIN BODY WITH BACKGROUND IMAGE ONLY HERE */}
      <main
        className="flex-1 flex flex-col items-center justify-center p-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/dash.jpg')",
        }}
      >
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

              <h2 className="text-xl font-bold text-black mb-4">
                Search Properties
              </h2>

              <label className="text-sm font-semibold text-black">
                County
              </label>

              <select
                className="w-full border border-black p-2 rounded mb-4 text-black"
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
              >
                <option value="">Select County</option>

                {counties.map((county) => (
                  <option key={county.id} value={county.id}>
                    {county.name}
                  </option>
                ))}
              </select>

              <label className="text-sm font-semibold text-black">
                Town
              </label>

              <select
                className="w-full border border-black p-2 rounded mb-4 text-black"
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value)}
                disabled={!selectedCounty}
              >
                <option value="">Select Town</option>

                {towns.map((town) => (
                  <option key={town.id} value={town.id}>
                    {town.name}
                  </option>
                ))}
              </select>

              <label className="text-sm font-semibold text-black">
                Category
              </label>

              <select
                className="w-full border border-black p-2 rounded mb-4 text-black"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={!selectedTown}
              >
                <option value="">Select Category</option>
                <option>Bedsitter</option>
                <option>Single Room</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3 Bedrooms</option>
                <option>4 Bedrooms</option>
                <option>5+ Bedrooms</option>
              </select>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Close
                </button>

                <button
                  disabled={!selectedCategory}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                  onClick={async () => {
                    const res = await fetch("/api/listings");
                    const data = await res.json();

                    const filtered = data.filter((l: any) => {
                      return (
                        (!selectedCounty ||
                          l.county_id === Number(selectedCounty)) &&
                        (!selectedTown ||
                          l.town_id === Number(selectedTown)) &&
                        (!selectedCategory ||
                          l.category === selectedCategory)
                      );
                    });

                    if (filtered.length === 0) {
                      alert("No listings found");
                      return;
                    }

                    setOpen(false);

                    router.push(
                      `/listings?county=${selectedCounty}&town=${selectedTown}&category=${selectedCategory}`
                    );
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