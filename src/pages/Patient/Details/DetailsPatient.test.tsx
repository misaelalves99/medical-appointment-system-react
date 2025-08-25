// src/pages/Patient/Details/DetailsPatient.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailsPatient from './DetailsPatient';
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

describe('DetailsPatient', () => {
  const navigateMock = jest.fn();
  const patientList: Patient[] = [
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
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    const mockContext: PatientContextType = {
      patients: patientList,
      addPatient: jest.fn(),
      updatePatient: jest.fn(),
      deletePatient: jest.fn(),
      updatePatientProfilePicture: jest.fn(),
    };
    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue(mockContext);
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('deve mostrar mensagem paciente não encontrado se id não existir', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });

    render(
      <MemoryRouter>
        <DetailsPatient />
      </MemoryRouter>
    );

    expect(screen.getByText(/paciente não encontrado/i)).toBeInTheDocument();

    const backBtn = screen.getByRole('button', { name: /voltar para a lista/i });
    fireEvent.click(backBtn);
    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });

  it('deve renderizar detalhes do paciente corretamente', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DetailsPatient />
      </MemoryRouter>
    );

    expect(screen.getByText(/detalhes do paciente/i)).toBeInTheDocument();
    expect(screen.getByText(/joão/i)).toBeInTheDocument();
    expect(screen.getByText(/masculino/i)).toBeInTheDocument();
    expect(screen.getByText(/123456789/i)).toBeInTheDocument();
    expect(screen.getByText(/joao@email\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/rua a/i)).toBeInTheDocument();

    const profileImg = screen.getByAltText(/foto do paciente/i) as HTMLImageElement;
    expect(profileImg).toBeInTheDocument();
    expect(profileImg.src).toContain('/foto.jpg');
  });

  it('deve navegar ao clicar em editar', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DetailsPatient />
      </MemoryRouter>
    );

    const editBtn = screen.getByRole('button', { name: /editar/i });
    fireEvent.click(editBtn);
    expect(navigateMock).toHaveBeenCalledWith('/patient/edit/1');
  });

  it('deve navegar ao clicar em voltar para a lista', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DetailsPatient />
      </MemoryRouter>
    );

    const backBtn = screen.getByRole('button', { name: /voltar para a lista/i });
    fireEvent.click(backBtn);
    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });
});
