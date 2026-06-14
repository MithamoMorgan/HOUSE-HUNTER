"use client";

import { Suspense } from "react";
import ListingsContent from "./ListingsContent";

export default function Page() {
  return (
    <Suspense fallback={<p className="p-10">Loading...</p>}>
      <ListingsContent />
    </Suspense>
  );
}