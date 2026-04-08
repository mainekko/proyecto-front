import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

/**
 * Página de Contacto
 * Formulario para que los usuarios se comuniquen con la plataforma
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Validar email
   */
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validar formulario
   */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Manejar cambios en el formulario
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Manejar envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor completa todos los campos correctamente');
      return;
    }

    setIsSubmitting(true);

    // Simular envío del formulario
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Guardar mensaje en localStorage (para demostración)
      const messages = JSON.parse(localStorage.getItem('messages') || '[]');
      messages.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('messages', JSON.stringify(messages));

      setIsSubmitted(true);
      toast.success('¡Mensaje enviado exitosamente!');

      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error('Error al enviar el mensaje');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
          <p className="text-lg text-gray-600">
            ¿Tienes preguntas? Nos encantaría saber de ti. Envíanos un mensaje y
            nos pondremos en contacto lo antes posible.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Información de contacto */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Información de Contacto
              </h2>

              <div className="space-y-8">
                {/* Teléfono */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Teléfono</h3>
                    <p className="text-gray-600">+57 300 000 0000</p>
                    <p className="text-gray-600">Lunes - Viernes, 9am - 6pm</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">info@plataforma.com</p>
                    <p className="text-gray-600">Respuesta en 24 horas</p>
                  </div>
                </div>

                {/* Dirección */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Dirección</h3>
                    <p className="text-gray-600">Calle Principal 123</p>
                    <p className="text-gray-600">Bogotá, Colombia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="md:col-span-2">
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-900 mb-2">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-green-700 mb-4">
                    Gracias por tu mensaje. Nos pondremos en contacto pronto.
                  </p>
                  <p className="text-sm text-green-600">
                    Redirigiendo al formulario en 3 segundos...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tu nombre"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Asunto */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Asunto de tu mensaje"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tu mensaje aquí..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Botón de envío */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 text-lg"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
