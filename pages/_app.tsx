import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { Montserrat } from '@next/font/google'
import Head from 'next/head';

const montserrat = Montserrat({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Bold - Andres rivera</title>
      <meta name="description" content="Test to frontend developer" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/bold.ico" />
    </Head>
   <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
    <Component {...pageProps} />
  </> 

}