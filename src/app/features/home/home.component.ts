/**
 * ===================================================================
 * COMPONENTE: HomeComponent (Página de Inicio)
 * ===================================================================
 * 
 * CONCEPTOS ANGULAR DEMOSTRADOS:
 * - Standalone component con imports de CommonModule
 * - inject() para inyección de dependencias moderna
 * - OnInit lifecycle hook: se ejecuta después de que Angular
 *   inicializa las propiedades del componente
 * - *ngFor para iterar y mostrar listas de datos
 * - *ngIf para renderizado condicional
 * - Interpolación {{ }} para mostrar propiedades en el template
 * - Property binding [routerLink] para navegación dinámica
 * - Event binding (click) para acciones del usuario
 * - *ngClass para aplicar clases CSS condicionalmente
 * 
 * Autor: EDGAR LOPEZ ROJAS
 * Materia: Desarrollo Front-End - Semana 7
 * ===================================================================
 */

import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CatalogoService } from '../../core/services/catalogo.service';
import { Servicio } from '../../core/models/servicio.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- ============================================================
         HERO SECTION
         Demuestra: Interpolación {{ }}, Event Binding (click)
         ============================================================ -->
    <section class="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
      <!-- Decoración de fondo -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            <!-- INTERPOLACIÓN {{ }}: Muestra el valor de la propiedad tituloHero -->
            {{ tituloHero }}
          </h1>
          <p class="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            {{ subtituloHero }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <!--
              PROPERTY BINDING [routerLink]: Vincula el atributo routerLink
              a un valor dinámico (en este caso un string fijo, pero podría
              ser una variable).
            -->
            <a [routerLink]="['/servicios']"
               class="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg">
              💼 Ver Servicios
            </a>
            <!--
              EVENT BINDING (click): Cuando el usuario hace clic,
              ejecuta scrollToDestacados() que desplaza la página.
            -->
            <button (click)="scrollToDestacados()"
                    class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg">
              ⭐ Destacados
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         ESTADÍSTICAS
         Demuestra: *ngFor para iterar sobre un array de estadísticas
         ============================================================ -->
    <section class="bg-white py-12 -mt-8 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <!--
            *ngFor: Directiva estructural que REPITE este <div> por cada
            elemento en el array 'estadisticas'. La variable 'stat' representa
            el elemento actual de la iteración.
          -->
          <div *ngFor="let stat of estadisticas"
               class="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm">
            <div class="text-3xl mb-2">{{ stat.icono }}</div>
            <!-- INTERPOLACIÓN con propiedad del objeto iterado -->
            <div class="text-3xl font-extrabold text-indigo-600">{{ stat.valor }}</div>
            <div class="text-gray-500 text-sm mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SERVICIOS DESTACADOS
         Demuestra: *ngFor, *ngIf, *ngClass, Property Binding,
         Event Binding, Interpolación
         ============================================================ -->
    <section id="destacados" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🌟 Servicios Destacados
          </h2>
          <p class="text-gray-500 text-lg max-w-2xl mx-auto">
            Descubre nuestras soluciones más populares y comienza a transformar tu negocio
          </p>
        </div>

        <!-- *ngIf: Muestra el grid SOLO si hay servicios destacados cargados -->
        <div *ngIf="serviciosDestacados.length > 0; else cargando"
             class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <!--
            *ngFor con índice: 'let i = index' captura la posición del elemento.
            Útil para aplicar estilos o lógica según la posición.
          -->
          <div *ngFor="let servicio of serviciosDestacados; let i = index"
               class="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">

            <!-- Imagen del servicio -->
            <div class="relative overflow-hidden h-48">
              <!--
                PROPERTY BINDING [src]: Vincula el atributo src del <img>
                al valor de servicio.imagen. Si el valor cambia en el
                componente, la imagen se actualiza automáticamente.
                
                [alt]: Vincula el atributo alt al nombre del servicio.
              -->
              <img [src]="servicio.imagen"
                   [alt]="servicio.nombre"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   loading="lazy">
              <!--
                *ngClass: Directiva que aplica clases CSS condicionalmente.
                Si servicio.disponible es true, aplica las clases de verde.
                Si es false, aplica las clases de rojo.
              -->
              <span [ngClass]="{
                      'bg-green-500': servicio.disponible,
                      'bg-red-500': !servicio.disponible
                    }"
                    class="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {{ servicio.disponible ? '✅ Disponible' : '❌ No disponible' }}
              </span>
            </div>

            <div class="p-6">
              <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {{ servicio.categoria }}
              </span>
              <h3 class="text-xl font-bold text-gray-900 mt-3 mb-2 group-hover:text-indigo-600 transition-colors">
                {{ servicio.nombre }}
              </h3>
              <p class="text-gray-500 text-sm leading-relaxed line-clamp-2">
                {{ servicio.descripcion }}
              </p>
              <div class="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                <div>
                  <span class="text-2xl font-extrabold text-indigo-600">
                    \${{ servicio.precio | number }}
                  </span>
                  <span class="text-gray-400 text-sm ml-1">MXN</span>
                </div>
                <!--
                  PROPERTY BINDING [routerLink] con valor dinámico:
                  Construye la ruta usando el ID del servicio.
                  ['/detalle', servicio.id] genera '/detalle/5' por ejemplo.
                -->
                <a [routerLink]="['/detalle', servicio.id]"
                   class="text-indigo-600 hover:text-indigo-800 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Ver más →
                </a>
              </div>
            </div>
          </div>
        </div>

        <!--
          ng-template #cargando: Template alternativo que se muestra
          cuando la condición del *ngIf es false (no hay servicios aún).
          'else cargando' referencia este template por su nombre.
        -->
        <ng-template #cargando>
          <div class="text-center py-16">
            <div class="animate-spin text-5xl mb-4">⏳</div>
            <p class="text-gray-500 text-lg">Cargando servicios destacados...</p>
          </div>
        </ng-template>

        <!-- Botón para ver todos los servicios -->
        <div class="text-center mt-12">
          <a [routerLink]="['/servicios']"
             class="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
            Ver Catálogo Completo →
          </a>
        </div>
      </div>
    </section>

    <!-- ============================================================
         CATEGORÍAS - Por qué elegirnos
         ============================================================ -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
          ¿Por qué elegirnos?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div *ngFor="let ventaja of ventajas"
               class="text-center p-8 rounded-2xl hover:bg-indigo-50 transition-colors duration-300 border border-transparent hover:border-indigo-100">
            <div class="text-5xl mb-4">{{ ventaja.icono }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ ventaja.titulo }}</h3>
            <p class="text-gray-500 leading-relaxed">{{ ventaja.descripcion }}</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  /**
   * inject(): Forma moderna de inyectar el CatalogoService.
   * Angular busca la instancia singleton del servicio y la asigna aquí.
   */
  private catalogoService = inject(CatalogoService);
  private destroyRef = inject(DestroyRef);

  // Propiedades mostradas con INTERPOLACIÓN en el hero section
  tituloHero = 'Impulsa tu Negocio con Tecnología de Vanguardia';
  subtituloHero = 'Conecta con servicios profesionales en Educación, Tecnología, Turismo y Comercio para impulsar tus metas.';

  // Array de servicios destacados - se llena en ngOnInit
  serviciosDestacados: Servicio[] = [];

  // Arrays para las secciones de estadísticas y ventajas
  estadisticas = [
    { icono: '🏆', valor: '150+', label: 'Proyectos Completados' },
    { icono: '😊', valor: '98%',  label: 'Clientes Satisfechos' },
    { icono: '👨‍💻', valor: '25+',  label: 'Profesionales' },
    { icono: '🌎', valor: '10+',  label: 'Países Atendidos' }
  ];

  ventajas = [
    {
      icono: '🎯',
      titulo: 'Enfoque Personalizado',
      descripcion: 'Cada proyecto es único. Adaptamos nuestras soluciones a las necesidades específicas de tu negocio.'
    },
    {
      icono: '⚡',
      titulo: 'Entrega Ágil',
      descripcion: 'Metodologías ágiles que aseguran entregas incrementales y resultados rápidos.'
    },
    {
      icono: '🔒',
      titulo: 'Calidad Garantizada',
      descripcion: 'Estándares de calidad internacionales y pruebas exhaustivas en cada entrega.'
    },
    {
      icono: '🤝',
      titulo: 'Soporte Continuo',
      descripcion: 'Acompañamiento post-proyecto con soporte técnico y actualizaciones incluidas.'
    }
  ];

  /**
   * ngOnInit(): Lifecycle hook que se ejecuta UNA VEZ después de que
   * Angular inicializa las propiedades del componente.
   * 
   * POR QUÉ AQUÍ Y NO EN EL CONSTRUCTOR:
   * El constructor debe ser ligero (solo asignaciones).
   * Las operaciones asíncronas (como cargar datos) van en ngOnInit.
   */
  ngOnInit(): void {
    this.catalogoService
      .cargarServicios()
      .pipe(
        switchMap(() => this.catalogoService.servicios$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (servicios) => {
          this.serviciosDestacados = servicios
            .filter(s => s.disponible)
            .slice(0, 6);
        },
        error: (err) => console.error('Error cargando servicios:', err)
      });
  }

  /**
   * Desplaza la página suavemente hasta la sección de destacados.
   * Se activa con EVENT BINDING (click)="scrollToDestacados()".
   */
  scrollToDestacados(): void {
    document.getElementById('destacados')?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
