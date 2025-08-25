// src/components/Navbar.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar component", () => {
  it("renderiza o logo e links de navegação", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Verifica logo
    expect(screen.getByLabelText(/Página inicial/i)).toBeInTheDocument();

    // Verifica links principais
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Pacientes/i)).toBeInTheDocument();
    expect(screen.getByText(/Médicos/i)).toBeInTheDocument();
    expect(screen.getByText(/Especialidades/i)).toBeInTheDocument();
    expect(screen.getByText(/Consultas/i)).toBeInTheDocument();
  });

  it("toggle menu altera estado de aria-expanded e classe CSS", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole("button", { name: /Abrir menu/i });
    const linksDiv = screen.getByRole("navigation").querySelector("#navbarLinks");

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(linksDiv).not.toHaveClass("active");

    // Clicar para abrir menu
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(linksDiv).toHaveClass("active");

    // Clicar novamente para fechar menu
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(linksDiv).not.toHaveClass("active");
  });

  it("fecha o menu quando um link é clicado", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole("button", { name: /Abrir menu/i });
    fireEvent.click(toggleButton);

    const homeLink = screen.getByText(/Home/i);
    fireEvent.click(homeLink);

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });
});
