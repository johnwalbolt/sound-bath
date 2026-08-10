"use client";

import { createContext, useContext } from "react";

/**
 * Lets the shared Nav (rendered inside every variant) cycle the active
 * homepage variant when the "SOUND BATH" wordmark is clicked, without prop
 * drilling through each variant.
 */
export type VersionState = {
  version: number; // 0-based index of the active variant
  count: number; // total number of variants
  cycle: () => void; // advance to the next variant (wraps around)
};

export const VersionContext = createContext<VersionState>({
  version: 0,
  count: 1,
  cycle: () => {},
});

export const useVersion = () => useContext(VersionContext);
