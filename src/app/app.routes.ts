/**
 * ===================================================================
 * CONFIGURACIÓN DE RUTAS - app.routes.ts
 * ===================================================================
 * 
 * CONCEPTO ANGULAR: Routing con Lazy Loading.
 * 
 * POR QUÉ LAZY LOADING:
 * En lugar de cargar TODOS los componentes cuando la app inicia,
 * loadComponent() hace que cada componente se cargue SOLO cuando
 * el usuario navega a esa ruta. Esto reduce el tamaño del bundle
 * inicial y mejora el tiempo de carga.
 * 
 * CÓMO FUNCIONA:
 * - loadComponent() usa import() dinámico (JavaScript estándar)
 * - Angular crea un "chunk" separado para cada componente lazy
 * - El chunk se descarga del servidor solo cuando se necesita
 * - :id en '/detalle/:id' es un parámetro de ruta dinámico
 * 
 * Autor: EDGAR LOPEZ ROJAS
 * Materia: Desarrollo Front-End - Semana 7
 * ===================================================================
 */

import { Routes } from '@angular/router';

export const routes: Routes = [
  /**
   * Ruta raíz: Redirige a /inicio.
   * pathMatch: 'full' asegura que SOLO la ruta vacía '' redirija,
   * no cualquier ruta que comience con ''.
   */
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  /**
   * LAZY LOADING: loadComponent() carga el componente de forma diferida.
   * import() retorna una Promise que Angular resuelve cuando se navega aquí.
   * .then(c => c.HomeComponent) extrae el componente exportado del módulo.
   */
  {
    path: 'inicio',
    loadComponent: () => import('./features/home/home.component')
      .then(c => c.HomeComponent),
    title: 'Inicio - TechServices Pro'
  },

  {
    path: 'servicios',
    loadComponent: () => import('./features/servicios/servicios.component')
      .then(c => c.ServiciosComponent),
    title: 'Catálogo de Servicios - TechServices Pro'
  },

  /**
   * PARÁMETRO DE RUTA DINÁMICO: :id
   * 
   * La parte ':id' captura cualquier valor de la URL.
   * Ejemplo: /detalle/5 → id = '5'
   * El componente DetalleComponent lee este parámetro con
   * ActivatedRoute para cargar el servicio correspondiente.
   */
  {
    path: 'detalle/:id',
    loadComponent: () => import('./features/detalle/detalle.component')
      .then(c => c.DetalleComponent),
    title: 'Detalle del Servicio - TechServices Pro'
  },

  {
    path: 'favoritos',
    loadComponent: () => import('./features/favoritos/favoritos.component')
      .then(c => c.FavoritosComponent),
    title: 'Mis Favoritos - TechServices Pro'
  },

  {
    path: 'contacto',
    loadComponent: () => import('./features/contacto/contacto.component')
      .then(c => c.ContactoComponent),
    title: 'Contacto - TechServices Pro'
  },

  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin.component')
      .then(c => c.AdminComponent),
    title: 'Panel de Administración - TechServices Pro'
  },

  /**
   * RUTA WILDCARD **: Captura cualquier ruta no definida.
   * Redirige al inicio para evitar errores 404.
   */
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
