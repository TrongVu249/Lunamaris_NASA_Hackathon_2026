# Kế hoạch chèn ảnh thật & video thật cho 4 thiết bị

- Ngày lập: 2026-11-15
- Trạng thái: **ĐÃ TRIỂN KHAI** trên branch `add_realinfo` (cập nhật dữ liệu Surveyor 3 mới nhất)
- Nguyên tắc chốt với nhóm: **giữ nguyên web hiện tại**, chỉ thêm; cơ chế đã duyệt = **trigger nhỏ → popup/modal tối màu chứa ảnh hoặc video** (đã demo và nghiệm thu qua `demo/mockup-square-random-modal.html` và `demo/mockup-gallery-popup.html`).

---

## 1. Mục tiêu

Khảo sát cho thấy người dùng muốn xem **ảnh thật và video thật**. Nhóm cung cấp tối thiểu **1 ảnh + 1 video cho mỗi thiết bị** trong 4 thiết bị:

1. Apollo 11 LRRR (`apollo11-lrrr`)
2. Surveyor 3 (`surveyor-3`)
3. Opportunity Rover (`opportunity-rover`)
4. Ingenuity Helicopter (`ingenuity-helicopter`)

Yêu cầu: chèn vào web ở vị trí phù hợp, đẹp mắt, **không phá** bố cục/luồng chơi/i18n hiện có.

## 2. Cơ chế hiển thị (đã chốt)

- **Trigger**: nút nhỏ gắn `data-media-open="<artId>" data-media-idx="<i>"`.
- **Modal dùng chung** `#media-modal` (nền tối, z-index 95):
  - Ảnh → thẻ `<img>` + caption + credit.
  - Video → YouTube embed `https://www.youtube-nocookie.com/embed/<id>?autoplay=1&mute=1&rel=0&playsinline=1` (nếu có `start` thì thêm `&start=<giây>`).
- Đóng bằng ✕ / Esc / bấm nền; khi đóng **xoá innerHTML** để dừng phát video.
- Điều hướng ←/→ giữa các mục; có bộ đếm `(i/n)`.
- Esc được guard (`&& !state.mediaModalOpen`) để không đóng nhầm dossier/SI modal bên dưới.

## 3. Vị trí chèn (đã duyệt)

### Vị trí 1 — “Tái bút” polaroid trong màn hình lá thư (ch1–ch4)

- Ở letter view, ngay sau `<blockquote class="letter">`, thêm khối `.letter-enclosure`: tấm ảnh polaroid kem, băng dính vàng, nghiêng -1.5°, dòng tái bút theo giọng Columbina + hint.
- Bấm polaroid → mở modal tại mục đầu tiên của gallery thiết bị đó.
- Lý do: hợp mạch truyện (“Columbina đính kèm một tấm ảnh thật”), đúng lúc người đọc vừa chơi xong và nhận thư.

### Vị trí 2 — “Bằng chứng hình ảnh” trong popup Hồ sơ Khoa học

- Trong `#dossier-sheet`, bọc cột trái bằng `.dossier-left`; trên cùng là khối `.gallery-sec`: dải thumbnail ngang (ảnh dùng file local; video dùng `https://i.ytimg.com/vi/<id>/hqdefault.jpg`, có `onerror` fallback về ảnh đầu tiên).
- Mỗi thumb có nhãn loại (Ảnh/Video) và icon ▶ cho video. Bấm thumb → mở modal đúng mục.
- Lý do: hồ sơ là nơi người dùng tìm “thông tin đã kiểm chứng”, gallery nằm cạnh khối sự thật khoa học là tự nhiên nhất.

### Các vị trí khác (không triển khai / tuỳ chọn)

- Vị trí 3 (badge nhỏ trên pin ở màn signals): tuỳ chọn, chưa làm — tránh rối màn điều hướng.
- Vị trí 4 (chèn vào story slides): **KHÔNG khuyến nghị** — phá nhịp kể chuyện.
- Vị trí 5 (mục sources ghi credit): credit đã nằm trong caption modal, không cần thêm.

## 4. Cấu trúc dữ liệu (js/data.js)

Mỗi artifact trong 4 thiết bị có thêm khối `media.gallery`:

```json
"gallery": {
  "photos": [
    { "url": "assets/media/<id>/photo-01.jpg",
      "caption_vi": "...", "caption_en": "...",
      "credit": "Ảnh: NASA / ..." }
  ],
  "videos": [
    { "kind": "youtube", "youtube_id": "...", "start": 0,
      "caption_vi": "...", "caption_en": "...",
      "credit": "Video: ... (YouTube)." }
  ]
}
```

## 5. i18n (js/flow-data.js)

Thêm vào `extra.en` và `extra.vi` các key:

| Key | VI | EN |
|---|---|---|
| `enclosure_ps` | Tái bút: Columbina đính kèm lá thư này một tấm ảnh thật và một đoạn phim. | P.S. — Columbina enclosed a real photo and a film clip with this letter. |
| `enclosure_hint` | Bấm vào tấm ảnh để xem | Tap the photo to view |
| `gallery_title` | Bằng chứng hình ảnh | Visual evidence |
| `gallery_sub` | Ảnh thật & phim tư liệu — bấm để xem | Real photos & archival film — tap to open |
| `media_modal_title` | Hồ sơ hình ảnh | Media file |
| `label_photo` | Ảnh | Photo |
| `label_video` | Video | Video |

## 6. Dữ liệu thực tế đã dùng (cập nhật 2026-11-15)

Nguồn: folder nhóm `D:\dữ liệu thực cho nasa` → copy vào `assets/media/<id>/`.

### apollo11-lrrr (2 ảnh + 1 video)
- `photo-01.jpg` — ảnh Apollo 11 từ folder “Apollo 11 + LRRR”.
- `photo-02.webp` — ảnh thứ hai cùng folder.
- Video: YouTube `iwxrNurAuu8` — JILA Science (APOLLO 11: THE LRRR / laser ranging). Credit: “Video: JILA Science (YouTube).”

### surveyor-3 (1 ảnh + 1 video) — DỮ LIỆU MỚI
- `photo-01.jpg` — ảnh Apollo 12 thăm Surveyor 3 (AS12-48-7133, Pete Conrad bên tàu Surveyor 3).
- Video: YouTube `Qhgq19u28Fk` — VideoFromSpace, phim tư liệu chuyến khảo sát Surveyor 3 của phi hành đoàn Apollo 12 (không dùng `start`). Credit: “Video: VideoFromSpace (YouTube).”

### opportunity-rover (1 ảnh + 1 video)
- `photo-01.webp` — đồ họa NASA/JPL-Caltech (cập nhật 04/02/2019) từ folder “oppoturnity”.
- Video: YouTube `CubXtcQLma0` — SciNews (Opportunity rover). Credit: “Video: SciNews (YouTube).”

### ingenuity-helicopter (1 ảnh + 1 video)
- `photo-01.jpg` — ảnh Ingenuity từ folder “Ingenuity”.
- Video: YouTube `0RQWv1ybsjM` — NASA JPL (Ingenuity first flight). Credit: “Video: NASA JPL (YouTube).”

Tất cả YouTube ID đã kiểm tra qua oembed (title + channel hợp lệ). Ảnh local đã mở xem để viết caption/credit chính xác.

## 7. Các file đã sửa

| File | Thay đổi |
|---|---|
| `assets/media/<id>/` | 5 ảnh local mới (apollo ×2, surveyor, opportunity, ingenuity) |
| `js/data.js` | thêm `gallery` vào `media` của 4 artifact |
| `js/flow-data.js` | thêm 7 key i18n × 2 ngôn ngữ |
| `js/app.js` | state modal; `enclosureHtml()` trong letter; `.dossier-left` + `galleryHtml()` trong dossier; bộ hàm modal (`ensureMediaModal/openMediaModal/renderMediaModal/stepMediaModal/closeMediaModal`); delegated click `[data-media-open]`; keydown Esc/←/→; guard Esc cho dossier & SI; đóng modal khi hashchange; re-render modal khi đổi ngôn ngữ |
| `css/styles.css` | block cuối file: `.letter-enclosure` (polaroid + băng dính), `.gallery-sec/.gallery-strip/.gallery-thumb`, `.media-modal*` (nền tối, iframe 16/9), reduced-motion |
| `js/book.js` | `dialogOpen()` nhận biết `#media-modal` đang mở → phím ←/→ không lật trang truyện khi đang xem ảnh/video (fix phát hiện lúc nghiệm thu) |

## 8. Checklist nghiệm thu

- [x] Ch1–Ch4: letter view có polaroid “Tái bút”; bấm mở modal đúng thiết bị (ch1 3 mục, ch2/ch3/ch4 2 mục; video đúng ID: iwxrNurAuu8 / Qhgq19u28Fk / CubXtcQLma0 / 0RQWv1ybsjM).
- [x] Modal: ảnh hiển thị, video phát (tự tắt tiếng), bộ đếm `(i/n)`, ←/→ chuyển mục, hash trang không đổi khi đang mở modal.
- [x] Đóng modal bằng ✕ / Esc / nền → iframe bị xoá (video dừng).
- [x] Dossier: khối “Bằng chứng hình ảnh” ở đầu cột trái, thumb video có ▶, bấm mở modal.
- [x] Esc khi modal mở KHÔNG đóng dossier bên dưới; Esc lần 2 mới đóng dossier.
- [x] Đổi VI/EN: caption, nhãn, hint đổi theo (EN: “P.S. — Columbina enclosed…”, “Visual evidence”, “Photo/Video”).
- [x] Console sạch (chỉ còn warning Tailwind CDN có sẵn).
- [ ] Link nssdc 404 cũ: GIỮ NGUYÊN (pre-existing, ngoài phạm vi).

## 9. Ghi chú vận hành

- Muốn thêm ảnh/video mới: chỉ cần sửa `media.gallery` trong `js/data.js` (thêm phần tử vào `photos`/`videos`) — UI tự render, không cần sửa JS/CSS.
- Video không phải YouTube (file mp4 local): hiện modal chỉ hỗ trợ `kind: "youtube"`; nếu nhóm có mp4, báo trước để mở rộng `renderMediaModal()`.
