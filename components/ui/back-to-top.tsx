"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import styles from "./back-to-top.module.css";

type BackToTopProps = {
  showAfter?: number;
};

export function BackToTop({ showAfter = 420 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > showAfter);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAfter]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`${styles.button} ${isVisible ? styles.visible : styles.hidden}`}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <span className={styles.inner}>
        <ArrowUp className={styles.icon} strokeWidth={2.4} />
      </span>
    </button>
  );
}