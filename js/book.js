/**
 * LUNAMARIS: Letters Across the Silent Seas
 * Book engine — biến trang web thành "quyển sách": mỗi lần hiện 1 trang (cảnh),
 * trang mới trượt vào từ bên phải; lùi thì chạy ngược chiều.
 *
 * - Thứ tự trang = thứ tự <section class="book-scene"> trong #book.
 * - Trang có [data-skip] (bị bộ lọc hành tinh ẩn) hoặc [data-story] chưa có nội dung bị bỏ qua.
 * - Điều khiển: nút ‹ ›, chấm tiến độ, mục lục, phím ←/→ (PageUp/PageDown ở mép trang),
 *   vuốt ngang trên màn cảm ứng, nút Back của trình duyệt (hash #cover, #toc, #ch1…).
 * - Chế độ đọc cuộn: bỏ .book-paged khỏi <body>, mọi trang xếp dọc như web cũ.
 * - Tôn trọng prefers-reduced-motion: đổi trang tức thì, không trượt.
 *
 * API: window.LunamarisBook = { goTo(id), next(), prev(), refresh(), current(), isPaged() }
 * Hợp đồng cho bộ phát truyện (chưa làm):
 *   window.LunamarisStory = { has(seq) -> bool, mount(seq, el, { onDone }) }
 */
(function () {
  "use strict";

  var STORE_SCENE = "lunamaris_last_scene";
  var STORE_MODE = "lunamaris_reading_mode";
  var STORE_SEEN = "lunamaris_seen_intro";
  var TURN_FALLBACK_MS = 900;
  // Link cũ từ giao diện "quyển sách" vẫn mở đúng cảnh mới
  var ALIASES = { cover: "start", toc: "signals", "hero-top": "start" };
  var SWIPE_MIN_PX = 60;

  var reduceMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var coarsePointer = window.matchMedia ? window.matchMedia("(pointer: coarse)") : { matches: false };

  var body = document.body;
  var book = null;
  var scenes = []; // mọi .book-scene trong DOM
  var order = []; // các trang đang được lật tới (không bị bỏ qua)
  var currentId = null;
  var paged = true;
  var finishTurn = null; // hàm kết thúc lượt lật đang chạy (nếu có)
  var mountedStories = {};
  var baseTitle = document.title;
  var scrollObserver = null;

  /* ---------------- tiện ích ---------------- */

  function store(key, val) {
    try {
      if (val == null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, val);
    } catch (e) {
      /* chế độ riêng tư / bị chặn lưu trữ: bỏ qua */
    }
  }

  function load(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  /** Chỉ ghi nhớ từ chương 1 trở đi (không tính truyện), để màn mở đầu còn gợi ý "Tiếp tục ở …". */
  function rememberScene(id) {
    var sc = sceneById(id);
    if (!sc || sc.hasAttribute("data-story") || id === "start" || id === "signals") return;
    store(STORE_SCENE, id);
  }

  /** Loại cảnh cho CSS: story (truyện) | game (chương & Artemis) | page. */
  function kindOf(scene) {
    if (!scene) return "page";
    if (scene.hasAttribute("data-story")) return "story";
    return scene.getAttribute("data-kind") || "page";
  }

  function markCurrent(scene) {
    body.setAttribute("data-scene-kind", kindOf(scene));
    body.setAttribute("data-scene-view", (scene && scene.getAttribute("data-view")) || "game");
  }

  function dict() {
    var all = window.UI_I18N || {};
    var lang = document.documentElement.lang === "en" ? "en" : "vi";
    return all[lang] || all.vi || {};
  }

  function fmt(str, map) {
    return String(str || "").replace(/\{(\w+)\}/g, function (_, k) {
      return map[k] != null ? map[k] : "";
    });
  }

  function idOf(scene) {
    return scene ? scene.getAttribute("data-scene") : null;
  }

  function sceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
      if (idOf(scenes[i]) === id) return scenes[i];
    }
    return null;
  }

  function indexOf(id) {
    for (var i = 0; i < order.length; i++) {
      if (idOf(order[i]) === id) return i;
    }
    return -1;
  }

  function scrollerOf(scene) {
    return scene ? scene.querySelector(".scene-scroll") || scene : null;
  }

  function storyReady(seq) {
    var S = window.LunamarisStory;
    try {
      return !!(S && typeof S.has === "function" && S.has(seq));
    } catch (e) {
      return false;
    }
  }

  function isSkipped(scene) {
    if (scene.hasAttribute("data-skip")) return true;
    var seq = scene.getAttribute("data-story");
    return seq ? !storyReady(seq) : false;
  }

  function computeOrder() {
    scenes = Array.prototype.slice.call(book.querySelectorAll(".book-scene"));
    order = scenes.filter(function (s) {
      var skip = isSkipped(s);
      s.classList.toggle("is-skipped", skip);
      if (s.hasAttribute("data-story")) s.classList.toggle("has-story", !skip);
      return !skip;
    });
  }

  /** Hash → id trang. Nhận cả id trang (#ch2) lẫn id phần tử bên trong (#artemis-station, #chapter-surveyor-3). */
  function resolve(hash) {
    var raw = (hash || "").replace(/^#/, "");
    if (!raw) return null;
    var id;
    try {
      id = decodeURIComponent(raw);
    } catch (e) {
      id = raw;
    }
    if (ALIASES[id]) id = ALIASES[id];
    if (sceneById(id)) return id;
    var el = document.getElementById(id);
    var scene = el && el.closest ? el.closest(".book-scene") : null;
    return scene ? idOf(scene) : null;
  }

  /** Nếu trang bị bỏ qua thì lấy trang hiển thị gần nhất phía sau (hoặc phía trước). */
  function visibleNear(id) {
    if (!id) return null;
    if (indexOf(id) !== -1) return id;
    var target = sceneById(id);
    var pos = scenes.indexOf(target);
    if (pos === -1) return null;
    for (var i = pos + 1; i < scenes.length; i++) if (order.indexOf(scenes[i]) !== -1) return idOf(scenes[i]);
    for (var j = pos - 1; j >= 0; j--) if (order.indexOf(scenes[j]) !== -1) return idOf(scenes[j]);
    return null;
  }

  function firstId() {
    return order.length ? idOf(order[0]) : null;
  }

  function sceneTitle(scene) {
    if (!scene) return { num: "", text: "" };
    return {
      num: scene.getAttribute("data-title-num") || "",
      text: scene.getAttribute("data-title") || ""
    };
  }

  function dialogOpen() {
    var ds = document.getElementById("dossier-sheet");
    if (ds && !ds.hidden) return true;
    var si = document.getElementById("si-disclosure-modal");
    if (si && !si.classList.contains("hidden")) return true;
    var nb = document.getElementById("notebook-qr-panel");
    if (nb && !nb.classList.contains("invisible")) return true;
    return false;
  }

  function isEditable(el) {
    if (!el || el === document.body) return false;
    if (el.isContentEditable) return true;
    var tag = el.tagName;
    if (tag === "TEXTAREA" || tag === "SELECT") return true;
    if (tag === "INPUT") return true; // gồm cả input[type=range]: phím mũi tên dành cho thanh trượt
    var role = el.getAttribute && el.getAttribute("role");
    return role === "slider" || role === "textbox" || role === "spinbutton";
  }

  /* ---------------- hiển thị trang ---------------- */

  function setHidden(scene, hidden) {
    if (hidden) {
      scene.setAttribute("aria-hidden", "true");
      scene.setAttribute("inert", "");
    } else {
      scene.removeAttribute("aria-hidden");
      scene.removeAttribute("inert");
    }
  }

  function focusHeading(scene, prevScene) {
    // Chỉ chuyển focus khi focus đang ở trang cũ (hoặc chưa ở đâu) — giữ nguyên nếu người dùng
    // đang bấm liên tục nút "Trang sau" trên thanh lật trang.
    var active = document.activeElement;
    var focusWasInPrev = prevScene && active && prevScene.contains(active);
    if (!focusWasInPrev && active && active !== document.body) return;
    var heading = scene.querySelector("[data-scene-heading]") || scene.querySelector("h1, h2");
    if (!heading) return;
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    try {
      heading.focus({ preventScroll: true });
    } catch (e) {
      heading.focus();
    }
  }

  function mountStory(scene) {
    // Mỗi lần vào cảnh truyện đều phát lại từ câu đầu
    var seq = scene.getAttribute("data-story");
    if (!seq || !storyReady(seq)) return;
    var S = window.LunamarisStory;
    if (typeof S.mount !== "function") return;
    mountedStories[seq] = true;
    S.mount(seq, scene.querySelector(".scene-page") || scene, { onDone: next });
  }

  function clearTurnClasses(scene) {
    scene.classList.remove("turn-in-fwd", "turn-in-back", "turn-out-fwd", "turn-out-back", "is-leaving");
  }

  /**
   * Hiện trang `id`. dir > 0: tiến (trang mới vào từ phải); dir < 0: lùi.
   * opts.instant: không chạy hiệu ứng. opts.target: phần tử cần cuộn tới (chế độ cuộn).
   */
  function show(id, dir, opts) {
    opts = opts || {};
    var nextScene = sceneById(id);
    if (!nextScene) return;
    if (finishTurn) finishTurn();

    var prevScene = currentId ? sceneById(currentId) : null;
    currentId = id;
    rememberScene(id);
    markCurrent(nextScene);

    if (!paged) {
      var target = opts.target || nextScene;
      if (!opts.noScroll) {
        target.scrollIntoView({ behavior: opts.instant || reduceMotion.matches ? "auto" : "smooth", block: "start" });
      }
      updateChrome();
      return;
    }

    scenes.forEach(function (s) {
      if (s !== nextScene && s !== prevScene) {
        clearTurnClasses(s);
        s.classList.remove("is-active");
        setHidden(s, true);
      }
    });

    setHidden(nextScene, false);
    nextScene.classList.add("is-active");
    var scroller = scrollerOf(nextScene);
    if (scroller) scroller.scrollTop = 0;
    if (opts.target && opts.target !== nextScene) {
      opts.target.scrollIntoView({ block: "start" });
    }
    // Lối tắt anchor của trình duyệt có thể cuộn #book (overflow:hidden) — luôn trả về 0.
    book.scrollTop = 0;
    book.scrollLeft = 0;

    var animate = prevScene && prevScene !== nextScene && !opts.instant && !reduceMotion.matches;
    if (animate) {
      var fwd = dir >= 0;
      setHidden(prevScene, true);
      prevScene.classList.add("is-leaving", fwd ? "turn-out-fwd" : "turn-out-back");
      nextScene.classList.add(fwd ? "turn-in-fwd" : "turn-in-back");

      var done = false;
      var timer = null;
      var onEnd = function (e) {
        if (e.target !== nextScene || e.pseudoElement) return;
        finish();
      };
      var finish = function () {
        if (done) return;
        done = true;
        finishTurn = null;
        clearTimeout(timer);
        nextScene.removeEventListener("animationend", onEnd);
        clearTurnClasses(nextScene);
        clearTurnClasses(prevScene);
        if (prevScene !== sceneById(currentId)) prevScene.classList.remove("is-active");
      };
      nextScene.addEventListener("animationend", onEnd);
      timer = setTimeout(finish, TURN_FALLBACK_MS);
      finishTurn = finish;
    } else if (prevScene && prevScene !== nextScene) {
      clearTurnClasses(prevScene);
      prevScene.classList.remove("is-active");
      setHidden(prevScene, true);
    }

    if (prevScene) focusHeading(nextScene, prevScene);
    mountStory(nextScene);
    updateChrome();
  }

  /* ---------------- điều hướng ---------------- */

  function goTo(id) {
    var resolved = resolve("#" + id) || id;
    var target = visibleNear(resolved);
    if (!target) return false;
    if (target === currentId) {
      if (!paged) show(target, 0);
      return true;
    }
    if (location.hash.replace(/^#/, "") !== target) {
      location.hash = target; // hashchange → show()
    } else {
      show(target, indexOf(target) - indexOf(currentId));
    }
    return true;
  }

  /** Cảnh game chưa xong: không cho "Tiếp"/vuốt qua; nhắc người chơi bấm Bỏ qua. */
  function gated() {
    var cur = sceneById(currentId);
    return !!(cur && cur.getAttribute("data-gate") === "locked");
  }

  function nudgeGate() {
    var cur = sceneById(currentId);
    var status = document.getElementById("pager-status");
    if (status) status.textContent = dict().gate_locked || "";
    if (!cur) return;
    cur.classList.remove("gate-nudge");
    void cur.offsetWidth;
    cur.classList.add("gate-nudge");
    var note = document.getElementById("gate-toast");
    if (note) {
      note.textContent = dict().gate_locked || "";
      note.hidden = false;
      clearTimeout(nudgeGate.timer);
      nudgeGate.timer = setTimeout(function () {
        note.hidden = true;
      }, 2600);
    }
  }

  function next() {
    if (finishTurn) return; // đang lật: bỏ qua thao tác dồn dập
    if (gated()) {
      nudgeGate();
      return;
    }
    var i = indexOf(currentId);
    if (i !== -1 && i < order.length - 1) goTo(idOf(order[i + 1]));
  }

  function prev() {
    if (finishTurn) return;
    var i = indexOf(currentId);
    if (i > 0) goTo(idOf(order[i - 1]));
  }

  function onHashChange() {
    var raw = location.hash.replace(/^#/, "");
    var resolved = resolve(location.hash);
    var id = visibleNear(resolved) || firstId();
    if (!id) return;
    var targetEl = null;
    if (raw && raw !== id && resolved) {
      targetEl = document.getElementById(raw);
      // Chuẩn hoá alias cũ (#artemis-station → #artemis) mà không thêm mục lịch sử
      try {
        history.replaceState(null, "", "#" + id);
      } catch (e) { /* file:// trên vài trình duyệt */ }
    }
    var dir = indexOf(id) - indexOf(currentId);
    show(id, dir, { target: targetEl && targetEl.closest(".book-scene") !== targetEl ? targetEl : null });
  }

  /* ---------------- thanh dưới: đường tín hiệu + nút Quay lại / Tiếp ---------------- */

  var GROUP_COLORS = {
    earth: "#5B6CD9",
    moon: "#38BDF8",
    mars: "#F97316",
    artemis: "#10B981",
    appendix: "#94A3B8"
  };

  function groupOf(scene) {
    return (scene && scene.getAttribute("data-group")) || "appendix";
  }

  function groupName(group) {
    var t = dict();
    return t["group_" + group] || "";
  }

  function fullTitle(scene) {
    var title = sceneTitle(scene);
    return (title.num ? title.num + ": " : "") + title.text;
  }

  /** Đường tín hiệu: mỗi cảnh một nút tròn, nhóm theo nơi gửi (Hà Nội → Mặt Trăng → Sao Hỏa → Artemis → Phụ lục). */
  function buildSignalPath() {
    var list = document.getElementById("signal-path");
    if (!list) return;
    list.innerHTML = "";
    var prevGroup = null;
    order.forEach(function (scene, i) {
      var group = groupOf(scene);
      var li = document.createElement("li");
      li.className = "sp-item" + (group !== prevGroup ? " is-group-start" : "");
      li.style.setProperty("--gc", GROUP_COLORS[group] || GROUP_COLORS.appendix);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sp-node";
      btn.setAttribute("data-goto", idOf(scene));
      var label = (i + 1) + ". " + fullTitle(scene);
      btn.setAttribute("aria-label", label);
      btn.title = label;
      li.appendChild(btn);
      list.appendChild(li);
      prevGroup = group;
    });
  }

  function updateChrome() {
    var t = dict();
    var idx = indexOf(currentId);
    var total = order.length;
    var scene = sceneById(currentId);
    var title = sceneTitle(scene);

    document.title = title.text ? title.text + " | LUNAMARIS" : baseTitle;

    // Trình đọc màn hình: "Cảnh 4 / 10: Chương 2: …"
    var status = document.getElementById("pager-status");
    if (status && idx !== -1) {
      status.textContent =
        fmt(t.scene_of || "{n} / {total}", { n: idx + 1, total: total }) + ": " + fullTitle(scene);
    }

    // Nhãn nhìn thấy trên điện thoại: tên nhóm + vị trí trong nhóm ("Mặt Trăng 2/2")
    var groupEl = document.getElementById("pager-group");
    if (groupEl && scene) {
      var g = groupOf(scene);
      var inGroup = order.filter(function (s) {
        return groupOf(s) === g;
      });
      var pos = inGroup.indexOf(scene) + 1;
      groupEl.textContent = groupName(g) + (inGroup.length > 1 ? " " + pos + "/" + inGroup.length : "");
    }

    var prevBtn = document.getElementById("pager-prev");
    var nextBtn = document.getElementById("pager-next");
    var nextScene = idx !== -1 && idx < total - 1 ? order[idx + 1] : null;
    if (prevBtn) {
      prevBtn.disabled = idx <= 0;
      var prevScene = idx > 0 ? order[idx - 1] : null;
      prevBtn.setAttribute(
        "aria-label",
        (t.pager_back || "Back") + (prevScene ? ": " + fullTitle(prevScene) : "")
      );
    }
    if (nextBtn) {
      nextBtn.disabled = !nextScene;
      nextBtn.classList.toggle("is-gated", gated());
      var nextText = nextScene ? fmt(t.pager_next_to || "Next: {name}", { name: sceneTitle(nextScene).text }) : t.pager_next || "Next";
      nextBtn.setAttribute(
        "aria-label",
        nextScene ? fmt(t.pager_next_to || "Next: {name}", { name: fullTitle(nextScene) }) : t.pager_next || "Next"
      );
      setText("pager-next-label", nextText);
    }
    setText("pager-prev-label", t.pager_back);

    var mode = document.getElementById("pager-mode");
    if (mode) {
      var modeLabel = paged ? t.reading_mode_on : t.reading_mode_off;
      mode.title = modeLabel || "";
      mode.setAttribute("aria-pressed", paged ? "false" : "true");
      setText("pager-mode-label", modeLabel);
    }
    var pager = document.getElementById("book-pager");
    if (pager && t.pager_nav_label) pager.setAttribute("aria-label", t.pager_nav_label);

    var nodes = document.querySelectorAll("#signal-path .sp-node");
    Array.prototype.forEach.call(nodes, function (d) {
      var i = indexOf(d.getAttribute("data-goto"));
      d.classList.toggle("is-passed", i !== -1 && i < idx);
      if (i === idx) d.setAttribute("aria-current", "step");
      else d.removeAttribute("aria-current");
    });

    // Link "Tiếp tục ở …" ở màn mở đầu (chỉ khi lần trước đã vào tới một chương trở đi)
    var cont = document.getElementById("book-continue-btn");
    if (cont) {
      var last = load(STORE_SCENE);
      var li = indexOf(last);
      var offerContinue = !!last && li !== -1 && last !== currentId;
      cont.hidden = !offerContinue;
      if (offerContinue) {
        cont.href = "#" + last;
        cont.textContent = fmt(t.continue_at || "{name}", { name: fullTitle(order[li]) });
      }
    }
  }

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el && val) el.textContent = val;
  }

  /* ---------------- chế độ đọc ---------------- */

  function applyMode() {
    body.classList.toggle("book-paged", paged);
    if (scrollObserver) {
      scrollObserver.disconnect();
      scrollObserver = null;
    }
    if (paged) {
      var id = currentId;
      currentId = null;
      scenes.forEach(function (s) {
        clearTurnClasses(s);
        s.classList.remove("is-active");
        setHidden(s, true);
      });
      if (id) show(id, 0, { instant: true });
    } else {
      scenes.forEach(function (s) {
        clearTurnClasses(s);
        s.classList.remove("is-active");
        setHidden(s, false);
      });
      watchScroll();
      if (currentId) show(currentId, 0, { instant: true });
    }
  }

  /** Chế độ cuộn: cập nhật tiêu đề chạy theo trang đang nằm giữa màn hình. */
  function watchScroll() {
    if (!("IntersectionObserver" in window)) return;
    scrollObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var id = idOf(en.target);
          if (id && id !== currentId) {
            currentId = id;
            rememberScene(id);
            markCurrent(en.target);
            updateChrome();
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    order.forEach(function (s) {
      scrollObserver.observe(s);
    });
  }

  function toggleMode() {
    if (finishTurn) finishTurn();
    paged = !paged;
    store(STORE_MODE, paged ? "paged" : "scroll");
    applyMode();
  }

  /* ---------------- refresh (khi app.js render lại / đổi bộ lọc) ---------------- */

  function refresh() {
    computeOrder();
    buildSignalPath();
    if (!paged) watchScroll();
    if (currentId && indexOf(currentId) === -1) {
      var fallback = visibleNear(currentId) || firstId();
      if (fallback) {
        try {
          history.replaceState(null, "", "#" + fallback);
        } catch (e) { /* bỏ qua */ }
        show(fallback, 0, { instant: true, noScroll: !paged });
        return;
      }
    }
    updateChrome();
  }

  /* ---------------- cử chỉ & phím ---------------- */

  function hasHorizontalScroll(el) {
    while (el && el !== book) {
      if (el.scrollWidth > el.clientWidth + 1) {
        var ox = window.getComputedStyle(el).overflowX;
        if (ox === "auto" || ox === "scroll") return true;
      }
      el = el.parentElement;
    }
    return false;
  }

  function noSwipe(target) {
    if (!target || !target.closest) return true;
    if (target.closest("input, textarea, select, [contenteditable='true'], [data-no-swipe]")) return true;
    return hasHorizontalScroll(target);
  }

  function bindGestures() {
    var sx = 0;
    var sy = 0;
    var st = 0;
    var tracking = false;

    book.addEventListener(
      "pointerdown",
      function (e) {
        tracking = false;
        if (!paged || e.pointerType === "mouse" || !e.isPrimary || finishTurn) return;
        if (noSwipe(e.target)) return;
        tracking = true;
        sx = e.clientX;
        sy = e.clientY;
        st = Date.now();
      },
      { passive: true }
    );

    book.addEventListener(
      "pointerup",
      function (e) {
        if (!tracking) return;
        tracking = false;
        var dx = e.clientX - sx;
        var dy = e.clientY - sy;
        if (Math.abs(dx) > SWIPE_MIN_PX && Math.abs(dx) > 1.5 * Math.abs(dy) && Date.now() - st < 900) {
          if (dx < 0) next();
          else prev();
        }
      },
      { passive: true }
    );

    book.addEventListener("pointercancel", function () {
      tracking = false;
    });
  }

  function atEdge(scroller, bottom) {
    if (!scroller) return true;
    if (bottom) return scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
    return scroller.scrollTop <= 1;
  }

  function bindKeys() {
    document.addEventListener("keydown", function (e) {
      if (!paged || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (dialogOpen() || isEditable(e.target)) return;
      var scroller = scrollerOf(sceneById(currentId));
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prev();
          break;
        case "PageDown":
          // Trang dài: PageDown cuộn trong trang trước, tới cuối trang mới lật.
          if (atEdge(scroller, true)) {
            e.preventDefault();
            next();
          }
          break;
        case "PageUp":
          if (atEdge(scroller, false)) {
            e.preventDefault();
            prev();
          }
          break;
        default:
          break;
      }
    });
  }

  function bindClicks() {
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var dot = e.target.closest && e.target.closest("[data-goto]");
      if (dot) {
        e.preventDefault();
        goTo(dot.getAttribute("data-goto"));
        return;
      }
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.target === "_blank") return;
      var hash = a.getAttribute("href");
      var id = resolve(hash);
      if (!id) return;
      e.preventDefault();
      var raw = hash.replace(/^#/, "");
      if (raw !== id && visibleNear(id) === id) {
        // alias trỏ vào phần tử bên trong một trang (vd. #chapter-opportunity-rover):
        // cùng trang thì chỉ cuộn tới phần tử; khác trang thì để onHashChange lật + cuộn.
        var targetEl = document.getElementById(raw);
        if (id === currentId) {
          if (targetEl) targetEl.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
        } else {
          location.hash = raw;
        }
        return;
      }
      goTo(id);
    });

    var prevBtn = document.getElementById("pager-prev");
    var nextBtn = document.getElementById("pager-next");
    var modeBtn = document.getElementById("pager-mode");
    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (modeBtn) modeBtn.addEventListener("click", toggleMode);
  }

  /** Bàn phím ảo trên điện thoại: đưa ô nhập đang focus ra giữa vùng nhìn thấy. */
  function bindVirtualKeyboard() {
    book.addEventListener("focusin", function (e) {
      var el = e.target;
      if (!coarsePointer.matches || !el.matches || !el.matches("input[type='text'], textarea")) return;
      setTimeout(function () {
        el.scrollIntoView({ block: "center", behavior: "auto" });
      }, 320);
    });
  }

  /* ---------------- khởi động ---------------- */

  function init() {
    book = document.getElementById("book");
    if (!book) return;

    paged = load(STORE_MODE) !== "scroll";
    body.classList.add("book-ready");

    computeOrder();
    buildSignalPath();

    // Lần đầu vào trang (chưa xem mở đầu, không có link vào thẳng): phát truyện mở đầu.
    // Các lần sau: vào màn bắt đầu.
    var initial = visibleNear(resolve(location.hash));
    var seenIntro = !!load(STORE_SEEN);
    var start = initial || (seenIntro ? visibleNear("start") : firstId()) || firstId();

    body.classList.toggle("book-paged", paged);
    if (paged) {
      scenes.forEach(function (s) {
        setHidden(s, true);
      });
      show(start, 0, { instant: true });
    } else {
      watchScroll();
      currentId = start;
      if (initial) show(start, 0, { instant: true });
      else updateChrome();
    }
    if (initial && location.hash.replace(/^#/, "") !== initial) {
      try {
        history.replaceState(null, "", "#" + initial);
      } catch (e) { /* bỏ qua */ }
    }

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("lunamaris:render", refresh);
    bindClicks();
    bindKeys();
    bindGestures();
    bindVirtualKeyboard();
  }

  window.LunamarisBook = {
    goTo: function (id) {
      return book ? goTo(id) : false;
    },
    next: function () {
      if (book) next();
    },
    prev: function () {
      if (book) prev();
    },
    refresh: function () {
      if (book) refresh();
    },
    current: function () {
      return currentId;
    },
    isPaged: function () {
      return !!book && paged;
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
