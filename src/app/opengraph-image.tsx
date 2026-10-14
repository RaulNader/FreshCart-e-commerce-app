import { SITE_NAME } from "@/lib/site";
import { ImageResponse } from "next/og";

// Default preview image when a page link is shared (WhatsApp, Facebook, X...).
// Product pages override it with the product photo.
export const alt = `${SITE_NAME} online store`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 800 }}>{SITE_NAME}</div>
        <div style={{ fontSize: 44, marginTop: 24, opacity: 0.9 }}>
          Groceries, electronics &amp; fashion delivered to your door
        </div>
      </div>
    ),
    size,
  );
}
