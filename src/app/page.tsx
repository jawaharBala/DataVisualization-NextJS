"use client";
import { Inter } from 'next/font/google'
import XLSXtoJSON from './components/XLSXtoJSON';
import GoogleMaps from './components/googleMaps';
import {useSelector} from "react-redux"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const data = useSelector((store:any)=>{
    return store.custom.data;
});
  return (
    <main >
     <XLSXtoJSON/>
  { data?.length>0 &&  <GoogleMaps/>}
    </main>
  )
}
