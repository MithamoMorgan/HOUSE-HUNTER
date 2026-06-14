"use client";

import { useEffect, useState } from "react";

type County = {
  id: number;
  name: string;
};

type Town = {
  id: number;
  name: string;
};

export default function AdminPage() {
  const [counties, setCounties] = useState<County[]>([]);
  const [towns, setTowns] = useState<Town[]>([]);

  // COUNTY
  const [newCounty, setNewCounty] = useState("");

  // TOWN
  const [countyId, setCountyId] = useState("");
  const [town, setTown] = useState("");

  // LISTING
  const [listingCounty, setListingCounty] = useState("");
  const [listingTown, setListingTown] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    contact: "",
    description: "",
    image: "",
    vacant_units: "",
    amenities: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingCounty, setLoadingCounty] = useState(false);
  const [loadingListing, setLoadingListing] = useState(false);

  // LOAD COUNTIES
  useEffect(() => {
    async function loadCounties() {
      const res = await fetch("/api/counties");
      const data = await res.json();
      setCounties(data);
    }

    loadCounties();
  }, []);

  // LOAD TOWNS FOR LISTING
  useEffect(() => {
    if (!listingCounty) {
      setTowns([]);
      return;
    }

    fetch(`/api/towns?countyId=${listingCounty}`)
      .then((res) => res.json())
      .then(setTowns);
  }, [listingCounty]);

  // ADD COUNTY
  async function addCounty() {
    if (!newCounty) return;

    setLoadingCounty(true);

    await fetch("/api/counties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCounty }),
    });

    setNewCounty("");
    setLoadingCounty(false);

    const res = await fetch("/api/counties");
    const data = await res.json();
    setCounties(data);

    alert("County added!");
  }

  // ADD TOWN
  async function addTown() {
    if (!countyId || !town) return;

    setLoading(true);

    await fetch("/api/towns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        county_id: countyId,
        name: town,
      }),
    });

    setTown("");
    setLoading(false);

    alert("Town added!");
  }

  // ADD LISTING
  async function addListing() {
    if (!listingCounty || !listingTown) return;

    setLoadingListing(true);

    await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        county_id: listingCounty,
        town_id: listingTown,
        price: Number(form.price),
        vacant_units: Number(form.vacant_units),
      }),
    });

    setForm({
      name: "",
      category: "",
      price: "",
      contact: "",
      description: "",
      image: "",
      vacant_units: "",
      amenities: "",
    });

    setLoadingListing(false);

    alert("Listing created!");
  }

  return (
    <div className="min-h-screen bg-white flex justify-center py-10">
      <div className="w-96 space-y-10">

        <h1 className="text-2xl font-bold text-center text-black">
          Admin Dashboard
        </h1>

        {/* ADD COUNTY */}
        <div className="border p-4 rounded space-y-3">
          <h2 className="font-semibold text-black">Add County</h2>

          <input
            className="border p-2 w-full text-black"
            placeholder="County name"
            value={newCounty}
            onChange={(e) => setNewCounty(e.target.value)}
          />

          <button
            onClick={addCounty}
            className="bg-[#D4AF37] text-white px-4 py-2 rounded w-full"
          >
            {loadingCounty ? "Saving..." : "Add County"}
          </button>
        </div>

        {/* ADD TOWN */}
        <div className="border p-4 rounded space-y-3">
          <h2 className="font-semibold text-black">Add Town</h2>

          <select
            className="border p-2 w-full text-black"
            value={countyId}
            onChange={(e) => setCountyId(e.target.value)}
          >
            <option value="">Select County</option>
            {counties.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            className="border p-2 w-full text-black"
            placeholder="Town name"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />

          <button
            onClick={addTown}
            className="bg-[#D4AF37] text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Saving..." : "Add Town"}
          </button>
        </div>

        {/* ADD LISTING */}
        <div className="border p-4 rounded space-y-3">
          <h2 className="font-semibold text-black">Create Listing</h2>

          <input
            className="border p-2 w-full text-black"
            placeholder="Apartment Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <select
            className="border p-2 w-full text-black"
            value={listingCounty}
            onChange={(e) => setListingCounty(e.target.value)}
          >
            <option value="">Select County</option>
            {counties.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 w-full text-black"
            value={listingTown}
            onChange={(e) => setListingTown(e.target.value)}
          >
            <option value="">Select Town</option>
            {towns.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 w-full text-black"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
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

          <input
            className="border p-2 w-full text-black"
            placeholder="Rent"
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            className="border p-2 w-full text-black"
            placeholder="Vacant Units"
            onChange={(e) =>
              setForm({ ...form, vacant_units: e.target.value })
            }
          />

          <input
            className="border p-2 w-full text-black"
            placeholder="Amenities"
            onChange={(e) =>
              setForm({ ...form, amenities: e.target.value })
            }
          />

          <input
            className="border p-2 w-full text-black"
            placeholder="Contact"
            onChange={(e) =>
              setForm({ ...form, contact: e.target.value })
            }
          />

          <textarea
            className="border p-2 w-full text-black"
            placeholder="Description"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="border p-2 w-full text-black"
            placeholder="Image URL"
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
          />

          <button
            onClick={addListing}
            className="bg-[#D4AF37] text-white px-4 py-2 rounded w-full hover:opacity-90"
          >
            {loadingListing ? "Saving..." : "Create Listing"}
          </button>
        </div>

      </div>
    </div>
  );
}