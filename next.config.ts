import type { NextConfig } from "next";

// Under a project Pages URL (username.github.io/<repo>/) the site lives on a
// subpath, so assets need a basePath. The Actions workflow sets PAGES_BASE_PATH
// to "/<repo>". For a custom domain (served at root), leave it unset → no prefix.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (no server / serverless functions).
  output: "export",
  // GitHub Pages can't run Next's image optimizer, so serve images as-is.
  images: { unoptimized: true },
  // Emit clean folder URLs (/catalog/index.html) so Pages serves them directly.
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
