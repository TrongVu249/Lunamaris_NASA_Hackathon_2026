# Kế hoạch: Luồng truyện + 5 trò chơi + "Hồ sơ Khoa học"

## Bối cảnh
Hiện tại trang là chuỗi cảnh toàn màn hình (`js/book.js`). Mỗi chương là một thanh trượt khám phá, chạm vào là nhận tem ngay ([app.js:587](js/app.js#L587)). Chưa có bộ phát truyện, chưa có điều kiện thắng, chưa có thẻ luật. Nhóm muốn biến trang thành một luồng có truyện và trò chơi:

```
Lần đầu: Truyện mở đầu → Màn bắt đầu → 4 tín hiệu → Game 1 → Thư → Truyện → Game 2 → Thư → Truyện
         → Game 3 → Thư → Truyện → Game 4 → Thư → Truyện → Game 5 (Artemis) → Truyện kết (cú lật)
         → Lá thư thứ năm → Truyện 2076 → Cảnh 2076 (hiện lại thư) → Thẻ Guardian (phần phụ) → Giáo viên → Nguồn
Lần sau: vào màn 4 tín hiệu, các thiết bị mở theo tiến trình đã lưu trong localStorage
```
Mỗi cảnh game có nút **"Hồ sơ Khoa học"** ở góc dưới phải. Nút mở popup che màn game, gồm bộ mô phỏng cũ, hồ sơ nhà khảo cổ và nguồn, không có lá thư. Nút đổi thành **X** ngay tại chỗ.

**Giới hạn:** chỉ code được **3 giờ**, còn 7 giờ là tới hạn nộp. Bài phải chạy trên cả điện thoại 375px lẫn máy tính, bằng cảm ứng và chuột/bàn phím.

**Bạn đã chốt:**
- Mốc thắng Game 2 là **160 m** (cập nhật 15/11: ảnh LRO 2011 đo 538 ft ≈ 164 m; trước đó là 180 m).
- Truyện **chỉ có chữ**, ảnh là trường tùy chọn.
- Lá thư dùng **bản ngắn theo kịch bản** (`letter_*`); bản dài chuyển sang `log_*`, hiện ở mục "Nhật ký kỹ thuật" trong popup Hồ sơ (cập nhật 15/11).
- Vẫn có **thẻ luật**.
- Có nút **Bỏ qua**, bỏ qua vẫn được nhận thẻ.
- Thiết bị chưa tới thì **khóa nhẹ**: hiện mờ, kèm nút "Mở chặng này".

## Hướng thiết kế (theo skill frontend-design)
Giữ nhận diện đã có trên nhánh `redesign/ui-ux`, không thêm font hay màu mới.
- **Màu:** nền `#151622`, mặt nổi `#1E2030`, chữ `#F8FAFC` / `#94A3B8`. Vàng tín hiệu `#E7F434` chỉ dùng cho hành động chính và khoảnh khắc thắng. Màu theo thế giới dùng `--c`: Mặt Trăng `#38BDF8`, Sao Hỏa `#F97316`.
- **Chữ:**
  - Fira Sans: tên người nói, tiêu đề.
  - Overpass: lời thoại, thư.
  - JetBrains Mono: **chỉ** cho số đo thật (đồng hồ 2,56 s, 180 m, Wh, số chuyến bay).
  - Không viết hoa toàn bộ nhãn.
- **Điểm nhấn duy nhất là con tem thẻ luật.** Tem có răng cưa như tem thư, và nối hai thứ vốn tách nhau là "tem tín hiệu" với "bài học":
  - Cuối lá thư, tem đóng xuống rồi bay vào ô trống trên thanh trên cùng.
  - Ở Game 5, chính những con tem này là công cụ để gạch các vùng sai.
  - Mọi thứ còn lại giữ yên và tiết chế.
- **Truyện kiểu phụ đề phim, không dùng hộp thoại bo tròn kiểu visual novel.** Chữ căn trái, nằm trên lớp tối dần ở đáy cảnh. Tên người nói nhỏ phía trên, tiến độ là một dãy chấm mảnh. Nền là cảnh vẽ bằng CSS theo `world`: phòng trực (lưới màn hình mờ), Mặt Trăng, Sao Hỏa. Dùng lại `.scene-horizon` đang có.
- **Chuyển động:** chỉ một khoảnh khắc được dàn dựng cho mỗi lần thắng (dấu niêm phong nứt → thư mở → tem đóng). Các chuyển động còn lại đều do người chơi tạo ra. Khi bật `prefers-reduced-motion` thì mọi thứ đổi ngay, không có hiệu ứng.

**Màn game, điện thoại:**
```
┌ thanh trên: logo · 4 ô tem · EN/VI ┐
│ Apollo 11 · Biển Yên Tĩnh          │
│ "Muốn nói chuyện với nó thì phải   │
│  chiếu ánh sáng vào."  — Thu Nguyệt │
│ ┌──────────── SVG ─────────────┐   │
│ └──────────────────────────────┘   │
│ Giữ nút cho tới khi ánh sáng về    │
│ [   Giữ để bắn laser   ]  (≥56px)  │
│ ─ hàng đáy chừa riêng, có safe-area│
│ Bỏ qua              [Hồ sơ Khoa học]│
└────────────────────────────────────┘
```

**Màn game, máy tính (≥1024px):** cột trái chứa câu thoại, mục tiêu và nút điều khiển. Cột phải là SVG lớn. Hàng đáy cố định: "Bỏ qua" bên trái, "Hồ sơ Khoa học" bên phải. Nút điều khiển của game **không bao giờ** nằm trong hàng đáy, để ngón cái kéo thanh trượt không chạm nhầm nút popup.

## Kiến trúc: dựng trên book.js đang có
Mỗi đoạn truyện là một `book-scene[data-story]` đã chừa sẵn. Mỗi chương là một cảnh game, và lá thư là một trạng thái trong chính cảnh đó. Đi tiếp vẫn dùng `LunamarisBook.next()`. Không làm thêm lớp phủ riêng.

### File mới
- **`js/story.js`** thực hiện `window.LunamarisStory = { has(seq), mount(seq, el, { onDone }) }`, đúng với cách gọi book.js đã định ([book.js:14-15](js/book.js#L14-L15), [book.js:mountStory](js/book.js)).
  - Chạm hoặc bấm nửa phải để sang tiếp, nửa trái để lùi. Phím → và Space sang tiếp, ← lùi. Có nút **Bỏ qua** luôn hiện.
  - Chữ hiện dần. Lần chạm đầu cho hiện hết câu.
  - Bỏ qua thao tác trong lúc đang chuyển cảnh. Đặt `touch-action: manipulation`.
  - Có `img` thì dùng ảnh với `object-fit: cover`. Không có hoặc tải lỗi thì giữ nền CSS.
  - Gọi `onDone` khi hết truyện hoặc khi bấm Bỏ qua.
- **`js/games.js`** chứa `window.LunamarisGames.mount(artId, el, { onWin })` cho Game 1–4 và `mountArtemis(el, { rules, onLand })` cho Game 5.

### Sửa file đang có
- **`js/data.js`** (sửa `data/content.json` cho khớp nếu dễ):
  - Thêm `story_sequences: { intro, to_ch2, to_ch3, to_ch4, to_artemis, ending }`, mỗi cảnh có dạng `{ id, world, img?, speaker, text_vi, text_en }`.
  - Thêm vào mỗi artifact: `game: { cue_vi/en, goal_vi/en, start, target, tolerance }` và `rule: { title_vi/en, zone }`.
  - Chữ truyện lấy từ [docs/Kich_ban_relic_Final_v2.md](docs/Kich_ban_relic_Final_v2.md):
    - Mở đầu: Cảnh 1–3, 4 cảnh.
    - Mỗi đoạn chuyển tiếp: câu kết chương trước + câu mở chương sau, 2 cảnh.
    - Chuyển sang Artemis: Cảnh 8, 2 cảnh.
    - Kết: Cảnh 10, 11, 13, 3 cảnh.
    - Tổng ~17 cảnh. Bản EN do tôi viết. Câu nào ghi 160 m thì đổi thành 180 m.
- **`index.html`**:
  - Chuyển `scene-story-intro` lên **trước** `scene-start`.
  - Thêm hàng đáy (Bỏ qua / Hồ sơ Khoa học) và khung popup `#dossier-sheet` (`role="dialog"`, `aria-modal`).
  - Bỏ khung bộ lọc hành tinh.
  - Nạp `story.js` và `games.js` trước `app.js`.
- **`js/app.js`**:
  - **Tiến trình:** `state.progress = { won: {artId: true}, landed: bool }`, lưu vào `localStorage` khóa `lunamaris_progress`, có bọc try/catch. Dùng lại cách viết `store/load` của book.js. Thay `collectStamp` khi kéo thanh trượt bằng `completeGame(artId)`, chỉ gọi khi thắng hoặc bỏ qua.
  - **Tách `chapterHtml`** ([app.js:453](js/app.js#L453)) thành ba phần:
    - `instrumentHtml(art)`: SVG, thanh trượt, mốc, số đo, "Số này lấy từ đâu".
    - `dossierHtml(art)`: 3 mục hồ sơ.
    - `letterHtml(art)`: thư kèm dấu niêm phong và con tem.
  - Bỏ nút chuyển giọng kể "Thư / Hồ sơ / Cả hai".
  - **Cảnh chương** có hai trạng thái là `game` và `letter`:
    - Thắng: chạy hiệu ứng thắng → hiện thư → tem đóng, tem bay vào thanh trên cùng → nút "Tiếp: <tên cảnh sau>" gọi `LunamarisBook.next()`.
    - Mở lại một chương đã thắng thì vào thẳng trạng thái game, có thể chơi lại. Có thêm liên kết "Đọc lại thư".
  - **Popup Hồ sơ Khoa học:** đổ `instrumentHtml` và `dossierHtml` của chương đang mở vào `#dossier-sheet`, dùng lại các sự kiện thanh trượt và mốc đang có. Ở cảnh Artemis, popup chứa trạm mặt cắt cũ (`renderDecisionStation` → [decision-station.js](js/decision-station.js)), và nút vùng **không** mở khóa huy hiệu nữa.
    - Esc hoặc X để đóng, trả focus về nút. Trong lúc popup mở, game tạm dừng (đồng hồ giữ laser về 0).
    - Điện thoại: popup kéo lên từ dưới, cao toàn màn hình. Máy tính: bảng phủ toàn bộ cảnh, nội dung chia 2 cột.
  - **Màn 4 tín hiệu** ([app.js:renderSignals](js/app.js#L270)):
    - Bỏ bộ lọc, xếp thiết bị theo thứ tự 1→4 và thêm mục thứ năm là Artemis.
    - Mỗi mục có trạng thái `xong`, `đang mở` hoặc `khóa nhẹ`. Mục khóa nhẹ có nút "Mở chặng này" và vẫn đi được.
    - Artemis mở khi đủ 4 thẻ.
  - **Thanh trên cùng:** 4 ô tem thẻ luật thay cho tem tín hiệu ([app.js:renderHeaderStamps](js/app.js#L117)).
  - **Game 5:** thắng thì `badgeUnlocked = true`, rồi `next()` → truyện kết → Guardian.
- **`js/book.js`** (sửa nhỏ):
  - **Lần đầu vào trang** (chưa có `lunamaris_seen_intro`, không có hash): vào `story-intro`. Các lần sau vào `start`.
  - **Chặn đi tiếp:** `next()` và vuốt không qua được cảnh có `[data-gate="locked"]`, tức game chưa thắng. Chỉ Bỏ qua hoặc thắng mới mở chặn.
  - **Phát lại truyện:** mỗi lần vào cảnh truyện thì mount lại từ cảnh đầu (bỏ cờ `mountedStories`).
  - **Không giành thao tác:** trên cảnh truyện, ẩn nút ‹ › của book và tắt vuốt ở `bindGestures`/`noSwipe` để không tranh chạm với bộ phát.
  - **Khi popup mở:** `dialogOpen()` tính cả `#dossier-sheet`.
  - Link vào thẳng `#ch3`, `#artemis` vẫn chạy.
- **`css/styles.css`**: thêm các khối `.story-*`, `.game-*`, `.dock` (hàng đáy), `.dossier-sheet`, `.rule-stamp` (răng cưa làm bằng `mask`/radial-gradient), `.seal` (dấu nứt). Tránh xung đột độ ưu tiên selector: dùng class cho từng thành phần, không dựa vào selector theo thẻ.

## Thiết kế 5 trò chơi
| Game | Thao tác (Pointer Events + bàn phím) | Thắng khi | Dùng lại | Thẻ luật |
|---|---|---|---|---|
| 1 LRRR | Nhấn giữ nút (hoặc giữ Space): tia laser vẽ dần lên, đồng hồ chạy 0 → 2,56 s, chấm sáng quay về. Thả tay sớm thì đặt lại | Giữ đủ 2,56 s | SVG nhỏ mới trong games.js | Di tích vẫn đang làm việc |
| 2 Surveyor 3 | Thanh trượt 2.500 → 50 m, có vạch mục tiêu trên rãnh | Thả tay trong khoảng 180 ± 15 m | `computeChapter2` ([svg-engine.js:161](js/svg-engine.js#L161)) | Cách di tích ít nhất 2 km |
| 3 Opportunity | Thanh độ dày bụi τ 1 → 10,8 | Chạm τ 10,8 (22 Wh) | `computeChapter3` | Phải có nắng |
| 4 Ingenuity | Thanh số chuyến 1 → 72 | Tới chuyến 72 | `computeChapter4` | Phải có điểm mốc |
| 5 Artemis | Chạm tem, rồi chạm vùng A–D trên bản đồ SVG mới (có ghi "Bản đồ mô phỏng huấn luyện") | Gạch xong A, B, C rồi bấm **Hạ cánh ở D**, tia laser lại trả lời | 4 tem đã nhận | Mở thẻ Guardian |

**Luật áp tem ở Game 5:**
- **Cặp đúng:** LRRR → A làm hiện chấm gương. Surveyor → A vẽ vòng 2 km và gạch A. Opportunity → B phủ bóng tối và gạch B. Ingenuity → C tắt các điểm mốc và gạch C.
- **Áp sai:** bản đồ lắc nhẹ kèm một câu gợi ý của Thu Nguyệt, đặt trong `aria-live`.
- **Bàn phím:** Tab chọn tem, Enter rồi chọn vùng. Các vùng là `<button>` phủ lên SVG.
- **Thanh trượt:** dùng `input[type=range]` gốc, nên phím mũi tên chạy sẵn. Game 2–4 bắt đầu ở giá trị `game.start`, không dùng `default_val` vì giá trị đó đang là trạng thái thắng.

## Thứ tự làm trong 3 giờ, kèm phương án cắt
1. **(10′)** Ghi bản thiết kế này vào `docs/superpowers/specs/2026-11-15-luong-truyen-game-design.md`. Commit.
2. **(25′)** Tiến trình, localStorage, chặn đi tiếp trong book.js, màn 4 tín hiệu xếp thứ tự và khóa nhẹ, thanh tem thẻ luật. Commit.
3. **(35′)** `story.js`, dữ liệu truyện VI/EN, nền cảnh CSS, đưa mở đầu lên đầu. Commit.
4. **(45′)** `games.js` Game 1–4, cảnh chương hai trạng thái, thư, tem, nút Tiếp, nút Bỏ qua. Commit.
5. **(20′)** Popup Hồ sơ Khoa học: tách `chapterHtml`, nút đổi thành X, Esc, tạm dừng game. Commit.
6. **(30′)** Game 5 Artemis và việc chuyển trạm mặt cắt cũ vào popup. Commit.
7. **(15′)** Kiểm tra ở 375px và máy tính, sửa lỗi, cập nhật cấu trúc thư mục trong README/docs. Commit.

**Thứ tự cắt nếu trễ:**
1. Hiệu ứng khi áp tem ở Game 5
2. Tem bay lên thanh trên cùng (chỉ hiện tại chỗ)
3. Chi tiết nền cảnh truyện (dùng một nền chung)
4. Chữ hiện dần

**Luôn giữ:** bộ phát truyện, 4 game, thẻ luật, Game 5 chọn D, nút Bỏ qua, popup Hồ sơ Khoa học.

## Kiểm tra
- `node --check js/*.js` cho từng file.
- Chạy `python -m http.server 8000` ở thư mục gốc, mở `http://localhost:8000`:
  1. Xóa localStorage → tải lại → truyện mở đầu tự chạy (chạm, phím →, Bỏ qua) → màn bắt đầu → 4 tín hiệu: chỉ thiết bị 1 mở, các mục khác khóa nhẹ.
  2. Game 1 bằng chuột, bằng cảm ứng (DevTools, iPhone SE 375px) và bằng Space. Thả sớm thì đặt lại, giữ đủ 2,56 s thì thắng → thư → tem → Tiếp → truyện chuyển tiếp → Game 2.
  3. Game 2–4 bằng thanh trượt và phím mũi tên. Bấm ‹ › hoặc vuốt khi chưa thắng thì bị chặn. Bỏ qua thì vẫn nhận tem.
  4. Hồ sơ Khoa học: popup che màn game, nút đổi thành X, Esc đóng, focus trả về nút, không có lá thư, thanh trượt mô phỏng chạy được và **không** làm thắng game.
  5. Game 5: áp tem sai thì bản đồ lắc, áp đúng thì vùng bị gạch, D sáng lên → hạ cánh → truyện kết → Guardian mở khóa.
  6. Tải lại → không tự chạy mở đầu, 4 tín hiệu mở đúng theo tiến trình. Link `#ch3` vào thẳng. Đổi EN/VI ở mọi trạng thái.
  7. Bật `prefers-reduced-motion` thì không còn hiệu ứng. Ở 375px không có thanh cuộn ngang. Nút cao ít nhất 44px.

## Cập nhật 15/11: khớp luồng với kịch bản gốc

**Số liệu** (đối chiếu nguồn NASA):
- Surveyor 3 – Intrepid: 160 m (LRO). Ngày chạm đất: 19/11/1969, 06:54 UTC.
- Số ảnh: "hơn 6.300" trong thư; nhật ký ghi 6.326 kèm nguồn.
- Opportunity: 645 Wh (2/6/2018, τ ≈ 0,6) xuống 22 Wh. Thanh trượt bắt đầu ở τ = 0,6.
- Gương LRRR: chỉ trả về khoảng 1/10 tín hiệu so với tính toán (Murphy 2010).
- DUSTER: gắn trên xe MAPP; được chọn để phát triển tiếp, danh sách thiết bị chưa chốt.

**Thư hai lớp:**
- `narrative_voice.letter_*`: thư ngắn theo kịch bản, HTML gồm các `<p>`.
- `narrative_voice.log_*`: bản dài, hiện trong popup Hồ sơ.
- `rules[*].sub` trích câu gài bài học của từng thư.

**Đoạn kết:**
- `story.ending` (Cảnh 11) kết bằng câu "Vậy nó nên nói gì với họ?".
- Cảnh `letter5` (Cảnh 12, `data-kind="game"`) bị chặn đi tiếp cho tới khi niêm phong.
  - Mẫu thư nằm trong `LUNAMARIS_FLOW.letter5`. Chỉ chỗ trống cuối được chọn: 3 gợi ý, hoặc tự viết tối đa 120 ký tự.
  - Có các nút Niêm phong / Bỏ qua / Tải về PNG (`downloadLetterPNG` trong certificate.js) / Mở niêm phong.
  - Popup Hồ sơ ở cảnh này hiện Sổ tay DUSTER.
- `story.future` (Cảnh 13), rồi cảnh `future`: hiện lại **đúng** lá thư đã niêm phong. Sau đó là câu chốt, nút Nguồn và Góc giáo viên, cuối cùng là Guardian (phần phụ).
- Tiến trình lưu thêm `letter5: { choice, custom, sealed }` trong `lunamaris_progress`. Chữ người chơi luôn được escape.

**Hình ảnh phản hồi** (giữ nguyên 3 kiểu chơi):
- Chương 3: thêm nút "Gửi gói tin cuối"; chuỗi 0/1 bay lên rồi mới mở thư.
- Chương 4: ở chuyến 72 có lớp phủ camera định vị, các chấm mốc tắt dần rồi màn hình rung.
- Artemis:
  - thẻ LRRR → một nháy laser;
  - thẻ Surveyor → vòng 160 m rồi vòng 2 km nở ra;
  - thẻ Ingenuity → chấm mốc ở D hiện ra;
  - gạch xong cả ba vùng → câu "Đất ở đây đủ chắc".

**Dữ liệu:** `data/content.json` được xuất lại từ `js/data.js` (runtime) để hai bản khớp nhau.
