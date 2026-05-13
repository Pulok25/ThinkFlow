import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#84e7c4] via-[#b8d4e8] to-[#B5C6E0]">
      <Outlet />
    </div>
  )
}