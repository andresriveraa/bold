
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <main className={styles.main}>
        <div className={styles.grid}>
          <h1>Login</h1>
            <Link href='/dashboard'>
              <button>
                ir al dashboard
              </button>
            </Link>
        </div>
      </main>
    </>
  )
}
