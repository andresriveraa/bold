import React from 'react'
import {render} from '@testing-library/react'
import TotalSales from './totalSales'

describe('TotalSales component', () => {
  test('should render prop', () => {
    const {getByText} = render(<TotalSales totalSales={1000} />);
    getByText('1000')
  });
});