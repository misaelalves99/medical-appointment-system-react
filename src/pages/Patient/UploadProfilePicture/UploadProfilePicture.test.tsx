// src/pages/Patient/UploadProfilePicture/UploadProfilePicture.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UploadProfilePicture from './UploadProfilePicture';
import { usePatient } from '../../../hooks/usePatient';
import { useNavigate, useParams } from 'react-router-dom';
import type { Patient, PatientContextType } from '../../../types/Patient';

jest.mock('../../../hooks/usePatient');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

global.URL.createObjectURL = jest.fn(() => 'mocked-url') as unknown as typeof URL.createObjectURL;

describe('UploadProfilePicture', () => {
  const navigateMock = jest.fn();
  const addPatientMock = jest.fn();
  const updatePatientMock = jest.fn();
  const deletePatientMock = jest.fn();
  const updateProfilePicMock = jest.fn();

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
      profilePicturePath: '',
      history: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue({
      patients: patientList,
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updateProfilePicMock,
    } as PatientContextType);
  });

  it('deve mostrar paciente não encontrado se id não existir', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });

    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue({
      patients: [],
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updateProfilePicMock,
    } as PatientContextType);

    render(
      <MemoryRouter>
        <UploadProfilePicture />
      </MemoryRouter>
    );

    expect(screen.getByText(/paciente não encontrado/i)).toBeInTheDocument();

    const backBtn = screen.getByRole('button', { name: /voltar/i });
    fireEvent.click(backBtn);
    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });

  it('deve renderizar paciente existente corretamente', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <UploadProfilePicture />
      </MemoryRouter>
    );

    expect(screen.getByText(/nome: joão/i)).toBeInTheDocument();
    const fileInput = screen.getByLabelText(/selecionar foto/i) as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /enviar foto/i });
    expect(submitBtn).toBeDisabled();
  });

  it('deve permitir selecionar arquivo e habilitar botão', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <UploadProfilePicture />
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText(/selecionar foto/i) as HTMLInputElement;
    const file = new File(['dummy'], 'photo.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(fileInput.files![0]).toBe(file);

    const submitBtn = screen.getByRole('button', { name: /enviar foto/i });
    expect(submitBtn).not.toBeDisabled();
  });

  it('deve chamar updatePatientProfilePicture e navegar ao submeter', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <UploadProfilePicture />
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText(/selecionar foto/i) as HTMLInputElement;
    const file = new File(['dummy'], 'photo.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitBtn = screen.getByRole('button', { name: /enviar foto/i });
    fireEvent.click(submitBtn);

    expect(updateProfilePicMock).toHaveBeenCalledWith(1, 'mocked-url');
    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });

  it('deve navegar ao clicar em voltar', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <UploadProfilePicture />
      </MemoryRouter>
    );

    const backBtn = screen.getByRole('button', { name: /voltar/i });
    fireEvent.click(backBtn);
    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });
});
