/**
 * ===================================================================
 * CONFIGURACIÓN DE LA APLICACIÓN - app.config.ts
 * ===================================================================
 * 
 * CONCEPTO ANGULAR: ApplicationConfig y proveedores.
 * 
 * POR QUÉ: En Angular 17+, en lugar de un AppModule, usamos
 * una función de configuración que registra los "providers" globales.
 * Providers son servicios que Angular inyecta donde se necesiten.
 * 
 * CÓMO:
 * - provideRouter(): Configura el sistema de rutas
 * - provideHttpClient(): Habilita HttpClient para peticiones HTTP
 * - withFetch(): Usa la API Fetch nativa en lugar de XMLHttpRequest
 * 
 * Autor: EDGAR LOPEZ ROJAS
 * ===================================================================
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Registra las rutas definidas en app.routes.ts
    provideRouter(routes),
    // Habilita HttpClient con la API Fetch moderna del navegador
    provideHttpClient(withFetch())
  ]
};
