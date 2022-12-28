import React from 'react'
import { salesItem } from '../../pages/api/transactions/models'
import { transactionI } from '../../pages/dashboard/[timeline]';
import styles from '../../styles/table.module.css'
import { formatMoney } from '../../utils/utils';

interface TableI {
  caption: string;
  transactions: transactionI[];
}

const Table = ({
  caption,
  transactions,
}: TableI) => (
    <section id='table' className={styles.tableContainer}>

      <div className={styles.table}>
        <table>
          <caption>{caption}</caption>
          <thead>
            <tr>
              <td>Transaccion</td>
              <td>Fecha y hora</td>
              <td>Metodo de pago</td>
              <td>transaccion Id</td>
              <td>Monto</td>
            </tr>
          </thead>
          <tbody>
            {
              transactions.map((transaction: salesItem, i: number) =>
                <tr key={i}>
                  <td>{transaction?.transaction}</td>
                  <td>{transaction?.date}</td>
                  <td>{transaction?.payment_method}</td>
                  <td>{transaction?.transction_id}</td>
                  <td>$ {formatMoney(transaction?.amount.value)} <br /> {Boolean(transaction?.amount?.deduction) && <> <p>Deduccion Bold<br /></p><span>$ {formatMoney(transaction?.amount?.deduction ?? 0)}</span></>}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </section>
  );

export default Table