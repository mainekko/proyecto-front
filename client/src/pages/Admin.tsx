import { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

/**
 * Interfaz para los datos del servicio
 */
interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
}

/**
 * Página de Administración
 * Mini CRUD para gestionar servicios
 */
export default function Admin() {
  const [services, setServices] = useState<Service[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Educación',
    price: '',
    rating: '5',
    reviews: '0',
  });

  // Cargar servicios del localStorage
  useEffect(() => {
    const stored = localStorage.getItem('adminServices');
    if (stored) {
      try {
        setServices(JSON.parse(stored));
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      }
    }
  }, []);

  // Guardar servicios en localStorage
  const saveServices = (updatedServices: Service[]) => {
    localStorage.setItem('adminServices', JSON.stringify(updatedServices));
    setServices(updatedServices);
  };

  // Manejar cambios en el formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('El nombre del servicio es requerido');
      return;
    }

    if (!formData.price || isNaN(Number(formData.price))) {
      toast.error('El precio debe ser un número válido');
      return;
    }

    if (editingId !== null) {
      // Editar servicio existente
      const updated = services.map((s) =>
        s.id === editingId
          ? {
              ...s,
              name: formData.name,
              category: formData.category,
              price: Number(formData.price),
              rating: Number(formData.rating),
              reviews: Number(formData.reviews),
            }
          : s
      );
      saveServices(updated);
      toast.success('Servicio actualizado exitosamente');
    } else {
      // Crear nuevo servicio
      const newService: Service = {
        id: Math.max(...services.map((s) => s.id), 0) + 1,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
      };
      saveServices([...services, newService]);
      toast.success('Servicio creado exitosamente');
    }

    // Limpiar formulario
    setFormData({
      name: '',
      category: 'Educación',
      price: '',
      rating: '5',
      reviews: '0',
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  // Editar servicio
  const handleEdit = (service: Service) => {
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price.toString(),
      rating: service.rating.toString(),
      reviews: service.reviews.toString(),
    });
    setEditingId(service.id);
    setIsFormOpen(true);
  };

  // Eliminar servicio
  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      const updated = services.filter((s) => s.id !== id);
      saveServices(updated);
      toast.success('Servicio eliminado exitosamente');
    }
  };

  // Cancelar edición
  const handleCancel = () => {
    setFormData({
      name: '',
      category: 'Educación',
      price: '',
      rating: '5',
      reviews: '0',
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-12 px-4 md:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h1>
          <p className="text-lg text-gray-600">
            Gestiona los servicios de la plataforma
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Botón para crear nuevo servicio */}
          <div className="mb-8">
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              {isFormOpen ? 'Cancelar' : 'Crear Nuevo Servicio'}
            </Button>
          </div>

          {/* Formulario */}
          {isFormOpen && (
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Editar Servicio' : 'Crear Nuevo Servicio'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Nombre del Servicio
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nombre del servicio"
                    />
                  </div>

                  {/* Categoría */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Categoría
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Educación</option>
                      <option>Tecnología</option>
                      <option>Turismo</option>
                      <option>Comercio</option>
                    </select>
                  </div>

                  {/* Precio */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Precio
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Reviews */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Número de Reseñas
                    </label>
                    <input
                      type="number"
                      name="reviews"
                      value={formData.reviews}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3"
                  >
                    {editingId ? 'Actualizar' : 'Crear'} Servicio
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    variant="outline"
                    className="px-6 py-3"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Tabla de servicios */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Servicios ({services.length})
            </h2>

            {services.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">
                        Nombre
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">
                        Categoría
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">
                        Precio
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">
                        Reseñas
                      </th>
                      <th className="px-6 py-4 text-center font-semibold text-gray-900">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr
                        key={service.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-gray-900">{service.name}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {service.category}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          ${service.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {service.rating}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {service.reviews}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleEdit(service)}
                            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 mr-4"
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-lg">
                  No hay servicios personalizados aún. Crea uno para comenzar.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
