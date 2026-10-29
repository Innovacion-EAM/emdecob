"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
