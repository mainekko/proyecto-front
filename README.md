# 🚀 Plataforma de Servicios Digitales

**Proyecto de Desarrollo Front-end** - Entregas Semana 3 y Semana 5

Una aplicación web moderna que permite explorar, visualizar y gestionar un catálogo de servicios digitales en categorías como educación, tecnología, turismo y comercio.

---

## 📋 Contenido del Repositorio

Este repositorio contiene las entregas completas del módulo de Desarrollo Front-end:

### Semana 3: Maquetación y Diseño
- **Archivo:** `ENTREGA_SEMANA_3.docx`
- Propuesta de diseño minimalista moderno
- Mockups detallados de todas las páginas
- Paleta de colores y tipografía
- Sistema de espaciado
- Referencias bibliográficas en normas APA

### Semana 5: Prototipo Funcional
- **Archivo:** `ENTREGA_SEMANA_5.pdf`
- Documentación completa con normas APA
- Código fuente implementado
- Instrucciones de instalación y uso
- Funcionalidades completas

---

## ✨ Características Principales

- ✅ **Catálogo de Servicios:** Visualización en tarjetas interactivas
- ✅ **Búsqueda en Tiempo Real:** Búsqueda por nombre y palabras clave
- ✅ **Filtrado por Categoría:** Educación, Tecnología, Turismo, Comercio
- ✅ **Gestión de Favoritos:** Guardar servicios con localStorage
- ✅ **Detalle de Servicio:** Información completa con características
- ✅ **Formulario de Contacto:** Validaciones en tiempo real
- ✅ **Panel de Administración:** CRUD completo de servicios
- ✅ **Diseño Responsivo:** Mobile-first, adaptable a todos los dispositivos
- ✅ **Navegación Intuitiva:** Menú hamburguesa en móviles
- ✅ **Diseño Moderno:** Minimalista con animaciones suaves

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 19 | Framework UI |
| TypeScript | 5.6 | Tipado estático |
| Tailwind CSS | 4 | Estilos y utilidades |
| Wouter | 3.3 | Enrutamiento |
| shadcn/ui | Latest | Componentes UI |
| Lucide React | 0.453 | Iconografía |
| Vite | 7 | Build tool |
| Node.js | 22 | Runtime |
| pnpm | 10 | Gestor de paquetes |

---

## 📁 Estructura del Proyecto

```
plataforma-servicios-digitales/
├── client/
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── Header.tsx       # Navegación principal
│   │   │   ├── Footer.tsx       # Pie de página
│   │   │   ├── ServiceCard.tsx  # Tarjeta de servicio
│   │   │   └── ui/              # Componentes shadcn/ui
│   │   ├── contexts/            # Contextos globales
│   │   │   ├── ThemeContext.tsx
│   │   │   └── FavoritesContext.tsx
│   │   ├── hooks/               # Hooks personalizados
│   │   │   └── useFavorites.ts
│   │   ├── pages/               # Páginas de la aplicación
│   │   │   ├── Home.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── ServiceDetail.tsx
│   │   │   ├── Favorites.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Admin.tsx
│   │   │   └── NotFound.tsx
│   │   ├── data/
│   │   │   └── services.json    # Datos de servicios
│   │   ├── App.tsx              # Componente principal
│   │   ├── main.tsx             # Punto de entrada
│   │   └── index.css            # Estilos globales
│   ├── index.html
│   └── package.json
├── ENTREGA_SEMANA_3.docx        # Maquetación (Word)
├── ENTREGA_SEMANA_5.pdf         # Prototipo funcional (PDF)
├── ENTREGA_SEMANA_5.md          # Documentación Markdown
├── README_PROYECTO.md           # Documentación del proyecto
└── README.md                    # Este archivo
```

---

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js 18+
- pnpm (o npm/yarn)
- Git

### Pasos de Instalación

**1. Clonar el repositorio:**
```bash
git clone https://github.com/mainneko/proyecto-front.git
cd proyecto-front
```

**2. Instalar dependencias:**
```bash
pnpm install
```

**3. Iniciar servidor de desarrollo:**
```bash
pnpm dev
```

**4. Acceder a la aplicación:**
Abre tu navegador en `http://localhost:3000`

### Build para Producción
```bash
pnpm build
pnpm preview
```

---

## 📖 Guía de Uso

### Explorar Servicios
1. Desde la página de inicio, haz clic en "Explorar Servicios"
2. Usa la barra de búsqueda para encontrar servicios
3. Filtra por categoría usando los botones disponibles
4. Haz clic en "Ver Más" para ver detalles completos

### Guardar Favoritos
1. En cualquier tarjeta, haz clic en el icono de corazón
2. El servicio se agregará a tu lista de favoritos
3. Accede a favoritos desde el menú principal
4. Los favoritos se guardan automáticamente

### Contactar Proveedor
1. Ve a la página de Contacto
2. Completa el formulario con tus datos
3. Escribe tu mensaje (mínimo 10 caracteres)
4. Haz clic en "Enviar Mensaje"

### Administrar Servicios
1. Accede al Panel de Administración
2. Haz clic en "Crear Nuevo Servicio"
3. Completa el formulario
4. Haz clic en "Crear Servicio"
5. Para editar o eliminar, usa los botones en la tabla

---

## 📄 Páginas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con hero banner |
| `/servicios` | Listado completo de servicios |
| `/servicio/:id` | Detalle completo del servicio |
| `/favoritos` | Lista de servicios guardados |
| `/contacto` | Formulario de contacto |
| `/admin` | Panel de administración |

---

## 🎨 Diseño y Estilos

- **Paleta de Colores:** Azul profundo (#1E40AF) con grises neutrales
- **Tipografía:** Poppins (display) + Inter (body)
- **Espaciado:** Sistema basado en múltiplos de 8px
- **Componentes:** Minimalistas con sombras sutiles
- **Animaciones:** Transiciones suaves de 200-300ms
- **Responsividad:** Mobile-first (320px, 768px, 1024px+)

---

## 💾 Almacenamiento Local

La aplicación utiliza localStorage para:
- **favorites:** IDs de servicios favoritos del usuario
- **adminServices:** Servicios creados en el panel de administración
- **messages:** Mensajes de contacto enviados

---

## 🔍 Funcionalidades Detalladas

### Búsqueda y Filtrado
- Búsqueda en tiempo real por nombre o descripción
- Filtrado por categoría (Educación, Tecnología, Turismo, Comercio)
- Paginación de resultados (8 servicios por página)
- Contador de resultados encontrados

### Gestión de Favoritos
- Guardar/eliminar servicios favoritos
- Persistencia en localStorage
- Sincronización automática entre páginas
- Contador de favoritos en el header

### Validaciones
- Email válido en formulario de contacto
- Campos obligatorios
- Mensajes de error claros
- Feedback visual inmediato

### Panel de Administración
- Crear nuevos servicios
- Editar servicios existentes
- Eliminar servicios con confirmación
- Tabla de gestión con acciones rápidas

---

## 📊 Datos de Ejemplo

El proyecto incluye 8 servicios de ejemplo:

1. **Curso de Desarrollo Web** (Educación) - $299.99
2. **Consultoría IT Empresarial** (Tecnología) - $1500.00
3. **Paquete Turístico Caribe** (Turismo) - $2500.00
4. **Asesoría Empresarial Estratégica** (Comercio) - $800.00
5. **Bootcamp Full Stack** (Educación) - $1999.99
6. **Desarrollo de App Móvil** (Tecnología) - $3000.00
7. **Tour Gastronómico Europa** (Turismo) - $3500.00
8. **Marketing Digital Integral** (Comercio) - $1200.00

---

## 📚 Documentación

- **ENTREGA_SEMANA_3.docx** - Maquetación con normas APA
- **ENTREGA_SEMANA_5.pdf** - Prototipo funcional con normas APA
- **ENTREGA_SEMANA_5.md** - Documentación en Markdown
- **README_PROYECTO.md** - Documentación técnica del proyecto

---

## 🚀 Deployment

La aplicación puede desplegarse en:
- **GitHub Pages** - Hosting gratuito
- **Netlify** - Deployment automático desde Git
- **Vercel** - Optimizado para Next.js y React
- **Cualquier servidor estático** - Apache, Nginx, etc.

---

## 📝 Commits Principales

- **Initial commit:** Scaffolding del proyecto con React y Tailwind
- **Feature:** Implementación de páginas principales
- **Feature:** Funcionalidad de favoritos con localStorage
- **Feature:** Formulario de contacto con validaciones
- **Feature:** Panel de administración con CRUD

---

## 🔄 Mejoras Futuras

- Integración con backend real
- Autenticación de usuarios
- Carrito de compras
- Sistema de pagos con Stripe
- Reseñas y calificaciones de usuarios
- Chat en vivo con soporte
- Notificaciones push
- Análisis de datos y dashboard

---

## 📞 Contacto

Para preguntas o sugerencias, utiliza el formulario de contacto en la aplicación o abre un issue en este repositorio.

---

## 📄 Licencia

MIT - Libre para usar, modificar y distribuir

---

## 👨‍💻 Autor

**Estudiante de Desarrollo Front-end**  
**Módulo:** Desarrollo Front-end  
**Docente:** John Olarte Ramos  
**Fecha:** Abril 2026

---

**Última actualización:** Abril 2026  
**Estado:** ✅ Completado y Funcional
