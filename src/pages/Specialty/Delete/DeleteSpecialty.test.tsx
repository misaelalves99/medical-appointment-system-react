// src/pages/Specialty/Delete/DeleteSpecialty.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
}));

const mockedUseSpecialty = useSpecialty as jest.MockedFunction<typeof useSpecialty>;

describe('DeleteSpecialty', () => {
  const navigateMock = jest.fn();
  const addSpecialtyMock = jest.fn();
  const updateSpecialtyMock = jest.fn();
  const removeSpecialtyMock = jest.fn();

  const specialties: Specialty[] = [{ id: 1, name: 'Cardiologia' }];

  beforeEach(() => {
    jest.clearAllMocks();

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    mockedUseSpecialty.mockReturnValue({
      specialties,
      addSpecialty: addSpecialtyMock,
      updateSpecialty: updateSpecialtyMock,
      removeSpecialty: removeSpecialtyMock,
    } as SpecialtyContextType);
  });

  it('deve mostrar "Carregando..." se especialidade não existir', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });

    mockedUseSpecialty.mockReturnValue({
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

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('deve renderizar especialidade corretamente', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DeleteSpecialty />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/confirmar exclusão/i)).toBeInTheDocument();
      expect(screen.getByText(/cardiologia/i)).toBeInTheDocument();
    });
  });

  it('deve chamar removeSpecialty e navegar ao clicar em Excluir', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DeleteSpecialty />
      </MemoryRouter>
    );

    const deleteBtn = await screen.findByRole('button', { name: /excluir/i });
    fireEvent.click(deleteBtn);

    expect(removeSpecialtyMock).toHaveBeenCalledWith(1);
    expect(navigateMock).toHaveBeenCalledWith('/specialty');
  });

  it('deve navegar ao clicar em Cancelar', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DeleteSpecialty />
      </MemoryRouter>
    );

    const cancelBtn = await screen.findByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelBtn);

    expect(navigateMock).toHaveBeenCalledWith('/specialty');
  });
});
