// src/pages/Specialty/Create/CreateSpecialty.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import CreateSpecialty from './CreateSpecialty';
import { useSpecialty } from '../../../hooks/useSpecialty';
import type { SpecialtyContextType } from '../../../types/Specialty';

jest.mock('../../../hooks/useSpecialty');
const mockedUseSpecialty = useSpecialty as jest.MockedFunction<typeof useSpecialty>;

describe('CreateSpecialty', () => {
  const addSpecialtyMock = jest.fn();
  const updateSpecialtyMock = jest.fn();
  const removeSpecialtyMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseSpecialty.mockReturnValue({
      specialties: [],
      addSpecialty: addSpecialtyMock,
      updateSpecialty: updateSpecialtyMock,
      removeSpecialty: removeSpecialtyMock,
    } as SpecialtyContextType);
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<CreateSpecialty />);
    expect(screen.getByLabelText(/nome da especialidade/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
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
  });

  it('não deve chamar addSpecialty se o input estiver vazio ou apenas espaços', () => {
    render(<CreateSpecialty />);
    const input = screen.getByLabelText(/nome da especialidade/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /salvar/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    expect(addSpecialtyMock).not.toHaveBeenCalled();
  });
});
