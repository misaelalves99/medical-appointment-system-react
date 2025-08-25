// src/pages/Specialty/index.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SpecialtyList from './index';
import { useSpecialty } from '../../hooks/useSpecialty';
import type { Specialty, SpecialtyContextType } from '../../types/Specialty';

jest.mock('../../hooks/useSpecialty');

describe('SpecialtyList', () => {
  const specialties: Specialty[] = [
    { id: 1, name: 'Cardiologia' },
    { id: 2, name: 'Neurologia' },
  ];

  const addSpecialtyMock = jest.fn();
  const updateSpecialtyMock = jest.fn();
  const removeSpecialtyMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useSpecialty as jest.MockedFunction<typeof useSpecialty>).mockReturnValue({
      specialties,
      addSpecialty: addSpecialtyMock,
      updateSpecialty: updateSpecialtyMock,
      removeSpecialty: removeSpecialtyMock,
    } as SpecialtyContextType);
  });

  it('deve renderizar todas as especialidades', () => {
    render(
      <MemoryRouter>
        <SpecialtyList />
      </MemoryRouter>
    );

    expect(screen.getByText('Cardiologia')).toBeInTheDocument();
    expect(screen.getByText('Neurologia')).toBeInTheDocument();
  });

  it('deve filtrar especialidades por nome', () => {
    render(
      <MemoryRouter>
        <SpecialtyList />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/pesquisar especialidades/i);
    fireEvent.change(input, { target: { value: 'cardio' } });

    expect(screen.getByText('Cardiologia')).toBeInTheDocument();
    expect(screen.queryByText('Neurologia')).not.toBeInTheDocument();
  });

  it('deve filtrar especialidades por ID', () => {
    render(
      <MemoryRouter>
        <SpecialtyList />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/pesquisar especialidades/i);
    fireEvent.change(input, { target: { value: '2' } });

    expect(screen.getByText('Neurologia')).toBeInTheDocument();
    expect(screen.queryByText('Cardiologia')).not.toBeInTheDocument();
  });

  it('deve mostrar mensagem se nenhuma especialidade for encontrada', () => {
    render(
      <MemoryRouter>
        <SpecialtyList />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/pesquisar especialidades/i);
    fireEvent.change(input, { target: { value: 'xyz' } });

    expect(screen.getByText(/nenhuma especialidade encontrada/i)).toBeInTheDocument();
  });

  it('deve ter links de ação corretos', () => {
    render(
      <MemoryRouter>
        <SpecialtyList />
      </MemoryRouter>
    );

    const detailsLink = screen.getAllByText('Detalhes')[0] as HTMLAnchorElement;
    const editLink = screen.getAllByText('Editar')[0] as HTMLAnchorElement;
    const deleteLink = screen.getAllByText('Excluir')[0] as HTMLAnchorElement;
    const createLink = screen.getByText(/cadastrar nova especialidade/i) as HTMLAnchorElement;

    expect(detailsLink).toHaveAttribute('href', '/specialty/details/1');
    expect(editLink).toHaveAttribute('href', '/specialty/edit/1');
    expect(deleteLink).toHaveAttribute('href', '/specialty/delete/1');
    expect(createLink).toHaveAttribute('href', '/specialty/create');
  });
});
