/**
 * LUNAMARIS — 5 trò chơi (2026-11-15)
 * window.LunamarisGames = {
 *   mount(art, el, ctx)        // Game 1–4 vào phần tử el; ctx = { lang, t, onOpenLetter }
 *   mountArtemis(el, ctx)      // Game 5; ctx = { lang, t, cards:[{id,n,color,rule,earned}], landed, onComplete }
 *   pause()                    // dừng thao tác đang dở (mở popup Hồ sơ Khoa học)
 * }
 * Pointer Events cho cả chạm lẫn chuột; Space giữ laser; phím mũi tên cho thanh trượt.
 * Game 2–4 vẽ bằng RelicSVGEngine sẵn có (js/svg-engine.js).
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var session = {}; // artId → { value, won } (giữ qua lần render lại khi đổi ngôn ngữ)
  var pauseFns = [];

  function flowGame(id) {
    var F = window.LUNAMARIS_FLOW || { games: {} };
    return F.games[id];
  }

  function L(obj, key, lang) {
    return obj[key + "_" + lang] || obj[key + "_vi"] || "";
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function numFmt(n, lang, digits) {
    var locale = lang === "en" ? "en-US" : "vi-VN";
    return Number(n).toLocaleString(locale, { minimumFractionDigits: digits || 0, maximumFractionDigits: digits || 0 });
  }

  function winBlock(t) {
    return '<div class="game-win" hidden><button type="button" class="btn-signal" data-open-letter>' +
      esc(t.game_open_letter) + "</button></div>";
  }

  function showWin(el, g, ctx) {
    var fb = el.querySelector(".game-feedback");
    if (fb) {
      fb.textContent = L(g, "win", ctx.lang);
      fb.classList.add("is-win");
    }
    var w = el.querySelector(".game-win");
    if (w) {
      w.hidden = false;
      var b = w.querySelector("[data-open-letter]");
      b.addEventListener("click", function () {
        if (typeof ctx.onOpenLetter === "function") ctx.onOpenLetter();
      });
      return b;
    }
    return null;
  }

  /* =========================================================================
   * GAME 1 — LRRR: nhấn giữ laser 2,56 s
   * ========================================================================= */
  var EARTH = { x: 78, y: 62 };
  var MIRROR = { x: 352, y: 196 };

  function laserSvg(t) {
    return (
      '<svg viewBox="0 0 480 260" class="game-svg" role="img" aria-label="' + esc(t.laser_hold) + '">' +
      '<circle cx="' + EARTH.x + '" cy="' + EARTH.y + '" r="30" fill="#173a78" stroke="#38BDF8" stroke-width="1.5"/>' +
      '<path d="M58 52 q10 -8 22 -2 q8 4 4 12 q-6 8 -16 4z M84 70 q8 -2 10 6 q-2 8 -10 6z" fill="#2f7a4f" opacity="0.85"/>' +
      '<text x="' + EARTH.x + '" y="' + (EARTH.y + 50) + '" text-anchor="middle" class="game-svg-label">' + (document.documentElement.lang === "en" ? "Earth" : "Trái Đất") + "</text>" +
      '<path d="M0 214 Q 240 196 480 212 L480 260 L0 260 Z" fill="#2a3242" stroke="rgba(148,163,184,0.35)"/>' +
      '<circle cx="120" cy="236" r="10" fill="#222938"/><circle cx="410" cy="240" r="7" fill="#222938"/>' +
      '<g class="lrrr-mirror" transform="translate(' + MIRROR.x + " " + MIRROR.y + ') rotate(-14)">' +
      '<rect x="-24" y="-10" width="48" height="20" rx="2" fill="#94A3B8" stroke="#E2E8F0" stroke-width="1"/>' +
      '<path d="M-16 -10v20M-8 -10v20M0 -10v20M8 -10v20M16 -10v20M-24 0h48" stroke="#475569" stroke-width="0.8"/>' +
      '<line x1="-18" y1="10" x2="-22" y2="22" stroke="#94A3B8" stroke-width="2"/><line x1="18" y1="10" x2="22" y2="22" stroke="#94A3B8" stroke-width="2"/>' +
      "</g>" +
      '<text x="' + MIRROR.x + '" y="' + (MIRROR.y + 44) + '" text-anchor="middle" class="game-svg-label">LRRR</text>' +
      '<line class="lrrr-beam" x1="' + (EARTH.x + 18) + '" y1="' + (EARTH.y + 22) + '" x2="' + MIRROR.x + '" y2="' + (MIRROR.y - 8) + '" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>' +
      '<circle class="lrrr-photon" r="5" cx="' + MIRROR.x + '" cy="' + MIRROR.y + '" opacity="0"/>' +
      '<text class="lrrr-clock num" x="464" y="34" text-anchor="end">0,00 s</text>' +
      "</svg>"
    );
  }

  function mountHold(art, el, ctx, g) {
    var t = ctx.t;
    var s = session[art.id] || (session[art.id] = { won: false });
    el.innerHTML =
      '<div class="game-stage">' + laserSvg(t) + "</div>" +
      '<div class="game-controls">' +
      '<p class="game-goal">' + esc(L(g, "goal", ctx.lang)) + "</p>" +
      '<button type="button" class="game-hold" data-hold><span class="game-hold-fill" aria-hidden="true"></span><span class="game-hold-label">' + esc(t.laser_hold) + "</span></button>" +
      '<p class="game-keys">' + esc(t.laser_keys) + "</p>" +
      '<p class="game-feedback" aria-live="polite"></p>' +
      winBlock(t) +
      "</div>";

    var btn = el.querySelector("[data-hold]");
    var fill = el.querySelector(".game-hold-fill");
    var beam = el.querySelector(".lrrr-beam");
    var photon = el.querySelector(".lrrr-photon");
    var clock = el.querySelector(".lrrr-clock");
    var fb = el.querySelector(".game-feedback");
    var stage = el.querySelector(".game-stage");
    var raf = null;
    var t0 = 0;
    var holding = false;

    function draw(p) {
      var out = Math.min(1, p * 2);
      beam.setAttribute("stroke-dashoffset", String(1 - out));
      if (p > 0.5) {
        var k = (p - 0.5) * 2;
        photon.setAttribute("opacity", "1");
        photon.setAttribute("cx", String(MIRROR.x + (EARTH.x + 18 - MIRROR.x) * k));
        photon.setAttribute("cy", String(MIRROR.y - 8 + (EARTH.y + 22 - (MIRROR.y - 8)) * k));
      } else {
        photon.setAttribute("opacity", "0");
      }
      fill.style.transform = "scaleX(" + p + ")";
      clock.textContent = numFmt((p * g.hold_ms) / 1000, ctx.lang, 2) + " s";
    }

    function tick() {
      var p = Math.min(1, (performance.now() - t0) / g.hold_ms);
      draw(p);
      if (p >= 1) {
        holding = false;
        raf = null;
        win();
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (holding || s.won) return;
      holding = true;
      fb.textContent = "";
      t0 = performance.now();
      btn.classList.add("is-holding");
      stage.classList.add("is-firing");
      raf = requestAnimationFrame(tick);
    }

    function release(silent) {
      if (!holding) return;
      holding = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      btn.classList.remove("is-holding");
      stage.classList.remove("is-firing");
      draw(0);
      if (!silent) fb.textContent = t.laser_early;
    }

    function win() {
      s.won = true;
      btn.classList.remove("is-holding");
      btn.classList.add("is-done");
      btn.disabled = true;
      el.querySelector(".game-hold-label").textContent = t.laser_returned;
      stage.classList.remove("is-firing");
      stage.classList.add("is-won");
      draw(1);
      var b = showWin(el, g, ctx);
      if (b) b.focus();
    }

    btn.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      try {
        btn.setPointerCapture(e.pointerId);
      } catch (err) { /* bỏ qua */ }
      start();
    });
    btn.addEventListener("pointerup", function () {
      release(false);
    });
    btn.addEventListener("pointercancel", function () {
      release(true);
    });
    btn.addEventListener("lostpointercapture", function () {
      release(false);
    });
    btn.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
    btn.addEventListener("keydown", function (e) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!e.repeat) start();
      }
    });
    btn.addEventListener("keyup", function (e) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        release(false);
      }
    });
    btn.addEventListener("blur", function () {
      release(true);
    });

    pauseFns.push(function () {
      release(true);
    });

    if (s.won) win();
  }

  /* =========================================================================
   * GAME 2–4 — thanh trượt tới mục tiêu (vẽ bằng RelicSVGEngine)
   * ========================================================================= */
  function mountSlider(art, el, ctx, g) {
    var t = ctx.t;
    var cfg = art.slider_config;
    var min = Number(cfg.min_val);
    var max = Number(cfg.max_val);
    var s = session[art.id] || (session[art.id] = { won: false, value: g.start });
    if (s.value == null) s.value = g.start;
    var targetPct = ((g.target - min) / (max - min)) * 100;

    var isOppy = art.id === "opportunity-rover";
    el.innerHTML =
      '<div class="game-stage">' +
      '<div data-svg></div>' +
      (isOppy ? '<span class="game-bits" aria-hidden="true">0100 1111 0111</span>' : "") +
      (art.id === "ingenuity-helicopter" ? navcamHtml() : "") +
      "</div>" +
      '<div class="game-controls">' +
      '<p class="game-goal" id="goal-' + art.id + '">' + esc(L(g, "goal", ctx.lang)) + "</p>" +
      '<div class="game-readout"><span class="game-readout-v num" data-readout></span><span class="game-readout-s" data-readout-sub></span></div>' +
      '<div class="game-track" style="--target-frac:' + (targetPct / 100).toFixed(4) + '">' +
      '<input type="range" class="telemetry-slider game-slider" data-no-swipe min="' + min + '" max="' + max + '" step="' + cfg.step + '" value="' + s.value + '" aria-describedby="goal-' + art.id + '" aria-label="' + esc(art["slider_config"]["parameter_name_" + ctx.lang] || "") + '" />' +
      '<span class="game-target" aria-hidden="true"></span>' +
      "</div>" +
      '<p class="game-feedback" aria-live="polite"></p>' +
      (isOppy ? '<div class="game-packet" hidden><button type="button" class="btn-signal" data-packet>' + esc(t.game_send_packet) + "</button></div>" : "") +
      winBlock(t) +
      "</div>";

    var svgBox = el.querySelector("[data-svg]");
    var input = el.querySelector("input");
    var readout = el.querySelector("[data-readout]");
    var readoutSub = el.querySelector("[data-readout-sub]");
    var fb = el.querySelector(".game-feedback");
    var E = window.RelicSVGEngine;

    function readoutText(v, res) {
      if (art.id === "surveyor-3") return numFmt(v, ctx.lang) + " m";
      if (art.id === "opportunity-rover") return (res.metrics[1] && res.metrics[1].value) || "";
      if (art.id === "ingenuity-helicopter") return (t.flight_of || "{n}").replace("{n}", v);
      return String(v);
    }

    function update() {
      var v = Number(input.value);
      s.value = v;
      var res = E.evaluateArtifact(art.id, v, ctx.lang);
      svgBox.innerHTML = res.svg;
      readout.textContent = readoutText(v, res);
      readoutSub.textContent = res.statusText || "";
      var pct = ((v - min) / (max - min)) * 100;
      input.style.setProperty("--pct", Math.max(0, Math.min(100, pct)) + "%");
      return v;
    }

    function reached(v) {
      if (art.id === "surveyor-3") return Math.abs(v - g.target) <= g.tolerance;
      return v >= g.target - 0.05;
    }

    function win(fresh) {
      s.won = true;
      input.disabled = true;
      var stage = el.querySelector(".game-stage");
      stage.classList.add("is-won");
      // Chương 4: lần đầu tới chuyến 72, xem qua camera định vị — các chấm mốc tắt dần rồi chạm đất
      if (fresh && art.id === "ingenuity-helicopter" && !reduceMotion.matches) {
        stage.classList.remove("is-crash");
        void stage.offsetWidth;
        stage.classList.add("is-crash");
      }
      // Chương 3: trước khi mở thư, gửi gói 0 và 1 cuối cùng lên ăng-ten (một lần chạm)
      if (isOppy && !s.sent) {
        fb.textContent = L(g, "win", ctx.lang);
        fb.classList.add("is-win");
        var pk = el.querySelector(".game-packet");
        var pb = pk.querySelector("[data-packet]");
        pk.hidden = false;
        pb.addEventListener("click", function () {
          pb.disabled = true;
          var done = function () {
            s.sent = true;
            pk.hidden = true;
            stage.classList.remove("is-sending");
            stage.classList.add("is-sent");
            var b2 = showWin(el, g, ctx);
            fb.textContent = L(g, "win", ctx.lang) + " " + (t.game_packet_sent || "");
            if (b2) b2.focus();
          };
          if (reduceMotion.matches) done();
          else {
            stage.classList.add("is-sending");
            setTimeout(done, 1300);
          }
        });
        pb.focus();
        return;
      }
      if (isOppy) stage.classList.add("is-sent");
      var b = showWin(el, g, ctx);
      if (isOppy) fb.textContent = L(g, "win", ctx.lang) + " " + (t.game_packet_sent || "");
      if (b) b.focus();
    }

    input.addEventListener("input", function () {
      var v = update();
      if (s.won) return;
      fb.textContent = "";
      if (art.id !== "surveyor-3" && reached(v)) win(true);
    });

    // Surveyor 3: tính khi thả tay (hoặc mỗi lần bấm phím mũi tên), để kéo ngang qua mốc không bị thắng nhầm
    input.addEventListener("change", function () {
      if (s.won || art.id !== "surveyor-3") return;
      var v = Number(input.value);
      if (reached(v)) win(true);
      else fb.textContent = v > g.target ? L(g, "far", ctx.lang) : L(g, "near", ctx.lang);
    });

    update();
    if (s.won) win(false);
  }

  /** Lớp phủ camera định vị của Ingenuity: mặt cát trơn, các chấm xanh = điểm mốc camera bám theo. */
  function navcamHtml() {
    var dots = [[18, 30], [36, 62], [52, 24], [64, 70], [78, 40], [30, 82], [86, 76], [46, 48]]
      .map(function (p, i) {
        return '<span class="navcam-dot" style="--i:' + i + ";left:" + p[0] + "%;top:" + p[1] + '%"></span>';
      })
      .join("");
    return '<div class="game-navcam" aria-hidden="true"><span class="navcam-label">NAV CAM · FLIGHT 72</span>' + dots + "</div>";
  }

  /* =========================================================================
   * GAME 5 — Trạm Artemis IV: chạm thẻ luật, rồi chạm vùng
   * ========================================================================= */
  var art5 = { selected: null, mirror: false, crossed: {}, landed: false, laser: false };
  var RELIC = { x: 118, y: 112 };
  var ZONES = {
    A: { x: 140, y: 120 },
    B: { x: 262, y: 300 },
    C: { x: 500, y: 112 },
    D: { x: 512, y: 292 }
  };

  function artemisSvg(t) {
    var landmarksC = [[455, 92], [520, 80], [548, 128], [470, 140], [505, 112]]
      .map(function (p, i) {
        return '<circle class="art-lm-c" style="--i:' + i + '" cx="' + p[0] + '" cy="' + p[1] + '" r="5"/>';
      })
      .join("");
    var rocksD = [[470, 270], [500, 300], [540, 280], [560, 318], [488, 330], [530, 250]]
      .map(function (p, i) {
        return '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + (7 + (i % 3) * 3) + '" ry="' + (5 + (i % 2) * 2) + '" fill="#3a4252" stroke="#566178" stroke-width="1"/>' +
          '<circle class="art-lm-d" cx="' + p[0] + '" cy="' + (p[1] - 1) + '" r="3.5"/>';
      })
      .join("");
    function cross(z, rx, ry) {
      var c = ZONES[z];
      return '<g class="art-cross" data-cross="' + z + '"><ellipse cx="' + c.x + '" cy="' + c.y + '" rx="' + rx + '" ry="' + ry + '" fill="rgba(239,68,68,0.10)" stroke="#EF4444" stroke-width="2"/>' +
        '<line x1="' + (c.x - rx * 0.6) + '" y1="' + (c.y - ry * 0.6) + '" x2="' + (c.x + rx * 0.6) + '" y2="' + (c.y + ry * 0.6) + '" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/>' +
        '<line x1="' + (c.x + rx * 0.6) + '" y1="' + (c.y - ry * 0.6) + '" x2="' + (c.x - rx * 0.6) + '" y2="' + (c.y + ry * 0.6) + '" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/></g>';
    }
    return (
      '<svg viewBox="0 0 640 400" class="art-svg" aria-hidden="true">' +
      '<defs><radialGradient id="art-crater" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#0b0e16"/><stop offset="1" stop-color="#252c3b"/></radialGradient>' +
      '<linearGradient id="art-ground" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#313848"/><stop offset="1" stop-color="#262c39"/></linearGradient></defs>' +
      '<rect x="0" y="0" width="640" height="400" rx="14" fill="url(#art-ground)"/>' +
      '<circle cx="330" cy="70" r="16" fill="#2a303e"/><circle cx="60" cy="330" r="22" fill="#2a303e"/><circle cx="380" cy="210" r="10" fill="#2a303e"/>' +
      // C: đồng bằng phẳng, sáng, trơn
      '<ellipse cx="' + ZONES.C.x + '" cy="' + ZONES.C.y + '" rx="110" ry="66" fill="#454d5e" opacity="0.75"/>' +
      // B: hố sâu
      '<ellipse cx="' + ZONES.B.x + '" cy="' + ZONES.B.y + '" rx="96" ry="58" fill="url(#art-crater)" stroke="#4b5568" stroke-width="2"/>' +
      '<ellipse class="art-shadow" cx="' + ZONES.B.x + '" cy="' + ZONES.B.y + '" rx="96" ry="58"/>' +
      // D: sườn dốc có đá
      '<path d="M410 250 Q 520 220 620 262 L620 360 Q 510 372 410 342 Z" fill="#3b4354" opacity="0.8"/>' + rocksD +
      // A: di tích + vòng 2 km
      '<circle class="art-ring-near" cx="' + RELIC.x + '" cy="' + RELIC.y + '" r="14"/>' +
      '<text class="art-ring-near-label" x="' + (RELIC.x + 18) + '" y="' + (RELIC.y - 16) + '">160 m</text>' +
      '<circle class="art-ring" cx="' + RELIC.x + '" cy="' + RELIC.y + '" r="150"/>' +
      '<text class="art-ring-label" x="' + (RELIC.x + 156) + '" y="' + (RELIC.y + 5) + '">2 km</text>' +
      '<g class="art-relic"><circle class="art-relic-glow" cx="' + RELIC.x + '" cy="' + RELIC.y + '" r="16"/>' +
      '<rect x="' + (RELIC.x - 7) + '" y="' + (RELIC.y - 5) + '" width="14" height="10" rx="1.5" fill="#94A3B8" stroke="#E2E8F0"/></g>' +
      '<line class="art-beam" x1="0" y1="0" x2="' + RELIC.x + '" y2="' + RELIC.y + '" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>' +
      landmarksC +
      cross("A", 92, 70) + cross("B", 100, 62) + cross("C", 112, 68) +
      // tàu đổ bộ Artemis IV
      '<g class="art-lander" transform="translate(' + ZONES.D.x + " " + (ZONES.D.y - 8) + ')"><g class="art-lander-body">' +
      '<path d="M-14 0 L14 0 L10 -16 L-10 -16 Z" fill="#E2E8F0"/><rect x="-6" y="-28" width="12" height="12" rx="2" fill="#F8FAFC"/>' +
      '<line x1="-12" y1="0" x2="-20" y2="12" stroke="#E2E8F0" stroke-width="2.5"/><line x1="12" y1="0" x2="20" y2="12" stroke="#E2E8F0" stroke-width="2.5"/></g></g>' +
      "</svg>"
    );
  }

  function mountArtemis(el, ctx) {
    var t = ctx.t;
    if (ctx.landed) {
      art5.crossed = { A: true, B: true, C: true };
      art5.mirror = true;
      art5.landed = true;
      art5.laser = true;
    }
    var zoneDesc = t.art_zone_desc || {};

    var zonesHtml = ["A", "B", "C", "D"]
      .map(function (z) {
        var c = ZONES[z];
        var label = (t.art_zone || "{z}").replace("{z}", z);
        return '<button type="button" class="art-zone" data-zone="' + z + '" style="left:' + ((c.x / 640) * 100).toFixed(2) + "%;top:" + ((c.y / 400) * 100).toFixed(2) + '%">' +
          '<span class="art-zone-letter" aria-hidden="true">' + z + "</span>" +
          '<span class="sr-only">' + esc(label) + ": " + esc(zoneDesc[z] || "") + "</span></button>";
      })
      .join("");

    var cardsHtml = ctx.cards
      .map(function (c) {
        return '<li><button type="button" class="rule-stamp art-card' + (c.earned ? "" : " is-unheard") + '" data-card="' + c.id + '" aria-pressed="false" style="--c:' + c.color + '">' +
          '<span class="rule-stamp-n num" aria-hidden="true">' + c.n + "</span>" +
          '<span class="rule-stamp-title">' + esc(L(c.rule, "title", ctx.lang)) + "</span>" +
          '<span class="rule-stamp-sub">' + esc(c.earned ? L(c.rule, "sub", ctx.lang) : t.art_card_unheard) + "</span>" +
          "</button></li>";
      })
      .join("");

    el.innerHTML =
      '<div class="art-play">' +
      '<div class="art-map-col">' +
      '<div class="art-map" data-map>' + artemisSvg(t) + zonesHtml + "</div>" +
      '<p class="art-note">' + esc(t.art_map_note) + "</p>" +
      "</div>" +
      '<div class="art-side">' +
      '<h3 class="art-cards-label" id="art-cards-label">' + esc(t.art_cards_label) + "</h3>" +
      '<ul class="art-cards" aria-labelledby="art-cards-label">' + cardsHtml + "</ul>" +
      '<p class="art-say" aria-live="polite"><span class="art-say-who">' + esc(t.character_name || (ctx.lang === "vi" ? "Thu Nguyệt" : "Thu Nguyet")) + '</span><span data-say></span></p>' +
      '<div class="art-actions">' +
      '<button type="button" class="btn-signal" data-land disabled>' + esc(t.art_land_btn) + "</button>" +
      '<button type="button" class="btn-signal" data-laser hidden>' + esc(t.art_laser_btn) + "</button>" +
      '<button type="button" class="btn-signal" data-art-continue hidden>' + esc(t.art_continue) + "</button>" +
      '<p class="art-land-hint" data-land-hint>' + esc(t.art_land_wait) + "</p>" +
      "</div>" +
      "</div>" +
      "</div>";

    var map = el.querySelector("[data-map]");
    var svg = el.querySelector(".art-svg");
    var say = el.querySelector("[data-say]");
    var sayBox = el.querySelector(".art-say");
    var landBtn = el.querySelector("[data-land]");
    var laserBtn = el.querySelector("[data-laser]");
    var contBtn = el.querySelector("[data-art-continue]");
    var landHint = el.querySelector("[data-land-hint]");
    var cards = el.querySelectorAll("[data-card]");
    var zones = el.querySelectorAll("[data-zone]");

    function rule(id) {
      for (var i = 0; i < ctx.cards.length; i++) if (ctx.cards[i].id === id) return ctx.cards[i].rule;
      return null;
    }

    function speak(text, bad) {
      say.textContent = text;
      sayBox.classList.toggle("is-bad", !!bad);
      sayBox.classList.add("is-on");
    }

    function shake() {
      if (reduceMotion.matches) return;
      map.classList.remove("is-shake");
      void map.offsetWidth;
      map.classList.add("is-shake");
    }

    function allCrossed() {
      return !!(art5.crossed.A && art5.crossed.B && art5.crossed.C);
    }

    function sync() {
      svg.classList.toggle("has-mirror", art5.mirror);
      ["A", "B", "C"].forEach(function (z) {
        svg.classList.toggle("is-crossed-" + z, !!art5.crossed[z]);
      });
      svg.classList.toggle("is-landed", art5.landed);
      svg.classList.toggle("is-laser", art5.laser);
      Array.prototype.forEach.call(zones, function (b) {
        var z = b.getAttribute("data-zone");
        b.classList.toggle("is-crossed", !!art5.crossed[z]);
        b.classList.toggle("is-target", z === "D" && allCrossed());
      });
      Array.prototype.forEach.call(cards, function (b) {
        var id = b.getAttribute("data-card");
        b.setAttribute("aria-pressed", String(art5.selected === id));
      });
      landBtn.disabled = !allCrossed() || art5.landed;
      landBtn.hidden = art5.landed;
      landHint.hidden = allCrossed();
      laserBtn.hidden = !art5.landed || art5.laser;
      contBtn.hidden = !art5.laser;
    }

    Array.prototype.forEach.call(cards, function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-card");
        art5.selected = art5.selected === id ? null : id;
        sync();
      });
    });

    Array.prototype.forEach.call(zones, function (b) {
      b.addEventListener("click", function () {
        if (art5.landed) return;
        var z = b.getAttribute("data-zone");
        if (!art5.selected) {
          speak(t.art_pick_card, true);
          shake();
          return;
        }
        var r = rule(art5.selected);
        if (!r) return;
        if (r.zone !== z) {
          speak(z === "D" ? t.art_wrong_d : t.art_wrong, true);
          shake();
          return;
        }
        if (r.effect === "reveal") {
          var firstPing = !art5.mirror;
          art5.mirror = true;
          if (firstPing && !reduceMotion.matches) {
            svg.classList.remove("is-pinging");
            void svg.getBoundingClientRect();
            svg.classList.add("is-pinging");
            setTimeout(function () { svg.classList.remove("is-pinging"); }, 2600);
          }
        } else {
          if (art5.crossed[z]) {
            speak(t.art_done_zone, false);
            return;
          }
          art5.crossed[z] = true;
        }
        art5.selected = null;
        speak(
          allCrossed() && r.effect === "cross"
            ? L(r, "say", ctx.lang) + " " + (t.art_soil ? t.art_soil + " " : "") + t.art_all_clear
            : L(r, "say", ctx.lang),
          false
        );
        sync();
        if (allCrossed()) landBtn.focus();
      });
    });

    landBtn.addEventListener("click", function () {
      if (!allCrossed()) return;
      art5.landed = true;
      art5.mirror = true;
      speak("", false);
      sync();
      laserBtn.focus();
    });

    laserBtn.addEventListener("click", function () {
      laserBtn.disabled = true;
      svg.classList.add("is-firing");
      var done = function () {
        art5.laser = true;
        svg.classList.remove("is-firing");
        speak(t.art_still_answers, false);
        sync();
        contBtn.focus();
      };
      if (reduceMotion.matches) done();
      else setTimeout(done, 2560);
    });

    contBtn.addEventListener("click", function () {
      if (typeof ctx.onComplete === "function") ctx.onComplete();
    });

    sync();
    if (!art5.landed) sayBox.classList.remove("is-on");
    else speak(t.art_still_answers, false);
  }

  window.LunamarisGames = {
    mount: function (art, el, ctx) {
      var g = flowGame(art.id);
      if (!g || !el) return;
      pauseFns = pauseFns.slice(-8);
      if (g.kind === "hold") mountHold(art, el, ctx, g);
      else mountSlider(art, el, ctx, g);
    },
    mountArtemis: mountArtemis,
    /** Chơi lại từ đầu (xóa trạng thái phiên của trò này). */
    reset: function (artId) {
      if (artId === "artemis") art5 = { selected: null, mirror: false, crossed: {}, landed: false, laser: false };
      else delete session[artId];
    },
    pause: function () {
      pauseFns.forEach(function (fn) {
        try {
          fn();
        } catch (e) { /* bỏ qua */ }
      });
    }
  };
})();
