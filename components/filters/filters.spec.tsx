import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Filters from './Filters'

const mockFn = jest.fn();
const mockFn2 = jest.fn();

describe('Filter component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<Filters
      listMenuSelected={0}
      filters={{
        todos: 0,
        datafono: 0,
        link: 0
      }}
      handleFilterChange={mockFn2}
      applyFilters={mockFn}
    />)
  });

  test('should click apply', () => {
    const { getByRole, getAllByRole } = component;
    getByRole('navigation');
    getAllByRole('button')

    const button = getByRole('button', {name: 'aplicar'})
    fireEvent.click(button)

    expect(mockFn).toHaveBeenCalled()
  });

  test('should click', () => {
    const { getByRole, getAllByRole } = component;
    const input = getByRole('checkbox', {name: 'todos'});
    fireEvent.click(input)

    expect(mockFn2).toHaveBeenCalled()
  });
});
