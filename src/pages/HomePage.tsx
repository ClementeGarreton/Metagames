import React from 'react';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { Trophy, Shield, Users, Share2, CreditCard, Gamepad2, Eye, Instagram } from 'lucide-react';

const HomePage: React.FC = () => {
  const gameOptions = [
    {
      title: "Mercado Pago",
      description: "La entrada para jugar cuesta solo 5 centavos, unos 50 pesos chilenos.",
      image: "/game1.jpg",
      buttonText: "Pagar",
      buttonLink: "https://mpago.la/19BPFvn",
      isExternal: true
    },
    {
      title: "Modo Práctica",
      description: "Juega sin pagar y practica para lograr el máximo puntaje y ganar el premio.",
      image: "/game2.jpg",
      buttonText: "Entrar",
      buttonLink: "/game",
      isExternal: false
    },
    {
      title: "Sala de Ganadores",
      description: "Consulta los puntajes ganadores con total transparencia para ganar.",
      image: "/game3.jpg",
      buttonText: "Ver",
      buttonLink: "/winners",
      isExternal: false
    },
    {
      title: "Nuestro Instagram",
      description: "No te pierdas noticias sobre los concursos y cuánto dinero hay en juego.",
      image: "/game4.png",
      buttonText: "Seguir",
      buttonLink: "https://www.instagram.com/metagames.latam/",
      isExternal: true
    }
  ];

  const howToPlay = [
    {
      icon: <CreditCard className="w-12 h-12 text-orange-500" />,
      title: "Paga",
      description: "Click en los logos de la sección de arriba para jugar."
    },
    {
      icon: <Gamepad2 className="w-12 h-12 text-orange-500" />,
      title: "Juega",
      description: "Juega Dino Run. El puntaje más alto gana el premio el día 28 de cada mes."
    },
    {
      icon: <Trophy className="w-12 h-12 text-orange-500" />,
      title: "Gana",
      description: "Comparamos los pagos con las veces que jugaste para que no haya trampa."
    },
    {
      icon: <Share2 className="w-12 h-12 text-orange-500" />,
      title: "Comparte",
      description: "Si te apetece, comparte cómo has ganado dinero en Metagames."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-black gradient-text mb-6 floating">
              METAGAMES
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Gana dinero real jugando. No somos un casino, somos una plataforma de habilidad donde el mejor jugador gana.
            </p>
            <a
              href="#game-section"
              className="cyber-button rounded-full px-8 py-4 text-lg inline-block"
            >
              COMENZAR A JUGAR
            </a>
          </div>
        </div>
      </section>

      {/* Game Options Section */}
      <section id="game-section" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 glow-text">
              Juega Aquí
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gameOptions.map((option, index) => (
              <GameCard key={index} {...option} />
            ))}
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 glow-text">
              Cómo Jugar
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howToPlay.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 glow-text">
                Sobre Nosotros
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Aquí en Metagames puedes ganar dinero online jugando Dino Run haciendo el máximo puntaje a fin de mes.
                </p>
                <p>
                  <strong className="text-orange-500">NO somos un casino online</strong> ya que nuestra propuesta desafía a los juegos de azar que son más trampa que acuerdo mutuo.
                </p>
                <p>
                  El premio millonario se paga el día 28 de cada mes y hay 2 modos de juego.
                </p>
                <p>
                  Modo gratuito para practicar y modo premium con Mercado Pago y Power-Ups.
                </p>
                <p>
                  El modo premium cuesta 5 centavos la entrada o por juego y el power up para revivir y continuar sin perder tu puntaje cuesta 50 centavos.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Gaming"
                className="rounded-2xl shadow-2xl neon-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Transparency"
                className="rounded-2xl shadow-2xl neon-border"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-white mb-6 glow-text">
                Transparencia & Confianza
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Para mantener la transparencia, la legalidad y la confianza publicamos la cantidad de dinero en juego en nuestro Instagram o la red Bitcoin con total transparencia y dominio público.
                </p>
                <p>
                  Antes de entregar el premio, revisamos que el ganador no haya hecho trampa (como modificar el puntaje o jugar sin pagar).
                </p>
                <p>
                  Al entrar al juego en modo premium debes ingresar tu email el cual será censurado en la tabla de ganadores para proteger tu identidad y evitar estafas que se hagan pasar por nosotros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black border-t border-orange-500/30">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            Copyright 2025 All Rights Reserved By <span className="text-orange-500 font-bold">Metagames</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;