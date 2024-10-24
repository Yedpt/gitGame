import React from 'react'
import logo from '../assets/img/logo.svg'
import review from '../assets/img/reviewsportada.svg'


const Reviews = () => {
  return (
    <div>
      <main>
        {/* Portada */}
        <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
          <img src={review} alt="Fantasy landscape" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-6xl font-bold text-light mb-4 font-title">Reviews</h2>
          </div>
        </section>
      </main>
      <p>Review</p>
    </div>
  )
}

export default Reviews
