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

})();
