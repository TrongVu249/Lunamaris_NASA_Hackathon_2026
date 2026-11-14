/**
 * LUNAMARIS: Letters Across the Silent Seas
 * Module: Real-time Physics Telemetry Formulas & Dynamic Inline SVG Engine
 * Covers Chapter 01 (LRRR), Chapter 02 (Surveyor 3), Chapter 03 (Opportunity), Chapter 04 (Ingenuity)
 */

window.RelicSVGEngine = (function () {
  /**
   * Chapter 01: Apollo 11 Eagle Descent Stage & LRRR
   * Variable Y: Observation Year (1969 -> 2026)
   */
  function computeChapter1(yearVal, lang) {
    const Y = Math.round(Number(yearVal));
    const deltaT = Y - 1969;
    const deltaDCm = (deltaT * 3.8).toFixed(1);
    const deltaDMeters = (deltaT * 0.038).toFixed(2);
    const prismCount = Y >= 1971 ? "100 (A11) / 300 (A15)" : "100 Prisms (3.8 cm)";

    const statusEn =
      Y === 1969
        ? "Initial Tranquility Base Deployment — 75 m Artifact Boundary"
        : Y < 2000
        ? `Active Passive Ranging (${deltaT} Yrs) — Testing General Relativity`
        : `Continuous Zero-Power Operation (${deltaT} Yrs) — +${deltaDCm} cm Lunar Recession`;

    const statusVi =
      Y === 1969
        ? "Triển khai tại Biển Tĩnh Lặng — Vành đai bảo vệ hiện vật 75 m"
        : Y < 2000
        ? `Đo khoảng cách thụ động (${deltaT} năm) — Kiểm nghiệm Thuyết Tương đối`
        : `Hoạt động không cần điện (${deltaT} năm) — Trôi xa +${deltaDCm} cm`;

    // Micro-scale visual expansion (0 to 56 px shift in SVG)
    const shiftPx = Math.round((deltaT / 57) * 54);
    const moonX = 290 + shiftPx;

    const svgMarkup = `
      <svg viewBox="0 0 480 260" class="w-full h-full select-none" aria-label="Apollo 11 LRRR Laser Telemetry Simulation">
        <defs>
          <radialGradient id="lunarSurfaceGrad1" cx="50%" cy="100%" r="80%">
            <stop offset="0%" stop-color="#334155" stop-opacity="0.92" />
            <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95" />
          </radialGradient>
          <filter id="laserGlow1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Deep Space Background Fallback Layer -->
        <rect x="0" y="0" width="480" height="260" fill="rgba(15, 23, 42, 0.72)" />
        <circle cx="70" cy="44" r="1.2" fill="#F8FAFC" opacity="0.7" />
        <circle cx="165" cy="28" r="1.5" fill="#38BDF8" opacity="0.8" />
        <circle cx="248" cy="52" r="1" fill="#F8FAFC" opacity="0.6" />
        <circle cx="412" cy="36" r="1.4" fill="#E7F434" opacity="0.8" />

        <!-- Lunar Horizon & Mare Tranquillitatis Basalt -->
        <path d="M 0 198 Q 180 182 340 192 T 480 195 L 480 260 L 0 260 Z" fill="url(#lunarSurfaceGrad1)" stroke="rgba(148,163,184,0.35)" stroke-width="1" />

        <!-- Earth Observatory (Left Side) -->
        <g transform="translate(36, 128)">
          <circle cx="0" cy="0" r="24" fill="#1D4ED8" stroke="#38BDF8" stroke-width="2" />
          <path d="M -12 -8 Q -2 -16 10 -6 Q 16 4 4 12 Q -8 14 -14 2 Z" fill="#10B981" opacity="0.75" />
          <rect x="14" y="-6" width="12" height="8" rx="2" fill="#E2E8F0" stroke="#0F172A" stroke-width="1" />
          <text x="0" y="38" text-anchor="middle" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700">EARTH ILRS</text>
          <text x="0" y="49" text-anchor="middle" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="8">10¹⁷ photons</text>
        </g>

        <!-- 75m Artifact Exclusion Boundary Ring around Tranquility Base -->
        <g transform="translate(${moonX}, 178)">
          <ellipse cx="42" cy="18" rx="82" ry="26" fill=" rgba(56, 189, 248, 0.08)" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="5 4" />
          <text x="42" y="54" text-anchor="middle" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700">
            🛡️ 75 m Artifact Boundary (Apollo 11)
          </text>

          <!-- Eagle Descent Stage (Gold Foil & Landing Legs) -->
          <g transform="translate(46, -24)">
            <!-- Landing legs -->
            <line x1="-18" y1="18" x2="-30" y2="36" stroke="#F59E0B" stroke-width="2.5" />
            <line x1="18" y1="18" x2="30" y2="36" stroke="#F59E0B" stroke-width="2.5" />
            <line x1="0" y1="20" x2="0" y2="37" stroke="#D97706" stroke-width="2" />
            <ellipse cx="-30" cy="36" rx="6" ry="2" fill="#FBBF24" />
            <ellipse cx="30" cy="36" rx="6" ry="2" fill="#FBBF24" />
            <!-- Octagonal Gold Kapton Body -->
            <rect x="-20" y="0" width="40" height="20" rx="2" fill="#D97706" stroke="#FDE047" stroke-width="1.5" />
            <rect x="-12" y="4" width="24" height="12" fill="#B45309" />
            <!-- Descent Engine Skirt -->
            <polygon points="-8,20 8,20 12,30 -12,30" fill="#475569" />
            <text x="0" y="-6" text-anchor="middle" fill="#FDE047" font-family="JetBrains Mono, monospace" font-size="8" font-weight="700">EAGLE LM</text>
          </g>

          <!-- LRRR 100 Corner-Cube Prism Array -->
          <g transform="translate(-8, -6)">
            <rect x="-12" y="10" width="24" height="6" fill="#94A3B8" />
            <!-- Tilted Prism Pallet facing Earth -->
            <polygon points="-10,-8 10,-2 10,12 -10,10" fill="#0F172A" stroke="#E2E8F0" stroke-width="1.5" />
            <!-- Corner-cube grid glints -->
            <circle cx="-4" cy="1" r="2" fill="#10B981" />
            <circle cx="2" cy="3" r="2" fill="#38BDF8" />
            <circle cx="-4" cy="6" r="2" fill="#38BDF8" />
            <circle cx="2" cy="8" r="2" fill="#10B981" />
            <text x="0" y="-13" text-anchor="middle" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="8" font-weight="700">LRRR (100 Prisms)</text>
          </g>
        </g>

        <!-- Outgoing & Parallel Reflected Green Laser Pulse (#10B981) -->
        <g filter="url(#laserGlow1)">
          <!-- Outgoing Beam (Earth -> LRRR) -->
          <line x1="62" y1="122" x2="${moonX - 16}" y2="169" stroke="#10B981" stroke-width="2.6" class="laser-beam-line" />
          <!-- Parallel Reflected Beam (LRRR -> Earth) -->
          <line x1="${moonX - 16}" y1="176" x2="62" y2="129" stroke="#34D399" stroke-width="2" stroke-dasharray="6 6" class="laser-beam-line" />
          <!-- Corner-cube vertex flash -->
          <circle cx="${moonX - 15}" cy="172" r="5" fill="#E7F434" opacity="0.9" />
        </g>

        <!-- Micro-Scale Recession Distance Ruler (Top Overlay) -->
        <g transform="translate(62, 54)">
          <rect x="0" y="-24" width="380" height="44" rx="6" fill="rgba(15, 23, 42, 0.86)" stroke="rgba(255,255,255,0.15)" />
          <line x1="16" y1="2" x2="${moonX - 78}" y2="2" stroke="#E7F434" stroke-width="2" />
          <polygon points="${moonX - 78},2 ${moonX - 86},-3 ${moonX - 86},7" fill="#E7F434" />
          <line x1="16" y1="-5" x2="16" y2="9" stroke="#38BDF8" stroke-width="2" />
          <line x1="212" y1="-5" x2="212" y2="9" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="2 2" />
          <text x="190" y="-9" text-anchor="middle" fill="#E7F434" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700">
            YEAR ${Y} (Δt = ${deltaT} yrs) → DRIFT Δd = +${deltaDCm} cm (${deltaDMeters} m)
          </text>
          <text x="190" y="14" text-anchor="middle" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="8.5">
            Round-Trip: 2.56 s | Return Ratio: &lt; 1 photon per 10¹⁷ emitted
          </text>
        </g>
      </svg>
    `;

    return {
      svg: svgMarkup,
      statusText: lang === "vi" ? statusVi : statusEn,
      metrics: [
        {
          label: lang === "vi" ? "SỐ NĂM HOẠT ĐỘNG (Δt)" : "ACTIVE YEARS (Δt)",
          value: `${deltaT} ${lang === "vi" ? "năm" : "yrs"}`,
          sub: `${Y} − 1969`,
          tip:
            lang === "vi"
              ? "Đếm từ năm 1969 — tấm gương không cần chút điện nào vẫn 'sống' lâu vậy."
              : "Counted since 1969 — the mirror needs zero electricity to stay 'alive' this long."
        },
        {
          label: lang === "vi" ? "ĐỘ TRÔI QUỸ ĐẠO (Δd)" : "LUNAR RECESSION (Δd)",
          value: `+${deltaDCm} cm`,
          sub: `~${deltaDMeters} m (3.8 cm/yr)`,
          tip:
            lang === "vi"
              ? "Mỗi năm Mặt Trăng xa thêm 3,8 cm — nhanh cỡ móng tay bạn mọc!"
              : "The Moon moves 3.8 cm farther each year — about as fast as your fingernails grow!"
        },
        {
          label: lang === "vi" ? "KHỨ HỒI LASER" : "LASER ROUND-TRIP",
          value: `2.56 s`,
          sub: `${prismCount}`,
          tip:
            lang === "vi"
              ? "Ánh sáng đi ~300.000 km/s, Mặt Trăng cách ~384.000 km → khứ hồi 2,56 s."
              : "Light flies ~300,000 km/s and the Moon sits ~384,000 km away → 2.56 s round trip."
        }
      ]
    };
  }

  /**
   * Chapter 02: Surveyor 3 & Apollo 12 LM Intrepid
   * Variable D: Touchdown separation distance (50 m -> 2500 m, default 155 m)
   */
  function computeChapter2(distVal, lang) {
    const D = Math.round(Number(distVal));
    let velocityStr = "0 m/s (No Plume Impact)";
    let surfaceStateEn = "Pristine White Inorganic Paint (0 particles/cm²)";
    let surfaceStateVi = "Lớp Sơn Trắng Vô Cơ Nguyên Vẹn (0 hạt/cm²)";
    let zoneColor = "#10B981";
    let badgeTextEn = "SAFE BUFFER (≥ 2,000 m NASA 2011 Rule)";
    let badgeTextVi = "VÙNG ĐỆM AN TOÀN (≥ 2.000 m Chuẩn NASA 2011)";
    let sepiaAmount = 0;
    let pitCount = 0;
    let sprayOpacity = 0.08;

    if (D >= 2000) {
      velocityStr = "0 particles/cm²";
      surfaceStateEn = "Pristine White Inorganic Paint";
      surfaceStateVi = "Sơn Trắng Vô Cơ Nguyên Vẹn (0 hạt bụi/cm²)";
      zoneColor = "#10B981";
      badgeTextEn = "SAFE ZONE — Zero Ballistic Ejecta Impact";
      badgeTextVi = "AN TOÀN — Không Bị Hạt Bụi Đạn Đạo Va Chạm";
      sepiaAmount = 0;
      pitCount = 0;
      sprayOpacity = 0.08;
    } else if (D >= 500) {
      velocityStr = "Fine Dust Curtain";
      surfaceStateEn = "Low-velocity fine dust settling — Within 2.0 km NASA 2011 Approach Exclusion Zone";
      surfaceStateVi = "Bụi mịn lắng đọng vận tốc thấp — Nằm trong Vùng cấm Tiếp cận 2,0 km (NASA 2011)";
      zoneColor = "#EAB308";
      badgeTextEn = "CAUTION — Within 2.0 km NASA 2011 Exclusion Zone";
      badgeTextVi = "CẢNH BÁO VÀNG — Trong Vùng Cấm 2,0 km của NASA 2011";
      sepiaAmount = 0.25;
      pitCount = 5;
      sprayOpacity = 0.38;
    } else if (D >= 150) {
      velocityStr = "300 to 2,000 m/s";
      surfaceStateEn = "Severe Micro-Pitting & Tan Discoloration (NASA SP-284 Verified)";
      surfaceStateVi = "Rỗ Vi Mô Nghiêm Trọng & Đổi Màu Sơn Nâu Rám (Đã kiểm chứng NASA SP-284)";
      zoneColor = "#F97316";
      badgeTextEn = D === 155
        ? "155 m HISTORICAL APOLLO 12 TOUCHDOWN (LROC Verified; 1969 Logs: 160–180 m)"
        : "WARNING — Supersonic Sandblasting Zone (v = 300–2,000 m/s)";
      badgeTextVi = D === 155
        ? "MỐC LỊCH SỬ 155 m APOLLO 12 (Vệ tinh LROC; Tài liệu 1969 ghi 160–180 m)"
        : "CẢNH BÁO CAM — Vùng Bắn Cát Siêu Thanh (v = 300–2.000 m/s)";
      sepiaAmount = 0.65;
      pitCount = 18;
      sprayOpacity = 0.85;
    } else {
      velocityStr = "> 2,000 m/s Blast";
      surfaceStateEn = "Direct Structural Blast Hazard — Violates Artifact Boundary!";
      surfaceStateVi = "Nguy Cơ Thổi Bay Cấu Trúc Trực Diện — Vi Phạm Ranh Giới Hiện Vật!";
      zoneColor = "#EF4444";
      badgeTextEn = "RED ALERT — Direct Structural Blast Hazard (< 150 m)";
      badgeTextVi = "BÁO ĐỘNG ĐỎ — Nguy Cơ Phá Hủy Cấu Trúc Trực Diện (< 150 m)";
      sepiaAmount = 0.85;
      pitCount = 28;
      sprayOpacity = 1.0;
    }

    // Position Intrepid lander horizontally based on D (50m -> x=165, 2500m -> x=425)
    const normD = Math.min(1, Math.max(0, (D - 50) / (2500 - 50)));
    const intrepidX = Math.round(165 + normD * 255);

    // Generate deterministic micro-pitting circles on the Surveyor 3 camera lens
    let pitsSvg = "";
    for (let i = 0; i < pitCount; i++) {
      const angle = (i * 137.5 * Math.PI) / 180;
      const radius = 3 + ((i * 7) % 19);
      const px = (88 + Math.cos(angle) * radius).toFixed(1);
      const py = (132 + Math.sin(angle) * radius).toFixed(1);
      const rSize = (i % 3 === 0 ? 1.8 : 1.2);
      pitsSvg += `<circle cx="${px}" cy="${py}" r="${rSize}" fill="#451A03" opacity="0.9" />`;
    }

    // Camera paint color shift from pristine white (#F8FAFC) to tan-brown (#A16207 / #B45309)
    const cameraBodyFill =
      sepiaAmount === 0
        ? "#F8FAFC"
        : sepiaAmount < 0.4
        ? "#E2D5B5"
        : sepiaAmount < 0.75
        ? "#C29B61"
        : "#9A6B32";

    const svgMarkup = `
      <svg viewBox="0 0 480 260" class="w-full h-full select-none" aria-label="Surveyor 3 and Apollo 12 Sandblasting Simulation">
        <defs>
          <linearGradient id="craterSlopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#0F172A" stop-opacity="0.98" />
          </linearGradient>
        </defs>

        <!-- Background Sky -->
        <rect x="0" y="0" width="480" height="260" fill="rgba(15, 23, 42, 0.74)" />

        <!-- Oceanus Procellarum Crater Rim & Slope -->
        <path d="M 0 212 Q 70 232 150 202 Q 240 175 480 182 L 480 260 L 0 260 Z" fill="url(#craterSlopeGrad)" stroke="#64748B" stroke-width="1" />

        <!-- Surveyor 3 TV Camera Magnified Inspection Inset (Left Side) -->
        <g transform="translate(18, 22)">
          <rect x="0" y="0" width="142" height="162" rx="10" fill="rgba(15, 23, 42, 0.92)" stroke="${zoneColor}" stroke-width="1.8" />
          <text x="71" y="16" text-anchor="middle" fill="${zoneColor}" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700">
            SURVEYOR 3 TV CAMERA
          </text>

          <!-- Camera Housing with Dynamic Sepia / Tan Discoloration -->
          <g style="filter: sepia(${sepiaAmount}) contrast(${(1 + sepiaAmount * 0.25).toFixed(2)});">
            <!-- Lower Cylindrical Shroud -->
            <rect x="46" y="76" width="50" height="58" rx="4" fill="${cameraBodyFill}" stroke="#475569" stroke-width="1.5" />
            <!-- Upper Mirror Hood -->
            <polygon points="42,76 100,76 92,42 50,42" fill="${cameraBodyFill}" stroke="#475569" stroke-width="1.5" />
            <!-- Optical Mirror / Lens Window -->
            <circle cx="71" cy="108" r="21" fill="#38BDF8" fill-opacity="0.28" stroke="#94A3B8" stroke-width="2" />
            <ellipse cx="71" cy="58" rx="14" ry="8" fill="#BAE6FD" opacity="0.65" />
          </g>

          <!-- Dynamic Micro-Pitting Overlay (Translated to center of lens 71,108) -->
          <g transform="translate(-17, -24)">
            ${pitsSvg}
          </g>

          <text x="71" y="148" text-anchor="middle" fill="#F8FAFC" font-family="JetBrains Mono, monospace" font-size="8">
            ${sepiaAmount >= 0.6 ? "TAN PAINT + MICRO-PITS" : sepiaAmount > 0 ? "FINE DUST FILM" : "PRISTINE WHITE PAINT"}
          </text>
        </g>

        <!-- Surveyor 3 Lander on Crater Slope (x=132, y=206) -->
        <g transform="translate(132, 198) rotate(-8)">
          <line x1="0" y1="-16" x2="-18" y2="12" stroke="#CBD5E1" stroke-width="2" />
          <line x1="0" y1="-16" x2="18" y2="12" stroke="#CBD5E1" stroke-width="2" />
          <polygon points="-10,-16 10,-16 0,-34" fill="${cameraBodyFill}" stroke="#94A3B8" stroke-width="1.2" />
          <text x="0" y="25" text-anchor="middle" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="8" font-weight="700">Surveyor 3 (0 m)</text>
        </g>

        <!-- Apollo 12 LM Intrepid at Variable Separation Distance D -->
        <g transform="translate(${intrepidX}, 162)">
          <!-- Rocket Descent Plume -->
          <polygon points="-8,18 8,18 22,26 -22,26" fill="#F97316" opacity="0.85" />
          <!-- LM Legs & Gold Body -->
          <line x1="-12" y1="8" x2="-20" y2="20" stroke="#F59E0B" stroke-width="2" />
          <line x1="12" y1="8" x2="20" y2="20" stroke="#F59E0B" stroke-width="2" />
          <rect x="-13" y="-6" width="26" height="14" rx="2" fill="#D97706" stroke="#FDE047" stroke-width="1.2" />
          <polygon points="-10,-6 10,-6 7,-17 -7,-17" fill="#94A3B8" stroke="#E2E8F0" stroke-width="1" />
          <text x="0" y="-22" text-anchor="middle" fill="#E7F434" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700">
            LM INTREPID (${D} m)
          </text>
        </g>

        <!-- Hyper-Velocity Ballistic Regolith Spray from Intrepid toward Surveyor 3 -->
        <g opacity="${sprayOpacity}">
          <path d="M ${intrepidX - 14} 180 Q ${(intrepidX + 132) / 2} 135 142 190" fill="none" stroke="${zoneColor}" stroke-width="2.2" class="sandblast-stream" />
          <path d="M ${intrepidX - 14} 182 Q ${(intrepidX + 132) / 2} 152 135 196" fill="none" stroke="#F97316" stroke-width="1.6" class="sandblast-stream" />
          <path d="M ${intrepidX - 10} 178 Q ${(intrepidX + 160) / 2} 112 152 176" fill="none" stroke="#EF4444" stroke-width="${D < 500 ? 1.8 : 0}" class="sandblast-stream" />
        </g>

        <!-- Separation Distance Dimension Bar -->
        <g transform="translate(0, 238)">
          <line x1="132" y1="0" x2="${intrepidX}" y2="0" stroke="${zoneColor}" stroke-width="2" />
          <circle cx="132" cy="0" r="3.5" fill="#38BDF8" />
          <circle cx="${intrepidX}" cy="0" r="3.5" fill="${zoneColor}" />
          <text x="${Math.max(245, (132 + intrepidX) / 2)}" y="-6" text-anchor="middle" fill="#E7F434" font-family="JetBrains Mono, monospace" font-size="9.5" font-weight="700">
            TOUCHDOWN SEPARATION D = ${D} m
          </text>
        </g>

        <!-- Top Right Status Readout Banner -->
        <g transform="translate(170, 22)">
          <rect x="0" y="0" width="294" height="42" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="${zoneColor}" stroke-width="1.4" />
          <text x="12" y="16" fill="${zoneColor}" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700">
            ${lang === "vi" ? badgeTextVi : badgeTextEn}
          </text>
          <text x="12" y="32" fill="#E2E8F0" font-family="JetBrains Mono, monospace" font-size="8">
            Ejecta Velocity: ${velocityStr}
          </text>
        </g>
      </svg>
    `;

    return {
      svg: svgMarkup,
      statusText: lang === "vi" ? surfaceStateVi : surfaceStateEn,
      metrics: [
        {
          label: lang === "vi" ? "KHOẢNG CÁCH HẠ CÁNH (D)" : "SEPARATION DISTANCE (D)",
          value: `${D} m`,
          sub: D === 155 ? "LROC: 155m (1969: 160-180m)" : "Range: 50 – 2,500 m",
          tip:
            lang === "vi"
              ? "Khoảng cách từ tàu mới tới Surveyor 3 — kéo con trượt để thấy bụi ngừng chạm tới ở 2 km."
              : "Distance from the new lander to Surveyor 3 — slide it and watch the dust stop reaching at 2 km."
        },
        {
          label: lang === "vi" ? "VẬN TỐC HẠT BỤI (v)" : "EJECTA VELOCITY (v)",
          value: velocityStr,
          sub: "1/6g Vacuum Ballistics",
          tip:
            lang === "vi"
              ? "Mặt Trăng không có không khí cản bụi: hạt bụi bay nhanh như đạn, 300–2.000 m/s."
              : "No air on the Moon to slow dust: grains fly like bullets, 300–2,000 m/s."
        },
        {
          label: lang === "vi" ? "BỀ MẶT CAMERA SURVEYOR 3" : "SURVEYOR 3 SURFACE",
          value: D >= 2000 ? "Pristine White" : D >= 500 ? "Fine Dust Film" : "Tan + Pitted",
          sub: "NASA SP-284 Verified",
          tip:
            lang === "vi"
              ? "Hình phóng to của camera: sơn trắng hóa nâu và mặt kính bị bụi bắn rỗ."
              : "Close-up of the camera: white paint tans and the glass gets pitted by dust."
        }
      ]
    };
  }

  /**
   * Chapter 03: Opportunity Rover (MER-B)
   * Variable tau: Atmospheric Optical Depth (1.0 -> 10.8, default 10.8)
   * Piecewise linear interpolation across 5 JPL points:
   * [(1.0, 700), (3.5, 280), (5.5, 120), (8.5, 45), (10.8, 22)]
   */
  function calculateOpportunityPower(tau) {
    const pts = [
      [1.0, 700],
      [3.5, 280],
      [5.5, 120],
      [8.5, 45],
      [10.8, 22]
    ];
    if (tau <= 1.0) return 700;
    if (tau >= 10.8) return 22;
    for (let i = 0; i < pts.length - 1; i++) {
      const [t1, e1] = pts[i];
      const [t2, e2] = pts[i + 1];
      if (tau >= t1 && tau <= t2) {
        return Math.round(e1 + ((tau - t1) / (t2 - t1)) * (e2 - e1));
      }
    }
    return 22;
  }

  function computeChapter3(tauVal, lang) {
    const tau = Number(Number(tauVal).toFixed(1));
    const wattHours = calculateOpportunityPower(tau);
    const batteryPct = Math.max(3, Math.round((wattHours / 700) * 100));

    let stateEn = "Nominal Operations — 90-Sol Design Baseline";
    let stateVi = "Hoạt động Bình thường — Thiết kế gốc 90 Sol";
    let barColor = "#10B981";

    if (tau >= 10.5) {
      stateEn = "Final Telemetry Received — Mission Clock Fault (Sol 5111: 22 Wh)";
      stateVi = "Tín hiệu Đo xa Cuối cùng — Lỗi Đồng hồ Sứ mệnh (Sol 5111: 22 Wh)";
      barColor = "#EF4444";
    } else if (tau >= 8.0) {
      stateEn = "Low-Power Fault Imminent — Planet-Encircling Storm";
      stateVi = "Sắp Ngắt Nguồn Khẩn Cấp — Bão Bụi Toàn Cầu Bao Phủ";
      barColor = "#EF4444";
    } else if (tau >= 5.0) {
      stateEn = "Critical Survival Threshold (2007 Storm Level)";
      stateVi = "Ngưỡng Sinh Tồn Tới Hạn (Tương đương Bão bụi Năm 2007)";
      barColor = "#F97316";
    } else if (tau >= 3.0) {
      stateEn = "Power Conservation Mode — Restricted Driving & Science";
      stateVi = "Chế độ Tiết kiệm Điện — Hạn chế Di chuyển & Quang phổ";
      barColor = "#EAB308";
    }

    // Dust haze alpha from 0.05 (at tau=1.0) to 0.94 (at tau=10.8)
    const normTau = Math.min(1, Math.max(0, (tau - 1.0) / (10.8 - 1.0)));
    const hazeAlpha = (0.05 + normTau * 0.89).toFixed(2);
    const sunOpacity = Math.max(0.02, (1 - normTau * 0.98)).toFixed(2);
    const sunTransmission = Math.max(0.002, Math.exp(-tau) * 271.8).toFixed(1);

    const svgMarkup = `
      <svg viewBox="0 0 480 260" class="w-full h-full select-none" aria-label="Opportunity Rover Dust Storm Opacity Simulation">
        <defs>
          <linearGradient id="marsSkyClear" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.35" />
            <stop offset="60%" stop-color="#FB923C" stop-opacity="0.55" />
            <stop offset="100%" stop-color="#7C2D12" stop-opacity="0.9" />
          </linearGradient>
        </defs>

        <!-- Base Martian Sky -->
        <rect x="0" y="0" width="480" height="260" fill="url(#marsSkyClear)" />

        <!-- Solar Disk in Meridiani Planum Sky (Dims out as Tau -> 10.8) -->
        <g transform="translate(365, 66)" opacity="${sunOpacity}">
          <circle cx="0" cy="0" r="34" fill="#FDE047" opacity="0.28" />
          <circle cx="0" cy="0" r="20" fill="#FEF08A" />
          <!-- Sun rays -->
          <line x1="0" y1="26" x2="-95" y2="95" stroke="#FDE047" stroke-width="2" stroke-dasharray="5 5" />
          <line x1="-15" y1="22" x2="-135" y2="92" stroke="#FDE047" stroke-width="1.5" stroke-dasharray="5 5" />
        </g>

        <!-- Dynamic Martian Dust Storm Haze Layer: rgba(154, 52, 18, alpha) -->
        <rect x="0" y="0" width="480" height="205" fill="rgba(154, 52, 18, ${hazeAlpha})" />

        <!-- Perseverance Valley / Meridiani Planum Terrain -->
        <path d="M 0 198 Q 140 184 290 196 T 480 188 L 480 260 L 0 260 Z" fill="#431407" stroke="#9A3412" stroke-width="1.2" />
        <!-- Hematite 'Blueberries' on Ground -->
        <circle cx="95" cy="222" r="3" fill="#64748B" />
        <circle cx="112" cy="228" r="2.5" fill="#94A3B8" />
        <circle cx="348" cy="224" r="3" fill="#64748B" />

        <!-- Opportunity Rover (MER-B) Illustration -->
        <g transform="translate(230, 166)">
          <!-- 6 Wheels & Rocker-Bogie Suspension -->
          <line x1="-42" y1="16" x2="-52" y2="32" stroke="#CBD5E1" stroke-width="2.5" />
          <line x1="-12" y1="16" x2="-4" y2="32" stroke="#CBD5E1" stroke-width="2.5" />
          <line x1="28" y1="16" x2="46" y2="32" stroke="#CBD5E1" stroke-width="2.5" />
          <circle cx="-52" cy="34" r="9" fill="#1E293B" stroke="#94A3B8" stroke-width="2" />
          <circle cx="-4" cy="34" r="9" fill="#1E293B" stroke="#94A3B8" stroke-width="2" />
          <circle cx="46" cy="34" r="9" fill="#1E293B" stroke="#94A3B8" stroke-width="2" />

          <!-- Warm Electronics Box (Gold Body) -->
          <rect x="-38" y="-4" width="76" height="22" rx="3" fill="#D97706" stroke="#FDE047" stroke-width="1.2" />

          <!-- Triple-Junction Gallium-Arsenide Solar Wings (Coated with dust as tau rises) -->
          <polygon points="-76,-6 76,-6 62,-18 -62,-18" fill="#1E3A8A" stroke="#38BDF8" stroke-width="1.5" />
          <polygon points="-76,-6 76,-6 62,-18 -62,-18" fill="rgba(154, 52, 18, ${(normTau * 0.85).toFixed(2)})" />

          <!-- Pancam Mast -->
          <line x1="22" y1="-10" x2="22" y2="-46" stroke="#E2E8F0" stroke-width="3" />
          <rect x="13" y="-52" width="18" height="8" rx="2" fill="#F8FAFC" stroke="#475569" stroke-width="1" />
          <circle cx="17" cy="-48" r="2" fill="${tau >= 10.5 ? '#EF4444' : '#38BDF8'}" />
          <circle cx="27" cy="-48" r="2" fill="${tau >= 10.5 ? '#EF4444' : '#38BDF8'}" />

          <!-- On-Rover Solar Array Energy Gauge -->
          <g transform="translate(-58, 48)">
            <rect x="0" y="0" width="116" height="16" rx="4" fill="#0F172A" stroke="rgba(255,255,255,0.28)" stroke-width="1" />
            <rect x="2" y="2" width="${Math.max(6, Math.round((batteryPct / 100) * 112))}" height="12" rx="2.5" fill="${barColor}" class="${tau >= 10.0 ? 'animate-pulse' : ''}" />
            <text x="58" y="11.5" text-anchor="middle" fill="#F8FAFC" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700">
              ARRAY OUTPUT: ${wattHours} Wh (${batteryPct}%)
            </text>
          </g>
        </g>

        <!-- Telemetry Header Overlay -->
        <g transform="translate(16, 18)">
          <rect x="0" y="0" width="305" height="48" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="${barColor}" stroke-width="1.5" />
          <text x="12" y="18" fill="#E7F434" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">
            OPTICAL DEPTH τ = ${tau.toFixed(1)} | POWER E = ${wattHours} Wh/sol
          </text>
          <text x="12" y="35" fill="#CBD5E1" font-family="JetBrains Mono, monospace" font-size="8.2">
            ${tau >= 10.8 ? "Sol 5111 (June 10, 2018): Binary Packet Only — Clock Asleep" : "45.16 km Total Odometer | 5,111 Sols (55× Design Life)"}
          </text>
        </g>
      </svg>
    `;

    return {
      svg: svgMarkup,
      statusText: lang === "vi" ? stateVi : stateEn,
      metrics: [
        {
          label: lang === "vi" ? "ĐỘ MỜ KHÍ QUYỂN (τ)" : "OPTICAL DEPTH (Tau τ)",
          value: `τ = ${tau.toFixed(1)}`,
          sub: tau >= 10.8 ? "Sol 5111 Historic Peak" : `Direct Sun: ~${sunTransmission}%`,
          tip:
            lang === "vi"
              ? "τ là độ mờ bầu trời: τ 1 là trời quang, τ 10,8 biến buổi trưa thành đêm."
              : "Tau is sky haziness: τ 1 is a clear sky, τ 10.8 turns noon into night."
        },
        {
          label: lang === "vi" ? "CÔNG SUẤT ĐIỆN (E)" : "SOLAR ENERGY (E)",
          value: `${wattHours} Wh/sol`,
          sub: `${batteryPct}% of 700 Wh Nominal`,
          tip:
            lang === "vi"
              ? "Điện thu mỗi ngày Sao Hỏa: 700 Wh chạy đủ mọi thứ, 22 Wh chỉ đủ giữ đồng hồ sống."
              : "Energy per Martian day: 700 Wh runs everything, 22 Wh barely keeps the clock alive."
        },
        {
          label: lang === "vi" ? "QUÃNG ĐƯỜNG ĐÃ LĂN BÁNH" : "TOTAL ODOMETER",
          value: `45.16 km`,
          sub: "5,111 Sols (Design: 90 Sols)",
          tip:
            lang === "vi"
              ? "Quãng đường 15 năm: 45,16 km — bằng một cuộc marathon cộng thêm 3 km!"
              : "15 years of driving: 45.16 km — a marathon plus 3 more kilometres!"
        }
      ]
    };
  }

  /**
   * Chapter 04: Ingenuity Mars Helicopter (Ginny)
   * Variable F: Flight 1 -> Flight 72 (step 1, default 72)
   */
  function computeChapter4(flightVal, lang) {
    const F = Math.round(Number(flightVal));
    let distanceStr = "0 m (3.0 m Hover)";
    let timeStr = "0.7 min (39.1 s)";
    let rpmStr = "2,537 RPM";
    let phaseEn = "Original Technology Demonstration (Target: 5 Flights in 30 Sols)";
    let phaseVi = "Trình diễn Công nghệ Gốc (Mục tiêu: 5 Chuyến bay trong 30 Sol)";
    let badgeColor = "#38BDF8";

    if (F === 1) {
      distanceStr = "0 m (3 m Alt)";
      timeStr = "0.65 min (39.1 s)";
    } else if (F <= 5) {
      // Flights 1 to 5: cumulative distance reaches 499 m
      const distM = Math.round(((F - 1) / 4) * 499);
      const mins = (0.65 + ((F - 1) / 4) * 5.2).toFixed(1);
      distanceStr = `${distM} m`;
      timeStr = `${mins} min`;
      phaseEn = "Original Technology Demonstration (Target: 5 Flights in 30 Sols)";
      phaseVi = "Trình diễn Công nghệ Gốc (Mục tiêu: 5 Chuyến bay trong 30 Sol)";
    } else if (F < 72) {
      // Flights 6 to 71: Operational Aerial Scout up to ~16.9 km
      const distKm = (0.5 + ((F - 5) / 67) * 16.5).toFixed(1);
      const mins = (5.9 + ((F - 5) / 67) * 122.9).toFixed(1);
      distanceStr = `${distKm} km`;
      timeStr = `${mins} min`;
      phaseEn = "Operational Aerial Scout for Perseverance Rover";
      phaseVi = "Trinh sát Đường không Thực địa cho Xe Perseverance";
      badgeColor = "#E7F434";
    } else {
      // Flight 72 (Sol 1036 - Jan 18, 2024)
      distanceStr = "17.0 km";
      timeStr = "128.8 minutes";
      rpmStr = "0 RPM (Stationary)";
      phaseEn = "Carbon-Fiber Rotor Blade Tip Damaged on Touchdown — Reborn as Stationary Weather & Avionics Testbed (~20 Years Memory)";
      phaseVi = "Gãy Đầu Cánh Quạt Sợi Carbon Khi Tiếp Đất — Tái Sinh Thành Trạm Thời Tiết & Vi Mạch Tĩnh (~20 Năm Bộ Nhớ)";
      badgeColor = "#10B981";
    }

    const isFlight72 = F === 72;
    const heliY = isFlight72 ? 158 : 108;

    const svgMarkup = `
      <svg viewBox="0 0 480 260" class="w-full h-full select-none" aria-label="Ingenuity Mars Helicopter Flight and Stationary Rebirth Simulation">
        <defs>
          <linearGradient id="jezeroSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1E1B4B" />
            <stop offset="65%" stop-color="#7C2D12" />
            <stop offset="100%" stop-color="#451A03" />
          </linearGradient>
        </defs>

        <!-- Martian CO2 Atmosphere Background (~1% Earth Density) -->
        <rect x="0" y="0" width="480" height="260" fill="url(#jezeroSkyGrad)" />

        <!-- Valinor Hills & Neretva Vallis Sand Ripples -->
        <path d="M 0 202 Q 95 178 210 198 T 480 185 L 480 260 L 0 260 Z" fill="#78350F" stroke="#B45309" stroke-width="1.2" />
        <path d="M 120 222 Q 240 204 380 224" fill="none" stroke="#92400E" stroke-width="1.5" />

        <!-- Flight Trajectory Path across Jezero Crater -->
        <path d="M 48 194 Q 155 110 270 ${heliY + 18}" fill="none" stroke="#38BDF8" stroke-width="2" stroke-dasharray="5 4" />
        <circle cx="48" cy="194" r="4" fill="#38BDF8" />
        <text x="58" y="210" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="8">Wright Bros Field</text>

        <!-- Stationary Rebirth Green Telemetry Waves (Active at Flight 72) -->
        ${
          isFlight72
            ? `
          <g transform="translate(270, ${heliY + 12})">
            <circle cx="0" cy="0" r="16" fill="none" stroke="#10B981" stroke-width="2.2" class="stationary-beacon-wave-1" />
            <circle cx="0" cy="0" r="32" fill="none" stroke="#34D399" stroke-width="1.8" class="stationary-beacon-wave-2" />
            <text x="0" y="-56" text-anchor="middle" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700">
              📡 DAILY WEATHER &amp; AVIONICS LOG (~20 YRS MEMORY)
            </text>
          </g>
        `
            : ""
        }

        <!-- Ingenuity Helicopter (1.8 kg, 1.2 m Coaxial Rotors) -->
        <g transform="translate(0, ${heliY - 108})">
          <!-- Shadow on Martian Sand -->
          <ellipse cx="270" cy="${208 - (heliY - 108)}" rx="${isFlight72 ? 32 : 20}" ry="5" fill="rgba(0,0,0,0.45)" />

          <!-- Solar Panel Array on Top of Mast -->
          <rect x="248" y="102" width="44" height="6" rx="1.5" fill="#1E3A8A" stroke="#E7F434" stroke-width="1.2" />
          <line x1="270" y1="108" x2="270" y2="140" stroke="#CBD5E1" stroke-width="3.5" />

          <!-- Upper Coaxial Carbon-Fiber Rotor -->
          <g class="ingenuity-rotor-top ${isFlight72 ? "" : "spinning"}">
            <ellipse cx="270" cy="116" rx="68" ry="4.5" fill="#334155" stroke="#94A3B8" stroke-width="1.2" />
          </g>

          <!-- Lower Coaxial Carbon-Fiber Rotor (Damaged Tip on Flight 72) -->
          <g class="ingenuity-rotor-bottom ${isFlight72 ? "" : "spinning"}">
            <ellipse cx="270" cy="128" rx="${isFlight72 ? 58 : 68}" ry="4.5" fill="#1E293B" stroke="${isFlight72 ? "#EF4444" : "#38BDF8"}" stroke-width="1.2" />
          </g>

          ${
            isFlight72
              ? `
            <!-- Red Warning Indicator at Damaged Rotor Blade Tip -->
            <g transform="translate(332, 128)">
              <circle cx="0" cy="0" r="8" fill="rgba(239, 68, 68, 0.25)" stroke="#EF4444" stroke-width="1.8" class="animate-ping" />
              <circle cx="0" cy="0" r="4" fill="#EF4444" />
              <polygon points="10,4 18,12 12,14" fill="#334155" stroke="#EF4444" stroke-width="1" />
              <text x="12" y="-6" fill="#EF4444" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700">
                ROTOR TIP DAMAGED (Sol 1036)
              </text>
            </g>
          `
              : ""
          }

          <!-- Tissue-Box Fuselage & 4 Ultra-Light Landing Legs -->
          <rect x="256" y="138" width="28" height="22" rx="3" fill="#CBD5E1" stroke="#0F172A" stroke-width="1.5" />
          <circle cx="270" cy="149" r="4" fill="${isFlight72 ? "#10B981" : "#38BDF8"}" />
          <line x1="258" y1="158" x2="236" y2="182" stroke="#94A3B8" stroke-width="2" />
          <line x1="282" y1="158" x2="304" y2="182" stroke="#94A3B8" stroke-width="2" />
          <line x1="262" y1="158" x2="248" y2="184" stroke="#64748B" stroke-width="1.5" />
          <line x1="278" y1="158" x2="292" y2="184" stroke="#64748B" stroke-width="1.5" />
        </g>

        <!-- Top Telemetry Readout Box -->
        <g transform="translate(16, 16)">
          <rect x="0" y="0" width="318" height="46" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="${badgeColor}" stroke-width="1.5" />
          <text x="12" y="18" fill="${badgeColor}" font-family="JetBrains Mono, monospace" font-size="9.5" font-weight="700">
            FLIGHT ${F} OF 72 | DISTANCE: ${distanceStr}
          </text>
          <text x="12" y="34" fill="#E2E8F0" font-family="JetBrains Mono, monospace" font-size="8">
            Rotors: ${rpmStr} | Aloft: ${timeStr}
          </text>
        </g>
      </svg>
    `;

    return {
      svg: svgMarkup,
      statusText: lang === "vi" ? phaseVi : phaseEn,
      metrics: [
        {
          label: lang === "vi" ? "CHUYẾN BAY & VÒNG QUAY" : "FLIGHT & ROTOR RPM",
          value: `Flight ${F}`,
          sub: rpmStr,
          tip:
            lang === "vi"
              ? "Không khí Sao Hỏa loãng bằng 1% Trái Đất nên cánh quạt phải quay siêu nhanh mới nâng nổi."
              : "Martian air is 1% as thick as Earth's, so the rotors must spin super fast to lift."
        },
        {
          label: lang === "vi" ? "TỔNG QUÃNG ĐƯỜNG BAY" : "CUMULATIVE DISTANCE",
          value: distanceStr,
          sub: F === 72 ? "14× Design Target" : "1% Earth Air Density",
          tip:
            lang === "vi"
              ? "Quãng đường cộng dồn sau mỗi chuyến — thiết kế gốc chỉ nhắm ~0,5 km."
              : "Cumulative distance after each flight — the original design aimed at ~0.5 km."
        },
        {
          label: lang === "vi" ? "TỔNG THỜI GIAN BAY" : "CUMULATIVE FLIGHT TIME",
          value: timeStr,
          sub: F === 72 ? "Stationary ~20 Yr Logger" : "Target: 5 Flights / 30 Sols",
          tip:
            lang === "vi"
              ? "Tổng thời gian trên không: 128,8 phút — gần ba tiết học liền nhau!"
              : "Total time aloft: 128.8 minutes — nearly three school periods back to back!"
        }
      ]
    };
  }

  function evaluateArtifact(artifactId, sliderValue, lang) {
    switch (artifactId) {
      case "apollo11-lrrr":
        return computeChapter1(sliderValue, lang);
      case "surveyor-3":
        return computeChapter2(sliderValue, lang);
      case "opportunity-rover":
        return computeChapter3(sliderValue, lang);
      case "ingenuity-helicopter":
        return computeChapter4(sliderValue, lang);
      default:
        return computeChapter1(sliderValue, lang);
    }
  }

  return {
    evaluateArtifact,
    calculateOpportunityPower
  };
})();

