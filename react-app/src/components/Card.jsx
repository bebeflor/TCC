import React from 'react'
export default function Card({p, onAdd}){
  return (
    <article className="card">
      <img src={p.img} alt={p.title + ' - ' + p.price} loading="lazy" />
      <p>{p.title} - {p.price}</p>
      <button className="pedido-btn" onClick={() => onAdd(p)}>Fazer pedido</button>
    </article>
  )
}
