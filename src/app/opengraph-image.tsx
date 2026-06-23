import { ImageResponse } from "next/og";

export const alt =
  "Elizabeth Waeni Mutisya — Product Manager at Microsoft";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0b0a12 0%, #15101f 55%, #0b0a12 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#a78bfa",
            marginBottom: 28,
          }}
        >
          Product Manager · Microsoft
        </div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 800, lineHeight: 1.05 }}>
          <span>E</span>
          <span
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            liz
          </span>
          <span>abeth Mutisya</span>
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 36,
            color: "#cbd5e1",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Building products that untangle complexity — platform governance,
          developer experiences, and enterprise-scale systems.
        </div>
        <div
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            color: "#8B5CF6",
            fontWeight: 700,
          }}
        >
          www.lizmutisya.com
        </div>
      </div>
    ),
    { ...size },
  );
}
