import { Link } from 'wouter';
import { Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import servicesData from '@/data/services.json';
import { useFavoritesContext } from '@/contexts/FavoritesContext';
import { ServiceCard } from '@/components/ServiceCard';

/**
 * Página de Favoritos
 * Muestra la lista personalizada de servicios guardados por el usuario
 */
export default function Favorites() {
  const { favorites, isLoaded } = useFavoritesContext();

  // Obtener servicios favoritos
  const favoriteServices = servicesData.filter((service) =>
    favorites.includes(service.id)
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-12 px-4 md:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Link href="/servicios">
            <button className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium mb-4">
              <ArrowLeft className="w-5 h-5" />
              Volver a Servicios
            </button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mis Favoritos</h1>
          <p className="text-lg text-gray-600">
            {favoriteServices.length} servicio{favoriteServices.length !== 1 ? 's' : ''} guardado{favoriteServices.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {favoriteServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {favoriteServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No tienes favoritos aún
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Explora nuestros servicios y agrega tus favoritos para acceder a
                ellos más fácilmente.
              </p>
              <Link href="/servicios">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 text-lg">
                  Explorar Servicios
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
