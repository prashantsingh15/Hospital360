import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0F6FFF, #10B981)",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 90,
            height: 26,
            background: "white",
            borderRadius: 13,
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 26,
              height: 90,
              background: "white",
              borderRadius: 13,
              left: 32,
              top: -32,
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
