import React from 'react'
import { fireEvent, render } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar component', () => {
  test('should have 2 nav buttons', () => {
    const {getByRole} = render(<Navbar />)
    getByRole('img')

    const menuButtonsBusiness = getByRole('link', {name: 'Mi Negocio'});
    const menuButtonsHelp = getByRole('link', {name: 'Ayuda'});

    fireEvent.click(menuButtonsBusiness);
    fireEvent.click(menuButtonsHelp);

  });
});