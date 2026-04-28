import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900 mb-3">📧 Contáctanos</h1>
        <p class="text-gray-500 text-lg">Compártenos tu necesidad y te responderemos en menos de 24 horas</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
            <h2 class="text-xl font-bold mb-6">Información de Contacto</h2>
            <div class="space-y-5">
              <div class="flex items-start gap-3">
                <span class="text-2xl">📧</span>
                <div>
                  <p class="font-medium">Email</p>
                  <p class="text-indigo-200 text-sm">contacto&#64;plataformaservicios.com</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-2xl">📱</span>
                <div>
                  <p class="font-medium">Teléfono</p>
                  <p class="text-indigo-200 text-sm">+57 300 123 4567</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-2xl">📍</span>
                <div>
                  <p class="font-medium">Ubicación</p>
                  <p class="text-indigo-200 text-sm">Bogotá, Colombia</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-2xl">🕐</span>
                <div>
                  <p class="font-medium">Horario</p>
                  <p class="text-indigo-200 text-sm">Lun - Vie: 8:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <form [formGroup]="contactoForm" (ngSubmit)="enviarFormulario()" novalidate>
              <div class="mb-6">
                <label for="nombre" class="block text-sm font-semibold text-gray-700 mb-2">Nombre completo *</label>
                <input
                  id="nombre"
                  type="text"
                  formControlName="nombre"
                  [ngClass]="{'border-red-500 ring-red-300': campoInvalido('nombre')}"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Ej: Edgar López Rojas">
                <div *ngIf="campoInvalido('nombre')" class="mt-2 space-y-1">
                  <p *ngIf="contactoForm.get('nombre')?.hasError('required')" class="text-red-500 text-sm">⚠️ El nombre es obligatorio.</p>
                  <p *ngIf="contactoForm.get('nombre')?.hasError('minlength')" class="text-red-500 text-sm">⚠️ Debe tener mínimo 3 caracteres.</p>
                  <p *ngIf="contactoForm.get('nombre')?.hasError('maxlength')" class="text-red-500 text-sm">⚠️ No puede superar 60 caracteres.</p>
                </div>
              </div>

              <div class="mb-6">
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico *</label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  [ngClass]="{'border-red-500 ring-red-300': campoInvalido('email')}"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Ej: edgar&#64;ejemplo.com">
                <div *ngIf="campoInvalido('email')" class="mt-2 space-y-1">
                  <p *ngIf="contactoForm.get('email')?.hasError('required')" class="text-red-500 text-sm">⚠️ El correo es obligatorio.</p>
                  <p *ngIf="contactoForm.get('email')?.hasError('email')" class="text-red-500 text-sm">⚠️ Escribe un correo válido (usuario&#64;dominio.com).</p>
                  <p *ngIf="contactoForm.get('email')?.hasError('maxlength')" class="text-red-500 text-sm">⚠️ El correo es demasiado largo.</p>
                </div>
              </div>

              <div class="mb-6">
                <label for="telefono" class="block text-sm font-semibold text-gray-700 mb-2">Teléfono *</label>
                <input
                  id="telefono"
                  type="tel"
                  formControlName="telefono"
                  [ngClass]="{'border-red-500 ring-red-300': campoInvalido('telefono')}"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Ej: 3001234567">
                <div *ngIf="campoInvalido('telefono')" class="mt-2 space-y-1">
                  <p *ngIf="contactoForm.get('telefono')?.hasError('required')" class="text-red-500 text-sm">⚠️ El teléfono es obligatorio.</p>
                  <p *ngIf="contactoForm.get('telefono')?.hasError('pattern')" class="text-red-500 text-sm">⚠️ Solo se permiten entre 10 y 13 dígitos numéricos.</p>
                </div>
              </div>

              <div class="mb-6">
                <label for="servicio" class="block text-sm font-semibold text-gray-700 mb-2">Servicio de interés *</label>
                <select
                  id="servicio"
                  formControlName="servicio"
                  [ngClass]="{'border-red-500 ring-red-300': campoInvalido('servicio')}"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                  <option value="">-- Selecciona una opción --</option>
                  <option *ngFor="let opcion of opcionesServicio" [value]="opcion">{{ opcion }}</option>
                </select>
                <div *ngIf="campoInvalido('servicio')" class="mt-2">
                  <p *ngIf="contactoForm.get('servicio')?.hasError('required')" class="text-red-500 text-sm">⚠️ Debes seleccionar un servicio.</p>
                </div>
              </div>

              <div class="mb-6">
                <label for="mensaje" class="block text-sm font-semibold text-gray-700 mb-2">Mensaje *</label>
                <textarea
                  id="mensaje"
                  formControlName="mensaje"
                  rows="5"
                  [ngClass]="{'border-red-500 ring-red-300': campoInvalido('mensaje')}"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                  placeholder="Describe tu proyecto, alcance y tiempos esperados..."></textarea>
                <div *ngIf="campoInvalido('mensaje')" class="mt-2 space-y-1">
                  <p *ngIf="contactoForm.get('mensaje')?.hasError('required')" class="text-red-500 text-sm">⚠️ El mensaje es obligatorio.</p>
                  <p *ngIf="contactoForm.get('mensaje')?.hasError('minlength')" class="text-red-500 text-sm">⚠️ Debe tener al menos 20 caracteres.</p>
                  <p *ngIf="contactoForm.get('mensaje')?.hasError('maxlength')" class="text-red-500 text-sm">⚠️ No puede exceder 500 caracteres.</p>
                </div>
                <p class="text-xs text-gray-400 mt-1 text-right">{{ contactoForm.get('mensaje')?.value?.length || 0 }} / 500</p>
              </div>

              <button
                type="submit"
                [disabled]="contactoForm.invalid || enviando"
                [ngClass]="{
                  'bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-lg hover:shadow-xl': contactoForm.valid && !enviando,
                  'bg-indigo-400 cursor-wait': enviando,
                  'bg-gray-300 cursor-not-allowed': contactoForm.invalid && !enviando
                }"
                class="w-full py-4 text-white font-bold rounded-xl text-lg transition-all duration-200">
                {{ enviando ? '⏳ Enviando...' : '📤 Enviar Mensaje' }}
              </button>
            </form>

            <div *ngIf="feedbackVisible"
                 [ngClass]="{
                   'bg-green-50 border-green-200 text-green-700': feedbackTipo === 'success',
                   'bg-red-50 border-red-200 text-red-700': feedbackTipo === 'error'
                 }"
                 class="mt-6 border rounded-xl p-4 text-center">
              <p class="font-semibold">{{ feedbackMensaje }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactoComponent implements OnDestroy {
  private fb = inject(FormBuilder);

  enviando = false;
  feedbackVisible = false;
  feedbackMensaje = '';
  feedbackTipo: 'success' | 'error' = 'success';
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  opcionesServicio = [
    'Educación',
    'Tecnología',
    'Turismo',
    'Comercio',
    'Otro'
  ];

  contactoForm: FormGroup = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60)
    ]],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100)
    ]],
    telefono: ['', [
      Validators.required,
      Validators.pattern(/^\d{10,13}$/)
    ]],
    servicio: ['', [Validators.required]],
    mensaje: ['', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(500)
    ]]
  });

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  campoInvalido(campo: string): boolean {
    const control = this.contactoForm.get(campo);
    return !!(control?.invalid && control?.touched);
  }

  enviarFormulario(): void {
    this.feedbackVisible = false;

    if (this.contactoForm.invalid) {
      this.contactoForm.markAllAsTouched();
      this.feedbackTipo = 'error';
      this.feedbackMensaje = '⚠️ Revisa los campos marcados antes de enviar.';
      this.feedbackVisible = true;
      return;
    }

    this.enviando = true;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.enviando = false;
      this.feedbackTipo = 'success';
      this.feedbackMensaje = '✅ Mensaje enviado con éxito. Te contactaremos pronto.';
      this.feedbackVisible = true;
      this.contactoForm.reset();
    }, 1200);
  }
}
