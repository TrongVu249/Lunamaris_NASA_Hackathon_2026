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
    selectedZoneId: "zone-orange", // Default to 155 m historical Apollo 12 comparison
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
      "apollo11-lrrr": "01: LRRR",
      "surveyor-3": "02: SURVEYOR 3",
      "opportunity-rover": "03: OPPORTUNITY",
      "ingenuity-helicopter": "04: INGENUITY"
    };

    const container = document.getElementById("mission-stamps-bar");
    if (container) {
      const collectedCount = Object.values(state.collectedStamps).filter(Boolean).length;
      container.innerHTML = DATA.artifacts
        .map((art) => {
          const isCollected = state.collectedStamps[art.id];
          return `
            <button
              type="button"
              data-scroll-chapter="${art.id}"
              title="${state.lang === "vi" ? art.name_vi : art.name_en}"
              class="stamp-pill px-2.5 py-1 rounded-md border text-xs font-mono-tech font-bold transition-all duration-200 flex items-center gap-1.5 ${isCollected
              ? "mission-stamp-collected"
              : "opacity-40 border-slate-600 text-slate-300 hover:opacity-75 bg-slate-900/60"
            }"
            >
              <span>${isCollected ? "★" : "○"}</span>
              <span>[${stampShortNames[art.id]}]</span>
            </button>
          `;
        })
        .join("") +
        `<span class="ml-1 px-2 py-0.5 rounded bg-slate-800/90 text-[11px] font-mono-tech text-[#E7F434] border border-white/10">${collectedCount}/4</span>`;

      container.querySelectorAll("[data-scroll-chapter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetId = btn.getAttribute("data-scroll-chapter");
          if (state.filter !== "All") {
            state.filter = "All";
            renderFilterButtons();
            renderChaptersList();
          }
          const el = document.getElementById(`chapter-${targetId}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
            class="px-2.5 py-1 rounded text-xs font-mono-tech font-semibold transition-all ${active
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
        renderChaptersList();
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
    setTxt("cta-tune-in-btn", t.cta_tune_in);
    setTxt("cta-artemis-btn", t.cta_artemis);

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

  /**
   * Renders all 4 Scrollytelling Relic Chapters
   */
  function renderChaptersList() {
    const t = I18N[state.lang];
    const container = document.getElementById("relic-chapters-container");
    if (!container) return;

    const visibleArtifacts = DATA.artifacts.filter(
      (art) => state.filter === "All" || art.celestial_body === state.filter
    );

    container.innerHTML = visibleArtifacts
      .map((art) => {
        const isMoon = art.celestial_body === "Moon";
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
          state.lang === "vi"
            ? art.archaeologist_dossier.how_it_operated_vi
            : art.archaeologist_dossier.how_it_operated_en;
        const conservationLaw =
          state.lang === "vi"
            ? art.archaeologist_dossier.conservation_law_vi
            : art.archaeologist_dossier.conservation_law_en;
        const discrepancyNote =
          state.lang === "vi"
            ? art.archaeologist_dossier.discrepancy_note_vi
            : art.archaeologist_dossier.discrepancy_note_en;

        return `
          <article
            id="chapter-${art.id}"
            class="surface-card max-w-6xl mx-auto my-12 p-5 sm:p-8 rounded-2xl transition-all"
          >
            <!-- Chapter Top Metadata Header -->
            <div class="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10">
              <div class="flex flex-wrap items-center gap-2.5">
                <span class="px-3 py-1 rounded-md bg-[#1B2B85] text-[#E7F434] font-mono-tech text-xs font-bold tracking-wider border border-[#E7F434]/30">
                  ${t.chapter_prefix} ${art.chapter_num}
                </span>
                <span class="px-3 py-1 rounded-md text-xs font-mono-tech font-bold border ${bodyBadgeClass}">
                  ${bodyBadgeLabel}
                </span>
                <span class="text-xs font-mono-tech text-slate-400">
                  <strong class="text-slate-200">${t.cospar_label}</strong> ${art.cospar_id}
                </span>
              </div>

              <div id="stamp-status-${art.id}">
                ${isCollected
            ? `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-tech font-bold bg-[#E7F434]/20 text-[#E7F434] border border-[#E7F434]/50">${t.stamp_collected_badge}</span>`
            : `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-tech text-slate-400 bg-slate-900/80 border border-white/10">○ ${t.unlock_stamp_hint}</span>`
          }
              </div>
            </div>

            <!-- Chapter Title & Coordinates Bar -->
            <div class="mb-6">
              <h2 class="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                ${name}
              </h2>
              <div class="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs font-mono-tech">
                <div class="text-slate-300">
                  <span class="text-slate-400">${t.location_label}</span> ${art.location_name}
                </div>
                <div class="text-[#10B981] font-semibold">
                  <span class="text-slate-400">${t.status_label}</span> ${funcStatus}
                </div>
              </div>
            </div>

            <!-- 2-Column Desktop / Stacked Mobile Core Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <!-- LEFT COLUMN (6 cols): Interactive Telemetry Station -->
              <div class="lg:col-span-6 space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#38BDF8] flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#E7F434]"></span>
                    ${t.telemetry_station_title}
                  </h3>
                </div>

                <!-- Visual Viewport: Public Domain NASA Photo Layer + Dynamic SVG Overlay -->
                <div class="relative rounded-xl overflow-hidden border border-white/15 bg-[#0D101B] aspect-[16/9]">
                  <!-- Underlying Public Domain NASA Archival Image with graceful offline fallback -->
                  <img
                    src="${art.media.primary_image_url}"
                    alt="${name}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                    class="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity pointer-events-none"
                  />
                  <!-- Real-Time Interactive SVG Overlay -->
                  <div id="svg-viewport-${art.id}" class="relative z-10 w-full h-full"></div>

                  <!-- Photo Credit Footer inside Viewport -->
                  <div class="absolute bottom-0 inset-x-0 z-20 bg-slate-950/85 backdrop-blur-xs px-3 py-1 border-t border-white/10 flex items-center justify-between">
                    <span class="text-[10px] font-mono-tech text-slate-300 truncate">
                      📷 Photo Credit: ${art.media.image_credit}
                    </span>
                  </div>
                </div>

                <!-- Live Telemetry Readout (3 Mathematical Counters) -->
                <div id="telemetry-metrics-${art.id}" class="grid grid-cols-3 gap-2.5"></div>

                <!-- Range Slider & Preset Fallback Controls Box -->
                <div class="surface-subcard rounded-xl p-4 space-y-3 border border-white/10">
                  <div class="flex items-center justify-between">
                    <label for="slider-${art.id}" class="text-xs sm:text-sm font-mono-tech font-bold text-white">
                      🎚️ ${paramName}
                    </label>
                  </div>

                  <input
                    id="slider-${art.id}"
                    type="range"
                    min="${art.slider_config.min_val}"
                    max="${art.slider_config.max_val}"
                    step="${art.slider_config.step}"
                    value="${currentVal}"
                    data-artifact-slider="${art.id}"
                    class="telemetry-slider ${isMoon ? "" : "mars-slider"}"
                  />

                  <!-- Preset State Fallback Buttons -->
                  <div class="pt-1">
                    <div class="text-[11px] font-mono-tech text-slate-400 mb-2">
                      ${t.preset_label}
                    </div>
                    <div id="preset-btns-${art.id}" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      ${art.slider_config.stops
            .map(
              (st) => `
                          <button
                            type="button"
                            data-artifact-preset="${art.id}"
                            data-preset-val="${st.value}"
                            class="px-3 py-2 rounded-lg text-xs font-mono-tech font-semibold transition-all border text-left"
                          >
                            ⚡ ${state.lang === "vi" ? st.label_vi : st.label_en}
                          </button>
                        `
            )
            .join("")}
                    </div>
                  </div>

                  <!-- Dynamic Milestone Explanation Box -->
                  <div id="telemetry-status-${art.id}" class="p-3 rounded-lg bg-slate-950/75 border border-white/10"></div>

                  <!-- "Where does this number come from?" Accordion -->
                  <div class="pt-1">
                    <button
                      type="button"
                      data-accordion-toggle="${art.id}"
                      class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#1B2B85]/40 hover:bg-[#1B2B85]/65 border border-[#38BDF8]/35 text-xs font-mono-tech font-bold text-[#38BDF8] transition"
                    >
                      <span>${t.where_number_btn}</span>
                      <span id="accordion-icon-${art.id}">${isAccordionOpen ? "▲" : "▼"}</span>
                    </button>
                    <div
                      id="accordion-body-${art.id}"
                      class="${isAccordionOpen ? "block" : "hidden"} mt-2 p-3.5 rounded-lg bg-slate-950/90 border border-[#38BDF8]/30 space-y-2.5 text-xs"
                    >
                      <div class="font-mono-tech font-bold text-[#E7F434]">
                        📐 ${t.where_number_formula_title}
                      </div>
                      <p class="text-slate-300 leading-relaxed">
                        ${discrepancyNote}
                      </p>
                      <div class="pt-1 border-t border-white/10">
                        <div class="font-mono-tech text-[11px] text-slate-400 mb-1.5">
                          ${t.where_number_sources_title}
                        </div>
                        <div class="flex flex-col gap-1.5">
                          ${art.archaeologist_dossier.source_links
            .map(
              (lnk) => `
                              <a
                                href="${lnk.url}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center gap-1.5 text-[#38BDF8] hover:text-[#E7F434] font-mono-tech underline break-all"
                              >
                                <span>🔗 ${lnk.label}</span>
                                <span>↗</span>
                              </a>
                            `
            )
            .join("")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- RIGHT COLUMN (6 cols): Dual-Voice Narrative Panel -->
              <div class="lg:col-span-6 space-y-4">
                <!-- Tab Switcher Bar -->
                <div class="flex flex-wrap items-center gap-2 bg-[#151622] p-1.5 rounded-xl border border-white/10">
                  <button
                    type="button"
                    data-tab-btn="${art.id}"
                    data-tab-target="machine"
                    class="flex-1 py-2 px-3 rounded-lg text-xs font-mono-tech font-bold transition ${activeTab === "machine"
            ? "bg-[#38BDF8] text-[#151622] shadow-sm"
            : "text-slate-300 hover:text-white hover:bg-white/5"
          }"
                  >
                    ${t.tab_machine}
                  </button>
                  <button
                    type="button"
                    data-tab-btn="${art.id}"
                    data-tab-target="dossier"
                    class="flex-1 py-2 px-3 rounded-lg text-xs font-mono-tech font-bold transition ${activeTab === "dossier"
            ? "bg-[#10B981] text-[#151622] shadow-sm"
            : "text-slate-300 hover:text-white hover:bg-white/5"
          }"
                  >
                    ${t.tab_dossier}
                  </button>
                  <button
                    type="button"
                    data-tab-btn="${art.id}"
                    data-tab-target="both"
                    class="py-2 px-2.5 rounded-lg text-xs font-mono-tech font-semibold transition ${activeTab === "both"
            ? "bg-[#E7F434] text-[#151622] font-bold"
            : "text-slate-400 hover:text-white hover:bg-white/5"
          }"
                  >
                    ${t.view_both_btn}
                  </button>
                </div>

                <!-- TAB 1: [📡 The Machine's Pulse] -->
                <div
                  id="panel-machine-${art.id}"
                  class="${activeTab === "machine" || activeTab === "both" ? "block" : "hidden"} cosmic-postcard rounded-xl p-5 sm:p-6 space-y-4"
                >
                  <!-- Mandatory Epistemic Badge (Blue) -->
                  <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono-tech font-bold bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40">
                      <span>📡</span>
                      <span>[${epNarrative}]</span>
                    </span>
                    <span class="text-[11px] font-mono-tech text-slate-400">
                      COSPAR ${art.cospar_id.split(" ")[0]}
                    </span>
                  </div>

                  <!-- Postcard Header Metadata -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-lg bg-slate-950/60 border border-white/10 text-[11px] font-mono-tech">
                    <div>
                      <span class="text-slate-400">${t.postmark_from}</span>
                      <div class="text-slate-200 font-semibold truncate">${art.location_name}</div>
                    </div>
                    <div>
                      <span class="text-slate-400">${t.postmark_to}</span>
                      <div class="text-[#E7F434] font-semibold">21.0285° N, 105.8542° E</div>
                    </div>
                  </div>

                  <!-- First-Person Telemetry Letter -->
                  <blockquote class="text-base sm:text-[17px] text-slate-100 leading-relaxed font-body italic border-l-3 border-[#38BDF8] pl-4 py-1">
                    “${letterText}”
                  </blockquote>
                </div>

                <!-- TAB 2: [🏛️ Archaeologist & Science Dossier] -->
                <div
                  id="panel-dossier-${art.id}"
                  class="${activeTab === "dossier" || activeTab === "both" ? "block" : "hidden"} surface-subcard rounded-xl p-5 sm:p-6 space-y-5 border border-[#10B981]/30"
                >
                  <!-- Mandatory Epistemic Badge (Green) -->
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono-tech font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40">
                      <span>🏛️</span>
                      <span>[${epDossier}]</span>
                    </span>
                  </div>

                  <!-- 1. How the Mission Operated & Science -->
                  <div class="space-y-1.5">
                    <h4 class="text-xs sm:text-sm font-mono-tech font-bold text-[#38BDF8] flex items-center gap-2">
                      <span>🔬</span>
                      <span>${t.dossier_sec1_title}</span>
                    </h4>
                    <p class="text-sm text-slate-200 leading-relaxed">
                      ${howOperated}
                    </p>
                  </div>

                  <!-- 2. Current Functionality & Material State -->
                  <div class="space-y-1.5 pt-3 border-t border-white/10">
                    <h4 class="text-xs sm:text-sm font-mono-tech font-bold text-[#E7F434] flex items-center gap-2">
                      <span>⚙️</span>
                      <span>${t.dossier_sec2_title}</span>
                    </h4>
                    <div class="inline-block px-2.5 py-0.5 rounded bg-white/10 text-xs font-mono-tech text-[#E7F434] font-semibold mb-1">
                      ${funcStatus}
                    </div>
                    <p class="text-sm text-slate-300 leading-relaxed">
                      ${discrepancyNote}
                    </p>
                  </div>

                  <!-- 3. Space Heritage & Conservation Law -->
                  <div class="space-y-1.5 pt-3 border-t border-white/10">
                    <h4 class="text-xs sm:text-sm font-mono-tech font-bold text-[#10B981] flex items-center gap-2">
                      <span>⚖️</span>
                      <span>${t.dossier_sec3_title}</span>
                    </h4>
                    <p class="text-sm text-slate-200 leading-relaxed">
                      ${conservationLaw}
                    </p>
                    <div class="pt-2 flex flex-wrap gap-2">
                      ${art.archaeologist_dossier.source_links
            .map(
              (lnk) => `
                          <a
                            href="${lnk.url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono-tech text-[#38BDF8] border border-[#38BDF8]/30 transition"
                          >
                            <span>📄 ${lnk.label}</span>
                            <span>↗</span>
                          </a>
                        `
            )
            .join("")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    // Populate initial SVG & telemetry metrics for each visible artifact
    visibleArtifacts.forEach((art) => {
      updateChapterTelemetryDOM(art.id);
    });

    // Attach Range Slider Listeners
    container.querySelectorAll("[data-artifact-slider]").forEach((slider) => {
      slider.addEventListener("input", (e) => {
        const id = slider.getAttribute("data-artifact-slider");
        state.sliderValues[id] = Number(e.target.value);
        collectStamp(id);
        updateChapterTelemetryDOM(id);
      });
    });

    // Attach Preset Fallback Button Listeners
    container.querySelectorAll("[data-artifact-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-artifact-preset");
        const val = Number(btn.getAttribute("data-preset-val"));
        state.sliderValues[id] = val;
        const slider = document.getElementById(`slider-${id}`);
        if (slider) slider.value = val;
        collectStamp(id);
        updateChapterTelemetryDOM(id);
      });
    });

    // Attach Accordion Toggle Listeners
    container.querySelectorAll("[data-accordion-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-accordion-toggle");
        state.openAccordions[id] = !state.openAccordions[id];
        const body = document.getElementById(`accordion-body-${id}`);
        const icon = document.getElementById(`accordion-icon-${id}`);
        if (body) body.classList.toggle("hidden", !state.openAccordions[id]);
        if (icon) icon.textContent = state.openAccordions[id] ? "▲" : "▼";
      });
    });

    // Attach Dual-Voice Tab Switcher Listeners
    container.querySelectorAll("[data-tab-btn]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-tab-btn");
        const target = btn.getAttribute("data-tab-target");
        state.activeTabs[id] = target;
        renderChaptersList();
      });
    });
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
    renderHeaderStamps();
    renderFilterButtons();
    renderHeroSection();
    renderChaptersList();
    renderDecisionStation();
    renderCertificateSection();
    renderClassroomAndFooter();
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

