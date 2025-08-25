// src/pages/HomePage/HomePage.test.tsx

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Para suportar links <a>
import HomePage from './HomePage';

describe('HomePage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  it('deve renderizar o título principal', () => {
    const title = screen.getByRole('heading', {
      name: /bem-vindo ao sistema de agendamento médico/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('deve renderizar o parágrafo de instruções', () => {
    const paragraph = screen.getByText(/escolha uma das opções abaixo/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('deve renderizar todos os botões de navegação com links corretos', () => {
    const patientBtn = screen.getByRole('link', { name: /gerenciar pacientes/i });
    const doctorBtn = screen.getByRole('link', { name: /gerenciar médicos/i });
    const specialtyBtn = screen.getByRole('link', { name: /gerenciar especialidades/i });
    const appointmentBtn = screen.getByRole('link', { name: /gerenciar consultas/i });

    expect(patientBtn).toHaveAttribute('href', '/patient');
    expect(doctorBtn).toHaveAttribute('href', '/doctor');
    expect(specialtyBtn).toHaveAttribute('href', '/specialty');
    expect(appointmentBtn).toHaveAttribute('href', '/appointment');
  });
});
