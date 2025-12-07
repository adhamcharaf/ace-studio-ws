"use client";

import { SectionWrapper } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";

export default function LocationInfo() {
  return (
    <SectionWrapper className="bg-[var(--ace-white)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center gap-6">
          {/* Location */}
          <div className="flex items-center gap-3 text-[var(--ace-gray)]">
            <svg
              className="w-6 h-6 text-[var(--ace-gold)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-lg">{SITE_CONFIG.location}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 text-[var(--ace-gray)]">
            <svg
              className="w-6 h-6 text-[var(--ace-gold)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-lg hover:text-[var(--ace-gold)] transition-colors link-underline"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
