// src/pages/Specialty/Delete/DeleteSpecialty.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DeleteSpecialty from './DeleteSpecialty';
import { useSpecialty } from '../../../hooks/useSpecialty';
import { useNavigate, useParams } from 'react-router-dom';
import type { Specialty, SpecialtyContextType } from '../../../types/Specialty';

jest.mock('../../../hooks/useSpecialty');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

describe('DeleteSpecialty', () => {
  const navigateMock = jest.fn();
  const addSpecialtyMock = jest.fn();
  const updateSpecialtyMock = jest.fn();
  const removeSpecialtyMock = jest.fn();

  const specialties: Specialty[] = [{ id: 1, name: 'Cardiologia' }];

  beforeEach(() => {
    jest.clearAllMocks();

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useSpecialty as jest.MockedFunction<typeof useSpecialty>).mockReturnValue({
      specialties,
      addSpecialty: addSpecialtyMock,
      updateSpecialty: updateSpecialtyMock,
      removeSpecialty: removeSpecialtyMock,
    } as SpecialtyContextType);
  });

  it('deve mostrar mensagem se especialidade não for encontrada', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });

    (useSpecialty as jest.MockedFunction<typeof useSpecialty>).mockReturnValue({
      specialties: [],
      addSpecialty: addSpecialtyMock,
      updateSpecialty: updateSpecialtyMock,
      removeSpecialty: removeSpecialtyMock,
    } as SpecialtyContextType);

    render(
      <MemoryRouter>
        <DeleteSpecialty />
      </MemoryRouter>
    );

    expect(screen.getByText(/especialidade não encontrada/i)).toBeInTheDocument();
  });

  it('deve renderizar especialidade corretamente', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DeleteSpecialty />
      </MemoryRouter>
    );

    expect(screen.getByText(/excluir especialidade/i)).toBeInTheDocument();
    expect(screen.getByText(/cardiologia/i)).toBeInTheDocument();
    expect(screen.getByText(/id: 1/i)).toBeInTheDocument();
  });

  it('deve chamar removeSpecialty e navegar ao submeter', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DeleteSpecialty />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /excluir/i });
    fireEvent.click(submitBtn);

    expect(removeSpecialtyMock).toHaveBeenCalledWith(1);
    expect(navigateMock).toHaveBeenCalledWith('/specialty');
  });

  it('deve ter link de cancelar direcionando para /specialty', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DeleteSpecialty />
      </MemoryRouter>
    );

    const cancelLink = screen.getByText(/cancelar/i) as HTMLAnchorElement;
    expect(cancelLink).toHaveAttribute('href', '/specialty');
  });
});
