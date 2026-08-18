import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0B1220",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(15,111,255,0.35), transparent 70%)",
            top: -150,
            right: -100,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(16,185,129,0.25), transparent 70%)",
            bottom: -200,
            left: -150,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 80,
            height: "100%",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 24,
                background: "linear-gradient(135deg, #0F6FFF, #10B981)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 44,
                  height: 13,
                  background: "white",
                  borderRadius: 7,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 13,
                    height: 44,
                    background: "white",
                    borderRadius: 7,
                    left: 15.5,
                    top: -15.5,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 700,
                color: "white",
              }}
            >
              {site.name.slice(0, -3)}
              <div style={{ display: "flex", color: "#4DA3FF" }}>
                {site.name.slice(-3)}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              color: "white",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {`${site.tagline}.`}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              color: "rgba(255,255,255,0.65)",
              fontSize: 30,
            }}
          >
            {`Advanced multispeciality hospital · ${site.address.city}`}
          </div>
          <div style={{ display: "flex", marginTop: 48, gap: 16 }}>
            {["40+ Specialities", "250+ Expert Doctors", "24×7 Emergency"].map(
              (chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "12px 24px",
                    color: "white",
                    fontSize: 24,
                  }}
                >
                  {chip}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
