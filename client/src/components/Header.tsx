import { Link } from 'wouter';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useFavoritesContext } from '@/contexts/FavoritesContext';

/**
 * Componente de Header
 * Navegación principal de la aplicación
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useFavoritesContext();

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Favoritos', href: '/favoritos' },
    { label: 'Contacto', href: '/contacto' },
    { label: 'Admin', href: '/admin' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PS</span>
              </div>
              <span className="font-bold text-lg text-gray-900 hidden sm:inline">
                Plataforma Servicios
              </span>
            </div>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="text-gray-700 hover:text-blue-700 font-medium transition-colors">
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Favoritos y menú móvil */}
          <div className="flex items-center gap-4">
            {/* Botón de favoritos */}
            <Link href="/favoritos">
              <button className="relative p-2 text-gray-700 hover:text-blue-700 transition-colors">
                <Heart className="w-6 h-6" />
                {favorites.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
            </Link>

            {/* Menú hamburguesa */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-700"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
