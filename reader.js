(() => {
  // ========== State ==========
  let book = null;
  let rendition = null;
  let currentTheme = localStorage.getItem("epub-theme") || "light";
  let fontSize = parseInt(localStorage.getItem("epub-font-size") || "100", 10);
  let currentFlow = localStorage.getItem("epub-flow") || "paginated";
  let currentReadingMode = localStorage.getItem("epub-reading-mode") || "fast"; // "fast" por defecto
  let beelineEnabled = localStorage.getItem("epub-beeline-enabled") === "true";
  let beelineGradient = localStorage.getItem("epub-beeline-gradient") || "sunset";
  let bookKey = null; // used for saving progress

  // ========== BeeLine Palettes ==========
  const BEELINE_PALETTES = {
    sunset: {
      light: ["#312e81", "#be185d", "#c2410c"], // Indigo -> Rosa Magenta -> Coral Cálido
      sepia: ["#431407", "#9f1239", "#b45309"], // Borgoña -> Carmín -> Ámbar Tierra
      dark: ["#818cf8", "#f472b6", "#fb923c"],  // Lavanda -> Rosa Neón -> Melocotón
    },
    ocean: {
      light: ["#0369a1", "#0284c7", "#059669"], // Azul Océano -> Celeste Intenso -> Esmeralda
      sepia: ["#164e63", "#0f766e", "#15803d"], // Marino Oscuro -> Turquesa Pardo -> Verde Bosque
      dark: ["#38bdf8", "#2dd4bf", "#34d399"],  // Cian Brillante -> Turquesa Neón -> Menta Suave
    },
    aurora: {
      light: ["#6d28d9", "#2563eb", "#0d9488"], // Violeta Intenso -> Azul Real -> Verde Teal
      sepia: ["#581c87", "#1e40af", "#115e59"], // Púrpura Nocturno -> Azul Marino -> Pino Suave
      dark: ["#c084fc", "#60a5fa", "#2dd4bf"],  // Lila Neón -> Azul Eléctrico -> Aguamarina
    },
  };

  // ========== DOM ==========
  const $ = (sel) => document.querySelector(sel);
  const startScreen = $("#start-screen");
  const readerScreen = $("#reader-screen");
  const dropZone = $("#drop-zone");
  const fileInput = $("#file-input");
  const urlInput = $("#url-input");
  const loadUrlBtn = $("#load-url-btn");
  const viewer = $("#viewer");
  const bookTitle = $("#book-title");
  const bookAuthor = $("#book-author");
  const progressFill = $("#progress-fill");
  const progressText = $("#progress-text");
  const tocList = $("#toc-list");
  const tocPanel = $("#toc-panel");
  const settingsPanel = $("#settings-panel");
  const overlay = $("#overlay");
  const fontSizeValue = $("#font-size-value");
  const beelineToggle = $("#beeline-toggle");
  const beelinePaletteOptions = $("#beeline-palette-options");

  // Loader DOM
  const loaderOverlay = $("#loader-overlay");
  const loaderPercent = $("#loader-percent");
  const loaderProgressFill = $("#loader-progress-fill");
  const loaderStatus = $("#loader-status");
  const loaderErrorContainer = $("#loader-error-container");
  const loaderErrorText = $("#loader-error-text");
  const loaderErrorBtn = $("#loader-error-btn");

  // ========== Loader Functions ==========
  function showLoader(status = "Iniciando...", initialPct = 0) {
    loaderOverlay.classList.remove("hidden");
    loaderErrorContainer.classList.add("hidden");
    loaderPercent.classList.remove("hidden");
    const spinner = $(".loader-spinner-container");
    if (spinner) spinner.classList.remove("hidden");
    const bar = $(".loader-progress-bar");
    if (bar) bar.classList.remove("hidden");
    updateLoader(initialPct, status);
  }

  function updateLoader(pct, status) {
    const clamped = Math.max(0, Math.min(100, Math.round(pct)));
    if (loaderPercent) loaderPercent.textContent = `${clamped}%`;
    if (loaderProgressFill) loaderProgressFill.style.width = `${clamped}%`;
    if (status && loaderStatus) loaderStatus.textContent = status;
  }

  function hideLoader() {
    updateLoader(100, "¡Listo!");
    setTimeout(() => {
      loaderOverlay.classList.add("hidden");
    }, 280);
  }

  function showLoaderError(msg) {
    if (loaderPercent) loaderPercent.classList.add("hidden");
    const spinner = $(".loader-spinner-container");
    if (spinner) spinner.classList.add("hidden");
    const bar = $(".loader-progress-bar");
    if (bar) bar.classList.add("hidden");
    if (loaderStatus) loaderStatus.textContent = "Error al abrir el libro";
    if (loaderErrorText) loaderErrorText.textContent = msg;
    if (loaderErrorContainer) loaderErrorContainer.classList.remove("hidden");
  }

  // ========== Fonts & Reading Mode ==========
  function getFontFamily(mode = currentReadingMode) {
    return mode === "fast"
      ? "'Fast Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
  }

  function injectFontStyles(contents) {
    if (!contents || !contents.document) return;
    const doc = contents.document;
    const win = contents.window;

    // Redirigir unload dentro del iframe para compatibilidad con bfcache
    if (win && win.EventTarget && !win._bfcachePatched) {
      try {
        const origAdd = win.EventTarget.prototype.addEventListener;
        win.EventTarget.prototype.addEventListener = function (type, listener, options) {
          if (type === "unload") type = "pagehide";
          return origAdd.call(this, type, listener, options);
        };
        win._bfcachePatched = true;
      } catch (e) {
        // Ignorar si hay restricciones de acceso
      }
    }

    const fontUrl = new URL("fonts/Fast_Sans.ttf", window.location.href).href;

    let fontFaceEl = doc.getElementById("epub-font-face");
    if (!fontFaceEl) {
      fontFaceEl = doc.createElement("style");
      fontFaceEl.id = "epub-font-face";
      fontFaceEl.textContent = `
        @font-face {
          font-family: 'Fast Sans';
          src: url('${fontUrl}') format('truetype');
          font-weight: 100 900;
          font-style: normal;
          font-display: swap;
        }
      `;
      doc.head.appendChild(fontFaceEl);
    }

    let overrideEl = doc.getElementById("epub-font-override");
    if (!overrideEl) {
      overrideEl = doc.createElement("style");
      overrideEl.id = "epub-font-override";
      doc.head.appendChild(overrideEl);
    }
    overrideEl.textContent = `
      body, p, div, span, li, blockquote, a, em, strong {
        font-family: ${getFontFamily()} !important;
      }
    `;
  }

  function applyReadingMode(mode) {
    currentReadingMode = mode;
    localStorage.setItem("epub-reading-mode", mode);

    document.querySelectorAll(".reading-mode-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.readingMode === mode);
    });

    if (rendition) {
      const contents = rendition.getContents();
      if (contents) {
        contents.forEach(injectFontStyles);
      }
      rendition.themes.font(getFontFamily());
      if (beelineEnabled) {
        setTimeout(applyBeeLine, 80);
      }
    }
  }

  // ========== BeeLine Engine ==========
  function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    const num = parseInt(clean, 16);
    if (clean.length === 3) {
      return [
        ((num >> 8) & 0xf) * 17,
        ((num >> 4) & 0xf) * 17,
        (num & 0xf) * 17,
      ];
    }
    return [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];
  }

  function interpolateColor(color1, color2, factor) {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const r = Math.round(c1[0] + factor * (c2[0] - c1[0]));
    const g = Math.round(c1[1] + factor * (c2[1] - c1[1]));
    const b = Math.round(c1[2] + factor * (c2[2] - c1[2]));
    return `rgb(${r}, ${g}, ${b})`;
  }

  function clearBeeLine() {
    if (!rendition) return;
    const contents = rendition.getContents();
    if (!contents) return;
    contents.forEach((c) => {
      const doc = c.document;
      if (!doc) return;
      const elements = doc.querySelectorAll("[data-bl-original]");
      elements.forEach((el) => {
        el.innerHTML = el.dataset.blOriginal;
        delete el.dataset.blOriginal;
      });
    });
  }

  function wrapTextNodesIntoSpans(node) {
    if (node.nodeType === 3) { // Node.TEXT_NODE
      const text = node.nodeValue;
      if (!text || !text.trim()) return;
      const tokens = text.split(/(\s+)/);
      const frag = node.ownerDocument.createDocumentFragment();
      for (const token of tokens) {
        if (!token) continue;
        if (/^\s+$/.test(token)) {
          frag.appendChild(node.ownerDocument.createTextNode(token));
        } else {
          const span = node.ownerDocument.createElement("span");
          span.className = "bl-w";
          span.textContent = token;
          frag.appendChild(span);
        }
      }
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === 1) { // Node.ELEMENT_NODE
      const tag = node.tagName.toLowerCase();
      if (tag === "code" || tag === "pre" || tag === "script" || tag === "style" || node.classList.contains("bl-w")) {
        return;
      }
      Array.from(node.childNodes).forEach(wrapTextNodesIntoSpans);
    }
  }

  function applyBeeLine() {
    if (!rendition || !beelineEnabled) return;
    const contents = rendition.getContents();
    if (!contents || contents.length === 0) return;

    const themeKey = currentTheme === "dark" ? "dark" : (currentTheme === "sepia" ? "sepia" : "light");
    const palette = (BEELINE_PALETTES[beelineGradient] || BEELINE_PALETTES.sunset)[themeKey];

    contents.forEach((c) => {
      const doc = c.document;
      if (!doc) return;

      const blocks = doc.querySelectorAll("p, blockquote, li");
      if (blocks.length === 0) return;

      blocks.forEach((el) => {
        if (!el.textContent.trim()) return;
        if (!el.dataset.blOriginal) {
          el.dataset.blOriginal = el.innerHTML;
        } else {
          el.innerHTML = el.dataset.blOriginal;
        }
        wrapTextNodesIntoSpans(el);
      });

      const allSpans = Array.from(doc.querySelectorAll(".bl-w"));
      if (allSpans.length === 0) return;

      // Group words into visual lines in natural reading order
      const lines = [];
      let currentLine = [];
      let prevRect = null;

      for (const span of allSpans) {
        const rect = span.getBoundingClientRect();
        if (!rect.width && !rect.height) continue;
        if (!prevRect) {
          currentLine.push(span);
          prevRect = rect;
        } else {
          const isNewLine = Math.abs(rect.top - prevRect.top) > (rect.height * 0.4) || (rect.left < prevRect.left - 30);
          if (isNewLine) {
            if (currentLine.length > 0) lines.push(currentLine);
            currentLine = [span];
          } else {
            currentLine.push(span);
          }
          prevRect = rect;
        }
      }
      if (currentLine.length > 0) lines.push(currentLine);

      // Apply gradient across lines such that Line N end color matches Line N+1 start color
      lines.forEach((lineWords, lineIndex) => {
        const fromColor = palette[lineIndex % palette.length];
        const toColor = palette[(lineIndex + 1) % palette.length];
        const count = lineWords.length;
        lineWords.forEach((wordSpan, wordIndex) => {
          const t = count > 1 ? (wordIndex / (count - 1)) : 0.5;
          wordSpan.style.color = interpolateColor(fromColor, toColor, t);
        });
      });
    });
  }

  function setBeelineEnabled(enabled) {
    beelineEnabled = enabled;
    localStorage.setItem("epub-beeline-enabled", enabled);
    beelineToggle.checked = enabled;
    beelinePaletteOptions.classList.toggle("hidden", !enabled);

    if (enabled) {
      applyBeeLine();
    } else {
      clearBeeLine();
    }
  }

  function setBeelineGradient(gradient) {
    beelineGradient = gradient;
    localStorage.setItem("epub-beeline-gradient", gradient);

    document.querySelectorAll(".gradient-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.gradient === gradient);
    });

    if (beelineEnabled) {
      applyBeeLine();
    }
  }

  // ========== Theme ==========
  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("epub-theme", theme);

    document.querySelectorAll(".theme-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.theme === theme);
    });

    if (rendition) {
      const themes = {
        light: { body: { background: "#f8f6f1", color: "#1a1a1a" } },
        dark: { body: { background: "#121212", color: "#e8e8e8" } },
        sepia: { body: { background: "#f4ecd8", color: "#5b4636" } },
      };
      rendition.themes.default(themes[theme] || themes.light);
      rendition.themes.fontSize(`${fontSize}%`);
      rendition.themes.font(getFontFamily());
      if (beelineEnabled) {
        setTimeout(applyBeeLine, 60);
      }
    }
  }

  // ========== Font size ==========
  function setFontSize(size) {
    fontSize = Math.max(70, Math.min(180, size));
    fontSizeValue.textContent = `${fontSize}%`;
    localStorage.setItem("epub-font-size", fontSize);
    if (rendition) {
      rendition.themes.fontSize(`${fontSize}%`);
      if (beelineEnabled) {
        setTimeout(applyBeeLine, 100);
      }
    }
  }

  // ========== Flow ==========
  function setFlow(flow) {
    currentFlow = flow;
    localStorage.setItem("epub-flow", flow);
    document.querySelectorAll(".flow-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.flow === flow);
    });
  }

  // ========== Panels ==========
  function openPanel(panel) {
    panel.classList.add("open");
    overlay.classList.remove("hidden");
  }

  function closePanels() {
    tocPanel.classList.remove("open");
    settingsPanel.classList.remove("open");
    overlay.classList.add("hidden");
  }

  // ========== Progress ==========
  function updateProgress(percentage) {
    const pct = Math.round((percentage || 0) * 100);
    progressFill.style.width = `${pct}%`;
    progressText.textContent = `${pct}%`;
  }

  function saveLocation(cfi) {
    if (!bookKey) return;
    if (cfi) {
      localStorage.setItem(`epub-loc-${bookKey}`, cfi);
    } else {
      localStorage.removeItem(`epub-loc-${bookKey}`);
    }
  }

  function loadSavedLocation() {
    if (!bookKey) return null;
    return localStorage.getItem(`epub-loc-${bookKey}`);
  }

  // ========== TOC ==========
  function buildToc(toc, level = 1) {
    toc.forEach((item) => {
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = item.label;
      a.className = `toc-level-${Math.min(level, 3)}`;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        if (item.href) {
          rendition.display(item.href);
          closePanels();
        }
      });
      tocList.appendChild(a);
      if (item.subitems && item.subitems.length) {
        buildToc(item.subitems, level + 1);
      }
    });
  }

  // ========== Load book ==========
  async function openBook(source, name = "libro") {
    try {
      showLoader(window.i18n ? window.i18n.t("loader_decompressing", "Descomprimiendo libro...") : "Descomprimiendo libro...", 35);

      // Clean previous
      if (book) {
        book.destroy();
        book = null;
        rendition = null;
      }
      viewer.innerHTML = "";
      tocList.innerHTML = "";

      // Mostrar pantalla del lector de inmediato (bajo el loader flotante) para que #viewer tenga dimensiones reales calculadas
      startScreen.classList.add("hidden");
      readerScreen.classList.remove("hidden");

      // Esperar un frame para garantizar que el DOM calcule el tamaño de #viewer
      await new Promise((resolve) => requestAnimationFrame(resolve));

      book = ePub(source);
      bookKey = name.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 60);

      updateLoader(55, window.i18n ? window.i18n.t("loader_parsing", "Analizando contenedor y recursos...") : "Analizando contenedor y recursos...");

      // Metadata
      book.loaded.metadata.then((meta) => {
        bookTitle.textContent = meta.title || name;
        bookTitle.dataset.hasLoadedBook = "true";
        bookAuthor.textContent = meta.creator || "";
        document.title = `${meta.title || name} · EPUB`;
        updateLoader(72, window.i18n ? window.i18n.t("loader_metadata", "Cargando metadatos...") : "Cargando metadatos...");
      });

      // Render
      const options = {
        width: "100%",
        height: "100%",
        flow: currentFlow === "scrolled" ? "scrolled-doc" : "paginated",
        manager: currentFlow === "scrolled" ? "continuous" : "default",
      };

      rendition = book.renderTo(viewer, options);

      // Content hooks for typography & unload interception
      rendition.hooks.content.register((contents) => {
        injectFontStyles(contents);
      });

      rendition.on("rendered", () => {
        const contents = rendition.getContents();
        if (contents) {
          contents.forEach(injectFontStyles);
        }
        if (beelineEnabled) {
          setTimeout(applyBeeLine, 80);
        }
      });

      updateLoader(82, window.i18n ? window.i18n.t("loader_indexing", "Indexando capítulos...") : "Indexando capítulos...");

      // Apply theme + font
      applyTheme(currentTheme);
      setFontSize(fontSize);
      applyReadingMode(currentReadingMode);

      updateLoader(90, window.i18n ? window.i18n.t("loader_rendering", "Renderizando páginas...") : "Renderizando páginas...");

      // ========== Estrategia de Renderizado en Cascada (Fallback) ==========
      let displayed = false;
      const saved = loadSavedLocation();

      // Intento 1: Ubicación previamente guardada
      if (saved) {
        try {
          await rendition.display(saved);
          displayed = true;
        } catch (errSaved) {
          console.warn("Ubicación previa inválida o corrupta, descartando CFI:", errSaved);
          saveLocation(null);
        }
      }

      // Intento 2: Visualización predeterminada (inicio del libro)
      if (!displayed) {
        try {
          await rendition.display();
          displayed = true;
        } catch (errDef) {
          console.warn("rendition.display() estándar falló, probando primer elemento del spine:", errDef);
        }
      }

      // Intento 3: Primer elemento del spine (book.spine.spineItems[0])
      if (!displayed) {
        try {
          await book.loaded.spine;
          if (book.spine && book.spine.spineItems && book.spine.spineItems.length > 0) {
            const firstItem = book.spine.spineItems[0];
            await rendition.display(firstItem.href || firstItem.idref || 0);
            displayed = true;
          }
        } catch (errSpine) {
          console.warn("Error mostrando primer elemento del spine, probando navegación:", errSpine);
        }
      }

      // Intento 4: Primer capítulo del TOC
      if (!displayed) {
        try {
          const nav = await book.loaded.navigation;
          if (nav && nav.toc && nav.toc.length > 0 && nav.toc[0].href) {
            await rendition.display(nav.toc[0].href);
            displayed = true;
          }
        } catch (errToc) {
          console.warn("Error mostrando primer elemento del TOC:", errToc);
        }
      }

      if (!displayed) {
        throw new Error(window.i18n ? window.i18n.t("error_invalid_epub", "No se pudo mostrar ninguna sección del libro.") : "No se pudo mostrar ninguna sección del libro.");
      }

      // Forzar recarga y redibujado de la página (el mismo mecanismo que ocurre al pasar/retroceder página)
      try {
        rendition.resize();
        const loc = rendition.currentLocation();
        if (loc && loc.start && loc.start.cfi) {
          await rendition.display(loc.start.cfi);
        }
      } catch (refreshErr) {
        console.warn("Aviso en refresco de página:", refreshErr);
      }

      // Locations for progress
      book.ready.then(() => {
        book.locations.generate(1024).then(() => {
          const loc = rendition.currentLocation();
          if (loc && loc.start) {
            updateProgress(book.locations.percentageFromCfi(loc.start.cfi));
          }
        }).catch(() => {
          // Si falla generate, progreso aproximado sigue funcionando
        });
      });

      // Events
      rendition.on("relocated", (location) => {
        if (location && location.start) {
          if (book.locations && book.locations.length()) {
            const pct = book.locations.percentageFromCfi(location.start.cfi);
            updateProgress(pct);
          }
          saveLocation(location.start.cfi);
          if (beelineEnabled) {
            setTimeout(applyBeeLine, 80);
          }
        }
      });

      // TOC
      book.loaded.navigation.then((nav) => {
        buildToc(nav.toc);
      });

      // Keyboard
      rendition.on("keyup", keyListener);
      document.addEventListener("keyup", keyListener);

      // Esperar brevemente a que el iframe dibuje el contenido antes de desvanecer el loader
      await new Promise((resolve) => setTimeout(resolve, 160));

      // Finalizar loader
      hideLoader();
    } catch (err) {
      console.error(err);
      showLoaderError(err.message || String(err));
      readerScreen.classList.add("hidden");
      startScreen.classList.remove("hidden");
    }
  }

  function keyListener(e) {
    if (e.key === "ArrowLeft" || e.key === "PageUp") {
      rendition?.prev();
    }
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      rendition?.next();
    }
  }

  // Debounced window resize for rendition and BeeLine
  let resizeTimeout = null;
  window.addEventListener("resize", () => {
    if (rendition) {
      rendition.resize();
    }
    if (beelineEnabled && rendition) {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(applyBeeLine, 150);
    }
  });

  // ========== Helper para carga por URL con streaming ==========
  async function loadBookFromUrl(url, name) {
    const downloadMsg = window.i18n ? window.i18n.t("loader_downloading", "Descargando libro...") : "Descargando libro...";
    showLoader(downloadMsg, 5);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
      }

      const contentLength = response.headers.get("content-length");
      const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

      let buffer;
      if (totalBytes && response.body && response.body.getReader) {
        const reader = response.body.getReader();
        let receivedBytes = 0;
        const chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          receivedBytes += value.length;
          const pct = Math.round((receivedBytes / totalBytes) * 30);
          updateLoader(pct, downloadMsg);
        }
        const allChunks = new Uint8Array(receivedBytes);
        let position = 0;
        for (const chunk of chunks) {
          allChunks.set(chunk, position);
          position += chunk.length;
        }
        buffer = allChunks.buffer;
      } else {
        updateLoader(20, downloadMsg);
        buffer = await response.arrayBuffer();
      }

      await openBook(buffer, name);
    } catch (err) {
      console.error(err);
      const prefix = window.i18n ? window.i18n.t("error_url_load", "Error al cargar desde URL:\n") : "Error al cargar desde URL:\n";
      showLoaderError(`${prefix}${err.message || err}`);
    }
  }

  // ========== Event listeners ==========
  // File input
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const readMsg = window.i18n ? window.i18n.t("loader_parsing", "Leyendo archivo...") : "Leyendo archivo...";
    showLoader(readMsg, 5);
    const reader = new FileReader();

    reader.onprogress = (ev) => {
      if (ev.lengthComputable) {
        const pct = Math.round((ev.loaded / ev.total) * 30);
        updateLoader(pct, readMsg);
      }
    };

    reader.onload = (ev) => {
      openBook(ev.target.result, file.name);
    };

    reader.onerror = () => {
      showLoaderError(window.i18n ? window.i18n.t("error_file_read", "No se pudo leer el archivo seleccionado.") : "No se pudo leer el archivo seleccionado.");
    };

    reader.readAsArrayBuffer(file);
  });

  // Drag & drop
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file && file.name.toLowerCase().endsWith(".epub")) {
      const readMsg = window.i18n ? window.i18n.t("loader_parsing", "Leyendo archivo...") : "Leyendo archivo...";
      showLoader(readMsg, 5);
      const reader = new FileReader();
      reader.onprogress = (ev) => {
        if (ev.lengthComputable) {
          const pct = Math.round((ev.loaded / ev.total) * 30);
          updateLoader(pct, readMsg);
        }
      };
      reader.onload = (ev) => openBook(ev.target.result, file.name);
      reader.onerror = () => showLoaderError(window.i18n ? window.i18n.t("error_drag_read", "No se pudo leer el archivo arrastrado.") : "No se pudo leer el archivo arrastrado.");
      reader.readAsArrayBuffer(file);
    } else {
      alert(window.i18n ? window.i18n.t("error_not_epub", "Por favor suelta un archivo .epub") : "Por favor suelta un archivo .epub");
    }
  });

  // URL load
  loadUrlBtn.addEventListener("click", () => {
    const url = urlInput.value.trim();
    if (!url) return;
    loadBookFromUrl(url, url.split("/").pop() || "libro");
  });
  urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loadUrlBtn.click();
  });

  // Carga del libro de WhatAUTH (por defecto demo.epub hasta subir el libro final)
  const loadWhatAuthBtn = $("#load-whatauth-btn");
  if (loadWhatAuthBtn) {
    loadWhatAuthBtn.addEventListener("click", () => {
      const bookUrl = loadWhatAuthBtn.dataset.bookUrl || "./libros/demo.epub";
      loadBookFromUrl(bookUrl, "WhatAUTH.epub");
    });
  }

  // Navigation
  $("#prev").addEventListener("click", () => rendition?.prev());
  $("#next").addEventListener("click", () => rendition?.next());

  // Toolbar
  $("#btn-back").addEventListener("click", () => {
    if (book) {
      book.destroy();
      book = null;
      rendition = null;
    }
    document.removeEventListener("keyup", keyListener);
    viewer.innerHTML = "";
    tocList.innerHTML = "";
    bookTitle.dataset.hasLoadedBook = "";
    readerScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    document.title = window.i18n ? window.i18n.t("page_title", "Lector EPUB · GitHub Pages") : "Lector EPUB · GitHub Pages";
    fileInput.value = "";
    loaderOverlay.classList.add("hidden");
  });

  if (loaderErrorBtn) {
    loaderErrorBtn.addEventListener("click", () => {
      loaderOverlay.classList.add("hidden");
      $("#btn-back").click();
    });
  }

  $("#btn-toc").addEventListener("click", () => openPanel(tocPanel));
  $("#btn-settings").addEventListener("click", () => openPanel(settingsPanel));
  $("#close-toc").addEventListener("click", closePanels);
  $("#close-settings").addEventListener("click", closePanels);
  overlay.addEventListener("click", closePanels);

  // Settings
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyTheme(btn.dataset.theme));
  });

  $("#font-decrease").addEventListener("click", () => setFontSize(fontSize - 10));
  $("#font-increase").addEventListener("click", () => setFontSize(fontSize + 10));

  document.querySelectorAll(".reading-mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyReadingMode(btn.dataset.readingMode));
  });

  beelineToggle.addEventListener("change", (e) => {
    setBeelineEnabled(e.target.checked);
  });

  document.querySelectorAll(".gradient-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setBeelineGradient(btn.dataset.gradient);
    });
  });

  document.querySelectorAll(".flow-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setFlow(btn.dataset.flow);
      alert(window.i18n ? window.i18n.t("flow_alert", "El modo de visualización se aplicará la próxima vez que abras un libro.") : "El modo de visualización se aplicará la próxima vez que abras un libro.");
    });
  });

  // Touch swipe (basic)
  let touchStartX = 0;
  viewer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  viewer.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 60) {
      if (dx < 0) rendition?.next();
      else rendition?.prev();
    }
  }, { passive: true });

  // Init
  applyTheme(currentTheme);
  setFontSize(fontSize);
  setFlow(currentFlow);
  applyReadingMode(currentReadingMode);
  setBeelineEnabled(beelineEnabled);
  setBeelineGradient(beelineGradient);

  // Optional: auto-load from query string ?book=url
  const params = new URLSearchParams(location.search);
  const bookParam = params.get("book") || params.get("epub") || params.get("url");
  if (bookParam) {
    loadBookFromUrl(bookParam, bookParam.split("/").pop());
  }
})();
