/**
 * ===================================================================
 * COMPONENTE: HeaderComponent
 * ===================================================================
 * 
 * CONCEPTOS ANGULAR DEMOSTRADOS:
 * - Standalone component (no necesita un NgModule)
 * - RouterLink y RouterLinkActive para navegación
 * - Event binding (click) para toggle del menú móvil
 * - Property binding [class] para clases dinámicas
 * - Interpolación {{ }} para mostrar datos
 * - *ngIf para mostrar/ocultar el menú móvil
 * 
 * Autor: EDGAR LOPEZ ROJAS
 * ===================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- ============================================================
         NAVEGACIÓN PRINCIPAL
         Usa RouterLink para navegación SPA (sin recargar la página).
         RouterLinkActive agrega una clase CSS cuando la ruta está activa.
         ============================================================ -->
    <nav class="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">

          <!-- LOGO - Usa routerLink para navegar al inicio -->
          <a routerLink="/inicio" class="flex items-center space-x-2 group">
            <span class="text-2xl">🚀</span>
            <!-- INTERPOLACIÓN {{ }}: Muestra el valor de la propiedad tituloApp -->
            <span class="text-white font-bold text-xl tracking-tight group-hover:text-indigo-200 transition-colors">
              {{ tituloApp }}
            </span>
          </a>

          <!-- NAVEGACIÓN DESKTOP -->
          <div class="hidden md:flex items-center space-x-1">
            <!--
              routerLink: Directiva que convierte un <a> en enlace de navegación Angular.
              routerLinkActive: Agrega la clase CSS especificada cuando la ruta está activa.
              [routerLinkActiveOptions]: Property binding para configurar la comparación exacta.
            -->
            <a *ngFor="let enlace of enlaces"
               [routerLink]="enlace.ruta"
               routerLinkActive="bg-white/20 !text-white"
               [routerLinkActiveOptions]="{ exact: enlace.exacto }"
               class="text-indigo-100 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              <!-- INTERPOLACIÓN para mostrar el ícono y texto de cada enlace -->
              {{ enlace.icono }} {{ enlace.texto }}
            </a>
          </div>

          <!-- BOTÓN MENÚ MÓVIL -->
          <!--
            EVENT BINDING (click): Cuando el usuario hace clic,
            se ejecuta toggleMenu() que cambia el valor de menuAbierto.
            
            PROPERTY BINDING [attr.aria-expanded]: Vincula el atributo
            aria-expanded al valor de menuAbierto para accesibilidad.
          -->
          <button
            (click)="toggleMenu()"
            [attr.aria-expanded]="menuAbierto"
            class="md:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            aria-label="Abrir menú de navegación">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <!-- *ngIf: Directiva estructural que muestra/oculta elementos según condición -->
              <path *ngIf="!menuAbierto" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path *ngIf="menuAbierto" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- MENÚ MÓVIL - Se muestra/oculta con *ngIf -->
      <div *ngIf="menuAbierto" class="md:hidden bg-indigo-800/95 backdrop-blur-sm border-t border-indigo-500/30">
        <div class="px-4 py-3 space-y-1">
          <!--
            *ngFor: Directiva estructural que itera sobre el array 'enlaces'.
            Por cada elemento, crea un <a> con los datos del enlace.
          -->
          <a *ngFor="let enlace of enlaces"
             [routerLink]="enlace.ruta"
             routerLinkActive="bg-white/20 text-white"
             [routerLinkActiveOptions]="{ exact: enlace.exacto }"
             (click)="menuAbierto = false"
             class="block text-indigo-100 hover:bg-white/10 hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-all">
            {{ enlace.icono }} {{ enlace.texto }}
          </a>
        </div>
      </div>
    </nav>
  `
})
export class HeaderComponent {
  // Propiedad usada con INTERPOLACIÓN {{ tituloApp }} en el template
  tituloApp = 'TechServices Pro';

  // Controla si el menú móvil está abierto o cerrado
  menuAbierto = false;

  // Array de enlaces de navegación - iterado con *ngFor en el template
  enlaces = [
    { ruta: '/inicio',     texto: 'Inicio',     icono: '🏠', exacto: true },
    { ruta: '/servicios',  texto: 'Servicios',  icono: '💼', exacto: false },
    { ruta: '/favoritos',  texto: 'Favoritos',  icono: '⭐', exacto: true },
    { ruta: '/contacto',   texto: 'Contacto',   icono: '📧', exacto: true },
    { ruta: '/admin',      texto: 'Admin',      icono: '⚙️', exacto: true }
  ];

  /**
   * EVENT BINDING: Esta función se ejecuta cuando el usuario
   * hace clic en el botón de menú móvil via (click)="toggleMenu()".
   */
  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }
}
