/**
 * ===================================================================
 * SERVICIO: FavoritosService
 * ===================================================================
 * 
 * CONCEPTO ANGULAR: Servicio singleton con persistencia en localStorage.
 * 
 * POR QUÉ: Necesitamos que los favoritos del usuario persistan incluso
 * si cierra el navegador. localStorage guarda datos como strings en el
 * navegador. BehaviorSubject permite que cualquier componente reaccione
 * en tiempo real cuando se agrega o elimina un favorito.
 * 
 * CÓMO FUNCIONA:
 * 1. Al iniciar, lee los IDs guardados en localStorage
 * 2. BehaviorSubject mantiene el array de IDs como estado reactivo
 * 3. Cuando cambian los favoritos, se actualiza localStorage Y se emite
 *    el nuevo estado a todos los componentes suscritos
 * 
 * Autor: EDGAR LOPEZ ROJAS
 * Materia: Desarrollo Front-End - Semana 7
 * ===================================================================
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritosService {

  // Clave bajo la cual guardamos los favoritos en localStorage
  private readonly STORAGE_KEY = 'servicios_favoritos';

  /**
   * BehaviorSubject con array de IDs de servicios favoritos.
   * Se inicializa leyendo de localStorage para restaurar favoritos previos.
   */
  private favoritosSubject = new BehaviorSubject<number[]>(this.cargarDesdeStorage());

  // Observable público para que los componentes se suscriban
  favoritos$: Observable<number[]> = this.favoritosSubject.asObservable();

  /**
   * Lee los favoritos guardados en localStorage.
   * JSON.parse() convierte el string guardado de vuelta en un array.
   * Si no hay datos o hay un error, retorna un array vacío.
   */
  private cargarDesdeStorage(): number[] {
    try {
      const datos = localStorage.getItem(this.STORAGE_KEY);
      return datos ? JSON.parse(datos) : [];
    } catch {
      return [];
    }
  }

  /**
   * Guarda el array de IDs en localStorage.
   * JSON.stringify() convierte el array a string porque localStorage
   * solo puede almacenar strings.
   */
  private guardarEnStorage(ids: number[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
  }

  /**
   * Alterna (toggle) el estado de favorito de un servicio.
   * Si ya es favorito lo quita, si no lo es lo agrega.
   * 
   * CÓMO: includes() verifica si el ID ya está en el array.
   * filter() crea nuevo array sin ese ID, o spread [...] lo agrega.
   */
  toggleFavorito(id: number): void {
    const actuales = this.favoritosSubject.getValue();
    let nuevos: number[];

    if (actuales.includes(id)) {
      // Si ya es favorito, lo removemos
      nuevos = actuales.filter(favId => favId !== id);
    } else {
      // Si no es favorito, lo agregamos
      nuevos = [...actuales, id];
    }

    // Actualizamos tanto localStorage como el BehaviorSubject
    this.guardarEnStorage(nuevos);
    this.favoritosSubject.next(nuevos);
  }

  /**
   * Verifica si un servicio específico está marcado como favorito.
   * Útil para mostrar/ocultar el ícono de favorito en la UI.
   */
  esFavorito(id: number): boolean {
    return this.favoritosSubject.getValue().includes(id);
  }

  /**
   * Obtiene los IDs de todos los favoritos de forma síncrona.
   */
  obtenerFavoritosIds(): number[] {
    return this.favoritosSubject.getValue();
  }

  /**
   * Limpia todos los favoritos (útil para un botón "Limpiar favoritos").
   */
  limpiarFavoritos(): void {
    this.guardarEnStorage([]);
    this.favoritosSubject.next([]);
  }
}
