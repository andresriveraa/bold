import { ChangeEvent, useEffect, useState } from 'react'
// enhacer
import { useRouter } from 'next/router'
import { Inter } from '@next/font/google'
import Link from 'next/link'
// styles 
import styles from '../../styles/Home.module.css'
// utils 
import { categories } from '../../utils/utils'
// services
// models
import { salesItem } from '../api/transactions/models'
import Image from 'next/image'
import { GetServerSideProps } from 'next'


const inter = Inter({ subsets: ['latin'] })

declare type filtersT = {
  todos: number;
  datafono: number;
  link: number;
}

export declare const filtersOptions: {
  todos: number;
  datafono: number;
  link: number;
}


export declare type filtersOptionsT = keyof typeof filtersOptions;


const Home = () => {
  const router = useRouter()
  const { timeline, link_pago = 0, datafono = 0 } = router.query
  const [filters, setFilters] = useState({
    todos: 0,
    datafono: 0,
    link: 0
  });

  const [transactions, setTransactions] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [listMenuSelected, setListMenuSelected] = useState(0);
  const [showFilters, toggleShowFilters] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`/api/transactions/${timeline}?link_pago=${link_pago}&datafono=${datafono}`);
        const dataJson = await data.json();
        setTransactions(dataJson?.allSales);
      } catch (error) {
        console.error(error)
      }
    })();
  }, [timeline, link_pago, datafono])

  useEffect(() => {
    switch (timeline) {
      case 'hoy':
        setListMenuSelected(0);
        break;
      case 'semana':
        setListMenuSelected(1);
        break;
      default:
        setListMenuSelected(2);
        break;
    }

    setFilters({
      todos: !Number(link_pago) && !Number(datafono) ? 1 : 0,
      datafono: Number(datafono),
      link: Number(link_pago),
    });

    (async () => {
      try {
        const dataTotalSales = await fetch(`/api/transactions/total_sales`);
        const dataTotalSalesJson = await dataTotalSales.json();
        setTotalSales(dataTotalSalesJson?.totalSales);
      } catch (error) {
        console.error(error)
      }
    })()

  }, [timeline, datafono, link_pago])


  const handleFilterChange = (e: ChangeEvent) => {
    const { value, checked } = e.target as HTMLInputElement;
    setFilters(prevState => ({ ...prevState, [value]: Number(checked) }))
  }

  const applyFilters = () => {
    if (filters.todos) router.push(`/dashboard/${timeline}?link_pago=0&datafono=0`);
    else if (filters.datafono || filters.link) router.push(`/dashboard/${timeline}?link_pago=${filters.link}&datafono=${filters.datafono}`);
    toggleShowFilters(prev => !prev)
  }

  return (
    <>
      <main className={styles.main}>
        <nav className={styles.navbar} id='navbar'>
          <Image
            src="/bold_logo.svg"
            alt="Bold logo"
            tabIndex={1}
            className={styles.navbar__logo}
            width={96}
            height={60}
          />
          <ul className={styles.navbar__list}>
            <Link href='mi_negocio' >
              <li>Mi Negocio</li>
            </Link>
            <Link href='mi_negocio' >
              <li>Ayuda</li>
            </Link>
          </ul>
        </nav>

        <section className={styles.totalSales}>
          <div className={styles.totalSales__card}>
            <p>Total de ventas de hoy</p>
            <div className={styles.card__info}>
              <h1 className='card__title'>{totalSales}</h1>
              <p>total sales</p>
            </div>
          </div>
        </section>

        <section id="filters" className={styles.filters}>
          <nav className={styles.navFilters}>
            <ul>
              <li className={listMenuSelected === 0 ? styles.listActive : styles.list}>
                <Link href={`/dashboard/hoy?link_pago=${filters.link}&datafono=${filters.datafono}`}>today</Link>
              </li>
              <li className={listMenuSelected === 1 ? styles.listActive : styles.list}>
                <Link href={`/dashboard/semana?link_pago=${filters.link}&datafono=${filters.datafono}`}>this week</Link>
              </li>
              <li className={listMenuSelected === 2 ? styles.listActive : styles.list}>
                <Link href={`/dashboard/mes?link_pago=${filters.link}&datafono=${filters.datafono}`}>this month</Link>
              </li>
            </ul>
          </nav>

          <button onClick={() => toggleShowFilters(prev => !prev)}> filters</button>

          <div className={`${styles.modal} ${showFilters ? styles.showModalFilters : styles.hideModalFilters} `}>
            <ul >
              {categories.map(({ name, value }) => (
                <li key={value}>
                  <label>
                    <input
                      onChange={handleFilterChange}
                      type="checkbox"
                      checked={Boolean(filters[value as filtersOptionsT])}
                      value={value} />
                    {name}
                  </label>
                </li>
              ))}
            </ul>
            <button className='secondary' onClick={applyFilters}>aplicar</button>

          </div>
        </section>

        <section id='table' className={styles.tableContainer}>

          <div className={styles.table}>
            <table>
            <caption>Tus ventas de hoy</caption>
              <tr>
                <td>Transaccion</td>
                <td>Fecha y hora</td>
                <td>Metodo de pago</td>
                <td>transaccion Id</td>
                <td>Monto</td>
              </tr>

              {
                transactions.map((transaction: salesItem, i) =>
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
      </main>
    </>
  )
}


export default Home