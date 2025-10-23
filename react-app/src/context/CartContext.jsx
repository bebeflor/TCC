import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const KEY = 'pedido_items'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const s = sessionStorage.getItem(KEY)
      return s ? JSON.parse(s) : []
    } catch (e) {
      try { const l = localStorage.getItem(KEY); return l ? JSON.parse(l) : [] } catch (err) { return [] }
    }
  })

  useEffect(() => {
    try { sessionStorage.setItem(KEY, JSON.stringify(items)) } catch (e) { try { localStorage.setItem(KEY, JSON.stringify(items)) } catch (err){} }
  }, [items])

  function add(produto, preco) { setItems(prev => [...prev, { produto, preco }]) }
  function clear() { setItems([]) }

  return <CartContext.Provider value={{ items, add, clear }}>{children}</CartContext.Provider>
}

export function useCart() { return useContext(CartContext) }
