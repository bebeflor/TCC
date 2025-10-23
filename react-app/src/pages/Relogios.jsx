import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const PRODUCTS = [
  { img: '/img/relogio1.png', title: 'Condor dourado', price: 'R$ 590,00' },
  { img: '/img/relogio2.png', title: 'Mormaii preto', price: 'R$ 479,00' },
  { img: '/img/relogio3.png', title: 'Mormaii dourado', price: 'R$ 699,90' },
  { img: '/img/relogio4.png', title: 'Technos unisex', price: 'R$ 599,99' },
  { img: '/img/relogio5.png', title: 'Mormaii masculino azul', price: 'R$ 759,90' },
  { img: '/img/relogio7.jpeg', title: 'Apple watch unisex', price: 'R$ 1.299,00' },
  { img: '/img/relogio6.png', title: 'Condor feminino', price: 'R$ 850,00' },
  { img: '/img/relogio9.jpeg', title: 'Euro feminino com pulseira', price: 'R$ 799,00' },
  { img: '/img/relogio10.jpeg', title: 'Mormaii azul masculino', price: 'R$ 580,00' },
  { img: '/img/relogio11.jpeg', title: 'Euro masculino', price: 'R$ 677,90' },
  { img: '/img/relogio8.jpeg', title: 'Condor masculino', price: 'R$ 659,90' },
  { img: '/img/relogio12.jpeg', title: 'Technos feminino', price: 'R$ 550,00' }
]

export default function Relogios() {
  const { add } = useCart()
  const nav = useNavigate()

  function handleAdd(p) {
    add(p.title, p.price)
    // pequenos feedbacks
    alert('Produto adicionado ao pedido')
    nav('/pedido')
  }

  return (
    <section>
      <h2>Nossos Relógios</h2>
      <div className="carousel">
        {PRODUCTS.map((p, i) => (
          <article className="card" key={i}>
            <img src={p.img} alt={p.title + ' - ' + p.price} loading="lazy" />
            <p>{p.title} - {p.price}</p>
            <button className="pedido-btn" onClick={() => handleAdd(p)}>Fazer pedido</button>
          </article>
        ))}
      </div>
    </section>
  )
}
