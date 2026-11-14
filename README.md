# LUNAMARIS: Letters Across the Silent Seas 🛰️🌕🔴

**Cuộc thi:** 2026 NASA International Space Apps Challenge  
**Đề tài:** *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*  
**Trạm neo tọa độ địa phương:** Hanoi Ground Receiving Station, Vietnam (`21.0285° N, 105.8542° E`)  
**Repository:** [Lunamaris_NASA_Hackathon_2026](https://github.com/TrongVu249/Lunamaris_NASA_Hackathon_2026.git)  
**Live Demo:** 🚀 [lunamaris.vercel.app](https://lunamaris.vercel.app)

---

## 1. Tổng quan Dự án (Project Overview)

**LUNAMARIS: Letters Across the Silent Seas** (Lunamaris - mang ý nghĩa *"Những Biển Mặt Trăng"*) là ứng dụng web Scrollytelling tương tác đa ngôn ngữ (`EN | VI`), kết hợp **Mô phỏng Vật lý & Đo xa bằng Đồ họa SVG Động (Interactive Inline SVG Telemetry)** với **Kiến trúc Kể chuyện Hai Giọng (Dual-Voice Storytelling)**:

1. **`[📡 The Machine's Pulse]`** *(Nhãn nhận thức luận: `NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY`)*: Những bức thư ngôi thứ nhất giàu cảm xúc viết dưới dạng bưu thiếp vũ trụ gửi về Trạm Mặt đất Hà Nội.
2. **`[🏛️ Archaeologist & Science Dossier]`** *(Nhãn nhận thức luận: `VERIFIED SCIENTIFIC & LEGAL RECORD`)*: Hồ sơ khoa học, trạng thái vật liệu và luật bảo tồn di sản không gian đã được kiểm chứng từ tài liệu gốc của NASA (NSSDCA, ILRS, NASA SP-284, Public Law 116-275).

Dự án còn tích hợp 2 Module thực chiến độc lập:
- **Module 01: Trạm Quyết định Bãi đáp Sứ mệnh Artemis (Vacuum Ballistics Simulator)**: Mô phỏng động học đạn đạo bụi regolith trong chân không $1/6g$ và kiểm chứng bán kính an toàn $\ge 2.0\text{ km}$.
- **Module 02: Thẻ Chứng nhận Space Heritage Guardian (Zero-PII Canvas Exporter)**: Cấp thẻ chứng nhận bảo vệ di sản không gian tạo trực tiếp 100% bằng HTML5 Canvas trên trình duyệt (không lưu trữ PII).
- **Góc Giáo viên STEM 15 Phút**: Kế hoạch bài giảng tích hợp số liệu đo xa thực tế dành cho học sinh 11–15 tuổi.

---

## 2. Cấu trúc Thư mục Mô-đun (Modular Architecture)

```text
Lunamaris_NASA_Hackathon_2026/
├── index.html                           # Giao diện "quyển sách": bìa, mục lục, 4 chương, Artemis, Guardian, Giáo viên, Nguồn
├── css/
│   └── styles.css                       # Hệ thống thiết kế NASA Space Apps Palette, khung sách & hiệu ứng lật trang, Keyframes SVG
├── data/
│   └── content.json                     # Dữ liệu chuẩn hóa gốc (Song ngữ EN/VI) đối chiếu NASA Open Data
├── js/
│   ├── data.js                          # Mô-đun nạp dữ liệu Zero-CORS (LUNAMARIS_DATA & Từ điển UI_I18N)
│   ├── svg-engine.js                    # Công thức Toán học & Đồ họa Interactive SVG cho 4 Chương Di vật
│   ├── decision-station.js              # Sơ đồ Mặt cắt Đạn đạo Chân không & 4 Vùng Bãi đáp Artemis
│   ├── certificate.js                   # Bộ tạo Thẻ Chứng nhận Space Heritage Guardian (Zero-PII Canvas PNG)
│   ├── app.js                           # Điều phối State, Mission Stamps, Bộ lọc Hành tinh, Chuyển đổi EN/VI
│   └── book.js                          # Bộ máy lật trang: trang mới vào từ phải, vuốt/phím ←→, hash #ch1…, chế độ đọc cuộn
├── types/
│   └── dataset.types.ts                 # Kiểu dữ liệu TypeScript chuẩn hóa khớp 1:1 với NASA Open Data
├── docs/
│   ├── CONTEXT_DU_AN.md                 # Tóm tắt context dự án (kế hoạch, cốt truyện, số liệu, mâu thuẫn cần chốt)
│   └── dac_ta_ky_thuat_lunamaris.md     # Tài liệu Đặc tả Kỹ thuật & Sản phẩm (PRD Chi tiết)
├── Huong_Dan_Lay_Nguon_Du_Lieu_NASA_Lunamaris.docx # Hướng dẫn khai thác tài liệu & ảnh gốc NASA
├── .vercelignore                        # Loại tài liệu nội bộ khỏi bản deploy Vercel
└── README.md                            # Tài liệu hướng dẫn dự án
```

> **Chạy ngay không cần cài đặt (Zero-CORS Architecture):** Bạn có thể nhấp đúp mở trực tiếp file `index.html` trên bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Safari) hoặc triển khai thẳng lên GitHub Pages / Vercel / Netlify mà không cần Node.js build step.

### Bản triển khai trên Vercel

Website đã được triển khai tại **https://lunamaris.vercel.app**. Để cập nhật bản production sau khi chỉnh sửa:

```bash
npx vercel deploy --prod
```

> Các tài liệu nội bộ (`*.docx`, `docs/`, `types/`, `.deepeval/`) được loại khỏi bản deploy qua file `.vercelignore`.

### Chạy qua Local HTTP Server (Tùy chọn)

```bash
# Python 3
python -m http.server 8000

# Hoặc Node.js npx
npx serve .
```
Truy cập: `http://localhost:8000`

---

## 3. Tóm tắt 4 Chương Di vật & Mô hình Toán học

| Chương | Thiết bị & Mã COSPAR | Biến điều khiển Thanh trượt | Công thức Vật lý & Trạng thái Đích |
| :--- | :--- | :--- | :--- |
| **01** | **Apollo 11 Eagle & LRRR**<br>`1969-059C` (Mặt Trăng) | Năm quan trắc $Y \in [1969, 2026]$ | $\Delta t = Y - 1969$ năm<br>$\Delta d = \Delta t \times 3.8\text{ cm/năm}$ $\rightarrow$ **`+216.6 cm (2.17 m)`** tại năm 2026. Khứ hồi laser: `2.56 s`. |
| **02** | **Surveyor 3 & Apollo 12**<br>`1967-035A` / `1969-099C` | Khoảng cách đáp $D \in [50, 2500]\text{ m}$ | Tại mốc lịch sử **`155 m`** (LROC; tài liệu 1969 ghi `160–180 m`): Bão cát siêu thanh $v = 300\text{–}2000\text{ m/s}$ làm rỗ kính và nhuộm nâu sơn trắng (NASA SP-284). |
| **03** | **Opportunity Rover (MER-B)**<br>`2003-032A` (Sao Hỏa) | Độ mờ khí quyển $\tau \in [1.0, 10.8]$ | Nội suy tuyến tính từng đoạn qua 5 mốc JPL `[(1.0, 700), (3.5, 280), (5.5, 120), (8.5, 45), (10.8, 22)]` $\rightarrow$ **`22 Wh/sol`** tại Sol 5111 ($\tau = 10.8$). |
| **04** | **Ingenuity Mars Helicopter**<br>`2020-052B` (Sao Hỏa) | Chuyến bay $F \in [1, 72]$ | Quay đồng trục `2,537 RPM` ($F < 72$). Tại **`Flight 72`** (Sol 1036): Quãng đường **`17.0 km`**, `128.8 min`, gãy đầu cánh quạt và tái sinh thành trạm thời tiết tĩnh `~20 năm`. |

---

## 4. Tuân thủ Quy tắc Pháp lý NASA Space Apps 2026

1. **Không sử dụng Logo NASA:** Tuyệt đối không hiển thị logo "Meatball" hay "Worm" của NASA trên giao diện web và thẻ chứng nhận. Hệ thống sử dụng biểu tượng vector SVG tự tạo theo đúng quy định nhãn hiệu của NASA.
2. **Bảo vệ Quyền riêng tư Dưới 18 tuổi (Zero-PII):** Thẻ chứng nhận *Space Heritage Guardian* được vẽ và tải xuống hoàn toàn cục bộ trên trình duyệt bằng HTML5 Canvas, không thu thập, lưu trữ hay truyền đi bất kỳ thông tin cá nhân nào.
3. **Super Intelligence (SI) Disclosure 2026:** Hiển thị minh bạch công cụ hỗ trợ và quy trình kiểm chứng thủ công đối chiếu tài liệu gốc (Human Verification Gate) tại chân trang và cửa sổ Modal.
4. **Nhãn Phân định Nhận thức luận (Epistemic Labeling):** Phân định rạch ròi giữa cảm xúc nghệ thuật văn học (`NARRATIVE INTERPRETATION`) và cứ liệu khoa học/pháp lý (`VERIFIED SCIENTIFIC & LEGAL RECORD`).
