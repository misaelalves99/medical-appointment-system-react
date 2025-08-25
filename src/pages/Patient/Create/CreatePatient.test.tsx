// src/pages/Patient/Create/CreatePatient.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreatePatient from './CreatePatient';
import { usePatient } from '../../../hooks/usePatient';
import { useNavigate } from 'react-router-dom';
import type { PatientContextType } from '../../../contexts/PatientContext';

// Mock do hook usePatient
jest.mock('../../../hooks/usePatient');
const mockedUsePatient = usePatient as jest.MockedFunction<typeof usePatient>;

// Mock do useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CreatePatient', () => {
  const addPatientMock = jest.fn();
  const updatePatientMock = jest.fn();
  const deletePatientMock = jest.fn();
  const updatePatientProfilePictureMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const mockContext: PatientContextType = {
      patients: [],
      addPatient: addPatientMock,
      updatePatient: updatePatientMock,
      deletePatient: deletePatientMock,
      updatePatientProfilePicture: updatePatientProfilePictureMock,
    };

    mockedUsePatient.mockReturnValue(mockContext);
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <CreatePatient />
      </MemoryRouter>
    );
  });

  it('deve renderizar o formulário com todos os campos', () => {
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sexo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/endereço/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
  });

  it('deve atualizar o estado ao digitar nos campos', () => {
    const nameInput = screen.getByLabelText(/nome/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'João' } });
    expect(nameInput.value).toBe('João');

    const cpfInput = screen.getByLabelText(/cpf/i) as HTMLInputElement;
    fireEvent.change(cpfInput, { target: { value: '12345678900' } });
    expect(cpfInput.value).toBe('12345678900');
  });

  it('deve chamar addPatient e navegar ao submeter o formulário', () => {
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'João' } });
    fireEvent.change(screen.getByLabelText(/cpf/i), { target: { value: '12345678900' } });
    fireEvent.change(screen.getByLabelText(/data de nascimento/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/sexo/i), { target: { value: 'Masculino' } });
    fireEvent.change(screen.getByLabelText(/endereço/i), { target: { value: 'Rua A' } });

    const submitBtn = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(submitBtn);

    expect(addPatientMock).toHaveBeenCalledTimes(1);
    expect(addPatientMock.mock.calls[0][0]).toMatchObject({
      name: 'João',
      cpf: '12345678900',
      dateOfBirth: '1990-01-01',
      gender: 'Masculino',
      address: 'Rua A',
    });

    expect(navigateMock).toHaveBeenCalledWith('/patient');
  });
});
