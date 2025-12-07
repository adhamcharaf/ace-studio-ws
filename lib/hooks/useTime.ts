"use client";

import { useState, useEffect } from "react";
import type { UseTimeReturn } from "@/types";

function getTimeData(): UseTimeReturn {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const formatted = `${hours}h${minutes.toString().padStart(2, "0")}`;

  let greeting: string;
  if (hours >= 6 && hours < 12) {
    greeting = "Bonne matinée !";
  } else if (hours >= 12 && hours < 14) {
    greeting = "Bon appétit !";
  } else if (hours >= 14 && hours < 18) {
    greeting = "Bonne après-midi !";
  } else if (hours >= 18 && hours < 22) {
    greeting = "Bonne soirée !";
  } else {
    greeting = "Tu travailles tard toi aussi ?";
  }

  return { hours, minutes, formatted, greeting };
}

export function useTime(): UseTimeReturn {
  const [time, setTime] = useState<UseTimeReturn>(() => getTimeData());

  useEffect(() => {
    // Update immediately on mount
    setTime(getTimeData());

    // Update every minute
    const interval = setInterval(() => {
      setTime(getTimeData());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
