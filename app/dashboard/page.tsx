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
    <div className="min-h-screen p-10 bg-white">
      <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">
        Select a County
      </h1>

      {loading && <p>Loading counties...</p>}

      {!loading && counties.length === 0 && (
        <p>No counties found. Add some in admin.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {counties.map((county) => (
            <Link
            key={county.id}
            href={`/dashboard/${county.name.toLowerCase()}`}
            className="p-6 bg-[#D4AF37] text-white rounded-xl shadow hover:opacity-90 transition text-center"
            >
            <h2 className="text-xl font-semibold">
                {county.name}
            </h2>
            </Link>
        ))}
      </div>
    </div>
  );
}