# TÀI LIỆU ĐẶC TẢ KỸ THUẬT & SẢN PHẨM (PRODUCT REQUIREMENTS DOCUMENT - PRD)
**Tên dự án:** LUNAMARIS: Letters Across the Silent Seas  
**Cuộc thi:** NASA International Space Apps Challenge 2026  
**Đề tài:** Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars  
**Kiến trúc mục tiêu:** Single-Page Interactive Story: truyện ảnh chạm để sang ảnh, trò chơi theo chặng, kèm chế độ đọc dạng cuộn (tối ưu cho AI Coding Agent: Claude Max / Argon / Qoder)  
**Tài liệu liên quan:** [Thiết kế trò chơi, bộ phát truyện và luồng theo chặng](superpowers/specs/2026-11-14-mini-games-artemis-design.md) · [Context dự án](CONTEXT_DU_AN.md)

---

## 1. TỔNG QUAN KIẾN TRÚC KỸ THUẬT & QUY TẮC TUÂN THỦ (COMPLIANCE RULES)

### 1.1. Ngăn xếp công nghệ (Tech Stack)
- **Kiến trúc:** Ứng dụng web một trang, thiết kế cho điện thoại trước (mobile-first) và **dùng đầy đủ trên cả điện thoại lẫn máy tính**. Chạy hoàn toàn trên trình duyệt (client-side 100%), **không có backend hay database**.
- **Công nghệ cốt lõi:** HTML5 ngữ nghĩa và **Vanilla JavaScript (ES6+)**, chia thành các module trong `js/`. **Không dùng React/Next/Vue** hay các thư viện UI lớn (Bootstrap, MUI).
- **CSS:** Tailwind được **biên dịch sẵn bằng Tailwind Standalone CLI** (không cần Node.js) thành một file CSS đã commit, sau đó **bỏ hẳn Tailwind CDN**. CSS riêng của dự án nằm trong `css/styles.css`.
- **Đồ họa tương tác:** **Inline SVG kết hợp CSS transform/filter**, điều khiển qua sự kiện `input` của `<input type="range">` và qua Pointer Events. **Không dùng thư viện 3D, WebGL, canvas game hay game engine.** Canvas chỉ dùng để xuất thẻ Guardian ra PNG.
- **Cơ chế dự phòng (Fallback):** Mỗi thanh trượt bắt buộc đi kèm 3–4 nút "Mốc trạng thái cố định" (Preset State Buttons). Bấm nút thì thanh trượt nhảy tới giá trị đó và giao diện cập nhật, để vẫn dùng được 100% khi thao tác kéo trên điện thoại bị kẹt.
- **Dữ liệu:** `data/content.json` là **nguồn duy nhất**. `js/data.js` được sinh lại từ JSON này (để vẫn chạy khi mở file trực tiếp, không bị lỗi CORS). Không sửa tay số liệu trong `data.js`.
- **Hosting:** Vercel, dự phòng bằng GitHub Pages. `.vercelignore` loại `docs/`, `*.docx`, `types/` khỏi bản deploy.

### 1.1a. Yêu cầu UI/UX thống nhất

Các yêu cầu này áp dụng cho mọi module.

| Hạng mục | Yêu cầu |
|---|---|
| **Luồng trải nghiệm** | Câu chuyện chạy theo chặng: Mở đầu (truyện ảnh) → Ch.1 → chuyển tiếp → … → Ch.4 → chuyển tiếp → Trạm Artemis IV → Kết (truyện ảnh) → thẻ Guardian và thư DUSTER. Trạng thái nằm tập trung trong `state.stage`. Chế độ đọc dạng cuộn luôn được giữ. Chi tiết xem bản thiết kế liên quan. |
| **Bộ phát truyện** (`js/story.js`) | Lớp phủ toàn màn hình (`role="dialog"`, `aria-modal`, cao `100dvh`, có `safe-area-inset`). Chạm, bấm chuột hoặc vuốt để sang ảnh. Bàn phím: → / Space sang tiếp, ← quay lại, Esc bỏ qua. Chữ hiện dần, lần chạm đầu cho hiện hết câu. Nút **Bỏ qua** và chấm tiến độ luôn hiện. Dữ liệu cảnh lấy từ `content.json` (`sequence`, `img`, `alt_vi/en`, `speaker`, `text_vi/en`). |
| **Ảnh truyện** | WebP (AVIF nếu có), mỗi ảnh ~80–150 KB, cả bộ dưới ~3 MB. Bố cục đặt nội dung chính ở **vùng an toàn giữa ảnh** và hiển thị bằng `object-fit: cover` (riêng ảnh bị cắt hỏng mới làm bản cắt dọc qua `<picture>`). **Không viết chữ vào ảnh.** Ảnh lỗi hoặc thiếu thì hiện nền tối kèm lời thoại. |
| **Trò chơi** (`js/games.js`) | Mỗi chương một thao tác (giữ, chạm hoặc kéo). Dùng **Pointer Events** chung cho chạm và chuột. Không dùng kéo-thả tự do. Mỗi trò có nút **Bỏ qua**. Thắng thì nhận thẻ luật dùng ở Trạm Artemis. |
| **Đáp ứng màn hình** | Breakpoint Tailwind: mặc định (<640 px) **1 cột**; `md` (≥768 px) bắt đầu dàn 2 cột; `lg` (≥1024 px) khu chơi và lá thư nằm cạnh nhau, bản đồ Artemis bên trái và các thẻ bên phải. Kiểm tra ở 375 px, 768 px và 1280 px. Không có thanh cuộn ngang. |
| **Chạm và nhấp** | Vùng chạm tối thiểu **44×44 px**. Đặt `touch-action: manipulation` cho các nút và vùng chơi. Bỏ qua các lần chạm trong lúc đang chuyển cảnh. Hiệu ứng hover chỉ đặt trong `@media (hover: hover)`. |
| **Chuyển động** | Chỉ dùng CSS transition/animation (crossfade ~400 ms, zoom chậm nhẹ). Tôn trọng `prefers-reduced-motion`: tắt zoom, đổi cảnh ngay, dừng các vòng lặp quay. |
| **Truy cập dễ dàng** | Độ tương phản đạt WCAG AA. Thanh trượt có `aria-valuetext` (ví dụ "160 mét"). Mọi trò chơi chơi được bằng bàn phím (Space giữ laser, phím mũi tên điều khiển thanh trượt). Có `:focus-visible` rõ ràng. Mọi ảnh có `alt` song ngữ. |
| **Âm thanh** | Không tự phát. Chỉ phát sau lần chạm đầu tiên, dùng `<audio preload="none">`, file MP3 mono dưới 0,5 MB, luôn có nút tắt tiếng. |
| **Song ngữ** | Từ điển EN/VI trong `content.json`. Đổi ngôn ngữ tức thời, không tải lại trang, không làm mất tiến độ đang chơi. |
| **Ghi nhớ trên máy** | Chỉ dùng `localStorage` (có bọc try/catch) để lưu `lunamaris_seen_intro`, chặng hiện tại và các thẻ luật đã nhận. **Không lưu tên, biệt danh hay bất kỳ dữ liệu cá nhân nào.** |
| **Link vào thẳng** | `#ch1`…`#ch4`, `#artemis` bỏ qua phần truyện và mở thẳng chặng đó (dành cho giám khảo và giáo viên). |
| **Hiệu năng** | Màn hình đầu (ảnh mở đầu đầu tiên và chữ) hiện trong **~1,5 s trên 4G**. Toàn bộ JS và CSS (chưa nén) dưới ~250 KB. Ảnh đặt `loading="lazy"` và ghi `width`/`height`. Luôn tải trước 1–2 ảnh truyện kế tiếp, và tải ngầm bộ ảnh chuyển tiếp của chặng sau trong lúc người chơi đang chơi. Lighthouse Mobile Performance đạt từ 85 trở lên. |
| **Phông chữ** | Tự lưu font kèm web (WOFF2, chỉ giữ bộ ký tự Latin và tiếng Việt), dùng `font-display: swap` và `preload` cho font nội dung chính. Không gọi Google Fonts lúc chạy. |

### 1.2. Các ràng buộc pháp lý bắt buộc của NASA Space Apps 2026
1. **Cấm sử dụng Logo NASA:** Tuyệt đối KHÔNG hiển thị logo chính thức của NASA ("Meatball" hình tròn xanh hoặc "Worm" chữ đỏ) ở bất kỳ đâu trên trang web hay trên Thẻ Chứng nhận. Chỉ sử dụng biểu tượng SVG vector tự vẽ (hình mặt trăng, vệ tinh, sóng radar) và ghi nhận văn bản: *"Built for the 2026 NASA International Space Apps Challenge using public NASA Open Data"*. Ảnh truyện do AI tạo phải được liệt kê trong mục SI Disclosure; ảnh NASA phải ghi công.
2. **Nhãn phân định Nhận thức luận (Epistemic Labeling):** Mọi chương kể chuyện phải có nhãn gắn rõ ràng phân biệt giữa:
   - `[NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY]` (Diễn giải văn học dựa trên thông số đo xa).
   - `[VERIFIED SCIENTIFIC & LEGAL RECORD]` (Hồ sơ khoa học và pháp lý đã kiểm chứng).
3. **Khai báo Super Intelligence (SI Disclosure 2026):** Chân trang và cửa sổ Modal bắt buộc dùng đúng thuật ngữ **"Super Intelligence (SI) Disclosure"** theo quy chế năm 2026.

---

## 2. HỆ THỐNG THIẾT KẾ THỊ GIÁC (DESIGN SYSTEM)

### 2.1. Bảng màu chuẩn (NASA Space Apps Brand Palette)
- **Nền chính (Background Primary - Cinder Dark):** `#151622`
- **Nền thẻ / Khung nổi (Surface Card):** `#1E2030` (kèm viền mảnh `1px solid rgba(255, 255, 255, 0.12)`)
- **Màu nhấn chính (Primary Brand - Deep Space Blue):** `#1B2B85`
- **Màu nhấn tương tác / Điểm nóng dữ liệu (Accent - Neon Starship Yellow):** `#E7F434`
- **Màu tín hiệu Mặt Trăng (Lunar Cyan):** `#38BDF8`
- **Màu tín hiệu Sao Hỏa (Martian Amber):** `#F97316`
- **Màu trạng thái cảnh báo (Alert Red / Safe Green):** `#EF4444` (Nguy hiểm) / `#10B981` (An toàn)
- **Màu chữ (Typography Colors):** Chữ chính `#F8FAFC` (Trắng sáng), Chữ phụ/chú thích `#94A3B8` (Xám bạc).

### 2.2. Phông chữ (Typography - tự lưu font WOFF2, xem mục 1.1a)
- **Tiêu đề (Headings):** `'Fira Sans', sans-serif` ( Trọng lượng: `700 Bold`, `900 Black`).
- **Nội dung văn bản & Thư (Body & Narrative):** `'Overpass', sans-serif` (Trọng lượng: `400 Regular`, `600 SemiBold`).
- **Số liệu đo xa & Tọa độ (Telemetry & Coordinates):** `'JetBrains Mono', monospace` hoặc `'Overpass Mono', monospace`.

---

## 3. CẤU TRÚC BỐ CỤC 6 PHẦN CỦA TRANG WEB (LAYOUT & WIREFRAME)

> **Luồng theo chặng:** 6 phần dưới đây là bố cục của **chế độ đọc** (trang cuộn). Phía trên trang là **bộ phát truyện** (lớp phủ toàn màn hình), tự phát ở mở đầu, giữa các chặng và ở phần kết. Mỗi chương ở Phần 3 có thêm **một trò chơi**; thắng thì nhận thẻ luật. Xem mục 1.1a và bản thiết kế liên quan.

### Phần 1: Thanh điều hướng cố định (Sticky Header & Stamp Collector)
- **Bên trái:** Tên dự án `LUNAMARIS` kèm chấm tròn phát sáng nhấp nháy (`animate-pulse` màu `#E7F434`).
- **Giữa (Bộ sưu tập Tem tín hiệu - Mission Stamps):** 4 biểu tượng con dấu đại diện cho 4 chương (`[01: LRRR]`, `[02: SURVEYOR 3]`, `[03: OPPORTUNITY]`, `[04: INGENUITY]`). Mặc định các tem có màu xám mờ (`opacity-40`). Khi người dùng kéo thanh trượt hoặc bấm nút mốc của chương nào, tem của chương đó lập tức sáng rực màu vàng `#E7F434` và lưu trạng thái vào biến bộ nhớ.
- **Bên phải:**
  - Bộ lọc nhanh: `[All (4)]` | `[Moon (2)]` | `[Mars (2)]`.
  - Nút chuyển đổi ngôn ngữ: `[EN | VI]` (Thay đổi văn bản tức thời từ dữ liệu JSON).

### Phần 2: Màn hình mở đầu (Hero Section - Mỏ neo Tọa độ Hà Nội)
- **Visual nền:** Hiệu ứng bầu trời sao tĩnh/CSS nhẹ và sóng radar đồng tâm lan tỏa từ tâm màn hình.
- **Hộp tín hiệu địa phương (Local Telemetry Anchor Box):**
  - Hiển thị dòng trạng thái bằng font Monospace:  
    `RECEIVING STATION: HANOI, VIETNAM (21.0285° N, 105.8542° E)`  
    `LUNAR LASER ROUND-TRIP: 2.56 SECONDS | MARTIAN RADIO DELAY: 4 TO 24 MINUTES`
- **Câu dẫn nhập (Intro Hook):**
  - *EN:* "Looking up from the autumn night sky of Hanoi, we often think completed space missions are dead metal. Flip the receiver switch below: across the silent seas of the Moon and the dusty plains of Mars, NASA's forgotten hardware is still sending us decades of scientific truth."
  - *VI:* "Ngước nhìn bầu trời đêm thu Hà Nội, chúng ta thường ngỡ những sứ mệnh vũ trụ đã khép lại chỉ còn là sắt vụn vô tri. Hãy bật công tắc thu sóng bên dưới: khắp các biển lặng Mặt Trăng và bình nguyên bụi đỏ Sao Hỏa, những thiết bị bị bỏ lại của NASA vẫn đang gửi về hàng thập kỷ chân lý khoa học."
- **Nút hành động (CTA):** `[Tune Into the 4 Relic Signals ↓]` (Cuộn mượt xuống Chương 1) và `[Jump to Artemis Landing Simulator ⚡]`.

### Phần 3: Lõi Scrollytelling 4 Chương Di vật (The 4 Relic Chapters)
Mỗi chương là một khối thẻ lớn (`max-w-6xl mx-auto my-16 p-6 rounded-2xl bg-[#1E2030]`) được chia làm **2 Cột trên máy tính (Desktop 2-Column)** và **Xếp chồng trên điện thoại (Mobile Stacked)**:

#### Cột Trái (50%): Trạm Mô phỏng Thanh trượt Vật lý (Interactive Telemetry Station)
1. **Khung hiển thị thị giác (Visual Viewport):**
   - Lớp dưới: Ảnh chụp lịch sử thuộc phạm vi công cộng (Public Domain) của NASA (có phương án dự phòng: nếu máy khách không có mạng hoặc link ảnh NASA tải chậm, tự động hiển thị đồ họa nền SVG tương ứng).
   - Lớp trên: **Đồ họa SVG tương tác (Dynamic SVG Overlay)** thay đổi theo thời gian thực khi kéo thanh trượt.
   - Góc dưới ảnh: Dòng ghi công nguồn ảnh chuẩn (`Photo Credit: NASA / NSSDCA ID...`).
2. **Bảng đồng hồ đo xa (Live Telemetry Readout):**
   - Hiển thị 2–3 con số biến thiên theo công thức toán học (màu `#E7F434`, phông chữ Monospace cỡ lớn).
3. **Thanh trượt & Nút mốc dự phòng (Range Slider & Preset Buttons):**
   - Thanh trượt `<input type="range">` cỡ lớn dễ chạm trên di động.
   - Hàng 3 nút bấm nhanh ngay dưới thanh trượt (ví dụ Chương 3: `[Sol 1: τ = 1.0]` | `[2007 Storm: τ = 5.5]` | `[Sol 5111: τ = 10.8]`).
4. **Hộp giải thích trạng thái & Nút "Where does this number come from?" (`Số này từ đâu?`):**
   - Khi bấm vào nút `[ⓘ Where does this number come from?]`, mở ra một ngăn kéo nhỏ (Accordion) hiển thị công thức vật lý, tài liệu gốc của NASA (kèm link bấm được) và ghi chú giải thích độ lệch số liệu lịch sử.

#### Cột Phải (50%): Kiến trúc Hai Giọng Kể (Dual-Voice Narrative Panel)
Có thanh chuyển đổi 2 Tab rõ rệt (hoặc hiển thị song song):
- **Tab 1: `[📡 The Machine's Pulse]` (Giọng Cỗ máy):**
  - Huy hiệu bắt buộc màu xanh lam: `NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY`.
  - Nội dung bức thư ngôi thứ nhất dài ~120 từ được trình bày dạng bưu thiếp vũ trụ.
- **Tab 2: `[🏛️ Archaeologist & Science Dossier]` (Giọng Nhà khảo cổ):**
  - Huy hiệu bắt buộc màu xanh lá: `VERIFIED SCIENTIFIC & LEGAL RECORD`.
  - Chia rõ 3 mục có biểu tượng:
    1. **How the Mission Operated & The Science It Made Possible** (Cơ chế vận hành & Thành tựu khoa học).
    2. **Current Functionality & Material State** (Trạng thái hoạt động hiện tại).
    3. **Space Heritage & Conservation Law** (Luật bảo tồn & Vùng cấm).

---

## 4. ĐẶC TẢ CHI TIẾT LOGIC TƯƠNG TÁC & CÔNG THỨC CHO 4 CHƯƠNG

Công cụ sinh mã cần lập trình chính xác 4 mô phỏng SVG và công thức toán học dưới đây:

### Chương 1: Apollo 11 Eagle Descent Stage & LRRR (Mặt Trăng)
- **Biến điều khiển thanh trượt ($Y$):** Năm quan trắc từ `1969` đến `2026` (bước nhảy `1` năm, mặc định `1969`).
- **Công thức tính toán trực tiếp trên giao diện:**
  - Số năm hoạt động: $\Delta t = Y - 1969$ (năm).
  - Độ dịch chuyển quỹ đạo Mặt Trăng tích lũy: $\Delta d = (\Delta t \times 3.8\text{ cm/năm})$. Ở năm 2026 ($\Delta t = 57$), hiển thị chính xác `216.6 cm (2.17 m)`.
  - Thời gian tia laser khứ hồi: Cố định `2.56 s` (Kèm thông số vật lý: Phát đi $10^{17}$ photon/xung $\rightarrow$ Thu về `< 1 photon`).
- **Hiệu ứng SVG Overlay:**
  - Vẽ một tia laser màu xanh lục (`#10B981`) bắn từ góc trái (Trái Đất) chạm vào tấm gương 100 lăng kính góc (corner-cube prisms $3.8\text{ cm}$) đặt cạnh chân đế tàu Apollo 11 Eagle và phản xạ ngược lại theo đường song song.
  - Khi kéo năm từ 1969 đến 2026, khoảng cách biểu diễn giữa Trái Đất và Mặt Trăng trên thanh thước vi mô giãn nhẹ ra kèm mũi tên chỉ số `+{Δd} cm`, đồng thời hiển thị vòng tròn ranh giới bảo vệ màu xanh `75 m Artifact Boundary (Apollo 11)`.
- **Các nút mốc cố định (Preset Buttons):** `[1969: Apollo 11 Deployment (0 cm)]` | `[1971: Apollo 15 300-Prism Upgrade (+7.6 cm)]` | `[2000: 31 Years of Einstein Tests (+117.8 cm)]` | `[2026: 57 Years Active (+216.6 cm)]`.

### Chương 2: Surveyor 3 & Apollo 12 LM Intrepid (Mặt Trăng)
- **Biến điều khiển thanh trượt ($D$):** Khoảng cách tiếp cận hạ cánh từ `2500` mét lùi về `50` mét (mặc định `155` mét).
- **Công thức & Trạng thái hiển thị:**
  - Nếu $D \ge 2000\text{ m}$: Mật độ hạt bụi va chạm = `0 particles/cm²`. Trạng thái bề mặt Surveyor 3: `Pristine White Inorganic Paint`.
  - Nếu $500\text{ m} \le D < 2000\text{ m}$: Mật độ bụi mịn = `Low-velocity fine dust settling`. Cảnh báo: `Within 2.0 km NASA 2011 Approach Exclusion Zone`.
  - Nếu $150\text{ m} \le D < 500\text{ m}$ (Mốc lịch sử `155 m`): Vận tốc hạt bụi bắn cát $v = 300\text{ to }2000\text{ m/s}$. Trạng thái: `Severe Micro-Pitting & Tan Discoloration (NASA SP-284 Verified)`.
  - Nếu $D < 150\text{ m}$: Cảnh báo đỏ `Direct Structural Blast Hazard`.
- **Hiệu ứng SVG Overlay:**
  - Khi kéo khoảng cách $D$ nhỏ dần về `155 m`, hình vẽ chiếc camera của Surveyor 3 chuyển màu từ trắng sáng sang màu nâu xám (`sepia(0.65) contrast(1.15)`), xuất hiện các chấm rỗ vi mô trên ống kính và chùm tia hạt bụi màu cam bắn từ tàu đổ bộ Intrepid sang.
- **Các nút mốc cố định:** `[2,000 m: NASA 2011 Safe Buffer]` | `[500 m: Impact Site Boundary]` | `[155 m: 1969 Apollo 12 Touchdown (LROC)]`.

### Chương 3: Opportunity Rover - MER-B (Sao Hỏa)
- **Biến điều khiển thanh trượt ($\tau$ - Tau):** Độ mờ quang học khí quyển Sao Hỏa (Atmospheric Optical Depth) từ `1.0` đến `10.8` (bước nhảy `0.1`, mặc định `1.0`).
- **Công thức vật lý tính công suất điện mặt trời ($E$):**
  - Sử dụng hàm suy giảm экспоненциальный (exponential decay) khớp với các điểm dữ liệu lịch sử của JPL:
    - Tại $\tau = 1.0$ (Bầu trời trong, Sol 1): $E = 700\text{ Wh/sol}$ (Trạng thái: `Nominal Operations - 90-Sol Design`).
    - Tại $\tau = 3.5$ (Bão bụi nhẹ): $E = 280\text{ Wh/sol}$ (Trạng thái: `Power Conservation Mode`).
    - Tại $\tau = 5.5$ (Bão bụi năm 2007): $E = 120\text{ Wh/sol}$ (Trạng thái: `Critical Survival Threshold`).
    - Tại $\tau = 8.5$ (Đầu bão 2018): $E = 45\text{ Wh/sol}$ (Trạng thái: `Low-Power Fault Imminent`).
    - Tại $\tau = 10.8$ (Đỉnh bão lịch sử Sol 5111 - 10/06/2018): $E = 22\text{ Wh/sol}$ (Trạng thái: `Final Telemetry Received - Mission Clock Fault`).
  - Hàm nội suy mượt trong JS cho mọi giá trị $\tau \in [1.0, 10.8]$: sử dụng nội suy tuyến tính từng đoạn (piecewise linear interpolation) giữa 5 cặp điểm chuẩn `[(1.0, 700), (3.5, 280), (5.5, 120), (8.5, 45), (10.8, 22)]` để đảm bảo tại $\tau = 10.8$ con số hiển thị chính xác tuyệt đối là `22 Wh`.
- **Hiệu ứng SVG Overlay:**
  - Phía trên hình xe tự hành Opportunity là bầu trời Sao Hỏa và Mặt Trời. Khi kéo $\tau$ từ `1.0` lên `10.8`, lớp phủ sương mù bụi đỏ (`rgba(154, 52, 18, alpha)`) đặc dần lên từ `opacity: 0.05` tới `opacity: 0.94`, đĩa Mặt Trời mờ tắt hẳn, và thanh pin trên mình xe tụt từ màu xanh (`100%`) xuống vạch đỏ nhấp nháy (`22 Wh`).
- **Các nút mốc cố định:** `[τ = 1.0: Clear Martian Sky (700 Wh)]` | `[τ = 5.5: 2007 Dust Storm (120 Wh)]` | `[τ = 10.8: Sol 5111 Final Signal (22 Wh)]`.

### Chương 4: Ingenuity Mars Helicopter (Sao Hỏa - Thiết bị vừa chuyển sang trạm tĩnh)
*(Đáp ứng hoàn hảo yêu cầu "varies widely in both its original purpose and its current level of functionality" của đề bài 2026)*
- **Biến điều khiển thanh trượt ($F$):** Số chuyến bay từ `Flight 1` đến `Flight 72` (bước nhảy `1`, mặc định `Flight 1`).
- **Công thức & Trạng thái hiển thị:**
  - Từ `Flight 1` đến `Flight 5` (Sol 39–76): `Original Technology Demonstration (Target: 5 Flights in 30 Sols)`. Độ dài bay tích lũy tăng từ `0 m` lên `499 m`.
  - Từ `Flight 6` đến `Flight 71`: `Operational Aerial Scout for Perseverance Rover`.
  - Tại `Flight 72` (Sol 1036 - 18/01/2024): Tổng quãng đường bay `17.0 km` (gấp 14 lần dự kiến), tổng thời gian bay `128.8 minutes`. Trạng thái: `Carbon-Fiber Rotor Blade Tip Damaged on Touchdown — Reborn as Stationary Weather & Avionics Testbed (~20 Years Memory)`.
- **Hiệu ứng SVG Overlay:**
  - Hình vẽ hai cánh quạt đồng trục quay tít (CSS animation) khi $F < 72$. Khi kéo đến `Flight 72`, cánh quạt dừng lại ở Neretva Vallis, hiện dấu cảnh báo đỏ ở đầu mút cánh quạt bị gãy nhưng xuất hiện sóng tín hiệu màu xanh lá phát ra từ thân máy báo hiệu thiết bị vẫn đang ghi nhật ký nhiệt độ và kiểm nghiệm máy tính trên bề mặt Sao Hỏa.
- **Các nút mốc cố định:** `[Flight 1: First Powered Flight on Another Planet]` | `[Flight 5: Original Design Limit Reached]` | `[Flight 72: Sol 1036 Rotor Damage & Stationary Rebirth]`.

---

## 5. ĐẶC TẢ MODULE ĐỘC LẬP 1: TRẠM QUYẾT ĐỊNH BÃI ĐÁP ARTEMIS (THE ARTEMIS LANDING SITE DECISION STATION)

- **Mục tiêu:** Đặt người dùng (học sinh 11–15 tuổi) vào vai Chỉ huy Đổ bộ tàu Artemis, phải chọn khoảng cách hạ cánh xuống gần một di sản lịch sử trên Mặt Trăng.
- **Cập nhật 14/11 (cơ chế chính):**
  - Trạm được làm lại thành **bản đồ 4 vùng A–D**. Người chơi dùng **4 thẻ luật** nhận được ở 4 chương (Di tích vẫn hoạt động · Cách di tích ít nhất 2 km · Phải có nắng · Phải có điểm mốc) để gạch các vùng A, B, C, rồi hạ cánh ở D.
  - Thao tác là **chạm thẻ, rồi chạm vùng**. Cách này chơi được trên cả điện thoại lẫn máy tính.
  - Sơ đồ mặt cắt quỹ đạo bụi và 4 nút khoảng cách bên dưới được giữ lại làm phần minh họa cho thẻ "Cách di tích ít nhất 2 km".
- **Hộp giải thích Vật lý Chân không (Vacuum Ballistics Callout):**  
  *"Tại sao đáp cách xa hàng trăm mét vẫn phá hủy di vật? Trên Mặt Trăng không có không khí cản lại và trọng lực chỉ bằng $1/6$ Trái Đất. Luồng khí phụt tên lửa sẽ bắn các hạt bụi sắc nhọn bay theo quỹ đạo đạn đạo với vận tốc $300\text{–}2.000\text{ m/s}$ (nhanh hơn đạn súng trường) đi xa hàng kilomet!"*
- **Giao diện Tương tác:**
  - Một sơ đồ mặt cắt ngang SVG (Logarithmic/Stepped Scale) hiển thị Di vật ở mốc `0 m`, các vành đai tại `75 m`, `155 m`, `225 m`, `500 m`, `2,000 m` và biểu tượng tàu đổ bộ Artemis di chuyển kèm đường cong quỹ đạo bụi phun ra từ động cơ.
  - **4 Nút lựa chọn khoảng cách hạ cánh:**
    1. **`[< 75 m / 225 m: Direct Proximity]`** $\rightarrow$ **Trạng thái:** `[MISSION ABORTED - RED ALERT]`. **Hệ quả:** Vi phạm trực tiếp Vành đai Bảo vệ Hiện vật (`75 m` cho Apollo 11; `225 m` cho Apollo 17). Sóng xung kích làm lật thiết bị và xóa sạch dấu chân lịch sử. **Căn cứ:** *NASA 2011 Guidelines (Table 1) & Public Law 116-275*.
    2. **`[155 m: The 1969 Apollo 12 Distance]`** $\rightarrow$ **Trạng thái:** `[WARNING - ORANGE SANDBLAST HAZARD]`. **Hệ quả:** Tái hiện đúng khoảng cách tàu Intrepid đáp cạnh Surveyor 3 năm 1969. Bão cát siêu thanh làm rỗ kính quang học và đổi màu sơn. **Căn cứ:** *NASA SP-284 (1972) & LROC Satellite Measurement*.
    3. **`[500 m (0.5 km): Impact Site Buffer]`** $\rightarrow$ **Trạng thái:** `[CAUTION - YELLOW DUST FALLOUT]`. **Hệ quả:** Chỉ đủ an toàn cho các điểm va chạm cứng (như tàu Ranger hay tầng tên lửa S-IVB), nhưng tàu đổ bộ có động cơ tên lửa vẫn thổi bụi mịn bay tới làm mờ gương phản xạ laser LRRR. **Căn cứ:** *NASA 2011 Recommendations (0.5 km Impact Exclusion Rule)*.
    4. **`[≥ 2,000 m (2.0 km): Artemis Heritage Standard]`** $\rightarrow$ **Trạng thái:** `[MISSION APPROVED - GREEN SAFE ZONE]`. **Hệ quả:** Toàn bộ hạt bụi bắn ra theo quỹ đạo đạn đạo đã rơi xuống đất trước khi chạm tới di vật. Bảo vệ nguyên vẹn 100% di sản! Mở khóa phần thưởng Chứng nhận bên dưới. **Căn cứ:** *NASA 2011 Recommendations (2.0 km Descent/Approach Exclusion Radius) & NASA GIC 21-07*.

---

## 6. ĐẶC TẢ MODULE ĐỘC LẬP 2: GÓC GIÁO VIÊN 15 PHÚT, THẺ CHỨNG NHẬN & KHAI BÁO SI

### 6.1. Thẻ Chứng nhận "Space Heritage Guardian" (Không lưu dữ liệu cá nhân - Zero PII)
- Sau khi hạ cánh ở vùng **D** (cách di tích ≥ 2.000 m) ở Trạm Quyết định, người dùng được mời:
  1. Chọn 1 trong 3 **Lời cam kết Bảo tồn (Conservation Pledges)** viết sẵn:
     - *Pledge A:* "I pledge to respect the 2.0 km lunar exclusion buffer so future generations can study untouched space hardware."
     - *Pledge B:* "I pledge to verify space history through open telemetry data rather than internet myths."
     - *Pledge C:* "I pledge to view discarded spacecraft not as trash, but as humanity's longest-running extraterrestrial material laboratories."
  2. Nhập biệt danh / Tên hiển thị (Tùy chọn, ghi rõ *"Rendered locally in your browser — no personal data is stored or transmitted, fully compliant with Space Apps Under-18 privacy rules"*).
  3. Hiển thị ngay **Thẻ Chứng nhận Kỹ thuật số (Digital Guardian Badge)** thiết kế đẹp mắt với trạng thái 4 con dấu đã thu thập (KHÔNG có logo NASA).

### 6.2. Góc Giáo viên STEM 15 phút (15-Minute Classroom Module)
- Một khung thông tin gọn gàng dành cho giáo viên THCS/THPT sử dụng ngay trong tiết Vật lý / Khoa học Tự nhiên:
  - **Phút 1–5 (Quang học & Thiên văn):** Học sinh kéo thanh trượt Chương 1 để hiểu định luật phản xạ ánh sáng trên lăng kính góc LRRR và cách đo khoảng cách bằng tốc độ ánh sáng ($d = c \times t / 2$).
  - **Phút 6–10 (Năng lượng tái tạo & Khí quyển):** Học sinh kéo thanh trượt Chương 3 để quan sát sự suy giảm quang thông mặt trời theo độ mờ khí quyển ($\tau$) trên Sao Hỏa.
  - **Phút 11–15 (Chuyển động ném ngang trong chân không & Đạo đức không gian):** Học sinh thực hành tại Trạm Quyết định Artemis và thảo luận về Đạo luật *One Small Step Act (2020)*.

### 6.3. Chân trang Nguồn dữ liệu NASA & Khai báo Super Intelligence (SI Disclosure)
- Hiển thị bảng liệt kê đầy đủ các nguồn dữ liệu chính thức của NASA (kèm link trực tiếp) và bảng **Super Intelligence (SI) Disclosure**:
  - **Claude Max & Argon / Qoder:** Hỗ trợ dựng khung giao diện HTML/Tailwind CSS và đồ họa SVG tương tác.
  - **NotebookLM & Gemini:** Hỗ trợ tóm tắt và tra cứu chéo các báo cáo PDF lịch sử của NASA.
  - **Human Verification Gate:** 100% hằng số vật lý, tọa độ COSPAR, khoảng cách hạ cánh và điều khoản pháp lý được kiểm chứng thủ công bởi đội ngũ học sinh và kỹ sư đối chiếu với NASA SP-284, NASA 2011 Recommendations, NSSDCA và ILRS.

---

## 7. DỮ LIỆU CHUẨN HÓA (`content.json`) ĐỂ NHÚNG TRỰC TIẾP VÀO MÃ NGUỒN

Dưới đây là toàn bộ đối tượng JSON hoàn chỉnh chứa cả Tiếng Anh và Tiếng Việt cho 4 chương và Trạm Quyết định. Công cụ lập trình tự động phải nhúng nguyên vẹn đối tượng này vào biến `const RELIC_DATA = ...` trong mã nguồn để ứng dụng chạy độc lập ngay lập tức mà không sợ lỗi `CORS` khi mở file trực tiếp:

```json
{
  "meta": {
    "project_title": "LUNAMARIS: Letters Across the Silent Seas",
    "subtitle_en": "Interactive Telemetry & Dual-Voice Storytelling about NASA's Forgotten Hardware",
    "subtitle_vi": "Kể chuyện Hai Giọng & Mô phỏng Thông số Đo xa về những Thiết bị NASA Bị Bỏ lại",
    "local_anchor": {
      "station_en": "Hanoi Ground Receiving Station, Vietnam (21.0285° N, 105.8542° E)",
      "station_vi": "Trạm Thu sóng Mặt đất Hà Nội, Việt Nam (21,0285° B, 105,8542° Đ)",
      "moon_light_roundtrip_sec": 2.56,
      "mars_light_oneway_min": "4 to 24 minutes"
    },
    "si_disclosure": [
      {
        "tool": "Claude Max (Argon Model) & Qoder",
        "role_en": "Used for generating responsive HTML5/Tailwind CSS layout, SVG telemetry animations, and modular interactive state logic.",
        "role_vi": "Sử dụng để dựng khung giao diện HTML5/Tailwind CSS đáp ứng, hoạt ảnh SVG và logic trạng thái tương tác.",
        "human_check_en": "All mathematical formulas and boundary thresholds were manually audited against NASA SP-284 and NASA 2011 Guidelines.",
        "human_check_vi": "Toàn bộ công thức toán học và ngưỡng ranh giới được kiểm tra thủ công đối chiếu với NASA SP-284 và Khuyến nghị NASA 2011."
      },
      {
        "tool": "Google NotebookLM & Gemini",
        "role_en": "Used to cross-reference historical NASA technical PDFs and structure bilingual vocabulary.",
        "role_vi": "Sử dụng để tra cứu chéo các tài liệu PDF kỹ thuật của NASA và chuẩn hóa thuật ngữ song ngữ.",
        "human_check_en": "Every historical date, Sol number, and COSPAR ID was verified directly on NSSDCA and JPL mission pages.",
        "human_check_vi": "Mọi mốc ngày lịch sử, số ngày Sol và mã COSPAR được xác minh trực tiếp trên trang NSSDCA và JPL."
      }
    ]
  },
  "artifacts": [
    {
      "id": "apollo11-lrrr",
      "chapter_num": "01",
      "celestial_body": "Moon",
      "name_en": "Apollo 11 Eagle Descent Stage & Laser Retroreflector (LRRR)",
      "name_vi": "Tầng Hạ cánh Apollo 11 Eagle & Gương Phản xạ Laser (LRRR)",
      "cospar_id": "1969-059C (Eagle LM) / EASEP-LRRR",
      "location_name": "Mare Tranquillitatis (Sea of Tranquility — 0.674° N, 23.473° E)",
      "functionality_status_en": "PASSIVELY ACTIVE FOR 57 YEARS (Requires Zero Electrical Power)",
      "functionality_status_vi": "HOẠT ĐỘNG THỤ ĐỘNG SUỐT 57 NĂM (Không cần nguồn điện)",
      "media": {
        "primary_image_url": "https://nssdc.gsfc.nasa.gov/imgcat/hires/a11_h_40_5948.gif",
        "image_credit": "NASA / NSSDCA Photo ID: AS11-40-5948 (Apollo 11 Lunar Laser Ranging Retroreflector deployed on Mare Tranquillitatis)"
      },
      "narrative_voice": {
        "epistemic_label_en": "NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY",
        "epistemic_label_vi": "DIỄN GIẢI VĂN HỌC DỰA TRÊN DỮ LIỆU ĐO XA",
        "letter_en": "On July 20, 1969, Neil Armstrong and Buzz Aldrin placed my aluminum frame onto the dark basalt of Tranquility Base, just steps away from the golden legs of the Eagle descent stage. I have no batteries, no radio transmitter, and no moving gears—only one hundred fused-silica corner-cube prisms, each measuring 3.8 centimeters across. When Eagle blasted off to return home, I remained behind in the silent vacuum. Yet for fifty-seven years, whenever Earth observatories fire a green laser pulse across the void, I catch a single stray photon out of a hundred quadrillion and reflect it straight back in 2.56 seconds, whispering that the Moon is drifting away by 3.8 centimeters every year.",
        "letter_vi": "Ngày 20 tháng 7 năm 1969, Neil Armstrong và Buzz Aldrin đặt khung nhôm của tôi xuống nền đá bazan sẫm màu tại Căn cứ Tĩnh Lặng, chỉ cách những chân đáp ánh vàng của tầng hạ cánh Eagle vài bước chân. Tôi không có ắc-quy, không máy phát sóng vô tuyến, cũng chẳng có bánh răng chuyển động—chỉ có đúng một trăm lăng kính góc bằng thạch anh nung chảy, mỗi chiếc rộng 3,8 centimet. Khi tầng cất cánh của Eagle rời Mặt Trăng trở về nhà, tôi ở lại giữa khoảng chân không câm lặng. Thế nhưng suốt 57 năm qua, mỗi khi các đài quan sát trên Trái Đất bắn một xung laser xanh xuyên qua bóng tối, tôi lại bắt lấy một hạt photon hiếm hoi giữa hàng trăm triệu triệu hạt và phản xạ nó về đúng nơi xuất phát sau 2,56 giây, thì thầm rằng Mặt Trăng đang trôi xa thêm 3,8 centimet mỗi năm."
      },
      "archaeologist_dossier": {
        "epistemic_label_en": "VERIFIED SCIENTIFIC & LEGAL RECORD",
        "epistemic_label_vi": "HỒ SƠ KHOA HỌC & PHÁP LÝ ĐÃ KIỂM CHỨNG",
        "how_it_operated_en": "The Lunar Laser Ranging Retroreflector (LRRR) uses corner-cube prisms made of ultra-pure fused silica (3.8 cm diameter each; 100 prisms on Apollo 11 & 14, upgraded to 300 prisms on Apollo 15). Because light hitting a corner-cube is reflected thrice off mutually perpendicular surfaces, the beam returns exactly parallel to its origin regardless of mirror tilt. By timing the ~2.56-second round trip of laser pulses, scientists measure the Earth-Moon distance to millimeter precision, proving the Moon recedes at 3.8 cm/year (38.2 ± 0.7 mm/yr) due to tidal dissipation and testing Einstein's General Relativity.",
        "how_it_operated_vi": "Gương phản xạ Laser Mặt Trăng (LRRR) sử dụng các lăng kính góc bằng thạch anh nung chảy siêu tinh khiết (đường kính 3,8 cm mỗi lăng kính; gồm 100 lăng kính trên Apollo 11 & 14, và nâng lên 300 lăng kính trên Apollo 15). Nhờ cấu tạo ba mặt vuông góc, tia sáng chiếu vào luôn được phản xạ ngược lại song song tuyệt đối với hướng tới. Bằng cách bấm giờ hành trình khứ hồi ~2,56 giây của xung laser, các nhà khoa học đo khoảng cách Trái Đất - Mặt Trăng chính xác tới từng milimet, chứng minh Mặt Trăng đang xa dần 3,8 cm/năm do ma sát thủy triều và kiểm nghiệm Thuyết Tương đối rộng của Einstein.",
        "conservation_law_en": "Under NASA's 2011 Recommendations to Space-Faring Entities (Table 1 & Figure 4) and the One Small Step to Protect Human Heritage in Space Act (Public Law 116-275, signed Dec 31, 2020; implemented via NASA GIC 21-07), Tranquility Base is protected by a strict 75-meter Artifact Boundary (no rover or astronaut entry) and a 2.0-kilometer Descent/Approach Exclusion Radius (Apollo 17's boundary is 225 meters).",
        "conservation_law_vi": "Theo Khuyến nghị năm 2011 của NASA (Bảng 1 & Hình 4) và Đạo luật Bảo vệ Di sản Nhân loại trong Không gian (Public Law 116-275, ký ngày 31/12/2020; thi hành qua Thông tư NASA GIC 21-07), khu vực di tích Apollo 11 được bảo vệ bởi Vành đai Hiện vật 75 mét (cấm xe tự hành và phi hành gia đi vào) cùng Bán kính Vùng cấm Hạ cánh 2,0 kilomet (đối với Apollo 17, vành đai hiện vật là 225 mét).",
        "discrepancy_note_en": "Formula Verification: Cumulative Lunar Drift Δd = 3.8 cm/year × (Selected Year − 1969). At Year 2026 (57 years), Δd = 216.6 cm (~2.17 meters). Photon Return Ratio: ~1 returned photon detected per 10^17 emitted photons (ILRS / Dickey et al., Science 1994).",
        "discrepancy_note_vi": "Kiểm chứng Công thức: Độ trôi quỹ đạo tích lũy Δd = 3,8 cm/năm × (Năm chọn − 1969). Tại năm 2026 (57 năm), Δd = 216,6 cm (~2,17 mét). Tỷ lệ thu nhận photon: Trung bình thu được dưới 1 photon phản hồi trên mỗi 10^17 photon bắn đi từ Trái Đất (Nguồn: ILRS / Dickey et al., Science 1994).",
        "source_links": [
          {
            "label": "ILRS / NASA Lunar Laser Ranging Paper (Faller 2014)",
            "url": "https://ilrs.gsfc.nasa.gov/lw19/docs/2014/Papers/3127_Faller_paper.pdf"
          },
          {
            "label": "Public Law 116-275: One Small Step Act (2020)",
            "url": "https://www.govinfo.gov/app/details/STATUTE-134/context"
          }
        ]
      },
      "slider_config": {
        "parameter_name_en": "Observation Year (1969 – 2026)",
        "parameter_name_vi": "Năm Quan trắc Laser (1969 – 2026)",
        "unit": "Year",
        "min_val": 1969,
        "max_val": 2026,
        "step": 1,
        "default_val": 2026,
        "stops": [
          {
            "value": 1969,
            "label_en": "1969: Apollo 11 Deployment",
            "label_vi": "1969: Lắp đặt trên Apollo 11",
            "desc_en": "July 20, 1969: 100 fused-silica prisms (3.8 cm each) deployed inside the 75 m Tranquility Base artifact zone. Cumulative drift: 0.0 cm.",
            "desc_vi": "20/07/1969: Mảng 100 lăng kính thạch anh (3,8 cm/lăng kính) được đặt tại Biển Tĩnh Lặng. Độ dịch chuyển tích lũy: 0,0 cm."
          },
          {
            "value": 1971,
            "label_en": "1971: Apollo 15 (300 Prisms)",
            "label_vi": "1971: Apollo 15 (300 Lăng kính)",
            "desc_en": "Apollo 15 deploys the largest 300-prism array at Hadley Rille, tripling laser return efficiency. Cumulative drift: +7.6 cm.",
            "desc_vi": "Apollo 15 đặt mảng lớn nhất gồm 300 lăng kính, tăng gấp ba hiệu suất phản xạ tín hiệu. Độ dịch chuyển tích lũy: +7,6 cm."
          },
          {
            "value": 2000,
            "label_en": "2000: 31 Years of Ranging",
            "label_vi": "2000: 31 Năm Đo đạc",
            "desc_en": "Three decades of continuous passive laser ranging confirm fluid lunar core dynamics. Cumulative drift: +117.8 cm.",
            "desc_vi": "Ba thập kỷ đo laser thụ động liên tục giúp xác nhận lõi lỏng của Mặt Trăng. Độ dịch chuyển tích lũy: +117,8 cm."
          },
          {
            "value": 2026,
            "label_en": "2026: 57 Years (+216.6 cm)",
            "label_vi": "2026: 57 Năm (+216,6 cm)",
            "desc_en": "57 years after Eagle landed, the passive prisms still operate daily without power. Total measured lunar recession: +216.6 cm (~2.17 m).",
            "desc_vi": "57 năm sau khi Eagle hạ cánh, các lăng kính vẫn hoạt động mỗi ngày không cần điện. Tổng độ trôi Mặt Trăng: +216,6 cm (~2,17 m)."
          }
        ]
      }
    },
    {
      "id": "surveyor-3",
      "chapter_num": "02",
      "celestial_body": "Moon",
      "name_en": "Surveyor 3 & Apollo 12 (LM Intrepid)",
      "name_vi": "Tàu Đổ bộ Surveyor 3 & Apollo 12 (LM Intrepid)",
      "cospar_id": "1967-035A (Surveyor 3) / 1969-099C (Intrepid)",
      "location_name": "Oceanus Procellarum (Ocean of Storms — 3.01° S, 23.42° W)",
      "functionality_status_en": "INACTIVE LANDER (Camera & Scoop Returned to Earth in 1969)",
      "functionality_status_vi": "ĐÃ NGỪNG HOẠT ĐỘNG (Camera & Gầu xúc được mang về Trái Đất năm 1969)",
      "media": {
        "primary_image_url": "https://nssdc.gsfc.nasa.gov/imgcat/hires/a12_h_48_7133.gif",
        "image_credit": "NASA / NSSDCA Photo ID: AS12-48-7133 (Astronaut Pete Conrad examining Surveyor 3 with LM Intrepid on horizon)"
      },
      "narrative_voice": {
        "epistemic_label_en": "NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY",
        "epistemic_label_vi": "DIỄN GIẢI VĂN HỌC DỰA TRÊN DỮ LIỆU ĐO XA",
        "letter_en": "For thirty-one months, I sat alone inside a shallow crater on the Ocean of Storms. Between April and May 1967, my mechanical scoop dug trenches into the gray regolith, while my television camera transmitted 6,315 images to prove the Moon would not swallow future astronauts in dust. When the lunar night froze my batteries, I thought my watch had ended. Then, on November 19, 1969, the silent vacuum roared. Lunar Module Intrepid descended just 155 meters from my rim. Its rocket plume blasted hyper-velocity dust across my white paint, turning my shell tan and pitting my mirror. Hours later, two silver figures walked down the slope. Pete Conrad and Alan Bean gently detached my camera—taking my eyes back to Earth, while my three legs guard this crater forever.",
        "letter_vi": "Suốt ba mươi mốt tháng ròng, tôi ngồi đơn độc bên sườn một miệng hố nông giữa Đại dương Bão tố. Từ tháng 4 đến tháng 5 năm 1967, chiếc gầu xúc cơ học của tôi đã đào những rãnh đất xám, còn camera truyền hình gửi về 6.315 bức ảnh để chứng minh Mặt Trăng sẽ không nhấn chìm các phi hành gia tương lai trong bụi lún. Khi đêm trường Mặt Trăng đóng băng ắc-quy, tôi ngỡ ca trực của mình đã khép lại. Rồi ngày 19/11/1969, khoảng chân không câm lặng bỗng gầm vang. Tàu đổ bộ Intrepid đáp xuống chỉ cách mép hố của tôi 155 mét. Luồng phụt tên lửa bắn những hạt bụi siêu tốc vào lớp sơn trắng, nhuộm vỏ tôi sang màu nâu rám và làm rỗ gương phản xạ. Vài giờ sau, hai bóng người ánh bạc bước xuống dốc. Pete Conrad và Alan Bean nhẹ nhàng tháo chiếc camera—mang đôi mắt tôi về lại Trái Đất, để ba chân đáp của tôi canh giữ miệng hố này mãi mãi."
      },
      "archaeologist_dossier": {
        "epistemic_label_en": "VERIFIED SCIENTIFIC & LEGAL RECORD",
        "epistemic_label_vi": "HỒ SƠ KHOA HỌC & PHÁP LÝ ĐÃ KIỂM CHỨNG",
        "how_it_operated_en": "Landed on April 20, 1967, Surveyor 3 used an electric surface-sampler scoop and a 600-line television camera to measure lunar soil bearing strength, directly validating the landing gear design for Apollo Lunar Modules. On November 19, 1969, Apollo 12 astronauts Charles 'Pete' Conrad and Alan Bean executed the first precision pinpoint landing, touching down ~155 meters away. During their second EVA, the crew retrieved ~10 kg of Surveyor 3 hardware—including its TV camera, scoop, and aluminum tubing—after 950 Earth days of lunar exposure.",
        "how_it_operated_vi": "Đáp xuống ngày 20/04/1967, Surveyor 3 dùng gầu xúc lấy mẫu bề mặt và camera truyền hình 600 dòng quét để đo sức chịu tải của đất Mặt Trăng, xác nhận trực tiếp thiết kế chân đáp cho tàu Apollo. Ngày 19/11/1969, phi hành đoàn Apollo 12 (Pete Conrad và Alan Bean) thực hiện cú hạ cánh chính xác đầu tiên, đáp cách đó ~155 mét. Trong chuyến đi bộ thứ hai (EVA 2), họ đã tháo dỡ và mang về Trái Đất ~10 kg bộ phận của Surveyor 3 (gồm camera, gầu xúc và ống nhôm) sau 950 ngày phơi nhiễm môi trường Mặt Trăng.",
        "conservation_law_en": "Post-flight laboratory examination documented in NASA Special Publication SP-284 (1972) revealed that Apollo 12's descent engine blast accelerated lunar dust grains into a hyper-velocity spray that sandblasted, micro-pitted, and discolored Surveyor 3's surfaces. This exact discovery prompted NASA's 2011 Recommendations to establish a 2.0 km approach and landing exclusion radius around soft-landing heritage sites (and 0.5 km for hard impact sites).",
        "conservation_law_vi": "Phân tích hậu kiểm trong ấn phẩm đặc biệt NASA SP-284 (1972) phát hiện luồng phụt động cơ hạ cánh của Apollo 12 đã gia tốc các hạt bụi Mặt Trăng thành luồng bắn cát siêu tốc, làm rỗ vi mô và biến đổi màu sắc bề mặt Surveyor 3. Phát hiện lịch sử này chính là cơ sở khoa học để Khuyến nghị năm 2011 của NASA thiết lập bán kính vùng cấm tiếp cận hạ cánh 2,0 km quanh các bãi đáp di sản (và 0,5 km cho các điểm va chạm cứng).",
        "discrepancy_note_en": "Historical vs. Satellite Measurement Note: Modern high-resolution Lunar Reconnaissance Orbiter Camera (LROC) imagery measures the center-to-center distance between LM Intrepid and Surveyor 3 at ~155 meters, whereas 1969 preliminary NASA/NSSDCA logs estimated 160 to 180 meters (520–600 feet).",
        "discrepancy_note_vi": "Ghi chú Đối chiếu Số liệu: Ảnh chụp độ phân giải cao từ vệ tinh LROC hiện đại đo khoảng cách tâm-tới-tâm giữa LM Intrepid và Surveyor 3 là ~155 mét, trong khi các báo cáo sơ bộ năm 1969 trên cổng NASA/NSSDCA ước tính từ 160 đến 180 mét (520–600 feet).",
        "source_links": [
          {
            "label": "NASA SP-284 (1972): Analysis of Surveyor 3 Material Returned by Apollo 12",
            "url": "https://ntrs.nasa.gov/citations/19720019081"
          },
          {
            "label": "NASA 2011 Recommendations to Space-Faring Entities (2.0 km Rule)",
            "url": "https://www.nasa.gov/wp-content/uploads/2017/10/617743main_nasa-usg_lunar_historic_sites_reva-508.pdf"
          }
        ]
      },
      "slider_config": {
        "parameter_name_en": "Lander Touchdown Separation Distance (50 m – 2,500 m)",
        "parameter_name_vi": "Khoảng cách Hạ cánh của Tàu Đổ bộ (50 m – 2.500 m)",
        "unit": "m",
        "min_val": 50,
        "max_val": 2500,
        "step": 5,
        "default_val": 155,
        "stops": [
          {
            "value": 2000,
            "label_en": "2,000 m: NASA 2011 Safe Threshold",
            "label_vi": "2.000 m: Ngưỡng An toàn NASA 2011",
            "desc_en": "At ≥ 2.0 km, ballistic rocket plume ejecta falls back to the lunar surface before reaching the heritage artifact. Zero sandblasting damage.",
            "desc_vi": "Ở cự ly ≥ 2,0 km, toàn bộ hạt bụi bắn ra theo quỹ đạo đạn đạo rơi xuống đất trước khi chạm tới di vật. An toàn 100%."
          },
          {
            "value": 500,
            "label_en": "500 m: Hard Impact Site Boundary",
            "label_vi": "500 m: Ranh giới Điểm Va chạm",
            "desc_en": "0.5 km is only sufficient for crashed impact sites (e.g., Ranger/S-IVB). Powered descent plumes still shower fine dust over optical mirrors.",
            "desc_vi": "0,5 km chỉ đủ cho điểm va chạm cứng. Động cơ tên lửa hạ cánh ở cự ly này vẫn thổi bụi mịn phủ mờ gương quang học."
          },
          {
            "value": 155,
            "label_en": "155 m: 1969 Apollo 12 Touchdown",
            "label_vi": "155 m: Cự ly Đáp Apollo 12 (1969)",
            "desc_en": "Historical Apollo 12 distance (LROC verified; 1969 docs noted 160–180 m). High-velocity regolith spray pits camera glass and turns white paint tan (NASA SP-284).",
            "desc_vi": "Khoảng cách thực tế của Apollo 12 (theo LROC; tài liệu 1969 ghi 160–180 m). Bão cát siêu tốc bắn rỗ kính camera và nhuộm nâu lớp sơn trắng (NASA SP-284)."
          }
        ]
      }
    },
    {
      "id": "opportunity-rover",
      "chapter_num": "03",
      "celestial_body": "Mars",
      "name_en": "Opportunity Rover (Mars Exploration Rover - MER-B)",
      "name_vi": "Xe Tự hành Opportunity (MER-B)",
      "cospar_id": "2003-032A",
      "location_name": "Perseverance Valley, Endeavour Crater, Mars (2.04° S, 354.65° E)",
      "functionality_status_en": "COMPLETED MISSION IN SILENCE (Hibernating since Sol 5111 / June 10, 2018)",
      "functionality_status_vi": "HOÀN THÀNH SỨ MỆNH TRONG IM LẶNG (Ngừng liên lạc từ Sol 5111 / 10/06/2018)",
      "media": {
        "primary_image_url": "https://nssdc.gsfc.nasa.gov/planetary/image/mer_rover.jpg",
        "image_credit": "NASA / JPL-Caltech / Cornell (Mars Exploration Rover Opportunity in Meridiani Planum)"
      },
      "narrative_voice": {
        "epistemic_label_en": "NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY",
        "epistemic_label_vi": "DIỄN GIẢI VĂN HỌC DỰA TRÊN DỮ LIỆU ĐO XA",
        "letter_en": "Engineers built me for a ninety-sol sprint across Meridiani Planum, expecting Martian dust to coat my solar wings within three months. Instead, seasonal whirlwinds swept my panels clean, and I rolled across ancient shorelines for nearly fifteen Earth years—traveling 45.16 kilometers and finding hematite 'blueberries' born in liquid water. On Sol 5111, June 10, 2018, a planet-encircling storm swallowed the sun. Atmospheric opacity soared to an unprecedented tau of 10.8, turning noon into pitch-black night. My solar array output collapsed from 700 watt-hours to just 22 watt-hours. I never sent English words—only binary telemetry packets—before my mission clock fell asleep in Perseverance Valley.",
        "letter_vi": "Các kỹ sư chế tạo tôi cho cuộc chạy nước rút chỉ dài 90 ngày Sao Hỏa (sol) trên bình nguyên Meridiani, nghĩ rằng bụi đỏ sẽ sớm phủ kín đôi cánh pin mặt trời sau ba tháng. Thế nhưng những cơn lốc xoáy theo mùa đã quét sạch tấm pin, giúp tôi lăn bánh qua những bờ biển cổ đại suốt gần 15 năm Trái Đất—đi hết quãng đường kỷ lục 45,16 kilomet và tìm ra những viên đá hematit hình thành trong nước lỏng. Vào ngày Sol 5111 (10/06/2018), một cơn bão bụi toàn cầu nuốt chửng Mặt Trời. Độ mờ khí quyển vọt lên mức kỷ lục Tau 10,8, biến buổi trưa thành đêm đen đặc quánh. Điện năng của tôi sụt từ 700 watt-giờ xuống chỉ còn 22 watt-giờ. Tôi không hề gửi đi câu chữ tiếng Anh nào—chỉ truyền về gói dữ liệu nhị phân cuối cùng—trước khi chìm vào giấc ngủ vĩnh hằng nơi Thung lũng Kiên Trì."
      },
      "archaeologist_dossier": {
        "epistemic_label_en": "VERIFIED SCIENTIFIC & LEGAL RECORD",
        "epistemic_label_vi": "HỒ SƠ KHOA HỌC & PHÁP LÝ ĐÃ KIỂM CHỨNG",
        "how_it_operated_en": "Landing on January 25, 2004, Opportunity was designed for a 90-sol mission and a 1 km drive. Powered by gallium-arsenide triple-junction solar arrays, it operated for 5,111 sols (55 times its design life) and drove 45.16 km (28.06 miles). Using its Panoramic Camera (Pancam) and Mössbauer/APXS spectrometers, Opportunity discovered spherical hematite concretions ('blueberries') and clay minerals, proving ancient Mars once hosted habitable, neutral-pH liquid water.",
        "how_it_operated_vi": "Đáp xuống ngày 25/01/2004, Opportunity chỉ được thiết kế cho sứ mệnh 90 sol và quãng đường 1 km. Nhờ hệ thống pin mặt trời ba lớp tiếp giáp gallium-arsenide, xe đã hoạt động suốt 5.111 sol (gấp 55 lần tuổi thọ thiết kế) và đi được 45,16 km. Bằng camera toàn cảnh Pancam và các máy quang phổ trên cánh tay robot, Opportunity đã phát hiện các kết hạch hematit hình cầu và khoáng vật sét, chứng minh Sao Hỏa cổ đại từng có nước lỏng ấm áp.",
        "conservation_law_en": "During the June 2018 global dust storm, atmospheric optical depth (Tau, τ) reached a historic peak of 10.8 (compared to ~5.5 in the 2007 storm). Solar energy dropped to ~22 Wh on Sol 5109–5111 (June 10, 2018), triggering a low-power fault and mission clock loss. After sending over 1,000 recovery commands, NASA officially declared the mission complete on February 13, 2019.",
        "conservation_law_vi": "Trong cơn bão bụi toàn cầu tháng 6/2018, độ mờ quang học khí quyển (Tau, τ) đạt đỉnh kỷ lục 10,8 (so với mức ~5,5 trong cơn bão năm 2007). Năng lượng mặt trời tụt xuống ~22 Wh trong đợt liên lạc cuối cùng từ Sol 5109–5111 (kết thúc ngày 10/06/2018), kích hoạt chế độ ngắt nguồn khẩn cấp. Sau hơn 1.000 lệnh gọi đánh thức không hồi âm, NASA chính thức tuyên bố kết thúc sứ mệnh vào ngày 13/02/2019.",
        "discrepancy_note_en": "Fact-Checking the Viral Quote: Opportunity did NOT transmit the text 'My battery is low and it's getting dark.' That poetic phrase was a metaphorical summary tweeted by science reporter Jacob Margolis (KPCC/LAist) on Feb 13, 2019, translating JPL's raw engineering telemetry (22 Wh battery charge & τ = 10.8 atmospheric opacity).",
        "discrepancy_note_vi": "Kiểm chứng Câu nói Lan truyền trên Mạng: Opportunity KHÔNG HỀ gửi dòng chữ 'Pin của tôi yếu rồi và trời đang tối dần'. Câu nói nổi tiếng đó thực chất là lời dịch ẩn dụ trên Twitter của nhà báo khoa học Jacob Margolis (đài KPCC/LAist) ngày 13/02/2019 khi diễn giải hai thông số kỹ thuật cuối cùng do kỹ sư JPL cung cấp (điện năng 22 Wh và độ mờ khí quyển τ = 10,8).",
        "source_links": [
          {
            "label": "NASA / JPL Opportunity Rover Mission Archive (NSSDCA 2003-032A)",
            "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A"
          },
          {
            "label": "Fact-Check on Jacob Margolis Telemetry Translation",
            "url": "https://www.snopes.com/fact-check/opportunity-rovers-final-words/"
          }
        ]
      },
      "slider_config": {
        "parameter_name_en": "Martian Dust Storm Optical Depth (Tau τ: 1.0 – 10.8)",
        "parameter_name_vi": "Độ mờ Khí quyển trong Bão bụi Sao Hỏa (Tau τ: 1,0 – 10,8)",
        "unit": "Tau (τ)",
        "min_val": 1.0,
        "max_val": 10.8,
        "step": 0.1,
        "default_val": 10.8,
        "stops": [
          {
            "value": 1.0,
            "label_en": "τ = 1.0: Clear Martian Sky (700 Wh)",
            "label_vi": "τ = 1,0: Trời Quang đãng (700 Wh)",
            "desc_en": "Nominal sunlight in Meridiani Planum. Solar arrays generate ~700 Wh/sol, powering full driving and spectrometer science.",
            "desc_vi": "Ánh nắng bình thường tại bình nguyên Meridiani. Tấm pin sinh ra ~700 Wh/sol, đủ năng lượng cho xe di chuyển và phân tích quang phổ."
          },
          {
            "value": 5.5,
            "label_en": "τ = 5.5: 2007 Major Storm (120 Wh)",
            "label_vi": "τ = 5,5: Bão bụi Năm 2007 (120 Wh)",
            "desc_en": "Severe 2007 dust storm blocks ~99% of direct sunlight. Rover survives at ~120 Wh/sol by hibernating between brief wake-ups.",
            "desc_vi": "Bão bụi lớn năm 2007 che khuất ~99% ánh nắng trực tiếp. Xe sống sót ở mức ~120 Wh/sol nhờ ngủ đông tiết kiệm điện."
          },
          {
            "value": 10.8,
            "label_en": "τ = 10.8: Sol 5111 Final Signal (22 Wh)",
            "label_vi": "τ = 10,8: Tín hiệu Cuối Sol 5111 (22 Wh)",
            "desc_en": "June 10, 2018 (Sol 5111): Historic planet-encircling storm hits τ = 10.8. Power plunges to 22 Wh, triggering final sleep after 45.16 km driven.",
            "desc_vi": "10/06/2018 (Sol 5111): Bão bụi toàn cầu chạm đỉnh kỷ lục τ = 10,8. Điện năng sụt còn 22 Wh, đưa xe vào giấc ngủ sau hành trình 45,16 km."
          }
        ]
      }
    },
    {
      "id": "ingenuity-helicopter",
      "chapter_num": "04",
      "celestial_body": "Mars",
      "name_en": "Ingenuity Mars Helicopter (Ginny)",
      "name_vi": "Trực thăng Sao Hỏa Ingenuity (Ginny)",
      "cospar_id": "2020-052B (Deployed from Perseverance)",
      "location_name": "Valinor Hills, Neretva Vallis, Jezero Crater, Mars (18.49° N, 77.32° E)",
      "functionality_status_en": "REBORN AS STATIONARY WEATHER & AVIONICS TESTBED (Since Sol 1036 / Jan 2024)",
      "functionality_status_vi": "CHUYỂN THÀNH TRẠM QUAN TRẮC TĨNH 20 NĂM (Từ Sol 1036 / Tháng 01/2024)",
      "media": {
        "primary_image_url": "https://mars.nasa.gov/system/resources/detail_files/25802_PIA24647-web.jpg",
        "image_credit": "NASA / JPL-Caltech / ASU / MSSS (Ingenuity Mars Helicopter on the floor of Jezero Crater)"
      },
      "narrative_voice": {
        "epistemic_label_en": "NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY",
        "epistemic_label_vi": "DIỄN GIẢI VĂN HỌC DỰA TRÊN DỮ LIỆU ĐO XA",
        "letter_en": "Weighing just 1.8 kilograms, I was carried beneath Perseverance's belly to attempt what many thought impossible: aerodynamic flight in a Martian atmosphere with only one percent of Earth's surface air density. My carbon-fiber rotors had to spin at 2,537 revolutions per minute just to lift off on April 19, 2021. Built for only five test flights over thirty sols, I soared seventy-two times across Jezero Crater, scouting 17 kilometers of rocky ridges. On Flight 72 (January 18, 2024), featureless sand dunes confused my navigation camera, and my rotor tips struck the slope. Though my wings are clipped at Valinor Hills, my solar panel still wakes my computer every morning to record Martian weather for the next twenty years.",
        "letter_vi": "Chỉ nặng vỏn vẹn 1,8 kilôgam, tôi được mang theo dưới bụng xe Perseverance để thử nghiệm điều tưởng chừng bất khả thi: bay khí động học trong bầu khí quyển Sao Hỏa mỏng manh chỉ bằng 1% mật độ không khí Trái Đất. Cặp cánh quạt sợi carbon của tôi phải quay tới 2.537 vòng/phút mới nâng nổi thân mình lên vào ngày 19/04/2021. Được thiết kế cho đúng 5 chuyến bay thử trong 30 sol, tôi đã tung cánh tới 72 lần trên miệng hố Jezero, trinh sát 17 kilomet địa hình hiểm trở. Ở chuyến bay thứ 72 (18/01/2024), những đồi cát đơn điệu làm hệ thống định vị quang học mất điểm bám, khiến đầu cánh quạt va vào sườn dốc. Dù đôi cánh đã gãy tại Đồi Valinor, tấm pin mặt trời vẫn đánh thức máy tính của tôi mỗi sáng để ghi nhật ký thời tiết Sao Hỏa suốt 20 năm tới."
      },
      "archaeologist_dossier": {
        "epistemic_label_en": "VERIFIED SCIENTIFIC & LEGAL RECORD",
        "epistemic_label_vi": "HỒ SƠ KHOA HỌC & PHÁP LÝ ĐÃ KIỂM CHỨNG",
        "how_it_operated_en": "Ingenuity (1.8 kg mass, 1.2 m rotor span) achieved the Wright Brothers moment on another planet on April 19, 2021. Because Mars's CO2 atmosphere has ~1% the density of Earth's, its counter-rotating coaxial blades spun at ~2,400–2,537 rpm. Originally a 30-sol technology demonstration for 5 flights, Ingenuity transitioned into an operational aerial scout for Perseverance, completing 72 flights, flying 17.0 km (14× planned distance), and logging 128.8 minutes aloft.",
        "how_it_operated_vi": "Ingenuity (nặng 1,8 kg, sải cánh 1,2 m) đã tạo nên khoảnh khắc Anh em nhà Wright trên một hành tinh khác vào ngày 19/04/2021. Do khí quyển CO2 của Sao Hỏa chỉ đặc bằng ~1% Trái Đất, hai cánh quạt đồng trục ngược chiều phải quay ở tốc độ ~2.400–2.537 vòng/phút. Từ một thiết bị trình diễn công nghệ chỉ dự kiến bay 5 lần trong 30 sol, Ingenuity đã trở thành trinh sát viên đường không đắc lực, hoàn thành 72 chuyến bay với tổng quãng đường 17,0 km (gấp 14 lần thiết kế) và 128,8 phút bay.",
        "conservation_law_en": "On Flight 72 (Jan 18, 2024 / Sol 1036), a hard landing on steep, featureless sand ripples in Neretva Vallis damaged its rotor blades. Rather than abandoning the helicopter completely, NASA JPL engineers uploaded a final software patch in April 2024 before Perseverance drove out of radio range: Ingenuity now operates autonomously as a stationary testbed, waking daily to test avionics radiation resilience, measure temperature, and snap surface images into onboard memory for ~20 years until future astronauts or rovers retrieve its data.",
        "conservation_law_vi": "Ở chuyến bay thứ 72 (18/01/2024 / Sol 1036), cú tiếp đất mạnh trên đồi cát dốc tại Neretva Vallis đã làm gãy đầu cánh quạt. Thay vì bỏ mặc chiếc trực thăng, tháng 4/2024 các kỹ sư NASA JPL đã nạp bản cập nhật phần mềm cuối cùng trước khi xe Perseverance đi xa khỏi tầm sóng: Ingenuity hiện hoạt động độc lập như một trạm thử nghiệm tĩnh, thức dậy mỗi ngày để kiểm tra sức bền vi mạch dưới bức xạ, đo nhiệt độ và chụp ảnh lưu vào bộ nhớ trong suốt ~20 năm chờ các phi hành gia tương lai tới thu hồi dữ liệu.",
        "discrepancy_note_en": "Direct Match with 2026 Challenge Prompt: Ingenuity exemplifies how 'hardware varies widely in both its original purpose and its current level of functionality'—evolving from an active aircraft into a 20-year autonomous surface data logger.",
        "discrepancy_note_vi": "Đáp ứng Trực diện Đề bài 2026: Ingenuity là minh chứng sống động nhất cho yêu cầu 'thiết bị đa dạng cả về mục đích ban đầu lẫn mức độ hoạt động hiện tại'—chuyển hóa từ một máy bay trinh sát thành trạm ghi dữ liệu bề mặt tự hành suốt 20 năm.",
        "source_links": [
          {
            "label": "NASA JPL Ingenuity Mars Helicopter Flight Log & Final Telemetry",
            "url": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
          },
          {
            "label": "NSSDCA Spacecraft Record: Ingenuity (2020-052B)",
            "url": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2020-052B"
          }
        ]
      },
      "slider_config": {
        "parameter_name_en": "Ingenuity Mission Flight Log (Flight 1 – Flight 72)",
        "parameter_name_vi": "Nhật ký Chuyến bay của Ingenuity (Chuyến 1 – Chuyến 72)",
        "unit": "Flight",
        "min_val": 1,
        "max_val": 72,
        "step": 1,
        "default_val": 72,
        "stops": [
          {
            "value": 1,
            "label_en": "Flight 1: Wright Brothers Moment",
            "label_vi": "Chuyến 1: Khoảnh khắc Lịch sử",
            "desc_en": "April 19, 2021 (Sol 58): First powered, controlled flight on another planet. Rotors spin at 2,537 rpm; hovers at 3 m altitude for 39.1 seconds.",
            "desc_vi": "19/04/2021 (Sol 58): Chuyến bay có điều khiển đầu tiên trên một hành tinh khác. Cánh quạt quay 2.537 vòng/phút; bay treo ở độ cao 3 m trong 39,1 giây."
          },
          {
            "value": 5,
            "label_en": "Flight 5: Design Limit Reached",
            "label_vi": "Chuyến 5: Đạt Giới hạn Thiết kế",
            "desc_en": "May 7, 2021: Completes its original 5-flight technology demonstration, transitioning into an operational scout for Perseverance.",
            "desc_vi": "07/05/2021: Hoàn thành trọn vẹn 5 chuyến bay thử nghiệm theo thiết kế ban đầu, chuyển sang giai đoạn trinh sát thực địa."
          },
          {
            "value": 72,
            "label_en": "Flight 72: Rotor Damage & Rebirth",
            "label_vi": "Chuyến 72: Gãy Cánh & Tái sinh",
            "desc_en": "Jan 18, 2024 (Sol 1036): Rotor tips damaged after 17.0 km total flight. Reprogrammed to log daily Martian weather and avionics data for ~20 years.",
            "desc_vi": "18/01/2024 (Sol 1036): Gãy đầu cánh quạt sau tổng quãng đường bay 17,0 km. Được lập trình lại để ghi dữ liệu thời tiết và vi mạch suốt ~20 năm tiếp theo."
          }
        ]
      }
    }
  ],
  "decision_station": {
    "title_en": "THE ARTEMIS LANDING SITE DECISION STATION",
    "title_vi": "TRẠM QUYẾT ĐỊNH BÃI ĐÁP SỨ MỆNH ARTEMIS",
    "physics_callout_en": "Vacuum Ballistics Physics: Why does landing 155 meters away still damage a spacecraft? Because the Moon has NO atmosphere to slow down dust and 1/6th Earth's gravity. Rocket exhaust plumes accelerate jagged lunar regolith grains to 300–2,000 m/s (faster than a rifle bullet), creating a supersonic sandblasting spray across kilometers!",
    "physics_callout_vi": "Vật lý Đạn đạo trong Chân không: Tại sao đáp cách xa 155 mét vẫn làm hỏng tàu vũ trụ? Vì Mặt Trăng KHÔNG có không khí cản bụi lại và trọng lực chỉ bằng 1/6 Trái Đất. Luồng phụt tên lửa gia tốc các hạt bụi sắc nhọn tới vận tốc 300–2.000 m/s (nhanh hơn đạn súng trường), tạo ra cơn bão bắn cát siêu thanh văng xa hàng kilomet!",
    "zones": [
      {
        "id": "zone-red",
        "distance_label": "< 75 m / 225 m",
        "distance_num": 50,
        "status_badge_en": "MISSION ABORTED — DIRECT ARTIFACT INTRUSION",
        "status_badge_vi": "HỦY BÃI ĐÁP — VI PHẠM VÙNG CẤM HIỆN VẬT",
        "color_hex": "#EF4444",
        "impact_en": "Catastrophic shockwave and high-density ejecta topple scientific instruments and erase historic astronaut bootprints.",
        "impact_vi": "Sóng xung kích trực diện và luồng đất đá mật độ cao làm lật đổ thiết bị khoa học và xóa sổ toàn bộ dấu chân phi hành gia lịch sử.",
        "law_citation_en": "Violates the strict Artifact Boundary: 75 m radius for Apollo 11 and 225 m radius for Apollo 17 (NASA 2011 Recommendations, Table 1 & Public Law 116-275).",
        "law_citation_vi": "Vi phạm Vành đai Hiện vật: bán kính 75 m đối với Apollo 11 và 225 m đối với Apollo 17 (Khuyến nghị NASA 2011, Bảng 1 & Đạo luật Public Law 116-275).",
        "unlocks_badge": false
      },
      {
        "id": "zone-orange",
        "distance_label": "155 m (Apollo 12 Historical)",
        "distance_num": 155,
        "status_badge_en": "WARNING — SUPERSONIC PLUME SANDBLASTING",
        "status_badge_vi": "CẢNH BÁO CAM — HIỆU ỨNG BÃO CÁT BẮN RỖ",
        "color_hex": "#F97316",
        "impact_en": "Replicates Apollo 12 LM Intrepid landing near Surveyor 3. Hyper-velocity dust spray micro-pits optical glass and turns white thermal paint tan.",
        "impact_vi": "Tái hiện đúng khoảng cách tàu Intrepid (Apollo 12) đáp cạnh Surveyor 3 năm 1969. Luồng bụi siêu tốc bắn rỗ kính quang học và làm ố nâu lớp sơn cách nhiệt.",
        "law_citation_en": "Proven empirically by post-flight laboratory analysis in NASA Special Publication SP-284 (1972); separation measured at 155 m via LROC imagery.",
        "law_citation_vi": "Được chứng minh thực nghiệm qua phân tích phòng thí nghiệm trong báo cáo NASA SP-284 (1972); khoảng cách 155 m đo bằng vệ tinh LROC.",
        "unlocks_badge": false
      },
      {
        "id": "zone-yellow",
        "distance_label": "500 m (0.5 km Impact Rule)",
        "distance_num": 500,
        "status_badge_en": "CAUTION — FINE DUST OPTICAL CONTAMINATION",
        "status_badge_vi": "CẢNH BÁO VÀNG — BỤI MỊN PHỦ MỜ QUANG HỌC",
        "color_hex": "#EAB308",
        "impact_en": "Avoids structural pitting, but suspended fine dust curtain settles over passive laser retroreflector prisms (LRRR), degrading photon return.",
        "impact_vi": "Tránh được luồng bắn rỗ kim loại nhưng màn bụi mịn bay xa hơn 500 m vẫn rơi xuống phủ mờ các lăng kính phản xạ laser (LRRR).",
        "law_citation_en": "Under NASA 2011 Guidelines, a 0.5 km buffer is only sufficient for hard impact sites (Ranger, S-IVB), NOT soft-landed heritage sites.",
        "law_citation_vi": "Theo Khuyến nghị NASA 2011, bán kính 0,5 km chỉ đủ an toàn cho các điểm va chạm cứng (Ranger, S-IVB), chưa đủ cho tàu đổ bộ hạ cánh bằng tên lửa.",
        "unlocks_badge": false
      },
      {
        "id": "zone-green",
        "distance_label": "≥ 2,000 m (2.0 km Safe Buffer)",
        "distance_num": 2000,
        "status_badge_en": "MISSION APPROVED — NASA 2011 HERITAGE STANDARD",
        "status_badge_vi": "PHÊ DUYỆT BÃI ĐÁP — ĐẠT CHUẨN BẢO TỒN NASA 2011",
        "color_hex": "#10B981",
        "impact_en": "All ballistic rocket plume ejecta falls harmlessly back to the regolith before reaching the heritage site. 100% artifact preservation achieved!",
        "impact_vi": "Toàn bộ hạt bụi bắn ra theo quỹ đạo đạn đạo đã rơi xuống bề mặt Mặt Trăng trước khi chạm tới khu vực di sản. Bảo vệ nguyên vẹn 100% di vật!",
        "law_citation_en": "Complies with the 2.0 km Descent/Approach Path Exclusion Radius (NASA 2011 Recommendations, Public Law 116-275 & NASA GIC 21-07).",
        "law_citation_vi": "Tuân thủ đúng Bán kính Vùng cấm Đường bay Tiếp cận và Hạ cánh 2,0 km (Khuyến nghị NASA 2011, Đạo luật Public Law 116-275 & NASA GIC 21-07).",
        "unlocks_badge": true
      }
    ]
  }
}
```

---

## 8. CÂU LỆNH NHẮC (MASTER PROMPT) DÀNH CHO AI CODING AGENT (CLAUDE MAX / ARGON / QODER)

Khi bước vào giờ thi chính thức (09:00 sáng Thứ Bảy 14/11/2026) hoặc khi tập dượt, vị trí **Lead** và **SW** chỉ cần sao chép toàn bộ nội dung file `RELIC_PULSE_PRD.md` này và dán vào công cụ sinh mã kèm câu lệnh dưới đây:

> **Master Prompt:**  
> *"Act as a Principal Frontend Architect and Data Visualization Engineer. Based strictly on the attached Product Requirements Document (`RELIC_PULSE_PRD.md`) and its embedded `RELIC_DATA` JSON object, build a complete, production-ready static web application (`index.html` + ES modules in `js/`) using HTML5, a prebuilt Tailwind CSS file (Tailwind Standalone CLI, no CDN), self-hosted fonts (`Fira Sans`, `Overpass`, `JetBrains Mono`), and Vanilla JavaScript. Follow every UI/UX requirement in section 1.1a (mobile + desktop, Pointer Events, 44 px touch targets, prefers-reduced-motion, story player, stage flow).*  
> *Requirements:*  
> *1. Embed the entire `RELIC_DATA` JSON directly inside a `<script>` tag so the app runs with zero external fetch/CORS issues.*  
> *2. Implement full Bilingual Toggle (`EN` / `VI`) across the entire UI, Hero section, 4 Relic Chapters, Decision Station, Classroom Guide, and SI Disclosure.*  
> *3. For each of the 4 Relic Chapters, build a custom, interactive inline SVG + CSS visualization that dynamically responds in real time to its range slider AND its preset state buttons (1: Laser beam & lunar recession distance counter; 2: Surveyor 3 camera sepia/pitting sandblast effect; 3: Opportunity rover Martian sky opacity `tau` & exponential watt-hour gauge; 4: Ingenuity coaxial rotor spin & stationary weather telemetry).*  
> *4. Include the 'Where does this number come from?' accordion and strict epistemic badges (`[NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY]` vs. `[VERIFIED SCIENTIFIC & LEGAL RECORD]`) on every chapter.*  
> *5. Build the interactive 4-zone Artemis Landing Site Decision Station with a stepped SVG ballistic plume diagram, unlocking the zero-PII 'Space Heritage Guardian' certificate generator upon selecting the ≥ 2,000 m zone.*  
> *6. Do NOT include any official NASA logos ('Meatball' or 'Worm') to strictly comply with Space Apps Brand Guidelines."*

---

## 9. DANH SÁCH KIỂM TRA NGHIỆM THU (ACCEPTANCE CHECKLIST - DEFINITION OF DONE)

Trước mốc **Hard Freeze (09:00 sáng Chủ nhật 15/11/2026, theo kế hoạch v5)**, Lead và RD dùng bảng kiểm 8 điểm này cùng các điểm UI/UX bổ sung bên dưới để nghiệm thu sản phẩm:
- [ ] **Kiểm tra Mất mạng / Chặn ảnh:** Khi ảnh gốc từ máy chủ `nssdc.gsfc.nasa.gov` tải chậm, khung đồ họa SVG tương tác vẫn hiển thị rõ nét, không xuất hiện biểu tượng ảnh vỡ (broken image icon).
- [ ] **Kiểm tra Toán học Thanh trượt:** Kéo thanh trượt Chương 1 đến năm `2026` hiện đúng `+216.6 cm`; Chương 2 tại mốc `155 m` ghi chú rõ độ lệch `160–180 m` của tài liệu năm 1969; Chương 3 tại `τ = 10.8` hiện đúng `22 Wh`; Chương 4 tại `Flight 72` hiện đúng `17.0 km` và trạng thái trạm thời tiết tĩnh 20 năm.
- [ ] **Kiểm tra Nút bấm Dự phòng (Preset Buttons):** Bấm vào cả 3–4 nút mốc dưới mỗi thanh trượt trên màn hình điện thoại (`375px width`) đều cập nhật mượt mà số liệu và đồ họa SVG.
- [ ] **Kiểm tra Trạm Quyết định Artemis:** Bấm đủ 4 nút (`< 75 m`, `155 m`, `500 m`, `≥ 2,000 m`) đều đổi màu quỹ đạo bụi tương ứng và mở khóa Thẻ Chứng nhận khi chọn `≥ 2,000 m`.
- [ ] **Kiểm tra Quy tắc Logo NASA:** Rà soát toàn bộ trang web không có bất kỳ file ảnh logo tròn màu xanh hay chữ đỏ của NASA.
- [ ] **Kiểm tra Quy tắc Bảo vệ Trẻ vị thành niên (Under-18 Rule):** Trang web không thu thập họ tên thật/email/ảnh cá nhân của học sinh; Video 30 giây nhúng kèm không chứa giọng nói hay khuôn mặt của thành viên dưới 18 tuổi.
- [ ] **Kiểm tra Nhãn SI Disclosure 2026:** Chân trang hiển thị rõ mục **"Super Intelligence (SI) Disclosure"** kèm danh sách công cụ và quy trình kiểm chứng thủ công của con người.
- [ ] **Kiểm tra Tốc độ tải (Incognito Test):** Mở đường dẫn deploy (Vercel / GitHub Pages) ở chế độ Ẩn danh trên điện thoại 4G: màn hình đầu (ảnh mở đầu đầu tiên và chữ) hiện trong khoảng 1,5 giây.

**Điểm UI/UX bổ sung:**
- [ ] **Bộ phát truyện:** chạm, bấm chuột, vuốt và bàn phím đều chuyển được ảnh. Nút Bỏ qua dùng được ở mọi ảnh. Ảnh thiếu thì hiện nền tối kèm lời thoại, không có biểu tượng ảnh vỡ.
- [ ] **4 trò chơi và Trạm Artemis:** chơi hết được trên điện thoại thật (375 px) và trên máy tính (1280 px, chuột và bàn phím). Không có thanh cuộn ngang, vùng chạm ≥ 44 px.
- [ ] **Luồng theo chặng:** lần đầu vào thì tự phát mở đầu; lần sau thì hiện nút "Xem lại câu chuyện". Link `#artemis` mở thẳng chặng Artemis. Đổi EN/VI không làm mất tiến độ.
- [ ] **Chuyển động giảm:** bật `prefers-reduced-motion` thì không còn zoom hay vòng lặp quay.