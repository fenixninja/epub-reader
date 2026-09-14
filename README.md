# Lector EPUB estático para GitHub Pages

Lector de libros electrónicos EPUB 100% estático. Funciona directamente en GitHub Pages sin servidor.

## Características

- Cargar EPUB desde archivo (arrastrar o seleccionar)
- Cargar EPUB desde URL
- **Lectura Rápida (por defecto)**: Tipografía optimizada `Fast Sans` para acelerar el ritmo de lectura
- **Lectura Normal**: Tipografía Sans clásico de alta legibilidad
- **BeeLine Reader**: Guiado visual por degradados cromáticos entre líneas para evitar pérdidas de foco
  - 3 estilos modernos: *Atardecer*, *Océano* y *Aurora*
  - Adaptación cromática con alto contraste para Claro, Sepia y Oscuro
- Tabla de contenidos
- Temas: Claro / Sepia / Oscuro
- Ajuste de tamaño de fuente
- Navegación por teclado, botones y swipe
- Guarda automáticamente la posición de lectura
- Barra de progreso
- Soporte para `?book=URL` en la dirección

## Cómo usarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub (o usa uno existente).
2. Sube estos archivos a la raíz del repositorio (o a una carpeta):
   - `index.html`
   - `style.css`
   - `reader.js`
3. Ve a **Settings → Pages**.
4. En **Source** elige la rama `main` (o `master`) y la carpeta `/ (root)`.
5. Guarda. En 1-2 minutos tendrás la URL:
   `https://tu-usuario.github.io/nombre-repo/`

### Opción recomendada: incluir libros en el repo

Puedes subir tus archivos `.epub` a una carpeta, por ejemplo:

```
/
├── index.html
├── style.css
├── reader.js
└── libros/
    ├── mi-libro.epub
    └── otro.epub
```

Luego puedes abrirlos con:

```
https://tu-usuario.github.io/nombre-repo/?book=./libros/mi-libro.epub
```

O pegando la URL relativa en el campo de la pantalla de inicio.

## Uso local

Para probar en tu ordenador:

```bash
# Con Python
python -m http.server 8000

# O con Node
npx serve .
```

Abre `http://localhost:8000`.

## Controles

| Acción              | Cómo                          |
|---------------------|-------------------------------|
| Página siguiente    | → / Espacio / PageDown / swipe|
| Página anterior     | ← / PageUp / swipe            |
| Tabla de contenidos | Botón ☰                       |
| Ajustes             | Botón ⚙                       |
| Volver al inicio    | Botón ←                       |

## Tecnologías

- [epub.js](https://github.com/futurepress/epub.js) + JSZip
- HTML / CSS / JavaScript puro (sin build)

## Licencia

Libre para uso personal y comercial.
