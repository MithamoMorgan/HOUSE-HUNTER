"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Listing = {
  id: number;
  name: string;
  category: string;
  price: number;
  contact: string;
  description: string;
  image: string;
  vacant_units: number;
  amenities: string;
  county_id: number;
  town_id: number;
};

export default function ListingsContent() {
  const [listings, setListings] = useState<Listing[]>([]);
  const searchParams = useSearchParams();

  const county = searchParams.get("county");
  const town = searchParams.get("town");
  const category = searchParams.get("category");

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `/api/listings?county=${county || ""}&town=${town || ""}&category=${category || ""}`
      );

      const data = await res.json();
      setListings(data);
    }

    load();
  }, [county, town, category]);

  return (
    <div className="min-h-screen bg-white p-10">

      <h1 className="text-2xl font-bold text-[#D4AF37] mb-6">
        Available Listings
      </h1>

      {listings.length === 0 ? (
        <p className="text-black">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {listings.map((l) => (
            <div
              key={l.id}
              className="border rounded p-4 shadow text-center text-black"
            >

              {l.image && (
                <img
                  src={l.image}
                  className="h-40 w-full object-cover mb-2"
                />
              )}

              <h2 className="font-bold text-lg">{l.name}</h2>

              <p><b>Category:</b> {l.category}</p>
              <p><b>Rent:</b> KES {l.price}</p>
              <p><b>Vacant Units:</b> {l.vacant_units}</p>
              <p><b>Amenities:</b> {l.amenities}</p>
              <p><b>Description:</b> {l.description}</p>
              <p><b>Contact:</b> {l.contact}</p>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}