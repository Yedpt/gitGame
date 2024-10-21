export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      

      <main className="pt-16">
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <img
            src="/placeholder.svg?height=500&width=1200"
            alt="Fantasy landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-6xl font-bold mb-4">Bienvenido a</h2>
            <h3 className="text-8xl font-bold text-green-500 shadow-text">GG GAME</h3>
          </div>
        </section>

        <section className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-green-500">Noticias Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 row-span-3 bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <img src="/placeholder.svg?height=400&width=600" alt="Call of Duty" className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-2xl font-bold mb-2">El nuevo Call of Duty vuelve a sus orígenes</h3>
                <p className="text-gray-300">Descubre cómo la última entrega de la franquicia regresa a sus raíces con un enfoque en la guerra moderna y el combate táctico.</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <img src="/placeholder.svg?height=200&width=400" alt="Diablo 4" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Diablo 4 se estrena con éxito</h3>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <img src="/placeholder.svg?height=200&width=400" alt="GTA 6" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">GTA 6 saldría a la venta en 2025</h3>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <img src="/placeholder.svg?height=200&width=400" alt="New RPG" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Nuevo RPG anunciado por estudio indie</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="p-8 bg-gradient-to-b from-gray-900 to-black">
          <h2 className="text-3xl font-bold mb-6 text-green-500">Sobre nosotros</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <p className="mb-4">
                Somos un grupo de apasionados por los videojuegos, dedicados a compartir nuestras experiencias y
                conocimientos con la comunidad gamer. Nuestro objetivo es mantenerte informado sobre las últimas
                novedades, análisis y noticias del fascinante mundo de los videojuegos.
              </p>
              <p>
                Nuestra misión es proporcionarte información actualizada, análisis detallados y contenido exclusivo
                sobre tus juegos favoritos y los próximos lanzamientos, para que estés siempre al día con las
                novedades de la industria.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src="/placeholder.svg?height=300&width=500" alt="Gamers playing" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </section>
      </main>

      
    </div>
  )
}
