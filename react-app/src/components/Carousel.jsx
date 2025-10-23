import React from 'react'

export default function Carousel({ children }) {
  return (
    <div className="carousel" role="list">
      {children}
    </div>
  )
}
