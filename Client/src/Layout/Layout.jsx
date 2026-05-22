import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

/* ── Layout ──────────────────────────────────────────── */
const Layout = ({ children }) => (
  <div className="min-h-screen bg-zinc-950 text-white">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
)

export default Layout