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

  function collectStamp(artifactId) {
    if (!state.collectedStamps[artifactId]) {
      state.collectedStamps[artifactId] = true;
      renderHeaderStamps();
      renderCertificateSection();
      renderSignals();
      notifyBook();
    }
    renderStampHint(artifactId);
  }

  function renderStampHint(artifactId) {
    const el = document.getElementById(`stamp-status-${artifactId}`);
    if (!el) return;
    const t = tr();
    const has = state.collectedStamps[artifactId];
    el.textContent = has ? t.stamp_collected_badge : t.unlock_stamp_hint;
    el.classList.toggle("is-collected", has);
  }

  /** Thanh trên: 4 tem (máy tính) + "★ n/4" (mọi màn hình). */
  function renderHeaderStamps() {
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
          const name = L(art, "name");
          return `
            <button type="button" data-scroll-chapter="${art.id}"
              class="stamp-pill ${has ? "is-collected" : ""}" style="--c: ${planetColor(art)};"
              title="${name}"
              aria-label="${t.toc_chapter} ${n}: ${name}. ${has ? t.signal_stamp_done : t.signal_stamp_todo}">
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
        if (!art) return;
        if (state.filter !== "All") {
          state.filter = "All";
          renderFilterButtons();
          renderChapters();
          renderSignals();
          notifyBook();
        }
        goScene(sceneIdForArtifact(art));
      });
    });
  }

  /** Bộ lọc hành tinh (cảnh 4 tín hiệu) + trạng thái nút EN|VI. */
  function renderFilterButtons() {
    const t = tr();
    const filterContainer = document.getElementById("planet-filter-bar");
    if (filterContainer) {
      const filters = [
        { key: "All", label: t.filter_all },
        { key: "Moon", label: t.filter_moon },
        { key: "Mars", label: t.filter_mars }
      ];
      filterContainer.innerHTML = filters
        .map(
          (f) =>
            `<button type="button" class="seg-btn" data-filter-key="${f.key}" aria-pressed="${state.filter === f.key}">${f.label}</button>`
        )
        .join("");

      filterContainer.querySelectorAll("[data-filter-key]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const key = btn.getAttribute("data-filter-key");
          state.filter = key;
          renderFilterButtons();
          renderChapters();
          renderSignals();
          notifyBook();
          const again = document.querySelector(`#planet-filter-bar [data-filter-key="${key}"]`);
          if (again) again.focus();
        });
      });
    }

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
    setTxt("toc-filter-label", t.toc_filter_label);
    setTxt("signals-more-label", t.signals_more);

    const map = document.getElementById("signal-map");
    if (map) {
      const bodies = MAP_BODIES.map((b) => {
        const color = PLANET_COLOR[b.key];
        const dim = state.filter !== "All" && state.filter !== b.key;
        const pins = DATA.artifacts
          .filter((a) => a.celestial_body === b.key)
          .map((art) => {
            const c = parseCoords(art.location_name);
            if (!c) return "";
            const p = project(c.lat, c.lon, b.lon0, b.cx, b.cy, b.r);
            if (!p.visible) return "";
            const n = Number(art.chapter_num);
            const has = state.collectedStamps[art.id];
            const x = p.x.toFixed(1);
            const y = p.y.toFixed(1);
            return `
              <a class="map-pin" href="#${sceneIdForArtifact(art)}" aria-label="${t.toc_chapter} ${n}: ${L(art, "name")}">
                <circle class="pin-hit" cx="${x}" cy="${y}" r="44" />
                <circle cx="${x}" cy="${y}" r="34" fill="${color}" fill-opacity="0.13" />
                <circle class="pin-dot" cx="${x}" cy="${y}" r="20" fill="${has ? color : "#151622"}" stroke="${color}" stroke-width="3" />
                <text class="pin-num" x="${x}" y="${(p.y + 7).toFixed(1)}" text-anchor="middle" fill="${has ? "#151622" : color}">${n}</text>
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
      list.innerHTML = DATA.artifacts
        .filter((art) => state.filter === "All" || art.celestial_body === state.filter)
        .map((art) => {
          const n = Number(art.chapter_num);
          const has = state.collectedStamps[art.id];
          return `
            <li class="signal-item" style="--c: ${planetColor(art)};">
              <a href="#${sceneIdForArtifact(art)}">
                <span class="signal-num" aria-hidden="true">${n}</span>
                <span class="signal-name"><span class="sr-only">${t.toc_chapter} ${n}: </span>${L(art, "name")}</span>
                <span class="signal-where">${art.location_name}</span>
                <span class="signal-stamp ${has ? "is-collected" : ""}">
                  <span aria-hidden="true">${has ? "★" : "○"}</span>
                  <span class="sr-only">${has ? t.signal_stamp_done : t.signal_stamp_todo}</span>
                </span>
              </a>
            </li>
          `;
        })
        .join("");
    }

    const more = document.getElementById("signal-more");
    if (more) {
      more.innerHTML = [
        ["artemis", t.scene_title_artemis],
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

  function chapterHtml(art) {
    const t = tr();
    const isMoon = art.celestial_body === "Moon";
    const n = Number(art.chapter_num);
    const name = L(art, "name");
    const funcStatus = L(art, "functionality_status");
    const paramName = L(art.slider_config, "parameter_name");
    const currentVal = state.sliderValues[art.id];
    const activeTab = state.activeTabs[art.id] || "machine";
    const isOpen = !!state.openAccordions[art.id];
    const showMachine = activeTab === "machine" || activeTab === "both";
    const showDossier = activeTab === "dossier" || activeTab === "both";

    const nv = art.narrative_voice;
    const ad = art.archaeologist_dossier;
    const epNarrative = state.lang === "vi" ? `${nv.epistemic_label_en} • ${nv.epistemic_label_vi}` : nv.epistemic_label_en;
    const epDossier = state.lang === "vi" ? `${ad.epistemic_label_en} • ${ad.epistemic_label_vi}` : ad.epistemic_label_en;
    const discrepancyNote = L(ad, "discrepancy_note");

    const links = ad.source_links
      .map(
        (lnk) =>
          `<li><a href="${lnk.url}" target="_blank" rel="noopener noreferrer"><span>${lnk.label}</span><span aria-hidden="true">↗</span></a></li>`
      )
      .join("");

    const tabs = [
      ["machine", t.tab_machine],
      ["dossier", t.tab_dossier],
      ["both", t.view_both_btn]
    ]
      .map(
        ([key, label]) =>
          `<button type="button" class="seg-btn" data-tab-btn="${art.id}" data-tab-target="${key}" aria-pressed="${activeTab === key}">${label}</button>`
      )
      .join("");

    return `
      <article id="chapter-${art.id}" class="chapter" style="--c: ${planetColor(art)};">
        <header class="chapter-head">
          <span class="chapter-num" aria-hidden="true">${n}</span>
          <span class="chapter-world">${isMoon ? t.moon_badge : t.mars_badge}</span>
          <h2 class="chapter-name" data-scene-heading tabindex="-1"><span class="sr-only">${t.toc_chapter} ${n}: </span>${name}</h2>
          <dl class="chapter-facts">
            <div><dt>${t.cospar_label}</dt><dd class="num">${art.cospar_id}</dd></div>
            <div><dt>${t.location_label}</dt><dd>${art.location_name}</dd></div>
          </dl>
        </header>

        <section class="chapter-instrument instrument" aria-label="${t.telemetry_station_title}">
          <div class="instrument-view">
            <img src="${art.media.primary_image_url}" alt="" loading="lazy" onerror="this.style.display='none'"
              class="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity pointer-events-none" />
            <div id="svg-viewport-${art.id}" class="relative z-10 w-full h-full"></div>
            <div class="instrument-credit">${t.photo_credit}: ${art.media.image_credit}</div>
          </div>
          <div id="telemetry-metrics-${art.id}" class="readouts"></div>
          <div class="instrument-body">
            <p id="stamp-status-${art.id}" class="stamp-hint"></p>
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
                <ul class="link-list">${links}</ul>
              </div>
            </div>
          </div>
        </section>

        <div class="chapter-voices">
          <div class="segmented voice-switch" role="group" aria-label="${t.voice_switch_label}">${tabs}</div>

          <section id="panel-machine-${art.id}" class="voice-panel" ${showMachine ? "" : "hidden"}>
            <span class="epistemic">${epNarrative}</span>
            <p class="letter-route">${t.postmark_from} <strong>${art.location_name}</strong> ${t.postmark_to}</p>
            <blockquote class="letter">${L(nv, "letter")}</blockquote>
          </section>

          <section id="panel-dossier-${art.id}" class="voice-panel" ${showDossier ? "" : "hidden"}>
            <span class="epistemic epistemic--dossier">${epDossier}</span>
            <div class="dossier">
              <div>
                <h3>${t.dossier_sec1_title}</h3>
                <p>${L(ad, "how_it_operated")}</p>
              </div>
              <div>
                <h3>${t.dossier_sec2_title}</h3>
                <p class="dossier-state">${funcStatus}</p>
                <p>${discrepancyNote}</p>
              </div>
              <div>
                <h3>${t.dossier_sec3_title}</h3>
                <p>${L(ad, "conservation_law")}</p>
                <ul class="link-list">${links}</ul>
              </div>
            </div>
          </section>
        </div>
      </article>
    `;
  }

  /** Render một chương vào cảnh của nó và gắn sự kiện chỉ cho chương đó. */
  function renderChapter(art) {
    const slot = document.querySelector(`[data-chapter-slot="${art.id}"]`);
    if (!slot) return;
    slot.innerHTML = chapterHtml(art);
    updateChapterTelemetryDOM(art.id);
    renderStampHint(art.id);

    const slider = slot.querySelector("[data-artifact-slider]");
    if (slider) {
      slider.addEventListener("input", (e) => {
        state.sliderValues[art.id] = Number(e.target.value);
        collectStamp(art.id);
        updateChapterTelemetryDOM(art.id);
      });
    }

    slot.querySelectorAll("[data-artifact-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = Number(btn.getAttribute("data-preset-val"));
        state.sliderValues[art.id] = val;
        const s = document.getElementById(`slider-${art.id}`);
        if (s) s.value = val;
        collectStamp(art.id);
        updateChapterTelemetryDOM(art.id);
      });
    });

    const accBtn = slot.querySelector("[data-accordion-toggle]");
    if (accBtn) {
      accBtn.addEventListener("click", () => {
        const open = !state.openAccordions[art.id];
        state.openAccordions[art.id] = open;
        const bodyEl = document.getElementById(`accordion-body-${art.id}`);
        if (bodyEl) bodyEl.hidden = !open;
        accBtn.setAttribute("aria-expanded", String(open));
      });
    }

    slot.querySelectorAll("[data-tab-btn]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-tab-target");
        state.activeTabs[art.id] = target;
        renderChapter(art); // chỉ render lại chương này, cảnh hiện tại giữ nguyên
        const again = slot.querySelector(`[data-tab-btn][data-tab-target="${target}"]`);
        if (again) again.focus();
      });
    });
  }

  /** Render cả 4 chương; chương bị bộ lọc ẩn thì cảnh của nó gắn data-skip. */
  function renderChapters() {
    DATA.artifacts.forEach((art) => {
      const scene = document.getElementById(`scene-${sceneIdForArtifact(art)}`);
      const visible = state.filter === "All" || art.celestial_body === state.filter;
      if (scene) {
        if (visible) scene.removeAttribute("data-skip");
        else scene.setAttribute("data-skip", "");
      }
      renderChapter(art);
    });
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
          const zId = btn.getAttribute("data-zone-id");
          state.selectedZoneId = zId;
          const zObj = ds.zones.find((item) => item.id === zId);
          if (zObj && zObj.unlocks_badge) state.badgeUnlocked = true;
          renderDecisionStation();
          renderCertificateSection();
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
          renderDecisionStation();
          renderCertificateSection();
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
    renderCertificateSection();
    renderClassroomAndFooter();
    renderSceneTitles();
    notifyBook();
  }

  function initApp() {
    renderAll();

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
      if (e.key === "Escape" && state.siModalOpen) setSiOpen(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
