# FNX EPUB Reader

Lector de libros electrónicos EPUB moderno, ligero y 100% estático (Client-Side). Diseñado para ejecutarse directamente en el navegador sin necesidad de servidores de backend, altamente optimizado para su despliegue en **GitHub Pages** u hosting estático.

---

## 🌟 Características Destacadas

- **Sin Servidor (100% Client-Side):** Todo el procesamiento, descompresión y renderizado se realiza en el navegador del usuario mediante Web Workers y APIs modernas.
- **Carga Flexible:**
  - Importación local arrastrando y soltando (`Drag & Drop`) o selector de archivos.
  - Carga remota vía URL (`?book=URL` en parámetros de dirección o mediante formulario interactivo).
- **Descompresión con Progreso en Vivo:** Barra de estado y porcentaje en tiempo real durante la extracción y parseo del archivo `.epub`.
- **Renderizado Dinámico y Robusto:** Apertura directa del libro desde la portada/primer capítulo con sistema de recuperación (*fallback*) automático ante fallos de índice.
- **Modos de Lectura Avanzados:**
  - **⚡ Lectura Rápida (Por defecto):** Integración con tipografía optimizada `Fast Sans` para acelerar el ritmo y comprensión de lectura.
  - **📖 Lectura Normal:** Tipografía sans-serif clásica de alta legibilidad y confort visual.
  - **🐝 BeeLine Reader:** Guiado visual mediante degradados cromáticos entre líneas para evitar la pérdida de fijación ocular (*Sunset*, *Ocean* y *Aurora* con contraste adaptativo).
- **Temas & Personalización:**
  - Modos Claro, Sepia y Oscuro con transición suave.
  - Ajuste granular del tamaño tipográfico.
  - Modos de flujo de lectura: Paginado o Scroll continuo.
- **Experiencia de Usuario (UX) y Navegación:**
  - Navegación táctil fluida (gestos *swipe*), por teclado y botones en pantalla.
  - Guardado automático de la última posición de lectura en `localStorage`.
  - Tabla de contenidos interactiva y barra de progreso.
  - Internacionalización multilingüe (i18n).
  - PWA Ready con soporte para *Back/Forward Cache* (`bfcache`) y navegación offline vía Service Worker.

---

## 🚀 Despliegue en GitHub Pages

1. **Clona o bifurca el repositorio:**
   ```bash
   git clone https://github.com/fenixninja/epub-reader.git
   ```
2. **Estructura base recomendada:**
   ```text
   .
   ├── index.html
   ├── style.css
   ├── reader.js
   ├── i18n.js
   ├── sw.js
   ├── manifest.json
   ├── fonts/
   └── libros/
       └── mi-libro.epub
   ```
3. **Configura GitHub Pages:**
   - En tu repositorio en GitHub, dirígete a **Settings** → **Pages**.
   - En **Source**, selecciona `Deploy from a branch`.
   - Elige la rama `main` (o `master`) y la carpeta `/ (root)`.
   - Guarda los cambios. En unos minutos estará disponible en `https://<tu-usuario>.github.io/<nombre-repo>/`.

### Abrir libros directamente vía URL

Puedes compartir enlaces que abran automáticamente un libro alojado en tu repositorio o en un servidor CORS habilitado:

```text
https://<tu-usuario>.github.io/<nombre-repo>/?book=./libros/mi-libro.epub
```

---

## 💻 Desarrollo y Uso Local

Para probar el lector en tu entorno local con cualquier servidor estático:

```bash
# Opción 1: Con Python 3
python3 -m http.server 8000

# Opción 2: Con Node.js (npx)
npx serve .
```

Accede desde tu navegador a `http://localhost:8000`.

---

## ⌨️ Atajos y Controles

| Acción | Método de Entrada |
| :--- | :--- |
| **Página siguiente** | Flecha derecha (`→`), Espacio, `PageDown` o deslizar a la izquierda (*swipe*) |
| **Página anterior** | Flecha izquierda (`←`), `PageUp` o deslizar a la derecha (*swipe*) |
| **Tabla de contenidos** | Botón menú `☰` |
| **Ajustes de lectura** | Botón de engranaje `⚙` |
| **Volver al inicio** | Botón de retroceso `←` |

---

## 🛠️ Tecnologías y Librerías Utilizadas

Este proyecto utiliza tecnologías web abiertas y las siguientes librerías de terceros:

- **[EPUB.js](https://github.com/futurepress/epub.js)** ([Documentación y Web Oficial](https://epubjs.org/)): Motor JavaScript para el análisis y renderizado de publicaciones digitales EPUB en el navegador.
- **[JSZip](https://stuk.github.io/jszip/)** ([Repositorio Oficial](https://github.com/Stuk/jszip)): Biblioteca de descompresión y lectura de archivos `.zip` y paquetes EPUB directamente en JavaScript.
- **HTML5, CSS3 & JavaScript (ES6+):** Arquitectura sin empaquetadores ni dependencias de compilación en tiempo de ejecución.

---

## 📄 Licencia

Este proyecto está bajo la licencia **[Creative Commons Atribución-NoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/deed.es)**.

### Condiciones principales:

- ✅ **Uso no comercial:** Se permite copiar, distribuir, exhibir y crear obras derivadas para fines no comerciales, personales o educativos.
- ❗ **Atribución requerida:** Se debe otorgar el crédito correspondiente al autor original, proporcionar un enlace a la licencia e indicar si se realizaron cambios.
- ❌ **Prohibido el uso comercial:** No se puede comercializar ni usar el material con propósitos comerciales o lucrativos sin autorización previa por escrito del autor.

**Autor:** [fenix.ninja](https://fenix.ninja) • [Repositorio en GitHub](https://github.com/fenixninja/epub-reader)
