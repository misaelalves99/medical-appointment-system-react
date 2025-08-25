// src/pages/Specialty/Edit/EditSpecialty.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditSpecialty from './EditSpecialty';
import { useSpecialty } from '../../../hooks/useSpecialty';
import { useParams, useNavigate } from 'react-router-dom';
import type { Specialty, SpecialtyContextType } from '../../../types/Specialty';

jest.mock('../../../hooks/useSpecialty');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

describe('EditSpecialty', () => {
  const navigateMock = jest.fn();
  const addSpecialtyMock = jest.fn();
  const updateSpecialtyMock = jest.fn();
  const removeSpecialtyMock = jest.fn();

  const specialties: Specialty[] = [{ id: 1, name: 'Cardiologia' }];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock completo do hook useSpecialty
    (useSpecialty as jest.MockedFunction<typeof useSpecialty>).mockReturnValue({
      specialties,
      addSpecialty: addSpecialtyMock,
      updateSpecialty: updateSpecialtyMock,
      removeSpecialty: removeSpecialtyMock,
    } as SpecialtyContextType);

    // Mock do useNavigate sem require()
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('deve mostrar mensagem se especialidade não for encontrada', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });

    render(
      <MemoryRouter>
        <EditSpecialty />
      </MemoryRouter>
    );

    expect(screen.getByText(/especialidade não encontrada/i)).toBeInTheDocument();
  });

  it('deve renderizar especialidade corretamente', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <EditSpecialty />
      </MemoryRouter>
    );

    expect(screen.getByText(/editar especialidade/i)).toBeInTheDocument();
    const input = screen.getByLabelText(/nome da especialidade/i) as HTMLInputElement;
    expect(input.value).toBe('Cardiologia');
  });

  it('deve atualizar o input ao digitar', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <EditSpecialty />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/nome da especialidade/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Neurologia' } });
    expect(input.value).toBe('Neurologia');
  });

  it('deve mostrar erro se tentar submeter com input vazio', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <EditSpecialty />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/nome da especialidade/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: ' ' } });

    const submitBtn = screen.getByRole('button', { name: /salvar alterações/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/o nome da especialidade é obrigatório/i)).toBeInTheDocument();
    expect(updateSpecialtyMock).not.toHaveBeenCalled();
  });

  it('deve chamar updateSpecialty e navegar ao submeter corretamente', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <EditSpecialty />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/nome da especialidade/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Neurologia' } });

    const submitBtn = screen.getByRole('button', { name: /salvar alterações/i });
    fireEvent.click(submitBtn);

    expect(updateSpecialtyMock).toHaveBeenCalledWith(1, 'Neurologia');
    expect(navigateMock).toHaveBeenCalledWith('/specialty');
  });

  it('deve ter link de voltar com href correto', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <EditSpecialty />
      </MemoryRouter>
    );

    const backLink = screen.getByText(/voltar/i) as HTMLAnchorElement;
    expect(backLink).toHaveAttribute('href', '/specialty');
  });
});
