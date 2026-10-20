import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import { AddProduct } from './pages/AddProduct'
import { Clients } from './pages/Clients'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Messages } from './pages/Messages'
import { Orders } from './pages/Orders'
import { Products } from './pages/Products'
import { Reports } from './pages/Reports'
import { isAuthenticated } from './lib/auth'

function ProtectedRoute() {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="produits" element={<Products />} />
        </Route>
        <Route path="commandes" element={<Orders />} />
        <Route path="clients" element={<Clients />} />
        <Route path="produits/ajouter" element={<AddProduct />} />
        <Route path="rapports" element={<Reports />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
