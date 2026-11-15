/**
 * LUNAMARIS — bộ phát truyện chạm-để-sang (2026-11-15)
 * Hợp đồng với js/book.js: window.LunamarisStory = { has(seq), mount(seq, sceneEl, { onDone }) }
 *  - Chữ là HTML phủ trên nền cảnh (đổi data-world của cảnh → đổi chân trời/bầu trời).
 *  - Chạm/bấm nửa phải (hoặc giữa) = tiếp, 30% bên trái = lùi; → / Space tiếp, ← lùi, Esc bỏ qua.
 *  - Chữ hiện dần; lần chạm đầu hiện hết câu. prefers-reduced-motion: hiện ngay.
 *  - Ảnh tùy chọn (`img`); lỗi/thiếu ảnh thì giữ nền CSS.
 */
(function () {
  "use strict";

  var SEEN_KEY = "lunamaris_seen_intro";
  var CHAR_MS = 22;
  var reduceMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

  var players = {}; // seq → player đang gắn

  function flow() {
    return window.LUNAMARIS_FLOW || { story: {} };
  }

  function lang() {
    return document.documentElement.lang === "en" ? "en" : "vi";
  }

  function t() {
    var all = window.UI_I18N || {};
    return all[lang()] || {};
  }

  function store(key, val) {
    try {
      window.localStorage.setItem(key, val);
    } catch (e) { /* chế độ riêng tư */ }
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function has(seq) {
    var list = flow().story[seq];
    return !!(list && list.length);
  }

  function Player(seq, scene, opts) {
    this.seq = seq;
    this.scene = scene;
    this.opts = opts || {};
    this.slides = flow().story[seq];
    this.i = 0;
    this.typing = null;
    this.full = "";
    this.shown = 0;
    this.busyUntil = 0;
    this.build();
    this.render(true);
  }

  Player.prototype.build = function () {
    var self = this;
    var scene = this.scene;
    var tt = t();
    scene.innerHTML =
      '<div class="scene-horizon" aria-hidden="true"></div>' +
      '<div class="story" data-no-swipe>' +
      '  <div class="story-sky" aria-hidden="true"></div>' +
      '  <img class="story-img" alt="" hidden />' +
      '  <ol class="story-dots" aria-hidden="true"></ol>' +
      '  <button type="button" class="story-skip btn-ghost" data-story-skip>' + esc(tt.skip_story) + "</button>" +
      '  <div class="story-stage" data-story-stage>' +
      '    <div class="story-text">' +
      '      <h2 class="story-speaker" data-scene-heading tabindex="-1"></h2>' +
      '      <p class="story-line" aria-live="polite"></p>' +
      '      <p class="story-hint" aria-hidden="true"></p>' +
      "    </div>" +
      "  </div>" +
      "</div>";

    this.root = scene.querySelector(".story");
    this.img = scene.querySelector(".story-img");
    this.dots = scene.querySelector(".story-dots");
    this.speaker = scene.querySelector(".story-speaker");
    this.line = scene.querySelector(".story-line");
    this.hint = scene.querySelector(".story-hint");
    this.skipBtn = scene.querySelector("[data-story-skip]");

    this.dots.innerHTML = this.slides
      .map(function () {
        return '<li class="story-dot"></li>';
      })
      .join("");

    this.img.addEventListener("error", function () {
      self.img.hidden = true;
    });

    this.skipBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      self.finish();
    });

    var stage = scene.querySelector("[data-story-stage]");
    stage.addEventListener("click", function (e) {
      if (e.target.closest("a, button")) return;
      var rect = stage.getBoundingClientRect();
      var x = e.clientX - rect.left;
      // Bấm bàn phím (Enter trên vùng có focus) cho clientX = 0: coi như "tiếp"
      if (e.detail !== 0 && x < rect.width * 0.3) self.back();
      else self.advance();
    });

    this.onKey = function (e) {
      if (!self.isCurrent() || e.altKey || e.ctrlKey || e.metaKey) return;
      var tag = e.target && e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (dialogOpen()) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        // nút đang có focus (vd. Bỏ qua) tự xử lý Enter/Space của nó
        if (e.key !== "ArrowRight" && e.target.closest && e.target.closest("button, a")) return;
        e.preventDefault();
        e.stopPropagation();
        self.advance();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        self.back();
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        self.finish();
      }
    };
    // capture: chạy trước bộ phím của book.js (→ ở đây là "câu tiếp", không phải "cảnh tiếp")
    document.addEventListener("keydown", this.onKey, true);

    this.onRender = function () {
      self.render(true, true);
      self.skipBtn.textContent = t().skip_story || "Skip";
    };
    document.addEventListener("lunamaris:render", this.onRender);
  };

  function dialogOpen() {
    var sheet = document.getElementById("dossier-sheet");
    if (sheet && !sheet.hidden) return true;
    var si = document.getElementById("si-disclosure-modal");
    if (si && !si.classList.contains("hidden")) return true;
    var nb = document.getElementById("notebook-qr-panel");
    return !!(nb && !nb.classList.contains("invisible"));
  }

  Player.prototype.isCurrent = function () {
    var B = window.LunamarisBook;
    if (!B || !B.isPaged()) return false;
    return B.current() === this.scene.getAttribute("data-scene");
  };

  Player.prototype.destroy = function () {
    document.removeEventListener("keydown", this.onKey, true);
    document.removeEventListener("lunamaris:render", this.onRender);
    this.stopTyping();
  };

  Player.prototype.stopTyping = function () {
    if (this.typing) {
      clearInterval(this.typing);
      this.typing = null;
    }
  };

  /** fresh: đổi câu (gõ lại từ đầu); instant: hiện ngay toàn bộ câu. */
  Player.prototype.render = function (fresh, instant) {
    var s = this.slides[this.i];
    if (!s) return;
    var tt = t();
    var L = lang();
    this.scene.setAttribute("data-world", s.world || "earth");

    if (s.img) {
      if (this.img.getAttribute("src") !== s.img) this.img.setAttribute("src", s.img);
      this.img.hidden = false;
    } else {
      this.img.hidden = true;
      this.img.removeAttribute("src");
    }

    var spk = typeof s.speaker === "object" && s.speaker ? (L === "en" ? s.speaker.en : s.speaker.vi) : s.speaker;
    this.speaker.textContent = spk || (tt.story_titles && tt.story_titles[this.seq]) || tt.story_label || "";
    this.speaker.classList.toggle("is-narration", !s.speaker);
    this.root.classList.toggle("is-narration", !s.speaker);
    this.hint.textContent = tt.story_tap || "";

    var dots = this.dots.children;
    for (var d = 0; d < dots.length; d++) {
      dots[d].classList.toggle("is-on", d <= this.i);
    }

    this.full = (L === "en" ? s.text_en : s.text_vi) || "";
    this.stopTyping();
    if (!fresh) return;

    if (instant || reduceMotion.matches) {
      this.shown = this.full.length;
      this.line.textContent = this.full;
      this.root.classList.add("is-complete");
      return;
    }

    // chuyển câu: mờ dần rồi gõ chữ
    this.root.classList.remove("is-complete");
    this.root.classList.remove("is-fresh");
    void this.root.offsetWidth;
    this.root.classList.add("is-fresh");
    this.busyUntil = Date.now() + 180;
    this.shown = 0;
    this.line.textContent = "";
    var self = this;
    this.typing = setInterval(function () {
      self.shown += 2;
      if (self.shown >= self.full.length) {
        self.shown = self.full.length;
        self.stopTyping();
        self.root.classList.add("is-complete");
      }
      self.line.textContent = self.full.slice(0, self.shown);
    }, CHAR_MS * 2);
  };

  Player.prototype.advance = function () {
    if (Date.now() < this.busyUntil) return;
    if (this.shown < this.full.length) {
      this.stopTyping();
      this.shown = this.full.length;
      this.line.textContent = this.full;
      this.root.classList.add("is-complete");
      return;
    }
    if (this.i < this.slides.length - 1) {
      this.i += 1;
      this.render(true);
    } else {
      this.finish();
    }
  };

  Player.prototype.back = function () {
    if (Date.now() < this.busyUntil) return;
    if (this.i > 0) {
      this.i -= 1;
      this.render(true, true);
    }
  };

  Player.prototype.finish = function () {
    if (this.done) return;
    this.done = true;
    this.stopTyping();
    if (this.seq === "intro") store(SEEN_KEY, "1");
    if (typeof this.opts.onDone === "function") this.opts.onDone();
  };

  window.LunamarisStory = {
    has: has,
    /** Gắn (lại) bộ phát vào cảnh; mỗi lần vào cảnh đều phát lại từ câu đầu. */
    mount: function (seq, scene, opts) {
      if (!has(seq) || !scene) return;
      if (players[seq]) players[seq].destroy();
      players[seq] = new Player(seq, scene, opts);
    }
  };
})();
