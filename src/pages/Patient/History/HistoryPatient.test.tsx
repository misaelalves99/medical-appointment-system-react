// src/pages/Patient/History/HistoryPatient.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HistoryPatient from './HistoryPatient';
import { usePatient } from '../../../hooks/usePatient';
import { useNavigate, useParams } from 'react-router-dom';
import type { Patient } from '../../../types/Patient';
import type { PatientContextType } from '../../../contexts/PatientContext';

// Mock do hook usePatient
jest.mock('../../../hooks/usePatient');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe('HistoryPatient', () => {
  const navigateMock = jest.fn();

  const patientWithHistory: Patient[] = [
    {
      id: 1,
      name: 'João',
      cpf: '12345678900',
      dateOfBirth: '1990-01-01',
      gender: 'Masculino',
      phone: '123456789',
      email: 'joao@email.com',
      address: 'Rua A',
      profilePicturePath: '/foto.jpg',
      history: [
        { recordDate: '2023-08-01', description: 'Consulta rotina', notes: 'Tudo bem' },
        { recordDate: '2023-08-10', description: 'Exame sangue', notes: '' },
      ],
    },
  ];

  const patientWithoutHistory: Patient[] = [
    {
      id: 2,
      name: 'Maria',
      cpf: '98765432100',
      dateOfBirth: '1995-05-05',
      gender: 'Feminino',
      phone: '987654321',
      email: 'maria@email.com',
      address: 'Rua B',
      profilePicturePath: '',
      history: [],
    },
  ];

  const addPatientMock = jest.fn();
  const updatePatientMock = jest.fn();
  const deletePatientMock = jest.fn();
  const updateProfilePicMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const mockContext: PatientContextType = {
      patients: [],
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updateProfilePicMock,
    };

    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue(mockContext);
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('deve mostrar paciente não encontrado se id não existir', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });

    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue({
      patients: [],
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updateProfilePicMock,
    });

    render(
      <MemoryRouter>
        <HistoryPatient />
      </MemoryRouter>
    );

    expect(screen.getByText(/paciente não encontrado/i)).toBeInTheDocument();

    const backBtn = screen.getByRole('button', { name: /voltar/i });
    fireEvent.click(backBtn);
    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });

  it('deve renderizar histórico do paciente corretamente', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue({
      patients: patientWithHistory,
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updateProfilePicMock,
    });

    render(
      <MemoryRouter>
        <HistoryPatient />
      </MemoryRouter>
    );

    expect(screen.getByText(/histórico de joão/i)).toBeInTheDocument();
    expect(screen.getByText(/consulta rotina/i)).toBeInTheDocument();
    expect(screen.getByText(/exame sangue/i)).toBeInTheDocument();
    expect(screen.getAllByText('-')).toHaveLength(1); // nota vazia
  });

  it('deve mostrar mensagem quando paciente não tem histórico', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '2' });

    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue({
      patients: patientWithoutHistory,
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updateProfilePicMock,
    });

    render(
      <MemoryRouter>
        <HistoryPatient />
      </MemoryRouter>
    );

    expect(screen.getByText(/nenhum histórico registrado/i)).toBeInTheDocument();
  });

  it('deve navegar ao clicar em voltar', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue({
      patients: patientWithHistory,
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updateProfilePicMock,
    });

    render(
      <MemoryRouter>
        <HistoryPatient />
      </MemoryRouter>
    );

    const backBtn = screen.getByRole('button', { name: /voltar para a lista/i });
    fireEvent.click(backBtn);
    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });
});
