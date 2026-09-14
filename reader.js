(() => {
  // ========== State ==========
  let book = null;
  let rendition = null;
  let currentTheme = localStorage.getItem("epub-theme") || "light";
  let fontSize = parseInt(localStorage.getItem("epub-font-size") || "100", 10);
  let currentFlow = localStorage.getItem("epub-flow") || "paginated";
  let bookKey = null; // used for saving progress

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
    }
  }

  // ========== Font size ==========
  function setFontSize(size) {
    fontSize = Math.max(70, Math.min(180, size));
    fontSizeValue.textContent = `${fontSize}%`;
    localStorage.setItem("epub-font-size", fontSize);
    if (rendition) {
      rendition.themes.fontSize(`${fontSize}%`);
    }
  }

  // ========== Flow ==========
  function setFlow(flow) {
    currentFlow = flow;
    localStorage.setItem("epub-flow", flow);
    document.querySelectorAll(".flow-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.flow === flow);
    });
    // Note: changing flow requires re-render; for simplicity we keep current session
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
    if (!bookKey || !cfi) return;
    localStorage.setItem(`epub-loc-${bookKey}`, cfi);
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
      // Clean previous
      if (book) {
        book.destroy();
        book = null;
        rendition = null;
      }
      viewer.innerHTML = "";
      tocList.innerHTML = "";

      book = ePub(source);
      bookKey = name.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 60);

      // Metadata
      book.loaded.metadata.then((meta) => {
        bookTitle.textContent = meta.title || name;
        bookAuthor.textContent = meta.creator || "";
        document.title = `${meta.title || name} · Lector EPUB`;
      });

      // Render
      const options = {
        width: "100%",
        height: "100%",
        flow: currentFlow === "scrolled" ? "scrolled-doc" : "paginated",
        manager: currentFlow === "scrolled" ? "continuous" : "default",
      };

      rendition = book.renderTo(viewer, options);

      // Apply theme + font
      applyTheme(currentTheme);
      setFontSize(fontSize);

      // Restore location or start
      const saved = loadSavedLocation();
      await rendition.display(saved || undefined);

      // Locations for progress
      book.ready.then(() => {
        book.locations.generate(1024).then(() => {
          const loc = rendition.currentLocation();
          if (loc && loc.start) {
            updateProgress(book.locations.percentageFromCfi(loc.start.cfi));
          }
        });
      });

      // Events
      rendition.on("relocated", (location) => {
        if (location && location.start) {
          const pct = book.locations.percentageFromCfi(location.start.cfi);
          updateProgress(pct);
          saveLocation(location.start.cfi);
        }
      });

      // TOC
      book.loaded.navigation.then((nav) => {
        buildToc(nav.toc);
      });

      // Keyboard
      rendition.on("keyup", keyListener);
      document.addEventListener("keyup", keyListener);

      // Show reader
      startScreen.classList.add("hidden");
      readerScreen.classList.remove("hidden");
    } catch (err) {
      console.error(err);
      alert("No se pudo abrir el EPUB.\n\n" + (err.message || err));
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

  // ========== Event listeners ==========
  // File input
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      openBook(ev.target.result, file.name);
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
      const reader = new FileReader();
      reader.onload = (ev) => openBook(ev.target.result, file.name);
      reader.readAsArrayBuffer(file);
    } else {
      alert("Por favor suelta un archivo .epub");
    }
  });

  // URL load
  loadUrlBtn.addEventListener("click", () => {
    const url = urlInput.value.trim();
    if (!url) return;
    openBook(url, url.split("/").pop() || "libro");
  });
  urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loadUrlBtn.click();
  });

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
    readerScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    document.title = "Lector EPUB · GitHub Pages";
    fileInput.value = "";
  });

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

  document.querySelectorAll(".flow-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setFlow(btn.dataset.flow);
      // Hint: user needs to reload book for flow change to take full effect
      alert("El modo de visualización se aplicará la próxima vez que abras un libro.");
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

  // Optional: auto-load from query string ?book=url
  const params = new URLSearchParams(location.search);
  const bookParam = params.get("book") || params.get("epub") || params.get("url");
  if (bookParam) {
    openBook(bookParam, bookParam.split("/").pop());
  }
})();
