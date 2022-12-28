import React from 'react'
import styles from '../../styles/totalsales.module.css'

interface totalSalesI {
  totalSales: number
}

const TotalSales = ({totalSales} : totalSalesI) => {
  return (
    <section className={styles.totalSales}>
    <div className={styles.totalSales__card}>
      <p>Total de ventas de hoy</p>
      <div className={styles.card__info}>
        <h1 className='card__title'>{totalSales}</h1>
        <p>total sales</p>
      </div>
    </div>
  </section>

  )
}

export default TotalSales