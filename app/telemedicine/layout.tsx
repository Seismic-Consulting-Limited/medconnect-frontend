import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import React, { ReactNode } from 'react'

const TelemedicineLayout = ({children}: {children: ReactNode}) => {
  return (
    <main>
        <SiteHeader />
        {children}
        <SiteFooter />
    </main>
  )
}

export default TelemedicineLayout
