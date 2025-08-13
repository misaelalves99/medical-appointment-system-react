// src/components/Navbar.tsx

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Navegação principal">
      <Link to="/" className={styles.navbarLogo} aria-label="Página inicial">
        Medical
      </Link>

      <button
        className={styles.navbarToggle}
        id="navbarToggle"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        aria-controls="navbarLinks"
        onClick={toggleMenu}
      >
        ☰
      </button>

      <div
        className={`${styles.navbarLinks} ${menuOpen ? styles.active : ""}`}
        id="navbarLinks"
      >
        {/* use `end` on home so only exact path matches */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/patient"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Pacientes
        </NavLink>

        {/* CORREÇÃO: rota para médicos deve ser /doctors (plural) */}
        <NavLink
          to="/doctors"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Médicos
        </NavLink>

        <NavLink
          to="/specialty"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Especialidades
        </NavLink>

        {/* CORREÇÃO: rota para consultas deve ser /appointments (plural) */}
        <NavLink
          to="/appointments"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Consultas
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
