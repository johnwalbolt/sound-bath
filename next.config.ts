import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (no server / serverless functions).
  output: "export",
  // GitHub Pages can't run Next's image optimizer, so serve images as-is.
  images: { unoptimized: true },
  // Emit clean folder URLs (/catalog/index.html) so Pages serves them directly.
  trailingSlash: true,
  // NOTE: for a custom domain the site is served at the root, so no basePath.
  // If previewing at username.github.io/<repo>/ before the domain is connected,
  // set basePath + assetPrefix to "/<repo>".
};

export default nextConfig;
