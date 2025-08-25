// src/components/Layout/Footer.test.tsx
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("renderiza o texto correto com o ano atual", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const footerText = `MedicalAppointmentSystem © ${currentYear}`;

    const footer = screen.getByText(footerText);
    expect(footer).toBeInTheDocument();
  });

  it("tem a classe CSS correta", () => {
    render(<Footer />);
    const footer = screen.getByText(/MedicalAppointmentSystem/i);
    expect(footer).toHaveClass("footer");
  });
});
