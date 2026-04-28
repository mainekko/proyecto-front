import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CatalogoService } from '../../core/services/catalogo.service';
import { Servicio } from '../../core/models/servicio.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900 mb-3">⚙️ Panel de Administración</h1>
        <p class="text-gray-500 text-lg">CRUD completo de servicios (Crear, Leer, Editar y Eliminar)</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              {{ modoEdicion ? '✏️ Editar Servicio' : '➕ Agregar Servicio' }}
            </h2>

            <form [formGroup]="servicioForm" (ngSubmit)="guardarServicio()" class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
                <input formControlName="nombre" type="text"
                       [ngClass]="{'border-red-500': campoInvalido('nombre')}"
                       class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
                       placeholder="Nombre del servicio">
                <p *ngIf="campoInvalido('nombre')" class="text-red-500 text-xs mt-1">
                  El nombre es obligatorio (mínimo 3 caracteres)
                </p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Categoría *</label>
                <select formControlName="categoria"
                        [ngClass]="{'border-red-500': campoInvalido('categoria')}"
                        class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all">
                  <option value="">Seleccionar...</option>
                  <option *ngFor="let cat of categoriasDisponibles" [value]="cat">{{ cat }}</option>
                </select>
                <p *ngIf="campoInvalido('categoria')" class="text-red-500 text-xs mt-1">
                  Selecciona una categoría
                </p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Descripción *</label>
                <textarea formControlName="descripcion" rows="3"
                          [ngClass]="{'border-red-500': campoInvalido('descripcion')}"
                          class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all resize-none"
                          placeholder="Resumen breve del servicio"></textarea>
                <p *ngIf="campoInvalido('descripcion')" class="text-red-500 text-xs mt-1">
                  La descripción debe tener entre 20 y 220 caracteres
                </p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Precio *</label>
                  <input formControlName="precio" type="number" min="1"
                         [ngClass]="{'border-red-500': campoInvalido('precio')}"
                         class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
                         placeholder="0">
                  <p *ngIf="campoInvalido('precio')" class="text-red-500 text-xs mt-1">Precio mayor a 0</p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Calificación *</label>
                  <input formControlName="calificacion" type="number" min="1" max="5" step="0.1"
                         [ngClass]="{'border-red-500': campoInvalido('calificacion')}"
                         class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
                         placeholder="4.8">
                  <p *ngIf="campoInvalido('calificacion')" class="text-red-500 text-xs mt-1">Valor entre 1 y 5</p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Duración *</label>
                <input formControlName="duracion" type="text"
                       [ngClass]="{'border-red-500': campoInvalido('duracion')}"
                       class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
                       placeholder="Ej: 8 semanas">
                <p *ngIf="campoInvalido('duracion')" class="text-red-500 text-xs mt-1">Campo obligatorio</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">URL de imagen *</label>
                <input formControlName="imagen" type="url"
                       [ngClass]="{'border-red-500': campoInvalido('imagen')}"
                       class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
                       placeholder="https://i.sstatic.net/52aDD.png">
                <p *ngIf="campoInvalido('imagen')" class="text-red-500 text-xs mt-1">Ingresa una URL válida</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Detalles *</label>
                <textarea formControlName="detalles" rows="3"
                          [ngClass]="{'border-red-500': campoInvalido('detalles')}"
                          class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all resize-none"
                          placeholder="Incluye beneficios, entregables y alcance..."></textarea>
                <p *ngIf="campoInvalido('detalles')" class="text-red-500 text-xs mt-1">
                  Los detalles deben tener entre 30 y 300 caracteres
                </p>
              </div>

              <div>
                <label class="flex items-center gap-3 cursor-pointer">
                  <input formControlName="disponible" type="checkbox"
                         class="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                  <span class="text-sm font-medium text-gray-700">Servicio disponible</span>
                </label>
              </div>

              <div class="flex gap-3 pt-1">
                <button type="submit"
                        [disabled]="servicioForm.invalid"
                        [ngClass]="{
                          'bg-indigo-600 hover:bg-indigo-700 shadow-md': servicioForm.valid,
                          'bg-gray-300 cursor-not-allowed': servicioForm.invalid
                        }"
                        class="flex-1 py-3 text-white font-bold rounded-xl transition-all duration-200">
                  {{ modoEdicion ? '💾 Actualizar' : '➕ Agregar' }}
                </button>

                <button *ngIf="modoEdicion"
                        type="button"
                        (click)="cancelarEdicion()"
                        class="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                  Cancelar
                </button>
              </div>
            </form>

            <div *ngIf="mensajeExito"
                 class="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p class="text-green-700 text-sm font-medium">{{ mensajeExito }}</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 class="text-lg font-bold text-gray-900">📋 Servicios Registrados ({{ servicios.length }})</h2>
            </div>

            <div *ngIf="servicios.length > 0; else sinServicios" class="divide-y divide-gray-100">
              <div *ngFor="let servicio of servicios; trackBy: trackById; let i = index"
                   class="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <span class="text-sm font-bold text-gray-400 w-8 text-center">{{ i + 1 }}</span>

                  <img [src]="servicio.imagen"
                       [alt]="servicio.nombre"
                       class="w-14 h-14 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                       loading="lazy">

                  <div class="min-w-0">
                    <h3 class="font-bold text-gray-900 text-sm truncate">{{ servicio.nombre }}</h3>
                    <div class="flex items-center flex-wrap gap-2 mt-1">
                      <span class="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-medium">
                        {{ servicio.categoria }}
                      </span>
                      <span class="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                        ⭐ {{ servicio.calificacion }}
                      </span>
                      <span [ngClass]="{
                              'text-green-600': servicio.disponible,
                              'text-red-500': !servicio.disponible
                            }"
                            class="text-xs font-medium">
                        {{ servicio.disponible ? '● Disponible' : '● No disponible' }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                  <span class="text-sm font-bold text-indigo-600">\${{ servicio.precio | number }}</span>

                  <button (click)="iniciarEdicion(servicio)"
                          class="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-all text-sm font-semibold"
                          [attr.aria-label]="'Editar ' + servicio.nombre">
                    ✏️ Editar
                  </button>

                  <button (click)="eliminarServicio(servicio.id, servicio.nombre)"
                          class="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-all text-sm font-semibold"
                          [attr.aria-label]="'Eliminar ' + servicio.nombre">
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>

            <ng-template #sinServicios>
              <div class="text-center py-16">
                <div class="text-5xl mb-4">📭</div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">No hay servicios registrados</h3>
                <p class="text-gray-500 text-sm">Usa el formulario de la izquierda para agregar el primero</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  private catalogoService = inject(CatalogoService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  servicios: Servicio[] = [];
  mensajeExito = '';
  modoEdicion = false;
  servicioEditandoId: number | null = null;

  categoriasDisponibles = this.catalogoService.categoriasRequeridas;

  servicioForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    categoria: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(220)]],
    precio: [1, [Validators.required, Validators.min(1)]],
    calificacion: [4.5, [Validators.required, Validators.min(1), Validators.max(5)]],
    imagen: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop', [Validators.required]],
    detalles: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(300)]],
    duracion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    disponible: [true]
  });

  ngOnInit(): void {
    this.catalogoService
      .cargarServicios()
      .pipe(
        switchMap(() => this.catalogoService.servicios$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(servicios => {
        this.servicios = servicios;
      });
  }

  guardarServicio(): void {
    if (this.servicioForm.invalid) {
      this.servicioForm.markAllAsTouched();
      return;
    }

    const payload = this.servicioForm.value as Omit<Servicio, 'id'>;

    if (this.modoEdicion && this.servicioEditandoId !== null) {
      this.catalogoService.actualizarServicio(this.servicioEditandoId, payload);
      this.mensajeExito = `✅ "${payload.nombre}" actualizado correctamente`;
    } else {
      this.catalogoService.agregarServicio(payload);
      this.mensajeExito = `✅ "${payload.nombre}" agregado correctamente`;
    }

    this.resetearFormulario();
    setTimeout(() => (this.mensajeExito = ''), 3000);
  }

  iniciarEdicion(servicio: Servicio): void {
    this.modoEdicion = true;
    this.servicioEditandoId = servicio.id;
    this.servicioForm.patchValue({
      nombre: servicio.nombre,
      categoria: servicio.categoria,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      calificacion: servicio.calificacion,
      imagen: servicio.imagen,
      detalles: servicio.detalles,
      duracion: servicio.duracion,
      disponible: servicio.disponible
    });
    this.servicioForm.markAsPristine();
  }

  cancelarEdicion(): void {
    this.resetearFormulario();
  }

  eliminarServicio(id: number, nombre: string): void {
    if (confirm(`¿Estás seguro de eliminar "${nombre}"?`)) {
      this.catalogoService.eliminarServicio(id);

      if (this.servicioEditandoId === id) {
        this.resetearFormulario();
      }

      this.mensajeExito = `🗑️ "${nombre}" eliminado del catálogo`;
      setTimeout(() => (this.mensajeExito = ''), 3000);
    }
  }

  campoInvalido(campo: string): boolean {
    const control = this.servicioForm.get(campo);
    return !!(control?.invalid && control?.touched);
  }

  trackById(index: number, servicio: Servicio): number {
    return servicio.id;
  }

  private resetearFormulario(): void {
    this.modoEdicion = false;
    this.servicioEditandoId = null;
    this.servicioForm.reset({
      nombre: '',
      categoria: '',
      descripcion: '',
      precio: 1,
      calificacion: 4.5,
      imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      detalles: '',
      duracion: '',
      disponible: true
    });
  }
}
