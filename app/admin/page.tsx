"use client";

import { useState } from "react";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function addCounty() {
    if (!name) return;

    setLoading(true);

    await fetch("/api/counties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    setLoading(false);

    alert("County added!");
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="mt-5 flex gap-2">
        <input
          className="border p-2"
          placeholder="County name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={addCounty}
          className="bg-[#D4AF37] text-white px-4 py-2"
        >
          {loading ? "Saving..." : "Add County"}
        </button>
      </div>
    </div>
  );
}