import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import styles from '../../styles/filters.module.css'
import categories from '../../utils/utils'

interface filtersI {
  listMenuSelected: number;
  filters: filtersStateI ,
  handleFilterChange: (e: ChangeEvent) => void;
  applyFilters: () => void;
}

export interface filtersStateI {
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

const Filters = ({
  listMenuSelected,
  filters,
  handleFilterChange,
  applyFilters
} : filtersI) => {
  const [showFilters, toggleShowFilters] = useState(false);

  const applyFiltersComponent = () => {
    applyFilters()
    toggleShowFilters(prev => !prev)

  }

  return (
    <>
      <section id="filters" className={styles.filters}>
        <nav className={styles.navFilters}>
          <ul>
            <li className={listMenuSelected === 0 ? styles.listActive : styles.list}>
              <Link href={`/dashboard/hoy?link_pago=${filters.link}&datafono=${filters.datafono}`}>Hoy</Link>
            </li>
            <li className={listMenuSelected === 1 ? styles.listActive : styles.list}>
              <Link href={`/dashboard/semana?link_pago=${filters.link}&datafono=${filters.datafono}`}>Última semana</Link>
            </li>
            <li className={listMenuSelected === 2 ? styles.listActive : styles.list}>
              <Link href={`/dashboard/mes?link_pago=${filters.link}&datafono=${filters.datafono}`}>Último mes</Link>
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
          <button className='secondary' onClick={applyFiltersComponent}>aplicar</button>

        </div>
      </section>
    </>
  )
}

export default Filters