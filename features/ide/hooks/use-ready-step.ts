"use client";

import { useEffect, useState } from "react";

export function useReadyStep(totalSteps: number) {
  const [readyStep, setReadyStep] = useState(0);

  useEffect(() => {
    if (readyStep >= totalSteps) return;
    const timer = window.setTimeout(() => setReadyStep((step) => step + 1), 360);
    return () => window.clearTimeout(timer);
  }, [readyStep, totalSteps]);

  return readyStep;
}
