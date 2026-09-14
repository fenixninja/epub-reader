# Guía y Documentación de Iconos (`fenix_icons`)

Esta guía documenta la estructura, configuración y uso del conjunto de iconos ubicados en la carpeta [`fenix_icons`](file:///Users/fenixrios/Documents/CODIGO/epub-reader/fenix_icons), generados a través de [Favicon Generator](https://www.favicon-generator.org/).

---

## 1. Código HTML para el `<head>`

Para integrar el conjunto completo de iconos en tu documento HTML ([`index.html`](file:///Users/fenixrios/Documents/CODIGO/epub-reader/index.html)), se incluye el siguiente bloque dentro de la etiqueta `<head>`:

### Opción A: Rutas relativas a la carpeta `fenix_icons/` (Recomendado para GitHub Pages)
Dado que los archivos están alojados en la subcarpeta `fenix_icons/`, estas rutas relativas garantizan que funcionen tanto en local como en GitHub Pages (ej. `https://usuario.github.io/epub-reader/`):

```html
<!-- Apple Touch Icons (iOS Safari / Pantalla de inicio de iPhone e iPad) -->
<link rel="apple-touch-icon" sizes="57x57" href="fenix_icons/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="fenix_icons/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="fenix_icons/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="fenix_icons/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="fenix_icons/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="fenix_icons/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="fenix_icons/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="fenix_icons/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="fenix_icons/apple-icon-180x180.png">

<!-- Android & Chrome Web App -->
<link rel="icon" type="image/png" sizes="192x192" href="fenix_icons/android-icon-192x192.png">

<!-- Favicons estándar de navegador -->
<link rel="icon" type="image/x-icon" href="fenix_icons/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="fenix_icons/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="fenix_icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="fenix_icons/favicon-96x96.png">

<!-- Manifiesto Web & Color de tema móvil -->
<link rel="manifest" href="fenix_icons/manifest.json">
<meta name="theme-color" content="#ffffff">

<!-- Windows Tiles (Internet Explorer / Edge / Menú Inicio de Windows) -->
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="fenix_icons/ms-icon-144x144.png">
<meta name="msapplication-config" content="fenix_icons/browserconfig.xml">
```

### Opción B: Código original (si los archivos se encuentran en la raíz `/` del servidor)
```html
<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
```

> [!NOTE]
> En entornos como GitHub Pages bajo un subdirectorio (`https://fenixninja.github.io/epub-reader/`), usar rutas absolutas (`/archivo.png`) causaría un error 404 al apuntar a la raíz del dominio principal. Por esa razón se utilizan las rutas relativas `fenix_icons/...`.

---

## 2. Inventario y Organización de Archivos en `fenix_icons/`

| Categoría | Archivos | Finalidad |
| :--- | :--- | :--- |
| **Favicons Clásicos** | `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon-96x96.png`, `favicon-256x256.png` | Pestañas de navegador, marcadores, historial de navegación e iconos de alta resolución. |
| **Apple Touch Icons** | `apple-icon-57x57.png` hasta `180x180.png` | Acceso directo en pantalla de inicio de iPhone e iPad (pantallas estándar y Retina). |
| **Android / Chrome** | `android-icon-192x192.png` | Icono de launcher para dispositivos Android y Progressive Web Apps. |
| **Windows Tiles** | `ms-icon-70x70.png`, `144x144.png`, `150x150.png`, `310x310.png` | Mosaicos del menú Inicio de Windows y accesos anclados de IE/Edge. |
| **Configuraciones** | `manifest.json`, `browserconfig.xml`, `guía_de_uso.txt` | Metadatos de la aplicación web, definición de mosaicos para Windows y guía rápida de uso. |

---

## 3. Generación y Actualización de Iconos

- **Herramienta**: [Generate another favicon (Favicon Generator)](https://www.favicon-generator.org/)
- **Pasos para actualizar**:
  1. Diseña una imagen cuadrada de alta resolución (preferiblemente 512x512 px o 1024x1024 px en formato PNG transparente).
  2. En [favicon-generator.org](https://www.favicon-generator.org/), selecciona la opción *"Generate icons for Web, Android, Microsoft, and iOS (iPhone and iPad) Apps"*.
  3. Descarga el archivo comprimido `.zip` generado.
  4. Extrae y reemplaza los archivos correspondientes dentro de la carpeta [`fenix_icons/`](file:///Users/fenixrios/Documents/CODIGO/epub-reader/fenix_icons).

---

## 4. Conceptos y Referencia Técnica

### ¿Qué son los Favicons?
Los favicons son pequeños archivos de iconos (típicamente de 16x16 o 32x32 píxeles) que se muestran junto a la URL del sitio en la barra de direcciones del navegador. Además, se muestran habitualmente junto al nombre del sitio en las pestañas abiertas y en la lista de marcadores, facilitando al usuario identificar el sitio rápidamente entre otros.

### ¿Qué son los App Icons?
Los App Icons son las imágenes que pulsas en tu smartphone o tablet para abrir una aplicación o acceso directo web. Conforme se lanzan teléfonos con pantallas de mayor resolución, se requieren iconos de mayor definición. Para mantener soporte tanto en dispositivos antiguos con menor resolución como en pantallas modernas (Retina, AMOLED), se crean múltiples variaciones de tamaño de una misma imagen (iPhone, iPad, Android).

### ¿Qué hace la herramienta Favicon Generator?
Aunque muchos navegadores web modernos admiten favicons guardados como PNG, GIF u otros formatos populares, versiones clásicas de navegadores y ciertos sistemas siguen requiriendo favicons en formato `.ico` (el formato de icono de Microsoft). Esta herramienta proporciona una forma sencilla de convertir cualquier GIF, PNG o JPEG a `.ico` compatible con todos los navegadores, y genera automáticamente las variantes de tamaño necesarias para cada ecosistema móvil y de escritorio.
