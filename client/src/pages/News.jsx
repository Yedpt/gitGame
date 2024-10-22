import React from 'react'
import image from '../assets/images/image.png'
import card from '../assets/images/card.png'

const News = () => {
  return (
    <div className="bg-greenDark h-full" >
      <p>noticias</p>
      <div className="bg-dark h-full">
        <img
          src={image}
          alt="fondo verde"
          className="w-full block"
        />

<p>noticias</p>

      </div>

      <img
          src={card}
          alt="fondo verde"
          className="w-92 items-center flex"
        />
<p>noticias</p>
<p>noticias</p>
<p>noticias</p>
<p>noticias</p>
<p>noticias</p>
<p>noticias</p>

    </div>
  )
}

export default News
