import blackops from '../assets/blackops.svg'
import home from '../assets/home.svg'
import logo from '../assets/logo.svg'
import team from '../assets/team.svg'
import darksoul from '../assets/darksoul.svg'
import luigi from '../assets/luigi.svg'
import gta from '../assets/gta.svg'
import contacto from '../assets/contacto.svg'

export default function App() {
  return (
    <div className="min-h-screen font-orbitron" style={{ backgroundColor: '#2D342D', color: 'white' }}>
      <main className="pt-16">
        <section className="relative h-[1000px] flex items-center justify-center overflow-hidden">
          <img
            src={home}
            alt="Fantasy landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-6xl font-bold mb-4 font-title">Bienvenido a</h2>
            <img src={logo} alt="Descripción de la imagen SVG" />
          </div>
        </section>

        <section className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-green-500 font-title">NOTICIAS DESTACADAS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 row-span-3 bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
              <img src={blackops} alt="Call of Duty" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
              <h3 className="text-2xl font-bold mb-2 font-title text-white">El nuevo Call of Duty vuelve a sus orígenes</h3>
              <p className="text-gray-300 font-paragraph">Descubre cómo la última entrega de la franquicia regresa a sus raíces con un enfoque en la guerra moderna y el combate táctico.</p>
            </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
    <img src={darksoul} alt="desarrollo" className="w-full h-full object-cover" />
    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
        <h3 className="text-xl font-bold mb-2 font-title text-white">Dark souls 4 en desarrollo</h3>
    </div>
</div>

<div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
    <img src={luigi} alt="mansion" className="w-full h-full object-cover" />
    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
        <h3 className="text-xl font-bold mb-2 font-title text-white">Luigis Mansion vende 3 millones de copias</h3>
    </div>
</div>

<div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
    <img src={gta} alt="lanzamiento" className="w-full h-full object-cover" />
    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
        <h3 className="text-xl font-bold mb-2 font-title text-white">GTA VI saldra en diciembre de 2025</h3>
    </div>
</div>
          </div>
        </section>

        <section className="p-8" style={{ backgroundColor: '#2D342D' }}>
          <h2 className="text-3xl font-bold mb-6 text-green-500 font-title">SOBRE NOSOTROS</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <p className="mb-4 font-paragraph">
                Somos un grupo de apasionados por los videojuegos, dedicados a compartir nuestras experiencias y
                conocimientos con la comunidad gamer. Nuestro objetivo es mantenerte informado sobre las últimas
                novedades, análisis y noticias del fascinante mundo de los videojuegos.
              </p>
              <p className="font-paragraph">
                Nuestra misión es proporcionarte información actualizada, análisis detallados y contenido exclusivo
                sobre tus juegos favoritos y los próximos lanzamientos, para que estés siempre al día con las
                novedades de la industria.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src={team} alt="Gamers playing" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </section>
        <section className="p-4 sm:p-8" style={{ backgroundColor: '#2D342D' }}>
        <h2 className="text-3xl font-bold mb-6 text-green-500 font-title">CONTACTO</h2>
          <div className="flex flex-col lg:flex-row items-start gap-8 max-w-6xl mx-auto">
            <div className="lg:w-1/2 w-full">
              <img 
                src={contacto} 
                alt="Persona jugando videojuegos" 
                className="rounded-lg object-cover w-full h-auto shadow-lg"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <form className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full p-3 bg-gray-800 text-white rounded placeholder--[#325C34] focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Correo electrónico</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full p-3 bg-gray-800 text-white rounded placeholder--[#325C34] focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-300 mb-1">Mensaje</label>
                  <textarea
                    id="mensaje"
                    placeholder="¿En qué podemos ayudarte?"
                    rows={6}
                    className="w-full p-3 bg-gray-800 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y text-base"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white px-6 py-4 rounded font-bold text-lg hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
