import { AppProps } from 'next/app'
import React from "react"
import "../styles/globals.css"
// import { Inconsolata, Raleway, Playfair_Display, Roboto_Slab, Exo_2, Rokkitt, Changa, Saira, Eczar, El_Messiri, Roboto_Serif, Petrona, Arima, Recursive } from '@next/font/google'
import { Layout } from '../components/layout'

// const inconsolata = Inconsolata({ weight: 'variable' })
// const raleway = Raleway({ weight: 'variable', subsets: ['latin'] }) // **
// const playfairDisplay = Playfair_Display({ weight: 'variable', subsets: ['latin'] })
// const robotoSlab = Roboto_Slab({ weight: 'variable', subsets: ['latin'] }) // ** Like it except that caps look like.. children's toys
// const robotoSerif = Roboto_Serif({ weight: 'variable', subsets: ['latin'] }) // worse
// const exo2 = Exo_2({ weight: 'variable', subsets: ['latin'] }) // ** like it more for text than titles
// const rokkitt = Rokkitt({ weight: 'variable', subsets: ['latin'] })
// const changa = Changa({ weight: 'variable', subsets: ['latin'] })
// const saira = Saira({ weight: 'variable', subsets: ['latin'] }) // ***
// const eczar = Eczar({ weight: 'variable', subsets: ['latin'] }) // little hard to read
// const elMessiri = El_Messiri({ weight: 'variable', subsets: ['latin'] }) // also a littel hard to read, cool tho
// const petrona = Petrona({ weight: 'variable', subsets: ['latin'] })
// const arima = Arima({ weight: 'variable', subsets: ['latin'] })
// const recursive = Recursive({ weight: 'variable', subsets: ['latin'] }) // **


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}