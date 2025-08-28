import React, { useState } from 'react';
import Header from '../components/Header';
import { ShoppingBag, Star, Heart, Filter, Search, ExternalLink, Eye, EyeOff, DollarSign, Zap } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  basePrice: number;
  currentDiscount: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  featured?: boolean;
  timesRevealed: number;
}

const StorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [revealedPrices, setRevealedPrices] = useState<number[]>([]);
  const [productDiscounts, setProductDiscounts] = useState<{[key: number]: number}>({});

  const products: Product[] = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      basePrice: 1299,
      currentDiscount: 0,
      image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      reviews: 2847,
      category: "smartphones",
      featured: true,
      timesRevealed: 0
    },
    {
      id: 2,
      name: "AirPods Pro (2nd Gen)",
      basePrice: 279,
      currentDiscount: 0,
      image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      reviews: 1923,
      category: "audio",
      timesRevealed: 0
    },
    {
      id: 3,
      name: "Nike Air Jordan 1 Retro",
      basePrice: 200,
      currentDiscount: 0,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.7,
      reviews: 856,
      category: "sneakers",
      timesRevealed: 0
    },
    {
      id: 4,
      name: "MacBook Pro 16\" M3",
      basePrice: 2699,
      currentDiscount: 0,
      image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      reviews: 1456,
      category: "laptops",
      featured: true,
      timesRevealed: 0
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      basePrice: 449,
      currentDiscount: 0,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      reviews: 2134,
      category: "audio",
      timesRevealed: 0
    },
    {
      id: 6,
      name: "Adidas Yeezy Boost 350",
      basePrice: 250,
      currentDiscount: 0,
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.6,
      reviews: 743,
      category: "sneakers",
      timesRevealed: 0
    },
    {
      id: 7,
      name: "iPad Pro 12.9\" M2",
      basePrice: 1199,
      currentDiscount: 0,
      image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      reviews: 967,
      category: "tablets",
      timesRevealed: 0
    },
    {
      id: 8,
      name: "Samsung Galaxy S24 Ultra",
      basePrice: 1399,
      currentDiscount: 0,
      image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.7,
      reviews: 1834,
      category: "smartphones",
      featured: true,
      timesRevealed: 0
    },
    {
      id: 9,
      name: "Apple Watch Ultra 2",
      basePrice: 849,
      currentDiscount: 0,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      reviews: 1245,
      category: "wearables",
      timesRevealed: 0
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', count: products.length },
    { id: 'smartphones', name: 'Smartphones', count: products.filter(p => p.category === 'smartphones').length },
    { id: 'audio', name: 'Audio', count: products.filter(p => p.category === 'audio').length },
    { id: 'sneakers', name: 'Zapatillas', count: products.filter(p => p.category === 'sneakers').length },
    { id: 'laptops', name: 'Laptops', count: products.filter(p => p.category === 'laptops').length },
    { id: 'tablets', name: 'Tablets', count: products.filter(p => p.category === 'tablets').length },
    { id: 'wearables', name: 'Wearables', count: products.filter(p => p.category === 'wearables').length }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(product => product.featured);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleRevealPrice = (product: Product) => {
    // Simulate payment and price reveal
    const randomDiscount = Math.floor(Math.random() * 50) + 10; // 10-60% discount
    
    setRevealedPrices(prev => [...prev, product.id]);
    setProductDiscounts(prev => ({
      ...prev,
      [product.id]: randomDiscount
    }));
    
    // Update times revealed counter
    const productIndex = products.findIndex(p => p.id === product.id);
    if (productIndex !== -1) {
      products[productIndex].timesRevealed += 1;
    }
  };

  const handlePurchase = () => {
    alert('¡Compra exitosa! Recibirás tu producto en 3-5 días hábiles.');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const isPriceRevealed = revealedPrices.includes(product.id);
    const discount = productDiscounts[product.id] || 0;
    const currentPrice = isPriceRevealed 
      ? Math.round(product.basePrice * (1 - discount / 100))
      : null;

    return (
      <div className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-2xl overflow-hidden shadow-2xl group hover:border-orange-500/60 transition-all duration-300">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              DESTACADO
            </div>
          )}
          {product.timesRevealed > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {product.timesRevealed}x REVELADO
            </div>
          )}
          <button
            onClick={() => toggleFavorite(product.id)}
            className="absolute bottom-4 right-4 p-2 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-white'}`}
            />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-gray-400 text-sm">({product.reviews})</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            {isPriceRevealed ? (
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-500">${currentPrice}</span>
                <span className="text-gray-500 line-through text-lg">${product.basePrice}</span>
                <span className="text-orange-500 text-sm font-bold">
                  -{discount}%
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-500">$???</span>
                <EyeOff className="w-5 h-5 text-gray-500" />
              </div>
            )}
          </div>
          
          {isPriceRevealed ? (
            <button 
              onClick={handlePurchase}
              className="cyber-button rounded-lg w-full py-3 flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Comprar Ahora</span>
            </button>
          ) : (
            <button 
              onClick={() => handleRevealPrice(product)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg w-full py-3 flex items-center justify-center space-x-2 transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              <span>Revelar Precio - $1</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 mt-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 flex items-center justify-center space-x-4">
              <Zap className="w-12 h-12 md:w-16 md:h-16 text-orange-500" />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Key Master Store PROXIMAMENTE
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Los precios están ocultos. Paga $1 para revelar el precio actual. 
              Cada dólar pagado reduce el precio del producto. ¡Si te gusta el precio revelado, cómpralo!
            </p>
          </div>

          {/* Game Rules */}
          <section className="mb-16 bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center glow-text">
              🎯 Reglas del Juego
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1. Paga para Revelar</h3>
                <p className="text-gray-300">Cada revelación cuesta $1 y reduce el precio del producto</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2. Precio Aleatorio</h3>
                <p className="text-gray-300">Cada revelación muestra un precio con descuento aleatorio</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3. Decide y Compra</h3>
                <p className="text-gray-300">Si te gusta el precio revelado, ¡cómpralo inmediatamente!</p>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center glow-text">
              Productos Destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                No se encontraron productos que coincidan con tu búsqueda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;