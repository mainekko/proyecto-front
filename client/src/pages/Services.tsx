import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import servicesData from '@/data/services.json';
import { ServiceCard } from '@/components/ServiceCard';

/**
 * Página de Listado de Servicios
 * Muestra todos los servicios con opciones de búsqueda y filtrado por categoría
 */
export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Obtener categorías únicas
  const categories = ['Todas', ...Array.from(new Set(servicesData.map((s) => s.category)))]

  // Filtrar servicios según búsqueda y categoría
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Todas' || service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Resetear a página 1 cuando cambia el filtro
  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-lg text-gray-600">
            Explora nuestro catálogo completo de servicios digitales
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Barra de búsqueda */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar servicios..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtros por categoría */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Filtrar por categoría
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mb-6">
            <p className="text-gray-600">
              Mostrando {paginatedServices.length} de {filteredServices.length} servicios
            </p>
          </div>

          {/* Grid de servicios */}
          {paginatedServices.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {paginatedServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Anterior
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === i + 1
                          ? 'bg-blue-700 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No se encontraron servicios que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
