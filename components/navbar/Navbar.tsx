import React from 'react'
// styles 
import styles from '../../styles/navbar.module.css'
// enhacer
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
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
  )
}

export default Navbar