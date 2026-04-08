# ENTREGA SEMANA 5: PROTOTIPO FUNCIONAL
## Plataforma de Servicios Digitales

**Autor:** Estudiante de Desarrollo Front-end  
**Fecha:** Abril 2026  
**Asignatura:** Módulo de Desarrollo Front-end  
**Docente:** John Olarte Ramos

---

## Tabla de Contenido

1. [Introducción](#introducción)
2. [Descripción del Proyecto](#descripción-del-proyecto)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Funcionalidades Implementadas](#funcionalidades-implementadas)
6. [Instrucciones de Instalación](#instrucciones-de-instalación)
7. [Guía de Uso](#guía-de-uso)
8. [Código Fuente](#código-fuente)
9. [Repositorio GitHub](#repositorio-github)
10. [Conclusiones](#conclusiones)
11. [Referencias Bibliográficas](#referencias-bibliográficas)

---

## Introducción

La presente entrega corresponde a la fase de prototipo funcional del proyecto "Plataforma de Servicios Digitales". En esta etapa se ha implementado una aplicación web completamente funcional utilizando tecnologías modernas de desarrollo front-end como React, Tailwind CSS y JavaScript ES6+.

El prototipo incluye todas las funcionalidades especificadas en las orientaciones del docente, incluyendo visualización de servicios, búsqueda y filtrado, gestión de favoritos, formulario de contacto con validaciones, y un panel de administración para gestionar servicios.

---

## Descripción del Proyecto

### Objetivo

Desarrollar una aplicación web funcional que permita a los usuarios explorar, visualizar y gestionar un catálogo de servicios digitales, educativos, tecnológicos, turísticos y comerciales, con una experiencia de usuario intuitiva y moderna.

### Características Principales

La aplicación implementa las siguientes características:

**Visualización de Servicios:** Los usuarios pueden explorar un catálogo completo de servicios presentados en tarjetas (cards) que muestran imagen, nombre, descripción breve, precio, rating y un botón de acción.

**Búsqueda y Filtrado:** Barra de búsqueda que permite encontrar servicios por nombre o palabras clave, junto con filtrado por categoría (Educación, Tecnología, Turismo, Comercio).

**Detalle del Servicio:** Página detallada que muestra información completa del servicio, incluyendo descripción extendida, características, precio, rating, reseñas y información del proveedor.

**Gestión de Favoritos:** Los usuarios pueden guardar servicios en su lista de favoritos mediante un botón de corazón. Esta funcionalidad utiliza localStorage para persistencia de datos.

**Formulario de Contacto:** Formulario interactivo con validaciones en tiempo real (campos obligatorios, formato de correo válido) y mensaje de confirmación tras el envío.

**Mini CRUD de Servicios:** Panel de administración que permite crear, editar y eliminar servicios, demostrando operaciones CRUD básicas.

**Navegación Intuitiva:** Menú de navegación principal con acceso a todas las páginas de la aplicación, incluyendo un menú hamburguesa responsivo para dispositivos móviles.

---

## Tecnologías Utilizadas

### Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| React | 19 | Framework para componentes y UI |
| TypeScript | 5.6 | Tipado estático de JavaScript |
| Tailwind CSS | 4 | Utilidades CSS para estilos |
| Wouter | 3.3 | Enrutamiento del lado del cliente |
| shadcn/ui | Latest | Componentes UI pre-construidos |
| Lucide React | 0.453 | Iconografía moderna |
| Vite | 7 | Herramienta de construcción y desarrollo |
| Node.js | 22 | Entorno de ejecución |
| pnpm | 10 | Gestor de paquetes |

### Librerías Adicionales

- **sonner:** Notificaciones tipo toast
- **framer-motion:** Animaciones fluidas
- **react-hook-form:** Gestión de formularios
- **zod:** Validación de esquemas

---

## Estructura del Proyecto

```
plataforma-servicios-digitales/
├── client/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx          # Navegación principal
│   │   │   ├── Footer.tsx          # Pie de página
│   │   │   ├── ServiceCard.tsx     # Tarjeta de servicio reutilizable
│   │   │   ├── ErrorBoundary.tsx   # Manejo de errores
│   │   │   └── ui/                 # Componentes shadcn/ui
│   │   ├── contexts/
│   │   │   ├── ThemeContext.tsx    # Contexto de tema
│   │   │   └── FavoritesContext.tsx # Contexto de favoritos
│   │   ├── hooks/
│   │   │   └── useFavorites.ts     # Hook personalizado para favoritos
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Página de inicio
│   │   │   ├── Services.tsx        # Listado de servicios
│   │   │   ├── ServiceDetail.tsx   # Detalle de servicio
│   │   │   ├── Favorites.tsx       # Página de favoritos
│   │   │   ├── Contact.tsx         # Página de contacto
│   │   │   ├── Admin.tsx           # Panel de administración
│   │   │   └── NotFound.tsx        # Página 404
│   │   ├── data/
│   │   │   └── services.json       # Datos de servicios
│   │   ├── lib/
│   │   │   └── utils.ts            # Utilidades
│   │   ├── App.tsx                 # Componente principal
│   │   ├── main.tsx                # Punto de entrada
│   │   └── index.css               # Estilos globales
│   ├── index.html                  # HTML principal
│   └── package.json
├── server/
│   └── index.ts                    # Servidor Express
├── package.json
└── README.md
```

---

## Funcionalidades Implementadas

### 1. Página de Inicio (Home)

La página principal presenta un diseño minimalista moderno con:

- **Hero Banner:** Encabezado atractivo con imagen de fondo y llamado a la acción principal.
- **Servicios Destacados:** Grid de 4 servicios destacados con tarjetas interactivas.
- **Sección de Beneficios:** Información sobre por qué elegir la plataforma.
- **Testimonios:** Sección con reseñas de usuarios satisfechos.
- **CTA Final:** Llamado a la acción para explorar servicios.

### 2. Página de Servicios

Listado completo de servicios con:

- **Barra de Búsqueda:** Búsqueda en tiempo real por nombre o descripción.
- **Filtros por Categoría:** Botones para filtrar por categoría.
- **Grid Responsivo:** Muestra 1-4 columnas según el tamaño de pantalla.
- **Paginación:** Navegación entre páginas de resultados.
- **Contador de Resultados:** Muestra cantidad de servicios encontrados.

### 3. Página de Detalle de Servicio

Información completa del servicio con:

- **Imagen Representativa:** Imagen grande del servicio.
- **Información Detallada:** Nombre, categoría, descripción completa.
- **Rating y Reseñas:** Calificación con estrellas y número de reseñas.
- **Características:** Lista de características principales.
- **Información del Proveedor:** Datos de contacto del proveedor.
- **Botones de Acción:** Agregar a favoritos y contactar proveedor.
- **Servicios Relacionados:** Otros servicios de la misma categoría.

### 4. Página de Favoritos

Gestión de servicios guardados:

- **Lista Personalizada:** Muestra solo los servicios marcados como favoritos.
- **Contador:** Indica cantidad de favoritos guardados.
- **Mensaje Vacío:** Interfaz amigable cuando no hay favoritos.
- **Acciones Rápidas:** Botones para ver detalle o contactar.

### 5. Página de Contacto

Formulario de contacto con:

- **Campos Validados:** Nombre, email, asunto, mensaje.
- **Validaciones en Tiempo Real:** Feedback inmediato sobre errores.
- **Información de Contacto:** Teléfono, email, dirección.
- **Mensaje de Confirmación:** Notificación de envío exitoso.
- **Almacenamiento Local:** Mensajes guardados en localStorage.

### 6. Panel de Administración

Mini CRUD para gestionar servicios:

- **Crear Servicio:** Formulario para agregar nuevos servicios.
- **Editar Servicio:** Modificar datos de servicios existentes.
- **Eliminar Servicio:** Remover servicios con confirmación.
- **Tabla de Servicios:** Listado de todos los servicios con acciones.
- **Validaciones:** Validación de datos antes de guardar.

### 7. Funcionalidad de Favoritos

Gestión de favoritos con localStorage:

- **Persistencia:** Los favoritos se guardan en localStorage del navegador.
- **Sincronización:** Se actualizan automáticamente en todas las páginas.
- **Indicador Visual:** Contador de favoritos en el header.
- **Botón Toggle:** Agregar/eliminar favoritos con un clic.

### 8. Navegación Responsiva

Menú de navegación adaptable:

- **Desktop:** Menú horizontal en header.
- **Mobile:** Menú hamburguesa que se expande.
- **Links Activos:** Indicación visual de página actual.
- **Acceso Rápido:** Botón de favoritos siempre visible.

---

## Instrucciones de Instalación

### Requisitos Previos

- Node.js 18+ instalado
- npm o pnpm como gestor de paquetes
- Git para control de versiones

### Pasos de Instalación

**1. Clonar el repositorio:**

```bash
git clone https://github.com/tu-usuario/plataforma-servicios-digitales.git
cd plataforma-servicios-digitales
```

**2. Instalar dependencias:**

```bash
pnpm install
```

**3. Iniciar el servidor de desarrollo:**

```bash
pnpm dev
```

**4. Acceder a la aplicación:**

Abre tu navegador y ve a `http://localhost:3000`

### Construcción para Producción

```bash
pnpm build
pnpm preview
```

---

## Guía de Uso

### Explorar Servicios

1. Desde la página de inicio, haz clic en "Explorar Servicios"
2. Usa la barra de búsqueda para encontrar servicios específicos
3. Filtra por categoría usando los botones disponibles
4. Navega entre páginas usando la paginación

### Guardar Favoritos

1. En cualquier tarjeta de servicio, haz clic en el icono de corazón
2. El servicio se agregará a tu lista de favoritos
3. Accede a tus favoritos desde el menú principal
4. Los favoritos se guardan automáticamente en tu navegador

### Ver Detalle de Servicio

1. Haz clic en "Ver Más" en cualquier tarjeta
2. Visualiza la información completa del servicio
3. Lee las características y reseñas
4. Contacta al proveedor o agrega a favoritos

### Contactar Proveedor

1. Ve a la página de Contacto desde el menú
2. Completa el formulario con tus datos
3. Escribe tu mensaje (mínimo 10 caracteres)
4. Haz clic en "Enviar Mensaje"
5. Recibirás una confirmación de envío

### Administrar Servicios

1. Accede al Panel de Administración desde el menú
2. Haz clic en "Crear Nuevo Servicio"
3. Completa el formulario con los datos del servicio
4. Haz clic en "Crear Servicio"
5. Para editar, haz clic en el botón "Editar" en la tabla
6. Para eliminar, haz clic en "Eliminar" y confirma

---

## Código Fuente

### Estructura de Componentes

**Header.tsx:** Componente de navegación principal con menú responsivo y contador de favoritos.

**Footer.tsx:** Pie de página con información de contacto y enlaces útiles.

**ServiceCard.tsx:** Componente reutilizable para mostrar tarjetas de servicios con imagen, nombre, descripción y botón de favoritos.

**Home.tsx:** Página de inicio con hero banner, servicios destacados, beneficios y testimonios.

**Services.tsx:** Página de listado con búsqueda, filtrado y paginación.

**ServiceDetail.tsx:** Página de detalle con información completa del servicio.

**Favorites.tsx:** Página de favoritos con lista personalizada.

**Contact.tsx:** Página de contacto con formulario validado.

**Admin.tsx:** Panel de administración con CRUD completo.

### Hooks Personalizados

**useFavorites.ts:** Hook que gestiona favoritos con localStorage, proporcionando funciones para agregar, eliminar y verificar favoritos.

### Contextos

**FavoritesContext.tsx:** Contexto global que proporciona acceso a favoritos en toda la aplicación sin prop drilling.

### Datos

**services.json:** Archivo JSON con 8 servicios de ejemplo en diferentes categorías, incluyendo nombre, descripción, precio, rating y características.

---

## Repositorio GitHub

El código fuente completo está disponible en GitHub:

**URL del Repositorio:** `https://github.com/tu-usuario/plataforma-servicios-digitales`

### Estructura del Repositorio

- **main:** Rama principal con código estable
- **develop:** Rama de desarrollo
- **feature/\*:** Ramas para nuevas características

### Commits Importantes

- Inicial: Scaffolding del proyecto con React y Tailwind
- Feature: Implementación de páginas principales
- Feature: Funcionalidad de favoritos con localStorage
- Feature: Formulario de contacto con validaciones
- Feature: Panel de administración con CRUD

---

## Conclusiones

La Plataforma de Servicios Digitales ha sido desarrollada exitosamente como un prototipo funcional que cumple con todos los requisitos especificados. La aplicación demuestra:

**Dominio de Tecnologías Front-end:** Uso efectivo de HTML, CSS, JavaScript y React para crear una interfaz moderna y responsiva.

**Arquitectura Limpia:** Código bien organizado con componentes reutilizables, contextos globales y hooks personalizados.

**Funcionalidades Completas:** Implementación de búsqueda, filtrado, gestión de favoritos, formularios validados y CRUD de servicios.

**Experiencia de Usuario:** Diseño minimalista moderno con navegación intuitiva y feedback visual claro.

**Persistencia de Datos:** Uso de localStorage para guardar favoritos y mensajes de contacto.

**Responsividad:** Diseño adaptable a diferentes tamaños de pantalla con menú hamburguesa en móviles.

La aplicación está lista para ser desplegada en plataformas como GitHub Pages, Netlify o Vercel, y proporciona una base sólida para futuras mejoras y expansiones.

---

## Referencias Bibliográficas

[1] React Documentation. (2024). "React: A JavaScript library for building user interfaces". Recuperado de https://react.dev/

[2] Tailwind CSS. (2024). "Rapidly build modern websites without leaving your HTML". Recuperado de https://tailwindcss.com/

[3] TypeScript. (2024). "TypeScript: JavaScript with syntax for types". Recuperado de https://www.typescriptlang.org/

[4] MDN Web Docs. (2024). "Web APIs - localStorage". Recuperado de https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

[5] Web.dev. (2024). "Web Performance Best Practices". Recuperado de https://web.dev/

[6] A11y Project. (2024). "Web Accessibility Guidelines". Recuperado de https://www.a11yproject.com/

[7] Vercel. (2024). "Vite Documentation". Recuperado de https://vitejs.dev/

[8] shadcn/ui. (2024). "Beautifully designed components built with Radix UI and Tailwind CSS". Recuperado de https://ui.shadcn.com/

---

**Documento preparado por:** Estudiante de Desarrollo Front-end  
**Fecha de entrega:** Abril 2026  
**Estado:** Completado y Funcional
