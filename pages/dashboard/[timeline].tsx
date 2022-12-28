import { ChangeEvent, useEffect, useState } from 'react'
// enhacer
import { useRouter } from 'next/router'
import { Inter } from '@next/font/google'
import Link from 'next/link'
// components
import Navbar from '../../components/navbar/Navbar'
import TotalSales from '../../components/totalSales/totalSales'
import Filters from '../../components/filters/Filters'
import Table from '../../components/table/table'
// styles 
import styles from '../../styles/Home.module.css'
// utils 


interface amountI {
  value: number,
  deduction: number
}
export interface transactionI {
  id: string;
  transaction: string;
  date: string;
  payment_method: string;
  payment_type: string;
  transction_id: string;
  amount: amountI
}


const Home = () => {
  const router = useRouter()
  const { timeline, link_pago = 0, datafono = 0 } = router.query
  const [filters, setFilters] = useState({
    todos: 0,
    datafono: 0,
    link: 0
  });

  const [transactions, setTransactions] = useState<transactionI[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [listMenuSelected, setListMenuSelected] = useState(0);


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
  }

  const getTitleTable = () => {

    switch (timeline) {
      case 'hoy':
        return  'Tus ventas del día de hoy'
      case 'semana':
        return 'Tus ventas de la última semana'
      case 'mes':
        return 'Tus ventas del el último mes'

      default:
        break;
    }
  }

  return (
    <>
      <main className={styles.main}>
        <Navbar />
        <TotalSales totalSales={totalSales} />
        <Filters
          listMenuSelected={listMenuSelected}
          filters={filters}
          handleFilterChange={handleFilterChange}
          applyFilters={applyFilters}
        />

        <Table
          caption={getTitleTable() ?? ''}
          transactions={transactions}
        />
      </main>
    </>
  )
}


export default Home