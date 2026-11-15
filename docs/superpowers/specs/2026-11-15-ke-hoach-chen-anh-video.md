# KẾ HOẠCH CHÈN ẢNH THẬT & VIDEO THẬT VÀO LUNAMARIS

- Ngày lập: 2026-11-15 · Trạng thái: **ĐÃ TRIỂN KHAI + NGHIỆM THU** (dữ liệu nhóm cung cấp từ `D:\dữ liệu thực cho nasa`, ảnh chép vào `assets/media/`, video nhúng YouTube).
- Cơ chế gốc đã test: `demo/mockup-square-random-modal.html` (ô vuông → cửa sổ nhỏ chứa ảnh + video ngẫu nhiên).
- Biến thể thư viện trong popup đã test: `demo/mockup-gallery-popup.html`.
- Cách dùng file này ở lần sau: nhóm điền dữ liệu vào **mục 6**, đưa lại file cho Qoder → Qoder làm theo **mục 7** và tự kiểm tra bằng **mục 8**. Không cần giải thích lại từ đầu.

---

## 1. Cơ chế chung (đã chốt qua demo)

Một **trigger nhỏ** (chip / thumbnail) đặt tại nơi liên quan → bấm vào → mở **cửa sổ modal nhỏ** chứa ảnh và video của đúng thiết bị đó. Hành vi chuẩn (giống demo, đã verify trong trình duyệt):

- Bấm trigger → modal mở, video tự phát **tắt tiếng** (có nút controls để bật tiếng), ảnh nằm dưới video.
- Đóng bằng: nút ✕, phím Esc, hoặc bấm ra nền tối. Khi đóng, video **dừng hẳn** (xóa khỏi DOM) — không chạy ngầm.
- Caption + credit nguồn luôn hiển thị dưới media, song ngữ VI/EN theo ngôn ngữ hiện tại của web.
- Nếu một thiết bị có nhiều hơn 1 ảnh/video: có nút ←/→ và bộ đếm "1 / 2" trong modal.
- Màu sắc modal: theo theme tối của LUNAMARIS (nền panel `#1E2030`, viền `rgba(255,255,255,0.12)`, điểm nhấn vàng `#E7F434`) cho đồng bộ với web. *Nếu nhóm muốn cửa sổ trắng như ảnh tham khảo thì chỉ đổi 2 biến màu ở `.media-modal` — ghi chú này để lần sau khỏi hỏi lại.*

## 2. Hành trình người dùng đã trải nghiệm & vị trí chèn

Các màn hiện có, theo thứ tự người dùng đi qua:

1. `start` — màn chào "Bật thu sóng".
2. `story-intro` và các cầu truyện `story-to-ch2/3/4/artemis`, `story-ending` — slide chữ chạm-để-sang, chữ chiếm nửa dưới màn hình.
3. `signals` — bản đồ SVG 4 chốt tín hiệu (mỗi chốt = 1 thiết bị, là thẻ `<a class="map-pin">`).
4. `ch1..ch4` chế độ **game** — đầu chương (số chương + huy hiệu Mặt Trăng/Sao Hỏa + tên thiết bị) → câu dẫn của Columbina → trò chơi SVG.
5. `ch1..ch4` chế độ **letter** — con dấu niêm, nhãn nhận thức luận, dòng bưu chính, **bức thư** của thiết bị, **thẻ luật**, nút đi tiếp.
6. `artemis` — game bản đồ 4 vùng.
7. `guardian` — thẻ Space Heritage Guardian + lời thề + tải PNG.
8. `teacher`, `sources` — trang kết và trang nguồn NASA / khai báo AI.
9. **Popup Hồ sơ Khoa học** (`dossier-sheet`) — mở được từ mọi màn: cột trái là bộ mô phỏng thiết bị (ảnh nền mờ + credit), cột phải là hồ sơ kiểm chứng 3 mục.

### Vị trí chèn chốt (BẮT BUỘC — đủ cho cả 4 thiết bị, mỗi thiết bị ≥ 1 ảnh + 1 video)

**VỊ TRÍ 1 — "Tái bút: ảnh đính kèm thư" ở màn letter.**
- Đặt ngay sau `<blockquote class="letter">`, trước thẻ luật, trong `.letter-body`.
- Tạo hình: một **tấm ảnh kiểu polaroid kẹp vào lá thư** — khung viền đứt, nghiêng nhẹ ~-1,5 độ, có miếng "băng dính" nhỏ phía trên; bên trong là thumbnail ảnh thật; nếu thiết bị có video thì thêm nút ▶ đè giữa ảnh. Dưới tấm ảnh là dòng chữ nhỏ kiểu tái bút: "Tái bút: Columbina đính kèm một tấm ảnh thật và một đoạn phim." (EN: "P.S. — Columbina enclosed a real photo and a film clip.").
- Vì sao chọn: màn thư là "giọng nói" của thiết bị, nhịp đọc chậm, có khoảng trống; ảnh đính kèm thư là hình ảnh rất tự nhiên của thư tín, đẹp và đúng chất kể chuyện; không cản thao tác nào hiện có.
- Anchor code: `letterHtml()` trong `js/app.js` (khối `letter-body`, giữa dòng letter và rule-stamp).

**VỊ TRÍ 2 — Mục "Bằng chứng hình ảnh" trong popup Hồ sơ Khoa học.**
- Đặt ở **đầu cột trái** của popup (ngay trên bộ mô phỏng thiết bị), gồm: tiêu đề mục + dải thumbnail cuộn ngang (mỗi thumbnail 168px: ảnh thật, và thumbnail video có nút ▶), bấm thumbnail → mở modal của cơ chế chung.
- Vì sao chọn: popup là nơi chứa thông tin đã kiểm chứng và credit nguồn — ảnh/video thật nằm cạnh đó là đúng ngữ cảnh "bằng chứng"; popup mở được từ mọi màn nên người dùng luôn với tới được; không chiếm chỗ màn hình chính.
- Anchor code: `renderDossierSheet()` / `dossierHtml()` trong `js/app.js` (khối `dossier-grid`).
- Layout mục này lấy nguyên từ `demo/mockup-gallery-popup.html`.

### Vị trí bổ sung (TÙY CHỌN — làm khi nhóm thấy cần, không bắt buộc)

**VỊ TRÍ 3 — Huy hiệu camera nhỏ trên chốt bản đồ `signals`.** Một icon 📷 cỡ 14px ở góc chốt; bấm phải chặn chuyển trang (`preventDefault` + `stopPropagation` vì chốt đang là thẻ `<a>`) rồi mở modal. Rủi ro: dễ bấm nhầm khi chọn chương → chỉ làm nếu nhóm muốn "nhá hàng" sớm. Anchor: khối tạo `map-pin` trong `js/app.js` (~dòng 327–331).

**VỊ TRÍ 4 — Slide truyện nơi thiết bị lần đầu xuất hiện.** `story.js` đã hỗ trợ ảnh nền tùy chọn theo slide, nhưng vùng chạm để sang trang phủ gần hết màn hình nên chip rất dễ bấm nhầm. **Khuyến nghị: KHÔNG làm**, trừ khi nhóm chấp nhận chip chỉ hiện ở góc trên phải và chặn lan truyền chạm.

**VỊ TRÍ 5 — Mục "Thư viện ảnh thật" ở trang `sources`.** Liệt kê credit đầy đủ của mọi ảnh/video (mỗi dòng: thumbnail nhỏ + caption + link nguồn). Rẻ tiền, tăng độ tin cậy với giám khảo. Anchor: scene `sources` trong `js/app.js`.

> Ghi chú quyết định: Vị trí 1 và 2 dùng **chung một nguồn dữ liệu** (mục 6) và chung một modal — thêm dữ liệu một lần, hiện ra ở cả hai nơi.

## 3. Ánh xạ thiết bị ↔ chương (để điền dữ liệu đúng chỗ)

| ID trong `data.js` | Chương | Thiên thể | Tên |
|---|---|---|---|
| `apollo11-lrrr` | 01 | Mặt Trăng | Tầng hạ cánh Eagle & gương LRRR |
| `surveyor-3` | 02 | Mặt Trăng | Surveyor 3 |
| `opportunity-rover` | 03 | Sao Hỏa | Xe tự hành Opportunity |
| `ingenuity-helicopter` | 04 | Sao Hỏa | Trực thăng Ingenuity |

## 4. Schema dữ liệu (thêm vào ô `media` hiện có của từng thiết bị trong `js/data.js`)

```jsonc
"media": {
  "primary_image_url": "...",        // GIỮ NGUYÊN như hiện tại
  "image_credit": "...",             // GIỮ NGUYÊN
  "gallery": {                       // ← MỚI
    "photos": [
      { "url": "...", "caption_vi": "...", "caption_en": "...", "credit": "..." }
    ],
    "videos": [
      { "url": "...", "poster": "...", "caption_vi": "...", "caption_en": "...", "credit": "..." }
    ]
  }
}
```

Quy tắc: mỗi thiết bị `photos.length >= 1` và `videos.length >= 1`. Mục đầu tiên của mỗi mảng là mục hiển thị ở Vị trí 1 (polaroid) và thumbnail đầu ở Vị trí 2.

## 5. Những chỗ sẽ phải chạm vào khi triển khai (để lần sau mở file là thấy ngay)

- `js/data.js` — thêm `gallery` vào `media` của 4 artifacts (mỗi artifact một khối `media`, riêng Ingenuity quanh dòng 280–285).
- `js/app.js` — `letterHtml()` (~dòng 675–702): chèn khối polaroid; `renderDossierSheet()`/`dossierHtml()` (~dòng 582–606 và 815–822): chèn mục gallery; thêm hàm mới `mediaModalHtml()` + `openMediaModal(art)` + `closeMediaModal()` (copy hành vi từ demo 2); bind sự kiện chip/thumbnail.
- `css/styles.css` — thêm class mới: `.letter-enclosure` (polaroid), `.gallery-sec`, `.gallery-strip`, `.gallery-thumb`, `.media-modal`… (CSS có sẵn trong 2 file demo, chỉ việc bê sang và đổi màu modal sang theme tối).
- `js/flow-data.js` — thêm khóa i18n vào `UI_I18N` cả 2 khối `en` (~dòng 227–275) và `vi` (~dòng 276–330): `enclosure_ps`, `enclosure_hint`, `gallery_title`, `gallery_sub`, `media_modal_title`, `label_photo`, `label_video`.
- `index.html` — KHÔNG bắt buộc: modal sinh bằng JS như demo; nếu muốn tĩnh thì thêm 1 khối div cạnh `#dossier-sheet` (~dòng 408).
- `assets/media/<id>/` — chỉ tạo nếu nhóm tải file về máy thay vì hotlink (xem mục 9).

## 6. DỮ LIỆU THẬT — ĐÃ ĐIỀN & ĐÃ DÙNG (nguồn: nhóm cung cấp, 2026-11-15)

Ảnh chép vào `assets/media/<id>/`; video là link YouTube nhóm đưa (nhúng qua youtube-nocookie).
Dữ liệu này đang nằm trong `js/data.js` (khối `media.gallery` của từng thiết bị).

```jsonc
{
  "apollo11-lrrr": {
    "photos": [
      { "url": "assets/media/apollo11-lrrr/photo-01.jpg",  "credit": "Ảnh: NASA / Apollo 11 (AS11-40-5948)." },   // mảng gương LRRR + dấu giày
      { "url": "assets/media/apollo11-lrrr/photo-02.webp", "credit": "Ảnh: NASA / Apollo 11." }                    // tầng Eagle nhìn từ khoang Columbia
    ],
    "videos": [
      { "youtube_id": "iwxrNurAuu8", "credit": "Video: JILA Science (YouTube)." }                                  // "Apollo 11's last working experiment on the moon"
    ]
  },
  "surveyor-3": {
    "photos": [
      { "url": "assets/media/surveyor-3/photo-01.jpg", "credit": "Ảnh: NASA / Apollo 12 (AS12-48-7133)." }          // Conrad bên Surveyor 3, LM Intrepid chân trời
    ],
    "videos": [
      { "youtube_id": "qQ0UiKTNBo0", "start": 60, "credit": "Video: APOLLO Ai Videos (YouTube)." }                  // "APOLLO 12 - The Survey of Surveyor3", bắt đầu ở 1:00
    ]
  },
  "opportunity-rover": {
    "photos": [
      { "url": "assets/media/opportunity-rover/photo-01.webp", "credit": "Đồ họa: NASA / JPL-Caltech (cập nhật 04/02/2019)." }  // infographic Spirit & Opportunity by the numbers
    ],
    "videos": [
      { "youtube_id": "CubXtcQLma0", "credit": "Video: SciNews (YouTube)." }                                        // "Opportunity Rover On Mars (2004 - 2019)"
    ]
  },
  "ingenuity-helicopter": {
    "photos": [
      { "url": "assets/media/ingenuity-helicopter/photo-01.jpg", "credit": "Ảnh: NASA / JPL-Caltech." }             // Ingenuity giữa đáy hố Jezero
    ],
    "videos": [
      { "youtube_id": "0RQWv1ybsjM", "credit": "Video: NASA Jet Propulsion Laboratory (YouTube)." }                 // "NASA's Mars Helicopter, Ingenuity (UHD Trailer)"
    ]
  }
}
```

Ghi chú vận hành: caption song ngữ đầy đủ nằm trong `js/data.js` (không lặp lại ở đây cho khỏi lệch bản).
Muốn thêm vị trí tùy chọn 3/4/5 thì ghi thêm dòng `"extra_slots": ["signals", "sources"]` vào khối tương ứng rồi làm theo mục 7.

## 7. Thứ tự triển khai ở lần sau (Qoder làm theo đúng thứ tự này)

1. Đọc file kế hoạch bản đã điền → chuẩn hóa dữ liệu vào `js/data.js` theo schema mục 4; kiểm tra từng URL bằng request HEAD (hỏng thì báo nhóm, không tự thay).
2. Thêm khóa i18n (mục 5) vào cả hai ngôn ngữ.
3. Bê modal + CSS từ `demo/mockup-square-random-modal.html` vào project, đổi màu sang theme tối, nối dữ liệu theo `art.id`.
4. Chèn trigger Vị trí 1 vào `letterHtml()`; chèn gallery Vị trí 2 vào dossier; bind sự kiện; đảm bảo đóng modal thì video dừng.
5. Nếu có `extra_slots`: làm lần lượt vị trí 3 → 5.
6. Chạy checklist mục 8 trên trình duyệt (đi đủ 4 chương cả hai ngôn ngữ) rồi mới báo hoàn thành.

## 8. Checklist nghiệm thu

- Cả 4 chương: màn letter có polaroid; bấm mở modal thấy đúng ảnh + video của thiết bị đó; đóng bằng ✕ / Esc / nền tối; video dừng hẳn khi đóng.
- Popup Hồ sơ Khoa học của cả 4 chương có mục "Bằng chứng hình ảnh" với đủ thumbnail; thumbnail video có nút ▶.
- Đổi ngôn ngữ VI ↔ EN: caption, nhãn "Ảnh/Video", dòng tái bút đổi theo; credit luôn hiện.
- Mobile ~390px: polaroid không vỡ bố cục thư; dải thumbnail cuộn ngang được; modal không tràn màn hình.
- Console không lỗi; mọi `<img>` có `alt`; không autoplay có tiếng.
- Nếu dùng file local: tắt mạng thử lại toàn bộ vẫn chạy.

## 9. Checklist chuẩn bị media cho nhóm (gửi kèm người sưu tầm ảnh/video)

- Ảnh: JPG/WebP, chiều ngang ≥ 1280px, nén còn ≤ ~400KB/ảnh; đặt tên `assets/media/<id>/photo-01.jpg` nếu tải về.
- Video: MP4 H.264, 720p, ≤ ~12MB nếu nhúng local; nếu giữ link NASA thì dùng bản `~mobile.mp4`/`~small.mp4` cho nhẹ.
- Mỗi mục BẮT BUỘC có `credit` (ví dụ "NASA / NSSDCA Photo ID AS11-40-5948") — đồ NASA là public domain nhưng vẫn phải ghi nguồn theo chuẩn hồ sơ khoa học của dự án.
- Caption viết kiểu kể chuyện cho học sinh (1 câu VI + 1 câu EN), không viết kiểu chú thích kỹ thuật khô khan.
- Ưu tiên nguồn: NASA Image and Video Library (images-api.nasa.gov) → NSSDCA → archive.org; tránh nguồn có bản quyền.
