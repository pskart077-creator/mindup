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
    <header className="dopaway-header">
      <div className="dopaway-header__container">
        <Link
          href="#inicio"
          className="dopaway-header__brand"
          aria-label="Ir para o topo da pagina"
          onClick={handleCloseMenu}
        >
          <Image
            src="/assets/image/logo/logo.svg"
            alt="Logo DopaWay"
            width={260}
            height={54}
            className="dopaway-header__logo"
            priority
          />
        </Link>

        <nav className="dopaway-header__nav" aria-label="Menu principal">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="dopaway-header__nav-link"
              onClick={handleCloseMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="dopaway-header__actions">
          <Link href="/checkout" className="dopaway-header__button">
            Comprar Agora
          </Link>

          <button
            type="button"
            className={`dopaway-header__menu-toggle ${menuOpen ? "is-active" : ""}`}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="dopaway-mobile-menu"
            onClick={handleToggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="dopaway-mobile-menu"
        className={`dopaway-mobile-menu ${menuOpen ? "is-open" : ""}`}
      >
        <nav className="dopaway-mobile-menu__nav" aria-label="Menu mobile">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="dopaway-mobile-menu__link"
              onClick={handleCloseMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="dopaway-mobile-menu__actions">
          <Link
            href="/checkout"
            className="dopaway-mobile-menu__button"
            onClick={handleCloseMenu}
          >
            Comprar Agora
          </Link>
        </div>
      </div>
    </header>
  );
}
