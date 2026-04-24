"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Beneficios", href: "#beneficios" },
  { label: "Resultados", href: "#depoimentos" },
  { label: "Kits", href: "#kits" },
  { label: "FAQ", href: "#faq" }
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleCloseMenu() {
    setMenuOpen(false);
  }

  function handleToggleMenu() {
    setMenuOpen((previous) => !previous);
  }

  return (
    <header className="mindup-header">
      <div className="mindup-header__container">
        <Link
          href="#inicio"
          className="mindup-header__brand"
          aria-label="Ir para o topo da pagina"
          onClick={handleCloseMenu}
        >
          <Image
            src="/assets/image/logo/logo.svg"
            alt="Logo MindUp"
            width={260}
            height={54}
            className="mindup-header__logo"
            priority
          />
        </Link>

        <nav className="mindup-header__nav" aria-label="Menu principal">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mindup-header__nav-link"
              onClick={handleCloseMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mindup-header__actions">
          <Link href="/checkout" className="mindup-header__button">
            Garantir MindUp
          </Link>

          <button
            type="button"
            className={`mindup-header__menu-toggle ${menuOpen ? "is-active" : ""}`}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mindup-mobile-menu"
            onClick={handleToggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mindup-mobile-menu"
        className={`mindup-mobile-menu ${menuOpen ? "is-open" : ""}`}
      >
        <nav className="mindup-mobile-menu__nav" aria-label="Menu mobile">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mindup-mobile-menu__link"
              onClick={handleCloseMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mindup-mobile-menu__actions">
          <Link
            href="/checkout"
            className="mindup-mobile-menu__button"
            onClick={handleCloseMenu}
          >
            Garantir MindUp
          </Link>
        </div>
      </div>
    </header>
  );
}
