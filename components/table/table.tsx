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
            <tr tabIndex={0}>
              <td scope="col">Transaccion</td>
              <td id='fechaHora'>Fecha y hora</td>
              <td>Metodo de pago</td>
              <td>transaccion Id</td>
              <td>Monto</td>
            </tr>
          </thead>
          <tbody>
            {
              transactions.map((transaction: salesItem, i: number) =>
                <tr key={i}>
                  <td tabIndex={0} aria-label='transaccion'>{transaction?.transaction}</td>
                  <td tabIndex={0} aria-label='fecha y hora'>{transaction?.date}</td>
                  <td aria-label='metodo de pago'>{transaction?.payment_method}</td>
                  <td tabIndex={0} aria-label='id de transaccion'>{transaction?.transction_id}</td>
                  <td tabIndex={0} aria-label='valor'>$ {formatMoney(transaction?.amount.value)} <br /> {Boolean(transaction?.amount?.deduction) && <> <p>Deduccion Bold<br /></p><span>$ {formatMoney(transaction?.amount?.deduction ?? 0)}</span></>}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </section>
  );

export default Table