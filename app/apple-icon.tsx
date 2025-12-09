import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: "linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "22%",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized A for ACE */}
          <path
            d="M50 10L85 90H65L57 70H43L35 90H15L50 10Z"
            fill="#C9A050"
          />
          <path d="M50 35L60 60H40L50 35Z" fill="#0A0A0A" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
