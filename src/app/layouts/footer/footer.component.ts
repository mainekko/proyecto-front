/**
 * ===================================================================
 * COMPONENTE: FooterComponent
 * ===================================================================
 * 
 * CONCEPTOS ANGULAR DEMOSTRADOS:
 * - Standalone component
 * - Interpolación {{ }} para mostrar datos dinámicos
 * - Expresiones en interpolación (ej: {{ anioActual }})
 * 
 * Autor: EDGAR LOPEZ ROJAS
 * ===================================================================
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-gray-900 text-gray-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

          <!-- Información de la empresa -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4">🚀 {{ nombreEmpresa }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ descripcionEmpresa }}
            </p>
          </div>

          <!-- Contacto -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4">📞 Contacto</h3>
            <ul class="space-y-2 text-sm">
              <li>📧 {{ correo }}</li>
              <li>📱 {{ telefono }}</li>
              <li>📍 {{ direccion }}</li>
            </ul>
          </div>

          <!-- Créditos académicos -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4">🎓 Proyecto Académico</h3>
            <ul class="space-y-2 text-sm">
              <li><strong>Alumno:</strong> {{ nombreAlumno }}</li>
              <li><strong>Materia:</strong> {{ materia }}</li>
              <li><strong>Entrega:</strong> {{ entrega }}</li>
            </ul>
          </div>
        </div>

        <!-- Línea divisoria y copyright -->
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          <!-- INTERPOLACIÓN con expresión: anioActual se calcula dinámicamente -->
          <p>&copy; {{ anioActual }} {{ nombreEmpresa }}. Todos los derechos reservados.</p>
          <p class="mt-1">Desarrollado con ❤️ usando Angular {{ versionAngular }} + TailwindCSS</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  // Propiedades usadas con INTERPOLACIÓN {{ }} en el template
  nombreEmpresa = 'TechServices Pro';
  descripcionEmpresa = 'Soluciones tecnológicas integrales para impulsar tu negocio al siguiente nivel. Expertos en desarrollo, diseño, marketing y consultoría digital.';
  correo = 'contacto@techservicespro.com';
  telefono = '+52 (55) 1234-5678';
  direccion = 'Ciudad de México, México';
  nombreAlumno = 'EDGAR LOPEZ ROJAS';
  materia = 'Desarrollo Front-End';
  entrega = 'Semana 7 - Entrega Final';
  versionAngular = '21';

  // Expresión JavaScript evaluada: obtiene el año actual dinámicamente
  anioActual = new Date().getFullYear();
}
