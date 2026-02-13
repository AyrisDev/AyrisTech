"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function OpenPanelTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).op) {
      (window as any).op("screen", pathname);
    }
  }, [pathname]);

  return null;
}
