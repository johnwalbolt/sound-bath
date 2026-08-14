import type { Metadata } from "next";
import CategoryPage from "@/components/pages/CategoryPage";
import { CATEGORIES } from "@/components/site";

export const metadata: Metadata = {
  title: `${CATEGORIES.meditation.name} — Sound Bath`,
  description: CATEGORIES.meditation.blurb,
};

export default function Page() {
  return <CategoryPage slug="meditation" />;
}
