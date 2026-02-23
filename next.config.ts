import createBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import {PHASE_DEVELOPMENT_SERVER} from "next/constants";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://127.0.0.1:4173", "http://localhost:4173"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default function config(phase: string) {
  const distDir =
    phase === PHASE_DEVELOPMENT_SERVER ? process.env.NEXT_DEV_DIST_DIR ?? ".next-dev" : ".next";

  return withBundleAnalyzer(
    withNextIntl({
      ...nextConfig,
      distDir,
    }),
  );
}
