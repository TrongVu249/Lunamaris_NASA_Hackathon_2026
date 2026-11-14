/**
 * LUNAMARIS: Letters Across the Silent Seas
 * Main Application Controller (State, Bilingual UI, Mailbox, Episode Engine)
 * NASA International Space Apps Challenge 2026
 *
 * ============================================================================
 * [REDESIGN 2026-11-13 • A+B HYBRID: "COSMIC MAILBOX + EPISODES"]
 * NỬA ĐẦU FILE ĐƯỢC VIẾT LẠI HOÀN TOÀN. Ba thay đổi lớn:
 *
 *   1) BỎ renderChaptersList() (4 chương xếp dọc ~13.000px, 51 nút bấm)
 *      → THAY bằng renderMailbox() (4 phong bì) + renderEpisode()
 *        (MỖI LẦN CHỈ HIỆN MỘT tập phim).
 *
 *   2) THÊM IntersectionObserver: cuộn tới "nhịp truyện" nào thì hình SVG và
 *      3 ô số liệu đổi theo nhịp đó. Trang cũ KHÔNG có scroll trigger nào.
 *
 *   3) TEM SỨ MỆNH không còn tự thu khi kéo con trượt, mà phải TRẢ LỜI ĐÚNG
 *      câu hỏi (quiz gate) → học sinh buộc phải đọc câu chuyện.
 *
 * NHỮNG HÀM GIỮ NGUYÊN (nằm ở nửa sau file, không sửa):
 *   renderDecisionStation(), renderCertificateSection(),
 *   renderClassroomAndFooter()  (+ sửa nhỏ ở phần thẻ giáo viên).
 *
 * TOÀN BỘ chữ / ảnh / câu hỏi đọc từ js/data.js (khối `episode` của mỗi
 * artifact), nên sau này cập nhật nội dung CHỈ CẦN SỬA data.js.
 * ============================================================================
 */

(function () {
  const DATA = window.LUNAMARIS_DATA || window.RELIC_DATA;
  const I18N = window.UI_I18N;

  /* ------------------------------------------------------------------------
     [REDESIGN] STATE
     Bỏ: `filter` (bộ lọc hành tinh), `receiverActive` (công tắc thu sóng),
         `activeTabs` (tab 2 giọng), `openAccordions` (accordion cũ).
     Thêm: `openArtifactId` — tập phim đang mở (null = đang đứng ở hộp thư)
           `quizPicked`     — đáp án học sinh vừa chọn cho mỗi hiện vật
     ------------------------------------------------------------------------ */
  const state = {
    lang: "vi", // "vi" | "en"
    openArtifactId: null,
    sliderValues: {},
    quizPicked: {},
    /* [KIDS 2026-11-13] Lớp tương tác trẻ em: dự đoán đầu tập phim,
       sticker khám phá từ hotspot, bộ đếm photon của nút bắn laser. */
    guessPicked: {},
    stickers: {
      "apollo11-lrrr": false,
      "surveyor-3": false,
      "opportunity-rover": false,
      "ingenuity-helicopter": false
    },
    photonCount: 0,
    laserBusy: false,
    /* [MOBILE 2026-11-14] Chế độ điện thoại (≤900px): mỗi lần chỉ hiện MỘT
       nhịp truyện, đi tới/lùi bằng nút bấm để khung hình + con trượt luôn nằm
       trong tầm mắt (bố cục 1 cột cũ đẩy con trượt ra xa hình).
         beatIndex[id]      = nhịp đang đọc (0..3)
         mobileRevealed[id] = đã đọc xong 4 nhịp → mở lá thư + sổ tay + câu hỏi */
    beatIndex: {},
    mobileRevealed: {},
    /* [KIDS 2026-11-13 • v2] Dải "cách khám phá" chỉ hiện tới khi bấm "Đã hiểu!" */
    helpDismissed: false,
    collectedStamps: {
      "apollo11-lrrr": false,
      "surveyor-3": false,
      "opportunity-rover": false,
      "ingenuity-helicopter": false
    },
    selectedZoneId: "zone-orange",
    badgeUnlocked: false,
    selectedPledgeIndex: 0,
    guardianName: ""
  };

  /* [REDESIGN] Hai observer: một cho nhịp truyện, một cho hiệu ứng mực lá thư */
  let stepObserver = null;
  let letterObserver = null;

  /* [REDESIGN] Giá trị khởi điểm của con trượt = nhịp ĐẦU TIÊN của tập phim
     (trước đây lấy slider_config.default_val khiến học sinh rơi vào giữa
     câu chuyện mà chưa biết bối cảnh). */
  DATA.artifacts.forEach((art) => {
    const firstStep = art.episode && art.episode.steps && art.episode.steps[0];
    state.sliderValues[art.id] = firstStep ? firstStep.svg_value : art.slider_config.default_val;
    state.quizPicked[art.id] = null;
    state.guessPicked[art.id] = null;
    /* [MOBILE 2026-11-14] Mỗi hiện vật bắt đầu ở nhịp 1, lá thư còn đóng */
    state.beatIndex[art.id] = 0;
    state.mobileRevealed[art.id] = false;
  });

  /* ------------------------------------------------------------------------
     [REDESIGN] CÁC HÀM TIỆN ÍCH NHỎ
     ------------------------------------------------------------------------ */

  /** Chuỗi giao diện theo ngôn ngữ hiện tại */
  function t() {
    return I18N[state.lang];
  }

  /**
   * Lấy field song ngữ `_en` / `_vi` từ một object trong data.js.
   * Mọi chữ của tập phim đều đi qua hàm này → sau này thêm ngôn ngữ mới
   * chỉ cần thêm field `_xx` trong data.js, không phải sửa file này.
   */
  function f(obj, key) {
    if (!obj) return "";
    return obj[`${key}_${state.lang}`] || obj[`${key}_en`] || "";
  }

  /** Gán textContent an toàn (bỏ qua nếu phần tử không tồn tại) */
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  /** [REDESIGN] Tôn trọng cài đặt "giảm chuyển động" của hệ điều hành */
  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* ------------------------------------------------------------------------
     [MOBILE 2026-11-14] PHÁT HIỆN MÀN HÌNH HẸP (≤900px)
     Trên điện thoại, bố cục 2 cột gộp còn 1 cột nên khung hình + con trượt nằm
     CÁCH XA các nhịp truyện: học sinh không thể vừa kéo vừa nhìn máy chạy.
     Cách xử lý: khung hình DÍNH (sticky) ngay dưới header, mỗi lần chỉ hiện một
     nhịp, có nút "← Nhịp trước / Nhịp sau →". Máy tính (>900px) GIỮ NGUYÊN
     scrollytelling cũ — mọi hàm mobile đều `return` sớm nếu không phải mobile.
     ------------------------------------------------------------------------ */
  const mqMobile = window.matchMedia ? window.matchMedia("(max-width: 900px)") : null;

  function isMobile() {
    return !!(mqMobile && mqMobile.matches);
  }

  /** Đo chiều cao header để khung hình sticky không bị header đè lên */
  function syncStickyOffset() {
    const header = document.querySelector("header.sticky");
    const h = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
    document.documentElement.style.setProperty("--ep-sticky-top", `${h + 6}px`);
  }

  /** Tìm mốc preset gần giá trị hiện tại nhất (để hiện câu giải thích số liệu) */
  function closestStop(art, value) {
    const stops = art.slider_config.stops;
    let best = stops[0];
    let minDiff = Infinity;
    stops.forEach((st) => {
      const diff = Math.abs(Number(st.value) - Number(value));
      if (diff < minDiff) {
        minDiff = diff;
        best = st;
      }
    });
    return best;
  }

  /* ------------------------------------------------------------------------
     [REDESIGN] TEM SỨ MỆNH — chỉ thu được khi trả lời ĐÚNG câu hỏi
     ------------------------------------------------------------------------ */
  function collectStamp(artifactId) {
    if (state.collectedStamps[artifactId]) return;
    state.collectedStamps[artifactId] = true;
    renderHeaderProgress();
    renderCertificateSection(); // cập nhật 4 ô tem trên thẻ chứng nhận
  }

  function collectedCount() {
    return Object.values(state.collectedStamps).filter(Boolean).length;
  }

  /* ------------------------------------------------------------------------
     [REDESIGN] HEADER: 4 CHẤM TIẾN ĐỘ (thay cho hàng tem + bộ lọc cũ)
     ------------------------------------------------------------------------ */
  function renderHeaderProgress() {
    const navLabel = document.getElementById("nav-progress-label");
    if (navLabel) navLabel.textContent = state.lang === "vi" ? "HÀNH TRÌNH:" : "PROGRESS:";

    const dots = document.getElementById("progress-dots");
    if (dots) {
      dots.setAttribute("aria-label", state.lang === "vi" ? "Tiến độ 4 lá thư" : "Progress of the four letters");
      dots.innerHTML = DATA.artifacts
        .map((art) => {
          const done = !!state.collectedStamps[art.id];
          const current = state.openArtifactId === art.id;
          return `
            <button
              type="button"
              data-dot-artifact="${art.id}"
              title="${f(art, "name")}"
              aria-label="${f(art, "name")}${done ? " ✓" : ""}"
              class="progress-dot ${done ? "is-done" : ""} ${current ? "is-current" : ""}"
            ></button>
          `;
        })
        .join("");

      dots.querySelectorAll("[data-dot-artifact]").forEach((btn) => {
        btn.addEventListener("click", () => openEpisode(btn.getAttribute("data-dot-artifact")));
      });
    }

    setText("progress-count", `${collectedCount()}/${DATA.artifacts.length}`);

    /* [REDESIGN] Tô sáng nút ngôn ngữ (trước đây việc này nằm trong
       renderFilterButtons — hàm đã bị bỏ cùng bộ lọc hành tinh). */
    const langEnBtn = document.getElementById("lang-btn-en");
    const langViBtn = document.getElementById("lang-btn-vi");
    const langCls = (on) =>
      `px-2 py-1 text-xs font-mono-tech font-bold rounded transition ${
        on ? "bg-[#7fd4ff] text-[#0e1120]" : "text-slate-400 hover:text-white"
      }`;
    if (langEnBtn) langEnBtn.className = langCls(state.lang === "en");
    if (langViBtn) langViBtn.className = langCls(state.lang === "vi");
  }

  /* ------------------------------------------------------------------------
     [REDESIGN] HỘP THƯ VŨ TRỤ: 4 PHONG BÌ
     ------------------------------------------------------------------------ */
  function renderMailbox() {
    const tt = t();

    setText("mailbox-eyebrow", tt.mailbox_eyebrow);
    setText("mailbox-title", tt.mailbox_title);
    setText("mailbox-sub", tt.mailbox_sub);
    setText("mailbox-station", tt.hero_station_line1);
    setText("cta-artemis-btn", tt.cta_artemis);

    const hint = document.getElementById("mailbox-scroll-hint");
    if (hint) {
      hint.innerHTML = `<span>${tt.scroll_hint}</span><span>↓</span>`;
    }

    const box = document.getElementById("relic-mailbox");
    if (!box) return;

    box.innerHTML = DATA.artifacts
      .map((art) => {
        const done = !!state.collectedStamps[art.id];
        const isMoon = art.celestial_body === "Moon";
        return `
          <div
            class="envelope-card ${done ? "is-done" : ""}"
            role="button"
            tabindex="0"
            data-envelope="${art.id}"
            aria-label="${f(art, "name")} — ${done ? tt.envelope_done : tt.envelope_open}"
          >
            <span class="envelope-postmark">${done ? "✓" : art.chapter_num}</span>
            <h2 class="envelope-name">${f(art, "name")}</h2>
            <p class="envelope-teaser">${f(art.episode, "teaser")}</p>
            <span class="envelope-meta">
              <span class="body-chip ${isMoon ? "moon" : "mars"}">${isMoon ? tt.moon_badge : tt.mars_badge}</span>
              <span class="font-mono-tech" style="color: rgba(35, 38, 46, 0.62)">${art.location_name}</span>
            </span>
            <span class="envelope-cta">${done ? tt.envelope_reopen : tt.envelope_open} →</span>
          </div>
        `;
      })
      .join("");

    box.querySelectorAll("[data-envelope]").forEach((card) => {
      const id = card.getAttribute("data-envelope");
      card.addEventListener("click", () => openEpisode(id));
      /* [REDESIGN] Vì phong bì là <div role="button"> (để chứa được <h2>),
         phải tự xử lý phím Enter / Space cho học sinh dùng bàn phím. */
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openEpisode(id);
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     [REDESIGN] MỞ / ĐÓNG TẬP PHIM
     ------------------------------------------------------------------------ */
  function openEpisode(artifactId) {
    const art = DATA.artifacts.find((a) => a.id === artifactId);
    if (!art) return;

    state.openArtifactId = artifactId;
    state.quizPicked[artifactId] = null;
    // Vào tập phim luôn bắt đầu từ nhịp 1 để câu chuyện đi đúng trình tự
    state.sliderValues[artifactId] = art.episode.steps[0].svg_value;
    /* [MOBILE 2026-11-14] Điện thoại cũng vào từ nhịp 1, lá thư đóng lại */
    state.beatIndex[artifactId] = 0;
    state.mobileRevealed[artifactId] = false;

    const hero = document.getElementById("hero-top");
    if (hero) hero.style.display = "none";

    renderHeaderProgress();
    syncStickyOffset();
    renderEpisode();

    const root = document.getElementById("episode-root");
    if (root) {
      root.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
  }

  function closeEpisode() {
    state.openArtifactId = null;
    teardownObservers();

    const hero = document.getElementById("hero-top");
    if (hero) hero.style.display = "";

    const root = document.getElementById("episode-root");
    if (root) root.innerHTML = "";

    renderHeaderProgress();
    renderMailbox();

    if (hero) {
      hero.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
  }

  /* ------------------------------------------------------------------------
     [HOME-BUTTON 2026-11-14] Bấm logo LUNAMARIS trên header:
     quay về màn hình hộp thư 4 lá thư mà KHÔNG reset tiến độ.
     closeEpisode() chỉ đóng tập phim đang mở; tem, sticker, phong bì đã thu
     đều nằm trong state nên được giữ nguyên khi quay lại.
     ------------------------------------------------------------------------ */
  function goHome() {
    if (state.openArtifactId) {
      closeEpisode(); // tự cuộn về đầu trang + vẽ lại hộp thư, giữ nguyên state
      return;
    }
    const hero = document.getElementById("hero-top");
    if (hero) {
      hero.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
  }

  function teardownObservers() {
    if (stepObserver) {
      stepObserver.disconnect();
      stepObserver = null;
    }
    if (letterObserver) {
      letterObserver.disconnect();
      letterObserver = null;
    }
  }

  /* ------------------------------------------------------------------------
     [REDESIGN] VẼ TẬP PHIM: cột hình sticky + 4 nhịp truyện + lá thư
                + sổ tay kỹ sư (nắp gập) + câu hỏi mở tem
     ------------------------------------------------------------------------ */
  function renderEpisode() {
    const root = document.getElementById("episode-root");
    if (!root) return;

    const art = DATA.artifacts.find((a) => a.id === state.openArtifactId);
    if (!art) {
      root.innerHTML = "";
      return;
    }

    const tt = t();
    const isMoon = art.celestial_body === "Moon";
    const done = !!state.collectedStamps[art.id];
    const steps = art.episode.steps;
    const quiz = art.episode.quiz;
    const guessHtml = guessBlockHtml(art);

    /* --- [MOBILE 2026-11-14] Trạng thái chế độ điện thoại của tập phim này --- */
    const mobile = isMobile();
    const revealed = !!state.mobileRevealed[art.id];
    const totalSteps = steps.length;
    let beat = Number(state.beatIndex[art.id] || 0);
    if (!Number.isFinite(beat)) beat = 0;
    beat = Math.min(Math.max(beat, 0), totalSteps - 1);
    state.beatIndex[art.id] = beat;

    /* --- Dải dẫn đường 3 bước cho người mới (tự khám phá, 10–18 tuổi) ---
       [MOBILE] Điện thoại dùng bộ chữ help_m*: nói về NÚT BẤM thay vì "cuộn",
       vì trên mobile học sinh đi từng nhịp bằng nút chứ không cuộn dài. */
    const helpLine1 = mobile ? tt.help_m1 : tt.help_step1;
    const helpLine2 = mobile ? tt.help_m2 : tt.help_step2;
    const helpLine3 = mobile ? tt.help_m3 : tt.help_step3;
    const helpHtml = state.helpDismissed
      ? ""
      : `
        <div class="ep-help" id="ep-help">
          <div class="ep-help-head">
            <span class="ep-help-title">🧭 ${tt.help_title}</span>
            <button type="button" id="ep-help-close" class="ep-help-close">${tt.help_got}</button>
          </div>
          <ol class="ep-help-steps">
            <li>${helpLine1}</li>
            <li>${helpLine2}</li>
            <li>${helpLine3}</li>
          </ol>
        </div>
      `;

    /* --- Con trượt tự khám phá đặt NGAY dưới khung hình (không giấu trong
           nắp gập) để học sinh thấy ngay thứ mình chạm vào được. --- */
    const sliderBoxHtml = `
      <div class="ep-slider-box">
        <div class="ep-slider-title">🎚️ ${tt.telemetry_station_title}</div>
        <label for="ep-slider" class="block text-sm font-semibold">${f(art.slider_config, "parameter_name")}</label>
        <input
          id="ep-slider"
          type="range"
          min="${art.slider_config.min_val}"
          max="${art.slider_config.max_val}"
          step="${art.slider_config.step}"
          value="${state.sliderValues[art.id]}"
          class="telemetry-slider ${isMoon ? "" : "mars-slider"}"
        />
        <div class="ep-slider-hint">💡 ${mobile ? tt.slider_hint_mobile : tt.slider_hint}</div>
      </div>
    `;

    /* --- [MOBILE 2026-11-14] Thanh điều khiển nhịp, đặt NGAY dưới con trượt
           trong khung hình sticky: ngón tay cái với tới được mà mắt vẫn thấy
           hình + 3 ô số liệu đổi theo. Máy tính: CSS ẩn hoàn toàn thanh này. --- */
    const beatbarHtml = `
      <div class="ep-beatbar ${mobile && !revealed ? "" : "is-hidden"}" id="ep-beatbar">
        <button type="button" id="ep-prev-beat" class="ep-beat-btn">${tt.prev_btn}</button>
        <span class="ep-beat-count" id="ep-beat-count">${tt.step_word} ${beat + 1} / ${totalSteps}</span>
        <button type="button" id="ep-next-beat" class="ep-beat-btn is-primary ${
          beat >= totalSteps - 1 ? "is-finish" : ""
        }">${beat >= totalSteps - 1 ? tt.finish_btn : tt.next_btn}</button>
      </div>
    `;

    /* --- Cột phải: các nhịp truyện ---
       [MOBILE] Chỉ nhịp đang đọc mới hiện; các nhịp khác `is-hidden` (display:none)
       để học sinh không phải cuộn qua khoảng trống 30vh như bố cục cũ.
       Sau khi mở lá thư (revealed) thì hiện lại TẤT CẢ nhịp để đọc ôn. */
    const stepsHtml = steps
      .map((st, i) => {
        const mobileHidden = mobile && !revealed && i !== beat;
        const activeCls = mobile ? (i === beat ? "is-active" : "") : i === 0 ? "is-active" : "";
        return `
          <section class="ep-step ${activeCls} ${mobileHidden ? "is-hidden" : ""}" data-step-index="${i}" data-svg-value="${st.svg_value}">
            <div class="ep-step-index">${tt.step_word} ${String(i + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}</div>
            <p class="ep-step-text">${f(st, "text")}</p>
          </section>
        `;
      })
      .join("");

    /* --- Lá thư: tách từng câu để "mực chạy" lần lượt --- */
    const letterRaw = f(art.narrative_voice, "letter");
    const sentences = letterRaw.match(/[^.!?]+[.!?]+|\S+$/g) || [letterRaw];
    const letterHtml = sentences
      .map(
        (s, i) =>
          `<span class="ink" style="transition-delay: ${(i * 0.28).toFixed(2)}s">${s.trim()} </span>`
      )
      .join("");

    /* --- Sổ tay kỹ sư (mặc định ĐÓNG để không ngập số liệu) ---
       [KIDS v2] Con trượt vật lý được ĐƯA RA ngoài, nằm ngay dưới khung hình
       để học sinh tự khám phá không phải tìm trong nắp gập; sổ tay giữ các mốc
       preset + hồ sơ kiểm chứng. */
    const dossierHtml = `
      <details class="ep-dossier">
        <summary>${tt.dossier_toggle}</summary>
        <div class="ep-dossier-body">
          <div class="space-y-2">
            <div class="text-xs font-mono-tech text-slate-400">${tt.preset_label}</div>
            <div id="ep-preset-btns" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${art.slider_config.stops
                .map(
                  (st) => `
                  <button
                    type="button"
                    data-preset-val="${st.value}"
                    class="px-3 py-2 rounded-lg text-xs font-mono-tech font-semibold transition-all border text-left bg-[#0e1120]/90 text-slate-200 border-white/15 hover:border-[#e7f434]/60 hover:text-[#e7f434]"
                  >
                    ⚡ ${f(st, "label")}
                  </button>
                `
                )
                .join("")}
            </div>
          </div>

          <div>
            <div class="font-mono-tech text-[#7fd4ff] font-bold mb-1">${tt.dossier_sec1_title}</div>
            <p>${f(art.archaeologist_dossier, "how_it_operated")}</p>
          </div>

          <div>
            <div class="font-mono-tech text-[#7fd4ff] font-bold mb-1">${tt.dossier_sec3_title}</div>
            <p>${f(art.archaeologist_dossier, "conservation_law")}</p>
          </div>

          <div>
            <div class="font-mono-tech text-[#7fd4ff] font-bold mb-1">${tt.where_number_formula_title}</div>
            <p>${f(art.archaeologist_dossier, "discrepancy_note")}</p>
          </div>

          <div>
            <div class="font-mono-tech text-[#7fd4ff] font-bold mb-1">${tt.where_number_sources_title}</div>
            <ul class="space-y-1.5">
              ${art.archaeologist_dossier.source_links
                .map(
                  (s) => `
                  <li>
                    <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-[#7fd4ff] hover:text-[#e7f434] underline underline-offset-2">
                      ${s.label} ↗
                    </a>
                  </li>
                `
                )
                .join("")}
            </ul>
          </div>
        </div>
      </details>
    `;

    /* --- Câu hỏi mở tem --- */
    const quizHtml = `
      <div class="ep-quiz" id="ep-quiz">
        <div class="ep-step-index" style="color: var(--beacon)">${tt.quiz_title}</div>
        <p class="ep-quiz-question">${f(quiz, "question")}</p>
        <div class="ep-quiz-options">
          ${(state.lang === "vi" ? quiz.options_vi : quiz.options_en)
            .map(
              (opt, i) => `
              <button type="button" class="ep-quiz-option" data-option-index="${i}">${opt}</button>
            `
            )
            .join("")}
        </div>
        <div id="ep-quiz-feedback" class="hidden"></div>
        <!-- [REDESIGN] Ô con tem: để TRỐNG cho tới khi trả lời đúng,
             lúc đó tem mới "đóng cộp" xuống (animation stamp-thunk). -->
        <div id="ep-stamp-slot" class="mt-4">
          ${done ? `<span class="postmark-stamp is-collected">${tt.stamp_collected_badge}</span>` : ""}
        </div>
      </div>
    `;

    /* --- Lắp ráp toàn bộ tập phim --- */
    root.innerHTML = `
      <article class="max-w-6xl mx-auto">
        <!-- Thanh điều hướng trong tập phim -->
        <div class="ep-topbar">
          <button type="button" id="ep-back-btn" class="ep-back-btn">← ${tt.episode_back}</button>
          <span class="font-mono-tech text-slate-400">${tt.episode_switch}</span>
          ${DATA.artifacts
            .map((a) => {
              const isCurrent = a.id === art.id;
              return `
                <button
                  type="button"
                  data-switch-artifact="${a.id}"
                  class="ep-switch-chip ${isCurrent ? "is-current" : ""}"
                >
                  ${state.collectedStamps[a.id] ? "★" : "○"} ${a.chapter_num}
                </button>
              `;
            })
            .join("")}
        </div>

        <!-- Tiêu đề tập phim -->
        <header class="mb-7">
          <div class="flex flex-wrap items-center gap-2.5 mb-3">
            <span class="px-3 py-1 rounded-md bg-[#24306b] text-[#e7f434] font-mono-tech text-xs font-bold border border-[#e7f434]/30">
              ${tt.chapter_prefix} ${art.chapter_num}
            </span>
            <span class="body-chip ${isMoon ? "moon" : "mars"}" style="color: ${isMoon ? "var(--moonbeam)" : "var(--rust)"}">
              ${isMoon ? tt.moon_badge : tt.mars_badge}
            </span>
            <span class="font-mono-tech text-slate-400">
              <strong class="text-slate-200">${tt.cospar_label}</strong> ${art.cospar_id}
            </span>
          </div>

          <h2 class="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            ${f(art, "name")}
          </h2>
          <p class="mt-2 text-sm sm:text-base text-slate-300 font-mono-tech">
            ${tt.location_label} ${art.location_name} &nbsp;•&nbsp;
            <span class="text-[#10b981]">${tt.status_label} ${f(art, "functionality_status")}</span>
          </p>
        </header>

        ${helpHtml}

        <!-- Cột hình sticky (trái) + cột truyện (phải) -->
        <div class="episode-shell">
          <div class="ep-visual ${mobile && revealed ? "is-static" : ""}">
            <div class="ep-visual-frame">
              <img
                src="${art.media.primary_image_url}"
                alt="${f(art, "name")}"
                loading="lazy"
                onerror="this.style.display='none'"
              />
              <div id="ep-svg" class="ep-svg-layer"></div>
              <!-- [KIDS 2026-11-13] Lớp tương tác trẻ em (nút bắn laser, hotspot
                   sticker, bộ đếm photon). Nằm NGOÀI #ep-svg vì #ep-svg bị vẽ lại
                   mỗi lần applyTelemetry() chạy. -->
              <div id="ep-play-layer" class="ep-play-layer"></div>
              <div class="ep-photo-credit">📷 ${art.media.image_credit}</div>
            </div>
            <div id="ep-metrics" class="ep-metrics"></div>
            <div id="ep-status" class="ep-status"></div>
            ${sliderBoxHtml}
            ${beatbarHtml}
          </div>

          <div>
            ${guessHtml}
            <div class="ep-steps">${stepsHtml}</div>

            <!-- [MOBILE 2026-11-14] Khối "đọc lá thư + sổ tay + câu hỏi":
                 trên điện thoại chỉ MỞ sau khi học sinh đọc xong nhịp cuối,
                 để giai đoạn xem hình/kéo con trượt không bị chen chúc. -->
            <div id="ep-after" class="ep-after ${mobile && !revealed ? "is-hidden" : ""}">
              <!-- Lá thư của di vật (phương án B) -->
              <div class="ep-letter ${mobile && revealed ? "is-open" : ""}" id="ep-letter">
                <div class="ep-letter-title">${tt.letter_heading}</div>
                <p class="ep-letter-body">${letterHtml}</p>
                <div class="mt-4 pt-3 border-t border-[rgba(35,38,46,0.18)] font-mono-tech" style="font-size: 11px; color: rgba(35,38,46,0.65)">
                  ${tt.postmark_from} ${f(art.narrative_voice, "epistemic_label")}<br />
                  ${tt.postmark_to}
                </div>
              </div>

              ${dossierHtml}
              ${quizHtml}
            </div>
          </div>
        </div>
      </article>
    `;

    wireEpisode(art);
    applyTelemetry(art.id);

    /* [MOBILE 2026-11-14] Điện thoại KHÔNG dùng IntersectionObserver (cuộn
       không còn là cách đi qua các nhịp) → thay bằng thanh nút "Nhịp trước /
       Nhịp sau". Máy tính giữ nguyên observer cũ. */
    if (mobile) {
      teardownObservers();
      syncStickyOffset();
      updateBeatUI(art);
    } else {
      setupObservers(art);
    }
  }

  /* ------------------------------------------------------------------------
     [REDESIGN] GẮN SỰ KIỆN CHO TẬP PHIM VỪA VẼ
     ------------------------------------------------------------------------ */
  function wireEpisode(art) {
    const backBtn = document.getElementById("ep-back-btn");
    if (backBtn) backBtn.addEventListener("click", closeEpisode);

    /* [KIDS v2] Tắt dải dẫn đường cho phần còn lại của phiên học */
    const helpClose = document.getElementById("ep-help-close");
    if (helpClose) {
      helpClose.addEventListener("click", () => {
        state.helpDismissed = true;
        const box = document.getElementById("ep-help");
        if (box) box.remove();
      });
    }

    document.querySelectorAll("[data-switch-artifact]").forEach((btn) => {
      btn.addEventListener("click", () => openEpisode(btn.getAttribute("data-switch-artifact")));
    });

    /* Con trượt "tự khám phá" trong sổ tay kỹ sư */
    const slider = document.getElementById("ep-slider");
    if (slider) {
      slider.addEventListener("input", (e) => {
        state.sliderValues[art.id] = Number(e.target.value);
        applyTelemetry(art.id);
      });
    }

    document.querySelectorAll("#ep-preset-btns [data-preset-val]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.sliderValues[art.id] = Number(btn.getAttribute("data-preset-val"));
        applyTelemetry(art.id);
      });
    });

    /* [REDESIGN] Quiz gate: bấm đáp án → chấm ngay → đúng thì "đóng cộp" tem */
    document.querySelectorAll("#ep-quiz [data-option-index]").forEach((btn) => {
      btn.addEventListener("click", () => gradeQuiz(art, Number(btn.getAttribute("data-option-index"))));
    });

    /* [MOBILE 2026-11-14] Hai nút đi từng nhịp (chỉ hiện trên màn hình ≤900px) */
    const prevBeatBtn = document.getElementById("ep-prev-beat");
    if (prevBeatBtn) prevBeatBtn.addEventListener("click", () => stepBeat(art, -1));
    const nextBeatBtn = document.getElementById("ep-next-beat");
    if (nextBeatBtn) nextBeatBtn.addEventListener("click", () => stepBeat(art, 1));

    /* [KIDS 2026-11-13] Đoán trước–kiểm tra sau + lớp chạm vào cảnh SVG */
    wireGuess(art);
    setupPlayLayer(art);
  }

  /* ------------------------------------------------------------------------
     [MOBILE 2026-11-14] CHẾ ĐỘ "THẺ THEO NHỊP" TRÊN ĐIỆN THOẠI
     stepBeat(art, ±1) : lùi/tới một nhịp; ở nhịp CUỐI nút "tới" mở lá thư.
     setBeat(art, i)   : áp svg_value của nhịp i → applyTelemetry() (engine cũ).
     revealAfterBeats(): mở #ep-after (lá thư + sổ tay + câu hỏi), thôi sticky.
     updateBeatUI(art) : đồng bộ chữ đếm nhịp, trạng thái nút, thẻ đang hiện.
     Mọi hàm đều return sớm nếu không phải mobile → máy tính không đổi gì cả.
     ------------------------------------------------------------------------ */
  function stepBeat(art, delta) {
    if (!isMobile()) return;

    const steps = art.episode.steps;
    const current = Math.min(Math.max(Number(state.beatIndex[art.id] || 0), 0), steps.length - 1);

    /* Đang ở nhịp cuối mà bấm "tới" → mở lá thư + câu hỏi */
    if (delta > 0 && current >= steps.length - 1) {
      revealAfterBeats(art);
      return;
    }

    const next = Math.min(Math.max(current + delta, 0), steps.length - 1);
    state.beatIndex[art.id] = next;

    if (next !== current) {
      /* Đúng engine cũ: đổi giá trị con trượt → SVG + 3 ô số liệu đổi theo */
      state.sliderValues[art.id] = steps[next].svg_value;
      applyTelemetry(art.id);
    }
    updateBeatUI(art);
    scrollBeatIntoView(next);
  }

  /**
   * [MOBILE 2026-11-14] Đưa thẻ nhịp đang đọc lên NGAY DƯỚI khung hình dính.
   * Không có bước này thì trên màn hình dọc thẻ nhịp có thể nằm dưới nếp gấp,
   * học sinh bấm "Nhịp sau" mà không thấy chữ đổi.
   * Lưu ý: phải tính theo vị trí KHI ĐÃ DÍNH (stickyTop + chiều cao khung),
   * chứ không theo vị trí hiện tại — lúc chưa cuộn thì khung hình còn nằm thấp
   * hơn, tính theo nó sẽ cuộn hụt (đã đo thực tế 2026-11-14).
   */
  function scrollBeatIntoView(index) {
    if (!isMobile() || state.mobileRevealed[state.openArtifactId]) return;

    const card = document.querySelector(`.ep-step[data-step-index="${index}"]`);
    const visual = document.querySelector(".ep-visual");
    const shell = document.querySelector(".episode-shell");
    if (!card || !visual) return;

    const stickyTop = parseFloat(getComputedStyle(visual).top) || 0;
    const stageH = visual.getBoundingClientRect().height;
    const cardAbsTop = card.getBoundingClientRect().top + window.pageYOffset;

    let y = cardAbsTop - (stickyTop + stageH + 12);

    /* Không cuộn quá "đất" trượt của sticky (cuối khung shell),
       nếu không khung hình sẽ bị đẩy lên và che mất thẻ nhịp. */
    if (shell) {
      const shellAbsBottom = shell.getBoundingClientRect().bottom + window.pageYOffset;
      const maxStick = shellAbsBottom - stageH - stickyTop;
      y = Math.min(y, maxStick);
    }

    if (y < 0) y = 0;
    if (Math.abs(y - window.pageYOffset) < 4) return;
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  function setBeat(art, index) {
    if (!isMobile()) return;
    const steps = art.episode.steps;
    const i = Math.min(Math.max(Number(index) || 0, 0), steps.length - 1);
    state.beatIndex[art.id] = i;
    state.sliderValues[art.id] = steps[i].svg_value;
    applyTelemetry(art.id);
    updateBeatUI(art);
  }

  /** Mở lá thư + sổ tay + câu hỏi sau khi đọc xong nhịp cuối (chỉ mobile) */
  function revealAfterBeats(art) {
    state.mobileRevealed[art.id] = true;

    const after = document.getElementById("ep-after");
    if (after) after.classList.remove("is-hidden");

    /* Thôi dính khung hình: giai đoạn đọc lá thư cần hết chiều cao màn hình */
    const visual = document.querySelector(".ep-visual");
    if (visual) visual.classList.add("is-static");

    /* "Mực chạy" ra ngay (desktop làm việc này bằng letterObserver) */
    const letter = document.getElementById("ep-letter");
    if (letter) letter.classList.add("is-open");

    updateBeatUI(art);

    const target = letter || after;
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 14;
      window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  }

  function updateBeatUI(art) {
    if (!isMobile()) return;

    const tt = t();
    const steps = art.episode.steps;
    const revealed = !!state.mobileRevealed[art.id];
    const beat = Math.min(Math.max(Number(state.beatIndex[art.id] || 0), 0), steps.length - 1);

    /* Chỉ hiện đúng nhịp đang đọc; sau khi mở lá thư thì hiện lại tất cả */
    document.querySelectorAll(".ep-step").forEach((el) => {
      const i = Number(el.getAttribute("data-step-index"));
      el.classList.toggle("is-hidden", !revealed && i !== beat);
      el.classList.toggle("is-active", i === beat);
    });

    const count = document.getElementById("ep-beat-count");
    if (count) count.textContent = `${tt.step_word} ${beat + 1} / ${steps.length}`;

    const prevBtn = document.getElementById("ep-prev-beat");
    if (prevBtn) prevBtn.disabled = beat === 0;

    const nextBtn = document.getElementById("ep-next-beat");
    if (nextBtn) {
      const atLast = beat >= steps.length - 1;
      nextBtn.textContent = atLast ? tt.finish_btn : tt.next_btn;
      nextBtn.classList.toggle("is-finish", atLast);
    }

    /* Thanh nhịp hết cần thiết khi lá thư đã mở */
    const bar = document.getElementById("ep-beatbar");
    if (bar) bar.classList.toggle("is-hidden", revealed);

    const visual = document.querySelector(".ep-visual");
    if (visual) visual.classList.toggle("is-static", revealed);
  }

  /* ------------------------------------------------------------------------
     [KIDS 2026-11-13] ĐOÁN TRƯỚC — KIỂM TRA SAU
     Một dự đoán 3 lựa chọn đầu tập phim; chốt xong mới hiện số thật để học
     sinh tự đối chiếu với các nhịp truyện và con trượt trong sổ tay kỹ sư.
     ------------------------------------------------------------------------ */
  function guessBlockHtml(art) {
    const tt = t();
    const g = art.episode && art.episode.guess;
    if (!g) return "";

    const picked = state.guessPicked[art.id];
    const options = state.lang === "vi" ? g.options_vi : g.options_en;

    return `
      <div class="ep-guess" id="ep-guess">
        <div class="ep-guess-title">🎲 ${tt.guess_title}</div>
        <p class="ep-guess-q">${f(g, "question")}</p>
        <div class="ep-guess-options">
          ${options
            .map((opt, i) => {
              let cls = "";
              if (picked !== null) {
                if (i === g.answer_index) cls = "is-right";
                else if (i === picked) cls = "is-wrong";
                else cls = "is-dim";
              }
              return `
                <button type="button" class="ep-guess-option ${cls}" data-guess-index="${i}" ${
                  picked !== null ? "disabled" : ""
                }>${opt}</button>
              `;
            })
            .join("")}
        </div>
        ${
          picked !== null
            ? `
          <div class="ep-guess-reveal ${picked === g.answer_index ? "is-right" : ""}">
            <strong>${picked === g.answer_index ? tt.guess_right : tt.guess_miss}</strong>
            <p>${f(g, "reveal")}</p>
          </div>`
            : ""
        }
      </div>
    `;
  }

  function wireGuess(art) {
    document.querySelectorAll("#ep-guess [data-guess-index]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.guessPicked[art.id] !== null) return;
        state.guessPicked[art.id] = Number(btn.getAttribute("data-guess-index"));
        const box = document.getElementById("ep-guess");
        if (box) box.outerHTML = guessBlockHtml(art);
        wireGuess(art);
      });
    });
  }

  /* ------------------------------------------------------------------------
     [KIDS 2026-11-13] LỚP CHƠI TRÊN CẢNH SVG
     - Chương 01: nút "Bắn laser nào!" — photon bay khứ hồi đúng 2,56 giây.
     - Mọi chương: hotspot "Cái gì đây?" → fun-fact + sticker khám phá.
     - Góc phải: khay đếm sticker n/4.
     ------------------------------------------------------------------------ */
  function stickerCount() {
    return Object.values(state.stickers).filter(Boolean).length;
  }

  function playLayerHtml(art) {
    const tt = t();
    const isLrrr = art.id === "apollo11-lrrr";
    const got = !!state.stickers[art.id];

    return `
      ${
        isLrrr
          ? `
        <div id="ep-laser-status" class="play-status">
          💡 ${tt.laser_hint}<br />
          ${tt.laser_counter}: <strong id="ep-photon-count">${state.photonCount}</strong> ${tt.laser_ratio}
        </div>
        <button type="button" id="ep-laser-btn" class="play-laser-btn">🔦 ${tt.laser_btn}</button>`
          : ""
      }
      <button
        type="button"
        id="ep-hotspot"
        class="play-hotspot ${got ? "is-got" : ""}"
        aria-label="${tt.spot_hint}"
      >
        <span>${got ? "★" : "?"}</span>
        ${got ? "" : `<span class="play-hotspot-tag">${tt.spot_hint}</span>`}
      </button>
      <div id="ep-spot-pop" class="play-spot-pop hidden"></div>
      <div id="ep-sticker-chip" class="play-sticker-chip" title="${tt.sticker_tray}">🔍 ${stickerCount()}/4</div>
    `;
  }

  function setupPlayLayer(art) {
    const layer = document.getElementById("ep-play-layer");
    if (layer) layer.innerHTML = playLayerHtml(art);

    const laserBtn = document.getElementById("ep-laser-btn");
    if (laserBtn) laserBtn.addEventListener("click", () => fireLaser(art));

    const spot = document.getElementById("ep-hotspot");
    if (spot) spot.addEventListener("click", () => openSpotPop(art));

    positionHotspot(art);
  }

  /* Toạ độ hotspot trong hệ SVG 480×260, bám theo giá trị hiện tại
     (mảng lăng kính và trực thăng dịch chuyển theo con trượt). */
  function hotspotAnchor(artifactId, value) {
    switch (artifactId) {
      case "apollo11-lrrr": {
        const shift = Math.round(((Number(value) - 1969) / 57) * 54);
        return { x: 290 + shift - 8, y: 166 };
      }
      case "surveyor-3":
        return { x: 89, y: 130 };
      case "opportunity-rover":
        return { x: 230, y: 152 };
      case "ingenuity-helicopter": {
        const heliY = Math.round(Number(value)) === 72 ? 158 : 108;
        return { x: 270, y: 104 + (heliY - 108) };
      }
      default:
        return { x: 240, y: 130 };
    }
  }

  function positionHotspot(art) {
    const anchor = hotspotAnchor(art.id, state.sliderValues[art.id]);
    const left = `${((anchor.x / 480) * 100).toFixed(2)}%`;
    const top = `${((anchor.y / 260) * 100).toFixed(2)}%`;

    const spot = document.getElementById("ep-hotspot");
    if (spot) {
      spot.style.left = left;
      spot.style.top = top;
    }

    const pop = document.getElementById("ep-spot-pop");
    if (pop) {
      pop.style.left = left;
      pop.style.top = top;
      pop.classList.toggle("below", anchor.y / 260 < 0.42);
    }
  }

  function openSpotPop(art) {
    const tt = t();
    const pop = document.getElementById("ep-spot-pop");
    if (!pop) return;

    if (!pop.classList.contains("hidden")) {
      pop.classList.add("hidden");
      return;
    }

    const firstTime = !state.stickers[art.id];
    if (firstTime) {
      state.stickers[art.id] = true;
      const spot = document.getElementById("ep-hotspot");
      if (spot) {
        spot.classList.add("is-got");
        spot.querySelector("span").textContent = "★";
        const tag = spot.querySelector(".play-hotspot-tag");
        if (tag) tag.remove();
      }
      renderStickerChip();
      renderCertificateSection();
    }

    pop.innerHTML = `
      <button type="button" id="ep-spot-close" class="play-spot-close" aria-label="×">×</button>
      <div class="play-spot-title">🔍 ${tt.spot_hint}</div>
      <p>${f(art, "kid_fact")}</p>
      <div class="play-spot-star">★ ${tt.spot_got}</div>
    `;
    pop.classList.remove("hidden");

    const closeBtn = document.getElementById("ep-spot-close");
    if (closeBtn) closeBtn.addEventListener("click", () => pop.classList.add("hidden"));
  }

  function renderStickerChip() {
    const chip = document.getElementById("ep-sticker-chip");
    if (chip) chip.textContent = `🔍 ${stickerCount()}/4`;
  }

  /* Xung photon bay Trái Đất → lăng kính → về lại, đúng 2,56 giây thời gian thật */
  function fireLaser(art) {
    const layer = document.getElementById("ep-play-layer");
    if (!layer || state.laserBusy) return;

    const tt = t();
    const btn = document.getElementById("ep-laser-btn");
    const status = document.getElementById("ep-laser-status");
    state.laserBusy = true;
    if (btn) btn.disabled = true;

    const finish = () => {
      state.photonCount += 1;
      state.laserBusy = false;
      if (btn) btn.disabled = false;
      const counter = document.getElementById("ep-photon-count");
      if (counter) counter.textContent = String(state.photonCount);
      if (status) status.textContent = `${tt.laser_ping} ${tt.laser_counter}: ${state.photonCount}`;
    };

    if (prefersReducedMotion()) {
      if (status) status.textContent = tt.laser_flying;
      finish();
      return;
    }

    const value = Number(state.sliderValues[art.id]);
    const shift = Math.round(((value - 1969) / 57) * 54);
    const moonX = 290 + shift;
    const from = { x: (62 / 480) * 100, y: (122 / 260) * 100 };
    const to = { x: ((moonX - 15) / 480) * 100, y: (172 / 260) * 100 };

    if (status) status.textContent = tt.laser_flying;

    const dot = document.createElement("div");
    dot.className = "photon-dot";
    layer.appendChild(dot);

    /* Hẹn giờ thường thay vì anim.onfinish: timeline hoạt ảnh bị trình duyệt
       tạm dừng khi tab ẩn, khiến bộ đếm photon kẹt nếu học sinh chuyển tab. */
    dot.animate(
      [
        { left: `${from.x}%`, top: `${from.y}%`, offset: 0 },
        { left: `${to.x}%`, top: `${to.y}%`, offset: 0.5 },
        { left: `${to.x}%`, top: `${to.y}%`, offset: 0.55 },
        { left: `${from.x}%`, top: `${from.y}%`, offset: 1 }
      ],
      { duration: 2560, easing: "linear" }
    );
    window.setTimeout(() => {
      if (dot.parentNode) dot.parentNode.removeChild(dot);
      finish();
    }, 2560);
  }

  function gradeQuiz(art, pickedIndex) {
    const tt = t();
    const quiz = art.episode.quiz;
    const isCorrect = pickedIndex === quiz.answer_index;
    state.quizPicked[art.id] = pickedIndex;

    const buttons = Array.from(document.querySelectorAll("#ep-quiz [data-option-index]"));
    buttons.forEach((b) => b.classList.remove("is-picked", "is-right", "is-wrong"));

    const feedback = document.getElementById("ep-quiz-feedback");
    if (!feedback) return;

    if (isCorrect) {
      const picked = buttons[pickedIndex];
      if (picked) picked.classList.add("is-right");
      buttons.forEach((b) => (b.disabled = true));

      collectStamp(art.id);

      /* Con tem "đóng cộp" ngay tại chỗ
         [REDESIGN] Không thêm dấu ✓ ở đây vì chuỗi stamp_collected_badge
         trong data.js đã có sẵn dấu ✓ (tránh hiện "✓ ✓"). */
      const slot = document.getElementById("ep-stamp-slot");
      if (slot) {
        slot.innerHTML = `<span class="postmark-stamp is-collected">${tt.stamp_collected_badge}</span>`;
      }

      const next = DATA.artifacts.find((a) => !state.collectedStamps[a.id]);
      const allDone = collectedCount() === DATA.artifacts.length;

      feedback.classList.remove("hidden");
      feedback.className = "ep-quiz-feedback";
      feedback.innerHTML = `
        <div class="font-bold text-[#10b981]">${tt.quiz_correct}</div>
        <p class="mt-1.5 text-slate-300">${tt.quiz_explain} ${f(quiz, "explain")}</p>
        ${
          allDone
            ? `<div class="mt-3 flex flex-wrap items-center gap-3">
                 <span class="text-sm text-[#e7f434] font-semibold">${tt.all_done}</span>
                 <button type="button" id="ep-goto-cert" class="btn-primary !py-2 !px-4 !text-sm">🛡️ ${tt.cert_section_title}</button>
                 <button type="button" id="ep-goto-mailbox" class="btn-ghost !py-2 !px-4 !text-sm">${tt.episode_back}</button>
               </div>`
            : `<button type="button" id="ep-goto-next" class="btn-primary mt-3 !py-2 !px-4 !text-sm">${tt.next_envelope}</button>`
        }
      `;

      const gotoNext = document.getElementById("ep-goto-next");
      if (gotoNext && next) gotoNext.addEventListener("click", () => openEpisode(next.id));

      const gotoCert = document.getElementById("ep-goto-cert");
      if (gotoCert) {
        gotoCert.addEventListener("click", () => {
          closeEpisode();
          const cert = document.getElementById("guardian-certificate-section");
          if (cert) cert.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
        });
      }

      const gotoMailbox = document.getElementById("ep-goto-mailbox");
      if (gotoMailbox) gotoMailbox.addEventListener("click", closeEpisode);
    } else {
      const picked = buttons[pickedIndex];
      if (picked) picked.classList.add("is-wrong");

      feedback.classList.remove("hidden");
      feedback.className = "ep-quiz-feedback";
      feedback.style.borderLeftColor = "var(--bad)";
      feedback.innerHTML = `<div class="text-[#ef4444] font-semibold">${tt.quiz_wrong}</div>`;

      /* Cho phép thử lại sau 0,8 giây (không khoá cứng học sinh) */
      window.setTimeout(() => {
        if (picked) picked.classList.remove("is-wrong");
      }, 800);
    }
  }

  /* ------------------------------------------------------------------------
     [REDESIGN] CẬP NHẬT HÌNH SVG + 3 Ô SỐ LIỆU
     Vẫn gọi đúng engine cũ: RelicSVGEngine.evaluateArtifact(id, value, lang)
     ------------------------------------------------------------------------ */
  function applyTelemetry(artifactId) {
    const art = DATA.artifacts.find((a) => a.id === artifactId);
    if (!art) return;

    const value = state.sliderValues[artifactId];
    const res = window.RelicSVGEngine.evaluateArtifact(artifactId, value, state.lang);

    const svgBox = document.getElementById("ep-svg");
    if (svgBox) svgBox.innerHTML = res.svg;

    const metricsBox = document.getElementById("ep-metrics");
    if (metricsBox) {
      metricsBox.innerHTML = res.metrics
        .map(
          (m) => `
          <div class="ep-metric">
            <div class="ep-metric-label">${m.label}</div>
            <div class="ep-metric-value">${m.value}</div>
            <div class="ep-metric-sub">${m.sub}</div>
            ${m.tip ? `<div class="ep-metric-tip">💡 ${m.tip}</div>` : ""}
          </div>
        `
        )
        .join("");
    }

    const statusBox = document.getElementById("ep-status");
    if (statusBox) {
      const stop = closestStop(art, value);
      statusBox.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="font-mono-tech font-bold" style="color: var(--moonbeam)">${res.statusText}</span>
          <span class="font-mono-tech px-2 py-0.5 rounded bg-white/10" style="color: var(--beacon)">
            ${art.slider_config.unit}: ${value}
          </span>
        </div>
        <p class="mt-1.5 text-sm text-slate-300">${f(stop, "desc")}</p>
      `;
    }

    /* Đồng bộ con trượt + tô sáng nút preset (nếu sổ tay kỹ sư đang mở) */
    const slider = document.getElementById("ep-slider");
    if (slider && Number(slider.value) !== Number(value)) slider.value = value;

    document.querySelectorAll("#ep-preset-btns [data-preset-val]").forEach((btn) => {
      const bVal = Number(btn.getAttribute("data-preset-val"));
      const isMatch = Math.abs(bVal - Number(value)) < 0.05;
      btn.className = `px-3 py-2 rounded-lg text-xs font-mono-tech font-semibold transition-all border text-left ${
        isMatch
          ? "bg-[#e7f434] text-[#0e1120] border-[#e7f434] font-bold shadow-md"
          : "bg-[#0e1120]/90 text-slate-200 border-white/15 hover:border-[#e7f434]/60 hover:text-[#e7f434]"
      }`;
    });

    /* [KIDS 2026-11-13] Hotspot bám theo vật thể dịch chuyển trong cảnh SVG */
    positionHotspot(art);
  }

  /* ------------------------------------------------------------------------
     [REDESIGN] SCROLLYTELLING: IntersectionObserver
     Cuộn tới nhịp nào → nhịp đó sáng lên + SVG đổi sang giá trị của nhịp đó.
     (Trang cũ hoàn toàn không có cơ chế này.)
     ------------------------------------------------------------------------ */
  function setupObservers(art) {
    teardownObservers();

    const steps = Array.from(document.querySelectorAll(".ep-step"));
    if (steps.length) {
      stepObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            steps.forEach((s) => s.classList.remove("is-active"));
            entry.target.classList.add("is-active");

            const v = Number(entry.target.getAttribute("data-svg-value"));
            if (!Number.isNaN(v)) {
              state.sliderValues[art.id] = v;
              applyTelemetry(art.id);
            }
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      steps.forEach((s) => stepObserver.observe(s));
    }

    /* Lá thư: khi lọt vào màn hình thì "mực chạy" ra */
    const letter = document.getElementById("ep-letter");
    if (letter) {
      letterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              letter.classList.add("is-open");
              if (letterObserver) letterObserver.unobserve(letter);
            }
          });
        },
        { threshold: 0.2 }
      );
      letterObserver.observe(letter);
    }

    /* [REDESIGN] Nếu học sinh bật "giảm chuyển động": hiện rõ mọi nhịp luôn,
       nội dung không bị mờ và không phụ thuộc vào cuộn. */
    if (prefersReducedMotion()) {
      steps.forEach((s) => s.classList.add("is-active"));
      if (letter) letter.classList.add("is-open");
    }
  }


  /**
   * Renders Module 1: The Artemis Landing Site Decision Station
   * [REDESIGN • GIỮ NGUYÊN] Chỉ đổi mã màu sang bảng màu mới (6 màu có tên).
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
              style="border-color: ${ isSelected ? z.color_hex : "rgba(255,255,255,0.15)" };"
              class="p-3.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                isSelected ? "bg-slate-900 shadow-lg scale-[1.01]" : "bg-[#0e1120]/80 hover:bg-slate-900/60 opacity-85"
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
              <div class="text-xs font-mono-tech font-bold uppercase text-[#7fd4ff] mb-1">
                ⚖️ ${t.artemis_law_label}
              </div>
              <p class="text-sm text-slate-200 leading-relaxed">${lawTxt}</p>
            </div>
          </div>

          <div class="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div class="text-xs sm:text-sm font-mono-tech ${
              state.badgeUnlocked ? "text-[#10B981] font-bold" : "text-amber-300"
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
   * [REDESIGN • GIỮ NGUYÊN] Tem giờ được thu qua câu hỏi (hàm collectStamp
   * ở đầu file) thay vì kéo con trượt; phần còn lại không đổi.
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
              class="w-full p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
                active
                  ? "bg-[#24306b]/45 border-[#E7F434] text-white shadow-md"
                  : "bg-[#0e1120]/70 border-white/10 text-slate-300 hover:border-white/30"
              }"
            >
              <span class="px-2 py-0.5 rounded font-mono-tech text-xs font-bold ${
                active ? "bg-[#E7F434] text-[#0e1120]" : "bg-slate-800 text-slate-400"
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
            <div class="px-3 py-2 rounded-lg border font-mono-tech text-xs font-bold flex items-center justify-between ${
              has
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

    /* [KIDS 2026-11-13] Hàng sticker khám phá (thu từ hotspot trên cảnh SVG) */
    setTxt("cert-stickers-title", t.cert_stickers_title);
    const stickersEl = document.getElementById("cert-preview-stickers");
    if (stickersEl) {
      const stickerItems = [
        { id: "apollo11-lrrr", icon: "🔦", label: "01: LRRR" },
        { id: "surveyor-3", icon: "📷", label: "02: SURVEYOR 3" },
        { id: "opportunity-rover", icon: "🌪️", label: "03: OPPORTUNITY" },
        { id: "ingenuity-helicopter", icon: "🚁", label: "04: INGENUITY" }
      ];
      stickersEl.innerHTML =
        stickerItems
          .map((stItem) => {
            const has = state.stickers[stItem.id];
            return `
            <div class="px-3 py-2 rounded-lg border font-mono-tech text-xs font-bold flex items-center justify-between ${
              has
                ? "bg-[#7fd4ff]/15 border-[#7fd4ff] text-[#7fd4ff]"
                : "bg-slate-900/80 border-white/10 text-slate-400"
            }">
              <span>${stItem.icon} ${stItem.label}</span>
              <span>${has ? "★" : "○"}</span>
            </div>
          `;
          })
          .join("") +
        (stickerCount() === stickerItems.length
          ? `<div class="col-span-full px-3 py-2 rounded-lg bg-[#E7F434]/15 border border-[#E7F434] text-[#E7F434] font-mono-tech text-xs font-bold">🎉 ${t.sticker_all}</div>`
          : "");
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

    /* [REDESIGN 2026-11-13 • A+B HYBRID] THẺ GIÁO VIÊN
       Link cũ trỏ tới "#chapter-<id>" (4 chương xếp dọc) — các anchor đó
       KHÔNG CÒN TỒN TẠI vì trang đã chuyển sang mô hình hộp thư + tập phim.
       Nay: nếu target có dạng #chapter-xxx thì render thành NÚT mở tập phim
       (openEpisode), còn lại (#artemis-station) vẫn là anchor cuộn bình thường.
       Muốn đổi nội dung bài học thì sửa `teacher_cards` trong js/data.js. */
    const chapterTargetToArtifact = (target) => {
      const m = /^#chapter-(.+)$/.exec(target || "");
      return m ? m[1] : null;
    };
    const teacherBtnClass =
      "inline-flex items-center justify-center px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#E7F434] hover:text-[#0e1120] text-xs font-mono-tech font-bold text-[#E7F434] transition cursor-pointer";

    const teacherGrid = document.getElementById("teacher-cards-grid");
    if (teacherGrid) {
      teacherGrid.innerHTML = t.teacher_cards
        .map(
          (c, i) => `
          <div class="surface-subcard rounded-xl p-5 border border-white/10 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-1 rounded bg-[#24306b] text-[#E7F434] font-mono-tech text-xs font-bold">
                  ⏱️ ${c.time}
                </span>
                <span class="font-mono-tech text-xs text-slate-400">STEP 0${i + 1}</span>
              </div>
              <h4 class="font-heading text-lg font-bold text-white pt-1">${c.topic}</h4>
              <p class="text-sm text-slate-300 leading-relaxed">${c.body}</p>
            </div>
            ${
              chapterTargetToArtifact(c.target)
                ? `<button type="button" data-teacher-episode="${chapterTargetToArtifact(c.target)}" class="${teacherBtnClass}">${c.btn}</button>`
                : `<a href="${c.target}" class="${teacherBtnClass}">${c.btn}</a>`
            }
          </div>
        `
        )
        .join("");

      /* [REDESIGN] Nút "Tới Chương 0X" giờ mở tập phim tương ứng */
      teacherGrid.querySelectorAll("[data-teacher-episode]").forEach((btn) => {
        btn.addEventListener("click", () => openEpisode(btn.getAttribute("data-teacher-episode")));
      });
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
                  <td class="py-3 px-3 font-mono-tech font-bold text-[#7fd4ff]">${row.tool}</td>
                  <td class="py-3 px-3">${state.lang === "vi" ? row.role_vi : row.role_en}</td>
                  <td class="py-3 px-3 text-[#10B981]">${
                    state.lang === "vi" ? row.human_check_vi : row.human_check_en
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

  /* ------------------------------------------------------------------------
     [REDESIGN] renderAll
     Bỏ: renderHeaderStamps / renderFilterButtons / renderHeroSection /
         renderChaptersList (các hàm của layout cũ đã bị xoá).
     Thêm: renderMailbox; tập phim chỉ được vẽ lại nếu đang mở
         (để đổi ngôn ngữ không làm mất vị trí cuộn của học sinh).
     ------------------------------------------------------------------------ */
  function renderAll() {
    renderHeaderProgress();
    renderMailbox();
    if (state.openArtifactId) {
      renderEpisode();
    }
    renderDecisionStation();
    renderCertificateSection();
    renderClassroomAndFooter();
  }

  /**
   * Initialize Static DOM Event Listeners on Startup
   * [REDESIGN] Bỏ công tắc thu sóng ở hero (không còn trong layout mới);
   *            thêm phím ESC để đóng modal (accessibility).
   */
  function initApp() {
    renderAll();

    /* [MOBILE 2026-11-14] Xoay màn hình / đổi cỡ cửa sổ qua mốc 900px → vẽ lại
       tập phim theo đúng chế độ: điện thoại (khung hình dính + thẻ theo nhịp)
       hoặc máy tính (scrollytelling 2 cột như cũ). */
    syncStickyOffset();
    if (mqMobile) {
      const onViewportModeChange = () => {
        syncStickyOffset();
        if (state.openArtifactId) renderEpisode();
      };
      if (mqMobile.addEventListener) mqMobile.addEventListener("change", onViewportModeChange);
      else if (mqMobile.addListener) mqMobile.addListener(onViewportModeChange);
    }
    window.addEventListener("resize", syncStickyOffset);

    /* [HOME-BUTTON 2026-11-14] Logo trên header = nút về hộp thư.
       Chặn hành vi nhảy anchor mặc định để tự điều khiển cuộn + đóng tập phim. */
    const brandHome = document.getElementById("brand-home-btn");
    if (brandHome) {
      brandHome.addEventListener("click", (e) => {
        e.preventDefault();
        goHome();
      });
    }

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

    // Guardian Callsign / Nickname Live Input (Zero PII)
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

    const closeSiModal = () => {
      if (!siModal) return;
      siModal.classList.add("hidden");
      siModal.classList.remove("flex");
    };

    if (openSiModalBtn && siModal) {
      openSiModalBtn.addEventListener("click", () => {
        siModal.classList.remove("hidden");
        siModal.classList.add("flex");
      });
    }
    if (closeSiModalBtn) closeSiModalBtn.addEventListener("click", closeSiModal);
    if (siModal) {
      siModal.addEventListener("click", (e) => {
        if (e.target === siModal) closeSiModal();
      });
    }
    /* [REDESIGN] Phím ESC đóng modal — học sinh dùng bàn phím không bị kẹt */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSiModal();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
