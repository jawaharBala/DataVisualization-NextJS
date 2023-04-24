"use client";
import { Inter } from 'next/font/google'
import XLSXtoJSON from './components/XLSXtoJSON';
import { Provider } from 'react-redux'
import Store from './statemanagement/store';
import GoogleMaps from './components/googleMaps';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
  <Provider  store={Store}>
    <main >
     <XLSXtoJSON/>
     <GoogleMaps/>
    </main>
    </Provider>
  )
}
