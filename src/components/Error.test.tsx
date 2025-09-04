// src/components/Error.test.tsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Error from "./Error";

describe("Error component", () => {
  it("renderiza título, mensagem e link corretamente", () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    // Verifica se o título aparece
    expect(screen.getByRole("heading", { name: /ocorreu um erro/i })).toBeInTheDocument();

    // Verifica se a mensagem aparece
    expect(screen.getByText(/desculpe, ocorreu um erro ao processar sua solicitação/i)).toBeInTheDocument();

    // Verifica se o link para a home existe e aponta para "/"
    const homeLink = screen.getByRole("link", { name: /voltar para a home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
