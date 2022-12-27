
import { Inter } from '@next/font/google'
import styles from '../styles/app.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <main className={styles.main}>
        <h1>Hola Bienvenidos a Bold</h1>

        <Link href='/dashboard/month'>
          <button>
            Ir al dashboard
          </button>
        </Link>
      </main>
    </>
  )
}
