import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {

  const onclick = async () => {
    const data = await fetch('/api/transactions');
    const dataJson = await data.json()
    console.log(dataJson);
    
  }

  return (
    <>
      <Head>
        <title>Bold - Andres rivera</title>
        <meta name="description" content="Test to frontend developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bold.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className={styles.vercelLogo}
          width={100}
          height={24}
        />

        <div className={styles.grid}>
          <p>hello</p>
          <button onClick={onclick}>get data</button>
        </div>
      </main>
    </>
  )
}
