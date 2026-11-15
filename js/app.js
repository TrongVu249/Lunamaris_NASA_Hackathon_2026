/**
 * LUNAMARIS: Letters Across the Silent Seas
 * Main Application Controller — state, song ngữ EN/VI, các cảnh (bật thu sóng, 4 tín hiệu,
 * 4 chương, Trạm Artemis, thẻ Guardian, Góc giáo viên, Nguồn) và liên kết với js/book.js.
 * NASA International Space Apps Challenge 2026
 *
 * Nguyên tắc giao diện (2026-11-15): chỉ thiết bị dùng tay được mới có khung (.instrument,
 * thẻ Guardian); chữ đặt thẳng trên nền cảnh; nhãn viết chữ thường; mono chỉ cho số đo thật.
 */

(function () {
  const DATA = window.LUNAMARIS_DATA || window.RELIC_DATA;
  const I18N = window.UI_I18N;
  const PLANET_COLOR = { Moon: "#38BDF8", Mars: "#F97316" };
  const reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  // Global Application State
  const state = {
    lang: "vi", // "vi" | "en"
    filter: "All", // "All" | "Moon" | "Mars"
    receiverActive: false,
    sliderValues: {},
    activeTabs: {}, // "machine" | "dossier" | "both"
    openAccordions: {}, // boolean per artifact id
    collectedStamps: {
      "apollo11-lrrr": false,
      "surveyor-3": false,
      "opportunity-rover": false,
      "ingenuity-helicopter": false
    },
    selectedZoneId: "zone-orange", // mặc định: mốc lịch sử Apollo 12 (180 m)
    badgeUnlocked: false,
    selectedPledgeIndex: 0,
    guardianName: "",
    siModalOpen: false
  };

  DATA.artifacts.forEach((art) => {
    state.sliderValues[art.id] = art.slider_config.default_val;
    state.activeTabs[art.id] = "machine";
    state.openAccordions[art.id] = false;
  });

  /* ---------------------------------------------------------------------------
   * TIẾN TRÌNH (localStorage, không có dữ liệu cá nhân):
   *   { won: { artId: true }, landed: bool } — won = đã thắng hoặc bỏ qua trò của chương
   * ------------------------------------------------------------------------- */
  const PROGRESS_KEY = "lunamaris_progress";
  const FLOW = window.LUNAMARIS_FLOW || { games: {}, rules: {}, story: {} };
  state.chapterView = {}; // artId → "game" | "letter"
  state.dossierOpen = false;
  state.mediaModalOpen = false;
  state.mediaModal = null; // { artId, idx } — cửa sổ ảnh & video thật

  function loadProgress() {
    try {
      const raw = window.localStorage.getItem(PROGRESS_KEY);
      const p = raw ? JSON.parse(raw) : null;
      if (!p) return;
      Object.keys(state.collectedStamps).forEach((id) => {
        state.collectedStamps[id] = !!(p.won && p.won[id]);
      });
      state.badgeUnlocked = !!p.landed;
      if (state.badgeUnlocked) state.selectedZoneId = "zone-green";
    } catch (e) {
      /* chế độ riêng tư / dữ liệu hỏng: bắt đầu lại */
    }
  }

  function saveProgress() {
    try {
      window.localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify({ won: state.collectedStamps, landed: state.badgeUnlocked })
      );
    } catch (e) {
      /* bỏ qua */
    }
  }

  loadProgress();

  /* ===========================================================================
   * TIỆN ÍCH
   * =========================================================================== */

  function tr() {
    return I18N[state.lang];
  }

  function setTxt(id, val) {
    const el = document.getElementById(id);
    if (el && val != null) el.textContent = val;
  }

  /** Lấy trường song ngữ: L(obj, "name") → obj.name_vi | obj.name_en */
  function L(obj, key) {
    return state.lang === "vi" ? obj[`${key}_vi`] : obj[`${key}_en`];
  }

  /** Id cảnh của một chương: "ch1"…"ch4" (lấy từ chapter_num, không viết cứng). */
  function sceneIdForArtifact(art) {
    return `ch${Number(art.chapter_num)}`;
  }

  function planetColor(art) {
    return PLANET_COLOR[art.celestial_body] || PLANET_COLOR.Moon;
  }

  /** Chuyển tới một cảnh; nếu book.js chưa chạy thì cuộn tới cảnh đó. */
  function goScene(sceneId) {
    if (window.LunamarisBook && window.LunamarisBook.goTo(sceneId)) return;
    const el = document.getElementById(`scene-${sceneId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /** Báo book.js tính lại thứ tự cảnh, đường tín hiệu, nhãn nút. */
  function notifyBook() {
    let evt;
    try {
      evt = new CustomEvent("lunamaris:render");
    } catch (e) {
      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("lunamaris:render", false, false, null);
    }
    document.dispatchEvent(evt);
  }

  /* ===========================================================================
   * TEM TÍN HIỆU
   * =========================================================================== */

  /** Thắng (hoặc bỏ qua) trò của một chương: nhận tem = thẻ luật, lưu tiến trình, mở chặn đi tiếp. */
  function completeGame(artifactId) {
    const isNew = !state.collectedStamps[artifactId];
    state.collectedStamps[artifactId] = true;
    saveProgress();
    renderHeaderStamps(isNew ? artifactId : null);
    renderCertificateSection();
    renderSignals();
    renderArtemisGame(); // thẻ luật ở Game 5 sáng lên
    updateGates();
    notifyBook();
  }

  /** Cảnh game chưa thắng: book.js không cho "Tiếp"/vuốt qua (chỉ Bỏ qua hoặc thắng mới mở). */
  function updateGates() {
    DATA.artifacts.forEach((art) => {
      const scene = document.getElementById(`scene-${sceneIdForArtifact(art)}`);
      if (!scene) return;
      if (state.collectedStamps[art.id]) scene.removeAttribute("data-gate");
      else scene.setAttribute("data-gate", "locked");
      scene.setAttribute("data-view", state.chapterView[art.id] || "game");
    });
    const artemis = document.getElementById("scene-artemis");
    if (artemis) {
      if (state.badgeUnlocked) artemis.removeAttribute("data-gate");
      else artemis.setAttribute("data-gate", "locked");
    }
    syncSceneView();
  }

  /** Báo cho CSS biết cảnh hiện tại đang ở "game" hay "letter" (ẩn nút Hồ sơ khi đọc thư). */
  function syncSceneView() {
    const cur = window.LunamarisBook ? window.LunamarisBook.current() : null;
    const scene = cur ? document.querySelector(`[data-scene="${cur}"]`) : null;
    document.body.setAttribute("data-scene-view", (scene && scene.getAttribute("data-view")) || "game");
  }

  function stampIsUnlocked(art) {
    const n = Number(art.chapter_num);
    if (n <= 1) return true;
    const prev = DATA.artifacts.find((a) => Number(a.chapter_num) === n - 1);
    return !prev || !!state.collectedStamps[prev.id];
  }

  function allStamps() {
    return DATA.artifacts.every((a) => state.collectedStamps[a.id]);
  }

  /** Thanh trên: 4 ô tem thẻ luật (máy tính) + "★ n/4" (mọi màn hình). */
  function renderHeaderStamps(justEarned) {
    const t = tr();
    setTxt("nav-stamps-label", t.nav_stamps_label);

    const shortNames = {
      "apollo11-lrrr": "LRRR",
      "surveyor-3": "Surveyor 3",
      "opportunity-rover": "Opportunity",
      "ingenuity-helicopter": "Ingenuity"
    };

    const container = document.getElementById("mission-stamps-bar");
    if (!container) return;
    const count = Object.values(state.collectedStamps).filter(Boolean).length;

    container.innerHTML =
      DATA.artifacts
        .map((art) => {
          const has = state.collectedStamps[art.id];
          const n = Number(art.chapter_num);
          const rule = FLOW.rules[art.id];
          const ruleTitle = rule ? L(rule, "title") : L(art, "name");
          return `
            <button type="button" data-scroll-chapter="${art.id}"
              class="stamp-pill ${has ? "is-collected" : ""} ${justEarned === art.id ? "is-new" : ""}" style="--c: ${planetColor(art)};"
              title="${has ? ruleTitle : L(art, "name")}"
              aria-label="${t.toc_chapter} ${n}: ${has ? `${t.rule_new}: ${ruleTitle}` : `${L(art, "name")}. ${t.signal_stamp_todo}`}">
              <span class="stamp-dot" aria-hidden="true"></span>
              <span>${n} ${shortNames[art.id] || ""}</span>
            </button>
          `;
        })
        .join("") +
      `<a href="#signals" class="stamp-count" aria-label="${t.nav_stamps_label}: ${count}/4"><span aria-hidden="true">★</span>${count}/4</a>`;

    container.querySelectorAll("[data-scroll-chapter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const art = DATA.artifacts.find((a) => a.id === btn.getAttribute("data-scroll-chapter"));
        if (art) goScene(sceneIdForArtifact(art));
      });
    });
  }

  /** Trạng thái nút EN|VI. (Bộ lọc hành tinh đã bỏ: các tín hiệu đi theo thứ tự 1 → 4.) */
  function renderFilterButtons() {
    ["en", "vi"].forEach((lang) => {
      const b = document.getElementById(`lang-btn-${lang}`);
      if (!b) return;
      b.className = "lang-btn";
      b.setAttribute("aria-pressed", String(state.lang === lang));
    });
  }

  /* ===========================================================================
   * CẢNH MỞ ĐẦU: BẬT THU SÓNG
   * =========================================================================== */

  function renderHeroSection() {
    const t = tr();
    setTxt("hero-station-line1", t.hero_station_line1);
    setTxt("hero-main-title", t.hero_title);
    setTxt("hero-hook-text", t.hero_hook);
    setTxt("tune-in-label", t.tune_in_btn);
    setTxt("cta-artemis-btn", t.go_artemis_link);
    setTxt("fact-laser-label", t.fact_laser_label);
    setTxt("fact-laser-value", t.fact_laser_value);
    setTxt("fact-mars-label", t.fact_mars_label);
    setTxt("fact-mars-value", t.fact_mars_value);
    setTxt("replay-story-btn", t.replay_story);
  }

  /* ===========================================================================
   * CẢNH 4 TÍN HIỆU: bản đồ Mặt Trăng & Sao Hỏa + danh sách chương
   * =========================================================================== */

  const DEG = Math.PI / 180;

  /** Tách vĩ độ/kinh độ từ chuỗi location_name có sẵn (không thêm số mới). */
  function parseCoords(text) {
    const m = /([\d.]+)°\s*([NS]),\s*([\d.]+)°\s*([EW])/.exec(text || "");
    if (!m) return null;
    const lat = parseFloat(m[1]) * (m[2] === "S" ? -1 : 1);
    let lon = parseFloat(m[3]) * (m[4] === "W" ? -1 : 1);
    if (lon > 180) lon -= 360;
    return { lat, lon };
  }

  /** Phép chiếu trực giao lên đĩa hành tinh nhìn từ phía kinh độ lon0. */
  function project(lat, lon, lon0, cx, cy, r) {
    const dl = (lon - lon0) * DEG;
    const ph = lat * DEG;
    return {
      x: cx + r * Math.cos(ph) * Math.sin(dl),
      y: cy - r * Math.sin(ph),
      visible: Math.cos(ph) * Math.cos(dl) > 0
    };
  }

  // Mặt Trăng nhìn từ kinh độ 0°; Sao Hỏa từ 35°E để Opportunity và Ingenuity cùng hiện.
  const MAP_BODIES = [
    { key: "Moon", cx: 165, cy: 160, r: 128, lon0: 0, hi: "#4a5568", lo: "#161b27" },
    { key: "Mars", cx: 475, cy: 160, r: 128, lon0: 35, hi: "#8a4220", lo: "#2a120a" }
  ];

  function graticule(b, color) {
    let s = "";
    [-60, -30, 0, 30, 60].forEach((lat) => {
      const y = b.cy - b.r * Math.sin(lat * DEG);
      const hw = b.r * Math.cos(lat * DEG);
      s += `<line x1="${(b.cx - hw).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(b.cx + hw).toFixed(1)}" y2="${y.toFixed(1)}" />`;
    });
    [30, 60].forEach((d) => {
      s += `<ellipse cx="${b.cx}" cy="${b.cy}" rx="${(b.r * Math.sin(d * DEG)).toFixed(1)}" ry="${b.r}" />`;
    });
    s += `<line x1="${b.cx}" y1="${b.cy - b.r}" x2="${b.cx}" y2="${b.cy + b.r}" />`;
    return `<g fill="none" stroke="${color}" stroke-opacity="0.16" stroke-width="1">${s}</g>`;
  }

  function renderSignals() {
    const t = tr();
    setTxt("signals-title", t.signals_title);
    setTxt("signals-lead", t.signals_lead);
    setTxt("signals-more-label", t.signals_more);

    const map = document.getElementById("signal-map");
    if (map) {
      const bodies = MAP_BODIES.map((b) => {
        const color = PLANET_COLOR[b.key];
        const dim = false;
        const pins = DATA.artifacts
          .filter((a) => a.celestial_body === b.key)
          .map((art) => {
            const c = parseCoords(art.location_name);
            if (!c) return "";
            const p = project(c.lat, c.lon, b.lon0, b.cx, b.cy, b.r);
            if (!p.visible) return "";
            const n = Number(art.chapter_num);
            const has = state.collectedStamps[art.id];
            const locked = !has && !stampIsUnlocked(art);
            const x = p.x.toFixed(1);
            const y = p.y.toFixed(1);
            const shapes = `
                <circle class="pin-hit" cx="${x}" cy="${y}" r="44" />
                <circle class="pin-halo" cx="${x}" cy="${y}" r="34" fill="${color}" fill-opacity="0.13" />
                <circle class="pin-dot" cx="${x}" cy="${y}" r="20" fill="${has ? color : "#151622"}" stroke="${color}" stroke-width="3" />
                <text class="pin-num" x="${x}" y="${(p.y + 7).toFixed(1)}" text-anchor="middle" fill="${has ? "#151622" : color}">${n}</text>`;
            // Chặng chưa tới: chấm mờ, không phải liên kết (danh sách bên cạnh vẫn có nút "Mở chặng này")
            if (locked) return `<g class="map-pin is-locked" aria-hidden="true">${shapes}</g>`;
            return `
              <a class="map-pin ${has ? "" : "is-next"}" href="#${sceneIdForArtifact(art)}" aria-label="${t.toc_chapter} ${n}: ${L(art, "name")}. ${has ? t.sig_done : t.sig_open}">
                ${shapes}
              </a>
            `;
          })
          .join("");
        return `
          <g class="map-planet ${dim ? "is-dim" : ""}">
            <defs>
              <radialGradient id="map-${b.key}" cx="38%" cy="32%" r="78%">
                <stop offset="0" stop-color="${b.hi}" />
                <stop offset="1" stop-color="${b.lo}" />
              </radialGradient>
            </defs>
            <circle cx="${b.cx}" cy="${b.cy}" r="${b.r}" fill="url(#map-${b.key})" stroke="${color}" stroke-opacity="0.55" stroke-width="1.5" />
            ${graticule(b, color)}
            ${pins}
            <text class="map-label" x="${b.cx}" y="${b.cy + b.r + 38}" text-anchor="middle">${b.key === "Moon" ? t.planet_moon : t.planet_mars}</text>
          </g>
        `;
      }).join("");
      map.innerHTML = `<svg viewBox="0 0 640 340" role="group" aria-label="${t.signals_map_label}">${bodies}</svg>`;
    }

    const list = document.getElementById("signal-list");
    if (list) {
      const item = (o) => {
        const status = o.has ? t.sig_done : o.locked ? t.sig_locked : t.sig_open;
        const inner = `
                <span class="signal-num" aria-hidden="true">${o.n}</span>
                <span class="signal-name"><span class="sr-only">${o.srPrefix}</span>${o.name}</span>
                <span class="signal-where">${o.where}</span>
                <span class="signal-stamp ${o.has ? "is-collected" : ""}">
                  <span aria-hidden="true">${o.has ? "★" : o.locked ? "·" : "○"}</span>
                  <span class="signal-state">${status}</span>
                </span>`;
        // Khóa nhẹ: không chặn cứng — vẫn có nút "Mở chặng này" (cho giám khảo/giáo viên)
        if (o.locked) {
          return `
            <li class="signal-item is-locked" style="--c: ${o.color};">
              <div class="signal-row">${inner}</div>
              <a class="signal-unlock link-quiet" href="#${o.scene}">${t.sig_unlock}<span class="sr-only">: ${o.name}</span></a>
            </li>`;
        }
        return `
            <li class="signal-item ${o.has ? "is-done" : "is-next"}" style="--c: ${o.color};">
              <a href="#${o.scene}">${inner}</a>
            </li>`;
      };

      list.innerHTML =
        DATA.artifacts
          .map((art) => {
            const n = Number(art.chapter_num);
            const has = !!state.collectedStamps[art.id];
            return item({
              n,
              has,
              locked: !has && !stampIsUnlocked(art),
              name: L(art, "name"),
              where: art.location_name,
              scene: sceneIdForArtifact(art),
              color: planetColor(art),
              srPrefix: `${t.toc_chapter} ${n}: `
            });
          })
          .join("") +
        item({
          n: 5,
          has: state.badgeUnlocked,
          locked: !state.badgeUnlocked && !allStamps(),
          name: t.sig_artemis,
          where: t.sig_artemis_where,
          scene: "artemis",
          color: "#10B981",
          srPrefix: ""
        });
    }

    const more = document.getElementById("signal-more");
    if (more) {
      more.innerHTML = [
        ["guardian", t.scene_title_guardian],
        ["teacher", t.scene_title_teacher],
        ["sources", t.scene_title_sources]
      ]
        .map(([id, label]) => `<li><a class="link-quiet" href="#${id}">${label}</a></li>`)
        .join("");
    }
  }

  /** Tên từng cảnh (theo ngôn ngữ) để book.js dựng đường tín hiệu và nhãn "Tiếp: …". */
  function renderSceneTitles() {
    const t = tr();
    const setTitle = (sceneId, text, num) => {
      const scene = document.getElementById(`scene-${sceneId}`);
      if (!scene) return;
      scene.setAttribute("data-title", text || "");
      if (num) scene.setAttribute("data-title-num", num);
      else scene.removeAttribute("data-title-num");
    };

    setTitle("start", t.scene_title_start);
    setTitle("signals", t.scene_title_signals);
    const storyTitles = t.story_titles || {};
    document.querySelectorAll("[data-story]").forEach((scene) => {
      const seq = scene.getAttribute("data-story");
      setTitle(scene.getAttribute("data-scene"), storyTitles[seq] || t.story_label);
    });
    DATA.artifacts.forEach((art) => {
      setTitle(sceneIdForArtifact(art), L(art, "name"), `${t.toc_chapter} ${Number(art.chapter_num)}`);
    });
    setTitle("artemis", t.scene_title_artemis);
    setTitle("guardian", t.scene_title_guardian);
    setTitle("teacher", t.scene_title_teacher);
    setTitle("sources", t.scene_title_sources);
  }

  /* ===========================================================================
   * 4 CHƯƠNG DI VẬT
   *   Máy tính: cột trái = tiêu đề + hai giọng kể, cột phải = thiết bị (sticky).
   *   Điện thoại: tiêu đề → thiết bị → thư (chơi trước, đọc sau).
   * =========================================================================== */

  /** Cập nhật SVG, dải đồng hồ, trạng thái, mốc đang chọn khi kéo thanh trượt. */
  function updateChapterTelemetryDOM(artifactId) {
    const art = DATA.artifacts.find((a) => a.id === artifactId);
    if (!art) return;

    const currentVal = state.sliderValues[artifactId];
    const evalResult = window.RelicSVGEngine.evaluateArtifact(artifactId, currentVal, state.lang);

    const svgContainer = document.getElementById(`svg-viewport-${artifactId}`);
    if (svgContainer) svgContainer.innerHTML = evalResult.svg;

    const metricsContainer = document.getElementById(`telemetry-metrics-${artifactId}`);
    if (metricsContainer) {
      metricsContainer.innerHTML = evalResult.metrics
        .map(
          (m) => `
            <div class="readout">
              <div class="readout-k">${m.label}</div>
              <div class="readout-v">${m.value}</div>
              <div class="readout-s">${m.sub}</div>
            </div>
          `
        )
        .join("");
    }

    // Mốc gần nhất để giải thích
    const stops = art.slider_config.stops;
    let closestStop = stops[0];
    let minDiff = Infinity;
    stops.forEach((st) => {
      const diff = Math.abs(Number(st.value) - Number(currentVal));
      if (diff < minDiff) {
        minDiff = diff;
        closestStop = st;
      }
    });

    const statusBox = document.getElementById(`telemetry-status-${artifactId}`);
    if (statusBox) {
      statusBox.innerHTML = `
        <div class="status-head">
          <span class="status-k">${evalResult.statusText}</span>
          <span class="status-v num">${art.slider_config.unit}: ${currentVal}</span>
        </div>
        <p>${L(closestStop, "desc")}</p>
      `;
    }

    const presetContainer = document.getElementById(`preset-btns-${artifactId}`);
    if (presetContainer) {
      presetContainer.querySelectorAll("[data-preset-val]").forEach((btn) => {
        const isMatch = Math.abs(Number(btn.getAttribute("data-preset-val")) - Number(currentVal)) < 0.05;
        btn.setAttribute("aria-pressed", String(isMatch));
      });
    }

    // Phần đã kéo của thanh trượt tô màu hành tinh
    const slider = document.getElementById(`slider-${artifactId}`);
    if (slider) {
      const min = Number(art.slider_config.min_val);
      const max = Number(art.slider_config.max_val);
      const pct = max > min ? ((Number(currentVal) - min) / (max - min)) * 100 : 0;
      slider.style.setProperty("--pct", `${Math.max(0, Math.min(100, pct))}%`);
    }
  }

  /* ---------- Hồ sơ Khoa học: bộ mô phỏng cũ + hồ sơ + nguồn (không có lá thư) ---------- */

  function sourceLinksHtml(art) {
    return art.archaeologist_dossier.source_links
      .map(
        (lnk) =>
          `<li><a href="${lnk.url}" target="_blank" rel="noopener noreferrer"><span>${lnk.label}</span><span aria-hidden="true">↗</span></a></li>`
      )
      .join("");
  }

  function instrumentHtml(art) {
    const t = tr();
    const paramName = L(art.slider_config, "parameter_name");
    const currentVal = state.sliderValues[art.id];
    const isOpen = !!state.openAccordions[art.id];
    const discrepancyNote = L(art.archaeologist_dossier, "discrepancy_note");
    return `
        <section class="chapter-instrument instrument" aria-label="${t.telemetry_station_title}">
          <div class="instrument-view">
            <img src="${art.media.primary_image_url}" alt="" loading="lazy" onerror="this.style.display='none'"
              class="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity pointer-events-none" />
            <div id="svg-viewport-${art.id}" class="relative z-10 w-full h-full"></div>
            <div class="instrument-credit">${t.photo_credit}: ${art.media.image_credit}</div>
          </div>
          <div id="telemetry-metrics-${art.id}" class="readouts"></div>
          <div class="instrument-body">
            <div>
              <label for="slider-${art.id}" class="instrument-label">${paramName}</label>
              <input id="slider-${art.id}" type="range"
                min="${art.slider_config.min_val}" max="${art.slider_config.max_val}"
                step="${art.slider_config.step}" value="${currentVal}"
                data-artifact-slider="${art.id}" class="telemetry-slider" />
            </div>
            <div id="preset-btns-${art.id}" class="chips" role="group" aria-label="${t.preset_label}">
              ${art.slider_config.stops
                .map(
                  (st) =>
                    `<button type="button" class="chip" data-artifact-preset="${art.id}" data-preset-val="${st.value}" aria-pressed="false">${L(st, "label")}</button>`
                )
                .join("")}
            </div>
            <div id="telemetry-status-${art.id}" class="status" aria-live="polite"></div>
            <div>
              <button type="button" class="disclosure-btn" data-accordion-toggle="${art.id}"
                aria-expanded="${isOpen}" aria-controls="accordion-body-${art.id}">
                <span>${t.where_number_btn}</span>
                <span id="accordion-icon-${art.id}" class="disclosure-chevron" aria-hidden="true">▾</span>
              </button>
              <div id="accordion-body-${art.id}" class="disclosure-body" ${isOpen ? "" : "hidden"}>
                <h4>${t.where_number_formula_title}</h4>
                <p>${discrepancyNote}</p>
                <h4>${t.where_number_sources_title}</h4>
                <ul class="link-list">${sourceLinksHtml(art)}</ul>
              </div>
            </div>
          </div>
        </section>`;
  }

  function dossierHtml(art) {
    const t = tr();
    const ad = art.archaeologist_dossier;
    const epDossier = state.lang === "vi" ? `${ad.epistemic_label_en} • ${ad.epistemic_label_vi}` : ad.epistemic_label_en;
    return `
        <section class="voice-panel">
          <span class="epistemic epistemic--dossier">${epDossier}</span>
          <div class="dossier">
            <div>
              <h3>${t.dossier_sec1_title}</h3>
              <p>${L(ad, "how_it_operated")}</p>
            </div>
            <div>
              <h3>${t.dossier_sec2_title}</h3>
              <p class="dossier-state">${L(art, "functionality_status")}</p>
              <p>${L(ad, "discrepancy_note")}</p>
            </div>
            <div>
              <h3>${t.dossier_sec3_title}</h3>
              <p>${L(ad, "conservation_law")}</p>
              <ul class="link-list">${sourceLinksHtml(art)}</ul>
            </div>
          </div>
        </section>`;
  }

  /** Gắn sự kiện cho bộ mô phỏng trong popup (thanh trượt, mốc, "Số này lấy từ đâu"). Không làm thắng game. */
  function bindInstrument(root, art) {
    const slider = root.querySelector("[data-artifact-slider]");
    if (slider) {
      slider.addEventListener("input", (e) => {
        state.sliderValues[art.id] = Number(e.target.value);
        updateChapterTelemetryDOM(art.id);
      });
    }
    root.querySelectorAll("[data-artifact-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = Number(btn.getAttribute("data-preset-val"));
        state.sliderValues[art.id] = val;
        const s = document.getElementById(`slider-${art.id}`);
        if (s) s.value = val;
        updateChapterTelemetryDOM(art.id);
      });
    });
    const accBtn = root.querySelector("[data-accordion-toggle]");
    if (accBtn) {
      accBtn.addEventListener("click", () => {
        const open = !state.openAccordions[art.id];
        state.openAccordions[art.id] = open;
        const bodyEl = document.getElementById(`accordion-body-${art.id}`);
        if (bodyEl) bodyEl.hidden = !open;
        accBtn.setAttribute("aria-expanded", String(open));
      });
    }
  }

  /* ---------- Cảnh chương: trạng thái "game" (chơi) hoặc "letter" (thư + thẻ luật) ---------- */

  function chapterHeadHtml(art, headingText) {
    const t = tr();
    const n = Number(art.chapter_num);
    const isMoon = art.celestial_body === "Moon";
    return `
        <header class="chapter-head game-head">
          <span class="chapter-num" aria-hidden="true">${n}</span>
          <span class="chapter-world">${isMoon ? t.moon_badge : t.mars_badge}</span>
          <h2 class="chapter-name" data-scene-heading tabindex="-1"><span class="sr-only">${t.toc_chapter} ${n}: </span>${headingText}</h2>
        </header>`;
  }

  function gameShellHtml(art) {
    const t = tr();
    const g = FLOW.games[art.id] || {};
    const won = !!state.collectedStamps[art.id];
    return `
      <article id="chapter-${art.id}" class="chapter game" style="--c: ${planetColor(art)};">
        <div class="game-intro">
          ${chapterHeadHtml(art, L(art, "name"))}
          <blockquote class="game-cue">
            <p>${L(g, "cue")}</p>
            <footer>Columbina</footer>
          </blockquote>
        </div>
        <div class="game-play" data-game-play></div>
        <div class="game-foot">
          ${won
            ? `<button type="button" class="link-quiet" data-game-reread>${t.game_reread}</button>`
            : `<button type="button" class="btn-ghost game-skip" data-game-skip title="${t.skip_game_hint}">${t.skip_game}</button>
               <span class="game-skip-hint">${t.skip_game_hint}</span>`}
        </div>
      </article>`;
  }

  function letterHtml(art) {
    const t = tr();
    const nv = art.narrative_voice;
    const rule = FLOW.rules[art.id];
    const epNarrative = state.lang === "vi" ? `${nv.epistemic_label_en} • ${nv.epistemic_label_vi}` : nv.epistemic_label_en;
    return `
      <article id="chapter-${art.id}" class="chapter letter-view" style="--c: ${planetColor(art)};">
        ${chapterHeadHtml(art, `${t.letter_from} ${shortPlace(art)}`)}
        <div class="letter-body">
          <div class="seal" aria-hidden="true"><span class="seal-half seal-half--l"></span><span class="seal-half seal-half--r"></span></div>
          <span class="epistemic">${epNarrative}</span>
          <p class="letter-route">${t.postmark_from} <strong>${art.location_name}</strong> ${t.postmark_to}</p>
          <blockquote class="letter">${L(nv, "letter")}</blockquote>
          ${enclosureHtml(art)}
          ${rule
            ? `<div class="rule-stamp rule-stamp--earned" style="--c: ${planetColor(art)};">
                 <span class="rule-stamp-n num" aria-hidden="true">${Number(art.chapter_num)}</span>
                 <span class="rule-stamp-k">${t.rule_new}</span>
                 <strong class="rule-stamp-title">${L(rule, "title")}</strong>
                 <span class="rule-stamp-sub">${L(rule, "sub")}</span>
               </div>`
            : ""}
          <div class="letter-actions">
            <button type="button" class="btn-signal" data-letter-next>${t.letter_continue}</button>
            <button type="button" class="link-quiet" data-letter-replay>${t.game_replay}</button>
          </div>
        </div>
      </article>`;
  }

  /** "Mare Tranquillitatis (Sea of Tranquility — …)" → "Mare Tranquillitatis" (cho tiêu đề thư). */
  function shortPlace(art) {
    return String(art.location_name || "").split(/[(,]/)[0].trim() || L(art, "name");
  }

  /** Render một chương vào cảnh của nó theo trạng thái hiện tại. */
  function renderChapter(art, focus) {
    const slot = document.querySelector(`[data-chapter-slot="${art.id}"]`);
    if (!slot) return;
    const view = state.chapterView[art.id] || "game";

    if (view === "letter") {
      slot.innerHTML = letterHtml(art);
      const nextBtn = slot.querySelector("[data-letter-next]");
      if (nextBtn) nextBtn.addEventListener("click", () => window.LunamarisBook && window.LunamarisBook.next());
      const replay = slot.querySelector("[data-letter-replay]");
      if (replay) {
        replay.addEventListener("click", () => {
          if (window.LunamarisGames) window.LunamarisGames.reset(art.id);
          setChapterView(art, "game", true);
        });
      }
    } else {
      slot.innerHTML = gameShellHtml(art);
      const play = slot.querySelector("[data-game-play]");
      if (window.LunamarisGames && play) {
        window.LunamarisGames.mount(art, play, {
          lang: state.lang,
          t: tr(),
          onOpenLetter: () => {
            completeGame(art.id);
            setChapterView(art, "letter", true);
          }
        });
      }
      const skip = slot.querySelector("[data-game-skip]");
      if (skip) {
        skip.addEventListener("click", () => {
          completeGame(art.id);
          setChapterView(art, "letter", true);
        });
      }
      const reread = slot.querySelector("[data-game-reread]");
      if (reread) reread.addEventListener("click", () => setChapterView(art, "letter", true));
    }

    if (focus) {
      const sc = slot.closest(".scene-scroll");
      if (sc) sc.scrollTop = 0;
      const h = slot.querySelector("[data-scene-heading]");
      if (h) h.focus({ preventScroll: true });
    }
  }

  function setChapterView(art, view, focus) {
    state.chapterView[art.id] = view;
    updateGates();
    renderChapter(art, focus);
  }

  /** Render cả 4 chương. */
  function renderChapters() {
    DATA.artifacts.forEach((art) => renderChapter(art));
    updateGates();
  }

  /* ---------- Game 5: Trạm Artemis IV ---------- */

  function renderArtemisGame() {
    const t = tr();
    setTxt("artemis-game-title", t.art_title);
    setTxt("artemis-game-lead", t.art_lead);
    setTxt("artemis-game-skip", t.skip_game);
    const artSkip = document.getElementById("artemis-game-skip");
    if (artSkip) artSkip.hidden = state.badgeUnlocked;
    const slot = document.getElementById("artemis-game");
    if (!slot || !window.LunamarisGames) return;
    window.LunamarisGames.mountArtemis(slot, {
      lang: state.lang,
      t,
      landed: state.badgeUnlocked,
      cards: DATA.artifacts.map((art) => ({
        id: art.id,
        n: Number(art.chapter_num),
        color: planetColor(art),
        rule: FLOW.rules[art.id],
        earned: !!state.collectedStamps[art.id]
      })),
      onComplete: finishArtemis
    });
  }

  function finishArtemis() {
    state.badgeUnlocked = true;
    state.selectedZoneId = "zone-green";
    saveProgress();
    renderCertificateSection();
    renderSignals();
    renderArtemisGame();
    updateGates();
    notifyBook();
    if (window.LunamarisBook) window.LunamarisBook.next();
  }

  /* ---------- Popup Hồ sơ Khoa học ---------- */

  function currentArtifact() {
    const cur = window.LunamarisBook ? window.LunamarisBook.current() : null;
    return DATA.artifacts.find((a) => sceneIdForArtifact(a) === cur) || null;
  }

  function renderDossierSheet() {
    const t = tr();
    const body = document.getElementById("dossier-sheet-body");
    if (!body) return;
    const art = currentArtifact();
    setTxt("dossier-sheet-title", art ? `${t.dossier_title}: ${L(art, "name")}` : `${t.dossier_title}: ${t.scene_title_artemis}`);
    if (art) {
      body.innerHTML = `<div class="dossier-grid" style="--c: ${planetColor(art)};"><div class="dossier-left">${galleryHtml(art)}${instrumentHtml(art)}</div>${dossierHtml(art)}</div>`;
      updateChapterTelemetryDOM(art.id);
      bindInstrument(body, art);
    } else {
      // Trạm mặt cắt cũ (khoảng cách hạ cánh) — chỉ để khám phá, không mở khóa huy hiệu
      body.innerHTML = `
        <div class="stack">
          <header class="scene-head">
            <p id="artemis-tag" class="scene-context"></p>
            <h3 id="artemis-title" class="sub-title"></h3>
            <p id="artemis-subtitle" class="scene-lead"></p>
          </header>
          <p id="artemis-physics-callout" class="note"></p>
          <div class="instrument">
            <div id="artemis-svg-container" class="instrument-view"></div>
            <div class="instrument-body">
              <p id="artemis-select-prompt" class="instrument-label"></p>
              <div id="artemis-zone-buttons" class="zone-grid"></div>
            </div>
          </div>
          <div id="artemis-outcome-panel"></div>
        </div>`;
      renderDecisionStation();
    }
  }

  function setDossierOpen(open) {
    const sheet = document.getElementById("dossier-sheet");
    const btn = document.getElementById("dossier-btn");
    if (!sheet || !btn) return;
    const t = tr();
    state.dossierOpen = open;
    if (open) {
      if (window.LunamarisGames) window.LunamarisGames.pause();
      renderDossierSheet();
      sheet.hidden = false;
      document.body.classList.add("dossier-open");
      const sc = sheet.querySelector(".dossier-sheet-scroll");
      if (sc) sc.scrollTop = 0;
      const h = document.getElementById("dossier-sheet-title");
      if (h) h.focus({ preventScroll: true });
    } else {
      sheet.hidden = true;
      document.body.classList.remove("dossier-open");
    }
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? t.dossier_close : t.dossier_btn);
    setTxt("dossier-btn-label", open ? t.dossier_close : t.dossier_btn);
  }

  /* ===========================================================================
   * ẢNH & VIDEO THẬT: trigger (polaroid trong thư, thumbnail trong hồ sơ) → modal
   * Dữ liệu: media.gallery của từng thiết bị trong js/data.js
   * =========================================================================== */

  function escAttr(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  /** Gộp photos + videos của một thiết bị thành danh sách mục xem được. */
  function galleryItems(art) {
    const g = art && art.media && art.media.gallery;
    if (!g) return [];
    const photos = (g.photos || []).map((p) => ({ type: "photo", ...p }));
    const videos = (g.videos || []).map((v) => ({ type: "video", ...v }));
    return photos.concat(videos);
  }

  /** Vị trí 1 — "Tái bút": tấm ảnh polaroid kẹp vào lá thư. */
  function enclosureHtml(art) {
    const t = tr();
    const items = galleryItems(art);
    if (!items.length) return "";
    const firstPhoto = items.find((i) => i.type === "photo") || items[0];
    const idx = items.indexOf(firstPhoto);
    const hasVideo = items.some((i) => i.type === "video");
    return `
          <button type="button" class="letter-enclosure" data-media-open="${art.id}" data-media-idx="${idx}" aria-haspopup="dialog">
            <span class="enclosure-tape" aria-hidden="true"></span>
            <span class="enclosure-photo">
              <img src="${firstPhoto.url}" alt="${escAttr(L(firstPhoto, "caption"))}" loading="lazy" />
              ${hasVideo ? '<span class="enclosure-play" aria-hidden="true">▶</span>' : ""}
            </span>
            <span class="enclosure-ps">${t.enclosure_ps}</span>
            <span class="enclosure-hint">${t.enclosure_hint}</span>
          </button>`;
  }

  /** Vị trí 2 — mục "Bằng chứng hình ảnh" trong popup Hồ sơ Khoa học. */
  function galleryHtml(art) {
    const t = tr();
    const items = galleryItems(art);
    if (!items.length) return "";
    const fallback = (items.find((i) => i.type === "photo") || {}).url || "";
    return `
        <section class="gallery-sec" aria-label="${t.gallery_title}">
          <h3>${t.gallery_title}</h3>
          <p class="gallery-sub">${t.gallery_sub}</p>
          <div class="gallery-strip">
            ${items
              .map(
                (it, i) => `
                <button type="button" class="gallery-thumb" data-media-open="${art.id}" data-media-idx="${i}">
                  <span class="thumb-media">
                    <img src="${it.type === "video" ? `https://i.ytimg.com/vi/${it.youtube_id}/hqdefault.jpg` : it.url}"
                      alt="${escAttr(L(it, "caption"))}" loading="lazy"
                      ${it.type === "video" && fallback ? `onerror="this.onerror=null;this.src='${fallback}';"` : ""} />
                    ${it.type === "video" ? '<span class="play-icon" aria-hidden="true">▶</span>' : ""}
                  </span>
                  <span class="thumb-cap"><span class="thumb-type">${it.type === "video" ? t.label_video : t.label_photo}</span>${escAttr(L(it, "caption"))}</span>
                </button>`
              )
              .join("")}
          </div>
        </section>`;
  }

  function ensureMediaModal() {
    if (document.getElementById("media-modal")) return;
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div id="media-modal" class="media-modal" hidden>
        <div class="media-modal-box" role="dialog" aria-modal="true" aria-labelledby="media-modal-title">
          <div class="media-modal-head">
            <h3 id="media-modal-title"></h3>
            <button id="media-modal-close" type="button" class="media-modal-close" aria-label="Đóng">✕</button>
          </div>
          <div class="media-modal-body">
            <div id="media-modal-media" class="media-modal-media"></div>
            <p id="media-modal-caption" class="media-modal-caption"></p>
            <p id="media-modal-credit" class="media-modal-credit"></p>
            <div class="media-modal-foot">
              <button id="media-modal-prev" type="button" class="media-modal-nav" aria-label="Trước">←</button>
              <span id="media-modal-counter" class="media-modal-counter"></span>
              <button id="media-modal-next" type="button" class="media-modal-nav" aria-label="Sau">→</button>
            </div>
          </div>
        </div>
      </div>`
    );
    const modal = document.getElementById("media-modal");
    document.getElementById("media-modal-close").addEventListener("click", closeMediaModal);
    document.getElementById("media-modal-prev").addEventListener("click", () => stepMediaModal(-1));
    document.getElementById("media-modal-next").addEventListener("click", () => stepMediaModal(1));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeMediaModal();
    });
  }

  function openMediaModal(artId, idx) {
    const art = DATA.artifacts.find((a) => a.id === artId);
    if (!art || !galleryItems(art).length) return;
    ensureMediaModal();
    state.mediaModal = { artId, idx: idx || 0 };
    state.mediaModalOpen = true;
    renderMediaModal();
    document.getElementById("media-modal").hidden = false;
    document.getElementById("media-modal-close").focus();
  }

  function renderMediaModal() {
    if (!state.mediaModal) return;
    const t = tr();
    const art = DATA.artifacts.find((a) => a.id === state.mediaModal.artId);
    const items = galleryItems(art);
    if (!items.length) return;
    state.mediaModal.idx = (state.mediaModal.idx + items.length) % items.length;
    const it = items[state.mediaModal.idx];
    setTxt("media-modal-title", `${t.media_modal_title}: ${L(art, "name")}`);
    const media = document.getElementById("media-modal-media");
    if (it.type === "video") {
      const start = it.start ? `&start=${it.start}` : "";
      media.innerHTML = `<iframe title="${escAttr(L(it, "caption"))}" src="https://www.youtube-nocookie.com/embed/${it.youtube_id}?autoplay=1&mute=1&rel=0&playsinline=1${start}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    } else {
      media.innerHTML = `<img src="${it.url}" alt="${escAttr(L(it, "caption"))}" />`;
    }
    setTxt("media-modal-caption", L(it, "caption"));
    setTxt("media-modal-credit", it.credit || "");
    setTxt("media-modal-counter", `${state.mediaModal.idx + 1} / ${items.length} · ${it.type === "video" ? t.label_video : t.label_photo}`);
    const solo = items.length < 2;
    document.getElementById("media-modal-prev").hidden = solo;
    document.getElementById("media-modal-next").hidden = solo;
  }

  function stepMediaModal(d) {
    if (!state.mediaModal) return;
    state.mediaModal.idx += d;
    renderMediaModal();
  }

  function closeMediaModal() {
    state.mediaModalOpen = false;
    state.mediaModal = null;
    const modal = document.getElementById("media-modal");
    if (modal) {
      modal.hidden = true;
      const media = document.getElementById("media-modal-media");
      if (media) media.innerHTML = ""; /* gỡ iframe/video để dừng hẳn khi đóng */
    }
  }

  /* ===========================================================================
   * TRẠM QUYẾT ĐỊNH ARTEMIS (Module 01)
   * =========================================================================== */

  function renderDecisionStation() {
    const t = tr();
    const ds = DATA.decision_station;

    setTxt("artemis-tag", t.artemis_tag);
    setTxt("artemis-title", L(ds, "title"));
    setTxt("artemis-subtitle", t.artemis_subtitle);
    setTxt("artemis-physics-callout", L(ds, "physics_callout"));
    setTxt("artemis-select-prompt", t.artemis_select_prompt);

    const selectedZone = ds.zones.find((z) => z.id === state.selectedZoneId) || ds.zones[1];

    const svgBox = document.getElementById("artemis-svg-container");
    if (svgBox) {
      svgBox.innerHTML = window.RelicDecisionStation.renderCrossSectionSVG(selectedZone, state.lang);
    }

    const btnsBox = document.getElementById("artemis-zone-buttons");
    if (btnsBox) {
      btnsBox.innerHTML = ds.zones
        .map(
          (z) => `
            <button type="button" class="zone" data-zone-id="${z.id}" aria-pressed="${z.id === selectedZone.id}"
              style="--zc: ${z.color_hex};">
              <span class="zone-d">${z.distance_label}</span>
              <span class="zone-s">${L(z, "status_badge")}</span>
            </button>
          `
        )
        .join("");

      btnsBox.querySelectorAll("[data-zone-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          // Trong popup Hồ sơ Khoa học: chỉ để khám phá — huy hiệu mở ở Game 5 (bản đồ 4 vùng)
          state.selectedZoneId = btn.getAttribute("data-zone-id");
          renderDecisionStation();
          const zId = state.selectedZoneId;
          const again = document.querySelector(`#artemis-zone-buttons [data-zone-id="${zId}"]`);
          if (again) again.focus();
        });
      });
    }

    const outcomeBox = document.getElementById("artemis-outcome-panel");
    if (outcomeBox) {
      outcomeBox.innerHTML = `
        <div class="outcome" style="--zc: ${selectedZone.color_hex};" aria-live="polite">
          <p class="outcome-status">${L(selectedZone, "status_badge")}</p>
          <p class="outcome-distance">${t.artemis_distance_label}: <span class="num">${selectedZone.distance_label}</span></p>
          <div class="outcome-cols">
            <section>
              <h3>${t.artemis_impact_label}</h3>
              <p>${L(selectedZone, "impact")}</p>
            </section>
            <section>
              <h3>${t.artemis_law_label}</h3>
              <p>${L(selectedZone, "law_citation")}</p>
            </section>
          </div>
          <div class="outcome-gate ${state.badgeUnlocked ? "is-open" : ""}">
            <p>${state.badgeUnlocked ? t.artemis_unlocked_msg : t.artemis_locked_msg}</p>
            ${state.badgeUnlocked ? `<a href="#guardian" id="artemis-go-guardian" class="btn-signal">${t.artemis_go_guardian}</a>` : ""}
          </div>
        </div>
      `;
    }
  }

  /* ===========================================================================
   * THẺ SPACE HERITAGE GUARDIAN (Module 02) — thẻ là vật thể nên giữ khung
   * =========================================================================== */

  function renderCertificateSection() {
    const t = tr();

    setTxt("cert-section-tag", t.cert_section_tag);
    setTxt("cert-section-title", t.cert_section_title);
    setTxt("cert-section-desc", t.cert_section_desc);
    setTxt("cert-step1-label", t.cert_step1_label);
    setTxt("cert-step2-label", t.cert_step2_label);
    setTxt("cert-privacy-note", t.cert_privacy_note);
    setTxt("cert-badge-header", t.cert_badge_header);
    setTxt("cert-badge-subheader", t.cert_badge_subheader);
    setTxt("cert-issued-to", t.cert_issued_to);
    setTxt("cert-stamps-title", t.cert_stamps_title);
    setTxt("cert-download-btn", t.cert_download_btn);
    setTxt("cert-print-btn", t.cert_print_btn);

    const nameInput = document.getElementById("guardian-name-input");
    if (nameInput) nameInput.placeholder = t.cert_input_placeholder;

    const lockBanner = document.getElementById("cert-lock-banner");
    if (lockBanner) {
      lockBanner.innerHTML = state.badgeUnlocked
        ? `<div class="gate is-open"><p>${t.artemis_unlocked_msg}</p></div>`
        : `<div class="gate">
             <p>${t.cert_locked_msg}</p>
             <button type="button" id="quick-unlock-cert-btn" class="btn-ghost">${t.cert_unlock_btn}</button>
           </div>`;
      const quickBtn = document.getElementById("quick-unlock-cert-btn");
      if (quickBtn) {
        quickBtn.addEventListener("click", () => {
          state.selectedZoneId = "zone-green";
          state.badgeUnlocked = true;
          saveProgress();
          renderDecisionStation();
          renderCertificateSection();
          renderArtemisGame();
          renderSignals();
          updateGates();
          notifyBook();
        });
      }
    }

    const pledgesContainer = document.getElementById("conservation-pledges-list");
    if (pledgesContainer) {
      pledgesContainer.innerHTML = t.cert_pledges
        .map(
          (pText, idx) => `
            <button type="button" class="pledge" role="radio" aria-checked="${state.selectedPledgeIndex === idx}" data-pledge-idx="${idx}">
              <span class="pledge-dot" aria-hidden="true"></span>
              <span>${pText}</span>
            </button>
          `
        )
        .join("");

      pledgesContainer.querySelectorAll("[data-pledge-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.getAttribute("data-pledge-idx"));
          state.selectedPledgeIndex = idx;
          renderCertificateSection();
          const again = document.querySelector(`#conservation-pledges-list [data-pledge-idx="${idx}"]`);
          if (again) again.focus();
        });
      });
    }

    setTxt("cert-preview-name", (state.guardianName || "").trim() || t.cert_default_name);
    setTxt("cert-preview-pledge", `“${t.cert_pledges[state.selectedPledgeIndex]}”`);

    const previewStampsEl = document.getElementById("cert-preview-stamps");
    if (previewStampsEl) {
      const stampItems = [
        { id: "apollo11-lrrr", label: "01: LRRR (MOON)" },
        { id: "surveyor-3", label: "02: SURVEYOR 3 (MOON)" },
        { id: "opportunity-rover", label: "03: OPPORTUNITY (MARS)" },
        { id: "ingenuity-helicopter", label: "04: INGENUITY (MARS)" }
      ];
      previewStampsEl.innerHTML = stampItems
        .map((st) => {
          const has = state.collectedStamps[st.id];
          return `
            <div class="px-3 py-2 rounded-lg border font-mono-tech text-xs font-bold flex items-center justify-between ${has
              ? "bg-[#E7F434]/15 border-[#E7F434] text-[#E7F434]"
              : "bg-slate-900/80 border-white/10 text-slate-400"}">
              <span>${st.label}</span>
              <span>${has ? "✓ VERIFIED" : "○ PENDING"}</span>
            </div>
          `;
        })
        .join("");
    }
  }

  /* ===========================================================================
   * GÓC GIÁO VIÊN (dòng thời gian 3 bước) + NGUỒN & KHAI BÁO SI
   * =========================================================================== */

  function renderClassroomAndFooter() {
    const t = tr();

    setTxt("teacher-tag", t.teacher_tag);
    setTxt("teacher-title", t.teacher_title);
    setTxt("teacher-desc", t.teacher_desc);

    const teacherList = document.getElementById("teacher-cards-grid");
    if (teacherList) {
      teacherList.innerHTML = t.teacher_cards
        .map(
          (c) => `
            <li class="timeline-step">
              <span class="timeline-time">${c.time}</span>
              <div>
                <h3>${c.topic}</h3>
                <p>${c.body}</p>
                <a class="link-quiet" href="${c.target}">${c.btn}</a>
              </div>
            </li>
          `
        )
        .join("");
    }

    setTxt("footer-sources-title", t.footer_sources_title);
    setTxt("footer-si-title", t.footer_si_title);
    setTxt("footer-si-btn", t.footer_si_btn);
    setTxt("footer-compliance-notice", t.footer_compliance_notice);
    setTxt("modal-si-title", t.footer_si_title);
    setTxt("close-si-modal-btn", t.si_close);

    const siTableHtml = `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th scope="col">${t.si_col_tool}</th>
              <th scope="col">${t.si_col_role}</th>
              <th scope="col">${t.si_col_human}</th>
            </tr>
          </thead>
          <tbody>
            ${DATA.meta.si_disclosure
              .map(
                (row) => `
                  <tr>
                    <td>${row.tool}</td>
                    <td>${L(row, "role")}</td>
                    <td>${L(row, "human_check")}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    const footerSiBox = document.getElementById("footer-si-table-box");
    if (footerSiBox) footerSiBox.innerHTML = siTableHtml;
    const modalSiBox = document.getElementById("modal-si-table-box");
    if (modalSiBox) modalSiBox.innerHTML = siTableHtml;
  }

  /* ===========================================================================
   * KHỞI ĐỘNG
   * =========================================================================== */

  function renderAll() {
    document.documentElement.lang = state.lang;
    renderHeaderStamps();
    renderFilterButtons();
    renderHeroSection();
    renderSignals();
    renderChapters();
    renderDecisionStation();
    renderArtemisGame();
    renderCertificateSection();
    renderClassroomAndFooter();
    renderSceneTitles();
    if (state.dossierOpen) renderDossierSheet();
    if (state.mediaModalOpen) renderMediaModal();
    setTxt("dossier-btn-label", state.dossierOpen ? tr().dossier_close : tr().dossier_btn);
    notifyBook();
  }

  function initApp() {
    renderAll();

    // Nút "Hồ sơ Khoa học" (góc dưới phải cảnh game) ⇄ X đóng, cùng một chỗ
    const dossierBtn = document.getElementById("dossier-btn");
    if (dossierBtn) dossierBtn.addEventListener("click", () => setDossierOpen(!state.dossierOpen));
    const artSkip = document.getElementById("artemis-game-skip");
    if (artSkip) artSkip.addEventListener("click", finishArtemis);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.dossierOpen && !state.mediaModalOpen) {
        e.preventDefault();
        setDossierOpen(false);
        if (dossierBtn) dossierBtn.focus();
      }
    });
    // Ảnh & video thật: mọi trigger (polaroid / thumbnail) đều mở modal qua ủy quyền
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-media-open]");
      if (!trigger) return;
      openMediaModal(trigger.getAttribute("data-media-open"), parseInt(trigger.getAttribute("data-media-idx") || "0", 10));
    });
    // Modal ảnh & video: Esc đóng, mũi tên chuyển mục
    document.addEventListener("keydown", (e) => {
      if (!state.mediaModalOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeMediaModal();
      } else if (e.key === "ArrowLeft") {
        stepMediaModal(-1);
      } else if (e.key === "ArrowRight") {
        stepMediaModal(1);
      }
    });
    // Đổi cảnh: đóng popup, cập nhật trạng thái game/thư cho CSS
    window.addEventListener("hashchange", () => {
      if (state.mediaModalOpen) closeMediaModal();
      if (state.dossierOpen) setDossierOpen(false);
      setTimeout(syncSceneView, 0);
    });
    setTimeout(syncSceneView, 0);

    ["en", "vi"].forEach((lang) => {
      const b = document.getElementById(`lang-btn-${lang}`);
      if (!b) return;
      b.addEventListener("click", () => {
        if (state.lang === lang) return;
        state.lang = lang;
        renderAll();
      });
    });

    // "Bật thu sóng": radar quét một lượt rồi chuyển sang cảnh 4 tín hiệu
    const tuneBtn = document.getElementById("tune-in-btn");
    if (tuneBtn) {
      tuneBtn.addEventListener("click", () => {
        state.receiverActive = true;
        const start = document.getElementById("scene-start");
        if (reduceMotion.matches || !start) {
          goScene("signals");
          return;
        }
        start.classList.remove("is-tuning");
        void start.offsetWidth; // chạy lại hiệu ứng nếu bấm lần nữa
        start.classList.add("is-tuning");
        tuneBtn.setAttribute("aria-busy", "true");
        window.setTimeout(() => {
          start.classList.remove("is-tuning");
          tuneBtn.removeAttribute("aria-busy");
          goScene("signals");
        }, 900);
      });
    }

    const nameInput = document.getElementById("guardian-name-input");
    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        state.guardianName = e.target.value;
        setTxt("cert-preview-name", (state.guardianName || "").trim() || tr().cert_default_name);
      });
    }

    const downloadBtn = document.getElementById("cert-download-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        window.RelicCertificate.downloadCertificatePNG(state);
      });
    }

    const printBtn = document.getElementById("cert-print-btn");
    if (printBtn) printBtn.addEventListener("click", () => window.print());

    // Cửa sổ khai báo SI: mở/đóng bằng nút, bấm nền hoặc phím Esc
    const siModal = document.getElementById("si-disclosure-modal");
    const openSiModalBtn = document.getElementById("footer-si-btn");
    const closeSiModalBtn = document.getElementById("close-si-modal-btn");
    const setSiOpen = (open) => {
      if (!siModal) return;
      state.siModalOpen = open;
      siModal.classList.toggle("hidden", !open);
      siModal.classList.toggle("flex", open);
      if (open && closeSiModalBtn) closeSiModalBtn.focus();
      if (!open && openSiModalBtn) openSiModalBtn.focus();
    };
    if (openSiModalBtn) openSiModalBtn.addEventListener("click", () => setSiOpen(true));
    if (closeSiModalBtn) closeSiModalBtn.addEventListener("click", () => setSiOpen(false));
    if (siModal) {
      siModal.addEventListener("click", (e) => {
        if (e.target === siModal) setSiOpen(false);
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.siModalOpen && !state.mediaModalOpen) setSiOpen(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
