// src/pages/Patient/Edit/EditPatient.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditPatient from './EditPatient';
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

describe('EditPatient', () => {
  const navigateMock = jest.fn();
  const updatePatientMock = jest.fn();
  const addPatientMock = jest.fn();
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
      profilePicturePath: '/foto.jpg',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    const mockContext: PatientContextType = {
      patients: patientList,
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updateProfilePicMock,
    };

    (usePatient as jest.MockedFunction<typeof usePatient>).mockReturnValue(mockContext);
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('deve mostrar mensagem paciente não encontrado se paciente não existir', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' }); // id inexistente

    render(
      <MemoryRouter>
        <EditPatient />
      </MemoryRouter>
    );

    expect(screen.getByText(/paciente não encontrado/i)).toBeInTheDocument();

    const backBtn = screen.getByRole('button', { name: /voltar/i });
    fireEvent.click(backBtn);
    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });

  it('deve renderizar formulário com dados do paciente existente', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <EditPatient />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/nome/i)).toHaveValue('João');
    expect(screen.getByLabelText(/cpf/i)).toHaveValue('12345678900');
    expect(screen.getByLabelText(/data de nascimento/i)).toHaveValue('1990-01-01');
    expect(screen.getByLabelText(/sexo/i)).toHaveValue('Masculino');
    expect(screen.getByLabelText(/telefone/i)).toHaveValue('123456789');
    expect(screen.getByLabelText(/email/i)).toHaveValue('joao@email.com');
    expect(screen.getByLabelText(/endereço/i)).toHaveValue('Rua A');
  });

  it('deve atualizar estado ao digitar nos campos', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <EditPatient />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/nome/i);
    fireEvent.change(nameInput, { target: { value: 'Maria' } });
    expect(nameInput).toHaveValue('Maria');
  });

  it('deve chamar updatePatient e navegar ao submeter o formulário', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <EditPatient />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Maria' } });
    const submitBtn = screen.getByRole('button', { name: /salvar alterações/i });
    fireEvent.click(submitBtn);

    expect(updatePatientMock).toHaveBeenCalledWith(expect.objectContaining({ name: 'Maria', id: 1 }));
    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });

  it('deve navegar ao clicar em voltar', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <EditPatient />
      </MemoryRouter>
    );

    const backBtn = screen.getAllByRole('button', { name: /voltar/i })[0];
    fireEvent.click(backBtn);
    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });
});
