import React from 'react'
import Header from '@/app/components/common/Header/header'
import AppFooter from '@/app/components/common/Footer/footer'
import LoginPage from '@/app/components/Login/login'

export default function page() {
  return (
    <>
        <Header />
        <LoginPage />
        <AppFooter />
    </>
  )
}
