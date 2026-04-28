# 🚀 TechServices Pro — Entrega Semana 7

## 📋 Información General

| Campo | Detalle |
|-------|---------|
| **Alumno** | EDGAR LOPEZ ROJAS |
| **Materia** | Desarrollo Front-End |
| **Entrega** | Semana 7 — Proyecto Final |
| **Framework** | Angular 21.2.0 (última versión estable) |
| **Estilos** | TailwindCSS v4 |
| **Arquitectura** | Standalone Components |

---

## 🏗️ Estructura del Proyecto

```
proyecto-front-angular/
├── src/
│   ├── app/
│   │   ├── core/                          # Capa central (servicios, modelos)
│   │   │   ├── models/
│   │   │   │   └── servicio.model.ts      # Interface TypeScript del servicio
│   │   │   └── services/
│   │   │       ├── catalogo.service.ts    # Servicio: HttpClient + BehaviorSubject
│   │   │       └── favoritos.service.ts   # Servicio: localStorage + BehaviorSubject
│   │   │
│   │   ├── features/                      # Componentes de cada vista (lazy loaded)
│   │   │   ├── home/
│   │   │   │   └── home.component.ts      # Página de inicio con hero y destacados
│   │   │   ├── servicios/
│   │   │   │   └── servicios.component.ts # Catálogo con filtros y búsqueda
│   │   │   ├── detalle/
│   │   │   │   └── detalle.component.ts   # Detalle dinámico con ruta /detalle/:id
│   │   │   ├── favoritos/
│   │   │   │   └── favoritos.component.ts # Favoritos desde localStorage
│   │   │   ├── contacto/
│   │   │   │   └── contacto.component.ts  # Formulario reactivo con validaciones
│   │   │   └── admin/
│   │   │       └── admin.component.ts     # Panel CRUD (agregar/eliminar)
│   │   │
│   │   ├── layouts/                       # Componentes de layout
│   │   │   ├── header/
│   │   │   │   └── header.component.ts    # Navegación con RouterLink
│   │   │   └── footer/
│   │   │       └── footer.component.ts    # Pie de página con info
│   │   │
│   │   ├── app.ts                         # Componente raíz
│   │   ├── app.config.ts                  # Configuración de providers
│   │   └── app.routes.ts                  # Rutas con lazy loading
│   │
│   ├── styles.css                         # Importación de TailwindCSS
│   ├── index.html                         # HTML raíz
│   └── main.ts                            # Bootstrap de la aplicación
│
├── public/
│   └── services.json                      # Datos JSON de los 12 servicios
│
├── angular.json                           # Configuración del workspace Angular
├── package.json                           # Dependencias y scripts
├── tsconfig.json                          # Configuración TypeScript
└── README-ENTREGA-S7.md                   # Este archivo
```

---

## 🚀 Cómo Ejecutar Localmente

### Prerrequisitos
- Node.js v18 o superior
- npm v9 o superior

### Instalación y Ejecución

```bash
# 1. Clonar o descargar el proyecto
cd proyecto-front-angular

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
ng serve
# o bien:
npm start

# 4. Abrir en el navegador
# http://localhost:4200
```

### Build de Producción

```bash
# Generar build optimizado
npm run build:prod

# Los archivos se generan en dist/proyecto-front-angular/
```

---

## 📖 Explicación de Conceptos Angular Implementados

### 1. TIPOS DE BINDING (Data Binding)

Angular ofrece 4 formas de conectar los datos del componente TypeScript con el template HTML:

#### a) Interpolación `{{ }}`
**Qué es:** Inserta el valor de una propiedad TypeScript dentro del HTML.
**Dirección:** Componente → Template (unidireccional).

```typescript
// En el componente (footer.component.ts)
nombreAlumno = 'EDGAR LOPEZ ROJAS';
anioActual = new Date().getFullYear();
```
```html
<!-- En el template -->
<p>Alumno: {{ nombreAlumno }}</p>
<p>&copy; {{ anioActual }}</p>
```
**Dónde se usa:** `home.component.ts` (hero section, estadísticas), `header.component.ts` (título), `footer.component.ts` (créditos), en todos los componentes para mostrar datos de servicios.

#### b) Property Binding `[propiedad]`
**Qué es:** Vincula un atributo HTML o una propiedad del DOM a una expresión TypeScript.
**Dirección:** Componente → Template (unidireccional).

```html
<!-- Vincula el atributo src a la propiedad servicio.imagen -->
<img [src]="servicio.imagen" [alt]="servicio.nombre">

<!-- Vincula routerLink a una ruta dinámica con el ID del servicio -->
<a [routerLink]="['/detalle', servicio.id]">Ver Detalle</a>

<!-- Vincula disabled al estado de validez del formulario -->
<button [disabled]="contactoForm.invalid">Enviar</button>
```
**Dónde se usa:** `servicios.component.ts` (imágenes, enlaces), `detalle.component.ts` (imagen, enlaces), `contacto.component.ts` (botón disabled), `admin.component.ts` (formulario).

#### c) Event Binding `(evento)`
**Qué es:** Ejecuta un método del componente cuando ocurre un evento del DOM.
**Dirección:** Template → Componente (unidireccional).

```html
<!-- Ejecuta toggleMenu() al hacer clic -->
<button (click)="toggleMenu()">Menú</button>

<!-- Ejecuta enviarFormulario() al enviar el form -->
<form (ngSubmit)="enviarFormulario()">

<!-- Ejecuta filtrarServicios() al escribir en el input -->
<input (ngModelChange)="filtrarServicios()">
```
**Dónde se usa:** `header.component.ts` (menú móvil), `servicios.component.ts` (filtros, favoritos), `contacto.component.ts` (envío de formulario), `admin.component.ts` (agregar, eliminar).

#### d) Two-Way Binding `[(ngModel)]`
**Qué es:** Sincroniza datos en ambas direcciones: del componente al template Y del template al componente.
**Dirección:** Componente ↔ Template (bidireccional).

```html
<!-- El input y terminoBusqueda siempre están sincronizados -->
<input [(ngModel)]="terminoBusqueda" (ngModelChange)="filtrarServicios()">
```
**Equivale a:**
```html
<input [ngModel]="terminoBusqueda" (ngModelChange)="terminoBusqueda = $event">
```
**Dónde se usa:** `servicios.component.ts` (campo de búsqueda). También se usa `formControlName` en los Reactive Forms que es la forma preferida para formularios complejos.

---

### 2. DIRECTIVAS ESTRUCTURALES

#### a) `*ngIf` — Renderizado Condicional
**Qué es:** Agrega o remueve un elemento del DOM según una condición booleana.

```html
<!-- Muestra el menú móvil solo si menuAbierto es true -->
<div *ngIf="menuAbierto">...</div>

<!-- Condicional con else: si hay servicios muestra la lista, si no muestra "cargando" -->
<div *ngIf="servicios.length > 0; else sinResultados">
  <!-- Lista de servicios -->
</div>
<ng-template #sinResultados>
  <p>No se encontraron servicios</p>
</ng-template>
```
**Dónde se usa:** `header.component.ts` (menú móvil), `home.component.ts` (cargando/cargado), `servicios.component.ts` (resultados/vacío), `detalle.component.ts` (servicio encontrado/no encontrado), `favoritos.component.ts` (hay/no hay favoritos), `contacto.component.ts` (mensajes de error, éxito), `admin.component.ts` (lista/vacía).

#### b) `*ngFor` — Iteración de Listas
**Qué es:** Repite un elemento HTML por cada item de un array.

```html
<!-- Crea un <div> por cada servicio en el array -->
<div *ngFor="let servicio of serviciosDestacados; let i = index; trackBy: trackById">
  <h3>{{ servicio.nombre }}</h3>
  <p>Posición: {{ i + 1 }}</p>
</div>
```
**Variables disponibles:** `let i = index` (posición), `let first = first`, `let last = last`, `let even = even`, `let odd = odd`.

**trackBy:** Función que retorna un identificador único por cada elemento. Angular la usa para saber qué elementos cambiaron y solo re-renderizar esos, en lugar de toda la lista. **Mejora el rendimiento.**

**Dónde se usa:** Todos los componentes que muestran listas (header enlaces, home estadísticas/ventajas/servicios, servicios catálogo, favoritos, admin lista).

#### c) `*ngClass` — Clases CSS Dinámicas
**Qué es:** Aplica o remueve clases CSS según condiciones.

```html
<!-- Si disponible es true, aplica bg-green-500. Si es false, aplica bg-red-500 -->
<span [ngClass]="{
  'bg-green-500': servicio.disponible,
  'bg-red-500': !servicio.disponible
}">
  {{ servicio.disponible ? 'Disponible' : 'No disponible' }}
</span>

<!-- Estilo del botón de filtro según si está activo -->
<button [ngClass]="{
  'bg-indigo-600 text-white': categoriaActiva === cat,
  'bg-gray-100 text-gray-600': categoriaActiva !== cat
}">
```
**Dónde se usa:** `servicios.component.ts` (filtros activos, badges, favoritos), `detalle.component.ts` (disponibilidad, favorito), `contacto.component.ts` (campos con error, estados del formulario, botón submit), `admin.component.ts` (disponibilidad, errores).

---

### 3. SERVICIOS E INYECCIÓN DE DEPENDENCIAS

#### CatalogoService (`core/services/catalogo.service.ts`)
**Qué hace:** Centraliza el acceso a los datos de servicios.
**Patrón:** HttpClient + BehaviorSubject para estado reactivo.

```
┌─────────────┐    HTTP GET     ┌──────────────┐
│ services.json├───────────────►│CatalogoService│
└─────────────┘                 │              │
                                │ BehaviorSubject<Servicio[]>
                                │      │       │
                                └──────┼───────┘
                                       │ .asObservable()
                          ┌────────────┼────────────┐
                          ▼            ▼            ▼
                     HomeComp    ServiciosComp  AdminComp
                   (se suscribe) (se suscribe) (se suscribe)
```

**Por qué BehaviorSubject:**
- Siempre tiene un valor actual (inicializado con `[]`)
- Nuevos suscriptores reciben el último valor inmediatamente
- Cuando se agrega/elimina un servicio, TODOS los componentes se actualizan

#### FavoritosService (`core/services/favoritos.service.ts`)
**Qué hace:** Gestiona los favoritos con persistencia en localStorage.
**Patrón:** localStorage + BehaviorSubject.

```
┌────────────┐  guardar/leer  ┌─────────────────┐
│ localStorage├◄─────────────►│FavoritosService  │
└────────────┘                │                  │
                              │ BehaviorSubject<number[]>
                              │       │          │
                              └───────┼──────────┘
                                      │
                         ┌────────────┼──────────┐
                         ▼            ▼          ▼
                    ServiciosComp DetalleComp FavoritosComp
```

---

### 4. ROUTING Y LAZY LOADING

**Configuración en `app.routes.ts`:**

| Ruta | Componente | Lazy Loading |
|------|-----------|-------------|
| `/inicio` | HomeComponent | ✅ `loadComponent()` |
| `/servicios` | ServiciosComponent | ✅ `loadComponent()` |
| `/detalle/:id` | DetalleComponent | ✅ `loadComponent()` |
| `/favoritos` | FavoritosComponent | ✅ `loadComponent()` |
| `/contacto` | ContactoComponent | ✅ `loadComponent()` |
| `/admin` | AdminComponent | ✅ `loadComponent()` |

**Cómo funciona el Lazy Loading:**
```typescript
{
  path: 'servicios',
  loadComponent: () => import('./features/servicios/servicios.component')
    .then(c => c.ServiciosComponent)
}
```
1. `import()` es dinámico (JavaScript estándar)
2. Angular crea un "chunk" JS separado para cada componente
3. El chunk se descarga del servidor SOLO cuando el usuario navega a esa ruta
4. Reduce el bundle inicial → la app carga más rápido

**Parámetro de ruta dinámico `:id`:**
```typescript
// Ruta: /detalle/:id → Ejemplo: /detalle/5
// En DetalleComponent:
this.route.params.subscribe(params => {
  const id = Number(params['id']); // id = 5
  this.servicio = this.catalogoService.obtenerServicioPorId(id);
});
```

---

### 5. FORMULARIOS REACTIVOS (Reactive Forms)

**Implementados en:** `contacto.component.ts` y `admin.component.ts`.

#### Creación del formulario:
```typescript
contactoForm = this.fb.group({
  nombre:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  email:    ['', [Validators.required, Validators.email]],
  telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  servicio: ['', [Validators.required]],
  mensaje:  ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]]
});
```

#### Validadores utilizados:
| Validador | Qué verifica | Ejemplo |
|-----------|-------------|---------|
| `Validators.required` | Campo no vacío | Todos los campos |
| `Validators.minLength(n)` | Mínimo n caracteres | nombre(3), mensaje(20) |
| `Validators.maxLength(n)` | Máximo n caracteres | nombre(50), mensaje(500) |
| `Validators.email` | Formato email válido | email |
| `Validators.pattern(regex)` | Coincide con regex | teléfono (10 dígitos) |
| `Validators.min(n)` | Valor numérico mínimo | precio en admin (>0) |

#### Estados del formulario:
| Estado | Significado | Uso |
|--------|------------|-----|
| `valid` | Todos los validadores pasan | Habilitar botón de envío |
| `invalid` | Al menos un validador falla | Deshabilitar botón |
| `touched` | El usuario interactuó con algún campo | Mostrar errores |
| `untouched` | Nadie ha tocado el formulario | No mostrar errores |
| `dirty` | Algún valor cambió desde el inicial | Advertir cambios sin guardar |
| `pristine` | Ningún valor ha cambiado | Estado inicial |

El componente de contacto muestra estos estados en una sección de debug visible para el profesor.

---

### 6. CRUD EN PANEL ADMIN

| Operación | Método | Descripción |
|-----------|--------|-------------|
| **Create** | `agregarServicio()` | Agrega un nuevo servicio al BehaviorSubject |
| **Read** | Suscripción a `servicios$` | Lista reactiva que se actualiza automáticamente |
| **Delete** | `eliminarServicio(id)` | Filtra el servicio del array y emite nuevo estado |

**Flujo reactivo del CRUD:**
1. Admin agrega/elimina un servicio
2. `CatalogoService` actualiza el `BehaviorSubject`
3. El `BehaviorSubject` emite el nuevo array
4. **TODOS** los componentes suscritos (Home, Servicios, Admin) se actualizan automáticamente

---

## 🎨 Vistas Implementadas (6 vistas)

| # | Vista | Ruta | Descripción |
|---|-------|------|-------------|
| 1 | **Inicio** | `/inicio` | Landing page con hero, estadísticas, servicios destacados y ventajas |
| 2 | **Servicios** | `/servicios` | Catálogo completo con búsqueda, filtro por categoría y grid responsivo |
| 3 | **Detalle** | `/detalle/:id` | Vista detallada del servicio con info completa y servicios relacionados |
| 4 | **Favoritos** | `/favoritos` | Servicios guardados en localStorage con opciones de gestión |
| 5 | **Contacto** | `/contacto` | Formulario reactivo con validaciones completas y estados |
| 6 | **Admin** | `/admin` | Panel CRUD para agregar y eliminar servicios |

---

## 🌐 Despliegue en GitHub Pages

### Opción 1: Con angular-cli-ghpages
```bash
# Build y deploy automático
ng deploy --base-href=/proyecto-front-angular/
```

### Opción 2: Manual
```bash
# 1. Build de producción
npm run build:prod

# 2. Los archivos están en dist/proyecto-front-angular/browser/
# 3. Subir el contenido de esa carpeta a la rama gh-pages del repositorio
```

### Opción 3: GitHub Actions (CI/CD)
Crear `.github/workflows/deploy.yml` en el repositorio para automatizar el proceso de deployment con cada push a main.

---

## 📦 Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Angular | 21.2.0 | Framework principal |
| TypeScript | 5.8.x | Lenguaje de programación |
| TailwindCSS | 4.x | Framework de estilos utility-first |
| RxJS | 7.x | Programación reactiva (BehaviorSubject, Observable) |
| Angular Router | 21.x | Navegación SPA con lazy loading |
| Angular Forms | 21.x | Reactive Forms con validaciones |
| Angular HttpClient | 21.x | Peticiones HTTP |

---

## ✅ Checklist de Requisitos Cumplidos

- [x] 6 vistas implementadas (Inicio, Servicios, Detalle, Favoritos, Contacto, Admin)
- [x] Standalone components
- [x] TailwindCSS para estilos
- [x] Interpolación `{{ }}`
- [x] Property binding `[propiedad]`
- [x] Event binding `(evento)`
- [x] Two-way binding `[(ngModel)]` y `formControlName`
- [x] `*ngIf` para renderizado condicional
- [x] `*ngFor` para listas con `trackBy`
- [x] `*ngClass` para clases dinámicas
- [x] CatalogoService con HttpClient y BehaviorSubject
- [x] FavoritosService con localStorage y BehaviorSubject
- [x] Lazy loading en todas las rutas
- [x] Parámetro de ruta dinámico `/detalle/:id`
- [x] Reactive Forms con validaciones completas
- [x] Validators: required, minLength, maxLength, email, pattern, min
- [x] Estados del formulario: valid, invalid, touched, pristine, dirty
- [x] CRUD: agregar y eliminar servicios
- [x] Actualización reactiva del catálogo
- [x] Diseño responsivo (mobile-first)
- [x] Navegación con RouterLink y RouterLinkActive
- [x] Estados vacíos y de carga
- [x] 12 servicios en services.json
- [x] Configuración para GitHub Pages
- [x] Código comentado con explicaciones de CÓMO y POR QUÉ

---

*Proyecto desarrollado por **EDGAR LOPEZ ROJAS** para la materia de Desarrollo Front-End, Semana 7.*
