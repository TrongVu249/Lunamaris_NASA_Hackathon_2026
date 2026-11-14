/**
 * LUNAMARIS: Letters Across the Silent Seas
 * Main Application Controller (State, Bilingual UI, Scrollytelling Chapters, Filters & Modals)
 * NASA International Space Apps Challenge 2026
 */

(function () {
  const DATA = window.LUNAMARIS_DATA || window.RELIC_DATA;
  const I18N = window.UI_I18N;

  // Global Application State
  const state = {
    lang: "vi", // Default to Vietnamese ("vi") or toggleable to English ("en")
    filter: "All", // "All" | "Moon" | "Mars"
    receiverActive: true,
    sliderValues: {},
    activeTabs: {}, // "machine" | "dossier" | "both"
    openAccordions: {}, // boolean per artifact id
    collectedStamps: {
      "apollo11-lrrr": false,
      "surveyor-3": false,
      "opportunity-rover": false,
      "ingenuity-helicopter": false
    },
    selectedZoneId: "zone-orange", // Default to 180 m historical Apollo 12 comparison
    badgeUnlocked: false,
    selectedPledgeIndex: 0,
    guardianName: "",
    siModalOpen: false
  };

  // Initialize default slider values and tabs from RELIC_DATA
  DATA.artifacts.forEach((art) => {
    state.sliderValues[art.id] = art.slider_config.default_val;
    state.activeTabs[art.id] = "machine";
    state.openAccordions[art.id] = false;
  });

  /**
   * Collects a Mission Stamp for a chapter and updates Sticky Header & Certificate
   */
  function collectStamp(artifactId) {
    if (!state.collectedStamps[artifactId]) {
      state.collectedStamps[artifactId] = true;
      renderHeaderStamps();
      renderCertificateSection();
      renderTableOfContents();
      notifyBook();
    }
    const badgeEl = document.getElementById(`stamp-status-${artifactId}`);
    if (badgeEl) {
      const t = I18N[state.lang];
      badgeEl.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-tech font-bold bg-[#E7F434]/20 text-[#E7F434] border border-[#E7F434]/50">${t.stamp_collected_badge}</span>`;
    }
  }

  /**
   * Renders the Sticky Header (Mission Stamps, Planet Filter, EN/VI Toggle)
   */
  function renderHeaderStamps() {
    const t = I18N[state.lang];
    const navStampsLabel = document.getElementById("nav-stamps-label");
    if (navStampsLabel) navStampsLabel.textContent = t.nav_stamps_label;

    const stampShortNames = {
      "apollo11-lrrr": "01 LRRR",
      "surveyor-3": "02 Surveyor 3",
      "opportunity-rover": "03 Opportunity",
      "ingenuity-helicopter": "04 Ingenuity"
    };

    const container = document.getElementById("mission-stamps-bar");
    if (container) {
      const collectedCount = Object.values(state.collectedStamps).filter(Boolean).length;
      // Máy tính: 4 tem bấm được để lật tới chương. Điện thoại/máy tính bảng: chỉ còn "★ n/4" (mở Mục lục).
      container.innerHTML = DATA.artifacts
        .map((art) => {
          const isCollected = state.collectedStamps[art.id];
          return `
            <button
              type="button"
              data-scroll-chapter="${art.id}"
              title="${state.lang === "vi" ? art.name_vi : art.name_en}"
              class="stamp-pill px-2.5 rounded-md border text-xs font-mono-tech font-bold transition-all duration-200 ${isCollected
              ? "mission-stamp-collected"
              : "opacity-50 border-slate-600 text-slate-300 hover:opacity-80 bg-slate-900/60"
            }"
            >
              <span aria-hidden="true">${isCollected ? "★" : "○"}</span>
              <span>${stampShortNames[art.id]}</span>
            </button>
          `;
        })
        .join("") +
        `<a href="#toc" class="stamp-count" title="${t.nav_stamps_label}" aria-label="${t.nav_stamps_label}: ${collectedCount}/4"><span aria-hidden="true">★</span>${collectedCount}/4</a>`;

      container.querySelectorAll("[data-scroll-chapter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetId = btn.getAttribute("data-scroll-chapter");
          const art = DATA.artifacts.find((a) => a.id === targetId);
          if (!art) return;
          if (state.filter !== "All") {
            state.filter = "All";
            renderFilterButtons();
            renderChapters();
            renderTableOfContents();
            notifyBook();
          }
          goScene(sceneIdForArtifact(art));
        });
      });
    }
  }

  function renderFilterButtons() {
    const t = I18N[state.lang];
    const filterContainer = document.getElementById("planet-filter-bar");
    if (!filterContainer) return;

    const filters = [
      { key: "All", label: t.filter_all },
      { key: "Moon", label: t.filter_moon },
      { key: "Mars", label: t.filter_mars }
    ];

    filterContainer.innerHTML = filters
      .map((f) => {
        const active = state.filter === f.key;
        return `
          <button
            type="button"
            data-filter-key="${f.key}"
            aria-pressed="${active}"
            class="px-2.5 rounded text-xs font-mono-tech font-semibold transition-all ${active
            ? "bg-[#E7F434] text-[#151622] font-bold shadow-sm"
            : "text-slate-300 hover:text-white hover:bg-white/10"
          }"
          >
            ${f.label}
          </button>
        `;
      })
      .join("");

    filterContainer.querySelectorAll("[data-filter-key]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.filter = btn.getAttribute("data-filter-key");
        renderFilterButtons();
        renderChapters();
        renderTableOfContents();
        notifyBook();
      });
    });

    // Update language toggle button state
    const langEnBtn = document.getElementById("lang-btn-en");
    const langViBtn = document.getElementById("lang-btn-vi");
    if (langEnBtn && langViBtn) {
      langEnBtn.className = `px-2 py-1 text-xs font-mono-tech font-bold rounded transition ${state.lang === "en" ? "bg-[#38BDF8] text-[#151622]" : "text-slate-400 hover:text-white"
        }`;
      langViBtn.className = `px-2 py-1 text-xs font-mono-tech font-bold rounded transition ${state.lang === "vi" ? "bg-[#38BDF8] text-[#151622]" : "text-slate-400 hover:text-white"
        }`;
    }
  }

  /**
   * Renders Hero Section (Hanoi Ground Receiving Station Anchor & Intro Hook)
   */
  function renderHeroSection() {
    const t = I18N[state.lang];
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setTxt("hero-badge-text", t.hero_badge);
    setTxt("hero-main-title", t.hero_title);
    setTxt("hero-subtitle", t.hero_subtitle);
    setTxt("hero-station-line1", t.hero_station_line1);
    setTxt("hero-station-line2", t.hero_station_line2);
    setTxt("hero-receiver-label", t.hero_receiver_label);
    setTxt("hero-hook-text", t.hero_hook);
    setTxt("cta-tune-in-btn", t.book_open);
    setTxt("cta-artemis-btn", t.cta_artemis);
    setTxt("cover-swipe-hint", t.swipe_hint);

    const receiverBtn = document.getElementById("receiver-toggle-btn");
    if (receiverBtn) {
      receiverBtn.innerHTML = state.receiverActive
        ? `<span class="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping"></span><span class="w-2.5 h-2.5 rounded-full bg-[#10B981] -ml-2.5"></span><span>${t.hero_receiver_on}</span>`
        : `<span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span>${t.hero_receiver_off}</span>`;
    }
  }

  /**
   * Updates only the dynamic telemetry & SVG inside a single chapter when dragging its slider
   */
  function updateChapterTelemetryDOM(artifactId) {
    const art = DATA.artifacts.find((a) => a.id === artifactId);
    if (!art) return;

    const currentVal = state.sliderValues[artifactId];
    const evalResult = window.RelicSVGEngine.evaluateArtifact(artifactId, currentVal, state.lang);

    // 1. Update SVG Overlay Viewport
    const svgContainer = document.getElementById(`svg-viewport-${artifactId}`);
    if (svgContainer) {
      svgContainer.innerHTML = evalResult.svg;
    }

    // 2. Update Live Telemetry Readout Cards
    const metricsContainer = document.getElementById(`telemetry-metrics-${artifactId}`);
    if (metricsContainer) {
      metricsContainer.innerHTML = evalResult.metrics
        .map(
          (m) => `
          <div class="surface-subcard rounded-xl p-3 border border-white/10">
            <div class="text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider">${m.label}</div>
            <div class="text-lg md:text-xl font-mono-tech font-bold text-[#E7F434] mt-0.5">${m.value}</div>
            <div class="text-[11px] font-mono-tech text-slate-400 mt-0.5">${m.sub}</div>
          </div>
        `
        )
        .join("");
    }

    // 3. Update Status Text & Matching Preset Stop Description
    const statusBox = document.getElementById(`telemetry-status-${artifactId}`);
    const stops = art.slider_config.stops;
    // Find closest stop for contextual description
    let closestStop = stops[0];
    let minDiff = Infinity;
    stops.forEach((st) => {
      const diff = Math.abs(Number(st.value) - Number(currentVal));
      if (diff < minDiff) {
        minDiff = diff;
        closestStop = st;
      }
    });

    if (statusBox) {
      const stopDesc = state.lang === "vi" ? closestStop.desc_vi : closestStop.desc_en;
      statusBox.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <span class="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#38BDF8]">
            ${evalResult.statusText}
          </span>
          <span class="text-xs font-mono-tech px-2 py-0.5 rounded bg-white/10 text-[#E7F434]">
            ${art.slider_config.unit}: ${currentVal}
          </span>
        </div>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${stopDesc}</p>
      `;
    }

    // 4. Highlight active preset button if slider matches a stop value
    const presetContainer = document.getElementById(`preset-btns-${artifactId}`);
    if (presetContainer) {
      presetContainer.querySelectorAll("[data-preset-val]").forEach((btn) => {
        const bVal = Number(btn.getAttribute("data-preset-val"));
        const isMatch = Math.abs(bVal - Number(currentVal)) < 0.05;
        btn.className = `px-3 py-2 rounded-lg text-xs font-mono-tech font-semibold transition-all border text-left ${isMatch
            ? "bg-[#E7F434] text-[#151622] border-[#E7F434] font-bold shadow-md"
            : "bg-[#151622]/90 text-slate-200 border-white/15 hover:border-[#E7F434]/60 hover:text-[#E7F434]"
          }`;
      });
    }
  }

  /* ===========================================================================
   * BOOK HELPERS — liên kết app.js với js/book.js (quyển sách lật trang)
   * =========================================================================== */

  /** Id trang sách của một chương: "ch1"…"ch4" (lấy từ chapter_num, không viết cứng). */
  function sceneIdForArtifact(art) {
    return `ch${Number(art.chapter_num)}`;
  }

  /** Lật tới một trang; nếu book.js chưa chạy thì cuộn tới trang đó như web cũ. */
  function goScene(sceneId) {
    if (window.LunamarisBook && window.LunamarisBook.goTo(sceneId)) return;
    const el = document.getElementById(`scene-${sceneId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /** Báo book.js tính lại thứ tự trang, số trang, tiêu đề chạy. */
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

  /** Ghi tiêu đề (theo ngôn ngữ) lên từng trang để book.js hiện ở thanh trên và chấm tiến độ. */
  function renderSceneTitles() {
    const t = I18N[state.lang];
    const setTitle = (sceneId, text, num) => {
      const scene = document.getElementById(`scene-${sceneId}`);
      if (!scene) return;
      scene.setAttribute("data-title", text || "");
      if (num) scene.setAttribute("data-title-num", num);
      else scene.removeAttribute("data-title-num");
    };

    setTitle("cover", t.scene_title_cover);
    setTitle("toc", t.scene_title_toc);
    DATA.artifacts.forEach((art) => {
      setTitle(
        sceneIdForArtifact(art),
        state.lang === "vi" ? art.name_vi : art.name_en,
        `${t.toc_chapter} ${Number(art.chapter_num)}`
      );
    });
    setTitle("artemis", t.scene_title_artemis);
    setTitle("guardian", t.scene_title_guardian);
    setTitle("teacher", t.scene_title_teacher);
    setTitle("sources", t.scene_title_sources);
  }

  /** Trang Mục lục: Phần I Mặt Trăng, Phần II Sao Hỏa, rồi các trang sau những lá thư. */
  function renderTableOfContents() {
    const t = I18N[state.lang];
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setTxt("toc-title", t.toc_title);
    setTxt("toc-filter-label", t.toc_filter_label);

    const list = document.getElementById("toc-list");
    if (!list) return;

    const chapterEntry = (art) => {
      const n = Number(art.chapter_num);
      const has = state.collectedStamps[art.id];
      const name = state.lang === "vi" ? art.name_vi : art.name_en;
      return `
        <li>
          <a class="toc-entry" href="#${sceneIdForArtifact(art)}">
            <span class="toc-num" aria-hidden="true">${n}</span>
            <span class="toc-name"><span class="toc-name-text"><span class="sr-only">${t.toc_chapter} ${n}: </span>${name}</span></span>
            <span class="toc-page" data-page-of="${sceneIdForArtifact(art)}"></span>
            <span class="toc-meta">${art.location_name}<br /><span class="${has ? "toc-stamp-done" : ""}">${has ? t.toc_stamp_done : t.toc_stamp_todo}</span></span>
          </a>
        </li>
      `;
    };

    const plainEntry = (sceneId, glyph, title, desc) => `
      <li>
        <a class="toc-entry toc-entry--plain" href="#${sceneId}">
          <span class="toc-num" aria-hidden="true">${glyph}</span>
          <span class="toc-name"><span class="toc-name-text">${title}</span></span>
          <span class="toc-page" data-page-of="${sceneId}"></span>
          <span class="toc-meta">${desc}</span>
        </a>
      </li>
    `;

    const parts = [
      { key: "Moon", title: t.toc_part_moon, color: "#38BDF8" },
      { key: "Mars", title: t.toc_part_mars, color: "#F97316" }
    ].filter((p) => state.filter === "All" || state.filter === p.key);

    list.innerHTML =
      parts
        .map(
          (p) => `
          <section class="toc-part" style="--part-color: ${p.color};">
            <h3 class="toc-part-title">${p.title}</h3>
            <ol class="toc-entries">
              ${DATA.artifacts.filter((a) => a.celestial_body === p.key).map(chapterEntry).join("")}
            </ol>
          </section>
        `
        )
        .join("") +
      `
        <section class="toc-part toc-part--after">
          <h3 class="toc-part-title">${t.toc_part_after}</h3>
          <ul class="toc-entries">
            ${plainEntry("artemis", "🚀", t.scene_title_artemis, t.toc_artemis_desc)}
            ${plainEntry("guardian", "🛡️", t.scene_title_guardian, t.toc_guardian_desc)}
            ${plainEntry("teacher", "🍎", t.scene_title_teacher, t.toc_teacher_desc)}
            ${plainEntry("sources", "📚", t.scene_title_sources, t.toc_sources_desc)}
          </ul>
        </section>
      `;
  }

  /* ===========================================================================
   * 4 CHƯƠNG DI VẬT — mỗi chương là một trang sách đôi:
   *   trái = lá thư / hồ sơ (hai giọng kể), phải = trạm đo xa tương tác.
   *   Điện thoại: 1 cột, thư trước, trạm sau.
   * =========================================================================== */

  function chapterHtml(art) {
    const t = I18N[state.lang];
    const isMoon = art.celestial_body === "Moon";
    const n = Number(art.chapter_num);
    const bodyBadgeClass = isMoon
      ? "bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/40"
      : "bg-[#F97316]/15 text-[#F97316] border-[#F97316]/40";
    const bodyBadgeLabel = isMoon ? t.moon_badge : t.mars_badge;

    const name = state.lang === "vi" ? art.name_vi : art.name_en;
    const funcStatus = state.lang === "vi" ? art.functionality_status_vi : art.functionality_status_en;
    const paramName =
      state.lang === "vi" ? art.slider_config.parameter_name_vi : art.slider_config.parameter_name_en;
    const currentVal = state.sliderValues[art.id];
    const isCollected = state.collectedStamps[art.id];
    const activeTab = state.activeTabs[art.id] || "machine";
    const isAccordionOpen = !!state.openAccordions[art.id];

    const epNarrative =
      state.lang === "vi"
        ? `${art.narrative_voice.epistemic_label_en} • ${art.narrative_voice.epistemic_label_vi}`
        : art.narrative_voice.epistemic_label_en;
    const epDossier =
      state.lang === "vi"
        ? `${art.archaeologist_dossier.epistemic_label_en} • ${art.archaeologist_dossier.epistemic_label_vi}`
        : art.archaeologist_dossier.epistemic_label_en;

    const letterText = state.lang === "vi" ? art.narrative_voice.letter_vi : art.narrative_voice.letter_en;
    const howOperated =
      state.lang === "vi" ? art.archaeologist_dossier.how_it_operated_vi : art.archaeologist_dossier.how_it_operated_en;
    const conservationLaw =
      state.lang === "vi"
        ? art.archaeologist_dossier.conservation_law_vi
        : art.archaeologist_dossier.conservation_law_en;
    const discrepancyNote =
      state.lang === "vi"
        ? art.archaeologist_dossier.discrepancy_note_vi
        : art.archaeologist_dossier.discrepancy_note_en;

    const stampBadge = isCollected
      ? `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-tech font-bold bg-[#E7F434]/20 text-[#E7F434] border border-[#E7F434]/50">${t.stamp_collected_badge}</span>`
      : `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-tech text-slate-400 bg-slate-900/80 border border-white/10">○ ${t.unlock_stamp_hint}</span>`;

    const sourceLinks = (cls) =>
      art.archaeologist_dossier.source_links
        .map(
          (lnk) => `
            <a href="${lnk.url}" target="_blank" rel="noopener noreferrer" class="${cls}">
              <span>${lnk.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          `
        )
        .join("");

    return `
      <article id="chapter-${art.id}" class="chapter" style="--plate-color: ${isMoon ? "#38BDF8" : "#F97316"};">
        <!-- Bảng tên chương -->
        <header class="chapter-plate">
          <span class="chapter-numeral" aria-hidden="true">${n}</span>
          <span class="chapter-kicker">${t.toc_chapter} ${n}</span>
          <h2 class="chapter-name" data-scene-heading tabindex="-1">${name}</h2>
          <div class="chapter-meta font-mono-tech">
            <span class="px-2.5 py-1 rounded-md font-bold border ${bodyBadgeClass}">${bodyBadgeLabel}</span>
            <span class="text-slate-400"><strong class="text-slate-200">${t.cospar_label}</strong> ${art.cospar_id}</span>
            <span class="text-slate-300"><span class="text-slate-400">${t.location_label}</span> ${art.location_name}</span>
            <span class="text-[#10B981] font-semibold"><span class="text-slate-400">${t.status_label}</span> ${funcStatus}</span>
            <span id="stamp-status-${art.id}">${stampBadge}</span>
          </div>
          <!-- Dấu bưu điện: gửi từ ${isMoon ? "Mặt Trăng" : "Sao Hỏa"}, nhận ở trạm Hà Nội -->
          <svg class="chapter-postmark" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="2.5" />
            <circle cx="50" cy="50" r="37" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" />
            <text x="50" y="45" text-anchor="middle" font-family="Fira Sans, sans-serif" font-weight="800" font-size="11" fill="currentColor">${isMoon ? t.pm_planet_moon : t.pm_planet_mars}</text>
            <text x="50" y="59" text-anchor="middle" font-family="Fira Sans, sans-serif" font-weight="700" font-size="9" fill="currentColor">${t.pm_to}</text>
            <text x="50" y="71" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7" fill="currentColor">21.03°N 105.85°E</text>
          </svg>
        </header>

        <div class="spread">
          <!-- TRANG TRÁI: hai giọng kể -->
          <div class="spread-page space-y-4">
            <div class="voice-tabs bg-[#151622] p-1.5 rounded-xl border border-white/10" role="group">
              <button type="button" data-tab-btn="${art.id}" data-tab-target="machine" aria-pressed="${activeTab === "machine"}"
                class="flex-1 min-h-[44px] px-3 rounded-lg text-xs font-mono-tech font-bold transition ${activeTab === "machine"
                  ? "bg-[#38BDF8] text-[#151622] shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/5"}">
                ${t.tab_machine}
              </button>
              <button type="button" data-tab-btn="${art.id}" data-tab-target="dossier" aria-pressed="${activeTab === "dossier"}"
                class="flex-1 min-h-[44px] px-3 rounded-lg text-xs font-mono-tech font-bold transition ${activeTab === "dossier"
                  ? "bg-[#10B981] text-[#151622] shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/5"}">
                ${t.tab_dossier}
              </button>
              <button type="button" data-tab-btn="${art.id}" data-tab-target="both" aria-pressed="${activeTab === "both"}"
                class="min-h-[44px] px-3 rounded-lg text-xs font-mono-tech font-semibold transition ${activeTab === "both"
                  ? "bg-[#E7F434] text-[#151622] font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5"}">
                ${t.view_both_btn}
              </button>
            </div>

            <!-- [📡 The Machine's Pulse] -->
            <div id="panel-machine-${art.id}"
              class="${activeTab === "machine" || activeTab === "both" ? "block" : "hidden"} cosmic-postcard rounded-xl p-5 sm:p-6 space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono-tech font-bold bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40">
                  <span aria-hidden="true">📡</span>
                  <span>[${epNarrative}]</span>
                </span>
                <span class="text-[11px] font-mono-tech text-slate-400">COSPAR ${art.cospar_id.split(" ")[0]}</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-lg bg-slate-950/60 border border-white/10 text-[11px] font-mono-tech">
                <div class="min-w-0">
                  <span class="text-slate-400">${t.postmark_from}</span>
                  <div class="text-slate-200 font-semibold truncate">${art.location_name}</div>
                </div>
                <div>
                  <span class="text-slate-400">${t.postmark_to}</span>
                  <div class="text-[#E7F434] font-semibold">21.0285° N, 105.8542° E</div>
                </div>
              </div>

              <blockquote class="text-base sm:text-[17px] text-slate-100 leading-relaxed font-body italic border-l-3 border-[#38BDF8] pl-4 py-1">
                “${letterText}”
              </blockquote>
            </div>

            <!-- [🏛️ Archaeologist & Science Dossier] -->
            <div id="panel-dossier-${art.id}"
              class="${activeTab === "dossier" || activeTab === "both" ? "block" : "hidden"} surface-subcard rounded-xl p-5 sm:p-6 space-y-5 border border-[#10B981]/30">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono-tech font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40">
                  <span aria-hidden="true">🏛️</span>
                  <span>[${epDossier}]</span>
                </span>
              </div>

              <div class="space-y-1.5">
                <h3 class="text-xs sm:text-sm font-mono-tech font-bold text-[#38BDF8] flex items-center gap-2">
                  <span aria-hidden="true">🔬</span><span>${t.dossier_sec1_title}</span>
                </h3>
                <p class="text-sm text-slate-200 leading-relaxed">${howOperated}</p>
              </div>

              <div class="space-y-1.5 pt-3 border-t border-white/10">
                <h3 class="text-xs sm:text-sm font-mono-tech font-bold text-[#E7F434] flex items-center gap-2">
                  <span aria-hidden="true">⚙️</span><span>${t.dossier_sec2_title}</span>
                </h3>
                <div class="inline-block px-2.5 py-0.5 rounded bg-white/10 text-xs font-mono-tech text-[#E7F434] font-semibold mb-1">${funcStatus}</div>
                <p class="text-sm text-slate-300 leading-relaxed">${discrepancyNote}</p>
              </div>

              <div class="space-y-1.5 pt-3 border-t border-white/10">
                <h3 class="text-xs sm:text-sm font-mono-tech font-bold text-[#10B981] flex items-center gap-2">
                  <span aria-hidden="true">⚖️</span><span>${t.dossier_sec3_title}</span>
                </h3>
                <p class="text-sm text-slate-200 leading-relaxed">${conservationLaw}</p>
                <div class="pt-2 flex flex-wrap gap-2">
                  ${sourceLinks("inline-flex items-center gap-1.5 px-3 min-h-[40px] rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono-tech text-[#38BDF8] border border-[#38BDF8]/30 transition")}
                </div>
              </div>
            </div>
          </div>

          <!-- TRANG PHẢI: trạm đo xa tương tác -->
          <div class="spread-page space-y-4">
            <h3 class="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#38BDF8] flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#E7F434]" aria-hidden="true"></span>
              ${t.telemetry_station_title}
            </h3>

            <div class="relative rounded-xl overflow-hidden border border-white/15 bg-[#0D101B] aspect-[16/9]">
              <img src="${art.media.primary_image_url}" alt="${name}" loading="lazy" onerror="this.style.display='none'"
                class="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity pointer-events-none" />
              <div id="svg-viewport-${art.id}" class="relative z-10 w-full h-full"></div>
              <div class="absolute bottom-0 inset-x-0 z-20 bg-slate-950/85 backdrop-blur-xs px-3 py-1 border-t border-white/10">
                <span class="block text-[10px] font-mono-tech text-slate-300 truncate">📷 Photo Credit: ${art.media.image_credit}</span>
              </div>
            </div>

            <div id="telemetry-metrics-${art.id}" class="grid grid-cols-3 gap-2"></div>

            <div class="surface-subcard rounded-xl p-4 space-y-3 border border-white/10">
              <label for="slider-${art.id}" class="block text-xs sm:text-sm font-mono-tech font-bold text-white">
                🎚️ ${paramName}
              </label>
              <input id="slider-${art.id}" type="range"
                min="${art.slider_config.min_val}" max="${art.slider_config.max_val}"
                step="${art.slider_config.step}" value="${currentVal}"
                data-artifact-slider="${art.id}"
                class="telemetry-slider ${isMoon ? "" : "mars-slider"}" />

              <div class="pt-1">
                <div class="text-[11px] font-mono-tech text-slate-400 mb-2">${t.preset_label}</div>
                <div id="preset-btns-${art.id}" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  ${art.slider_config.stops
                    .map(
                      (st) => `
                        <button type="button" data-artifact-preset="${art.id}" data-preset-val="${st.value}"
                          class="min-h-[44px] px-3 py-2 rounded-lg text-xs font-mono-tech font-semibold transition-all border text-left">
                          ⚡ ${state.lang === "vi" ? st.label_vi : st.label_en}
                        </button>
                      `
                    )
                    .join("")}
                </div>
              </div>

              <div id="telemetry-status-${art.id}" class="p-3 rounded-lg bg-slate-950/75 border border-white/10" aria-live="polite"></div>

              <div class="pt-1">
                <button type="button" data-accordion-toggle="${art.id}" aria-expanded="${isAccordionOpen}" aria-controls="accordion-body-${art.id}"
                  class="w-full min-h-[44px] flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg bg-[#1B2B85]/40 hover:bg-[#1B2B85]/65 border border-[#38BDF8]/35 text-xs font-mono-tech font-bold text-[#38BDF8] text-left transition">
                  <span>${t.where_number_btn}</span>
                  <span id="accordion-icon-${art.id}" aria-hidden="true">${isAccordionOpen ? "▲" : "▼"}</span>
                </button>
                <div id="accordion-body-${art.id}"
                  class="${isAccordionOpen ? "block" : "hidden"} mt-2 p-3.5 rounded-lg bg-slate-950/90 border border-[#38BDF8]/30 space-y-2.5 text-xs">
                  <div class="font-mono-tech font-bold text-[#E7F434]">📐 ${t.where_number_formula_title}</div>
                  <p class="text-slate-300 leading-relaxed">${discrepancyNote}</p>
                  <div class="pt-1 border-t border-white/10">
                    <div class="font-mono-tech text-[11px] text-slate-400 mb-1.5">${t.where_number_sources_title}</div>
                    <div class="flex flex-col gap-1.5">
                      ${sourceLinks("inline-flex items-center gap-1.5 min-h-[32px] text-[#38BDF8] hover:text-[#E7F434] font-mono-tech underline break-all")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  /** Render một chương vào ô của nó trong trang sách và gắn sự kiện chỉ cho chương đó. */
  function renderChapter(art) {
    const slot = document.querySelector(`[data-chapter-slot="${art.id}"]`);
    if (!slot) return;
    slot.innerHTML = chapterHtml(art);
    updateChapterTelemetryDOM(art.id);

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
        state.openAccordions[art.id] = !state.openAccordions[art.id];
        const open = state.openAccordions[art.id];
        const bodyEl = document.getElementById(`accordion-body-${art.id}`);
        const icon = document.getElementById(`accordion-icon-${art.id}`);
        if (bodyEl) bodyEl.classList.toggle("hidden", !open);
        if (icon) icon.textContent = open ? "▲" : "▼";
        accBtn.setAttribute("aria-expanded", String(open));
      });
    }

    slot.querySelectorAll("[data-tab-btn]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-tab-target");
        state.activeTabs[art.id] = target;
        renderChapter(art); // chỉ render lại chương này, trang sách hiện tại giữ nguyên
        const again = slot.querySelector(`[data-tab-btn][data-tab-target="${target}"]`);
        if (again) again.focus();
      });
    });
  }

  /** Render cả 4 chương; chương bị bộ lọc hành tinh ẩn thì trang của nó gắn data-skip. */
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

  /** Tên cũ — giữ để các chỗ gọi cũ vẫn chạy. */
  function renderChaptersList() {
    renderChapters();
  }

  /**
   * Renders Module 1: The Artemis Landing Site Decision Station
   */
  function renderDecisionStation() {
    const t = I18N[state.lang];
    const ds = DATA.decision_station;

    const tagEl = document.getElementById("artemis-tag");
    const titleEl = document.getElementById("artemis-title");
    const subEl = document.getElementById("artemis-subtitle");
    const calloutEl = document.getElementById("artemis-physics-callout");
    const promptEl = document.getElementById("artemis-select-prompt");

    if (tagEl) tagEl.textContent = t.artemis_tag;
    if (titleEl) titleEl.textContent = state.lang === "vi" ? ds.title_vi : ds.title_en;
    if (subEl) subEl.textContent = t.artemis_subtitle;
    if (calloutEl) calloutEl.textContent = state.lang === "vi" ? ds.physics_callout_vi : ds.physics_callout_en;
    if (promptEl) promptEl.textContent = t.artemis_select_prompt;

    const selectedZone = ds.zones.find((z) => z.id === state.selectedZoneId) || ds.zones[1];

    // Render SVG Cross-Section
    const svgBox = document.getElementById("artemis-svg-container");
    if (svgBox) {
      svgBox.innerHTML = window.RelicDecisionStation.renderCrossSectionSVG(selectedZone, state.lang);
    }

    // Render 4 Zone Selection Buttons
    const btnsBox = document.getElementById("artemis-zone-buttons");
    if (btnsBox) {
      btnsBox.innerHTML = ds.zones
        .map((z) => {
          const isSelected = z.id === selectedZone.id;
          return `
            <button
              type="button"
              data-zone-id="${z.id}"
              style="border-color: ${isSelected ? z.color_hex : "rgba(255,255,255,0.15)"};"
              class="p-3.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${isSelected ? "bg-slate-900 shadow-lg scale-[1.01]" : "bg-[#151622]/80 hover:bg-slate-900/60 opacity-85"
            }"
            >
              <div class="flex items-center justify-between gap-2 w-full">
                <span class="font-mono-tech text-xs sm:text-sm font-bold" style="color: ${z.color_hex};">
                  [${z.distance_label}]
                </span>
                <span class="w-3 h-3 rounded-full" style="background-color: ${z.color_hex};"></span>
              </div>
              <div class="mt-1.5 text-[11px] font-mono-tech text-slate-300">
                ${state.lang === "vi" ? z.status_badge_vi : z.status_badge_en}
              </div>
            </button>
          `;
        })
        .join("");

      btnsBox.querySelectorAll("[data-zone-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const zId = btn.getAttribute("data-zone-id");
          state.selectedZoneId = zId;
          const zObj = ds.zones.find((item) => item.id === zId);
          if (zObj && zObj.unlocks_badge) {
            state.badgeUnlocked = true;
          }
          renderDecisionStation();
          renderCertificateSection();
        });
      });
    }

    // Render Selected Zone Consequence & Legal Citation Panel
    const outcomeBox = document.getElementById("artemis-outcome-panel");
    if (outcomeBox) {
      const statusBadge = state.lang === "vi" ? selectedZone.status_badge_vi : selectedZone.status_badge_en;
      const impactTxt = state.lang === "vi" ? selectedZone.impact_vi : selectedZone.impact_en;
      const lawTxt = state.lang === "vi" ? selectedZone.law_citation_vi : selectedZone.law_citation_en;

      outcomeBox.innerHTML = `
        <div class="p-5 rounded-xl bg-slate-950/90 border-2 space-y-4" style="border-color: ${selectedZone.color_hex};">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span
              class="px-3 py-1 rounded-md font-mono-tech text-xs sm:text-sm font-bold text-slate-950"
              style="background-color: ${selectedZone.color_hex};"
            >
              [${statusBadge}]
            </span>
            <span class="font-mono-tech text-xs text-slate-400">
              Touchdown Distance: <strong class="text-white">${selectedZone.distance_label}</strong>
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div class="p-3.5 rounded-lg bg-slate-900/90 border border-white/10">
              <div class="text-xs font-mono-tech font-bold uppercase text-[#E7F434] mb-1">
                💥 ${t.artemis_impact_label}
              </div>
              <p class="text-sm text-slate-200 leading-relaxed">${impactTxt}</p>
            </div>
            <div class="p-3.5 rounded-lg bg-slate-900/90 border border-white/10">
              <div class="text-xs font-mono-tech font-bold uppercase text-[#38BDF8] mb-1">
                ⚖️ ${t.artemis_law_label}
              </div>
              <p class="text-sm text-slate-200 leading-relaxed">${lawTxt}</p>
            </div>
          </div>

          <div class="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div class="text-xs sm:text-sm font-mono-tech ${state.badgeUnlocked ? "text-[#10B981] font-bold" : "text-amber-300"
        }">
              ${state.badgeUnlocked ? t.artemis_unlocked_msg : t.artemis_locked_msg}
            </div>
            ${state.badgeUnlocked
          ? `<a href="#guardian" id="artemis-go-guardian" class="btn-primary w-full sm:w-auto">${t.artemis_go_guardian}</a>`
          : ""}
          </div>
        </div>
      `;
    }
  }

  /**
   * Renders Module 2: Zero-PII "Space Heritage Guardian" Certificate & 15-Minute Teacher Guide
   */
  function renderCertificateSection() {
    const t = I18N[state.lang];
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

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
    if (nameInput) {
      nameInput.placeholder = t.cert_input_placeholder;
    }

    // Lock / Unlock Banner
    const lockBanner = document.getElementById("cert-lock-banner");
    if (lockBanner) {
      if (state.badgeUnlocked) {
        lockBanner.innerHTML = `
          <div class="p-3.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/50 flex flex-wrap items-center justify-between gap-3">
            <span class="text-xs sm:text-sm font-mono-tech font-bold text-[#10B981]">
              ${t.artemis_unlocked_msg}
            </span>
          </div>
        `;
      } else {
        lockBanner.innerHTML = `
          <div class="p-3.5 rounded-xl bg-amber-500/15 border border-amber-400/50 flex flex-wrap items-center justify-between gap-3">
            <span class="text-xs sm:text-sm font-mono-tech text-amber-200">
              ${t.artemis_locked_msg}
            </span>
            <button
              type="button"
              id="quick-unlock-cert-btn"
              class="px-3.5 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-slate-950 font-mono-tech text-xs font-bold transition cursor-pointer"
            >
              ${t.cert_unlock_btn}
            </button>
          </div>
        `;
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
    }

    // Render 3 Conservation Pledges Radio List
    const pledgesContainer = document.getElementById("conservation-pledges-list");
    if (pledgesContainer) {
      pledgesContainer.innerHTML = t.cert_pledges
        .map((pText, idx) => {
          const active = state.selectedPledgeIndex === idx;
          const letterCode = ["A", "B", "C"][idx];
          return `
            <button
              type="button"
              data-pledge-idx="${idx}"
              class="w-full p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${active
              ? "bg-[#1B2B85]/45 border-[#E7F434] text-white shadow-md"
              : "bg-[#151622]/70 border-white/10 text-slate-300 hover:border-white/30"
            }"
            >
              <span class="px-2 py-0.5 rounded font-mono-tech text-xs font-bold ${active ? "bg-[#E7F434] text-[#151622]" : "bg-slate-800 text-slate-400"
            }">
                Pledge ${letterCode}
              </span>
              <span class="text-sm leading-relaxed">${pText}</span>
            </button>
          `;
        })
        .join("");

      pledgesContainer.querySelectorAll("[data-pledge-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.selectedPledgeIndex = Number(btn.getAttribute("data-pledge-idx"));
          renderCertificateSection();
        });
      });
    }

    // Update Certificate Live Preview Card
    const previewNameEl = document.getElementById("cert-preview-name");
    if (previewNameEl) {
      previewNameEl.textContent = (state.guardianName || "").trim() || t.cert_default_name;
    }

    const previewPledgeEl = document.getElementById("cert-preview-pledge");
    if (previewPledgeEl) {
      previewPledgeEl.textContent = `“${t.cert_pledges[state.selectedPledgeIndex]}”`;
    }

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
              : "bg-slate-900/80 border-white/10 text-slate-400"
            }">
              <span>${st.label}</span>
              <span>${has ? "✓ VERIFIED" : "○ PENDING"}</span>
            </div>
          `;
        })
        .join("");
    }
  }

  /**
   * Renders 15-Minute STEM Classroom Module & Footer SI Disclosure
   */
  function renderClassroomAndFooter() {
    const t = I18N[state.lang];
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setTxt("teacher-tag", t.teacher_tag);
    setTxt("teacher-title", t.teacher_title);
    setTxt("teacher-desc", t.teacher_desc);

    const teacherGrid = document.getElementById("teacher-cards-grid");
    if (teacherGrid) {
      teacherGrid.innerHTML = t.teacher_cards
        .map(
          (c, i) => `
          <div class="surface-subcard rounded-xl p-5 border border-white/10 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-1 rounded bg-[#1B2B85] text-[#E7F434] font-mono-tech text-xs font-bold">
                  ⏱️ ${c.time}
                </span>
                <span class="font-mono-tech text-xs text-slate-400">STEP 0${i + 1}</span>
              </div>
              <h4 class="font-heading text-lg font-bold text-white pt-1">${c.topic}</h4>
              <p class="text-sm text-slate-300 leading-relaxed">${c.body}</p>
            </div>
            <a
              href="${c.target}"
              class="inline-flex items-center justify-center px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#E7F434] hover:text-[#151622] text-xs font-mono-tech font-bold text-[#E7F434] transition"
            >
              ${c.btn}
            </a>
          </div>
        `
        )
        .join("");
    }

    // Footer & SI Disclosure Table
    setTxt("footer-sources-title", t.footer_sources_title);
    setTxt("footer-si-title", t.footer_si_title);
    setTxt("footer-si-btn", t.footer_si_btn);
    setTxt("footer-compliance-notice", t.footer_compliance_notice);
    setTxt("modal-si-title", t.footer_si_title);

    const siTableHtml = `
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr class="border-b border-white/15 font-mono-tech text-[#E7F434]">
              <th class="py-2.5 px-3">${t.si_col_tool}</th>
              <th class="py-2.5 px-3">${t.si_col_role}</th>
              <th class="py-2.5 px-3">${t.si_col_human}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10 text-slate-200">
            ${DATA.meta.si_disclosure
        .map(
          (row) => `
                <tr>
                  <td class="py-3 px-3 font-mono-tech font-bold text-[#38BDF8]">${row.tool}</td>
                  <td class="py-3 px-3">${state.lang === "vi" ? row.role_vi : row.role_en}</td>
                  <td class="py-3 px-3 text-[#10B981]">${state.lang === "vi" ? row.human_check_vi : row.human_check_en
            }</td>
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

  function renderAll() {
    document.documentElement.lang = state.lang;
    renderHeaderStamps();
    renderFilterButtons();
    renderHeroSection();
    renderTableOfContents();
    renderChapters();
    renderDecisionStation();
    renderCertificateSection();
    renderClassroomAndFooter();
    renderSceneTitles();
    notifyBook();
  }

  /**
   * Initialize Static DOM Event Listeners on Startup
   */
  function initApp() {
    renderAll();

    // Language Switcher Buttons
    const langEn = document.getElementById("lang-btn-en");
    const langVi = document.getElementById("lang-btn-vi");
    if (langEn) {
      langEn.addEventListener("click", () => {
        state.lang = "en";
        renderAll();
      });
    }
    if (langVi) {
      langVi.addEventListener("click", () => {
        state.lang = "vi";
        renderAll();
      });
    }

    // Hero Receiver Switch
    const receiverBtn = document.getElementById("receiver-toggle-btn");
    if (receiverBtn) {
      receiverBtn.addEventListener("click", () => {
        state.receiverActive = !state.receiverActive;
        renderHeroSection();
      });
    }

    // Guardian Callsign / Nickname Live Input
    const nameInput = document.getElementById("guardian-name-input");
    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        state.guardianName = e.target.value;
        const previewNameEl = document.getElementById("cert-preview-name");
        if (previewNameEl) {
          previewNameEl.textContent =
            (state.guardianName || "").trim() || I18N[state.lang].cert_default_name;
        }
      });
    }

    // Download Certificate PNG & Print PDF
    const downloadBtn = document.getElementById("cert-download-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        window.RelicCertificate.downloadCertificatePNG(state);
      });
    }

    const printBtn = document.getElementById("cert-print-btn");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }

    // SI Disclosure Modal Controls
    const openSiModalBtn = document.getElementById("footer-si-btn");
    const closeSiModalBtn = document.getElementById("close-si-modal-btn");
    const siModal = document.getElementById("si-disclosure-modal");

    if (openSiModalBtn && siModal) {
      openSiModalBtn.addEventListener("click", () => {
        siModal.classList.remove("hidden");
        siModal.classList.add("flex");
      });
    }
    if (closeSiModalBtn && siModal) {
      closeSiModalBtn.addEventListener("click", () => {
        siModal.classList.add("hidden");
        siModal.classList.remove("flex");
      });
    }
    if (siModal) {
      siModal.addEventListener("click", (e) => {
        if (e.target === siModal) {
          siModal.classList.add("hidden");
          siModal.classList.remove("flex");
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();

