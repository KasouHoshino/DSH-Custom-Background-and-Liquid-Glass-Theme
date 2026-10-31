window.__ModuleLoader__.load({
  id: '@local/dsh-custom-background_by_nagisa',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

    const React = require('react');
    const h = React.createElement;

    /* ------------------------------------------------------------------ */
    /* constants                                                           */
    /* ------------------------------------------------------------------ */

    const PLUGIN_ID = '@local/dsh-custom-background_by_nagisa';
    const STORAGE_KEY = 'dsh-custom-background.prefs';
    const MAX_IMAGE_LENGTH = 4200 * 1024;
    const FRAME = 'div:has(> [data-shell-overlay])';
    // No built-in gradient presets: the wallpaper is either a picture, a GIF or a video.
    // `''` means "no wallpaper" — the shell keeps its own background.
    const NO_PRESET = '';

    const TOP_SCRIM_LIGHT =
      'linear-gradient(to bottom, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.14) 44px, rgba(255,255,255,0) 108px)';
    const TOP_SCRIM_DARK =
      'linear-gradient(to bottom, rgba(0,0,0,0.46) 0%, rgba(0,0,0,0.18) 44px, rgba(0,0,0,0) 108px)';
    const VIGNETTE =
      'radial-gradient(120% 100% at 50% 34%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.16) 100%)';

    /** Apple-flavoured material: accent, label ramp, radii, elevation. */
    const SURFACE_LAYER = {
      '--dsw-alias-bg-base': { light: 'transparent', dark: 'transparent' },
      '--dsw-specific-sidebar-fill': { light: 'transparent', dark: 'transparent' },
      '--dsw-alias-brand-primary': { light: '#007AFF', dark: '#0A84FF' },
      '--dsw-alias-label-primary': { light: '#1D1D1F', dark: '#F5F5F7' },
      '--dsw-alias-label-secondary': { light: '#5F5F66', dark: '#B6B6BE' },
      '--dsw-focus-ring-color': { light: '#007AFF', dark: '#0A84FF' },
      '--dsw-radius-xs': { light: '8px', dark: '8px' },
      '--dsw-radius-sm': { light: '12px', dark: '12px' },
      '--dsw-radius-md': { light: '14px', dark: '14px' },
      '--dsw-radius-lg': { light: '18px', dark: '18px' },
      '--dsw-radius-xl': { light: '22px', dark: '22px' },
      '--dsw-radius-panel': { light: '26px', dark: '26px' },
      '--dsw-shadow-lv1': {
        light: '0 1px 3px rgba(0,0,0,.05), 0 6px 16px rgba(0,0,0,.05)',
        dark: '0 2px 6px rgba(0,0,0,.40), 0 10px 24px rgba(0,0,0,.35)',
      },
      '--dsw-shadow-lv2': {
        light: '0 4px 12px rgba(0,0,0,.07), 0 16px 40px rgba(0,0,0,.08)',
        dark: '0 6px 18px rgba(0,0,0,.45), 0 22px 48px rgba(0,0,0,.42)',
      },
      '--dsw-shadow-lv3': {
        light: '0 8px 24px rgba(0,0,0,.09), 0 32px 64px rgba(0,0,0,.12)',
        dark: '0 10px 30px rgba(0,0,0,.5), 0 34px 70px rgba(0,0,0,.45)',
      },
      '--dsw-scrollbar-thumb-border': { light: '2px', dark: '2px' },
      // NOTE: `--dsw-scrollbar-width` is deliberately NOT overridden. It changes the
      // scrollbar's footprint, and since a scrollbar appears/disappears when the right
      // sidebar toggles, the transcript's text width would visibly jump. The shell keeps
      // its own scrollbar metrics.
      // Inert marker: proves which build of the layer is live.
      '--cb-build-236': { light: '236', dark: '236' },
    };

    const DICT = {
      zh: {
        title: '背景',
        desc: '给界面换一张自定义壁纸，材质跟随苹果的浅色/深色语言。',
        image: '图片',
        linkLabel: '图片链接',
        apply: '应用',
        pick: '选择本地图片…',
        remove: '移除',
        hint: '支持 https:// 链接或本地图片；本地图片会先裁切。',
        glass: '液态玻璃',
        transparency: '透明度',
        blur: '磨砂',
        glassHint: '透明度越高越透；磨砂越大背景越模糊。作用于消息气泡、消息卡片和代码块。',
        badUrl: '请填入 https:// 开头的图片链接。',
        tooLarge: '图片太大，换一张更小的吧。',
        cropTitle: '裁切图片',
        cropHint: '拖动图片选择要保留的区域；框内就是壁纸最终显示的范围。',
        videoInUse: '视频壁纸播放中（切到后台会自动暂停）',
        readability: '文字可读性',
        readabilityHint: '调高会在壁纸上面加一层很淡的纱幕（图片、动图、视频都生效），背景更沉、字更清楚；调低则背景更透。',
        zoom: '缩放',
        confirm: '使用这张',
        cancel: '取消',
        language: '语言',
        langAuto: '跟随 DSH',
        langZh: '中文',
        langEn: 'English',
      },
      'zh-Hant': {
        title: '背景',
        desc: '為介面換上自訂桌布，材質跟隨蘋果的淺色／深色語言。',
        image: '圖片',
        linkLabel: '圖片連結',
        apply: '套用',
        pick: '選擇本機圖片…',
        remove: '移除',
        hint: '支援 https:// 連結或本機圖片；本機圖片會先裁切。',
        glass: '液態玻璃',
        transparency: '透明度',
        blur: '霧化',
        glassHint: '透明度越高越透；霧化越大背景越模糊。作用於訊息氣泡、訊息卡片與程式碼區塊。',
        badUrl: '請填入 https:// 開頭的圖片連結。',
        tooLarge: '圖片太大，換一張小一點的。',
        cropTitle: '裁切圖片',
        cropHint: '拖曳圖片選擇要保留的區域；框內就是桌布最終顯示的範圍。',
        videoInUse: '影片桌布播放中（切到背景會自動暫停）',
        readability: '文字可讀性',
        readabilityHint: '調高會在桌布上加一層很淡的紗幕（圖片、動圖、影片都有效），背景更沉、字更清楚；調低則背景更透。',
        zoom: '縮放',
        confirm: '使用這張',
        cancel: '取消',
        language: '語言',
        langAuto: '跟隨 DSH',
        langZh: '中文',
        langEn: 'English',
      },
      en: {
        title: 'Background',
        desc: 'A custom wallpaper for the shell, with Apple-style light and dark materials.',
        image: 'Picture',
        linkLabel: 'Picture link',
        apply: 'Apply',
        pick: 'Choose a local picture…',
        remove: 'Remove',
        hint: 'Accepts an https:// link or a local file; local files are cropped first.',
        glass: 'Liquid glass',
        transparency: 'Transparency',
        blur: 'Frost',
        glassHint: 'Higher transparency shows more background; higher frost blurs it. Applies to bubbles, message cards and code blocks.',
        badUrl: 'Use an https:// picture link.',
        tooLarge: 'That picture is too large — try a smaller one.',
        cropTitle: 'Crop the picture',
        cropHint: 'Drag the picture to choose what to keep; the frame is exactly what the wallpaper shows.',
        videoInUse: 'Video wallpaper playing (paused while in the background)',
        readability: 'Text readability',
        readabilityHint: 'Raising it lays a faint veil over the wallpaper (pictures, GIFs and video alike) so the background recedes and text reads better; lowering it keeps the background clearer.',
        zoom: 'Zoom',
        confirm: 'Use this',
        cancel: 'Cancel',
        language: 'Language',
        langAuto: 'Follow DSH',
        langZh: '中文',
        langEn: 'English',
      },
      ja: {
        title: '背景',
        desc: 'シェルにカスタム壁紙を設定します。マテリアルは Apple のライト/ダークに追従します。',
        image: '画像',
        linkLabel: '画像リンク',
        apply: '適用',
        pick: 'ローカル画像を選択…',
        remove: '削除',
        hint: 'https:// リンクまたはローカル画像に対応。ローカル画像は先に切り抜きます。',
        glass: 'リキッドグラス',
        transparency: '透明度',
        blur: 'ぼかし',
        glassHint: '透明度が高いほど透け、ぼかしが強いほど背景がぼやけます。吹き出し・メッセージカード・コードブロックに適用されます。',
        badUrl: 'https:// で始まる画像リンクを入力してください。',
        tooLarge: '画像が大きすぎます。小さい画像を選んでください。',
        cropTitle: '画像を切り抜く',
        cropHint: '画像をドラッグして残す範囲を選択。枠内が壁紙の表示範囲です。',
        videoInUse: '動画壁紙を再生中（バックグラウンドでは一時停止）',
        readability: 'テキストの読みやすさ',
        readabilityHint: '値を上げると壁紙に薄いベールがかかり（画像・GIF・動画すべて）、背景が落ち着いて文字が読みやすくなります。下げると背景が透けます。',
        zoom: 'ズーム',
        confirm: 'これを使う',
        cancel: 'キャンセル',
        language: '言語',
        langAuto: 'DSH に従う',
        langZh: '中文',
        langEn: 'English',
      },
      ko: {
        title: '배경',
        desc: '셸에 사용자 배경을 적용합니다. 소재는 Apple의 라이트/다크를 따릅니다.',
        image: '이미지',
        linkLabel: '이미지 링크',
        apply: '적용',
        pick: '로컬 이미지 선택…',
        remove: '제거',
        hint: 'https:// 링크 또는 로컬 이미지를 지원합니다. 로컬 이미지는 먼저 자릅니다.',
        glass: '리퀴드 글래스',
        transparency: '투명도',
        blur: '흐림',
        glassHint: '투명도가 높을수록 더 투명하고, 흐림이 클수록 배경이 더 흐려집니다. 말풍선, 메시지 카드, 코드 블록에 적용됩니다.',
        badUrl: 'https:// 로 시작하는 이미지 링크를 입력하세요.',
        tooLarge: '이미지가 너무 큽니다. 더 작은 이미지를 선택하세요.',
        cropTitle: '이미지 자르기',
        cropHint: '이미지를 드래그해 남길 영역을 선택하세요. 프레임이 배경에 표시되는 범위입니다.',
        videoInUse: '동영상 배경 재생 중(백그라운드에서는 일시정지)',
        readability: '텍스트 가독성',
        readabilityHint: '값을 올리면 배경 위에 옅은 막이 깔려(이미지·GIF·동영상 모두) 배경이 가라앉고 글자가 잘 보입니다. 내리면 배경이 더 투명해집니다.',
        zoom: '확대/축소',
        confirm: '이 이미지 사용',
        cancel: '취소',
        language: '언어',
        langAuto: 'DSH 따르기',
        langZh: '中文',
        langEn: 'English',
      },
      es: {
        title: 'Fondo',
        desc: 'Un fondo personalizado para el shell, con materiales claros/oscuros al estilo Apple.',
        image: 'Imagen',
        linkLabel: 'Enlace de imagen',
        apply: 'Aplicar',
        pick: 'Elegir una imagen local…',
        remove: 'Quitar',
        hint: 'Acepta un enlace https:// o un archivo local; los archivos locales se recortan primero.',
        glass: 'Cristal líquido',
        transparency: 'Transparencia',
        blur: 'Desenfoque',
        glassHint: 'Más transparencia deja ver más el fondo; más desenfoque lo difumina. Se aplica a burbujas, tarjetas de mensaje y bloques de código.',
        badUrl: 'Usa un enlace de imagen https://.',
        tooLarge: 'Esa imagen es demasiado grande; prueba una más pequeña.',
        cropTitle: 'Recortar la imagen',
        cropHint: 'Arrastra la imagen para elegir qué conservar; el marco es exactamente lo que muestra el fondo.',
        videoInUse: 'Fondo de vídeo en reproducción (se pausa en segundo plano)',
        readability: 'Legibilidad del texto',
        readabilityHint: 'Subirlo añade un velo tenue sobre el fondo (imágenes, GIF y vídeo): el fondo retrocede y el texto se lee mejor. Bajarlo deja el fondo más claro.',
        zoom: 'Zoom',
        confirm: 'Usar esta',
        cancel: 'Cancelar',
        language: 'Idioma',
        langAuto: 'Seguir DSH',
        langZh: '中文',
        langEn: 'English',
      },
      fr: {
        title: 'Fond',
        desc: 'Un fond personnalisé pour le shell, avec des matières claires/sombres façon Apple.',
        image: 'Image',
        linkLabel: 'Lien de l’image',
        apply: 'Appliquer',
        pick: 'Choisir une image locale…',
        remove: 'Retirer',
        hint: 'Accepte un lien https:// ou un fichier local ; les fichiers locaux sont d’abord recadrés.',
        glass: 'Verre liquide',
        transparency: 'Transparence',
        blur: 'Flou',
        glassHint: 'Plus de transparence laisse voir le fond ; plus de flou le brouille. S’applique aux bulles, cartes de message et blocs de code.',
        badUrl: 'Utilisez un lien d’image https://.',
        tooLarge: 'Cette image est trop grande — essayez-en une plus petite.',
        cropTitle: 'Recadrer l’image',
        cropHint: 'Faites glisser l’image pour choisir ce qui reste ; le cadre correspond exactement au fond affiché.',
        videoInUse: 'Fond vidéo en lecture (mis en pause en arrière-plan)',
        readability: 'Lisibilité du texte',
        readabilityHint: 'L’augmenter pose un voile léger sur le fond (images, GIF et vidéo) : le fond recule et le texte se lit mieux. Le baisser rend le fond plus clair.',
        zoom: 'Zoom',
        confirm: 'Utiliser celle-ci',
        cancel: 'Annuler',
        language: 'Langue',
        langAuto: 'Suivre DSH',
        langZh: '中文',
        langEn: 'English',
      },
      de: {
        title: 'Hintergrund',
        desc: 'Ein eigenes Hintergrundbild für die Shell, mit hellen/dunklen Materialien im Apple-Stil.',
        image: 'Bild',
        linkLabel: 'Bildlink',
        apply: 'Anwenden',
        pick: 'Lokales Bild wählen…',
        remove: 'Entfernen',
        hint: 'Akzeptiert einen https://-Link oder eine lokale Datei; lokale Dateien werden zuerst zugeschnitten.',
        glass: 'Flüssigglas',
        transparency: 'Transparenz',
        blur: 'Unschärfe',
        glassHint: 'Mehr Transparenz zeigt mehr Hintergrund; mehr Unschärfe macht ihn weicher. Gilt für Sprechblasen, Nachrichtenkarten und Codeblöcke.',
        badUrl: 'Bitte einen https://-Bildlink verwenden.',
        tooLarge: 'Dieses Bild ist zu groß — bitte ein kleineres wählen.',
        cropTitle: 'Bild zuschneiden',
        cropHint: 'Bild ziehen, um den Bereich zu wählen; der Rahmen entspricht genau dem Hintergrund.',
        videoInUse: 'Video-Hintergrund läuft (im Hintergrund pausiert)',
        readability: 'Textlesbarkeit',
        readabilityHint: 'Höher legt einen zarten Schleier über den Hintergrund (Bilder, GIFs, Videos): der Hintergrund tritt zurück, Text bleibt lesbar. Niedriger lässt den Hintergrund klarer.',
        zoom: 'Zoom',
        confirm: 'Dieses verwenden',
        cancel: 'Abbrechen',
        language: 'Sprache',
        langAuto: 'DSH folgen',
        langZh: '中文',
        langEn: 'English',
      },
      ru: {
        title: 'Фон',
        desc: 'Свой фон для оболочки, со светлыми и тёмными материалами в стиле Apple.',
        image: 'Изображение',
        linkLabel: 'Ссылка на изображение',
        apply: 'Применить',
        pick: 'Выбрать локальное изображение…',
        remove: 'Убрать',
        hint: 'Принимает ссылку https:// или локальный файл; локальные файлы сначала обрезаются.',
        glass: 'Жидкое стекло',
        transparency: 'Прозрачность',
        blur: 'Размытие',
        glassHint: 'Больше прозрачности — сильнее виден фон; больше размытия — фон мягче. Действует на пузыри, карточки сообщений и блоки кода.',
        badUrl: 'Укажите ссылку на изображение https://.',
        tooLarge: 'Изображение слишком большое — выберите меньше.',
        cropTitle: 'Обрезать изображение',
        cropHint: 'Перетащите изображение, чтобы выбрать область; рамка — это и есть будущий фон.',
        videoInUse: 'Видео-фон воспроизводится (в фоне пауза)',
        readability: 'Читаемость текста',
        readabilityHint: 'Выше — тонкая вуаль поверх фона (изображения, GIF и видео): фон отступает, текст читается лучше. Ниже — фон прозрачнее.',
        zoom: 'Масштаб',
        confirm: 'Использовать',
        cancel: 'Отмена',
        language: 'Язык',
        langAuto: 'Следовать DSH',
        langZh: '中文',
        langEn: 'English',
      },
      pt: {
        title: 'Plano de fundo',
        desc: 'Um fundo personalizado para o shell, com materiais claros/escuros no estilo Apple.',
        image: 'Imagem',
        linkLabel: 'Link da imagem',
        apply: 'Aplicar',
        pick: 'Escolher uma imagem local…',
        remove: 'Remover',
        hint: 'Aceita um link https:// ou um arquivo local; arquivos locais são cortados primeiro.',
        glass: 'Vidro líquido',
        transparency: 'Transparência',
        blur: 'Desfoque',
        glassHint: 'Mais transparência mostra mais o fundo; mais desfoque o suaviza. Aplica-se a balões, cartões de mensagem e blocos de código.',
        badUrl: 'Use um link de imagem https://.',
        tooLarge: 'Essa imagem é grande demais — tente uma menor.',
        cropTitle: 'Recortar a imagem',
        cropHint: 'Arraste a imagem para escolher o que manter; a moldura é exatamente o que o fundo mostra.',
        videoInUse: 'Fundo de vídeo em reprodução (pausa em segundo plano)',
        readability: 'Legibilidade do texto',
        readabilityHint: 'Aumentar coloca um véu tênue sobre o fundo (imagens, GIFs e vídeo): o fundo recua e o texto lê melhor. Diminuir deixa o fundo mais claro.',
        zoom: 'Zoom',
        confirm: 'Usar esta',
        cancel: 'Cancelar',
        language: 'Idioma',
        langAuto: 'Seguir o DSH',
        langZh: '中文',
        langEn: 'English',
      },
    };

    /** Order shown in the picker; `auto` is handled separately. */
    const LANGS = ['zh', 'zh-Hant', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'pt'];
    const LANG_NAMES = {
      zh: '中文',
      'zh-Hant': '繁體中文',
      en: 'English',
      ja: '日本語',
      ko: '한국어',
      es: 'Español',
      fr: 'Français',
      de: 'Deutsch',
      ru: 'Русский',
      pt: 'Português',
    };

    const LANG =
      typeof navigator !== 'undefined' && /^zh/i.test(navigator.language || '') ? 'zh' : 'en';

    /**
     * Follow the shell: DSH writes its active language into `<html lang>` (`zh-CN`, `en-US`, …).
     * Anything outside the supported set falls back to English; the browser locale is only used
     * before that attribute exists.
     */
    function shellLang() {
      const declared =
        typeof document !== 'undefined' && document.documentElement !== null
          ? String(document.documentElement.lang || '').toLowerCase()
          : '';
      if (declared === '') return LANG;
      if (declared.indexOf('zh') === 0) {
        // `zh-TW` / `zh-HK` / `zh-MO` / `zh-Hant*` use the Traditional table.
        return /(tw|hk|mo|hant)/.test(declared) ? 'zh-Hant' : 'zh';
      }
      const prefix = declared.slice(0, 2);
      return LANGS.indexOf(prefix) !== -1 ? prefix : 'en';
    }

    /**
     * Language chosen in the Windows installer. The installer rewrites this line when the user
     * picks one, so a fresh install already speaks that language without touching localStorage.
     * `auto` keeps the follow-the-shell behaviour.
     */
    const INSTALLED_LANG = 'auto'; // @installer-lang

    /** `prefs.lang` wins when the user pinned one; otherwise the installer choice, then the shell. */
    function currentLang() {
      const value = getPrefs().lang;
      if (LANGS.indexOf(value) !== -1) return value;
      if (LANGS.indexOf(INSTALLED_LANG) !== -1) return INSTALLED_LANG;
      return shellLang();
    }

    function t(key) {
      const table = DICT[currentLang()] || DICT.en;
      return table[key] || DICT.en[key] || key;
    }

    /* ------------------------------------------------------------------ */
    /* preferences                                                         */
    /* ------------------------------------------------------------------ */

    function defaults() {
      return {
        preset: NO_PRESET,
        imageUrl: '',
        imageKey: '',
        videoKey: '',
        transparency: 58,
        blur: 44,
        readability: 50,
        lang: 'auto',
      };
    }

    function clampNumber(value, low, high, fallback) {
      if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
      return Math.min(high, Math.max(low, Math.round(value)));
    }

    function isAllowedUrl(value) {
      if (typeof value !== 'string') return false;
      const url = value.trim();
      if (url.length === 0 || url.length > MAX_IMAGE_LENGTH) return false;
      if (/^data:image\/(png|jpe?g|webp|gif|avif);base64,/i.test(url)) return true;
      return /^https?:\/\/[^\s"'<>\\]+$/i.test(url);
    }

    function sanitizeUrl(value) {
      if (!isAllowedUrl(value)) return '';
      return value.trim().replace(/["\\<>\n\r\t]/g, '');
    }

    function readPrefs() {
      const base = defaults();
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw === null) return base;
        const parsed = JSON.parse(raw);
        if (parsed === null || typeof parsed !== 'object') return base;
        const preset = typeof parsed.preset === 'string' ? parsed.preset : base.preset;
        const imageUrl = typeof parsed.imageUrl === 'string' ? sanitizeUrl(parsed.imageUrl) : '';
        const imageKey = typeof parsed.imageKey === 'string' ? parsed.imageKey : '';
        const transparency = clampNumber(parsed.transparency, 0, 100, base.transparency);
        const blur = clampNumber(parsed.blur, 0, 100, base.blur);
        const readability = clampNumber(parsed.readability, 0, 100, base.readability);
        const lang = LANGS.indexOf(parsed.lang) !== -1 ? parsed.lang : 'auto';
        if (preset === 'image') {
          return {
            preset: imageUrl === '' && imageKey === '' ? base.preset : 'image',
            imageUrl,
            imageKey,
            videoKey: '',
            transparency,
            blur,
            readability,
            lang,
          };
        }
        if (preset === 'video') {
          const videoKey = typeof parsed.videoKey === 'string' ? parsed.videoKey : '';
          return {
            preset: videoKey === '' ? base.preset : 'video',
            imageUrl: '',
            imageKey: '',
            videoKey,
            transparency,
            blur,
            readability,
            lang,
          };
        }
        return {
          preset: NO_PRESET,
          imageUrl: '',
          imageKey: '',
          videoKey: '',
          transparency,
          blur,
          readability,
            lang,
        };
      } catch (error) {
        return base;
      }
    }

    function writePrefs(next) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return true;
      } catch (error) {
        return false;
      }
    }

    let prefs = null;
    const listeners = new Set();

    /* IndexedDB storage for the picture itself: localStorage caps out around 5 MB,
       which forced a downscale and a re-encode. Keeping the blob in IDB lets the
       original resolution and quality survive. */
    const DB_NAME = 'dsh-custom-background';
    const DB_STORE = 'images';
    let dbPromise = null;
    let runtimeImageUrl = '';
    let runtimeVideoUrl = '';

    function openDb() {
      if (dbPromise !== null) return dbPromise;
      dbPromise = new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (db.objectStoreNames.contains(DB_STORE) !== true) db.createObjectStore(DB_STORE);
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      return dbPromise;
    }

    async function putImageBlob(key, blob) {
      const db = await openDb();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, 'readwrite');
        tx.objectStore(DB_STORE).put(blob, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }

    async function getImageBlob(key) {
      const db = await openDb();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, 'readonly');
        const request = tx.objectStore(DB_STORE).get(key);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    }

    function notify() {
      listeners.forEach((listener) => {
        try {
          listener();
        } catch (error) {
          // One bad listener must not stop the repaint.
        }
      });
    }

    function getPrefs() {
      if (prefs === null) prefs = readPrefs();
      return prefs;
    }

    function commit(next) {
      prefs = next;
      writePrefs(next);
      notify();
    }

    function subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }

    /* ------------------------------------------------------------------ */
    /* artwork                                                             */
    /* ------------------------------------------------------------------ */

    function wallpaperFor(current) {
      if (current.preset === 'video') return null;
      if (current.preset !== 'image') return null;
      const stored = typeof current.imageKey === 'string' && current.imageKey !== '';
      const url = stored ? runtimeImageUrl : sanitizeUrl(current.imageUrl);
      if (url === '') return null;
      return {
        isImage: true,
        light: {
          color: '#eef1f5',
          layers: ['linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6))', 'url("' + url + '")'],
        },
        dark: {
          color: '#0d1015',
          layers: ['linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.52))', 'url("' + url + '")'],
        },
      };
    }

    /**
     * Neutral backdrop used when no wallpaper is selected, so the glass still has a base.
     * The readability veil is applied here too — otherwise the slider would silently do
     * nothing in this mode.
     */
    function wallpaperCssBase(veil) {
      const amount = typeof veil === 'number' && veil > 0 ? veil : 0;
      const lightLayers =
        amount > 0
          ? [
              'linear-gradient(rgba(255,255,255,' + amount + '), rgba(255,255,255,' + amount + '))',
              VIGNETTE,
            ]
          : [VIGNETTE];
      const darkLayers =
        amount > 0
          ? ['linear-gradient(rgba(0,0,0,' + amount + '), rgba(0,0,0,' + amount + '))', VIGNETTE]
          : [VIGNETTE];
      return [
        'html body{background-color:transparent !important;}',
        'html ' + FRAME + '{',
        'background-color:#eef1f5 !important;',
        'background-image:' + lightLayers.join(', ') + ' !important;',
        '}',
        'html body[data-ds-dark-theme] ' + FRAME + '{',
        'background-color:#0d1015 !important;',
        'background-image:' + darkLayers.join(', ') + ' !important;',
        '}',
      ].join('');
    }

    function wallpaperCss(wall, veil) {
      if (wall === null) {
        return [
          'html body{background-color:transparent !important;}',
          'html ' + FRAME + '{background-color:transparent !important;background-image:none !important;}',
        ].join('');
      }
      const amount = typeof veil === 'number' && veil > 0 ? veil : 0;
      const lightVeil =
        amount > 0
          ? ['linear-gradient(rgba(255,255,255,' + amount + '), rgba(255,255,255,' + amount + '))']
          : [];
      const darkVeil =
        amount > 0 ? ['linear-gradient(rgba(0,0,0,' + amount + '), rgba(0,0,0,' + amount + '))'] : [];
      const lightStack = lightVeil.concat([TOP_SCRIM_LIGHT, VIGNETTE], wall.light.layers).join(', ');
      const darkStack = darkVeil.concat([TOP_SCRIM_DARK, VIGNETTE], wall.dark.layers).join(', ');
      const count = 2 + wall.light.layers.length + (amount > 0 ? 1 : 0);
      const sizes = [];
      const positions = [];
      const repeats = [];
      for (let index = 0; index < count; index += 1) {
        const image = wall.isImage && index === count - 1;
        sizes.push(image ? 'cover' : 'auto');
        positions.push(image ? 'center' : '0 0');
        repeats.push(image ? 'no-repeat' : 'repeat');
      }
      const framing = wall.isImage
        ? 'background-size:' + sizes.join(',') + ' !important;' +
          'background-position:' + positions.join(',') + ' !important;' +
          'background-repeat:' + repeats.join(',') + ' !important;'
        : '';
      return [
        // Painted on the shell frame: a body-level layer sits below the shell's own
        // opaque background and would never be visible.
        'html{background-color:' + wall.light.color + ' !important;}',
        'html body{background-color:transparent !important;}',
        'html ' + FRAME + '{',
        'background-color:' + wall.light.color + ' !important;',
        'background-image:' + lightStack + ' !important;',
        framing,
        '}',
        'html body[data-ds-dark-theme] ' + FRAME + '{',
        'background-color:' + wall.dark.color + ' !important;',
        'background-image:' + darkStack + ' !important;',
        '}',
      ].join('');
    }

    /* ------------------------------------------------------------------ */
    /* shell material                                                      */
    /* ------------------------------------------------------------------ */

    function shellCss() {
      return [
        // The columns stay transparent; the surface inside carries the fill.
        'html ' + FRAME + ' > div:nth-child(1){background-color:transparent !important;}',
        'html ' + FRAME + ' > div:nth-child(2) > *{',
        'background-color:rgba(255,255,255,0.82) !important;',
        'box-shadow:inset 0 0 0 1px rgba(0,0,0,0.07) !important;',
        '}',
        'html body[data-ds-dark-theme] ' + FRAME + ' > div:nth-child(2) > *{',
        'background-color:rgba(30,30,34,0.8) !important;',
        'box-shadow:inset 0 0 0 1px rgba(255,255,255,0.09) !important;',
        '}',
        // Typography is left entirely to the shell. The shell's own stack
        // (`-apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", ...`) already resolves
        // to Segoe UI + YaHei here, so an override would change nothing while risking a second
        // family on other systems.
        'html ::selection{background:color-mix(in srgb, var(--dsw-alias-brand-primary) 28%, transparent);}',
        // Frosted menus and dialogs (leaf surfaces: no fixed descendants inside). The blur is
        // derived from the frost slider (x1.3 lands on the old 22px at the default 50) instead
        // of being a constant: a constant kept these surfaces blurred even at frost 0.
        'html [role="dialog"],html [aria-modal="true"],html [role="menu"]{',
        'backdrop-filter:blur(calc(var(--cb-blur) * 1.3)) saturate(160%) !important;',
        '-webkit-backdrop-filter:blur(calc(var(--cb-blur) * 1.3)) saturate(160%) !important;',
        '}',
      ].join('');
    }

    /**
     * Liquid glass for every chat bubble and message card.
     *
     * Leaf surfaces only: bubbles and message bodies never host `position: fixed`
     * children, so a `backdrop-filter` on them cannot shift any layout. The values
     * come from `--cb-alpha` / `--cb-blur`, which the sliders update in place.
     */
    const GLASS_TARGETS = [
      // `pad` keeps the text off the hairline: the fill is nearly transparent at max
      // transparency, so a 1px edge right next to the first glyph reads as cramped.
      // Message-level containers use `tint`: a `backdrop-filter` on them makes the
      // element the containing block for any `position: fixed` descendant (approval
      // cards, inline popovers), which moves the shell's scroll target and shows up
      // as the transcript jumping. They keep the fill and the edge lighting.
      // The user's own bubble keeps its frost so the two sides stay distinguishable; it
      // stays shadow-free, which is what caused the dark band during relayout.
      { sel: '[class*="LOmM4q_bubble"]', radius: '18px', mode: 'direct', noShadow: true },
      // The composer hosts fixed popovers (model picker, @ mentions), so its filter
      // goes on a pseudo-element: a filter on the card itself would make it their
      // containing block and break their placement.
      { sel: '[class*="GRgSLq_card"]', radius: '26px', mode: 'pseudo' },
      // The widgets under the composer: small buttons, safe as leaf surfaces.
      { sel: '[class*="GRgSLq_dock"] [class*="_trigger"]', radius: '12px', mode: 'direct' },
      { sel: '[class*="GRgSLq_dock"] [class*="_pill"]', radius: '12px', mode: 'direct' },
      // Code blocks: the card carries the single glass layer, exactly like the tool card and the
      // file preview. The banner strip and the title row are transparent, so the header area
      // shows the card's material instead of a second, deeper layer.
      { sel: '.md-code-block', radius: '16px', mode: 'direct' },
      { sel: '[class*="_header_1pq26_"]', radius: '12px', mode: 'transparent' },
      // Inline code chips: same material, tiny radius, almost no lift so they read as
      // glass instead of a solid patch.
      { sel: '[class*="_markdown_"] :not(pre) > code', radius: '6px', mode: 'direct', boost: 0.06 },
      { sel: '[class*="_content_7gxqk"]', radius: '14px', mode: 'direct', boost: 0.2 },
      // The guide panel on a new session --one surface, one layer, same formula as the
      // bubbles. Nothing inside it gets its own fill.
      { sel: '[class*="p2k40q_guide"]', radius: '18px', mode: 'direct' },
      // Panel body and scrollable view: the outer container is the only layer. No
      // positioning override (a `position` here re-anchors absolutely positioned
      // children and slides the sidebar content), no drop shadow (a dark shadow on a
      // resizing surface flashes a band while a sidebar animates). Frost is on.
      { sel: '[class*="_4EiRdG_root"]', radius: '16px', mode: 'direct', noShadow: true },
      { sel: '[class*="bZwPEG_root"]', radius: '16px', mode: 'direct', noShadow: true },
      // Terminal screen container, same reasoning.
      { sel: '[class*="_70dcBq_screen"]', radius: '14px', mode: 'direct' },
      // Tabs: the shell repaints a hovered tab as transparent, so the same fill is
      // re-applied for hover/focus. `noBorder` drops the kit's 1px rim.
      { sel: '[class*="_tab_6nhg2_"]', radius: '10px', mode: 'direct', keepOnHover: true, noBorder: true },
      { sel: '[role="dialog"],[aria-modal="true"]', radius: null, mode: 'direct' },
      // The hover tooltip above the dock ("context used xx%"): its bubble element only.
      // The inner `_label_44yfq_` stays untouched so no extra patch appears behind the text.
      { sel: '[class*="_bubble_44yfq_"]', radius: '10px', mode: 'direct', noBorder: true },
      // The copyable message card that wraps a hover overlay. Leaf surface, so the filter is
      // safe here; the overlays inside stay untouched.
      { sel: '[class*="_card_38jqx_"]', radius: '14px', mode: 'direct', noShadow: true, noBorder: true },
      // Tool card, card element only.
      { sel: '[class*="HOHHba_card"]', radius: '16px', mode: 'direct', noShadow: true, noBorder: true },
      // The header row gets no fill of its own: it sits on the tool card, which already carries
      // one glass layer, and a second layer always reads one step deeper than a single-layer
      // card (that is what kept it different from the file preview). Its children are cleared in
      // `glassCss`, so the row shows the card's material uninterrupted.
      { sel: '[class*="HOHHba_header"]', radius: '16px', mode: 'transparent' },
      // The "load older" button at the top of the transcript: it is a bare <button> inside
      // `V4vHZW_older`, so the parent is the only stable hook.
      { sel: '[class*="V4vHZW_older"] > button', radius: '12px', mode: 'direct', noShadow: true, noBorder: true },
      // File attachment preview. The visible rounded box is the `file` wrapper, not the inner
      // button. A small positive boost keeps the exposed ring from reading as empty, without
      // turning it into a solid band (0.28 was too much).
      {
        sel: 'div[class*="K5rwea_root"] div[class~="K5rwea_file"]',
        radius: '16px',
        mode: 'direct',
        boost: 0.08,
        noShadow: true,
        noBorder: true,
      },
      // The `F07MqG` list rows carry no material at all: the panel below them is the single
      // filled surface for that popover, so the rows stay fully transparent and only show text.
      { sel: '[class*="F07MqG_row"]', radius: '12px', mode: 'transparent' },
      // The panel that hosts those rows. It is made to match the composer card exactly: same
      // 26px radius and the same `pseudo` mode (filter on ::before), so the two read as one
      // material and the panel's filter is not blocked by a containing-block concern.
      { sel: '[class*="F07MqG_panel"]', radius: '26px', mode: 'pseudo' },
    ];

    function glassCss() {
      const out = [];
      GLASS_TARGETS.forEach((target) => {
        // `boost` lifts the white fill for elements that sit on top of an existing
        // grey surface (the shell paints code blocks with its own tint, so a plain
        // translucent white reads grey instead of white).
        const boost = typeof target.boost === 'number' ? target.boost : 0;
        const fill =
          'background-color:rgba(255,255,255,calc(var(--cb-alpha) + ' + boost + ')) !important;' +
          'background-image:none !important;';
        const frost =
          'backdrop-filter:blur(var(--cb-blur)) !important;' +
          '-webkit-backdrop-filter:blur(var(--cb-blur)) !important;';
        const edge = 'box-shadow:0 10px 24px -22px rgba(0,0,0,0.3) !important;';
        const darkFill =
          'background-color:rgba(28,28,34,calc(var(--cb-alpha) + ' + (0.22 + boost) + ')) !important;' +
          'background-image:none !important;';
        const darkEdge = 'box-shadow:0 10px 24px -20px rgba(0,0,0,0.55) !important;';
        const radius = target.radius === null ? '' : 'border-radius:' + target.radius + ' !important;';

        if (target.mode === 'transparent') {
          // A row that must inherit the material of the surface underneath it: drop its own fill
          // and filter, keep only the shape.
          out.push('html ' + target.sel + '{');
          out.push('background-color:transparent !important;background-image:none !important;');
          out.push('backdrop-filter:none !important;-webkit-backdrop-filter:none !important;');
          out.push('box-shadow:none !important;border-color:transparent !important;');
          if (target.radius !== null) out.push('border-radius:' + target.radius + ' !important;');
          out.push('}');
          return;
        }

        if (target.mode === 'pseudo') {
          out.push('html ' + target.sel + '{');
          out.push('position:relative !important;');
          out.push('background-color:transparent !important;background-image:none !important;');
          out.push('box-shadow:none !important;');
          if (target.radius !== null) out.push('border-radius:' + target.radius + ' !important;');
          out.push('}');
          out.push('html ' + target.sel + '::before{');
          out.push("content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;");
          out.push('border-radius:' + (target.radius === null ? 'inherit' : target.radius) + ';');
          out.push(fill);
          out.push(frost);
          out.push(edge);
          out.push('}');
          out.push('html body[data-ds-dark-theme] ' + target.sel + '::before{');
          out.push(darkFill);
          out.push(darkEdge);
          out.push('}');
          return;
        }

        out.push('html ' + target.sel + '{');
        out.push(fill);
        // Large surfaces that are resized by the shell (sidebars animating) flash a dark
        // band while Chromium re-rasterises a backdrop-filter; those opt out of the
        // filter and the drop shadow, keeping only the translucent fill.
        if (target.noBlur !== true) out.push(frost);
        if (target.noShadow !== true) out.push(edge);
        if (radius !== '') out.push(radius);
        if (target.noBorder === true) out.push('border-color:transparent !important;');
        out.push('}');
        out.push('html body[data-ds-dark-theme] ' + target.sel + '{');
        out.push(darkFill);
        if (target.noShadow !== true) out.push(darkEdge);
        out.push('}');
        if (target.keepOnHover === true) {
          const hoverBoost = boost + 0.06;
          out.push('html ' + target.sel + ':hover,html ' + target.sel + ':focus-visible{');
          out.push('background-color:rgba(255,255,255,calc(var(--cb-alpha) + ' + hoverBoost + ')) !important;');
          out.push('}');
          out.push(
            'html body[data-ds-dark-theme] ' +
              target.sel +
              ':hover,html body[data-ds-dark-theme] ' +
              target.sel +
              ':focus-visible{',
          );
          out.push('background-color:rgba(28,28,34,calc(var(--cb-alpha) + ' + (0.22 + hoverBoost) + ')) !important;');
          out.push('}');
        }
      });
      // Frost at 0 means "no blur at all": dropping the filter also drops one
      // composited layer per surface.
      out.push('html[data-cb-noblur] ' + GLASS_TARGETS.map((target) => target.sel).join(',html[data-cb-noblur] ') + '{');
      out.push('backdrop-filter:none !important;-webkit-backdrop-filter:none !important;');
      out.push('}');
      // Shiki writes its background inline on the <pre>; clearing it is what lets the
      // code area's glass show through instead of an opaque grey slab.
      out.push('html .md-code-block pre,html .md-code-block .shiki{');
      out.push('background-color:transparent !important;background-image:none !important;');
      out.push('}');
      // Children of the tool-card header paint their own fills over it; clear them so the row's
      // material (and the text on top of it) is what shows.
      out.push('html [class*="HOHHba_header"] *{');
      out.push('background-color:transparent !important;background-image:none !important;');
      out.push('box-shadow:none !important;');
      out.push('}');
      // The preview button inside the file block paints nothing of its own once the wrapper
      // carries the material; clearing it prevents a second, differently rounded layer.
      out.push('html button[class*="K5rwea_cardPreview"]{');
      out.push('background-color:transparent !important;background-image:none !important;');
      out.push('box-shadow:none !important;border-radius:inherit !important;border-color:transparent !important;');
      out.push('}');
      // The file name / meta area inside that block paints its own fill, so the middle did not
      // match the ring around it. Clearing the descendants lets the wrapper's material show as
      // one surface.
      // `K5rwea_fileBody` is a *different* element whose class merely starts with the wrapper's
      // name, so the substring selector painted it too and the middle ended up one layer stronger
      // than the ring. It is cleared explicitly here (high specificity, so it beats the target).
      out.push('html div[class~="K5rwea_file"] div[class*="K5rwea_fileBody"]{');
      out.push('background-color:transparent !important;background-image:none !important;');
      out.push('backdrop-filter:none !important;-webkit-backdrop-filter:none !important;');
      out.push('box-shadow:none !important;');
      out.push('}');
      out.push('html div[class*="K5rwea_file"] *{');
      out.push('background-color:transparent !important;background-image:none !important;');
      out.push('box-shadow:none !important;');
      out.push('}');
      // The "new terminal" row is a kit button inside a wrapper; one of the two paints a
      // dark fill of its own. Clearing both is what makes the row transparent like the
      // other entries. `:hover` rules are more specific, so the mirrored hover survives.
      out.push('html button[class*="-4GESq_main"],html [class*="-4GESq_entry"]{');
      out.push(
        'background:transparent !important;background-image:none !important;' +
          'box-shadow:none !important;border-color:transparent !important;',
      );
      out.push('}');
      // Modal backdrop: fully transparent, no frosted layer at all. The overlay keeps handling
      // clicks; only its paint is removed.
      out.push('html div[class*="AnXs9G_mask"]{');
      out.push('background-color:transparent !important;background-image:none !important;');
      out.push('backdrop-filter:none !important;-webkit-backdrop-filter:none !important;');
      out.push('box-shadow:none !important;border-color:transparent !important;');
      out.push('}');
      return out.join('');
    }

    /* ------------------------------------------------------------------ */
    /* settings row                                                        */
    /* ------------------------------------------------------------------ */

    // Flat, sectioned layout: the panel itself carries no card chrome — DSH already renders the
    // settings container, so a nested bordered card only added visual noise. Sections are
    // separated by a hairline instead of boxes.
    const ROW_STYLE = {
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      padding: '2px 0',
    };
    const HEAD_STYLE = { display: 'flex', flexDirection: 'column', gap: '4px' };
    const TITLE_STYLE = { fontSize: '13px', fontWeight: '600', color: 'var(--dsw-alias-label-primary)' };
    const DESC_STYLE = { fontSize: '12px', lineHeight: '1.55', color: 'var(--dsw-alias-label-secondary)' };
    const SECTION_STYLE = {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '14px',
      paddingTop: '14px',
      borderTop: '1px solid var(--dsw-alias-border-l1, rgba(0,0,0,.08))',
    };
    const LABEL_STYLE = { fontSize: '12px', fontWeight: '600', color: 'var(--dsw-alias-label-primary)' };
    const VALUE_STYLE = {
      fontSize: '12px',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--dsw-alias-label-secondary)',
    };
    const SLIDER_HEAD_STYLE = { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' };
    const SLIDER_STYLE = { width: '100%', margin: '0', accentColor: 'var(--dsw-alias-brand-primary)' };
    const HINT_STYLE = { fontSize: '11px', lineHeight: '1.6', color: 'var(--dsw-alias-label-secondary)' };
    const ERROR_STYLE = { fontSize: '12px', color: 'var(--dsw-alias-state-error-primary)' };
    const CHIP_STYLE = {
      height: '30px',
      padding: '0 12px',
      fontSize: '12px',
      borderRadius: '9px',
      border: '1px solid var(--dsw-alias-border-l1, rgba(0,0,0,.1))',
      background: 'transparent',
      color: 'var(--dsw-alias-label-primary)',
      cursor: 'pointer',
    };
    const CHIP_ACTIVE_STYLE = Object.assign({}, CHIP_STYLE, {
      background: 'color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent)',
      borderColor: 'var(--dsw-alias-brand-primary)',
    });
    const INPUT_STYLE = {
      flex: '1 1 auto',
      minWidth: '0',
      height: '30px',
      padding: '0 10px',
      fontSize: '12px',
      borderRadius: '9px',
      border: '1px solid var(--dsw-alias-border-l1, rgba(0,0,0,.1))',
      background: 'var(--dsw-alias-bg-base, transparent)',
      color: 'var(--dsw-alias-label-primary)',
    };
    const SELECT_STYLE = {
      height: '30px',
      padding: '0 8px',
      fontSize: '12px',
      borderRadius: '9px',
      border: '1px solid var(--dsw-alias-border-l1, rgba(0,0,0,.1))',
      background: 'var(--dsw-alias-bg-base, transparent)',
      color: 'var(--dsw-alias-label-primary)',
      cursor: 'pointer',
    };
    // Compact chip used by the language row: ten languages have to fit on one wrapped line.
    const LANG_CHIP_STYLE = Object.assign({}, CHIP_STYLE, {
      height: '26px',
      padding: '0 9px',
      fontSize: '11px',
      borderRadius: '8px',
    });

    function readFileAsDataUrl(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('read failed'));
        reader.onload = () => resolve(String(reader.result || ''));
        reader.readAsDataURL(file);
      });
    }

    function loadImageElement(src) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onerror = () => reject(new Error('decode failed'));
        image.onload = () => resolve(image);
        image.src = src;
      });
    }

    const CROP_BOX_STYLE = {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      borderRadius: '12px',
      background: 'rgba(0,0,0,.06)',
      touchAction: 'none',
      cursor: 'grab',
      userSelect: 'none',
    };

    /**
     * Crop step for a local picture. The frame matches the window's aspect ratio, so
     * what is kept here is exactly what becomes the wallpaper. Drag to move, zoom to
     * tighten; the chosen rectangle is exported, never the whole file.
     */
    function CropDialog(props) {
      const src = props.src;
      const t = props.t;
      const viewport = React.useRef(null);
      const drag = React.useRef(null);
      const [zoom, setZoom] = React.useState(1);
      const [offset, setOffset] = React.useState({ x: 0, y: 0 });
      const [natural, setNatural] = React.useState({ w: 0, h: 0 });
      const [box, setBox] = React.useState({ w: 0, h: 0 });

      React.useEffect(() => {
        let alive = true;
        loadImageElement(src)
          .then((image) => {
            if (!alive) return;
            setNatural({ w: image.naturalWidth || image.width || 0, h: image.naturalHeight || image.height || 0 });
          })
          .catch(() => {});
        return () => {
          alive = false;
        };
      }, [src]);

      React.useEffect(() => {
        const measure = () => {
          const node = viewport.current;
          if (node === null) return;
          const width = Math.max(1, node.clientWidth);
          const ratio = window.innerWidth / Math.max(1, window.innerHeight);
          setBox({ w: width, h: Math.max(1, Math.round(width / ratio)) });
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
      }, []);

      const base =
        natural.w === 0 || natural.h === 0 || box.w === 0
          ? 1
          : Math.max(box.w / natural.w, box.h / natural.h);
      const scale = base * zoom;
      const drawnW = natural.w * scale;
      const drawnH = natural.h * scale;
      const limitX = Math.max(0, (drawnW - box.w) / 2);
      const limitY = Math.max(0, (drawnH - box.h) / 2);
      const x = Math.min(limitX, Math.max(-limitX, offset.x));
      const y = Math.min(limitY, Math.max(-limitY, offset.y));

      const onPointerDown = (event) => {
        drag.current = { x: event.clientX, y: event.clientY, ox: x, oy: y };
        if (event.currentTarget.setPointerCapture) event.currentTarget.setPointerCapture(event.pointerId);
      };
      const onPointerMove = (event) => {
        if (drag.current === null) return;
        setOffset({
          x: drag.current.ox + (event.clientX - drag.current.x),
          y: drag.current.oy + (event.clientY - drag.current.y),
        });
      };
      const onPointerUp = () => {
        drag.current = null;
      };

      const confirm = () => {
        if (natural.w === 0 || scale === 0 || box.w === 0) return;
        const left = box.w / 2 + x - drawnW / 2;
        const top = box.h / 2 + y - drawnH / 2;
        const maxSx = Math.max(0, natural.w - box.w / scale);
        const maxSy = Math.max(0, natural.h - box.h / scale);
        const sx = Math.min(Math.max(0, -left / scale), maxSx);
        const sy = Math.min(Math.max(0, -top / scale), maxSy);
        props.onConfirm({
          sx,
          sy,
          sw: Math.min(natural.w - sx, box.w / scale),
          sh: Math.min(natural.h - sy, box.h / scale),
        });
      };

      return h(
        'div',
        { style: SECTION_STYLE, 'data-custom-background-crop': '1' },
        h('div', { style: LABEL_STYLE }, t('cropTitle')),
        h(
          'div',
          {
            ref: viewport,
            style: Object.assign({}, CROP_BOX_STYLE, { height: box.h + 'px' }),
            onPointerDown,
            onPointerMove,
            onPointerUp,
            onPointerLeave: onPointerUp,
          },
          natural.w > 0
            ? h('img', {
                src,
                alt: '',
                draggable: false,
                style: {
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: drawnW + 'px',
                  height: drawnH + 'px',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  transform: 'translate(-50%, -50%) translate(' + x + 'px, ' + y + 'px)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })
            : null,
        ),
        h(
          'div',
          { style: { display: 'flex', justifyContent: 'space-between' } },
          h('span', { style: HINT_STYLE }, t('zoom')),
          h('span', { style: HINT_STYLE }, Math.round(zoom * 100) + '%'),
        ),
        h('input', {
          type: 'range',
          min: '100',
          max: '300',
          step: '1',
          value: String(Math.round(zoom * 100)),
          'aria-label': t('zoom'),
          onChange: (event) => setZoom(Number(event.target.value) / 100),
          style: { width: '100%', accentColor: 'var(--dsw-alias-brand-primary)' },
        }),
        h(
          'div',
          { style: { display: 'flex', gap: '8px' } },
          h(
            'button',
            { type: 'button', onClick: confirm, style: Object.assign({}, CHIP_STYLE, CHIP_ACTIVE_STYLE) },
            t('confirm'),
          ),
          h('button', { type: 'button', onClick: props.onCancel, style: CHIP_STYLE }, t('cancel')),
        ),
        h('div', { style: HINT_STYLE }, t('cropHint')),
      );
    }

    function BackgroundRow() {
      const [state, setState] = React.useState(getPrefs);
      const [draft, setDraft] = React.useState('');
      const [error, setError] = React.useState('');
      const [busy, setBusy] = React.useState(false);
      // Non-null while the crop step is open: { src, name }.
      const [crop, setCrop] = React.useState(null);

      React.useEffect(() => subscribe(() => setState(getPrefs())), []);

      // DSH changes its language by writing `<html lang>`; re-render so an `auto` panel follows
      // immediately instead of waiting for the next settings visit.
      React.useEffect(() => {
        const observer = new MutationObserver(() => setState(getPrefs()));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
        return () => observer.disconnect();
      }, []);

      const update = (patch) => commit(Object.assign({}, getPrefs(), patch));

      const onPick = async (event) => {
        const file = event.target.files && event.target.files[0];
        event.target.value = '';
        if (!file) return;
        setError('');
        setBusy(true);
        try {
          const isVideo = /^video\//i.test(file.type) || /\.(mp4|webm|ogg|mov|m4v)$/i.test(file.name);
          if (isVideo) {
            const key = 'video-' + Date.now();
            await putImageBlob(key, file);
            if (runtimeVideoUrl !== '') URL.revokeObjectURL(runtimeVideoUrl);
            runtimeVideoUrl = URL.createObjectURL(file);
            update({ preset: 'video', videoKey: key, imageKey: '', imageUrl: '' });
            setBusy(false);
            return;
          }
          // Animated formats cannot be cropped without losing the animation (a canvas
          // capture keeps one frame), so the original file is stored untouched.
          const animated = /^image\/(gif|webp|avif)$/i.test(file.type) || /\.(gif|webp|avif)$/i.test(file.name);
          if (animated) {
            const key = 'wallpaper-' + Date.now();
            await putImageBlob(key, file);
            if (runtimeImageUrl !== '') URL.revokeObjectURL(runtimeImageUrl);
            runtimeImageUrl = URL.createObjectURL(file);
            update({ preset: 'image', imageKey: key, imageUrl: '' });
            setBusy(false);
            return;
          }
          const raw = await readFileAsDataUrl(file);
          // Open the crop step; the picture is only stored once it is confirmed.
          setCrop({ src: raw, name: file.name });
        } catch (failure) {
          setError(t('tooLarge'));
        } finally {
          setBusy(false);
        }
      };

      /** Draw the selected region into a bounded JPEG and store it. */
      const applyCrop = async (rect) => {
        if (crop === null) return;
        const source = crop.src;
        setBusy(true);
        setError('');
        try {
          const image = await loadImageElement(source);
          // Native crop pixels, never downscaled: what the user framed is stored at
          // its own resolution. PNG when the area is small enough to stay lossless.
          const width = Math.max(1, Math.round(rect.sw));
          const height = Math.max(1, Math.round(rect.sh));
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext('2d');
          if (context === null) throw new Error('no canvas');
          context.drawImage(image, rect.sx, rect.sy, rect.sw, rect.sh, 0, 0, width, height);
          const lossless = width * height <= 6000000;
          const type = lossless ? 'image/png' : 'image/jpeg';
          const quality = lossless ? undefined : 0.95;
          const blob = await new Promise((resolve) => canvas.toBlob(resolve, type, quality));
          if (blob === null) throw new Error('encode failed');
          const key = 'wallpaper-' + Date.now();
          await putImageBlob(key, blob);
          if (runtimeImageUrl !== '') URL.revokeObjectURL(runtimeImageUrl);
          runtimeImageUrl = URL.createObjectURL(blob);
          update({ preset: 'image', imageKey: key, imageUrl: '' });
          setCrop(null);
        } catch (failure) {
          setError(t('tooLarge'));
        } finally {
          setBusy(false);
        }
      };

      const onApplyLink = () => {
        const url = draft.trim();
        if (sanitizeUrl(url) === '') {
          setError(t('badUrl'));
          return;
        }
        setError('');
        update({ preset: 'image', imageUrl: url });
        setDraft('');
      };

      if (crop !== null) {
        return h(
          'div',
          { style: ROW_STYLE, 'data-plugin': PLUGIN_ID },
          h(
            'div',
            { style: HEAD_STYLE },
            h('div', { style: TITLE_STYLE }, t('title')),
            h('div', { style: DESC_STYLE }, t('cropTitle')),
          ),
          h(CropDialog, {
            src: crop.src,
            t,
            onCancel: () => setCrop(null),
            onConfirm: (rect) => {
              applyCrop(rect);
            },
          }),
          error !== '' ? h('div', { style: ERROR_STYLE, role: 'alert' }, error) : null,
        );
      }

      return h(
        'div',
        { style: ROW_STYLE, 'data-plugin': PLUGIN_ID },
        h(
          'div',
          { style: HEAD_STYLE },
          h('div', { style: TITLE_STYLE }, t('title')),
          h('div', { style: DESC_STYLE }, t('desc')),
        ),
        // Language: label on its own line, chips underneath — with ten languages an inline label
        // pushed the row into an awkward ragged wrap.
        h(
          'div',
          { style: SECTION_STYLE },
          h('div', { style: LABEL_STYLE }, t('language')),
          h(
            'div',
            { style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } },
            h(
              'button',
              {
                key: 'auto',
                type: 'button',
                onClick: () => update({ lang: 'auto' }),
                style: Object.assign({}, LANG_CHIP_STYLE, state.lang === 'auto' ? CHIP_ACTIVE_STYLE : {}),
              },
              t('langAuto'),
            ),
            LANGS.map((code) =>
              h(
                'button',
                {
                  key: code,
                  type: 'button',
                  onClick: () => update({ lang: code }),
                  style: Object.assign({}, LANG_CHIP_STYLE, state.lang === code ? CHIP_ACTIVE_STYLE : {}),
                },
                LANG_NAMES[code],
              ),
            ),
          ),
        ),
        h(
          'div',
          { style: SECTION_STYLE },
          h('div', { style: LABEL_STYLE }, t('image')),
          h(
            'div',
            { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
            h('input', {
              type: 'text',
              value: draft,
              placeholder: t('linkLabel'),
              onChange: (event) => setDraft(event.target.value),
              onKeyDown: (event) => {
                if (event.key === 'Enter') onApplyLink();
              },
              style: INPUT_STYLE,
            }),
            h(
              'button',
              { type: 'button', onClick: onApplyLink, style: Object.assign({}, CHIP_STYLE, CHIP_ACTIVE_STYLE) },
              t('apply'),
            ),
          ),
          h(
            'div',
            { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' } },
            h(
              'label',
              {
                style: Object.assign({}, CHIP_STYLE, {
                  display: 'inline-flex',
                  alignItems: 'center',
                  opacity: busy ? '0.6' : '1',
                }),
              },
              t('pick'),
              h('input', {
                type: 'file',
                accept: 'image/*,video/mp4,video/webm,video/quicktime',
                onChange: onPick,
                style: { display: 'none' },
              }),
            ),
            state.preset === 'image' || state.preset === 'video'
              ? h(
                  'button',
                  {
                    type: 'button',
                    onClick: () => update({ preset: NO_PRESET, imageUrl: '', imageKey: '', videoKey: '' }),
                    style: CHIP_STYLE,
                  },
                  t('remove'),
                )
              : null,
            state.preset === 'video' ? h('span', { style: HINT_STYLE }, '· ' + t('videoInUse')) : null,
          ),
        ),
        h(
          'div',
          { style: SECTION_STYLE },
          h('div', { style: LABEL_STYLE }, t('glass')),
          h(
            'div',
            { style: SLIDER_HEAD_STYLE },
            h('span', { style: LABEL_STYLE }, t('transparency')),
            h('span', { style: VALUE_STYLE }, String(state.transparency) + '%'),
          ),
          h('input', {
            type: 'range',
            min: '0',
            max: '100',
            step: '1',
            value: String(state.transparency),
            'aria-label': t('transparency'),
            onChange: (event) => update({ transparency: Number(event.target.value) }),
            style: SLIDER_STYLE,
          }),
          h(
            'div',
            { style: SLIDER_HEAD_STYLE },
            h('span', { style: LABEL_STYLE }, t('blur')),
            h('span', { style: VALUE_STYLE }, String(state.blur) + '%'),
          ),
          h('input', {
            type: 'range',
            min: '0',
            max: '100',
            step: '1',
            value: String(state.blur),
            'aria-label': t('blur'),
            onChange: (event) => update({ blur: Number(event.target.value) }),
            style: SLIDER_STYLE,
          }),
          h('div', { style: HINT_STYLE }, t('glassHint')),
        ),
        h(
          'div',
          { style: SECTION_STYLE },
          h(
            'div',
            { style: SLIDER_HEAD_STYLE },
            h('span', { style: LABEL_STYLE }, t('readability')),
            h('span', { style: VALUE_STYLE }, String(state.readability) + '%'),
          ),
          h('input', {
            type: 'range',
            min: '0',
            max: '100',
            step: '1',
            value: String(state.readability),
            'aria-label': t('readability'),
            onChange: (event) => update({ readability: Number(event.target.value) }),
            style: SLIDER_STYLE,
          }),
          h('div', { style: HINT_STYLE }, t('readabilityHint')),
        ),
        h('div', { style: HINT_STYLE }, t('hint')),
        error !== '' ? h('div', { style: ERROR_STYLE, role: 'alert' }, error) : null,
      );
    }

    /* ------------------------------------------------------------------ */
    /* plugin                                                              */
    /* ------------------------------------------------------------------ */

    function apply(ctx) {
      // Temporary probe: Alt+click reports the clicked element's class chain and
      // leaves it selected, so a surface can be named exactly.
      ctx.effect(() => {
        const onAltClick = (event) => {
          if (!event.altKey) return;
          event.preventDefault();
          event.stopPropagation();
          const chain = [];
          let node = event.target;
          for (let index = 0; index < 4 && node !== null && node.classList !== undefined; index += 1) {
            const classes = Array.prototype.slice.call(node.classList);
            chain.push(node.tagName.toLowerCase() + (classes.length > 0 ? '.' + classes.join('.') : ''));
            node = node.parentElement;
          }
          const box = document.createElement('div');
          box.setAttribute('data-cb-probe', '1');
          box.style.cssText =
            'position:fixed;left:12px;bottom:12px;z-index:2147483000;max-width:72vw;padding:10px 12px;' +
            'border-radius:10px;background:rgba(0,0,0,.9);color:#fff;border:1px solid rgba(255,255,255,.28);' +
            'font:12px/1.5 ui-monospace,Consolas,monospace;white-space:pre-wrap;' +
            'user-select:text;-webkit-user-select:text;cursor:text';
          box.textContent = chain.join('\n') + '\n（已自动选中，Ctrl+C 复制）';
          document.body.appendChild(box);
          try {
            const range = document.createRange();
            range.selectNodeContents(box);
            const selection = window.getSelection();
            if (selection !== null) {
              selection.removeAllRanges();
              selection.addRange(range);
            }
          } catch (error) {
            // Selection is a convenience only.
          }
          window.setTimeout(() => box.remove(), 20000);
        };
        document.addEventListener('click', onAltClick, true);
        return () => {
          document.removeEventListener('click', onAltClick, true);
          document.querySelectorAll('[data-cb-probe="1"]').forEach((node) => node.remove());
        };
      }, 'custom background: element probe');

      // TEMPORARY: Alt+Shift+K dumps the computed background of every element inside a file
      // preview card, so the element that actually paints the middle can be identified.
      ctx.effect(() => {
        const onKeyDown = (event) => {
          if (event.altKey !== true || event.shiftKey !== true || event.code !== 'KeyK') return;
          event.preventDefault();
          const root = document.querySelector(
            '[class*="F07MqG_row"],[class*="F07MqG_list"],[class*="K5rwea_file"],[class*="K5rwea_root"]',
          );
          const box = document.createElement('div');
          box.setAttribute('data-cb-dump', '1');
          box.style.cssText =
            'position:fixed;left:12px;bottom:12px;z-index:2147483000;max-width:86vw;max-height:60vh;' +
            'overflow:auto;padding:10px 12px;border-radius:10px;background:rgba(0,0,0,.94);color:#fff;' +
            'border:1px solid rgba(255,255,255,.3);font:12px/1.5 ui-monospace,Consolas,monospace;' +
            'white-space:pre-wrap;user-select:text;-webkit-user-select:text;cursor:pointer';
          if (root === null) {
            box.textContent = '没有找到文件预览卡片（K5rwea）';
          } else {
            const lines = [];
            // Ancestors first: the opaque panel behind the row is usually what kills the blur.
            const chain = [];
            let walker = root.parentElement;
            for (let level = 0; level < 5 && walker !== null; level += 1) {
              chain.push(walker);
              walker = walker.parentElement;
            }
            chain.reverse().forEach((node) => {
              const style = window.getComputedStyle(node);
              if (style.backgroundColor === 'rgba(0, 0, 0, 0)' && style.backgroundImage === 'none') return;
              const classes = typeof node.className === 'string' ? node.className : '';
              lines.push(
                '^ ' + node.tagName.toLowerCase() +
                  (classes ? '.' + classes.split(/\s+/).slice(0, 2).join('.') : '') +
                  ' [' + node.offsetWidth + 'x' + node.offsetHeight + ']' +
                  ' bg:' + style.backgroundColor +
                  (style.backdropFilter === 'none' ? '' : ' blur:' + style.backdropFilter),
              );
            });
            const nodes = [root].concat(Array.prototype.slice.call(root.querySelectorAll('*')));
            nodes.forEach((node) => {
              if (lines.length >= 20) return;
              const style = window.getComputedStyle(node);
              const bg = style.backgroundColor;
              const image = style.backgroundImage;
              if (bg === 'rgba(0, 0, 0, 0)' && (image === 'none' || image === '')) return;
              const classes = typeof node.className === 'string' ? node.className : '';
              lines.push(
                node.tagName.toLowerCase() +
                  (classes ? '.' + classes.split(/\s+/).slice(0, 2).join('.') : '') +
                  ' [' + node.offsetWidth + 'x' + node.offsetHeight + ']' +
                  ' bg:' + bg +
                  ' radius:' + style.borderRadius +
                  (image === 'none' ? '' : ' img:' + image.slice(0, 24)) +
                  (style.backdropFilter === 'none' ? '' : ' blur:' + style.backdropFilter),
              );
            });
            box.textContent = (lines.length > 0 ? lines.join('\n') : '（没有带背景的子元素）') + '\n（点一下关闭）';
          }
          box.addEventListener('click', () => box.remove());
          document.querySelectorAll('[data-cb-dump="1"]').forEach((node) => node.remove());
          document.body.appendChild(box);
          try {
            const range = document.createRange();
            range.selectNodeContents(box);
            const selection = window.getSelection();
            if (selection !== null) {
              selection.removeAllRanges();
              selection.addRange(range);
            }
          } catch (error) {
            // Selection is a convenience only.
          }
        };
        document.addEventListener('keydown', onKeyDown, true);
        return () => {
          document.removeEventListener('keydown', onKeyDown, true);
          document.querySelectorAll('[data-cb-dump="1"]').forEach((node) => node.remove());
        };
      }, 'custom background: file card dump');

      // Diagnostic switch: Alt+Shift+G disables every stylesheet this plugin injected, so
      // a visual glitch can be attributed to the plugin or to the shell.
      ctx.effect(() => {
        const onKeyDown = (event) => {
          if (event.altKey !== true || event.shiftKey !== true || event.code !== 'KeyG') return;
          event.preventDefault();
          const tags = document.querySelectorAll('style[data-plugin="' + PLUGIN_ID + '"]');
          if (tags.length === 0) return;
          const turnedOff = tags[0].disabled !== true;
          tags.forEach((tag) => {
            tag.disabled = turnedOff;
          });
          const box = document.createElement('div');
          box.setAttribute('data-cb-toggle', '1');
          box.style.cssText =
            'position:fixed;left:12px;bottom:12px;z-index:2147483000;padding:8px 12px;border-radius:10px;' +
            'background:rgba(0,0,0,.9);color:#fff;font:12px/1.4 ui-monospace,Consolas,monospace;';
          box.textContent = turnedOff ? '插件材质：已关闭（再按一次恢复）' : '插件材质：已恢复';
          document.body.appendChild(box);
          window.setTimeout(() => box.remove(), 2500);
        };
        document.addEventListener('keydown', onKeyDown, true);
        return () => document.removeEventListener('keydown', onKeyDown, true);
      }, 'custom background: css toggle');




      // TEMPORARY: Alt+Shift+H arms a short capture, then whatever nodes get inserted
      // (a tooltip that vanishes when the pointer leaves, for example) are listed by class
      // so they can be named without clicking them.
      ctx.effect(() => {
        let observer = null;
        let timer = 0;

        const report = (entries) => {
          const box = document.createElement('div');
          box.setAttribute('data-cb-capture', '1');
          box.style.cssText =
            'position:fixed;left:12px;bottom:12px;z-index:2147483000;max-width:80vw;padding:10px 12px;' +
            'border-radius:10px;background:rgba(0,0,0,.92);color:#fff;border:1px solid rgba(255,255,255,.3);' +
            'font:12px/1.5 ui-monospace,Consolas,monospace;white-space:pre-wrap;' +
            'user-select:text;-webkit-user-select:text;cursor:pointer';
          box.textContent = entries.join('\n') + '\n（点一下关闭）';
          box.addEventListener('click', () => box.remove());
          document.body.appendChild(box);
          try {
            const range = document.createRange();
            range.selectNodeContents(box);
            const selection = window.getSelection();
            if (selection !== null) {
              selection.removeAllRanges();
              selection.addRange(range);
            }
          } catch (error) {
            // Selection is a convenience only.
          }
        };

        const stop = () => {
          if (observer !== null) {
            observer.disconnect();
            observer = null;
          }
          window.clearTimeout(timer);
        };

        const arm = () => {
          stop();
          const seen = [];
          observer = new MutationObserver((records) => {
            records.forEach((record) => {
              record.addedNodes.forEach((node) => {
                if (node.nodeType !== 1) return;
                const list = [node].concat(Array.prototype.slice.call(node.querySelectorAll('*')).slice(0, 4));
                list.forEach((element) => {
                  if (seen.length >= 14) return;
                  const name = element.tagName.toLowerCase();
                  const classes = element.className && typeof element.className === 'string' ? element.className : '';
                  const text = (element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 24);
                  seen.push(name + (classes ? '.' + classes.split(/\s+/).join('.') : '') + '   「' + text + '」');
                });
              });
            });
          });
          observer.observe(document.body, { childList: true, subtree: true });
          timer = window.setTimeout(() => {
            stop();
            report(seen.length > 0 ? seen : ['（没有捕获到新节点：请在这 3 秒内悬停那个按钮）']);
          }, 3000);
        };

        const onKeyDown = (event) => {
          if (event.altKey !== true || event.shiftKey !== true || event.code !== 'KeyH') return;
          event.preventDefault();
          arm();
          const hint = document.createElement('div');
          hint.setAttribute('data-cb-capture', '1');
          hint.style.cssText =
            'position:fixed;left:12px;bottom:12px;z-index:2147483000;padding:8px 12px;border-radius:10px;' +
            'background:rgba(0,0,0,.9);color:#fff;font:12px/1.4 ui-monospace,Consolas,monospace;';
          hint.textContent = '已开始捕获，请在 3 秒内悬停目标按钮…';
          document.body.appendChild(hint);
          window.setTimeout(() => hint.remove(), 3000);
        };

        document.addEventListener('keydown', onKeyDown, true);
        return () => {
          document.removeEventListener('keydown', onKeyDown, true);
          stop();
          document.querySelectorAll('[data-cb-capture="1"]').forEach((node) => node.remove());
        };
      }, 'custom background: node capture');


      // Mirror the guide button's hover appearance onto the three containers around it.
      // The values are read from the live element while it is hovered, so whatever the
      // shell does (colour, shadow, transform) is reproduced --including "nothing".
      ctx.effect(() => {
        const TARGET = 'button[class*="-4GESq_main"]';
        // The "new terminal" row is built from the kit button (`-4GESq_main`) instead of
        // `p2k40q_entry`, so it has to be named explicitly or it keeps the shell's own
        // hover and looks different from the other three rows.
        const OTHERS =
          'button[class*="p2k40q_entry"],button[class*="-4GESq_main"],[class*="p2k40q_moreAnchor"],[class*="-4GESq_entry"]';
        const root = document.documentElement;

        const tag = document.createElement('style');
        tag.dataset.plugin = PLUGIN_ID;
        tag.dataset.pluginCss = PLUGIN_ID + '/hover-mirror.css';
        tag.textContent =
          'html ' +
          OTHERS +
          ':hover,html ' +
          OTHERS +
          ':focus-visible{' +
          'background-color:var(--cb-hover-bg, transparent) !important;' +
          'background-image:var(--cb-hover-image, none) !important;' +
          'box-shadow:var(--cb-hover-shadow, none) !important;' +
          'border-color:var(--cb-hover-border, transparent) !important;' +
          'transform:var(--cb-hover-transform, none) !important;' +
          '}';
        document.head.appendChild(tag);

        const looksRelevant = (element) => {
          if (element === null || element === undefined) return false;
          const classes = typeof element.className === 'string' ? element.className : '';
          return classes.indexOf('4GESq') !== -1 || classes.indexOf('p2k40q') !== -1;
        };

        let lastNode = null;
        let lastTime = 0;
        const capture = (event) => {
          const node = event.target;
          if (node === null || typeof node.closest !== 'function') return;
          // Cheap rejection first: almost every pointerover in the app is over unrelated
          // content, so a couple of class-name checks avoid a `closest()` walk each time.
          // The immediate ancestors are included because the pointer usually lands on an
          // icon or text span inside the button.
          if (looksRelevant(node) !== true && looksRelevant(node.parentElement) !== true && looksRelevant(node.parentElement === null ? null : node.parentElement.parentElement) !== true) {
            return;
          }
          const target = node.closest(TARGET);
          if (target === null) return;
          const now = Date.now();
          if (target === lastNode && now - lastTime < 120) return;
          lastNode = target;
          lastTime = now;
          const style = window.getComputedStyle(target);
          root.style.setProperty('--cb-hover-bg', style.backgroundColor);
          root.style.setProperty('--cb-hover-image', style.backgroundImage);
          root.style.setProperty('--cb-hover-shadow', style.boxShadow);
          root.style.setProperty('--cb-hover-border', style.borderColor);
          root.style.setProperty('--cb-hover-transform', style.transform);
        };
        document.addEventListener('pointerover', capture, true);

        return () => {
          document.removeEventListener('pointerover', capture, true);
          tag.remove();
          root.style.removeProperty('--cb-hover-bg');
          root.style.removeProperty('--cb-hover-image');
          root.style.removeProperty('--cb-hover-shadow');
          root.style.removeProperty('--cb-hover-border');
          root.style.removeProperty('--cb-hover-transform');
        };
      }, 'custom background: hover mirror');

      // Make the "new terminal" entry look exactly like the other entries: copy the whole
      // computed appearance of a normal entry button onto it. Only styles are copied --      // the element itself, its handlers and its layout position stay untouched.
      ctx.effect(() => {
        const REFERENCE = 'button[class*="p2k40q_entry"]';
        const TARGETS = 'button[class*="-4GESq_main"]';
        const PROPS = [
          'display',
          'align-items',
          'justify-content',
          'gap',
          'padding-top',
          'padding-right',
          'padding-bottom',
          'padding-left',
          'margin-top',
          'margin-right',
          'margin-bottom',
          'margin-left',
          'width',
          'height',
          'min-height',
          'background-color',
          'background-image',
          'background-size',
          'background-position',
          'background-repeat',
          'border-top-width',
          'border-right-width',
          'border-bottom-width',
          'border-left-width',
          'border-top-style',
          'border-right-style',
          'border-bottom-style',
          'border-left-style',
          'border-top-color',
          'border-right-color',
          'border-bottom-color',
          'border-left-color',
          'border-top-left-radius',
          'border-top-right-radius',
          'border-bottom-right-radius',
          'border-bottom-left-radius',
          'box-shadow',
          'color',
          'font-family',
          'font-size',
          'font-weight',
          'line-height',
          'letter-spacing',
          'text-align',
          'text-decoration-line',
          'opacity',
          'cursor',
          'transition',
        ];
        const touched = new Set();
        let signature = '';
        let frame = 0;

        const clone = (target, source) => {
          const from = window.getComputedStyle(source);
          PROPS.forEach((property) => {
            const value = from.getPropertyValue(property);
            if (value === '') return;
            target.style.setProperty(property, value, 'important');
          });
          touched.add(target);
        };

        const run = () => {
          const source = document.querySelector(REFERENCE);
          if (source === null) return false;
          const targets = document.querySelectorAll(TARGETS);
          if (targets.length === 0) return false;
          // Only rewrite when the reference actually changed (theme switch, resize,
          // slider change) --otherwise a no-op pass would touch 49 properties per node.
          const style = window.getComputedStyle(source);
          const next = PROPS.map((property) => style.getPropertyValue(property)).join('|');
          if (next === signature) return true;
          signature = next;
          targets.forEach((target) => clone(target, source));
          return true;
        };

        // Slider drags change the reference style every frame; cloning 49 properties per
        // frame is wasted work while the value is still moving, so the pass is debounced.
        let settleTimer = 0;
        const schedule = () => {
          window.clearTimeout(settleTimer);
          settleTimer = window.setTimeout(() => {
            settleTimer = 0;
            if (frame !== 0) return;
            frame = window.requestAnimationFrame(() => {
              frame = 0;
              run();
            });
          }, 140);
        };

        let tries = 0;
        const tick = () => {
          tries += 1;
          if (run() === false && tries < 24) window.setTimeout(tick, 500);
        };
        tick();
        const off = subscribe(schedule);

        return () => {
          off();
          if (frame !== 0) window.cancelAnimationFrame(frame);
          touched.forEach((node) => {
            PROPS.forEach((property) => node.style.removeProperty(property));
          });
          touched.clear();
        };
      }, 'custom background: guide entry appearance');

      ctx.slots.inject('settings.general.item', () =>
        ctx.slots.register(
          {
            name: 'settings.general.item',
            id: 'custom-background',
            order: 9,
          },
          BackgroundRow,
        ),
      );

      ctx.effect(() => {
        let wallTag = null;
        let wallKey = null;
        let wallCss = null;
        let shellTag = null;
        let layerDispose = null;

        const paintWallpaper = () => {
          const current = getPrefs();
          const veil = Math.round(((current.readability || 0) / 100) * 0.5 * 100) / 100;
          const key =
            current.preset +
            '|' +
            veil +
            '|' +
            (current.preset === 'image' ? (current.imageKey || '') + current.imageUrl + runtimeImageUrl.length : '');
          if (key === wallKey) return;
          wallKey = key;
          if (wallTag === null) {
            wallTag = document.createElement('style');
            wallTag.dataset.plugin = PLUGIN_ID;
            wallTag.dataset.pluginCss = PLUGIN_ID + '/wallpaper.css';
            document.head.appendChild(wallTag);
          }
          // `null` from wallpaperFor means video mode (the shell must be transparent so
          // the <video> layer shows). With no wallpaper selected the shell keeps a
          // neutral backdrop instead, so the glass still has something to sit on.
          const css = current.preset === '' ? wallpaperCssBase(veil) : wallpaperCss(wallpaperFor(current), veil);
          // Theme switches and stray attribute mutations wake this up; only touch the
          // stylesheet when the resolved text actually differs.
          if (css === wallCss) return;
          wallCss = css;
          wallTag.textContent = css;
        };

        // The picture lives in IndexedDB, so it is loaded once and handed to CSS as an
        // object URL. Until it arrives the wallpaper simply stays as it was.
        const hydrate = async () => {
          const current = getPrefs();
          try {
            if (typeof current.imageKey === 'string' && current.imageKey !== '') {
              const blob = await getImageBlob(current.imageKey);
              if (blob !== null) {
                if (runtimeImageUrl !== '') URL.revokeObjectURL(runtimeImageUrl);
                runtimeImageUrl = URL.createObjectURL(blob);
                wallKey = null;
                notify();
              }
            }
            if (typeof current.videoKey === 'string' && current.videoKey !== '') {
              const blob = await getImageBlob(current.videoKey);
              if (blob !== null) {
                if (runtimeVideoUrl !== '') URL.revokeObjectURL(runtimeVideoUrl);
                runtimeVideoUrl = URL.createObjectURL(blob);
                syncVideo();
                wallKey = null;
                notify();
              }
            }
          } catch (error) {
            // No IDB (private mode): the stored URL path still works.
          }
        };

        // A video wallpaper is a real <video> underneath the shell, not a background
        // image: it is muted, looping and paused whenever the window is hidden.
        let videoEl = null;
        const ensureVideo = () => {
          if (videoEl !== null && videoEl.isConnected === true) return videoEl;
          const element = document.createElement('video');
          element.muted = true;
          element.loop = true;
          element.autoplay = true;
          element.playsInline = true;
          element.setAttribute('muted', '');
          element.setAttribute('playsinline', '');
          element.setAttribute('aria-hidden', 'true');
          element.style.cssText =
            'position:fixed;inset:0;width:100%;height:100%;object-fit:cover;' +
            'z-index:-2;pointer-events:none;background:transparent;';
          document.body.appendChild(element);
          videoEl = element;
          return element;
        };

        const syncVideo = () => {
          const current = getPrefs();
          const active = current.preset === 'video' && runtimeVideoUrl !== '';
          if (active === false) {
            if (videoEl !== null) {
              videoEl.pause();
              videoEl.style.display = 'none';
            }
            return;
          }
          const element = ensureVideo();
          element.style.display = 'block';
          if (element.src !== runtimeVideoUrl) element.src = runtimeVideoUrl;
          if (element.paused === true && document.hidden !== true) {
            const played = element.play();
            if (played !== undefined && typeof played.catch === 'function') played.catch(() => {});
          }
        };
        // A video has no CSS wallpaper layer to tint, so its veil is a real element
        // between the video (-2) and the shell content.
        let scrimEl = null;
        let scrimKey = '';
        const syncScrim = () => {
          const current = getPrefs();
          const active = current.preset === 'video' && runtimeVideoUrl !== '';
          const amount = Math.round(((current.readability || 0) / 100) * 0.5 * 100) / 100;
          if (active === false || amount <= 0) {
            if (scrimEl !== null) scrimEl.style.display = 'none';
            // Clearing the cache matters: after "remove" the element is hidden but the key
            // stays, so adding a background again with the same value would short-circuit
            // on `key === scrimKey` and never show the veil again.
            scrimKey = '';
            return;
          }
          if (scrimEl === null || scrimEl.isConnected !== true) {
            const element = document.createElement('div');
            element.setAttribute('aria-hidden', 'true');
            element.style.cssText =
              'position:fixed;inset:0;z-index:-1;pointer-events:none;background:transparent;';
            document.body.appendChild(element);
            scrimEl = element;
          }
          const dark = document.body.hasAttribute('data-ds-dark-theme');
          const key = (dark ? 'd' : 'l') + amount;
          if (key === scrimKey) return;
          scrimKey = key;
          scrimEl.style.display = 'block';
          scrimEl.style.background = dark
            ? 'rgba(0,0,0,' + amount + ')'
            : 'rgba(255,255,255,' + amount + ')';
        };

        // Sliders drive CSS variables, so dragging never rebuilds a stylesheet. Values are
        // written only when they actually change, so theme observers and stray callbacks
        // do not rewrite the same declarations.
        const applyVars = () => {
          const current = getPrefs();
          const root = document.documentElement;
          const alpha = (((100 - current.transparency) / 100) * 0.66 + 0.04).toFixed(3);
          const blur = (current.blur * 0.34).toFixed(1) + 'px';
          if (root.style.getPropertyValue('--cb-alpha') !== alpha) root.style.setProperty('--cb-alpha', alpha);
          if (root.style.getPropertyValue('--cb-blur') !== blur) root.style.setProperty('--cb-blur', blur);
          const noBlur = current.blur === 0;
          if (noBlur !== root.hasAttribute('data-cb-noblur')) {
            if (noBlur) root.setAttribute('data-cb-noblur', '');
            else root.removeAttribute('data-cb-noblur');
          }
          syncScrim();
        };

        if (shellTag === null) {
          shellTag = document.createElement('style');
          shellTag.dataset.plugin = PLUGIN_ID;
          shellTag.dataset.pluginCss = PLUGIN_ID + '/shell.css';
          shellTag.textContent = shellCss() + glassCss();
          document.head.appendChild(shellTag);
        }

        try {
          layerDispose = ctx.theme.overrideTokens(PLUGIN_ID, SURFACE_LAYER);
        } catch (error) {
          layerDispose = null;
        }

        paintWallpaper();
        applyVars();
        syncVideo();
        hydrate();
        const off = subscribe(() => {
          paintWallpaper();
          applyVars();
          syncVideo();
        });

        const onVisibility = () => {
          if (videoEl === null) return;
          const current = getPrefs();
          const active = current.preset === 'video' && runtimeVideoUrl !== '';
          if (document.hidden === true) {
            videoEl.pause();
          } else if (active) {
            const played = videoEl.play();
            if (played !== undefined && typeof played.catch === 'function') played.catch(() => {});
          }
        };
        document.addEventListener('visibilitychange', onVisibility);

        // Light/dark switches repaint the theme on <body>, but the video scrim is a real
        // element whose colour is written imperatively, so it would keep the old theme's
        // tint until the next slider move. Watch the theme attributes and recompute.
        const syncTheme = () => {
          wallKey = null;
          paintWallpaper();
          applyVars();
        };
        const observer = new MutationObserver(syncTheme);
        observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme', 'class'] });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

        return () => {
          off();
          document.removeEventListener('visibilitychange', onVisibility);
          observer.disconnect();
          if (layerDispose !== null) {
            layerDispose();
            layerDispose = null;
          }
          if (shellTag !== null) {
            shellTag.remove();
            shellTag = null;
          }
          if (wallTag !== null) {
            wallTag.remove();
            wallTag = null;
          }
          if (videoEl !== null) {
            try {
              videoEl.pause();
              videoEl.removeAttribute('src');
              videoEl.load();
              videoEl.remove();
            } catch (error) {
              // Already detached.
            }
            videoEl = null;
          }
          if (scrimEl !== null) {
            scrimEl.remove();
            scrimEl = null;
          }
          if (runtimeVideoUrl !== '') {
            URL.revokeObjectURL(runtimeVideoUrl);
            runtimeVideoUrl = '';
          }
          const root = document.documentElement;
          root.style.removeProperty('--cb-alpha');
          root.style.removeProperty('--cb-blur');
          root.style.removeProperty('--cb-halo');
        };
      }, 'custom background: material');
    }

    exports.apply = apply;
    exports.inject = ['slots', 'theme'];
    return module.exports;
  },
});
