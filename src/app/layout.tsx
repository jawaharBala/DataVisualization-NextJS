"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import Store from "./statemanagement/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head/>
      <body className={inter.className}>
        <Provider store={Store}>{children}</Provider>
      </body>
    </html>
  );
}
