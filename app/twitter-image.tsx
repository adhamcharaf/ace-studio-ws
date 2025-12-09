import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ACE STUDIO - Création de sites web sur mesure à Abidjan";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(201, 160, 80, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(201, 160, 80, 0.1) 0%, transparent 50%)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 10L85 90H65L57 70H43L35 90H15L50 10Z" fill="#C9A050" />
            <path d="M50 35L60 60H40L50 35Z" fill="#0A0A0A" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}
        >
          ACE STUDIO
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#C9A050",
            marginBottom: 40,
            fontStyle: "italic",
          }}
        >
          Une présence digitale à votre image
        </div>

        {/* Description */}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#9CA3AF",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Création de sites web sur mesure • Abidjan, Côte d&apos;Ivoire
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #C9A050 0%, #D4B36A 50%, #C9A050 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
