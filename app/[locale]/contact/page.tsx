"use client";

import { useState } from "react";
import {
  ContactHero,
  ContactBento,
  EmailFormCard,
  WhatsAppCard,
  QuickInfoCard,
  UselessMessage,
  FormSuccess,
} from "@/components/sections/contact";

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormSuccess = () => {
    setShowSuccess(true);
  };

  const handleReset = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <UselessMessage />
      <ContactHero />
      <ContactBento>
        {/* Email Form - Large card spanning 2 columns */}
        <EmailFormCard onSuccess={handleFormSuccess} />

        {/* WhatsApp Card - with magnetic button */}
        <WhatsAppCard />

        {/* Quick Info Card - location, email, hours */}
        <QuickInfoCard />
      </ContactBento>

      {/* Success overlay with particles */}
      <FormSuccess isVisible={showSuccess} onReset={handleReset} />
    </>
  );
}
