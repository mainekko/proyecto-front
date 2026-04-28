import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CatalogoService } from '../../core/services/catalogo.service';
import { FavoritosService } from '../../core/services/favoritos.service';
import { Servicio } from '../../core/models/servicio.model';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900 mb-3">⭐ Mis Favoritos</h1>
        <p class="text-gray-500 text-lg">Servicios guardados con persistencia en localStorage</p>
      </div>

      <div *ngIf="serviciosFavoritos.length > 0; else sinFavoritos">
        <div class="flex items-center justify-between mb-8 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <p class="text-gray-600">
            Tienes <strong class="text-indigo-600">{{ serviciosFavoritos.length }}</strong>
            {{ serviciosFavoritos.length === 1 ? 'servicio guardado' : 'servicios guardados' }}
          </p>
          <button (click)="limpiarTodos()"
                  class="text-red-500 hover:text-red-700 font-medium text-sm transition-colors flex items-center gap-1">
            🗑️ Limpiar todos
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let servicio of serviciosFavoritos; trackBy: trackById"
               class="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div class="relative overflow-hidden h-48">
              <img [src]="servicio.imagen"
                   [alt]="servicio.nombre"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   loading="lazy">
              <div class="absolute top-3 left-3 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">❤️</div>
            </div>

            <div class="p-6">
              <div class="flex items-center flex-wrap gap-2 mb-2">
                <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{{ servicio.categoria }}</span>
                <span class="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">⭐ {{ servicio.calificacion }}</span>
              </div>

              <h3 class="text-lg font-bold text-gray-900 mb-2">{{ servicio.nombre }}</h3>
              <p class="text-gray-500 text-sm line-clamp-2 mb-4">{{ servicio.descripcion }}</p>

              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <span class="text-xl font-extrabold text-indigo-600">\${{ servicio.precio | number }}</span>
                <div class="flex gap-2">
                  <button (click)="quitarFavorito(servicio.id)"
                          class="bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-100 transition-colors"
                          aria-label="Quitar de favoritos">
                    🗑️
                  </button>
                  <a [routerLink]="['/detalle', servicio.id]"
                     class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                    Ver Detalle
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ng-template #sinFavoritos>
        <div class="text-center py-20 bg-white rounded-2xl shadow-md">
          <div class="text-7xl mb-6">💔</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-3">No tienes favoritos aún</h2>
          <p class="text-gray-500 mb-8 max-w-md mx-auto">
            Explora el catálogo, presiona el corazón en cualquier servicio y aquí verás la persistencia funcionando.
          </p>
          <a routerLink="/servicios"
             class="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg text-lg">
            💼 Explorar Servicios
          </a>
        </div>
      </ng-template>
    </div>
  `
})
export class FavoritosComponent implements OnInit {
  private catalogoService = inject(CatalogoService);
  private favoritosService = inject(FavoritosService);
  private destroyRef = inject(DestroyRef);

  serviciosFavoritos: Servicio[] = [];

  ngOnInit(): void {
    this.catalogoService
      .cargarServicios()
      .pipe(
        switchMap(() =>
          combineLatest([
            this.catalogoService.servicios$,
            this.favoritosService.favoritos$
          ])
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(([servicios, ids]) => {
        this.serviciosFavoritos = servicios.filter(s => ids.includes(s.id));
      });
  }

  quitarFavorito(id: number): void {
    this.favoritosService.toggleFavorito(id);
  }

  limpiarTodos(): void {
    this.favoritosService.limpiarFavoritos();
  }

  trackById(index: number, servicio: Servicio): number {
    return servicio.id;
  }
}
