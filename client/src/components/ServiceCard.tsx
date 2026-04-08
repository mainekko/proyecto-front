import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavoritesContext } from '@/contexts/FavoritesContext';

/**
 * Interfaz para los datos del servicio
 */
interface Service {
  id: number;
  name: string;
  category: string;
  image: string;
  shortDescription: string;
  price: number;
  rating: number;
  reviews: number;
}

interface ServiceCardProps {
  service: Service;
}

/**
 * Componente de tarjeta de servicio
 * Muestra información resumida del servicio con opción de agregar a favoritos
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const isFav = isFavorite(service.id);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-102 flex flex-col h-full">
      {/* Imagen del servicio */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {/* Etiqueta de categoría */}
        <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {service.category}
        </div>
        {/* Botón de favorito */}
        <button
          onClick={() => toggleFavorite(service.id)}
          className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label={isFav ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart
            className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Nombre del servicio */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {service.name}
        </h3>

        {/* Descripción breve */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {service.shortDescription}
        </p>

        {/* Rating y reseñas */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < Math.floor(service.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {service.rating} ({service.reviews} reseñas)
          </span>
        </div>

        {/* Precio */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-gray-900">
            ${service.price.toFixed(2)}
          </p>
        </div>

        {/* Botón de acción */}
        <Link href={`/servicio/${service.id}`}>
          <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">
            Ver Más
          </Button>
        </Link>
      </div>
    </div>
  );
}
