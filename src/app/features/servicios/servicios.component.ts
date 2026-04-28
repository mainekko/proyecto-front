import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CatalogoService } from '../../core/services/catalogo.service';
import { FavoritosService } from '../../core/services/favoritos.service';
import { Servicio } from '../../core/models/servicio.model';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900 mb-3">💼 Catálogo de Servicios</h1>
        <p class="text-gray-500 text-lg">Filtra por categoría, busca por nombre y guarda tus favoritos</p>
      </div>

      <div *ngIf="mensajeFavorito" class="mb-4 bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-indigo-700 text-sm font-medium text-center">
        {{ mensajeFavorito }}
      </div>

      <div class="bg-white rounded-2xl shadow-md p-6 mb-10 border border-gray-100">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="flex-1">
            <label for="busqueda" class="block text-sm font-semibold text-gray-700 mb-2">🔍 Buscar servicio</label>
            <input
              id="busqueda"
              type="text"
              [(ngModel)]="terminoBusqueda"
              (ngModelChange)="filtrarServicios()"
              placeholder="Escribe nombre, categoría o descripción..."
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-700">
          </div>

          <div class="lg:w-auto">
            <span class="block text-sm font-semibold text-gray-700 mb-2">📂 Categoría</span>
            <div class="flex flex-wrap gap-2">
              <button *ngFor="let cat of categorias"
                      (click)="filtrarPorCategoria(cat)"
                      [ngClass]="{
                        'bg-indigo-600 text-white shadow-md': categoriaActiva === cat,
                        'bg-gray-100 text-gray-600 hover:bg-gray-200': categoriaActiva !== cat
                      }"
                      class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                {{ cat }}
              </button>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <p class="text-sm text-gray-500">
            Mostrando <strong class="text-indigo-600">{{ serviciosFiltrados.length }}</strong>
            de {{ todosLosServicios.length }} servicios
          </p>
          <button *ngIf="categoriaActiva !== 'Todas' || terminoBusqueda"
                  (click)="limpiarFiltros()"
                  class="text-sm text-red-500 hover:text-red-700 font-medium transition-colors whitespace-nowrap">
            ✕ Limpiar filtros
          </button>
        </div>
      </div>

      <div *ngIf="serviciosFiltrados.length > 0; else sinResultados"
           class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div *ngFor="let servicio of serviciosFiltrados; trackBy: trackById"
             class="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
          <div class="relative overflow-hidden h-48">
            <img [src]="servicio.imagen"
                 [alt]="servicio.nombre"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 loading="lazy">

            <button (click)="toggleFavorito(servicio)"
                    [ngClass]="{
                      'bg-red-500 text-white': esFavorito(servicio.id),
                      'bg-white/80 text-gray-600 hover:bg-white': !esFavorito(servicio.id)
                    }"
                    class="absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 backdrop-blur-sm"
                    [attr.aria-label]="esFavorito(servicio.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'">
              {{ esFavorito(servicio.id) ? '❤️' : '🤍' }}
            </button>

            <span [ngClass]="{'bg-green-500': servicio.disponible, 'bg-red-500': !servicio.disponible}"
                  class="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              {{ servicio.disponible ? 'Disponible' : 'No disponible' }}
            </span>
          </div>

          <div class="p-6">
            <div class="flex items-center flex-wrap gap-2 mb-3">
              <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{{ servicio.categoria }}</span>
              <span class="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">⭐ {{ servicio.calificacion }}</span>
              <span class="text-xs text-gray-400">{{ servicio.duracion }}</span>
            </div>

            <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{{ servicio.nombre }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{{ servicio.descripcion }}</p>

            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <span class="text-xl font-extrabold text-indigo-600">\${{ servicio.precio | number }}</span>
              <a [routerLink]="['/detalle', servicio.id]"
                 class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
                Ver Detalle
              </a>
            </div>
          </div>
        </div>
      </div>

      <ng-template #sinResultados>
        <div class="text-center py-20 bg-white rounded-2xl shadow-md">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">No se encontraron servicios</h3>
          <p class="text-gray-500 mb-6">Intenta con otros términos de búsqueda o cambia la categoría</p>
          <button (click)="limpiarFiltros()"
                  class="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            Mostrar todos los servicios
          </button>
        </div>
      </ng-template>
    </div>
  `
})
export class ServiciosComponent implements OnInit, OnDestroy {
  private catalogoService = inject(CatalogoService);
  private favoritosService = inject(FavoritosService);
  private destroyRef = inject(DestroyRef);

  todosLosServicios: Servicio[] = [];
  serviciosFiltrados: Servicio[] = [];
  categorias: string[] = ['Todas'];

  terminoBusqueda = '';
  categoriaActiva = 'Todas';

  mensajeFavorito = '';
  private mensajeTimeoutId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.catalogoService
      .cargarServicios()
      .pipe(
        switchMap(() => this.catalogoService.servicios$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(servicios => {
        this.todosLosServicios = servicios;
        this.categorias = ['Todas', ...this.catalogoService.obtenerCategorias()];
        this.filtrarServicios();
      });
  }

  ngOnDestroy(): void {
    if (this.mensajeTimeoutId) {
      clearTimeout(this.mensajeTimeoutId);
    }
  }

  filtrarServicios(): void {
    let resultado = this.todosLosServicios;

    if (this.categoriaActiva !== 'Todas') {
      resultado = resultado.filter(s => s.categoria === this.categoriaActiva);
    }

    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      resultado = resultado.filter(s =>
        s.nombre.toLowerCase().includes(termino) ||
        s.descripcion.toLowerCase().includes(termino) ||
        s.categoria.toLowerCase().includes(termino)
      );
    }

    this.serviciosFiltrados = resultado;
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    this.filtrarServicios();
  }

  limpiarFiltros(): void {
    this.terminoBusqueda = '';
    this.categoriaActiva = 'Todas';
    this.filtrarServicios();
  }

  toggleFavorito(servicio: Servicio): void {
    const yaEraFavorito = this.favoritosService.esFavorito(servicio.id);
    this.favoritosService.toggleFavorito(servicio.id);

    this.mensajeFavorito = yaEraFavorito
      ? `💔 "${servicio.nombre}" se quitó de favoritos.`
      : `❤️ "${servicio.nombre}" se agregó a favoritos.`;

    if (this.mensajeTimeoutId) {
      clearTimeout(this.mensajeTimeoutId);
    }

    this.mensajeTimeoutId = setTimeout(() => {
      this.mensajeFavorito = '';
    }, 2200);
  }

  esFavorito(id: number): boolean {
    return this.favoritosService.esFavorito(id);
  }

  trackById(index: number, servicio: Servicio): number {
    return servicio.id;
  }
}
