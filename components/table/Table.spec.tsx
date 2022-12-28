import React from 'react';
import {render} from '@testing-library/react'
import Table from './table';

describe('Table component', () => {
  const caption = 'ventas de esta semana'
  test('should render component', () => {

    const {getByRole} = render(<Table 
      caption={caption}
      transactions={[{
        id: '2',
        transaction: 'Cobro no realizado',
        date : '12/27/2022 17:14:24',
        payment_method: '**** **** **** 7711',
        payment_type: 'link de pago',
        transction_id: 'GZEN23784UBV2',
        amount: {
          value: 25000,
          deduction: 1500
        },
      }]}
    />)

    getByRole('table')
  });
});