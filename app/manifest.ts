import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Weihow & Yuxin Wedding",
    short_name: "W&Y Wedding",
    description: "Wedding website for Weihow and Yuxin",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#89CFF0",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
