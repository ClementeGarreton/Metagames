import React from 'react';
import Header from '../components/Header';
import { ExternalLink, Clock, Star, ArrowRight, Globe } from 'lucide-react';

const MuseumPage: React.FC = () => {
  const versions = [
    {
      id: 1,
      title: "Lotería Internacional Bitcoin",
      subtitle: "Donde empezó todo",
      description: "La primera versión experimental de nuestra plataforma. Aquí nacieron las primeras ideas de crear juegos justos donde la habilidad importa más que la suerte.",
      url: "https://loteriainternacionalbitcoin.com/",
      image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2023",
      status: "Origen",
      features: [
        "Concepto inicial de juegos justos",
        "Primeros experimentos con Bitcoin",
        "Base de la filosofía anti-casino"
      ]
    },
    {
      id: 2,
      title: "Metagames Origins",
      subtitle: "El rumbo correcto",
      description: "La evolución que tomó el rumbo correcto. Aquí refinamos la idea y creamos la base de lo que es Metagames hoy: una plataforma donde el talento es recompensado.",
      url: "https://metagames-origins.vercel.app/",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2024",
      status: "Evolución",
      features: [
        "Dino Run implementado",
        "Sistema de puntuaciones",
        "Interfaz mejorada",
        "Concepto de habilidad vs suerte"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 mt-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 flex items-center justify-center space-x-4">
              <Clock className="w-12 h-12 md:w-16 md:h-16 text-orange-500" />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Museo Metagames
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Un viaje a través del tiempo para descubrir cómo empezó todo. 
              Desde los primeros experimentos hasta la plataforma que conoces hoy.
            </p>
          </div>

          {/* Timeline Introduction */}
          <section className="mb-16 bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center glow-text">
              🏛️ La Historia de Metagames
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">El Origen</h3>
                <p className="text-gray-300">Todo comenzó con una idea simple: crear juegos justos</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">La Evolución</h3>
                <p className="text-gray-300">Refinamos la idea y encontramos el rumbo correcto</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">El Presente</h3>
                <p className="text-gray-300">La plataforma moderna que conoces hoy</p>
              </div>
            </div>
          </section>

          {/* Versions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-2xl overflow-hidden shadow-2xl group hover:border-orange-500/60 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={version.image}
                    alt={version.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {version.year}
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {version.status}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                      {version.title}
                    </h3>
                    <p className="text-orange-400 font-semibold text-lg mb-3">
                      {version.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {version.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-bold mb-3">Características:</h4>
                    <ul className="space-y-2">
                      {version.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a
                    href={version.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-button rounded-lg inline-flex items-center space-x-2 w-full justify-center py-3"
                  >
                    <span>Visitar {version.title}</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Legacy Message */}
          <section className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6 glow-text">
              El Legado Continúa
            </h2>
            <p className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
              Cada versión nos enseñó algo nuevo. Desde los primeros experimentos hasta la plataforma actual, 
              siempre hemos mantenido nuestra misión: crear un espacio donde la habilidad sea recompensada justamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="cyber-button rounded-lg px-8 py-3 inline-flex items-center space-x-2"
              >
                <span>Volver al Presente</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MuseumPage;