# Plataforma de Servicios Digitales - Documentación del Proyecto

## Descripción General

Aplicación web moderna para explorar, visualizar y gestionar un catálogo de servicios digitales en categorías como educación, tecnología, turismo y comercio.

## Características Principales

- **Catálogo de Servicios:** Visualización de servicios en tarjetas interactivas
- **Búsqueda y Filtrado:** Búsqueda por nombre y filtrado por categoría
- **Gestión de Favoritos:** Guardar servicios favoritos con localStorage
- **Detalle de Servicio:** Información completa con características y proveedor
- **Formulario de Contacto:** Validaciones en tiempo real
- **Panel de Administración:** CRUD completo de servicios
- **Diseño Responsivo:** Adaptable a todos los dispositivos
- **Navegación Intuitiva:** Menú hamburguesa en móviles

## Stack Tecnológico

- **Frontend:** React 19 + TypeScript
- **Estilos:** Tailwind CSS 4
- **Enrutamiento:** Wouter
- **Componentes:** shadcn/ui
- **Iconos:** Lucide React
- **Build Tool:** Vite
- **Gestor de Paquetes:** pnpm

## Instalación y Ejecución

### Requisitos
- Node.js 18+
- pnpm o npm

### Pasos

```bash
# Clonar repositorio
git clone <url-repositorio>
cd plataforma-servicios-digitales

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Acceder a http://localhost:3000
```

## Estructura de Carpetas

```
client/src/
├── components/       # Componentes reutilizables
├── contexts/        # Contextos globales (Favoritos, Tema)
├── hooks/           # Hooks personalizados
├── pages/           # Páginas de la aplicación
├── data/            # Datos JSON
├── lib/             # Utilidades
└── App.tsx          # Componente principal
```

## Páginas Disponibles

- **/** - Página de inicio con hero banner y servicios destacados
- **/servicios** - Listado completo con búsqueda y filtrado
- **/servicio/:id** - Detalle completo del servicio
- **/favoritos** - Lista de servicios guardados
- **/contacto** - Formulario de contacto
- **/admin** - Panel de administración

## Funcionalidades Clave

### Gestión de Favoritos
- Guardar/eliminar servicios favoritos
- Persistencia en localStorage
- Sincronización automática entre páginas
- Contador en header

### Búsqueda y Filtrado
- Búsqueda en tiempo real
- Filtrado por categoría
- Paginación de resultados
- Contador de resultados

### Validaciones
- Email válido en formulario de contacto
- Campos obligatorios
- Mensajes de error claros
- Feedback visual inmediato

### Administración
- Crear nuevos servicios
- Editar servicios existentes
- Eliminar servicios
- Tabla de gestión

## Datos de Ejemplo

El proyecto incluye 8 servicios de ejemplo en `client/src/data/services.json`:

1. Curso de Desarrollo Web (Educación)
2. Consultoría IT Empresarial (Tecnología)
3. Paquete Turístico Caribe (Turismo)
4. Asesoría Empresarial Estratégica (Comercio)
5. Bootcamp Full Stack (Educación)
6. Desarrollo de App Móvil (Tecnología)
7. Tour Gastronómico Europa (Turismo)
8. Marketing Digital Integral (Comercio)

## Almacenamiento Local

La aplicación utiliza localStorage para:
- **favorites:** IDs de servicios favoritos
- **adminServices:** Servicios creados en admin
- **messages:** Mensajes de contacto enviados

## Diseño y Estilos

- **Paleta de Colores:** Azul profundo (#1E40AF) con grises neutrales
- **Tipografía:** Poppins (display) + Inter (body)
- **Espaciado:** Sistema basado en múltiplos de 8px
- **Componentes:** Minimalistas con sombras sutiles
- **Animaciones:** Transiciones suaves de 200-300ms

## Responsividad

- **Mobile:** 320px+
- **Tablet:** 768px+
- **Desktop:** 1024px+
- Menú hamburguesa en dispositivos pequeños
- Grid adaptable (1-4 columnas)

## Validaciones

### Formulario de Contacto
- Nombre: Requerido
- Email: Requerido y válido
- Asunto: Requerido
- Mensaje: Requerido, mínimo 10 caracteres

### Panel de Administración
- Nombre: Requerido
- Precio: Número válido
- Rating: 0-5
- Categoría: Seleccionada

## Performance

- Código optimizado con React.memo donde es necesario
- Uso de useMemo para cálculos costosos
- Lazy loading de componentes
- Imágenes optimizadas en CDN

## Accesibilidad

- Semántica HTML correcta
- Contraste de colores adecuado
- Labels en formularios
- Aria-labels donde es necesario
- Navegación por teclado

## Deployment

La aplicación puede desplegarse en:
- GitHub Pages
- Netlify
- Vercel
- Cualquier servidor estático

```bash
# Build para producción
pnpm build

# Archivos generados en dist/
```

## Mejoras Futuras

- Integración con backend real
- Autenticación de usuarios
- Carrito de compras
- Sistema de pagos
- Reseñas de usuarios
- Chat en vivo
- Notificaciones push
- Análisis de datos

## Autor

Estudiante de Desarrollo Front-end

## Licencia

MIT

## Contacto

Para preguntas o sugerencias, contactar a través del formulario de contacto en la aplicación.

---

**Última actualización:** Abril 2026
