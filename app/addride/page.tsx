import React from 'react'
import Header from '@/app/components/common/Header/header'
import AppFooter from '@/app/components/common/Footer/footer'
import AddRide from '@/app/components/Addride/addride'

export default function page() {
  return (
    <>
    <Header />
    <AddRide />
    <AppFooter />
    </>
  )
}
