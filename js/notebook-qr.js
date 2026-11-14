/* =============================================================================
   [NOTEBOOK-QR 2026-11-14] NÚT "?" NỔI + BẢNG MÃ QR NOTEBOOKLM
   ----------------------------------------------------------------------------
   - Nút tròn "?" góc phải dưới (index.html: #notebook-qr-btn).
   - Bấm vào → bảng #notebook-qr-panel trượt ra:
       • Máy tính (≥768px): chiếm 1/3 màn hình, dính mép phải.
       • Điện thoại (<768px): mở full màn hình, khoá cuộn nền.
   - Trong bảng: mã QR (assets/qr-notebooklm.png), liên kết bấm được,
     nút sao chép liên kết, 3 bước hướng dẫn quét, nút tắt (✕ / phím ESC).
   - Song ngữ EN|VI: chữ nạp từ window.UI_I18N (js/data.js, khoá nb_*),
     cùng nguồn với app.js nên đổi ngôn ngữ là bảng đổi theo.

   HIỆU NĂNG: chỉ animate `transform` + `visibility` (compositor-friendly,
   không sinh reflow/repaint layout); không thư viện ngoài; mọi listener
   đăng ký đúng một lần lúc nạp script.
   ============================================================================= */
(function () {
  "use strict";

  /* PHẢI khớp URL dùng sinh mã QR trong tools/make_notebook_qr.py.
     Đã bỏ tham số fbclid=... (tham số theo dõi của Facebook, không đổi đích đến)
     để mã QR ít ô hơn → quét nhanh và chắc hơn. */
  var NOTEBOOK_URL =
    "https://notebook.google.com/notebook/eb772db5-b353-4fd7-aeea-b67ca4b120c4";

  var btn = document.getElementById("notebook-qr-btn");
  var panel = document.getElementById("notebook-qr-panel");
  var closeBtn = document.getElementById("notebook-qr-close");
  var copyBtn = document.getElementById("notebook-qr-copy");
  var linkEl = document.getElementById("notebook-qr-link");
  if (!btn || !panel) return;

  var mqMobile = window.matchMedia
    ? window.matchMedia("(max-width: 767px)")
    : null;

  var isOpen = false;
  var lastFocus = null;
  var copyTimer = 0;

  /* ---------------------------------------------------------------------------
     MỞ / ĐÓNG BẢNG
     --------------------------------------------------------------------------- */
  function setOpen(open) {
    if (isOpen === open) return;
    isOpen = open;
    panel.classList.toggle("translate-x-full", !open);
    panel.classList.toggle("invisible", !open);
    btn.setAttribute("aria-expanded", String(open));

    if (open) {
      lastFocus = document.activeElement;
      syncBodyLock();
      window.requestAnimationFrame(function () {
        if (!closeBtn) return;
        /* Đầu transition, computed visibility vẫn là hidden (điểm đầu của
           transition) nên focus() sẽ bị trình duyệt bỏ qua. Ép visibility
           visible trong một nhịp rồi trả lại để focus ăn chắc. */
        panel.style.visibility = "visible";
        closeBtn.focus({ preventScroll: true });
        panel.style.visibility = "";
      });
    } else {
      document.body.classList.remove("nb-no-scroll");
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus({ preventScroll: true });
      }
      lastFocus = null;
    }
  }

  /* Chỉ khoá cuộn nền khi bảng full màn (điện thoại); máy tính vẫn cuộn trang được */
  function syncBodyLock() {
    var lock = isOpen && (!mqMobile || mqMobile.matches);
    document.body.classList.toggle("nb-no-scroll", lock);
  }

  if (mqMobile) {
    var onMq = function () {
      syncBodyLock();
    };
    if (mqMobile.addEventListener) mqMobile.addEventListener("change", onMq);
    else if (mqMobile.addListener) mqMobile.addListener(onMq);
  }

  btn.addEventListener("click", function () {
    setOpen(!isOpen);
  });
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      setOpen(false);
    });
  }

  /* Phím ESC đóng bảng (listener riêng, không đụng modal SI của app.js) */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) setOpen(false);
  });

  /* Bẫy focus tối giản: Tab / Shift+Tab quẩn quanh trong bảng khi đang mở */
  panel.addEventListener("keydown", function (e) {
    if (e.key !== "Tab" || !isOpen) return;
    var nodes = panel.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!nodes.length) return;
    var first = nodes[0];
    var last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* ---------------------------------------------------------------------------
     SAO CHÉP LIÊN KẾT
     Ưu tiên Clipboard API; fallback execCommand cho bối cảnh không bảo mật
     (mở bằng file:// hoặc http thường lúc thuyết trình ở lớp).
     --------------------------------------------------------------------------- */
  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  function flash(label) {
    if (!copyBtn) return;
    copyBtn.textContent = label;
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(function () {
      copyTimer = 0;
      if (copyBtn) copyBtn.textContent = strings().nb_copy || "Copy link";
    }, 1600);
  }

  function flashCopied() {
    flash(strings().nb_copied || "Copied ✓");
  }

  function flashFailed() {
    flash(strings().nb_copy_fail || "Copy failed — select the link and press Ctrl+C.");
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        /* Vài trình duyệt hứa rồi "treo im lặng"; sau 1,2s không thấy kết quả
           thì rơi xuống cách sao chép cũ để người dùng luôn nhận phản hồi. */
        var settled = false;
        var onOk = function () {
          if (!settled) {
            settled = true;
            flashCopied();
          }
        };
        var onBad = function () {
          if (settled) return;
          settled = true;
          if (legacyCopy(NOTEBOOK_URL)) flashCopied();
          else flashFailed();
        };
        navigator.clipboard.writeText(NOTEBOOK_URL).then(onOk, onBad);
        window.setTimeout(onBad, 1200);
      } else if (legacyCopy(NOTEBOOK_URL)) {
        flashCopied();
      } else {
        flashFailed();
      }
    });
  }

  /* ---------------------------------------------------------------------------
     SONG NGỮ THEO UI_I18N (js/data.js)
     Ngôn ngữ hiện tại: suy ra từ nút EN|VI đang sáng trên header (app.js tô lớp
     bg-[#7fd4ff] cho nút đang bật); sau đó bắt click trên hai nút đó để đổi theo.
     --------------------------------------------------------------------------- */
  var lang = "";

  function currentLang() {
    if (lang) return lang;
    var enBtn = document.getElementById("lang-btn-en");
    lang = enBtn && enBtn.className.indexOf("bg-[#7fd4ff]") !== -1 ? "en" : "vi";
    return lang;
  }

  function strings() {
    var dict = window.UI_I18N || {};
    return dict[currentLang()] || dict.vi || {};
  }

  function applyI18n() {
    var s = strings();
    if (!s || !s.nb_title) return; // data.js thiếu khoá → giữ chữ mặc định trong HTML
    var set = function (id, value) {
      var el = document.getElementById(id);
      if (el && value) el.textContent = value;
    };
    btn.title = s.nb_btn_title;
    btn.setAttribute("aria-label", s.nb_btn_title);
    set("notebook-qr-eyebrow", s.nb_eyebrow);
    set("notebook-qr-title", s.nb_title);
    var img = document.getElementById("notebook-qr-img");
    if (img && s.nb_qr_alt) img.alt = s.nb_qr_alt;
    set("notebook-qr-scanhint", s.nb_scan_hint);
    set("notebook-qr-linklabel", s.nb_link_label);
    if (copyBtn && !copyTimer) copyBtn.textContent = s.nb_copy;
    set("notebook-qr-steps-title", s.nb_steps_title);
    set("notebook-qr-step-1", s.nb_step1);
    set("notebook-qr-step-2", s.nb_step2);
    set("notebook-qr-step-3", s.nb_step3);
    set("notebook-qr-note", s.nb_note);
    if (closeBtn && s.nb_close) closeBtn.setAttribute("aria-label", s.nb_close);
  }

  ["lang-btn-en", "lang-btn-vi"].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", function () {
      lang = id === "lang-btn-en" ? "en" : "vi";
      applyI18n();
    });
  });

  /* Liên kết chữ luôn khớp hằng số sinh mã QR (phòng ai sửa một chỗ quên chỗ kia) */
  if (linkEl) {
    linkEl.href = NOTEBOOK_URL;
    linkEl.textContent = NOTEBOOK_URL;
  }

  applyI18n();
})();
