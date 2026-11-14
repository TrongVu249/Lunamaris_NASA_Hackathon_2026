/**
 * LUNAMARIS: Letters Across the Silent Seas
 * Module: The Artemis Landing Site Decision Station (Vacuum Ballistics Simulator)
 * NASA 2011 Recommendations, NASA SP-284, Public Law 116-275 & NASA GIC 21-07
 */

  window.LunamarisDecisionStation = window.RelicDecisionStation = (function () {
    // Stepped X coordinates on the 760x270 cross-section SVG for each boundary marker
    const MARKER_POSITIONS = {
      0: 76,      // Heritage Artifact (0 m)
      50: 158,    // < 75 m / 225 m Red Zone
      75: 190,    // 75 m Apollo 11 Artifact Boundary
      180: 295,   // 180 m Apollo 12 Historical Touchdown
      225: 365,   // 225 m Apollo 17 Artifact Boundary
      500: 475,   // 500 m (0.5 km) Impact Site Rule
      2000: 648   // >= 2,000 m (2.0 km) Artemis Heritage Safe Buffer
    };

    function renderCrossSectionSVG(selectedZone, lang) {
      const dist = selectedZone.distance_num;
      const landerX = MARKER_POSITIONS[dist] || 295;
      const color = selectedZone.color_hex;

      // Ballistic ejecta reach from lander toward the artifact at x=76
      // In 1/6g vacuum, plume ejecta travels ~1.8 km horizontally before hitting the ground
      let plumeEndX = 76;
      if (dist === 50) plumeEndX = 48; // Direct blast sweeps past artifact
      else if (dist === 180) plumeEndX = 68; // Sandblasts artifact directly
      else if (dist === 500) plumeEndX = 74; // Fine dust settles on LRRR
      else if (dist >= 2000) plumeEndX = 240; // Falls harmlessly to ground before 225m/75m boundary!

      const isSafe = selectedZone.unlocks_badge;

      return `
      <svg viewBox="0 0 760 270" class="w-full h-auto select-none" aria-label="Artemis Lunar Landing Vacuum Ballistics Cross-Section">
        <defs>
          <linearGradient id="lunarRegolithGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
          <radialGradient id="plumeBlastGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.65" />
            <stop offset="100%" stop-color="${color}" stop-opacity="0.0" />
          </radialGradient>
        </defs>

        <!-- Lunar Vacuum Sky Background -->
        <rect x="0" y="0" width="760" height="270" rx="12" fill="#0F111C" />

        <!-- Subtle Grid Lines -->
        <line x1="76" y1="36" x2="76" y2="210" stroke="#38BDF8" stroke-width="1" stroke-dasharray="3 3" opacity="0.5" />
        <line x1="190" y1="54" x2="190" y2="210" stroke="#EF4444" stroke-width="1" stroke-dasharray="4 4" opacity="0.55" />
        <line x1="295" y1="54" x2="295" y2="210" stroke="#F97316" stroke-width="1" stroke-dasharray="4 4" opacity="0.5" />
        <line x1="365" y1="54" x2="365" y2="210" stroke="#EF4444" stroke-width="1" stroke-dasharray="2 3" opacity="0.4" />
        <line x1="475" y1="54" x2="475" y2="210" stroke="#EAB308" stroke-width="1" stroke-dasharray="4 4" opacity="0.5" />
        <line x1="648" y1="36" x2="648" y2="210" stroke="#10B981" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.8" />

        <!-- Stepped Scale Top Banner -->
        <text x="380" y="22" text-anchor="middle" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">
          ${lang === "vi"
          ? "SƠ ĐỒ MẶT CẮT ĐẠN ĐẠO CHÂN KHÔNG (THANG ĐO BẬC THANG: 0 m → 75 m → 180 m → 225 m → 500 m → 2.000 m)"
          : "VACUUM BALLISTICS CROSS-SECTION (STEPPED SCALE: 0 m → 75 m → 180 m → 225 m → 500 m → 2,000 m)"
        }
        </text>

        <!-- Lunar Surface Terrain -->
        <path d="M 0 205 L 760 205 L 760 270 L 0 270 Z" fill="url(#lunarRegolithGrad)" stroke="#475569" stroke-width="1.5" />

        <!-- Zone Color Bands on Surface -->
        <rect x="76" y="202" width="114" height="6" fill="#EF4444" opacity="0.85" />
        <rect x="190" y="202" width="175" height="6" fill="#F97316" opacity="0.8" />
        <rect x="365" y="202" width="283" height="6" fill="#EAB308" opacity="0.75" />
        <rect x="648" y="202" width="96" height="6" fill="#10B981" opacity="0.9" />

        <!-- Heritage Artifact at 0m (Apollo 11 Eagle + LRRR + Surveyor 3) -->
        <g transform="translate(76, 184)">
          <!-- Protective Dome Graphic -->
          <path d="M -38 20 A 42 36 0 0 1 42 20" fill="${isSafe ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.15)'}" stroke="${isSafe ? '#10B981' : color}" stroke-width="1.8" stroke-dasharray="4 3" />
          <!-- Eagle Lander Icon -->
          <rect x="-14" y="-4" width="24" height="14" rx="2" fill="#D97706" stroke="#FDE047" stroke-width="1.2" />
          <line x1="-12" y1="10" x2="-20" y2="20" stroke="#F59E0B" stroke-width="2" />
          <line x1="8" y1="10" x2="16" y2="20" stroke="#F59E0B" stroke-width="2" />
          <!-- LRRR Prism next to it -->
          <rect x="18" y="12" width="12" height="8" fill="#38BDF8" stroke="#F8FAFC" stroke-width="1" />
          <text x="2" y="-22" text-anchor="middle" fill="#38BDF8" font-family="JetBrains Mono, monospace" font-size="9.5" font-weight="700">
            HERITAGE SITE (0 m)
          </text>
          <text x="2" y="-10" text-anchor="middle" fill="${isSafe ? '#10B981' : color}" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700">
            ${isSafe ? "✓ 100% PRESERVED" : "⚠️ PLUME IMPACT!"}
          </text>
        </g>

        <!-- Ballistic Ejecta Trajectories from Artemis Lander Engine (300 - 2,000 m/s) -->
        <g>
          <circle cx="${landerX}" cy="196" r="34" fill="url(#plumeBlastGrad)" />
          <!-- High trajectory arc -->
          <path d="M ${landerX - 10} 194 Q ${(landerX + plumeEndX) / 2} 84 ${plumeEndX} 202" fill="none" stroke="${color}" stroke-width="2.6" class="sandblast-stream" />
          <!-- Mid trajectory arc -->
          <path d="M ${landerX - 12} 196 Q ${(landerX + plumeEndX) / 2} 124 ${plumeEndX + 18} 202" fill="none" stroke="${color}" stroke-width="2" class="sandblast-stream" />
          <!-- Low flat supersonic spray -->
          <path d="M ${landerX - 14} 198 Q ${(landerX + plumeEndX) / 2} 162 ${plumeEndX + 36} 203" fill="none" stroke="${color}" stroke-width="1.6" stroke-dasharray="4 4" />

          <!-- Velocity Label on Plume Arc -->
          <rect x="${(landerX + plumeEndX) / 2 - 78}" y="102" width="156" height="22" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="${color}" stroke-width="1.2" />
          <text x="${(landerX + plumeEndX) / 2}" y="116" text-anchor="middle" fill="${color}" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700">
            EJECTA: 300–2,000 m/s
          </text>
        </g>

        <!-- Artemis Human Landing System (HLS) Starship/Lander Icon at landerX -->
        <g transform="translate(${landerX}, 148)">
          <!-- Rocket Engine Plume Cone -->
          <polygon points="-8,36 8,36 22,55 -22,55" fill="${color}" opacity="0.85" />
          <!-- Tall Lunar Lander Body -->
          <rect x="-14" y="-12" width="28" height="48" rx="6" fill="#E2E8F0" stroke="#0F172A" stroke-width="1.5" />
          <polygon points="-14,-12 14,-12 0,-28" fill="#F8FAFC" stroke="#0F172A" stroke-width="1.5" />
          <rect x="-9" y="-2" width="18" height="8" rx="2" fill="#1E293B" />
          <!-- Landing Legs -->
          <line x1="-14" y1="28" x2="-26" y2="54" stroke="#94A3B8" stroke-width="2.5" />
          <line x1="14" y1="28" x2="26" y2="54" stroke="#94A3B8" stroke-width="2.5" />
          <!-- Label Above Artemis Lander -->
          <rect x="-66" y="-52" width="132" height="20" rx="4" fill="${color}" />
          <text x="0" y="-39" text-anchor="middle" fill="#0F172A" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700">
            ARTEMIS: ${selectedZone.distance_label.split(" ")[0]} ${selectedZone.distance_label.split(" ")[1] || ""}
          </text>
        </g>

        <!-- Stepped Scale Distance Markers & Regulatory Labels (Bottom) -->
        <g font-family="JetBrains Mono, monospace" font-size="9">
          <g transform="translate(76, 224)">
            <text x="0" y="0" text-anchor="middle" fill="#38BDF8" font-weight="700">0 m</text>
            <text x="0" y="13" text-anchor="middle" fill="#94A3B8" font-size="7.5">Artifact</text>
          </g>
          <g transform="translate(190, 224)">
            <text x="0" y="0" text-anchor="middle" fill="#EF4444" font-weight="700">75 m</text>
            <text x="0" y="13" text-anchor="middle" fill="#94A3B8" font-size="7.5">Apollo 11 Ring</text>
          </g>
          <g transform="translate(295, 224)">
            <text x="0" y="0" text-anchor="middle" fill="#F97316" font-weight="700">180 m</text>
            <text x="0" y="13" text-anchor="middle" fill="#94A3B8" font-size="7.5">Apollo 12 (1969)</text>
          </g>
          <g transform="translate(365, 224)">
            <text x="0" y="0" text-anchor="middle" fill="#EF4444" font-weight="700">225 m</text>
            <text x="0" y="13" text-anchor="middle" fill="#94A3B8" font-size="7.5">Apollo 17 Ring</text>
          </g>
          <g transform="translate(475, 224)">
            <text x="0" y="0" text-anchor="middle" fill="#EAB308" font-weight="700">500 m</text>
            <text x="0" y="13" text-anchor="middle" fill="#94A3B8" font-size="7.5">0.5 km Impact</text>
          </g>
          <g transform="translate(648, 224)">
            <text x="0" y="0" text-anchor="middle" fill="#10B981" font-weight="700">≥ 2,000 m</text>
            <text x="0" y="13" text-anchor="middle" fill="#10B981" font-size="7.5">2.0 km Safe Zone</text>
          </g>
        </g>
      </svg>
    `;
    }

    return {
      renderCrossSectionSVG
    };
  })();

