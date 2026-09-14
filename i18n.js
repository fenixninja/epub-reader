// Diccionario de idiomas y motor i18n ligero
const I18N_TRANSLATIONS = {
  es: {
    meta: { name: "Español", flag: "🇪🇸" },
    page_title: "Lector EPUB · GitHub Pages",
    app_title: "EPUB",
    app_subtitle: "Lector de libros EPUB",
    drop_title: "Arrastra un archivo <strong>.epub</strong> aquí",
    drop_or: "o",
    drop_choose: "Elegir archivo",
    url_heading: "O carga desde una URL:",
    url_placeholder: "https://ejemplo.com/libro.epub",
    url_load_btn: "Cargar",
    whatauth_badge: "Libro gratis",
    whatauth_title: "Leer el libro de <strong>WhatAUTH</strong> gratis",
    footer_author: "Autor:",
    footer_github: "Ver código en GitHub",
    lang_selector_label: "Idioma",
    // Toolbar & Nav
    btn_back: "Volver",
    btn_toc: "Tabla de contenidos",
    btn_settings: "Ajustes",
    nav_prev: "Anterior",
    nav_next: "Siguiente",
    book_loading: "Cargando...",
    // Panels
    panel_toc_title: "Contenidos",
    panel_settings_title: "Ajustes",
    setting_language: "Idioma",
    setting_theme: "Tema",
    theme_light: "Claro",
    theme_sepia: "Sepia",
    theme_dark: "Oscuro",
    setting_reading_mode: "Modo de lectura",
    mode_fast_title: "⚡ Lectura rápida",
    mode_fast_sub: "Fast Sans",
    mode_fast_tooltip: "Lectura rápida con tipografía optimizada Fast Sans",
    mode_normal_title: "📖 Lectura normal",
    mode_normal_sub: "Sans clásico",
    mode_normal_tooltip: "Lectura tradicional con tipografía Sans",
    beeline_title: "BeeLine Reader",
    beeline_hint: "Degradados de color en cada línea que guían la vista para leer más rápido y sin saltos.",
    beeline_style_label: "Estilo de degradado",
    gradient_sunset_name: "Atardecer",
    gradient_sunset_tooltip: "Degradado Atardecer: Violeta, Magenta y Coral",
    gradient_ocean_name: "Océano",
    gradient_ocean_tooltip: "Degradado Océano: Azul, Cian y Esmeralda",
    gradient_aurora_name: "Aurora",
    gradient_aurora_tooltip: "Degradado Aurora: Púrpura, Azul Neón y Menta",
    setting_font_size: "Tamaño de fuente",
    setting_flow: "Modo de visualización",
    flow_paginated: "Páginas",
    flow_scrolled: "Scroll",
    flow_alert: "El modo de visualización se aplicará la próxima vez que abras un libro.",
    // Loader
    loader_decompressing: "Descomprimiendo libro...",
    loader_downloading: "Descargando libro...",
    loader_parsing: "Analizando contenedor y recursos...",
    loader_metadata: "Cargando metadatos...",
    loader_indexing: "Indexando capítulos...",
    loader_rendering: "Renderizando páginas...",
    loader_error_return: "Volver al inicio",
    error_not_epub: "Por favor suelta un archivo .epub",
    error_drag_read: "No se pudo leer el archivo arrastrado.",
    error_file_read: "No se pudo leer el archivo seleccionado.",
    error_invalid_epub: "No se pudo mostrar ninguna sección del libro. Comprueba que el archivo sea un EPUB válido.",
    error_url_load: "Error al cargar desde URL:\n"
  },
  en: {
    meta: { name: "English", flag: "🇺🇸" },
    page_title: "EPUB Reader · GitHub Pages",
    app_title: "EPUB",
    app_subtitle: "EPUB Book Reader",
    drop_title: "Drag an <strong>.epub</strong> file here",
    drop_or: "or",
    drop_choose: "Choose file",
    url_heading: "Or load from a URL:",
    url_placeholder: "https://example.com/book.epub",
    url_load_btn: "Load",
    whatauth_badge: "Free Book",
    whatauth_title: "Read <strong>WhatAUTH</strong> book for free",
    footer_author: "Author:",
    footer_github: "View code on GitHub",
    lang_selector_label: "Language",
    // Toolbar & Nav
    btn_back: "Back",
    btn_toc: "Table of contents",
    btn_settings: "Settings",
    nav_prev: "Previous",
    nav_next: "Next",
    book_loading: "Loading...",
    // Panels
    panel_toc_title: "Contents",
    panel_settings_title: "Settings",
    setting_language: "Language",
    setting_theme: "Theme",
    theme_light: "Light",
    theme_sepia: "Sepia",
    theme_dark: "Dark",
    setting_reading_mode: "Reading Mode",
    mode_fast_title: "⚡ Fast Reading",
    mode_fast_sub: "Fast Sans",
    mode_fast_tooltip: "Speed reading with optimized Fast Sans font",
    mode_normal_title: "📖 Normal Reading",
    mode_normal_sub: "Classic Sans",
    mode_normal_tooltip: "Traditional reading with classic Sans font",
    beeline_title: "BeeLine Reader",
    beeline_hint: "Color gradients on every line to guide your eyes and read faster without line slips.",
    beeline_style_label: "Gradient style",
    gradient_sunset_name: "Sunset",
    gradient_sunset_tooltip: "Sunset gradient: Violet, Magenta and Coral",
    gradient_ocean_name: "Ocean",
    gradient_ocean_tooltip: "Ocean gradient: Blue, Cyan and Emerald",
    gradient_aurora_name: "Aurora",
    gradient_aurora_tooltip: "Aurora gradient: Purple, Neon Blue and Mint",
    setting_font_size: "Font size",
    setting_flow: "Display mode",
    flow_paginated: "Pages",
    flow_scrolled: "Scroll",
    flow_alert: "Display mode will apply the next time you open a book.",
    // Loader
    loader_decompressing: "Decompressing book...",
    loader_downloading: "Downloading book...",
    loader_parsing: "Analyzing container and resources...",
    loader_metadata: "Loading metadata...",
    loader_indexing: "Indexing chapters...",
    loader_rendering: "Rendering pages...",
    loader_error_return: "Back to home",
    error_not_epub: "Please drop an .epub file",
    error_drag_read: "Could not read the dropped file.",
    error_file_read: "Could not read the selected file.",
    error_invalid_epub: "Could not display any section of the book. Make sure it is a valid EPUB file.",
    error_url_load: "Error loading from URL:\n"
  },
  de: {
    meta: { name: "Deutsch", flag: "🇩🇪" },
    page_title: "EPUB-Reader · GitHub Pages",
    app_title: "EPUB",
    app_subtitle: "EPUB-Buchleser",
    drop_title: "Ziehe eine <strong>.epub</strong>-Datei hierher",
    drop_or: "oder",
    drop_choose: "Datei auswählen",
    url_heading: "Oder von einer URL laden:",
    url_placeholder: "https://beispiel.de/buch.epub",
    url_load_btn: "Laden",
    whatauth_badge: "Kostenloses Buch",
    whatauth_title: "Lies das <strong>WhatAUTH</strong>-Buch kostenlos",
    footer_author: "Autor:",
    footer_github: "Code auf GitHub ansehen",
    lang_selector_label: "Sprache",
    // Toolbar & Nav
    btn_back: "Zurück",
    btn_toc: "Inhaltsverzeichnis",
    btn_settings: "Einstellungen",
    nav_prev: "Vorherige",
    nav_next: "Nächste",
    book_loading: "Wird geladen...",
    // Panels
    panel_toc_title: "Inhalte",
    panel_settings_title: "Einstellungen",
    setting_language: "Sprache",
    setting_theme: "Design",
    theme_light: "Hell",
    theme_sepia: "Sepia",
    theme_dark: "Dunkel",
    setting_reading_mode: "Lesemodus",
    mode_fast_title: "⚡ Schnelllesen",
    mode_fast_sub: "Fast Sans",
    mode_fast_tooltip: "Schnelllese-Modus mit optimierter Fast Sans Schriftart",
    mode_normal_title: "📖 Normales Lesen",
    mode_normal_sub: "Klassisches Sans",
    mode_normal_tooltip: "Traditionelles Lesen mit klassischer Sans-Schrift",
    beeline_title: "BeeLine Reader",
    beeline_hint: "Farbverläufe auf jeder Zeile führen das Auge und ermöglichen schnelleres Lesen ohne Zeilenverlust.",
    beeline_style_label: "Verlaufstil",
    gradient_sunset_name: "Abendrot",
    gradient_sunset_tooltip: "Abendrot-Farbverlauf: Violett, Magenta und Koralle",
    gradient_ocean_name: "Ozean",
    gradient_ocean_tooltip: "Ozean-Farbverlauf: Blau, Cyan und Smaragd",
    gradient_aurora_name: "Polarlichter",
    gradient_aurora_tooltip: "Polarlicht-Farbverlauf: Lila, Neonblau und Minze",
    setting_font_size: "Schriftgröße",
    setting_flow: "Anzeigemodus",
    flow_paginated: "Seiten",
    flow_scrolled: "Scrollen",
    flow_alert: "Der Anzeigemodus wird beim nächsten Öffnen eines Buches angewendet.",
    // Loader
    loader_decompressing: "Buch wird entpackt...",
    loader_downloading: "Buch wird heruntergeladen...",
    loader_parsing: "Container und Ressourcen werden analysiert...",
    loader_metadata: "Metadaten werden geladen...",
    loader_indexing: "Kapitel werden indexiert...",
    loader_rendering: "Seiten werden gerendert...",
    loader_error_return: "Zurück zum Start",
    error_not_epub: "Bitte lege eine .epub-Datei ab",
    error_drag_read: "Die abgelegte Datei konnte nicht gelesen werden.",
    error_file_read: "Die ausgewählte Datei konnte nicht gelesen werden.",
    error_invalid_epub: "Kein Abschnitt des Buches konnte angezeigt werden. Bitte stelle sicher, dass es eine gültige EPUB-Datei ist.",
    error_url_load: "Fehler beim Laden von URL:\n"
  },
  fr: {
    meta: { name: "Français", flag: "🇫🇷" },
    page_title: "Lecteur EPUB · GitHub Pages",
    app_title: "EPUB",
    app_subtitle: "Lecteur de livres EPUB",
    drop_title: "Glissez un fichier <strong>.epub</strong> ici",
    drop_or: "ou",
    drop_choose: "Choisir un fichier",
    url_heading: "Ou charger depuis une URL :",
    url_placeholder: "https://exemple.fr/livre.epub",
    url_load_btn: "Charger",
    whatauth_badge: "Livre gratuit",
    whatauth_title: "Lire le livre <strong>WhatAUTH</strong> gratuitement",
    footer_author: "Auteur :",
    footer_github: "Voir le code sur GitHub",
    lang_selector_label: "Langue",
    // Toolbar & Nav
    btn_back: "Retour",
    btn_toc: "Table des matières",
    btn_settings: "Paramètres",
    nav_prev: "Précédent",
    nav_next: "Suivant",
    book_loading: "Chargement...",
    // Panels
    panel_toc_title: "Contenu",
    panel_settings_title: "Paramètres",
    setting_language: "Langue",
    setting_theme: "Thème",
    theme_light: "Clair",
    theme_sepia: "Sépia",
    theme_dark: "Sombre",
    setting_reading_mode: "Mode de lecture",
    mode_fast_title: "⚡ Lecture rapide",
    mode_fast_sub: "Fast Sans",
    mode_fast_tooltip: "Lecture rapide avec la police optimisée Fast Sans",
    mode_normal_title: "📖 Lecture normale",
    mode_normal_sub: "Sans classique",
    mode_normal_tooltip: "Lecture classique avec police Sans traditionnelle",
    beeline_title: "BeeLine Reader",
    beeline_hint: "Dégradés de couleurs sur chaque ligne guidant le regard pour lire plus vite et sans sauts.",
    beeline_style_label: "Style de dégradé",
    gradient_sunset_name: "Crépuscule",
    gradient_sunset_tooltip: "Dégradé Crépuscule : Violet, Magenta et Corail",
    gradient_ocean_name: "Océan",
    gradient_ocean_tooltip: "Dégradé Océan : Bleu, Cyan et Émeraude",
    gradient_aurora_name: "Aurore",
    gradient_aurora_tooltip: "Dégradé Aurore : Violet, Bleu Néon et Menthe",
    setting_font_size: "Taille de police",
    setting_flow: "Mode d'affichage",
    flow_paginated: "Pages",
    flow_scrolled: "Défilement",
    flow_alert: "Le mode d'affichage sera appliqué la prochaine fois que vous ouvrirez un livre.",
    // Loader
    loader_decompressing: "Décompression du livre...",
    loader_downloading: "Téléchargement du livre...",
    loader_parsing: "Analyse du conteneur et des ressources...",
    loader_metadata: "Chargement des métadonnées...",
    loader_indexing: "Indexation des chapitres...",
    loader_rendering: "Rendu des pages...",
    loader_error_return: "Retour à l'accueil",
    error_not_epub: "Veuillez déposer un fichier .epub",
    error_drag_read: "Impossible de lire le fichier déposé.",
    error_file_read: "Impossible de lire le fichier sélectionné.",
    error_invalid_epub: "Impossible d'afficher les sections du livre. Vérifiez qu'il s'agit d'un fichier EPUB valide.",
    error_url_load: "Erreur lors du chargement depuis l'URL :\n"
  },
  hi: {
    meta: { name: "हिन्दी", flag: "🇮🇳" },
    page_title: "EPUB रीडर · GitHub Pages",
    app_title: "EPUB",
    app_subtitle: "EPUB पुस्तक पाठक",
    drop_title: "यहाँ एक <strong>.epub</strong> फ़ाइल खींचें",
    drop_or: "या",
    drop_choose: "फ़ाइल चुनें",
    url_heading: "या URL से लोड करें:",
    url_placeholder: "https://example.com/book.epub",
    url_load_btn: "लोड करें",
    whatauth_badge: "मुफ़्त किताब",
    whatauth_title: "<strong>WhatAUTH</strong> किताब मुफ़्त में पढ़ें",
    footer_author: "लेखक:",
    footer_github: "GitHub पर कोड देखें",
    lang_selector_label: "भाषा",
    // Toolbar & Nav
    btn_back: "वापस",
    btn_toc: "विषय सूची",
    btn_settings: "सेटिंग्स",
    nav_prev: "पिछला",
    nav_next: "अगला",
    book_loading: "लोड हो रहा है...",
    // Panels
    panel_toc_title: "सामग्री",
    panel_settings_title: "सेटिंग्स",
    setting_language: "भाषा",
    setting_theme: "थीम",
    theme_light: "लाइट",
    theme_sepia: "सेपिया",
    theme_dark: "डार्क",
    setting_reading_mode: "पठन मोड",
    mode_fast_title: "⚡ तेज़ पठन",
    mode_fast_sub: "Fast Sans",
    mode_fast_tooltip: "अनुकूलित Fast Sans फ़ॉन्ट के साथ तेज़ पठन",
    mode_normal_title: "📖 सामान्य पठन",
    mode_normal_sub: "क्लासिक Sans",
    mode_normal_tooltip: "क्लासिक Sans फ़ॉन्ट के साथ पारंपरिक पठन",
    beeline_title: "BeeLine Reader",
    beeline_hint: "प्रत्येक पंक्ति पर रंग ढाल जो आँखों को तेज़ी से और बिना चूके पढ़ने में मदद करते हैं।",
    beeline_style_label: "ग्रेडिएंट शैली",
    gradient_sunset_name: "सूर्यास्त",
    gradient_sunset_tooltip: "सूर्यास्त ग्रेडिएंट: बैंगनी, मैजेंटा और कोरल",
    gradient_ocean_name: "महासागर",
    gradient_ocean_tooltip: "महासागर ग्रेडिएंट: नीला, सियान और पन्ना",
    gradient_aurora_name: "अरोरा",
    gradient_aurora_tooltip: "अरोरा ग्रेडिएंट: जामुनी, नियॉन नीला और पुदीना",
    setting_font_size: "फ़ॉन्ट का आकार",
    setting_flow: "प्रदर्शन मोड",
    flow_paginated: "पृष्ठ",
    flow_scrolled: "स्क्रॉल",
    flow_alert: "अगली बार जब आप कोई किताब खोलेंगे तो प्रदर्शन मोड लागू होगा।",
    // Loader
    loader_decompressing: "किताब डिकम्प्रेस हो रही है...",
    loader_downloading: "किताब डाउनलोड हो रही है...",
    loader_parsing: "फ़ाइल और संसाधनों का विश्लेषण...",
    loader_metadata: "मेटाडेटा लोड हो रहा है...",
    loader_indexing: "अध्याय अनुक्रमित हो रहे हैं...",
    loader_rendering: "पृष्ठ रेंडर हो रहे हैं...",
    loader_error_return: "होम पर लौटें",
    error_not_epub: "कृपया एक .epub फ़ाइल छोड़ें",
    error_drag_read: "छोड़ी गई फ़ाइल को पढ़ा नहीं जा सका।",
    error_file_read: "चयनित फ़ाइल को पढ़ा नहीं जा सका।",
    error_invalid_epub: "पुस्तक का कोई भी भाग प्रदर्शित नहीं हो सका। कृपया सुनिश्चित करें कि यह एक मान्य EPUB फ़ाइल है।",
    error_url_load: "URL से लोड करने में त्रुटि:\n"
  },
  zh: {
    meta: { name: "中文", flag: "🇨🇳" },
    page_title: "EPUB 阅读器 · GitHub Pages",
    app_title: "EPUB",
    app_subtitle: "EPUB 电子书阅读器",
    drop_title: "拖拽 <strong>.epub</strong> 文件到这里",
    drop_or: "或",
    drop_choose: "选择文件",
    url_heading: "或者从网址加载：",
    url_placeholder: "https://example.com/book.epub",
    url_load_btn: "加载",
    whatauth_badge: "免费图书",
    whatauth_title: "免费阅读 <strong>WhatAUTH</strong> 电子书",
    footer_author: "作者：",
    footer_github: "在 GitHub 查看源码",
    lang_selector_label: "语言",
    // Toolbar & Nav
    btn_back: "返回",
    btn_toc: "目录",
    btn_settings: "设置",
    nav_prev: "上一页",
    nav_next: "下一页",
    book_loading: "加载中...",
    // Panels
    panel_toc_title: "图书目录",
    panel_settings_title: "阅读设置",
    setting_language: "语言",
    setting_theme: "主题",
    theme_light: "浅色",
    theme_sepia: "护眼",
    theme_dark: "深色",
    setting_reading_mode: "阅读模式",
    mode_fast_title: "⚡ 快速阅读",
    mode_fast_sub: "Fast Sans",
    mode_fast_tooltip: "使用优化的 Fast Sans 字体进行快速阅读",
    mode_normal_title: "📖 标准阅读",
    mode_normal_sub: "经典无衬线",
    mode_normal_tooltip: "使用经典字体进行传统阅读",
    beeline_title: "BeeLine 导读",
    beeline_hint: "行尾色彩渐变引导视线，提升阅读速度并防止跳行。",
    beeline_style_label: "色彩渐变风格",
    gradient_sunset_name: "日落",
    gradient_sunset_tooltip: "日落渐变：紫罗兰、品红与珊瑚色",
    gradient_ocean_name: "海洋",
    gradient_ocean_tooltip: "海洋渐变：蓝色、青色与翡翠绿",
    gradient_aurora_name: "极光",
    gradient_aurora_tooltip: "极光渐变：紫色、霓虹蓝与薄荷绿",
    setting_font_size: "字体大小",
    setting_flow: "翻页排版",
    flow_paginated: "分页",
    flow_scrolled: "滚动",
    flow_alert: "排版模式将在下次打开图书时生效。",
    // Loader
    loader_decompressing: "正在解压电子书...",
    loader_downloading: "正在下载图书...",
    loader_parsing: "正在解析文件与资源...",
    loader_metadata: "正在读取图书信息...",
    loader_indexing: "正在编制章节目录...",
    loader_rendering: "正在排版页面...",
    loader_error_return: "返回主页",
    error_not_epub: "请拖入有效的 .epub 格式文件",
    error_drag_read: "无法读取拖入的文件。",
    error_file_read: "无法读取选择的文件。",
    error_invalid_epub: "无法渲染图书页面，请确认文件是否为有效的 EPUB 格式。",
    error_url_load: "从网址加载失败：\n"
  },
  ja: {
    meta: { name: "日本語", flag: "🇯🇵" },
    page_title: "EPUB リーダー · GitHub Pages",
    app_title: "EPUB",
    app_subtitle: "EPUB 電子書籍リーダー",
    drop_title: "ここに <strong>.epub</strong> ファイルをドロップ",
    drop_or: "または",
    drop_choose: "ファイルを選択",
    url_heading: "または URL から読み込む：",
    url_placeholder: "https://example.com/book.epub",
    url_load_btn: "読み込む",
    whatauth_badge: "無料書籍",
    whatauth_title: "<strong>WhatAUTH</strong> を無料で読む",
    footer_author: "作者：",
    footer_github: "GitHub でコードを見る",
    lang_selector_label: "言語",
    // Toolbar & Nav
    btn_back: "戻る",
    btn_toc: "目次",
    btn_settings: "設定",
    nav_prev: "前へ",
    nav_next: "次へ",
    book_loading: "読み込み中...",
    // Panels
    panel_toc_title: "目次",
    panel_settings_title: "設定",
    setting_language: "言語",
    setting_theme: "テーマ",
    theme_light: "ライト",
    theme_sepia: "セピア",
    theme_dark: "ダーク",
    setting_reading_mode: "読書モード",
    mode_fast_title: "⚡ 速読モード",
    mode_fast_sub: "Fast Sans",
    mode_fast_tooltip: "最適化された Fast Sans フォントによる速読",
    mode_normal_title: "📖 通常モード",
    mode_normal_sub: "クラシック",
    mode_normal_tooltip: "標準的なフォントによる通常読書",
    beeline_title: "BeeLine Reader",
    beeline_hint: "行ごとに色グラデーションを表示し、視線移動を導いてスムーズに読めます。",
    beeline_style_label: "グラデーションスタイル",
    gradient_sunset_name: "夕焼け",
    gradient_sunset_tooltip: "夕焼けグラデーション：バイオレット、マゼンタ、コーラル",
    gradient_ocean_name: "オーシャン",
    gradient_ocean_tooltip: "オーシャングラデーション：ブルー、シアン、エメラルド",
    gradient_aurora_name: "オーロラ",
    gradient_aurora_tooltip: "オーロラグラデーション：パープル、ネオンブルー、ミント",
    setting_font_size: "フォントサイズ",
    setting_flow: "表示形式",
    flow_paginated: "ページ送り",
    flow_scrolled: "スクロール",
    flow_alert: "表示形式は次回書籍を開いたときに適用されます。",
    // Loader
    loader_decompressing: "本を展開しています...",
    loader_downloading: "本をダウンロードしています...",
    loader_parsing: "ファイルとリソースを解析中...",
    loader_metadata: "メタデータを読み込み中...",
    loader_indexing: "章のインデックスを作成中...",
    loader_rendering: "ページを描画中...",
    loader_error_return: "ホームに戻る",
    error_not_epub: ".epub ファイルをドロップしてください",
    error_drag_read: "ドロップされたファイルを読み込めませんでした。",
    error_file_read: "選択されたファイルを読み込めませんでした。",
    error_invalid_epub: "本のセクションを表示できませんでした。有効なEPUBファイルであることを確認してください。",
    error_url_load: "URL からの読み込みに失敗しました：\n"
  }
};

class I18nManager {
  constructor() {
    this.supportedLangs = ["es", "en", "de", "fr", "hi", "zh", "ja"];
    this.defaultLang = "es";
    this.currentLang = this.detectLanguage();
  }

  detectLanguage() {
    // 1. Preferencia guardada en localStorage
    const saved = localStorage.getItem("reader_lang");
    if (saved && this.supportedLangs.includes(saved)) {
      return saved;
    }

    // 2. Idioma del navegador
    const navLangs = navigator.languages || [navigator.language || navigator.userLanguage || ""];
    for (const l of navLangs) {
      if (!l) continue;
      const clean = l.toLowerCase();
      const shortCode = clean.slice(0, 2);
      if (this.supportedLangs.includes(shortCode)) {
        return shortCode;
      }
      if (clean.startsWith("zh")) {
        return "zh";
      }
    }

    return this.defaultLang;
  }

  t(key, fallback = "") {
    const dict = I18N_TRANSLATIONS[this.currentLang] || I18N_TRANSLATIONS[this.defaultLang];
    if (dict && dict[key] !== undefined) return dict[key];
    const fallbackDict = I18N_TRANSLATIONS[this.defaultLang];
    if (fallbackDict && fallbackDict[key] !== undefined) return fallbackDict[key];
    return fallback || key;
  }

  setLanguage(lang) {
    if (!this.supportedLangs.includes(lang)) return;
    this.currentLang = lang;
    localStorage.setItem("reader_lang", lang);
    document.documentElement.lang = lang;
    this.applyTranslations();

    // Actualizar selectores sincronizados
    document.querySelectorAll(".i18n-select").forEach((select) => {
      select.value = lang;
    });

    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang } }));
  }

  applyTranslations() {
    const dict = I18N_TRANSLATIONS[this.currentLang] || I18N_TRANSLATIONS[this.defaultLang];

    // 1. Textos e HTML con data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // 2. Placeholders con data-i18n-placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    // 3. Tooltips y títulos con data-i18n-title
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (dict[key] !== undefined) {
        el.setAttribute("title", dict[key]);
      }
    });

    // 4. Actualizar título del documento si no hay libro cargado
    const bookTitleEl = document.querySelector("#book-title");
    if (!bookTitleEl || !bookTitleEl.dataset.hasLoadedBook) {
      document.title = dict.page_title || "EPUB";
      if (bookTitleEl) {
        bookTitleEl.textContent = dict.book_loading;
      }
    }
  }

  init() {
    document.documentElement.lang = this.currentLang;
    this.applyTranslations();

    // Sincronizar selectores existentes
    document.querySelectorAll(".i18n-select").forEach((select) => {
      select.value = this.currentLang;
      select.addEventListener("change", (e) => {
        this.setLanguage(e.target.value);
      });
    });
  }
}

// Instancia global
window.i18n = new I18nManager();
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => window.i18n.init());
} else {
  window.i18n.init();
}
