# ENTREGA SEMANA 3: MAQUETACIÓN Y DISEÑO
## Plataforma de Servicios Digitales

**Autor:** Estudiante de Desarrollo Front-end  
**Fecha:** Abril 2026  
**Asignatura:** Módulo de Desarrollo Front-end  
**Docente:** John Olarte Ramos

---

## Tabla de Contenido

1. [Introducción](#introducción)
2. [Descripción del Proyecto](#descripción-del-proyecto)
3. [Propuesta de Diseño](#propuesta-de-diseño)
4. [Estructura de Páginas](#estructura-de-páginas)
5. [Mockups Detallados](#mockups-detallados)
6. [Funcionalidades](#funcionalidades)
7. [Tecnologías Utilizadas](#tecnologías-utilizadas)
8. [Conclusiones](#conclusiones)
9. [Referencias Bibliográficas](#referencias-bibliográficas)

---

## Introducción

La presente entrega corresponde a la fase inicial del proyecto "Plataforma de Servicios Digitales", donde se desarrolla la maquetación y diseño de una aplicación web tipo catálogo. Este documento presenta los mockups de las diferentes vistas de la aplicación, junto con la descripción detallada de las funcionalidades y elementos que la integran, siguiendo las orientaciones proporcionadas por el docente.

La propuesta de diseño se fundamenta en principios de minimalismo moderno, priorizando la claridad, la accesibilidad y la experiencia del usuario. Se ha seleccionado una paleta de colores neutral con acentos estratégicos, tipografía profesional y un sistema de espaciado consistente que facilita la navegación intuitiva.

---

## Descripción del Proyecto

### Objetivo General

Desarrollar una aplicación web que permita a los usuarios explorar, visualizar y gestionar un catálogo de servicios digitales, educativos, tecnológicos, turísticos y comerciales. La plataforma debe proporcionar una experiencia de usuario intuitiva y moderna, con funcionalidades interactivas que demuestren el dominio de tecnologías front-end como HTML, CSS, JavaScript y fundamentos básicos de Angular.

### Servicios Incluidos

La plataforma presentará servicios en las siguientes categorías:

- **Servicios Educativos:** Cursos en línea, capacitaciones, tutorías y programas de formación profesional.
- **Servicios Tecnológicos:** Consultoría IT, desarrollo de software, soporte técnico y soluciones digitales.
- **Servicios Turísticos:** Paquetes de viajes, experiencias locales, reservas de hospedaje y guías turísticas.
- **Servicios Comerciales:** Asesoría empresarial, marketing digital, consultoría de negocios y soluciones comerciales.

---

## Propuesta de Diseño

### Filosofía de Diseño: Minimalismo Moderno

La propuesta de diseño se basa en el movimiento de **Minimalismo Digital Contemporáneo**, combinando principios del diseño suizo con la estética nórdica moderna. Esta filosofía enfatiza la claridad radical, donde cada elemento visual tiene un propósito específico y contribuye a la comunicación efectiva del mensaje.

### Principios de Diseño

**Claridad Radical:** La interfaz elimina elementos decorativos innecesarios, permitiendo que los servicios sean el protagonista. Cada componente se diseña con un propósito funcional claro.

**Jerarquía Visual Fuerte:** Se utiliza tamaño, peso tipográfico y espaciado para guiar la atención del usuario hacia los elementos más importantes. Los títulos principales utilizan fuentes más grandes y bold, mientras que el texto secundario es más discreto.

**Espacio Negativo Generoso:** El uso estratégico de espacios en blanco crea respiro visual y mejora la legibilidad. No se considera el espacio vacío como desperdicio, sino como un elemento activo del diseño.

**Tipografía como Protagonista:** Las fuentes comunican la personalidad de la marca. Se combinan tipografías display (Poppins) para títulos con tipografías body (Inter) para contenido, creando una jerarquía clara y profesional.

### Paleta de Colores

| Color | Código | Uso | Propósito |
|-------|--------|-----|----------|
| Blanco | #FFFFFF | Fondo principal | Claridad y limpieza |
| Gris Claro | #F5F5F5 | Fondos secundarios | Diferenciación sutil |
| Gris Oscuro | #1F2937 | Texto principal | Legibilidad óptima |
| Azul Profundo | #1E40AF | Acentos y CTAs | Confianza y profesionalismo |
| Gris Medio | #9CA3AF | Texto secundario | Jerarquía visual |
| Gris Borde | #E5E7EB | Bordes y divisores | Separación sutil |

### Sistema Tipográfico

**Tipografía Display (Títulos):**
- Fuente: Poppins Bold
- Tamaño: 48px - 64px
- Uso: Títulos principales, encabezados de secciones
- Propósito: Crear impacto visual y comunicar importancia

**Tipografía Heading (Subtítulos):**
- Fuente: Outfit SemiBold
- Tamaño: 28px - 36px
- Uso: Subtítulos, nombres de servicios
- Propósito: Establecer jerarquía secundaria

**Tipografía Body (Cuerpo):**
- Fuente: Inter Regular
- Tamaño: 16px (principal), 14px (secundario)
- Uso: Descripción de servicios, texto de formularios
- Propósito: Máxima legibilidad y accesibilidad

### Espaciado y Grilla

Se utiliza un sistema de espaciado basado en múltiplos de 8 píxeles:

- **Espaciado Compacto:** 8px - 16px (elementos internos)
- **Espaciado Normal:** 24px - 32px (separación entre componentes)
- **Espaciado Generoso:** 48px - 64px (separación entre secciones)
- **Espaciado Máximo:** 80px - 120px (espacios principales)

### Componentes Visuales

**Tarjetas de Servicios:**
- Fondo: Blanco con borde sutil (#E5E7EB)
- Sombra: Mínima (0 2px 4px rgba(0,0,0,0.05))
- Esquinas: Redondeadas (8px)
- Padding: 24px
- Hover: Elevación sutil (sombra aumentada) + cambio de escala (1.02x)

**Botones:**
- Primario: Fondo azul profundo (#1E40AF), texto blanco
- Secundario: Borde azul profundo, fondo transparente, texto azul
- Hover: Cambio de color + sombra
- Transición: 200-300ms

**Formularios:**
- Inputs: Borde gris claro, fondo blanco
- Focus: Borde azul profundo, sombra azul sutil
- Validación: Indicadores visuales claros (rojo para error, verde para éxito)

---

## Estructura de Páginas

La plataforma contará con las siguientes páginas principales:

### 1. Página de Inicio (Home)
La página principal es el punto de entrada a la aplicación. Incluye un header atractivo, sección de bienvenida, servicios destacados, testimonios y llamados a la acción.

**Elementos Principales:**
- Header con logo y menú de navegación
- Banner hero con imagen de fondo y texto principal
- Sección de servicios destacados (4-6 cards)
- Sección informativa con beneficios
- Testimonios de usuarios
- Footer con información de contacto

### 2. Página de Listado de Servicios
Muestra todos los servicios disponibles en formato de grid de tarjetas, con opciones de filtrado y búsqueda.

**Elementos Principales:**
- Header con barra de búsqueda
- Filtros por categoría
- Grid de servicios (3-4 columnas en desktop)
- Paginación
- Footer

### 3. Página de Detalle de Servicio
Presenta la información completa de un servicio seleccionado, con imagen, descripción, precio, botones de interacción.

**Elementos Principales:**
- Imagen representativa del servicio
- Información detallada
- Botón "Agregar a Favoritos"
- Botón "Contactar"
- Servicios relacionados
- Footer

### 4. Página de Favoritos
Muestra la lista personalizada de servicios guardados por el usuario.

**Elementos Principales:**
- Lista de servicios favoritos
- Opción de eliminar de favoritos
- Botones de acción (ver detalle, contactar)
- Mensaje cuando no hay favoritos
- Footer

### 5. Página de Contacto
Formulario para que los usuarios se comuniquen con la plataforma.

**Elementos Principales:**
- Formulario con campos: nombre, correo, asunto, mensaje
- Validaciones en tiempo real
- Botón de envío
- Mensaje de confirmación
- Información de contacto
- Footer

### 6. Página de Administración (Mini CRUD)
Interfaz para crear, editar y eliminar servicios.

**Elementos Principales:**
- Tabla de servicios existentes
- Botón para crear nuevo servicio
- Formulario de edición/creación
- Botones de eliminar
- Confirmación de acciones
- Footer

---

## Mockups Detallados

### Mockup 1: Página de Inicio (Home)

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER                                   │
│  Logo    [Inicio] [Servicios] [Favoritos] [Contacto] [Admin]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                    BANNER HERO                                   │
│            Plataforma de Servicios Digitales                    │
│      Explora, Descubre y Conecta con Servicios de Calidad       │
│                    [Explorar Servicios]                         │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  SERVICIOS DESTACADOS                                            │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   [Imagen]   │  │   [Imagen]   │  │   [Imagen]   │          │
│  │ Educación    │  │ Tecnología   │  │ Turismo      │          │
│  │ Descripción  │  │ Descripción  │  │ Descripción  │          │
│  │  [Ver Más]   │  │  [Ver Más]   │  │  [Ver Más]   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  SECCIÓN INFORMATIVA                                             │
│  ¿Por qué elegirnos?                                             │
│  - Servicios de calidad verificados                             │
│  - Plataforma segura y confiable                                │
│  - Soporte al cliente 24/7                                      │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  TESTIMONIOS                                                     │
│  "Excelente plataforma..." - Usuario 1                          │
│  "Muy recomendado..." - Usuario 2                               │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                         FOOTER                                   │
│  © 2026 Plataforma de Servicios. Todos los derechos reservados  │
│  Contacto: info@plataforma.com | Teléfono: +57 300 000 0000    │
└─────────────────────────────────────────────────────────────────┘
```

### Mockup 2: Página de Listado de Servicios

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER                                   │
│  Logo    [Inicio] [Servicios] [Favoritos] [Contacto] [Admin]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  BARRA DE BÚSQUEDA Y FILTROS                                     │
│  [Buscar servicios...] [Filtrar por categoría ▼]               │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  GRID DE SERVICIOS (3 COLUMNAS)                                  │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   [Imagen]   │  │   [Imagen]   │  │   [Imagen]   │          │
│  │ Servicio 1   │  │ Servicio 2   │  │ Servicio 3   │          │
│  │ Descripción  │  │ Descripción  │  │ Descripción  │          │
│  │  [Ver Más]   │  │  [Ver Más]   │  │  [Ver Más]   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   [Imagen]   │  │   [Imagen]   │  │   [Imagen]   │          │
│  │ Servicio 4   │  │ Servicio 5   │  │ Servicio 6   │          │
│  │ Descripción  │  │ Descripción  │  │ Descripción  │          │
│  │  [Ver Más]   │  │  [Ver Más]   │  │  [Ver Más]   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  PAGINACIÓN: [< Anterior] [1] [2] [3] [Siguiente >]            │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                         FOOTER                                   │
│  © 2026 Plataforma de Servicios. Todos los derechos reservados  │
└─────────────────────────────────────────────────────────────────┘
```

### Mockup 3: Página de Detalle de Servicio

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER                                   │
│  Logo    [Inicio] [Servicios] [Favoritos] [Contacto] [Admin]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [< Volver]                                                      │
│                                                                   │
│  CONTENIDO PRINCIPAL                                             │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                           │   │
│  │              [Imagen del Servicio]                      │   │
│  │                                                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  Nombre del Servicio                                             │
│  ⭐⭐⭐⭐⭐ (5.0) - 120 reseñas                                   │
│                                                                   │
│  Descripción detallada del servicio...                          │
│                                                                   │
│  Características:                                                │
│  • Característica 1                                             │
│  • Característica 2                                             │
│  • Característica 3                                             │
│                                                                   │
│  Precio: $99.99                                                 │
│                                                                   │
│  [❤ Agregar a Favoritos]  [Contactar Proveedor]               │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  SERVICIOS RELACIONADOS                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   [Imagen]   │  │   [Imagen]   │  │   [Imagen]   │          │
│  │ Relacionado 1│  │ Relacionado 2│  │ Relacionado 3│          │
│  │  [Ver Más]   │  │  [Ver Más]   │  │  [Ver Más]   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                         FOOTER                                   │
│  © 2026 Plataforma de Servicios. Todos los derechos reservados  │
└─────────────────────────────────────────────────────────────────┘
```

### Mockup 4: Página de Contacto

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER                                   │
│  Logo    [Inicio] [Servicios] [Favoritos] [Contacto] [Admin]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  FORMULARIO DE CONTACTO                                          │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                           │   │
│  │  Ponte en Contacto con Nosotros                         │   │
│  │                                                           │   │
│  │  [Nombre]                                               │   │
│  │  [_________________________________]                   │   │
│  │                                                           │   │
│  │  [Correo Electrónico]                                   │   │
│  │  [_________________________________]                   │   │
│  │                                                           │   │
│  │  [Asunto]                                               │   │
│  │  [_________________________________]                   │   │
│  │                                                           │   │
│  │  [Mensaje]                                              │   │
│  │  [                                                       │   │
│  │   _________________________________                     │   │
│  │   _________________________________                     │   │
│  │   _________________________________]                    │   │
│  │                                                           │   │
│  │  [☐ Acepto los términos y condiciones]                  │   │
│  │                                                           │   │
│  │                [Enviar Mensaje]                         │   │
│  │                                                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  INFORMACIÓN DE CONTACTO                                         │
│  Correo: info@plataforma.com                                    │
│  Teléfono: +57 300 000 0000                                     │
│  Dirección: Calle Principal 123, Ciudad                         │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                         FOOTER                                   │
│  © 2026 Plataforma de Servicios. Todos los derechos reservados  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Funcionalidades

### Funcionalidades Principales

**1. Visualización de Servicios**

Los usuarios pueden explorar un catálogo completo de servicios presentados en tarjetas (cards) que muestran imagen, nombre, descripción breve y un botón de acción. Las tarjetas son responsivas y se adaptan a diferentes tamaños de pantalla.

**2. Búsqueda y Filtrado**

La plataforma incluye una barra de búsqueda que permite a los usuarios encontrar servicios por nombre o palabras clave. Además, se proporciona un sistema de filtrado por categoría (Educación, Tecnología, Turismo, Comercio).

**3. Detalle del Servicio**

Al hacer clic en "Ver Más", el usuario accede a una página detallada que muestra información completa del servicio, incluyendo descripción extendida, características, precio, calificación y reseñas.

**4. Gestión de Favoritos**

Los usuarios pueden guardar servicios en su lista de favoritos mediante un botón de corazón. Esta funcionalidad se implementa con localStorage, permitiendo que los favoritos persistan incluso después de cerrar la sesión.

**5. Formulario de Contacto**

Un formulario interactivo permite a los usuarios contactar directamente con los proveedores de servicios. Incluye validaciones básicas (campos obligatorios, formato de correo válido) y un mensaje de confirmación tras el envío.

**6. Mini CRUD de Servicios**

Una página de administración permite crear, editar y eliminar servicios. Esta funcionalidad es accesible solo desde una interfaz restringida y demuestra el dominio de operaciones CRUD básicas.

**7. Navegación Intuitiva**

El menú de navegación principal incluye al menos 5 páginas: Inicio, Servicios, Favoritos, Contacto y Administración. Cada página es accesible desde cualquier punto de la aplicación.

### Funcionalidades Interactivas

**Animaciones y Transiciones:**
- Entrada suave de elementos (fade-in + slide-up)
- Efectos hover en tarjetas (elevación sutil + cambio de escala)
- Transiciones fluidas entre páginas
- Micro-animaciones en botones y formularios

**Validaciones en Tiempo Real:**
- Validación de campos obligatorios en formularios
- Validación de formato de correo electrónico
- Mensajes de error y éxito claros
- Indicadores visuales de estado

**Responsividad:**
- Diseño mobile-first
- Adaptación automática a diferentes tamaños de pantalla
- Menú hamburguesa en dispositivos móviles
- Grid de servicios adaptable (1-4 columnas según pantalla)

---

## Tecnologías Utilizadas

### Lenguajes y Frameworks

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| HTML5 | 5 | Estructura y semántica |
| CSS3 | 3 | Estilos y diseño responsivo |
| JavaScript | ES6+ | Interactividad y lógica |
| React | 19 | Framework para componentes |
| Tailwind CSS | 4 | Utilidades CSS para estilos |

### Librerías y Herramientas

- **Wouter:** Enrutamiento del lado del cliente
- **shadcn/ui:** Componentes UI pre-construidos
- **Lucide React:** Iconografía moderna
- **localStorage/sessionStorage:** Almacenamiento de favoritos
- **JSON:** Formato de datos para servicios

### Herramientas de Desarrollo

- **Figma:** Diseño de mockups y prototipos
- **Git/GitHub:** Control de versiones
- **VS Code:** Editor de código
- **Vite:** Herramienta de construcción y desarrollo

---

## Conclusiones

La propuesta de maquetación para la Plataforma de Servicios Digitales se fundamenta en principios de diseño minimalista moderno, priorizando la claridad, la accesibilidad y la experiencia del usuario. El diseño propuesto es limpio, profesional y fácil de navegar, permitiendo que los servicios sean el protagonista de la interfaz.

La estructura de páginas es coherente y lógica, facilitando la navegación intuitiva del usuario. Las funcionalidades propuestas demuestran el dominio de tecnologías front-end esenciales como HTML, CSS, JavaScript y frameworks modernos como React.

El sistema de espaciado, tipografía y colores es consistente en toda la plataforma, creando una experiencia visual cohesiva. Las animaciones y transiciones son sutiles pero efectivas, mejorando la usabilidad sin distraer del contenido principal.

Se espera que la implementación de esta maquetación en las siguientes fases del proyecto resulte en una aplicación web funcional, moderna y profesional que cumpla con todos los requisitos especificados por el docente.

---

## Referencias Bibliográficas

[1] Nielsen, J. (2000). *Designing Web Usability: The Practice of Simplicity*. New Riders Publishing.

[2] Krug, S. (2014). *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability*. New Riders.

[3] Lidwell, W., Holden, K., & Butler, J. (2010). *Universal Principles of Design: 125 Ways to Enhance Usability, Influence Perception, and Increase Beauty*. Rockport Publishers.

[4] Garrett, J. J. (2011). *The Elements of User Experience: User-Centered Design for the Web and Beyond*. New Riders.

[5] Smashing Magazine. (2023). "Web Design Best Practices". Recuperado de https://www.smashingmagazine.com/

[6] Material Design. (2023). "Material Design Guidelines". Recuperado de https://material.io/design/

[7] A11y Project. (2023). "Web Accessibility Guidelines". Recuperado de https://www.a11yproject.com/

[8] W3C. (2023). "Web Content Accessibility Guidelines (WCAG)". Recuperado de https://www.w3.org/WAI/WCAG21/quickref/

---

**Documento preparado por:** Estudiante de Desarrollo Front-end  
**Fecha de entrega:** Abril 2026  
**Estado:** Completado
