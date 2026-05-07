/* ================================================================
   NTHU-FLY · 互動腳本 / Interaction script
   ================================================================
   v0.3 — 編輯級黑白單色方向
   依循 WEBSITE_GUIDELINES.md 規範

   ----------------------------------------------------------------
   這個檔案做哪些事？
   ----------------------------------------------------------------
   1. 行動裝置漢堡選單開合
   2. 偵測使用者捲到深色（黑底）區段，整頁切換進度條顏色
   3. 頂部 1px 進度條 — 顯示閱讀進度
   4. 揭露動畫觸發（IntersectionObserver，只播一次）
   5. 滑鼠跟隨點 — 單一黑點，hover 互動元素時放大
   ----------------------------------------------------------------

   設計原則：
   • 所有非必要動畫尊重 prefers-reduced-motion
   • 觸控裝置自動關閉滑鼠軌跡
   • 沒有 JS 時頁面照樣可讀（揭露動畫降級為「全部直接顯示」）
================================================================ */

(() => {

  /* ==============================================================
     使用者偏好偵測 / Environment checks
  ============================================================== */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch      = window.matchMedia('(hover: none)').matches;


  /* ==============================================================
     1. MOBILE MENU / 行動裝置選單
     ----------------------------------------------------------------
     ≤720px 時 .nav-links 預設隱藏，按下漢堡按鈕加上 .open 顯示。
     點擊任一連結後自動關閉。
  ============================================================== */
  const toggle = document.getElementById('menu-toggle');
  const links  = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }


  /* ==============================================================
     2. SECTION THEME TRACKER / 深色區段偵測
     ----------------------------------------------------------------
     當任一 [data-theme="dark"] 區塊接近視窗中央時，給 body 加上
     .is-dark — 進度條會自動切到白色（CSS 已綁定 currentColor）。

     使用 IntersectionObserver 比 scroll listener 高效得多。
  ============================================================== */
  const themed = document.querySelectorAll('[data-theme="dark"]');
  const themeIO = new IntersectionObserver((entries) => {
    let active = null;
    entries.forEach(e => {
      if (e.isIntersecting && (!active || e.intersectionRatio > active.intersectionRatio)) {
        active = e;
      }
    });
    if (active) {
      document.body.classList.add('is-dark');
    } else {
      // 沒有任何深色區段在視窗中央，做雙重檢查
      const anyDarkVisible = Array.from(themed).some(el => {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
      });
      document.body.classList.toggle('is-dark', anyDarkVisible);
    }
  }, {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '-40% 0px -40% 0px'   // 只在視窗中央 ±10% 範圍觸發
  });
  themed.forEach(el => themeIO.observe(el));


  /* ==============================================================
     3. SCROLL PROGRESS / 頂部進度條
     ----------------------------------------------------------------
     1px 高的線從左往右填滿。使用 requestAnimationFrame 節流，
     確保不會因為每一個 scroll 事件都觸發重排。
  ============================================================== */
  const progress = document.getElementById('progress');
  let ticking = false;

  function updateProgress() {
    const max = (document.documentElement.scrollHeight - window.innerHeight);
    const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.width = (pct * 100).toFixed(2) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();   // 初始化


  /* ==============================================================
     4. REVEAL ANIMATIONS / 揭露動畫
     ----------------------------------------------------------------
     觀察所有 .reveal / .reveal-lines / .reveal-stagger 元素，
     當進入視窗 15% 時加上 .is-visible 觸發 CSS 動畫，並停止觀察。

     prefers-reduced-motion 模式下：直接給所有元素 .is-visible，
     避免動畫造成不適。
  ============================================================== */
  const revealTargets = document.querySelectorAll(
    '.reveal, .reveal-lines, .reveal-stagger'
  );

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);   // 只播一次，看過就移除觀察
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    });
    revealTargets.forEach(el => io.observe(el));
  } else {
    // 降級：直接全部顯示
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }


  /* ==============================================================
     5. MOUSE CURSOR / 滑鼠跟隨點
     ----------------------------------------------------------------
     單一 14px 黑點，使用 lerp（線性插值）製造輕微延遲。
     hover 互動元素（a / button / [data-cursor]）時放大為 44px。

     觸控裝置與 reduce-motion 模式下：不啟用此功能。
  ============================================================== */
  if (!isTouch && !reduceMotion) {
    const cursor = document.getElementById('cursor');
    let tx = window.innerWidth / 2,  ty = window.innerHeight / 2;  // 目標位置
    let cx = tx,                     cy = ty;                      // 目前位置
    let active = false;

    // 滑鼠移動 → 更新目標位置
    window.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!active) {
        cx = tx;  cy = ty;            // 第一次出現直接定位
        cursor.classList.add('is-active');
        active = true;
      }
    }, { passive: true });

    // 滑鼠離開視窗 → 隱藏
    window.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-active');
      active = false;
    });

    // 動畫迴圈：每一幀往目標靠近 18%
    function tick() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    tick();

    // 互動元素的 hover 放大效果
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }


  /* ==============================================================
     6. I18N / 多語系字典
     ----------------------------------------------------------------
     從 assets/i18n.json 載入語系字典，依使用者偏好渲染所有
     [data-i18n="key"] 元素的內容；同步更新 <html lang>、<title>、
     <meta description>，並把選擇寫入 localStorage。

     擴充新語系流程：
       1. 在 i18n.json 加入新語系區塊（複製 zh 物件改值）
       2. 在 _meta.supported 加入新代碼
       3. 在 _meta.labels 加入新代碼對應的縮寫（如 "JP"）
       無需修改本檔案。

     優雅降級：
       • 載入失敗：隱藏 .lang，頁面內文維持 HTML 中嵌入的中文
       • 找不到 key 對應的翻譯：保留該元素原本內文不覆寫
  ============================================================== */
  const I18N_URL    = 'assets/i18n.json';
  const I18N_KEY    = 'aerosense.lang';
  // 各語系的全名（顯示在 popover 第二行；未列出的代碼則只顯示縮寫）
  const LANG_NAMES  = { zh: '中文', en: 'English', jp: '日本語', kr: '한국어', fr: 'Français', es: 'Español', de: 'Deutsch' };

  /** 偵測初始語系：localStorage > navigator.language > fallback */
  function detectLang(supported, fallback) {
    try {
      const saved = localStorage.getItem(I18N_KEY);
      if (saved && supported.indexOf(saved) !== -1) return saved;
    } catch (_) { /* localStorage 可能被瀏覽器限制 */ }
    const browser = (navigator.language || '').toLowerCase();
    for (let i = 0; i < supported.length; i++) {
      if (browser.indexOf(supported[i]) === 0) return supported[i];
    }
    if (browser.indexOf('zh') === 0 && supported.indexOf('zh') !== -1) return 'zh';
    if (browser.indexOf('en') === 0 && supported.indexOf('en') !== -1) return 'en';
    return fallback;
  }

  /** 把整本字典套到頁面上 */
  function applyLang(dict, lang) {
    const l = dict[lang];
    if (!l) return;

    // <html lang>
    if (l.html_lang) document.documentElement.lang = l.html_lang;
    // <title> 與 <meta description>
    if (l['meta.title']) document.title = l['meta.title'];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && l['meta.description']) {
      metaDesc.setAttribute('content', l['meta.description']);
    }

    // 所有 [data-i18n] 元素覆寫內容
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = l[key];
      if (val !== undefined && val !== null) {
        // 使用 innerHTML 以保留 <strong>、<sub> 等行內標籤
        // 由於字典為同源靜態 JSON，沒有 XSS 風險
        el.innerHTML = val;
      }
    });

    // 更新切換按鈕上的當前語系縮寫
    const current = document.getElementById('lang-current');
    if (current && dict._meta && dict._meta.labels && dict._meta.labels[lang]) {
      current.textContent = dict._meta.labels[lang];
    }

    // 更新 popover 內選項的選中狀態
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.setAttribute('aria-selected', opt.dataset.lang === lang ? 'true' : 'false');
    });

    // 寫回偏好
    try { localStorage.setItem(I18N_KEY, lang); } catch (_) {}
  }

  /** 動態建立 popover 內的語系選項 */
  function buildPopover(dict) {
    const popover = document.getElementById('lang-popover');
    if (!popover) return;
    const meta = dict._meta || {};
    const supported = meta.supported || Object.keys(dict).filter(k => !k.startsWith('_'));
    const labels = meta.labels || {};

    popover.innerHTML = supported.map(code => {
      const code_label = labels[code] || code.toUpperCase();
      const full_name  = LANG_NAMES[code] || '';
      return ''
        + '<li>'
        + '<button class="lang-option" type="button" data-lang="' + code + '" role="option" aria-selected="false" data-cursor>'
        +   '<span class="lang-code">' + code_label + '</span>'
        +   (full_name ? '<span class="lang-name">' + full_name + '</span>' : '')
        + '</button>'
        + '</li>';
    }).join('');
  }

  /** 連動切換按鈕 ↔ popover 的開關行為
      簡化版：只在 #lang 父層 toggle 一個 .is-open class，CSS 監聽該 class
      就能控制 popover 顯隱。不再使用 hidden 屬性與 requestAnimationFrame，
      避免時序競爭造成「點了沒反應」的狀況。 */
  function wireToggle(dict) {
    const toggle  = document.getElementById('lang-toggle');
    const popover = document.getElementById('lang-popover');
    const langWrap = document.getElementById('lang');
    if (!toggle || !popover || !langWrap) return;

    function setOpen(open) {
      langWrap.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    // 點按鈕：切換開關
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langWrap.classList.contains('is-open');
      setOpen(!isOpen);
    });

    // 點選項：套用語系後關閉
    popover.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-option');
      if (!btn) return;
      const code = btn.dataset.lang;
      if (code) {
        applyLang(dict, code);
        setOpen(false);
      }
    });

    // 點外部 → 關閉
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#lang')) setOpen(false);
    });

    // Escape → 關閉並把焦點還給按鈕
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && langWrap.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /** 載入 i18n.json 並啟動整套機制 */
  function initI18n() {
    fetch(I18N_URL, { cache: 'no-cache' })
      .then(res => {
        if (!res.ok) throw new Error('i18n fetch failed: ' + res.status);
        return res.json();
      })
      .then(dict => {
        const meta = dict._meta || {};
        const supported = meta.supported || ['zh', 'en'];
        const fallback  = meta.default_lang || 'zh';
        buildPopover(dict);
        wireToggle(dict);
        const lang = detectLang(supported, fallback);
        applyLang(dict, lang);
      })
      .catch(err => {
        // 載入失敗：直接隱藏切換器，頁面維持嵌入的中文內容
        const langEl = document.getElementById('lang');
        if (langEl) langEl.style.display = 'none';
        console.warn('[i18n] disabled:', err && err.message ? err.message : err);
      });
  }

  initI18n();

})();
