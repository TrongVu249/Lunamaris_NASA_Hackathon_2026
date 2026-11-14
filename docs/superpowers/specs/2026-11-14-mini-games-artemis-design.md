# Thiết kế: Trò chơi nhỏ cho 4 chương và Trạm Artemis IV

Ngày: 14/11/2026 · Thời gian còn lại trước Hard Freeze: ~9 giờ

## Mục đích
Mỗi chương dạy người đọc **một bài học bằng trải nghiệm**. Bốn bài học đó là lý do để họ **tự loại các bãi đáp sai và chọn đúng bãi đáp cho Artemis IV** (theo kịch bản Final_v2, Cảnh 4–10).

## Mục tiêu / Không làm
- **Mục tiêu:** tương tác đẹp nhưng đơn giản, mỗi chương một thao tác; chơi được bằng chạm (điện thoại) và chuột/bàn phím (máy tính); dựng tiếp trên mô phỏng SVG hiện có.
- **Không làm:** kéo-thả phức tạp, thư viện game, canvas/WebGL, chấm điểm hay xếp hạng, lưu dữ liệu người chơi, backend.
- **Thất bại nếu:** người chơi chọn được D mà không hiểu vì sao; hoặc có một trò không chơi được trên màn hình 375px.

## Cách làm đã chọn
Đã cân nhắc 3 cách: (1) bám sát kịch bản, có kéo thư lên bản đồ (quá nặng cho 9 giờ); (2) **thẻ luật** (đã chọn); (3) chỉ thêm mục tiêu cho thanh trượt và trắc nghiệm (không còn cảm giác chơi).

## Thiết kế
**Mỗi chương = một trò, thắng thì nhận một thẻ luật:**

| Chương | Thao tác | Điều kiện thắng | Thẻ luật nhận được |
|---|---|---|---|
| 1. LRRR | Nhấn giữ nút Laser; đồng hồ chạy 0 → 2,5 s, chấm sáng quay về | Giữ đủ ~2,5 s | **Di tích vẫn đang làm việc** — đừng phủ bụi lên nó |
| 2. Surveyor 3 | Kéo thanh khoảng cách để hạ tàu Intrepid; bụi quất mạnh khi ở gần | Dừng ở mốc ~160 m, thấy sơn Surveyor ngả nâu | **Cách di tích ít nhất 2 km** |
| 3. Opportunity | Kéo thanh độ dày bụi; trời tối dần, điện tụt về 22 Wh | Kéo tới mức điện 22 Wh | **Phải có nắng** — không đáp chỗ khuất nắng |
| 4. Ingenuity | Kéo số chuyến bay tới 72; các chấm điểm mốc tắt dần trên đồi cát | Kéo tới chuyến 72 | **Phải có điểm mốc** — mặt đất phẳng lì thì tàu bị lạc |

- Thắng thì con dấu phong bì nứt, rồi mở lá thư (giữ cơ chế tem hiện có).
- Mỗi trò có **nút "Bỏ qua"** để không ai bị kẹt.

**Trạm Artemis IV:**
- Bản đồ SVG 4 vùng A–D, ghi chú "Bản đồ mô phỏng huấn luyện".
  - **A:** gần di tích (có chấm gương LRRR).
  - **B:** đáy hố tối.
  - **C:** đồng bằng phẳng, không có hố nhỏ.
  - **D:** có nắng, có đá làm mốc, cách di tích hơn 2 km.
- Bên dưới bản đồ là 4 thẻ luật (thẻ chưa nhận thì mờ).
- **Chạm một thẻ, rồi chạm một vùng:**
  - Áp đúng: hiệu ứng ngắn (vòng 2 km phủ A, bóng tối phủ B, các điểm mốc tắt ở C), vùng bị gạch, Columbina nói một câu.
  - Áp sai: lắc nhẹ, kèm một câu gợi ý.
- Gạch xong A, B, C thì nút **Hạ cánh ở D** sáng lên. Bấm vào thì tàu hạ xuống, bắn laser lại ("Nó vẫn trả lời"), rồi mở thẻ Guardian và lá thư DUSTER.
- Phần mặt cắt bụi hiện có được giữ lại làm hình minh họa cho thẻ Surveyor.

**Đáp ứng màn hình:**
- Điện thoại: 1 cột, khu chơi rộng toàn màn hình, nút cao ít nhất 44 px.
- Máy tính: khu chơi và lá thư nằm cạnh nhau; bản đồ Artemis bên trái, các thẻ bên phải.
- Dùng Pointer Events cho cả chạm lẫn chuột (nhấn giữ hoạt động trên cả hai); điều khiển được bằng bàn phím (Space để giữ laser, phím mũi tên cho thanh trượt); tôn trọng `prefers-reduced-motion`.

**Số liệu:** chỉ dùng số đã có trong kịch bản và bảng chuẩn N3.3 (2,5 s; 160 m; 2 km; 645 → 22 Wh; 72 chuyến). Chuyển trò Ch.3 sang 645 Wh cho khớp kịch bản.

## Bộ phát truyện (truyện ảnh chạm để sang ảnh)
Câu chuyện được kể bằng các ảnh nối tiếp toàn màn hình. Người dùng chạm để sang ảnh tiếp theo.

**Số ảnh:**
- Mở đầu: 3–5 ảnh, theo Cảnh 1–3 (phòng trực Hà Nội, bản đồ, phong bì).
- Chuyển tiếp: 2–3 ảnh giữa mỗi chặng (trước mỗi chương và trước Trạm Artemis).
- Kết: 3–6 ảnh, theo Cảnh 10–13 (hạ cánh, DUSTER, lá thư thứ 5, Hà Nội 2076).
- Tổng khoảng 14–26 ảnh. **Bộ tối thiểu phải có: ~14 ảnh** (mở đầu 3, mỗi chỗ chuyển 2, kết 3).

**Dữ liệu cảnh** nằm trong `content.json`, nhóm theo `sequence` (`intro`, `to_ch1`…`to_artemis`, `ending`). Mỗi cảnh có `{ id, img, alt_vi, alt_en, speaker, text_vi, text_en }`. Thêm hay bớt ảnh chỉ cần sửa dữ liệu.

**Hiển thị:**
- Lớp phủ toàn màn hình (`role="dialog"`, `aria-modal`), cao `100dvh`, chừa vùng tai thỏ bằng `safe-area-inset`.
- Ảnh hiển thị bằng `object-fit: cover`, kèm `object-position` riêng cho từng ảnh nếu cần. Trên máy tính, hai bên ảnh có nền mờ cho đỡ trống.
- **Chữ là HTML phủ lên ảnh, không viết chữ vào ảnh.** Nhờ vậy một bộ ảnh dùng được cho cả EN và VI.
- Thiếu ảnh (chưa làm kịp hoặc tải lỗi) thì hiện nền tối kèm lời thoại, không hiện biểu tượng ảnh vỡ.

**Điều khiển:**
- Chạm hoặc bấm chuột vào nửa phải (hoặc giữa) để sang ảnh tiếp; nửa trái để quay lại; vuốt ngang cũng được.
- Bàn phím: → và Space sang tiếp, ← quay lại, Esc bỏ qua.
- Chữ hiện dần: nếu câu chưa hiện hết thì lần chạm đầu cho hiện ngay toàn bộ câu, lần chạm sau mới sang ảnh.
- Nút **Bỏ qua** luôn hiện, kèm thanh chấm báo tiến độ.
- Bỏ qua các lần chạm trong lúc ảnh đang chuyển. Đặt `touch-action: manipulation` để chạm nhanh không bị phóng to.

**Hiệu ứng:**
- Ảnh chuyển mờ dần (crossfade, ~400 ms) kèm zoom chậm nhẹ.
- Người dùng bật `prefers-reduced-motion` thì đổi ảnh ngay, không zoom.

**Tải ảnh:**
- Định dạng WebP (AVIF nếu có), mỗi ảnh ~80–150 KB, cả bộ dưới ~3 MB.
- Khi vào trang chỉ tải ảnh đầu tiên của mở đầu. Luôn tải trước 1–2 ảnh kế tiếp.
- Bộ ảnh chuyển tiếp của chặng sau được tải ngầm trong lúc người chơi đang chơi chặng hiện tại.

**Âm thanh (nếu có):** chỉ phát sau lần chạm đầu tiên, luôn có nút tắt tiếng.

**Tuân thủ:** ảnh do AI tạo phải ghi trong phần SI Disclosure, ảnh NASA phải ghi công, không dùng logo NASA.

## Luồng theo chặng
```
Mở đầu (truyện) → [Ch.1 trò chơi → thư → thẻ luật] → chuyển tiếp → Ch.2 → chuyển tiếp → Ch.3
→ chuyển tiếp → Ch.4 → chuyển tiếp → Trạm Artemis IV (chọn D) → Kết (truyện) → thẻ Guardian + thư DUSTER
```
- **Trạng thái tập trung** trong `state.stage` (`intro`, `ch1`…`ch4`, `artemis`, `ending`, `done`). Chơi xong một chặng thì phát chuỗi chuyển tiếp rồi cuộn tới chặng sau.
- **Chặng chưa tới:** khóa nhẹ (mờ, kèm nút "Mở chặng này"), không chặn cứng. Người muốn đọc tự do vẫn đọc được.
- **Chế độ đọc:** trang cuộn hiện có được giữ lại làm chế độ đọc. Đây cũng là phương án rút lui ở CP1, và tiện cho giáo viên.
- **Lần đầu vào trang:** tự phát mở đầu.
- **Lần sau quay lại:** không tự phát nữa, mà hiện nút "Xem lại câu chuyện". Việc ghi nhớ chỉ lưu một cờ `lunamaris_seen_intro` cùng chặng đang dừng vào `localStorage`, có bọc try/catch; không lưu dữ liệu cá nhân.
- **Link vào thẳng:** `#ch1`…`#ch4`, `#artemis` bỏ qua phần truyện và mở thẳng chặng đó. Dùng cho giám khảo và giáo viên.

## Để người làm tự quyết
Chi tiết hoạt cảnh SVG, câu thoại gợi ý khi áp sai thẻ, cách chia file JS. Dự kiến thêm `js/story.js` (bộ phát truyện) và `js/games.js` (4 trò chơi), sửa `js/decision-station.js` và `js/app.js` (quản lý `state.stage`).

## Thứ tự cắt nếu trễ
Hiệu ứng khi áp thẻ → hoạt cảnh hạ cánh → ảnh truyện thiếu (thay bằng nền tối kèm lời thoại) → hiệu ứng zoom chậm → câu thoại Columbina. **Luôn giữ:** bộ phát truyện (dù chỉ có chữ), 4 trò, cơ chế thẻ luật, loại vùng và chọn D, nút Bỏ qua.
