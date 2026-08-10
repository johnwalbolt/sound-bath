"use client";

import { useState } from "react";
import { VersionContext } from "@/components/VersionContext";
import VariantOne from "@/components/variants/VariantOne";
import VariantTwo from "@/components/variants/VariantTwo";
import VariantThree from "@/components/variants/VariantThree";

// The three homepage variations to compare. Clicking the "SOUND BATH"
// wordmark in the nav cycles 1 → 2 → 3 → 1. The editorial variant loads first.
const VARIANTS = [VariantThree, VariantTwo, VariantOne];

export default function Home() {
  const [version, setVersion] = useState(0);
  const cycle = () => setVersion((v) => (v + 1) % VARIANTS.length);

  const ActiveVariant = VARIANTS[version];

  return (
    <VersionContext.Provider value={{ version, count: VARIANTS.length, cycle }}>
      <ActiveVariant />
    </VersionContext.Provider>
  );
}
