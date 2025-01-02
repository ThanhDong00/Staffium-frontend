'use client'
import React from 'react'
import Layout from "@/components/Layout";
import { useGlobalContext } from "../provider";

// const user = {
//   name: 'Khair'
// }
export default function ManagamentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <Layout>
      {children}
    </Layout>
  )
}
