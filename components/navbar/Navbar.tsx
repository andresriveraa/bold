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
      tabIndex={0}
      className={styles.navbar__logo}
      width={96}
      height={60}
    />
    <ul className={styles.navbar__list}>
      <li title='link que te lleva al perfil de tu negocio'><Link href='mi_negocio' >Mi Negocio</Link></li>
      <li title='link que te lleva a la pagin de ayuda'><Link href='mi_negocio' >Ayuda</Link></li>
    </ul>
  </nav>
  )
}

export default Navbar