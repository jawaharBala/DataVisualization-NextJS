"use client";
import XLSXtoJSON from '@/app/components/XLSXtoJSON';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main >
     <XLSXtoJSON/>
    </main>
  )
}
