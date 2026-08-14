import type { Metadata } from "next";
import CategoryPage from "@/components/pages/CategoryPage";
import { CATEGORIES } from "@/components/site";

export const metadata: Metadata = {
  title: `${CATEGORIES.sleep.name} — Sound Bath`,
  description: CATEGORIES.sleep.blurb,
};

export default function Page() {
  return <CategoryPage slug="sleep" />;
}
