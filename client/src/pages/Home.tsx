import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import servicesData from '@/data/services.json';
import { ServiceCard } from '@/components/ServiceCard';

/**
 * Página de Inicio
 * Diseño minimalista moderno con hero banner, servicios destacados y llamados a la acción
 */
export default function Home() {
  // Seleccionar 4 servicios destacados
  const featuredServices = servicesData.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section
        className="relative h-96 bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663097352009/ZVn6atiZ3fLKByC9hAEK6W/hero-banner-if9j2wcKMY6iQGbuXomneR.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/40"></div>

        {/* Contenido del hero */}
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Plataforma de Servicios Digitales
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Explora, descubre y conecta con servicios de calidad en educación, tecnología, turismo y comercio.
          </p>
          <Link href="/servicios">
            <Button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 text-lg">
              Explorar Servicios
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Sección de Servicios Destacados */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Servicios Destacados</h2>
          <p className="text-lg text-gray-600">
            Descubre nuestra selección de servicios más populares y mejor valorados.
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Botón para ver todos */}
        <div className="mt-12 text-center">
          <Link href="/servicios">
            <Button variant="outline" className="px-8 py-6 text-lg border-blue-700 text-blue-700 hover:bg-blue-50">
              Ver Todos los Servicios
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="bg-gray-50 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">¿Por qué elegirnos?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Beneficio 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Servicios Verificados</h3>
              <p className="text-gray-600">
                Todos nuestros proveedores son cuidadosamente seleccionados y verificados para garantizar calidad.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Plataforma Segura</h3>
              <p className="text-gray-600">
                Tu información está protegida con los más altos estándares de seguridad y privacidad.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Soporte 24/7</h3>
              <p className="text-gray-600">
                Nuestro equipo de soporte está disponible para ayudarte en cualquier momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Lo que dicen nuestros usuarios</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonio 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Excelente plataforma, encontré exactamente lo que buscaba. El proceso fue muy fácil y seguro."
              </p>
              <p className="font-semibold text-gray-900">María García</p>
              <p className="text-gray-600 text-sm">Cliente verificado</p>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Muy recomendado. El servicio fue de alta calidad y el equipo fue muy profesional."
              </p>
              <p className="font-semibold text-gray-900">Juan Pérez</p>
              <p className="text-gray-600 text-sm">Cliente verificado</p>
            </div>

            {/* Testimonio 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "La mejor plataforma que he usado. Muy intuitiva y con excelente atención al cliente."
              </p>
              <p className="font-semibold text-gray-900">Ana López</p>
              <p className="text-gray-600 text-sm">Cliente verificado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de CTA Final */}
      <section className="bg-blue-700 text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Explora miles de servicios y encuentra exactamente lo que necesitas.
          </p>
          <Link href="/servicios">
            <Button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-6 text-lg">
              Explorar Ahora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
