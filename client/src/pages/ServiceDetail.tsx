import { useRoute, Link } from 'wouter';
import { Heart, ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import servicesData from '@/data/services.json';
import { useFavoritesContext } from '@/contexts/FavoritesContext';
import { ServiceCard } from '@/components/ServiceCard';

/**
 * Página de Detalle de Servicio
 * Muestra información completa del servicio seleccionado
 */
export default function ServiceDetail() {
  const [match, params] = useRoute('/servicio/:id');
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  if (!match) return null;

  const serviceId = parseInt(params?.id || '0', 10);
  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Servicio no encontrado
          </h1>
          <Link href="/servicios">
            <Button className="bg-blue-700 hover:bg-blue-800 text-white">
              Volver a Servicios
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(service.id);
  const relatedServices = servicesData
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Header con navegación */}
      <div className="bg-gray-50 py-4 px-4 md:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Link href="/servicios">
            <button className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium">
              <ArrowLeft className="w-5 h-5" />
              Volver a Servicios
            </button>
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Imagen y detalles principales */}
            <div className="md:col-span-2">
              {/* Imagen del servicio */}
              <div className="mb-8">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {/* Información básica */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-block bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      {service.category}
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      {service.name}
                    </h1>
                  </div>
                  <button
                    onClick={() => toggleFavorite(service.id)}
                    className="bg-white border-2 border-gray-300 rounded-full p-3 hover:border-red-500 transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl ${
                          i < Math.floor(service.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-lg text-gray-600">
                    {service.rating} ({service.reviews} reseñas)
                  </span>
                </div>
              </div>

              {/* Descripción completa */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Descripción
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Características */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Características
                </h2>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-700 font-bold text-lg">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Información del proveedor */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Proveedor
                </h2>
                <p className="text-lg text-gray-700 mb-6">{service.provider}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-700" />
                    <span className="text-gray-700">+57 300 000 0000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-700" />
                    <span className="text-gray-700">contacto@proveedor.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-700" />
                    <span className="text-gray-700">Bogotá, Colombia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar derecho */}
            <div>
              {/* Tarjeta de precio y CTA */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                <div className="mb-6">
                  <p className="text-gray-600 text-sm mb-2">Precio</p>
                  <p className="text-4xl font-bold text-gray-900">
                    ${service.price.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    onClick={() => toggleFavorite(service.id)}
                    variant={isFav ? 'default' : 'outline'}
                    className={`w-full ${
                      isFav
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'border-red-500 text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    {isFav ? 'En Favoritos' : 'Agregar a Favoritos'}
                  </Button>

                  <Link href="/contacto">
                    <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">
                      Contactar Proveedor
                    </Button>
                  </Link>
                </div>

                {/* Información adicional */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    ¿Tienes preguntas? Nuestro equipo de soporte está disponible
                    24/7 para ayudarte.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Servicios relacionados */}
          {relatedServices.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Servicios Relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedServices.map((relatedService) => (
                  <ServiceCard key={relatedService.id} service={relatedService} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
