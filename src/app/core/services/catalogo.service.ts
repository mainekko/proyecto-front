/**
 * ===================================================================
 * SERVICIO: CatalogoService
 * ===================================================================
 * 
 * CONCEPTO ANGULAR: Servicio con @Injectable y providedIn: 'root'.
 * 
 * POR QUÉ: Los servicios en Angular centralizan la lógica de negocio
 * y el acceso a datos. Usando providedIn: 'root', Angular crea una
 * ÚNICA instancia (Singleton) disponible en toda la aplicación.
 * 
 * CÓMO FUNCIONA:
 * 1. HttpClient hace peticiones HTTP al archivo JSON (simula una API REST)
 * 2. BehaviorSubject mantiene el estado reactivo de los servicios
 * 3. Los componentes se suscriben al Observable para recibir actualizaciones
 * 4. Cuando se agrega o elimina un servicio, BehaviorSubject emite
 *    el nuevo array y TODOS los componentes suscritos se actualizan
 * 
 * PATRÓN: Servicio con estado reactivo usando BehaviorSubject + Observable
 * 
 * Autor: EDGAR LOPEZ ROJAS
 * Materia: Desarrollo Front-End - Semana 7
 * ===================================================================
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Servicio } from '../models/servicio.model';

@Injectable({ providedIn: 'root' })
export class CatalogoService {

  /**
   * inject() es la forma moderna (Angular 14+) de inyectar dependencias.
   * Equivale a ponerlo en el constructor, pero es más limpio y funciona
   * con standalone components.
   */
  private http = inject(HttpClient);

  /**
   * BehaviorSubject: Un tipo especial de Observable que:
   * - Siempre tiene un valor actual (inicializado con [])
   * - Cuando un componente se suscribe, recibe el último valor inmediatamente
   * - Cuando llamamos .next(), emite el nuevo valor a TODOS los suscritos
   * 
   * Es PRIVADO porque solo este servicio debe poder modificar el estado.
   */
  private serviciosSubject = new BehaviorSubject<Servicio[]>([]);

  /**
   * Observable PÚBLICO: Los componentes se suscriben a esto.
   * .asObservable() convierte el BehaviorSubject en un Observable de solo lectura,
   * así los componentes no pueden hacer .next() directamente (encapsulamiento).
   */
  servicios$: Observable<Servicio[]> = this.serviciosSubject.asObservable();

  // Bandera para saber si ya se cargaron los datos
  private dataCargada = false;

  readonly categoriasRequeridas = ['Educación', 'Tecnología', 'Turismo', 'Comercio'];

  /**
   * Carga los servicios desde el archivo JSON usando HttpClient.
   * 
   * CONCEPTO: HttpClient.get<T>() hace una petición GET y devuelve
   * un Observable tipado. Usamos tap() para ejecutar un efecto secundario
   * (guardar en el BehaviorSubject) sin modificar los datos que fluyen.
   */
  cargarServicios(): Observable<Servicio[]> {
    // Si ya tenemos datos, no volvemos a hacer la petición HTTP
    if (this.dataCargada) {
      return this.servicios$;
    }

    return this.http.get<Servicio[]>('services.json').pipe(
      // tap() ejecuta código "al lado" del flujo de datos, sin modificarlo
      tap(servicios => {
        this.serviciosSubject.next(servicios); // Emite los datos a todos los suscriptores
        this.dataCargada = true;
      })
    );
  }

  /**
   * Obtiene el valor actual del BehaviorSubject de forma síncrona.
   * .getValue() retorna el último valor emitido sin crear una suscripción.
   */
  obtenerServicios(): Servicio[] {
    return this.serviciosSubject.getValue();
  }

  /**
   * Busca un servicio por ID.
   * find() retorna el primer elemento que cumple la condición o undefined.
   */
  obtenerServicioPorId(id: number): Servicio | undefined {
    return this.serviciosSubject.getValue().find(s => s.id === id);
  }

  /**
   * Obtiene todas las categorías únicas de los servicios.
   * Set elimina duplicados, y spread [...] lo convierte de vuelta en array.
   */
  obtenerCategorias(): string[] {
    const servicios = this.serviciosSubject.getValue();
    const categoriasDataset = [...new Set(servicios.map(s => s.categoria))];

    // Garantiza que siempre estén presentes las categorías exigidas en la entrega
    const categorias = new Set([...this.categoriasRequeridas, ...categoriasDataset]);
    return Array.from(categorias);
  }

  /**
   * CRUD - Agregar un nuevo servicio.
   * 
   * CÓMO: Generamos un nuevo ID, creamos el servicio con los datos
   * recibidos, lo agregamos al array actual y emitimos el nuevo estado.
   */
  agregarServicio(servicio: Omit<Servicio, 'id'>): void {
    const serviciosActuales = this.serviciosSubject.getValue();
    // Generamos ID automáticamente basándonos en el máximo existente
    const nuevoId = serviciosActuales.length > 0
      ? Math.max(...serviciosActuales.map(s => s.id)) + 1
      : 1;

    const nuevoServicio: Servicio = { ...servicio, id: nuevoId };

    // Emitimos el nuevo array con el servicio agregado
    this.serviciosSubject.next([...serviciosActuales, nuevoServicio]);
  }

  /**
   * CRUD - Actualizar un servicio existente.
   */
  actualizarServicio(id: number, servicioActualizado: Omit<Servicio, 'id'>): void {
    const serviciosActuales = this.serviciosSubject.getValue();

    const serviciosConCambios = serviciosActuales.map(servicio =>
      servicio.id === id ? { ...servicioActualizado, id } : servicio
    );

    this.serviciosSubject.next(serviciosConCambios);
  }

  /**
   * CRUD - Eliminar un servicio por ID.
   * 
   * CÓMO: filter() crea un nuevo array excluyendo el servicio con ese ID.
   * Emitimos el nuevo array y todos los componentes suscritos se actualizan.
   */
  eliminarServicio(id: number): void {
    const serviciosActuales = this.serviciosSubject.getValue();
    const serviciosFiltrados = serviciosActuales.filter(s => s.id !== id);
    this.serviciosSubject.next(serviciosFiltrados);
  }
}
