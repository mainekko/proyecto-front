import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CatalogoService } from '../../core/services/catalogo.service';
import { FavoritosService } from '../../core/services/favoritos.service';
import { Servicio } from '../../core/models/servicio.model';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <a routerLink="/servicios"
         class="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-8 group transition-colors">
        <span class="group-hover:-translate-x-1 transition-transform">←</span> Volver al catálogo
      </a>

      <div *ngIf="mensajeFavorito" class="mb-4 bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-indigo-700 text-sm font-medium text-center">
        {{ mensajeFavorito }}
      </div>

      <div *ngIf="servicio; else noEncontrado">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div class="relative h-64 md:h-96">
            <img [src]="servicio.imagen" [alt]="servicio.nombre" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <div class="absolute bottom-0 left-0 right-0 p-8">
              <span [ngClass]="{'bg-green-500': servicio.disponible, 'bg-red-500': !servicio.disponible}"
                    class="text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                {{ servicio.disponible ? '✅ Disponible' : '❌ No disponible' }}
              </span>
              <h1 class="text-3xl md:text-4xl font-extrabold text-white mt-3">{{ servicio.nombre }}</h1>
            </div>
          </div>

          <div class="p-8 md:p-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div class="bg-indigo-50 rounded-xl p-5 text-center">
                <div class="text-sm text-indigo-600 font-medium mb-1">Categoría</div>
                <div class="text-base font-bold text-gray-900">{{ servicio.categoria }}</div>
              </div>
              <div class="bg-green-50 rounded-xl p-5 text-center">
                <div class="text-sm text-green-600 font-medium mb-1">Precio</div>
                <div class="text-base font-bold text-gray-900">\${{ servicio.precio | number }}</div>
              </div>
              <div class="bg-purple-50 rounded-xl p-5 text-center">
                <div class="text-sm text-purple-600 font-medium mb-1">Duración</div>
                <div class="text-base font-bold text-gray-900">{{ servicio.duracion }}</div>
              </div>
              <div class="bg-amber-50 rounded-xl p-5 text-center">
                <div class="text-sm text-amber-600 font-medium mb-1">Calificación</div>
                <div class="text-base font-bold text-gray-900">⭐ {{ servicio.calificacion }}</div>
              </div>
            </div>

            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">📋 Descripción</h2>
              <p class="text-gray-600 text-lg leading-relaxed">{{ servicio.descripcion }}</p>
            </div>

            <div class="mb-8 bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h2 class="text-xl font-bold text-gray-900 mb-2">🧩 Detalles del servicio</h2>
              <p class="text-gray-600 leading-relaxed">{{ servicio.detalles }}</p>
            </div>

            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">✅ ¿Qué incluye?</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div *ngFor="let item of caracteristicas" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span class="text-green-500 text-lg">✓</span>
                  <span class="text-gray-700">{{ item }}</span>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <button (click)="toggleFavorito()"
                      [ngClass]="{
                        'bg-red-500 hover:bg-red-600 text-white': esFavorito,
                        'bg-gray-100 hover:bg-gray-200 text-gray-700': !esFavorito
                      }"
                      class="flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-sm">
                {{ esFavorito ? '❤️ En Favoritos' : '🤍 Agregar a Favoritos' }}
              </button>

              <a [routerLink]="['/contacto']"
                 class="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-sm text-center">
                📧 Solicitar Servicio
              </a>
            </div>
          </div>
        </div>

        <div *ngIf="serviciosRelacionados.length > 0" class="mt-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">🔗 Servicios Relacionados</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a *ngFor="let rel of serviciosRelacionados"
               [routerLink]="['/detalle', rel.id]"
               class="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1 block">
              <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{{ rel.categoria }}</span>
              <h3 class="font-bold text-gray-900 mt-3 mb-1">{{ rel.nombre }}</h3>
              <p class="text-gray-500 text-xs mb-2">⭐ {{ rel.calificacion }}</p>
              <p class="text-indigo-600 font-bold">\${{ rel.precio | number }}</p>
            </a>
          </div>
        </div>
      </div>

      <ng-template #noEncontrado>
        <div *ngIf="cargado" class="text-center py-20 bg-white rounded-2xl shadow-md">
          <div class="text-6xl mb-4">😕</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Servicio no encontrado</h2>
          <p class="text-gray-500 mb-6">El servicio que buscas no existe o fue eliminado</p>
          <a routerLink="/servicios"
             class="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            Ver todos los servicios
          </a>
        </div>
        <div *ngIf="!cargado" class="text-center py-20">
          <div class="animate-spin text-5xl">⏳</div>
          <p class="text-gray-500 mt-4">Cargando servicio...</p>
        </div>
      </ng-template>
    </div>
  `
})
export class DetalleComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private catalogoService = inject(CatalogoService);
  private favoritosService = inject(FavoritosService);
  private destroyRef = inject(DestroyRef);

  servicio: Servicio | undefined;
  serviciosRelacionados: Servicio[] = [];
  esFavorito = false;
  cargado = false;
  mensajeFavorito = '';
  private mensajeTimeoutId: ReturnType<typeof setTimeout> | null = null;

  caracteristicas = [
    'Consulta inicial gratuita',
    'Plan de trabajo detallado',
    'Revisiones y ajustes incluidos',
    'Entregables documentados',
    'Soporte post-entrega 30 días',
    'Garantía de satisfacción'
  ];

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => Number(params.get('id'))),
        switchMap(id =>
          this.catalogoService.cargarServicios().pipe(
            map(() => id)
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(id => {
        this.cargarServicio(id);
      });
  }

  ngOnDestroy(): void {
    if (this.mensajeTimeoutId) {
      clearTimeout(this.mensajeTimeoutId);
    }
  }

  private cargarServicio(id: number): void {
    this.cargado = false;
    this.servicio = this.catalogoService.obtenerServicioPorId(id);
    this.cargado = true;

    if (this.servicio) {
      this.esFavorito = this.favoritosService.esFavorito(id);
      this.serviciosRelacionados = this.catalogoService.obtenerServicios()
        .filter(s => s.categoria === this.servicio!.categoria && s.id !== id)
        .slice(0, 3);
    } else {
      this.serviciosRelacionados = [];
    }
  }

  toggleFavorito(): void {
    if (!this.servicio) {
      return;
    }

    const yaEraFavorito = this.favoritosService.esFavorito(this.servicio.id);
    this.favoritosService.toggleFavorito(this.servicio.id);
    this.esFavorito = !yaEraFavorito;
    this.mensajeFavorito = yaEraFavorito
      ? `💔 "${this.servicio.nombre}" salió de tus favoritos.`
      : `❤️ "${this.servicio.nombre}" se agregó a favoritos.`;

    if (this.mensajeTimeoutId) {
      clearTimeout(this.mensajeTimeoutId);
    }

    this.mensajeTimeoutId = setTimeout(() => {
      this.mensajeFavorito = '';
    }, 2200);
  }
}
