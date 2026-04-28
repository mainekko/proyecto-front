/**
 * ===================================================================
 * MODELO DE DATOS: Servicio
 * ===================================================================
 * 
 * CONCEPTO ANGULAR: Interfaces TypeScript para tipado fuerte.
 * 
 * POR QUÉ: Angular usa TypeScript, lo que nos permite definir la forma
 * exacta de nuestros datos. Esto previene errores en tiempo de desarrollo
 * porque el compilador verifica que estamos accediendo a propiedades
 * que realmente existen.
 * 
 * CÓMO: Definimos una interface que describe cada propiedad del servicio
 * con su tipo. Luego usamos esta interface en servicios y componentes
 * para tipar arrays, parámetros y respuestas HTTP.
 * 
 * Autor: EDGAR LOPEZ ROJAS
 * Materia: Desarrollo Front-End - Semana 7
 * ===================================================================
 */

// Interface que define la estructura de un servicio en el catálogo
export interface Servicio {
  id: number;            // Identificador único del servicio
  nombre: string;        // Nombre descriptivo del servicio
  categoria: string;     // Categoría principal del servicio
  descripcion: string;   // Descripción breve del servicio
  precio: number;        // Precio del servicio
  calificacion: number;  // Calificación promedio (0 a 5)
  imagen: string;        // URL de la imagen representativa
  detalles: string;      // Detalle extendido del servicio
  duracion: string;      // Duración estimada del servicio
  disponible: boolean;   // Si el servicio está actualmente disponible
}
