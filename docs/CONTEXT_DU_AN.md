# CONTEXT DỰ ÁN — LUNAMARIS (tên nội bộ cũ: RELIC-PULSE)

> Tài liệu tóm tắt toàn cảnh dự án 

---

## 1. Tóm tắt 1 phút

| Mục | Nội dung |
|---|---|
| Cuộc thi | NASA International Space Apps Challenge 2026, điểm thi Hà Nội. Đội **Lunamaris** |
| Đề bài | *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars* |
| Sản phẩm | Web kể chuyện một trang (scrollytelling), tĩnh, không backend. Giao diện **"Hộp thư vũ trụ"**: 4 cỗ máy NASA bị bỏ lại tự "viết thư" về **Trạm mặt đất Hà Nội**. Người chơi kéo thanh trượt để tự kiểm số liệu, rồi dùng chúng để quyết định bãi đáp Artemis |
| Đối tượng | Chính là học sinh THCS 11–15 tuổi; phụ là giáo viên KHTN/Vật lý THCS |
| Vấn đề (giả thuyết, đang khảo sát) | Tài liệu NASA toàn tiếng Anh, số liệu khó hình dung, khó biết nguồn nào tin được |
| Câu xuyên suốt | *"Lắng nghe những cỗ máy cũ để biết nên đặt bước chân mới ở đâu."* |
| Thông điệp MVP | Học sinh tự khám phá 4 cỗ máy bằng số liệu có nguồn, và hiểu **vì sao bãi đáp Artemis phải tránh xa di tích** |
| 4 cỗ máy | Mặt Trăng: **Apollo 11 (gương LRRR)**, **Surveyor 3** (cùng Apollo 12). Sao Hỏa: **Opportunity**, **Ingenuity** |
| Tên gọi | **RELIC-PULSE** là tên trong bộ kế hoạch, **LUNAMARIS: Letters Across the Silent Seas** là tên sản phẩm trong repo. Cùng một dự án: PRD còn nhắc `RELIC_PULSE_PRD.md`, code còn dùng biến `RELIC_DATA` ([js/data.js](../js/data.js), [js/app.js](../js/app.js)) và id `#relic-chapters-container` |
| Demo | https://lunamaris.vercel.app |
| Tiêu chí chấm | Impact · Creativity · Validity · Relevance · Presentation |

---

## 2. Bản đồ tài liệu

### 2.1. Bộ kế hoạch [KH] (thư mục gốc)

| Tệp | Nội dung | Ghi chú |
|---|---|---|
| `Huong_dan_bo_ke_hoach_v5_RELIC_PULSE.docx` | Hướng dẫn dùng bộ 4 tệp, quy tắc cập nhật, cấu trúc Drive | Ngày 13/11/2026 |
| `Ke_hoach_7_chang_RELIC_PULSE_6_vi_tri.xlsx` | 7 chặng, 39 việc RACI, tải theo vị trí, nguồn NASA, công cụ theo chặng, so sánh với v4 | **Nguồn sự thật duy nhất** về tiến độ |
| `CHECKLIST_CAC_NHIEM_VU_RELIC_PULSE.xlsx` | Checklist dạng in | Lệch với RACI (xem §12) |
| `Bang_phan_cong_cong_cu_RELIC_PULSE.docx` | Công cụ bắt buộc / nên học / dự phòng cho từng vị trí | 36 công cụ |
| `Bo_cau_lenh_RELIC_PULSE_cau_chuyen_nhan_vat_san_pham.docx` | Bộ câu lệnh AI P0.1–P3.5 | Theo khuôn BlueMarble 7 phần |
| `Phieu_vi_tri_{LEAD,RD,DE,SW,UX,ST}_RELIC_PULSE_chi_tiet.docx` | Phiếu chi tiết từng vị trí: lịch giờ, hướng dẫn việc, phương án B, nghiệm thu 8 điểm | Ghi "v5.1" |
| `Khao_sat/` | Spec khảo sát bản 3, kế hoạch thực hiện (đã cũ), `tao_form.gs` | Xem §10 |

### 2.2. Sản phẩm theo chặng [KH]/C0–C3

| Mã | Tệp | Nội dung |
|---|---|---|
| N0.1 | `C0/N0.1/Danh sách nguồn có link.xlsx`, `LINK_HOC_TAP_NASA (4).xlsx` | 38 nguồn (5 chính, 17 Mặt Trăng, 8 Sao Hỏa, 8 không gian sâu). **Hai tệp giống hệt nhau** |
| N0.2 | `C0/N0.2/*` | Cốt truyện và kịch bản qua nhiều phiên bản (xem §4). **Bản đầy đủ nhất: `Kich_ban_relic_Final_v2.md`** và `Tóm tắt luồng câu chuyện RELIC-PULSE.md` |
| N0.3 | `C0/N0.3/chốt thiết bị và thông số cần kiểm .docx` | Bảng thông số 4 thiết bị và dải thanh trượt đề xuất |
| N0.4 | `C0/N0.4/N0.4_brief.md` | Brief một trang (Phải có / Nên có / Không làm) |
| N1.2 | `C1/N1.2/CHẠM PHONG BÌ ĐỂ MỞ THƯ.zip` | 3 ảnh khung màn hình phong bì (1–3.png) |
| N1.3 | `C1/N1.3/Bảng số liệu.xlsx` | Bảng số liệu 4 thiết bị, dải thanh trượt, nguồn NSSDCA |
| N1.6 | `C1/N1.6/SỔ TAY KĨ SƯ CHƯƠNG 1-2.docx` | Sổ tay kỹ sư Apollo 11 và Surveyor 3 |
| N2.5 | `C2/N2.5/Hồ sơ kĩ sư chương 3-4.docx` | Hồ sơ Opportunity và Ingenuity (phần Opportunity còn mỏng) |
| N2.7 | `C2/N2.7/1.png`, `2.png` | Bưu thiếp hồi âm "SPACE HERITAGE GUARDIAN": bản Mặt Trăng và bản Sao Hỏa |
| N3.3 | `C3/N3.3/Bảng nguồn từng con số.xlsx` | **Bảng chuẩn**: mỗi con số kèm trạng thái Đã kiểm hoặc Ứng viên và nguồn chính/phụ |

Các thư mục còn trống: C1/N1.1, N1.4, N1.5; C2/N2.1–N2.4, N2.6, N2.8; C3/N3.1, N3.2, N3.4–N3.7.

### 2.3. Repo này

| Tệp | Vai trò |
|---|---|
| [README.md](../README.md) | Giới thiệu sản phẩm (song ngữ), dành cho giám khảo |
| [dac_ta_ky_thuat_lunamaris.md](dac_ta_ky_thuat_lunamaris.md) | PRD / đặc tả kỹ thuật cho AI coding agent (bị loại khỏi deploy) |
| [index.html](../index.html) | Trang duy nhất, gồm 6 phần (xem §11) |
| [js/data.js](../js/data.js) | Dữ liệu và từ điển i18n nhúng sẵn (tránh lỗi CORS khi mở file trực tiếp) |
| [data/content.json](../data/content.json) | Bản JSON của nội dung |
| [js/app.js](../js/app.js), [js/svg-engine.js](../js/svg-engine.js), [js/decision-station.js](../js/decision-station.js), [js/certificate.js](../js/certificate.js) | State và render chương; mô phỏng SVG; Trạm Quyết định; thẻ Guardian (xuất PNG bằng Canvas) |
| [types/dataset.types.ts](../types/dataset.types.ts) | Kiểu dữ liệu tham chiếu |
| `Huong_Dan_Lay_Nguon_Du_Lieu_NASA_Lunamaris.docx` | Hướng dẫn lấy nguồn NASA |

---

## 3. Sản phẩm và quy tắc

### 3.1. Thành phần chính
- **Hộp thư vũ trụ:** 4 phong bì (mỗi cỗ máy một phong bì), sau đó là **phong bì thứ 5**. Phong bì thứ 5 là "thư gửi tương lai" của Artemis, **không phải cỗ máy thứ 5**.
- **Hai giọng kể:**
  - 📡 *The Machine's Pulse*: thư ngôi thứ nhất, nhãn `NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY`.
  - 🏛️ *Archaeologist & Science Dossier*: sổ tay kỹ sư, nhãn `VERIFIED SCIENTIFIC & LEGAL RECORD`.
- **Mỗi thư có:**
  - trạm mô phỏng "P.S. – Tự thử đi": thanh trượt kèm **3 nút mốc** (dự phòng khi kéo thanh trượt khó);
  - dòng **VERIFIED**;
  - nút **"Số này từ đâu?"**;
  - sổ tay kỹ sư;
  - nút "Bật giọng kể" (tùy chọn).
- **Trạm Quyết định Artemis:** người chơi chọn bãi đáp trong 4 vùng. Chỉ khi chọn vùng **≥ 2.000 m** thì **thẻ Guardian** mới mở.
- **Thẻ / bưu thiếp Space Heritage Guardian:** biệt danh là tùy chọn và không được lưu; người chơi có thể tải thẻ về.
- **Góc giáo viên** (bài 15 phút) và **trang Nguồn**.

### 3.2. Brief N0.4
- **Phải có:**
  - 5 phong bì mở được trên màn hình 375px, mỗi thư có tem VERIFIED và sổ tay kỹ sư;
  - mỗi thư có thanh trượt kèm 3 nút mốc, số liệu khớp bảng đã kiểm;
  - Trạm Quyết định Artemis 4 vùng;
  - trang Nguồn.
- **Nên có:** giọng kể, Góc giáo viên, hiệu ứng phong bì.
- **Không làm:**
  - chương về cỗ máy thứ 5, app, máy chủ;
  - thu tên, email hay ảnh của người dùng;
  - logo NASA;
  - nội dung lấy từ bản mẫu luyện tập;
  - viết như thể máy gửi chữ thật.

### 3.3. Kỹ thuật
- HTML/CSS/JS thuần; **giữ Tailwind CDN và Google Fonts** cho bản thi (ít rủi ro nhất), sau cuộc thi mới chuyển sang Tailwind biên dịch sẵn (xem mục 1.1 và 1.1a của đặc tả); client-side 100%, không backend.
- Thiết kế cho màn hình 375px trước. Mục tiêu tải ~1,5 s trên mạng 4G.
- Đồ họa dùng inline SVG và CSS filter, **không dùng WebGL hay 3D**.
- Màu: nền `#151622`, `#1E2030`, xanh `#1B2B85`, nhấn vàng `#E7F434`. Tem Mặt Trăng `#38BDF8`, tem Sao Hỏa `#F97316`.
- Phông: Fira Sans, Overpass, JetBrains Mono.
- Deploy: kế hoạch ghi GitHub Pages, nhưng thực tế đang dùng **Vercel** (`.vercelignore` loại tài liệu nội bộ khỏi bản deploy).

### 3.4. Luật tuân thủ (bắt buộc)
- Không bịa số, năm, tọa độ hay link. Mọi số phải nằm trong bảng đã kiểm; số chưa chắc thì gắn nhãn **"ứng viên"**.
- Không dùng logo NASA. Ảnh NASA phải ghi công.
- Không thu tên, ảnh, email hay giọng nói của người dưới 18 tuổi.
- Không đặt câu nói đang lan truyền trên mạng trong ngoặc kép như thể đó là tín hiệu thật của máy.
- Không mang mã, `content.json`, thư hay tài nguyên của **bản mẫu luyện tập** vào bài nộp. README phải khai báo trung thực: *"all submitted code, text and assets were created on 14–15 November 2026"*. Repo trống chỉ được tạo lúc 09:00 Thứ Bảy 14/11.
- Khai báo việc dùng AI; giữ **Nhật ký AI**.
- **Nghiệm thu 8 điểm:**
  1. chạy được khi mạng chậm;
  2. số trên thanh trượt đúng;
  3. hiển thị đúng ở 375px;
  4. Trạm Quyết định chỉ mở thẻ ở ≥2.000 m;
  5. không có logo NASA;
  6. không thu dữ liệu của người dưới 18 tuổi;
  7. có khai báo AI;
  8. tải ~1,5 s trên 4G.

---

## 4. Cốt truyện

### 4.1. Các phiên bản (thư mục `C0/N0.2/`)

| Thứ tự | Tệp | Đặc điểm |
|---|---|---|
| v1 | 2 tệp PDF (*Cốt Truyện Hoàn Chỉnh…*, *Theo hướng kể lại truyện*) | Bản gốc. Dùng 155 m, 700 Wh; người chơi "cứu" Ingenuity; có "chỉ số bazan" |
| Soát | `Soat_cot_truyen_RELIC_PULSE_v1.md` (sinh từ `Prompt_soat_cot_truyen_theo_brief_N0.4.md`) | Chấm 9 trục, đề xuất sửa B1–B10, N1–N5, C1–C3 |
| v2 | `Cot_truyen_RELIC_PULSE_v2_song_ngu.md` | Song ngữ. Có "Luật cho Artemis #1–#4", Phụ lục A sửa số liệu. Thư thứ 5 do **người chơi** viết |
| Kịch bản | `Kich_ban_RELIC_PULSE_VI.md` / `_EN.md` | 13 cảnh. Thư thứ 5 do "một thiết bị của Artemis" viết; kết ở Hà Nội năm 2076 |
| **Final** | **`Kich_ban_relic_Final_v2.md`** và `Tóm tắt luồng câu chuyện…md` | Bản VI cộng thêm **Artemis IV**, trạm **DUSTER**, link NASA trong sổ tay, popup Nguồn và Góc giáo viên |

> Không nên dựa vào giờ sửa tệp để xác định bản mới nhất. Nhiều tệp có vẻ được tải về hoặc chép từ nơi khác, và giờ sửa của Final_v2 lại sớm hơn VI.

### 4.2. Nhân vật
- **Columbina:** người dẫn đường, nhà lưu trữ di sản trẻ tuổi. Lời thoại ngắn, đời thường. 
- **Người chơi:** trực ban tập sự ca đêm ở trạm Hà Nội, là người ra quyết định ở Trạm Artemis.
- **Bốn cỗ máy tự kể:**
  - LRRR: "người gác hải đăng".
  - Surveyor 3: "người lính già có vết sẹo".
  - Opportunity ("Oppy"): lạc quan, hài hước.
  - Ingenuity: "em út tinh nghịch", xưng *em – mọi người*.
  - Ba cỗ máy đầu xưng *tôi – các bạn*.
- **DUSTER** (*DUst and plaSma environmenT survEyoR*): thiết bị Artemis IV, viết lá thư thứ 5 (chỉ có trong Final_v2).

### 4.3. Cấu trúc cảnh (theo Final_v2, thời lượng ~10 phút)
- **Mở đầu (Cảnh 1–3):** phòng trực Hà Nội lúc 02:40, sau đó là bản đồ, rồi phong bì.
- **Ch.1 Cái gương – Apollo 11** (Biển Yên Tĩnh): giữ nút laser, chờ ~2,5 s cho tia phản hồi. Thanh trượt năm có mốc 1969 / 2000 / 2026; đến 2026 Mặt Trăng đã lùi xa thêm ~2,2 m.
- **Ch.2 Vết sẹo – Surveyor 3** (Biển Bão Tố): người chơi lái tàu Intrepid (Apollo 12) đáp cách Surveyor 3 ~160 m. Mốc 20/4/1967 · 4/5/1967 · 19/11/1969.
- **Ch.3 Cơn bão – Opportunity** (Thung lũng Perseverance): thanh trượt độ dày bụi, điện tụt **645 → 22 Wh**. Mốc đầu tháng 6/2018 · 10/6/2018 · 13/2/2019.
- **Ch.4 Chuyến bay thứ 72 – Ingenuity** (hố Jezero): mốc chuyến 1 (19/4/2021) · chuyến 5 · chuyến 72 (18/1/2024).
- **"Chương 5" Trạm Quyết định Artemis IV (Cảnh 8–13):**
  - Mỗi cỗ máy loại một vùng: LRRR và Surveyor 3 loại vùng **A** (quá gần di tích, khuyến nghị cách 2 km); Oppy loại **B** (đáy hố khuất nắng); Ingenuity loại **C** (bằng phẳng, không có điểm mốc). Người chơi **chọn D**.
  - Sau khi hạ cánh, laser bắn lại và gương vẫn phản hồi. DUSTER được đặt xuống và ở lại.
  - Lá thư thứ 5, rồi cảnh cuối ở Hà Nội lúc 02:40 năm 2076.

### 4.4. Tình trạng các mục trong bản Soát

| Đã sửa | Chưa sửa hoặc mới sửa một phần |
|---|---|
| B1: kết truyện thành "tránh xa di tích" · B5: 155 → ~160 m · B6: 700 → 645 Wh · B8: bỏ "chỉ số bazan" · B9: người chơi không "cứu" cỗ máy · B10: chốt một vai cho người chơi · N2: Artemis được gieo từ Cảnh 1 · N4/N5: giọng và phép so sánh · C1/C3: Góc giáo viên và thư chỉ lưu trên máy | **B2:** tiền đề "máy thu ở Hà Nội nghe tín hiệu" sai khoa học (đề xuất: "đọc lại dữ liệu trong kho NASA") · **B3:** chưa có khung "Thư tưởng tượng · Viết từ dữ liệu thật của NASA" · **B4:** chưa chốt ngôn ngữ (VI chính, có nút mở bản gốc EN) · **B7:** Final_v2 lại viết khác về cách gãy cánh · **C2:** chưa có âm thanh cánh quạt thật |

---

## 5. Bốn thiết bị và số liệu chính

Nguồn chuẩn là `C3/N3.3/Bảng nguồn từng con số.xlsx`, viết tắt **ĐK** (Đã kiểm) và **ƯV** (Ứng viên). Cột "Repo" cho biết repo đang dùng thanh trượt nào và số nào.

| Thiết bị | Số liệu chính (trạng thái) | Nguồn chính | Repo đang dùng |
|---|---|---|---|
| **Apollo 11 / LRRR** (Mare Tranquillitatis) | 0,67°N 23,47°E (ĐK); phóng/đáp/về 16/7, 20/7, 24/7/1969 (ĐK); ở trên bề mặt 22 giờ (ĐK); RTG 70 W (ĐK); laser chính xác 8 cm (ĐK); mẫu 21,5 kg (ƯV); LM lúc đáp ~15.000 kg (ƯV). Theo kịch bản: 100 lăng kính Ø3,8 cm, khứ hồi ~2,5 s, Mặt Trăng lùi 3,8 cm/năm | LROC featured_sites/59, NSSDCA apollo11, SP-4029, ALSJ | Thanh trượt **năm Y 1969–2026**, điểm cuối +216,6 cm; khứ hồi 2,56 s |
| **Surveyor 3** (Oceanus Procellarum) | 3,0°S 23,41°W (ĐK); phóng/đáp/dừng 17/4, 20/4, 4/5/1967 (ĐK); 997,9 kg (ĐK); cao 3,3 m, chân 4,5 m (ĐK); tầm vươn gáo 1,5 m, đào sâu 18 cm (ĐK); đất chịu 10 psi (ĐK); **6.326 ảnh** (ĐK); 85 W / 4.090 Wh (ĐK); khối lượng khô ~300 kg (ƯV) | science.nasa.gov/mission/surveyor-3, LPI, NSSDCA 1967-035A | Thanh trượt **khoảng cách D 50–2.500 m**, mốc 155 m; ghi **6.315 ảnh** |
| **Opportunity** (Meridiani Planum, Eagle Crater) | đáp **24/01/2004**, mất liên lạc 10/06/2018 (ĐK); đi 45,16 km (ĐK); panorama "Lion King" 558 ảnh (ĐK); thiết kế 90 sol (ƯV); hoạt động 5.111 sol (ƯV). Theo kịch bản: điện 645 → 22 Wh, tau 10,8 | MER Spirit & Opportunity, JPL PIA26814, PIA05755 | Thanh trượt **τ 1,0–10,8**, điện **700** → 22 Wh; ghi ngày đáp **25/01/2004** |
| **Ingenuity** (Jezero) | đáp 18/02/2021, bay lần đầu 19/04/2021, chuyến 72 ngày 18/01/2024 (ĐK); 1,8 kg (ĐK); cánh ~1,2 m (ĐK); 350 W (ĐK); 72 chuyến, 128,8 phút, 17,0 km, cao nhất 24,0 m (ĐK). Theo kịch bản: khí quyển ~1% Trái Đất, 2.537 vòng/phút | Ingenuity Overview, Flight Log PDF | Thanh trượt **số chuyến F 1–72**, 2.537 vòng/phút, sau cùng thành trạm tĩnh ~20 năm |

**Trạm Artemis:** dùng Khuyến nghị NASA 2011 (*protecting_lunar_heritage_report_072011.pdf*), luật *One Small Step* (Public Law 116-275) và Hiệp định Artemis. Repo dùng 4 vùng **&lt;75/225 m · 155 m · 500 m · ≥2.000 m**.

---

## 6. Kế hoạch 7 chặng

| Chặng | Thời gian | Nội dung | Cổng / mốc |
|---|---|---|---|
| **C0** | T6 13/11, 20:00–22:00 (trực tuyến) | Chốt hướng | 22:00 có Brief (N0.4) |
| **C1** | T7 14/11, 09:00–12:00 | Khung web, khung màn hình, số liệu, thư Ch.1–2, Trạm Quyết định | 09:00 tạo repo; **CP1 12:00**: hộp thư chạy ở 375px, nếu chưa thì rút lui (phong bì tĩnh trên trang cuộn) |
| **C2** | 13:00–16:00 | Thanh trượt, `content.json`, Ch.3–4 | 14:00 JSON bản 1 (số); **15:30 JSON bản 2 = CHỐT CHỮ**; **CP2 16:00** quyết có làm video không |
| **C3** | 16:00–18:00 | Thử với học sinh, slide, bàn giao | 16:45–17:15 thử với HS; **17:45 BÀN GIAO tại điểm thi** |
| **C4** | 18:00–23:30 (từ xa) | Ghép, giọng kể, sửa lỗi, README | 20:30 xong giọng kể; 21:00 RD gửi danh sách sửa, học sinh dừng; trước 23:00 có bản ứng viên 2 |
| **C5** | CN 15/11, 07:45–09:00 | Cả đội thử, nghiệm thu 8 điểm | **HARD FREEZE 09:00** |
| **C6** | 09:00–11:00 | Nộp bài, trình bày | 09:15 deploy cuối; **09:45 NỘP** (muộn nhất 10:30); **11:00 hạn cứng** |

- Tổng 18,75 giờ, có 75 phút đệm.
- **Thứ tự cắt khi trễ:** giọng kể → chữ hiện dần → hiệu ứng gấp 3D → hiệu ứng đóng dấu.
- **Luôn giữ:** thanh trượt, Trạm Quyết định, sổ tay kỹ sư, trang Nguồn.

---

## 7. Sáu vị trí và công cụ

| Mã | Vai trò | Được tự quyết | Công cụ bắt buộc |
|---|---|---|---|
| **LEAD** (F) | Trưởng nhóm, dựng và ghép web. **Người duy nhất** đẩy mã, deploy và nộp bài | Cắt phạm vi, đổi người, rút lui ở CP1 | Claude Max (Argon), VS Code, Git/GitHub, GitHub Pages, Google Sheets, DevTools. Dự phòng: Qoder, Netlify/Vercel |
| **RD** (A) | Nghiên cứu và kiểm chứng: nguồn, kiểm kép, sổ tay kỹ sư, Góc giáo viên, thử với HS; trực Zalo, quyết thay khi LEAD đang lập trình | Giữ, bỏ hoặc gắn "ứng viên" cho một con số | NotebookLM, NSSDCA, NTRS, Google Docs |
| **DE** (E) | Dữ liệu và nguồn: bảng số liệu, `content.json`, bảng nguồn, kiểm link | Muốn đổi schema phải hỏi LEAD | Google Sheets, NSSDCA, Claude (CSV→JSON), JSONLint |
| **SW** (D) | Lập trình module (Trạm Quyết định, SVG, giọng kể, PDF dự phòng); làm trên máy rồi gửi thư mục nén vào `05_Gui_LEAD` | — | Qoder, VS Code, Chrome DevTools, công cụ giọng AI |
| **UX** (C) | Thiết kế: khung điện thoại, ảnh NASA, thẻ Guardian, 7 slide, máy chiếu. **Không chạy AI**, chỉ kiểm kết quả | — | Figma/Canva, Google Slides, NSSDCA Photo Gallery |
| **ST** (B) | Kể chuyện: câu xuyên suốt, phiếu giọng, 4 thư, chữ slide, kịch bản, trình bày chính | **Không tự đổi số** | Google Docs, Gemini, Google Slides |

Luật: không vị trí nào làm chính quá 2 việc trong một chặng. Chữ cái A–F là mã người trong phiếu vị trí.

**Quy trình làm việc:**
- Chỉ người làm chính cập nhật cột P–S của sheet RACI (Trạng thái, Bằng chứng, Giờ xong, Ghi chú). Trạng thái chỉ gồm *Chưa bắt đầu / Đang làm / Xong / Trễ / Cắt*. Không ghi "Xong" khi chưa có bằng chứng.
- Ở mỗi cổng (12:00, 16:00, 17:45, 21:00), mỗi vị trí báo một dòng trên Zalo. Kẹt quá 10 phút thì tag RD; chỉ việc chặn cả đội mới tag LEAD. Gọi nhóm lúc 20:00.
- Drive gồm các thư mục `00_Ke_hoach`, `01_Nguon_NASA`, `02_So_lieu`, `03_Noi_dung`, `04_Thiet_ke`, `05_Gui_LEAD`, `06_Am_thanh`, `07_Bang_chung`, `08_Nop_bai`. Tên tệp = mã việc + nội dung, không dấu, không khoảng trắng (ví dụ `N1.3_bang_so_lieu`).

---

## 8. Tiến độ hiện tại

### 8.1. Bộ kế hoạch
- RACI: **10/39 việc Xong**. Checklist: **7/39 việc được tick**.
- Đã có tệp sản phẩm cho: N0.1–N0.4, N1.2 (khung phong bì), N1.3, N1.6, N2.5, N2.7 (bưu thiếp), N3.3.

### 8.2. Repo (đã deploy, chưa nghiệm thu)
[index.html](../index.html) có 6 phần:
1. **Header:** thanh tem nhiệm vụ, bộ lọc All/Moon/Mars, nút **EN|VI**.
2. **`#hero-top`:** hộp tín hiệu Hà Nội, nút công tắc thu sóng, 2 nút CTA.
3. **`#relic-chapters-container`:** 4 chương do JS render (dữ liệu trong `RELIC_DATA`).
4. **`#artemis-station`:** Module 01, Trạm Quyết định 4 vùng, có sơ đồ quỹ đạo bụi.
5. **`#guardian-certificate-section`:** Module 02, khóa cho tới khi chọn vùng ≥2 km. Người chơi chọn 1 trong 3 lời cam kết, nhập biệt danh, rồi xuất PNG hoặc in. Kèm **Góc giáo viên** 15 phút.
6. **Footer:** nguồn NASA, bảng **SI Disclosure**, thông báo tuân thủ.

Checklist nghiệm thu 8 mục trong PRD vẫn để trống `[ ]`.

### 8.3. Repo khác kế hoạch ở đâu
- **Thanh trượt:** dùng năm / khoảng cách / τ / số chuyến, **không dùng** dải khối lượng, lực đẩy, tầm vươn, độ cao ghi trong N0.3 và N1.3.
- **Ch.1:** tập trung vào gương LRRR, không dùng số liệu kết cấu LM và động cơ.
- **Chứng nhận:** repo gộp 4 tem vào **một thẻ** chứng nhận, còn kế hoạch có **2 bưu thiếp** riêng cho Mặt Trăng và Sao Hỏa.
- **Phong bì:** chưa thấy cơ chế "chạm phong bì để mở thư" (N1.2).
- **Repo có mà kế hoạch không có:** nút EN|VI, SI Disclosure, 3 lời cam kết, chi tiết Flight 72 / Neretva Vallis.

---

## 9. Mâu thuẫn và việc cần nhóm chốt

> Danh sách để nhóm **quyết định**, chưa sửa gì trong code hay tài liệu. Hướng xử lý đề xuất: lấy C3/N3.3 làm chuẩn cho số liệu, đồng bộ `data/content.json` và `js/data.js`, và bổ sung vào N3.3 các số repo đang dùng mà N3.3 chưa có.

### 9.1. Số liệu lệch nhau

| # | Số liệu | Nguồn A | Nguồn B |
|---|---|---|---|
| 1 | Số ảnh Surveyor 3 | **6.326**: N3.3 (ĐK), N1.6 | **6.315**: repo (`content.json:127`), Nguon_so_lieu_kich_ban |
| 2 | Khoảng cách Intrepid – Surveyor 3 | ~160 m (538 ft): kịch bản v2/Final | **155 m**: repo, PDF v1 · ~180 m: sổ tay N1.6 |
| 3 | Vùng thứ 2 của Trạm Artemis | **155 m**: kế hoạch, câu lệnh, repo | **225 m**: ghi chú Khuyến nghị NASA 2011 (75 m, 225 m) |
| 4 | Điện Opportunity đầu bão | **645 Wh**: kịch bản v2/Final (sửa theo Soát B6) | **700 Wh**: repo, PDF v1 |
| 5 | Mẫu đất đá Apollo 11 | 34,35 kg: N1.3 | 21,5 kg: N3.3 (ƯV) |
| 6 | Khối lượng LM Apollo 11 | 15.235–16.430 kg: N1.3, N0.3 | ~15.000 kg: N3.3 (ƯV) |
| 7 | Ngày đáp Opportunity | **24/01/2004**: N3.3 (ĐK) | **25/01/2004**: repo (`content.json:206`) |
| 8 | Độ sâu đào của Surveyor 3 | 17,5 cm: N1.6 | 18 cm: N3.3 |
| 9 | Vòng quay cánh Ingenuity | 2.400–2.700 vòng/phút: N2.5 | 2.537 vòng/phút: repo, kịch bản |
| 10 | Tọa độ Surveyor 3 | 3,0°S 23,41°W: N3.3 | 3,01°S 23,42°W: repo |
| 11 | "Trọng lượng Sao Hỏa 0,68 kg" | N3.3 | Lỗi khái niệm: trọng lượng là lực, không đo bằng kg |
| 12 | Số chưa có trong N3.3 | τ/Wh (700/280/120/45/22), 2,56 s, 3,8 cm/năm, 155 m, các vùng 75/225/500/2.000 m | Cần bổ sung nguồn. Con số 645 → 22 Wh hiện lấy từ Space.com và Planetary Society, chưa có nguồn NASA |

### 9.2. Cốt truyện
1. **Ai viết lá thư thứ 5:** người chơi (v2), "một thiết bị Artemis" (VI/EN) hay **DUSTER** (Final_v2)?
2. **DUSTER là thật hay hư cấu:** `Nguon_so_lieu_kich_ban.md` ghi thiết bị Artemis là hư cấu, còn Final_v2 nói đó là thiết bị NASA thật đã chọn cho Artemis IV. RD cần kiểm.
3. **Tên sứ mệnh:** "Artemis", "Artemis IV" hay "Artemis III" (bản Soát gợi ý).
4. **Cách Ingenuity gãy cánh:** "gãy cả bốn cánh" (VI, v2) hay "gãy/hỏng chóp cánh quạt" (Final_v2)?
5. **Độ tuổi:** Góc giáo viên ghi 11–18 tuổi (THCS và THPT), brief ghi 11–15 tuổi (THCS).
6. **Tên "Chương 5":** brief ghi "Không làm chương thứ 5", nhưng kịch bản vẫn đặt tên "CHƯƠNG 5" cho Trạm Artemis, dễ gây hiểu lầm.
7. **Lỗi B2 và B3 chưa sửa ở mọi bản:** tiền đề "máy thu nghe tín hiệu" mâu thuẫn với lời LRRR "không có pin, không có radio"; các thư chưa có khung "thư tưởng tượng". Thiếu khung này thì có nguy cơ vi phạm luật "không viết như máy gửi chữ thật".
8. **Ngôn ngữ:** thư, slide và README trong kế hoạch là tiếng Anh, khảo sát lại đề xuất tiếng Việt, còn repo có nút EN|VI. Chưa chốt ngôn ngữ chính.

### 9.3. Kế hoạch
1. RACI và Checklist lệch nhau: RACI ghi N1.6, N2.2, N2.5 Xong, nhưng checklist chưa tick.
2. N0.1 ghi "Xong" nhưng sheet Nguồn NASA vẫn có 0 nguồn đã đối chiếu Resources (cả 15 nguồn đều "Ứng viên"), nên luật dữ liệu **chưa đạt**.
3. N2.2 thiếu bằng chứng; ô kiểm bằng chứng của N2.4 bị lỗi `#REF!`.
4. N0.2 ghi phiếu giọng "4 cỗ máy", còn P0.2b ghi "5 nhân vật".
5. Route: N1.1 ghi `#notebook`, còn P2.1 ghi `#notebook-ch1..4`.
6. Câu lệnh P3.2 và P0.4 dùng Gemini, nhưng bảng công cụ của SW và LEAD không có Gemini.
7. Phiên bản: hướng dẫn ghi v5, phiếu vị trí ghi v5.1. Deploy: kế hoạch ghi GitHub Pages, thực tế dùng Vercel.
8. Thiết bị Ch.1: N0.3 và N1.3 chọn **LM Apollo 11**, còn kịch bản và repo dùng **LRRR**.

## 10. Nguồn tham khảo

**Tệp gốc:** `C:\Users\Admin\Downloads\File kế hoạch v5\` (xem §2).

**Link NASA chính:**
- NSSDCA Master Catalog: https://nssdc.gsfc.nasa.gov/nmc/ · Apollo 11: https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo11.html
- LROC Apollo 11: https://www.lroc.asu.edu/featured_sites/59
- Apollo by the Numbers (SP-4029): https://www.nasa.gov/wp-content/uploads/2023/04/sp-4029.pdf
- Apollo Lunar Surface Journal: https://www.nasa.gov/history/alsj/a11/a11.html
- Surveyor 3: https://science.nasa.gov/mission/surveyor-3/ · LPI Surveyor: https://www.lpi.usra.edu/lunar/missions/surveyor/
- MER Spirit & Opportunity: https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/
- JPL PIA26814 (quãng đường rover): https://www.jpl.nasa.gov/images/pia26814-comparing-off-world-rover-driving-distances/ · PIA05755: https://photojournal.jpl.nasa.gov/catalog/PIA05755
- Ingenuity: https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/ · Flight Log: https://science.nasa.gov/wp-content/uploads/2024/06/ingenuity-helicopter-flight-log.pdf
- Khuyến nghị bảo vệ di sản Mặt Trăng (NASA 2011): `protecting_lunar_heritage_report_072011.pdf`
- Artemis IV (DUSTER): https://www.nasa.gov/news-release/nasa-selects-2-instruments-for-artemis-iv-lunar-surface-science/
