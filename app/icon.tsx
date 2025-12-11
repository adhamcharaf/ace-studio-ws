import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20%",
        }}
      >
        <svg
          width="24"
          height="24"
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
