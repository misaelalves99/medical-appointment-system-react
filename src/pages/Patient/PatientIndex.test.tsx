// src/pages/Patient/PatientIndex.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientIndex from './index';
import { usePatient } from '../../hooks/usePatient';
import { useNavigate } from 'react-router-dom';
import type { Patient, PatientContextType } from '../../types/Patient';

jest.mock('../../hooks/usePatient');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

describe('PatientIndex', () => {
  const navigateMock = jest.fn();
  const addPatientMock = jest.fn();
  const updatePatientMock = jest.fn();
  const deletePatientMock = jest.fn();
  const updateProfilePicMock = jest.fn();

  const patients: Patient[] = [
    {
      id: 1,
      name: 'João',
      cpf: '123',
      dateOfBirth: '1990-01-01',
      email: 'joao@email.com',
      phone: '111',
      address: 'Rua A',
      gender: 'Masculino',
      profilePicturePath: '',
      history: [],
    },
    {
      id: 2,
      name: 'Maria',
      cpf: '456',
      dateOfBirth: '1992-02-02',
      email: '',
      phone: '',
      address: 'Rua B',
      gender: 'Feminino',
      profilePicturePath: '',
      history: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue({
      patients,
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updateProfilePicMock,
    } as PatientContextType);
  });

  it('deve renderizar lista de pacientes', () => {
    render(
      <MemoryRouter>
        <PatientIndex />
      </MemoryRouter>
    );

    expect(screen.getByText(/pacientes/i)).toBeInTheDocument();
    expect(screen.getByText(/joão/i)).toBeInTheDocument();
    expect(screen.getByText(/maria/i)).toBeInTheDocument();
    expect(screen.getByText(/123/i)).toBeInTheDocument();
    expect(screen.getByText(/456/i)).toBeInTheDocument();
    expect(screen.getAllByText('-')).toHaveLength(2); // email e telefone vazio
  });

  it('deve mostrar mensagem "Nenhum paciente encontrado" se lista estiver vazia', () => {
    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue({
      patients: [],
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updateProfilePicMock,
    } as PatientContextType);

    render(
      <MemoryRouter>
        <PatientIndex />
      </MemoryRouter>
    );

    expect(screen.getByText(/nenhum paciente encontrado/i)).toBeInTheDocument();
  });

  it('deve filtrar pacientes pelo search', () => {
    render(
      <MemoryRouter>
        <PatientIndex />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/pesquisar por nome/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'João' } });

    expect(screen.getByText(/joão/i)).toBeInTheDocument();
    expect(screen.queryByText(/maria/i)).toBeNull();
  });

  it('deve navegar corretamente ao clicar nos botões de ação', () => {
    render(
      <MemoryRouter>
        <PatientIndex />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByText(/detalhes/i)[0]);
    expect(navigateMock).toHaveBeenCalledWith('/patient/details/1');

    fireEvent.click(screen.getAllByText(/editar/i)[0]);
    expect(navigateMock).toHaveBeenCalledWith('/patient/edit/1');

    fireEvent.click(screen.getAllByText(/excluir/i)[0]);
    expect(navigateMock).toHaveBeenCalledWith('/patient/delete/1');
  });

  it('deve renderizar link para cadastrar novo paciente', () => {
    render(
      <MemoryRouter>
        <PatientIndex />
      </MemoryRouter>
    );

    const createLink = screen.getByText(/cadastrar novo paciente/i);
    expect(createLink).toHaveAttribute('href', '/patient/create');
  });
});
