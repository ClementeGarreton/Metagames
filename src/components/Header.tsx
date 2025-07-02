import React, { useState } from 'react';
import { Menu, X, Home, Trophy, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad2 className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold gradient-text">METAGAMES</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors">
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </Link>
            <Link to="/game" className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors">
              <Gamepad2 className="w-4 h-4" />
              <span>Jugar</span>
            </Link>
            <Link to="/winners" className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors">
              <Trophy className="w-4 h-4" />
              <span>Ganadores</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-orange-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-orange-500/30">
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </Link>
              <Link
                to="/game"
                className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Jugar</span>
              </Link>
              <Link
                to="/winners"
                className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Trophy className="w-4 h-4" />
                <span>Ganadores</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;