"use client";

import ProtectedPage from "@/src/lib/protected.page";
import Home from "@/src/components/home/Home";
import collections from "./collections.json";

function Page() {
  return <Home collections={collections} />;
}

export default ProtectedPage(Page);
