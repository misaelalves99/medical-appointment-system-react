// src/pages/Specialty/Create/CreateSpecialty.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import CreateSpecialty from './CreateSpecialty';
import { useSpecialty } from '../../../hooks/useSpecialty';
import { useNavigate } from 'react-router-dom';
import type { SpecialtyContextType } from '../../../types/Specialty';

jest.mock('../../../hooks/useSpecialty');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockedUseSpecialty = useSpecialty as jest.MockedFunction<typeof useSpecialty>;

describe('CreateSpecialty', () => {
  const addSpecialtyMock = jest.fn();
  const updateSpecialtyMock = jest.fn();
  const removeSpecialtyMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseSpecialty.mockReturnValue({
      specialties: [],
      addSpecialty: addSpecialtyMock,
      updateSpecialty: updateSpecialtyMock,
      removeSpecialty: removeSpecialtyMock,
    } as SpecialtyContextType);

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<CreateSpecialty />);
    expect(screen.getByLabelText(/nome da especialidade/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument();
  });

  it('deve atualizar o estado ao digitar no input', () => {
    render(<CreateSpecialty />);
    const input = screen.getByLabelText(/nome da especialidade/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Cardiologia' } });
    expect(input.value).toBe('Cardiologia');
  });

  it('deve chamar addSpecialty e resetar input ao submeter', () => {
    render(<CreateSpecialty />);
    const input = screen.getByLabelText(/nome da especialidade/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /salvar/i });

    fireEvent.change(input, { target: { value: 'Cardiologia' } });
    fireEvent.click(button);

    expect(addSpecialtyMock).toHaveBeenCalledWith('Cardiologia');
    expect(input.value).toBe('');
    expect(navigateMock).toHaveBeenCalledWith('/specialty');
  });

  it('deve trimar valor antes de chamar addSpecialty', () => {
    render(<CreateSpecialty />);
    const input = screen.getByLabelText(/nome da especialidade/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /salvar/i });

    fireEvent.change(input, { target: { value: '  Dermatologia  ' } });
    fireEvent.click(button);

    expect(addSpecialtyMock).toHaveBeenCalledWith('Dermatologia'); // valor trimado
    expect(input.value).toBe('');
    expect(navigateMock).toHaveBeenCalledWith('/specialty');
  });

  it('não deve chamar addSpecialty se o input estiver vazio ou apenas espaços', () => {
    render(<CreateSpecialty />);
    const input = screen.getByLabelText(/nome da especialidade/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /salvar/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    expect(addSpecialtyMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('deve navegar corretamente ao clicar em Voltar', () => {
    render(<CreateSpecialty />);
    const backBtn = screen.getByRole('button', { name: /voltar/i });

    fireEvent.click(backBtn);

    expect(navigateMock).toHaveBeenCalledWith('/specialty');
  });
});
