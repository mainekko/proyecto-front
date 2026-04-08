import { Mail, Phone, MapPin } from 'lucide-react';

/**
 * Componente de Footer
 * Información de contacto y enlaces útiles
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Información de la empresa */}
          <div>
            <h3 className="text-lg font-bold mb-4">Plataforma de Servicios</h3>
            <p className="text-gray-400 text-sm">
              Conectando usuarios con servicios digitales de calidad en educación, tecnología, turismo y comercio.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/servicios" className="text-gray-400 hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="/favoritos" className="text-gray-400 hover:text-white transition-colors">
                  Favoritos
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categorías</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/servicios" className="text-gray-400 hover:text-white transition-colors">
                  Educación
                </a>
              </li>
              <li>
                <a href="/servicios" className="text-gray-400 hover:text-white transition-colors">
                  Tecnología
                </a>
              </li>
              <li>
                <a href="/servicios" className="text-gray-400 hover:text-white transition-colors">
                  Turismo
                </a>
              </li>
              <li>
                <a href="/servicios" className="text-gray-400 hover:text-white transition-colors">
                  Comercio
                </a>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-gray-400">+57 300 000 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-gray-400">info@plataforma.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span className="text-gray-400">Bogotá, Colombia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Plataforma de Servicios Digitales. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
