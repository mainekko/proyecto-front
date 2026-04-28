# Plataforma de Servicios Digitales

Aplicación web desarrollada en **Angular 21** para gestionar y visualizar una oferta de servicios digitales en múltiples categorías. El proyecto implementa navegación por secciones, gestión de favoritos y un módulo administrativo con operaciones CRUD completas.

## Descripción del proyecto

**Plataforma de Servicios Digitales** es una solución frontend enfocada en presentar servicios de forma clara e interactiva, con una experiencia moderna para usuarios finales y un panel de administración para gestionar contenido.

Incluye:
- Catálogo de servicios por categorías.
- Vista de detalle por servicio.
- Sistema de favoritos persistente con `localStorage`.
- Módulo admin para crear, editar y eliminar servicios.
- Formularios reactivos con validaciones.

## Tecnologías usadas

- **Angular 21**
- **TypeScript**
- **Angular Router**
- **Reactive Forms**
- **RxJS**
- **HTML5 + CSS3**
- **TailwindCSS / PostCSS**
- **Angular CLI**
- **GitHub Pages** (deploy)

## Características principales

- ✅ Renderizado dinámico de servicios desde estructura JSON/datos del proyecto.
- ✅ Gestión por categorías: Educación, Tecnología, Turismo y Comercio.
- ✅ CRUD completo de servicios (Create, Read, Update, Delete).
- ✅ Formularios reactivos con validaciones de campos.
- ✅ Sistema de favoritos con persistencia en `localStorage`.
- ✅ Routing completo para páginas principales y detalle de servicio.
- ✅ Código estructurado por componentes y responsabilidades.

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm start
```

## Build de producción

```bash
npm run build
```

## Sitio desplegado

🔗 https://mainekko.github.io/proyecto-front/

## Estructura del proyecto

```text
proyecto-front/
├── src/
│   ├── app/
│   │   ├── core/            # Servicios, utilidades y lógica base
│   │   ├── features/        # Módulos/funcionalidades (inicio, servicios, admin, favoritos, etc.)
│   │   ├── layouts/         # Estructura visual (header, footer, navegación)
│   │   ├── app.routes.ts    # Configuración de rutas
│   │   └── app.config.ts    # Configuración global de la app
│   ├── main.ts              # Punto de entrada
│   └── styles.css           # Estilos globales
├── public/                  # Archivos públicos
├── angular.json             # Configuración Angular CLI
├── package.json             # Dependencias y scripts
└── README.md
```

## Créditos / Autor

Proyecto académico desarrollado por **mainekko**.
