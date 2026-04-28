/**
 * ===================================================================
 * COMPONENTE RAÍZ: AppComponent
 * ===================================================================
 * 
 * CONCEPTO ANGULAR: Componente raíz que contiene el layout principal.
 * 
 * POR QUÉ: Es el primer componente que Angular renderiza. Contiene
 * la estructura general de la página (header, contenido, footer).
 * <router-outlet> es donde Angular inserta el componente de la ruta activa.
 * 
 * Autor: EDGAR LOPEZ ROJAS
 * ===================================================================
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <!-- Header fijo en la parte superior -->
    <app-header />

    <!-- 
      ROUTER-OUTLET: Punto de inserción dinámico.
      Angular reemplaza esta etiqueta con el componente
      correspondiente a la ruta actual.
      Ejemplo: /servicios → inserta ServiciosComponent aquí.
    -->
    <main class="min-h-screen bg-gray-50">
      <router-outlet />
    </main>

    <!-- Footer fijo en la parte inferior -->
    <app-footer />
  `
})
export class AppComponent {
  title = 'TechServices Pro';
}
