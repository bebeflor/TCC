import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Relogios from './pages/Relogios'
import Pedido from './pages/Pedido'
import { CartProvider } from './context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <header className="header">
        <h1 className="logo">Vitaliz</h1>
        <nav className="sidebar-nav">
          <Link to="/cadastro">Cadastro</Link>
          <Link to="/">Início</Link>
          <Link to="/relogios">Relógios</Link>
          <Link to="/pedido">Pedido</Link>
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/relogios" element={<Relogios />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/" element={<Relogios />} />
        </Routes>
      </main>
      <footer className="footer">© 2025 Ótica Vitaliz - Todos os direitos reservados</footer>
    </CartProvider>
  )
}
