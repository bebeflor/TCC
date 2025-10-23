import React from 'react'
import { useCart } from '../context/CartContext'

export default function Pedido() {
  const { items, clear } = useCart()

  return (
    <section>
      <h2>Seu Pedido</h2>
      {items.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div>
          <ul>
            {items.map((it, idx) => (
              <li key={idx}>{it.produto} - {it.preco}</li>
            ))}
          </ul>
          <button onClick={() => { clear(); alert('Pedido limpo') }}>Limpar pedido</button>
        </div>
      )}
    </section>
  )
}
