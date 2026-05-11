import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#84e7c4] via-[#b8d4e8] to-[#B5C6E0]">
      <Navbar />
      <Outlet />
    </div>
  )
}