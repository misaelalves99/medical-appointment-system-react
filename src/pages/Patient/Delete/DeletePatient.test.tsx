// src/pages/Patient/Delete/DeletePatient.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DeletePatient from './DeletePatient';
import { usePatient } from '../../../hooks/usePatient';
import { useNavigate, useParams } from 'react-router-dom';
import type { Patient } from '../../../types/Patient';
import type { PatientContextType } from '../../../contexts/PatientContext';

// Mocks
jest.mock('../../../hooks/usePatient');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe('DeletePatient', () => {
  const deletePatientMock = jest.fn();
  const addPatientMock = jest.fn();
  const updatePatientMock = jest.fn();
  const updatePatientProfilePictureMock = jest.fn();
  const navigateMock = jest.fn();

  const patientList: Patient[] = [
    {
      id: 1,
      name: 'João',
      cpf: '12345678900',
      dateOfBirth: '1990-01-01',
      gender: 'Masculino',
      email: 'joao@email.com',
      phone: '11999999999',
      address: 'Rua A, 123',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock completo do contexto
    const mockContext: PatientContextType = {
      patients: patientList,
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updatePatientProfilePictureMock,
    };
    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue(mockContext);
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('deve mostrar mensagem de paciente não encontrado se id não existir', () => {
    (useParams as jest.Mock).mockReturnValue({ id: undefined });

    render(
      <MemoryRouter>
        <DeletePatient />
      </MemoryRouter>
    );

    expect(screen.getByText(/paciente não encontrado/i)).toBeInTheDocument();
  });

  it('deve mostrar mensagem de paciente não encontrado se paciente não existir', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });

    render(
      <MemoryRouter>
        <DeletePatient />
      </MemoryRouter>
    );

    expect(screen.getByText(/paciente não encontrado/i)).toBeInTheDocument();
  });

  it('deve renderizar corretamente paciente existente', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DeletePatient />
      </MemoryRouter>
    );

    expect(screen.getByText(/confirmar exclusão/i)).toBeInTheDocument();
    expect(screen.getByText(/joão/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('deve chamar deletePatient e navegar ao clicar em excluir', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DeletePatient />
      </MemoryRouter>
    );

    const deleteBtn = screen.getByRole('button', { name: /excluir/i });
    fireEvent.click(deleteBtn);

    expect(deletePatientMock).toHaveBeenCalledWith(1);
    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });

  it('deve navegar ao clicar em cancelar', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DeletePatient />
      </MemoryRouter>
    );

    const cancelBtn = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelBtn);

    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });
});
