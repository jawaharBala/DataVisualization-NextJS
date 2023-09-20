"use client";
import { Inter } from 'next/font/google'
import XLSXtoJSON from './components/Excel to JSON/XLSXtoJSON';
import GoogleMaps from './components/Maps/googleMaps';
import {useSelector} from "react-redux"
import DataTable from './table/page';
import NavBar from './components/navbar/Navbar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const data = useSelector((store:any)=>{
    return store.custom.data;
});
const decadeData = useSelector((store:any)=>{
  return store.custom.decadeData;
});
  return (
    <>
     <XLSXtoJSON/>
  { data?.length>0 &&  <GoogleMaps/>}
    </>
  )
}
