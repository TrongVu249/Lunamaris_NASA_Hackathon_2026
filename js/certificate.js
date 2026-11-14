/**
 * LUNAMARIS: Letters Across the Silent Seas
 * Module: Zero-PII "Space Heritage Guardian" Certificate & HTML5 Canvas Exporter
 * Strictly compliant with Space Apps Under-18 Privacy Rules & NASA Brand Guidelines (Zero NASA Logos)
 */

  window.LunamarisCertificate = window.RelicCertificate = (function () {
    function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
      const words = text.split(" ");
      let line = "";
      let currentY = y;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line.trim(), x, currentY);
          line = words[n] + " ";
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), x, currentY);
      return currentY;
    }

    /**
     * Renders a high-resolution PNG Certificate locally in the user's browser using HTML5 Canvas
     */
    function downloadCertificatePNG(state) {
      const i18n = window.UI_I18N[state.lang];
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 680;
      const ctx = canvas.getContext("2d");

      // 1. Background Cinder Dark
      const grad = ctx.createLinearGradient(0, 0, 1200, 680);
      grad.addColorStop(0, "#151622");
      grad.addColorStop(0.5, "#1E2030");
      grad.addColorStop(1, "#121526");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 680);

      // 2. Decorative Outer & Inner Borders
      ctx.strokeStyle = "#E7F434";
      ctx.lineWidth = 4;
      ctx.strokeRect(28, 28, 1144, 624);

      ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(42, 42, 1116, 596);

      // 3. Custom Vector Radar & Crescent Emblem (Top Left - Zero NASA Logos)
      ctx.save();
      ctx.translate(115, 110);
      ctx.strokeStyle = "#E7F434";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "#38BDF8";
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 1.4);
      ctx.stroke();
      ctx.fillStyle = "#10B981";
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Header Titles
      ctx.fillStyle = "#E7F434";
      ctx.font = "900 28px 'Fira Sans', sans-serif";
      ctx.fillText(i18n.cert_badge_header, 175, 98);

      ctx.fillStyle = "#38BDF8";
      ctx.font = "600 16px 'JetBrains Mono', monospace";
      ctx.fillText("LUNAMARIS: LETTERS ACROSS THE SILENT SEAS • 2.0 KM EXCLUSION BUFFER VERIFIED", 175, 128);

      // 5. Divider Line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(70, 162);
      ctx.lineTo(1130, 162);
      ctx.stroke();

      // 6. Callsign / Recipient Name
      ctx.fillStyle = "#94A3B8";
      ctx.font = "600 15px 'JetBrains Mono', monospace";
      ctx.fillText(i18n.cert_issued_to, 70, 206);

      const displayName = (state.guardianName || "").trim() || i18n.cert_default_name;
      ctx.fillStyle = "#F8FAFC";
      ctx.font = "800 36px 'Fira Sans', sans-serif";
      ctx.fillText(displayName.toUpperCase(), 70, 252);

      // 7. Selected Conservation Pledge Box
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.fillRect(70, 282, 1060, 138);
      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 2;
      ctx.strokeRect(70, 282, 1060, 138);

      const pledgeText = `"${i18n.cert_pledges[state.selectedPledgeIndex] || i18n.cert_pledges[0]}"`;
      ctx.fillStyle = "#E2E8F0";
      ctx.font = "italic 600 22px 'Overpass', sans-serif";
      wrapCanvasText(ctx, pledgeText, 98, 334, 1004, 34);

      // 8. 4 Mission Stamps Row
      ctx.fillStyle = "#94A3B8";
      ctx.font = "700 14px 'JetBrains Mono', monospace";
      ctx.fillText(i18n.cert_stamps_title, 70, 462);

      const stampDefs = [
        { id: "apollo11-lrrr", code: "01: LRRR (MOON)" },
        { id: "surveyor-3", code: "02: SURVEYOR 3 (MOON)" },
        { id: "opportunity-rover", code: "03: OPPORTUNITY (MARS)" },
        { id: "ingenuity-helicopter", code: "04: INGENUITY (MARS)" }
      ];

      stampDefs.forEach((st, idx) => {
        const bx = 70 + idx * 268;
        const by = 480;
        const isCollected = !!state.collectedStamps[st.id];

        ctx.fillStyle = isCollected ? "rgba(231, 244, 52, 0.14)" : "rgba(30, 41, 59, 0.65)";
        ctx.fillRect(bx, by, 250, 56);
        ctx.strokeStyle = isCollected ? "#E7F434" : "#475569";
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, 250, 56);

        ctx.fillStyle = isCollected ? "#E7F434" : "#94A3B8";
        ctx.font = "700 15px 'JetBrains Mono', monospace";
        ctx.fillText((isCollected ? "✓ " : "○ ") + st.code, bx + 16, by + 34);
      });

      // 9. Footer Station Anchor & Compliance Notice
      ctx.fillStyle = "#38BDF8";
      ctx.font = "600 14px 'JetBrains Mono', monospace";
      ctx.fillText("RECEIVING STATION: HANOI, VIETNAM (21.0285° N, 105.8542° E) • PUBLIC LAW 116-275 & NASA 2011 COMPLIANT", 70, 584);

      ctx.fillStyle = "#94A3B8";
      ctx.font = "400 13px 'Overpass', sans-serif";
      ctx.fillText(
        "Built for the 2026 NASA International Space Apps Challenge using NASA Open Data. Rendered locally in browser (Zero PII).",
        70,
        614
      );

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "LUNAMARIS_Space_Heritage_Guardian.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    /** Tách chữ thành các dòng vừa maxWidth (không vẽ) — để tính chiều cao ảnh trước khi vẽ. */
    function splitLines(ctx, text, maxWidth) {
      const words = String(text).split(" ");
      const lines = [];
      let line = "";
      words.forEach((w) => {
        const test = line ? line + " " + w : w;
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line);
          line = w;
        } else {
          line = test;
        }
      });
      if (line) lines.push(line);
      return lines;
    }

    /**
     * Lá thư thứ năm (DUSTER) → ảnh PNG dọc, vẽ ngay trên trình duyệt, không gửi đi đâu.
     * letter = { greeting, body: [đoạn], last, sign, title }
     */
    function downloadLetterPNG(letter) {
      const W = 1080;
      const PAD = 96;
      const TEXT_W = W - PAD * 2 - 28;
      const LH = 46;
      const BODY_FONT = "400 30px 'Overpass', sans-serif";

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.font = BODY_FONT;
      const paras = [letter.greeting].concat(letter.body || [], [letter.last]);
      const blocks = paras.map((p) => splitLines(ctx, p, TEXT_W));
      const textH = blocks.reduce((h, b) => h + b.length * LH + 24, 0);
      const H = Math.max(1080, 250 + textH + 210);

      canvas.width = W;
      canvas.height = H;

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#151622");
      grad.addColorStop(1, "#10131F");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 3;
      ctx.strokeRect(36, 36, W - 72, H - 72);

      // con dấu tròn (không dùng logo NASA)
      ctx.save();
      ctx.translate(W - PAD - 30, PAD + 26);
      ctx.fillStyle = "#E7F434";
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#151622";
      ctx.font = "800 26px 'Fira Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("5", 0, 9);
      ctx.restore();

      ctx.fillStyle = "#94A3B8";
      ctx.font = "600 20px 'JetBrains Mono', monospace";
      ctx.fillText("LUNAMARIS • HANOI 02:40 → 2076", PAD, PAD + 10);

      ctx.fillStyle = "#F8FAFC";
      ctx.font = "800 44px 'Fira Sans', sans-serif";
      ctx.fillText(letter.title || "", PAD, PAD + 70);

      // gạch dọc bên trái thân thư (giống .letter trên web)
      let y = 250;
      ctx.fillStyle = "#10B981";
      ctx.fillRect(PAD, y - 30, 3, textH - 10);

      ctx.font = BODY_FONT;
      blocks.forEach((lines, i) => {
        ctx.fillStyle = i === blocks.length - 1 ? "#E7F434" : "#E2E8F0";
        lines.forEach((ln) => {
          ctx.fillText(ln, PAD + 28, y);
          y += LH;
        });
        y += 24;
      });

      ctx.fillStyle = "#F8FAFC";
      ctx.font = "700 30px 'Fira Sans', sans-serif";
      ctx.fillText(letter.sign || "", PAD + 28, y + 20);

      ctx.fillStyle = "#94A3B8";
      ctx.font = "400 18px 'Overpass', sans-serif";
      ctx.fillText("NASA Space Apps Challenge 2026 • Made in your browser, no personal data.", PAD, H - 70);

      const link = document.createElement("a");
      link.download = "LUNAMARIS_Letter_5_DUSTER.png";
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return {
      downloadCertificatePNG,
      downloadLetterPNG
    };
  })();

