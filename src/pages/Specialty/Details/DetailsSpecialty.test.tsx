// src/pages/Specialty/Details/DetailsSpecialty.test.tsx

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailsSpecialty from './SpecialtyDetails';
import { useSpecialty } from '../../../hooks/useSpecialty';
import { useParams } from 'react-router-dom';
import type { Specialty, SpecialtyContextType } from '../../../types/Specialty';

jest.mock('../../../hooks/useSpecialty');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

describe('DetailsSpecialty', () => {
  const addSpecialtyMock = jest.fn();
  const updateSpecialtyMock = jest.fn();
  const removeSpecialtyMock = jest.fn();

  const specialties: Specialty[] = [{ id: 1, name: 'Cardiologia' }];

  beforeEach(() => {
    jest.clearAllMocks();

    (useSpecialty as jest.MockedFunction<typeof useSpecialty>).mockReturnValue({
      specialties,
      addSpecialty: addSpecialtyMock,
      updateSpecialty: updateSpecialtyMock,
      removeSpecialty: removeSpecialtyMock,
    } as SpecialtyContextType);
  });

  it('deve mostrar mensagem se especialidade não for encontrada', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });

    (useSpecialty as jest.MockedFunction<typeof useSpecialty>).mockReturnValue({
      specialties: [],
      addSpecialty: addSpecialtyMock,
      updateSpecialty: updateSpecialtyMock,
      removeSpecialty: removeSpecialtyMock,
    } as SpecialtyContextType);

    render(
      <MemoryRouter>
        <DetailsSpecialty />
      </MemoryRouter>
    );

    expect(screen.getByText(/especialidade não encontrada/i)).toBeInTheDocument();
  });

  it('deve renderizar especialidade corretamente', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DetailsSpecialty />
      </MemoryRouter>
    );

    expect(screen.getByText(/detalhes da especialidade/i)).toBeInTheDocument();
    expect(screen.getByText(/id: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/cardiologia/i)).toBeInTheDocument();
  });

  it('deve ter links de editar e voltar com href corretos', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <DetailsSpecialty />
      </MemoryRouter>
    );

    const editLink = screen.getByText(/editar/i) as HTMLAnchorElement;
    const backLink = screen.getByText(/voltar para a lista/i) as HTMLAnchorElement;

    expect(editLink).toHaveAttribute('href', '/specialty/edit/1');
    expect(backLink).toHaveAttribute('href', '/specialty');
  });
});
