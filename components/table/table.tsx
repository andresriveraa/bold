import React from 'react'
import { salesItem } from '../../pages/api/transactions/models'
import { transactionI } from '../../pages/dashboard/[timeline]';
import styles from '../../styles/table.module.css'

interface TableI {
  caption: string;
  transactions:transactionI[];
}

const Table = ({
  caption,
  transactions,
} : TableI) => {
  return (
     <section id='table' className={styles.tableContainer}>

          <div className={styles.table}>
            <table>
              <caption>{caption}</caption>
              <tr>
                <td>Transaccion</td>
                <td>Fecha y hora</td>
                <td>Metodo de pago</td>
                <td>transaccion Id</td>
                <td>Monto</td>
              </tr>

              {
                transactions.map((transaction: salesItem, i: number) =>
                  <tr key={i}>
                    <td>{transaction?.transaction}</td>
                    <td>{transaction?.date}</td>
                    <td>{transaction?.payment_method}</td>
                    <td>{transaction?.transction_id}</td>
                    <td>{transaction?.amount.value} <br /> {Boolean(transaction?.amount?.deduction) && <> <p>Deduccion Bold<br /></p><span> {transaction?.amount?.deduction}</span></>}</td>
                  </tr>
                )
              }
            </table>
          </div>
        </section>
  )
}

export default Table