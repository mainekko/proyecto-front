# Plataforma de Servicios Digitales

> **Proyecto Final — Semana 7 | Desarrollo Front-End**  
> Desarrollado con **Angular 21** · TypeScript · TailwindCSS · GitHub Pages

🔗 **Demo en vivo:** [https://mainekko.github.io/proyecto-front/](https://mainekko.github.io/proyecto-front/)

---

## Descripción

**Plataforma de Servicios Digitales** es una aplicación web SPA (Single Page Application) construida con Angular 21 que permite visualizar, filtrar y gestionar un catálogo de servicios digitales organizados por categorías. Incluye un sistema de favoritos persistente y un panel de administración con CRUD completo.

---

## Tecnologías

| Tecnología | Versión | Rol |
|---|---|---|
| **Angular** | 21.2.0 | Framework principal (Standalone Components) |
| **TypeScript** | 5.8.x | Lenguaje de programación |
| **TailwindCSS** | 4.x | Estilos utility-first |
| **RxJS** | 7.x | Programación reactiva (BehaviorSubject, Observable) |
| **Angular Router** | 21.x | Navegación SPA con lazy loading |
| **Angular Forms** | 21.x | Reactive Forms con validaciones |
| **Angular HttpClient** | 21.x | Carga de datos desde JSON |
| **GitHub Pages** | — | Despliegue en producción |

---

## Estructura del proyecto

```
proyecto-front/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   └── servicio.model.ts        # Interface TypeScript del servicio
│   │   │   └── services/
│   │   │       ├── catalogo.service.ts      # HttpClient + BehaviorSubject
│   │   │       └── favoritos.service.ts     # localStorage + BehaviorSubject
│   │   ├── features/
│   │   │   ├── home/home.component.ts       # Inicio con hero y servicios destacados
│   │   │   ├── servicios/                   # Catálogo con búsqueda y filtros
│   │   │   ├── detalle/                     # Vista de detalle /detalle/:id
│   │   │   ├── favoritos/                   # Favoritos guardados en localStorage
│   │   │   ├── contacto/                    # Formulario reactivo con validaciones
│   │   │   └── admin/                       # Panel CRUD completo
│   │   ├── layouts/
│   │   │   ├── header/header.component.ts   # Navegación con RouterLink
│   │   │   └── footer/footer.component.ts   # Pie de página
│   │   ├── app.ts                           # Componente raíz
│   │   ├── app.config.ts                    # Configuración de providers
│   │   └── app.routes.ts                    # Rutas con lazy loading
│   ├── styles.css                           # Importación de TailwindCSS
│   ├── index.html                           # HTML raíz
│   └── main.ts                              # Bootstrap de la aplicación
├── public/
│   └── services.json                        # 16 servicios en 4 categorías
├── angular.json                             # Configuración Angular CLI
├── package.json                             # Dependencias y scripts
└── tsconfig.json                            # Configuración TypeScript
```

---

## Vistas implementadas (6 rutas)

| # | Vista | Ruta | Descripción |
|---|---|---|---|
| 1 | **Inicio** | `/inicio` | Landing con hero, estadísticas y servicios destacados |
| 2 | **Servicios** | `/servicios` | Catálogo con búsqueda y filtro por categoría |
| 3 | **Detalle** | `/detalle/:id` | Vista detallada de un servicio individual |
| 4 | **Favoritos** | `/favoritos` | Servicios guardados en `localStorage` |
| 5 | **Contacto** | `/contacto` | Formulario reactivo con validaciones completas |
| 6 | **Admin** | `/admin` | Panel CRUD para crear, editar y eliminar servicios |

---

## Conceptos Angular implementados

### 1. Data Binding (4 tipos)

| Tipo | Sintaxis | Dirección | Uso en el proyecto |
|---|---|---|---|
| Interpolación | `{{ valor }}` | Componente → Template | Nombres, precios, categorías en todas las vistas |
| Property Binding | `[propiedad]` | Componente → Template | `[src]`, `[routerLink]`, `[disabled]` |
| Event Binding | `(evento)` | Template → Componente | `(click)`, `(ngSubmit)`, `(ngModelChange)` |
| Two-Way Binding | `[(ngModel)]` | Bidireccional | Campo de búsqueda en servicios |

### 2. Directivas estructurales

- **`*ngIf`** — Renderizado condicional: menú móvil, estados vacíos, mensajes de error/éxito, disponibilidad
- **`*ngFor`** — Iteración de listas con `trackBy` para optimización de rendimiento
- **`*ngClass`** — Clases CSS dinámicas: filtros activos, badges de categoría, estados de formulario

### 3. Servicios e inyección de dependencias

**`CatalogoService`** — Carga los servicios con `HttpClient` y los expone via `BehaviorSubject<Servicio[]>` para que todos los componentes (Home, Servicios, Admin) se actualicen reactivamente.

**`FavoritosService`** — Persiste los IDs de favoritos en `localStorage` y emite cambios via `BehaviorSubject<number[]>`.

### 4. Routing y Lazy Loading

Todas las rutas usan `loadComponent()` para carga diferida:

```typescript
{ path: 'servicios', loadComponent: () =>
    import('./features/servicios/servicios.component').then(c => c.ServiciosComponent) }
```

La ruta `/detalle/:id` recibe un parámetro dinámico que el componente lee con `ActivatedRoute`.

### 5. Reactive Forms con validaciones

El formulario de contacto y el panel admin usan `FormBuilder` con los siguientes validadores:

| Validador | Campo |
|---|---|
| `Validators.required` | Todos los campos |
| `Validators.minLength / maxLength` | Nombre, mensaje |
| `Validators.email` | Correo electrónico |
| `Validators.pattern(/^\d{10}$/)` | Teléfono |
| `Validators.min(0)` | Precio (admin) |

### 6. CRUD en panel Admin

| Operación | Método en servicio | Resultado |
|---|---|---|
| **Create** | `agregarServicio()` | Emite nuevo array via BehaviorSubject |
| **Read** | Suscripción a `servicios$` | Lista reactiva siempre actualizada |
| **Update** | `actualizarServicio()` | Modifica el item y re-emite |
| **Delete** | `eliminarServicio(id)` | Filtra el array y re-emite |

Cuando Admin agrega o elimina un servicio, **Home y Servicios se actualizan automáticamente** sin recargar la página.

---

## Instalación y uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/mainekko/proyecto-front.git
cd proyecto-front

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm start
# Disponible en http://localhost:4200

# 4. Build de producción
npm run build
```

---

## Despliegue

El proyecto está desplegado en **GitHub Pages** en:

🔗 [https://mainekko.github.io/proyecto-front/](https://mainekko.github.io/proyecto-front/)

La rama `gh-pages` contiene el build de producción generado con Angular CLI.

---

## Funcionalidades destacadas

- ✅ **16 servicios** en 4 categorías: Educación, Tecnología, Turismo y Comercio
- ✅ **Búsqueda en tiempo real** con filtrado por categoría
- ✅ **Sistema de favoritos** persistente con `localStorage`
- ✅ **CRUD completo** en panel admin con actualización reactiva
- ✅ **Formulario reactivo** con validación de 5 campos
- ✅ **Lazy loading** en todas las rutas — bundle inicial optimizado
- ✅ **Diseño responsivo** mobile-first con TailwindCSS
- ✅ **Standalone Components** — arquitectura moderna Angular 14+
- ✅ **404 personalizado** para rutas inexistentes

---

## Entregas anteriores

| Entrega | Archivo | Contenido |
|---|---|---|
| Semana 3 | `ENTREGA_SEMANA_3.md` | Análisis, wireframes y planificación |
| Semana 5 | `ENTREGA_SEMANA_5.md` | Desarrollo inicial, componentes base |
| **Semana 7** | `README-ENTREGA-S7.md` | **Proyecto completo con CRUD, validaciones y favoritos** |

---

## Autor

Proyecto académico desarrollado por **mainekko** para la materia **Desarrollo Front-End**.
