import React from 'react'
import { useCart } from '../context/CartContext'

export default function CartBadge(){
  const { items } = useCart()
  return <span style={{marginLeft:8}}>({items.length})</span>
}
