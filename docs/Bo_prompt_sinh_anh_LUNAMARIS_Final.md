# BỘ PROMPT SINH ẢNH CHUẨN HÓA THEO STYLE ẢNH GỐC CHO DỰ ÁN LUNAMARIS
> **Dự án:** LUNAMARIS – Những lá thư qua biển lặng (NASA Space Apps Challenge 2026)  
> **Chủ đề:** *Abandoned but not Forgotten* (Kịch bản: RELIC-PULSE)  
> **Ảnh tham chiếu chuẩn (Master Reference Image):** Ảnh gốc phòng trực Trạm Hà Nội & nhân vật Columbina  
> **Phiên bản:** v2.1 – Đồng bộ hóa 100% theo phong cách nét vẽ, tạo hình nhân vật và không gian của ảnh gốc

---

## 1. GIẢI MÃ PHONG CÁCH MỸ THUẬT CỦA ẢNH GỐC (STYLE REVERSE-ENGINEERING)

Dựa trên ảnh gốc do bạn cung cấp, toàn bộ các prompt dưới đây đã được viết lại để khớp tuyệt đối với các đặc điểm thị giác sau:

* **Phong cách vẽ (Medium & Art Style):**
  * **2D Clean Line-Art / Comic Book / Graphic Novel Aesthetic:** Nét viền mực đen rõ ràng, thanh mảnh nhưng dứt khoát bao quanh nhân vật và toàn bộ đồ vật trong phòng.
  * **Cel-Shaded & Smooth Flat Color:** Mảng màu phẳng kết hợp đổ bóng 2 lớp (cel-shading) mềm mại, không dùng cọ vẽ dầu hay cọ sơn dầu lem luốc, bề mặt mịn màng như phim hoạt hình anime/webtoon chất lượng cao (tương đồng mỹ thuật tựa game *Coffee Talk*, *Florence*, *Lofi Girl*).
  * **Góc phối cảnh (Perspective):** Khung hình rộng tỉ lệ 16:9 ngang, góc nhìn bao quát từ ngang tầm mắt (eye-level wide shot), thấy toàn cảnh bàn làm việc chữ L, nhân vật và khung cửa sổ nhìn ra thành phố.

* **Nhận diện chuẩn của nhân vật chính (Columbina):**
  * **Khuôn mặt & Biểu cảm:** Nữ kỹ thuật viên trẻ người Việt Nam (khoảng 22–24 tuổi), gương mặt tròn thanh tú, đôi mắt đen to biểu cảm ấm áp, mũi nhỏ, nụ cười nhẹ nhàng và thông minh.
  * **Mắt kính:** Kính mắt tròn gọng tối màu (dark round thin-rimmed glasses), viền mảnh.
  * **Mái tóc:** Tóc đen tuyền (jet-black hair), cắt ngắn kiểu bob ngang cằm/vai với phần đuôi uốn nhẹ tự nhiên, mái bằng che trán (straight fringe/bangs), có vệt highlight sáng mềm phản chiếu ánh đèn.
  * **Trang phục:** 
    * Áo khoác blouse trắng phòng thí nghiệm (white lab coat) khoác hờ bên ngoài.
    * Áo sơ mi tối màu (dark navy button-up shirt) cài cúc bên trong.
    * Quần âu/quần vải lửng màu xám đen/charcoal dài trên mắt cá chân (cropped ankle-length dark trousers).
    * Chân đi dép lê quai ngang màu đen/xám đơn giản và thoải mái (casual black slide sandals, open-toe).
  * **Dáng ngồi đặc trưng:** Ngồi trên ghế xoay văn phòng công thái học màu xanh đen/xám có 5 bánh xe và tay vịn.

* **Không gian Trạm mặt đất Hà Nội (Hanoi Ground Station Room):**
  * **Bàn làm việc:** Bàn gỗ chữ L lớn màu nâu ấm (warm brown wooden L-shaped desk), góc phải có dãy ngăn kéo gỗ với tay nắm kim loại.
  * **Hệ thống màn hình:**
    * *Bên trái:* Cụm màn hình CRT cổ điển vỏ màu be xám dày cộp hiển thị biểu đồ lưới vector và bản đồ radar màu xanh lơ/xanh lam, bàn phím máy tính màu be cổ điển, vài cuốn sách xếp chồng.
    * *Ở giữa và bên phải:* Dãy màn hình phẳng hiện đại hiển thị bản đồ thế giới màu xanh bạc hà (mint green), đồ thị sóng telemetry màu trắng/xanh lá, và màn hình theo dõi hành tinh màu xanh dương.
    * *Treo trên tường góc phải:* 2 màn hình phụ hiển thị biểu đồ tròn và dữ liệu quỹ đạo.
  * **Máy thu radio cổ điển:** Đặt cố định ở góc bàn bên phải, dạng hộp kim loại màu xám có ăng-ten đứng vươn lên, các núm xoay tròn, dải loa đục lỗ và dây nguồn cắm vào tường.
  * **Vật dụng trên sàn:** Chiếc túi tote vải canvas màu trắng in hình dải ngân hà / tinh vân tím và dòng chữ minh họa đặt dưới chân bàn.
  * **Cửa sổ & Hậu cảnh:** Ô cửa kính lớn kịch trần nhìn ra đường chân trời thành phố Hà Nội về đêm với ánh đèn bokeh mờ ảo dưới bầu trời tím đen tĩnh mịch.
  * **Ánh sáng:** Ánh sáng chính là ánh sáng dịu phát ra từ dãy màn hình máy tính (xanh bạc hà, xanh lơ, xanh dương) hắt lên áo blouse trắng và mặt bàn gỗ, tương phản với bầu trời đêm bên ngoài.

* **Quy tắc vàng (No-Text Rule):** Tất cả prompt đều có mệnh lệnh nghiêm ngặt `--no text, typography, letters, words, numbers, speech bubbles, watermark` để giao diện web tự render chữ và phụ đề đè lên.

---

## 2. BỘ 7 PROMPT CHÍNH CHO BỘ PHÁT TRUYỆN TRÊN WEB (CORE STORY SEQUENCES)
> Khớp chính xác 1-1 với 7 chuỗi dữ liệu trong file [js/flow-data.js](file:///d:/Project/NasaSpaceAppHanoi2026/Lunamaris_NASA_Hackathon_2026/js/flow-data.js) và [index.html](file:///d:/Project/NasaSpaceAppHanoi2026/Lunamaris_NASA_Hackathon_2026/index.html).  
> **Thư mục lưu ảnh:** `assets/story/`

---

### CẢNH S1: MỞ ĐẦU – TÍN HIỆU LÚC 02:40 SÁNG
* **Vị trí web:** `data-scene="story-intro"` (`LUNAMARIS_FLOW.story.intro`)
* **Tên file ảnh:** `assets/story/story-intro.webp`
* **Nội dung:** Giữ đúng góc chụp và căn phòng trong ảnh gốc. 02:40 sáng. Columbina vừa hạ cốc cà phê và cuốn sách xuống mặt bàn, ngạc nhiên quay sang nhìn chiếc máy thu cổ điển ở góc bàn bên phải. Chiếc máy thu đang phát sáng nhấp nháy đèn hổ phách (amber light) và đẩy ra 4 chiếc phong bì niêm phong sáp đặt thẳng hàng trên mặt bàn gỗ.
* **Prompt (Midjourney v6 / DALL-E 3 / Flux):**

```text
2D digital illustration, clean dark line art, cozy graphic novel aesthetic, cel-shaded anime style, exact matching character and room design of the reference image. A young Vietnamese female technician named Columbina with short jet-black bob hair, straight bangs, round dark glasses, wearing a white lab coat over a dark navy shirt, cropped dark trousers, and casual black slides. She is sitting on her dark blue rolling office chair at her large wooden L-shaped desk inside the Hanoi ground control room at 2:40 AM. She lowers her takeaway coffee cup and open book onto the desk, turning with a surprised, curious look toward the vintage gray radio receiver on the right corner of the desk. The radio receiver is glowing with an active, pulsing warm amber signal light, with four sealed envelopes stamped with faint wax seals resting on the wooden desk beside it. The desk features the same retro CRT monitors on the left and modern flat screens showing cyan and mint-green telemetry maps. Through the wide glass window behind, the sleeping Hanoi night skyline glows with soft bokeh lights under a deep indigo sky. Peaceful, cozy late-night atmosphere, crisp outlines, no text, no letters, no words, no speech bubbles, no UI watermarks --ar 16:9 --style raw --v 6.0
```

---

### CẢNH S2: CHUYỂN TIẾP CHẶNG 1 $\rightarrow$ CHẶNG 2 (GƯƠNG APOLLO 11 $\rightarrow$ TÀU SURVEYOR 3)
* **Vị trí web:** `data-scene="story-to-ch2"` (`LUNAMARIS_FLOW.story.to_ch2`)
* **Tên file ảnh:** `assets/story/story-to-ch2.webp`
* **Nội dung:** Vẫn trong căn phòng đó. Columbina ngồi tại bàn làm việc. Phong bì thứ nhất (Apollo 11) đã được mở ra nằm cạnh cuốn sổ tay. Cô đưa tay chạm vào phong bì thứ hai có con dấu hình tàu đổ bộ. Dãy màn hình phẳng trước mặt cô đổi sang hiển thị bề mặt Mặt Trăng: một màn hình chiếu chấm laser xanh nhạt đang phản hồi từ gương Apollo 11, màn hình bên cạnh hiển thị hình ảnh cỗ máy ba chân Surveyor 3 đứng trong hố cát nông với lớp sơn trắng bị bụi bám ngả màu nâu.
* **Prompt:**

```text
2D digital illustration, clean dark line art, cozy graphic novel aesthetic, cel-shaded anime style, matching the exact art style and character design of the reference image. The same young Vietnamese technician Columbina (short black bob hair, straight bangs, round glasses, white lab coat over dark navy shirt, cropped dark pants, black slides) is sitting thoughtfully at her wooden L-shaped desk in the Hanoi control room. On the desk, one opened glowing letter rests near her notebook, while she gently reaches for a second sealed envelope with a lunar lander insignia. The computer monitors illuminate her face with soft cyan and pale green light: the central screen displays a glowing split telemetry visual showing a faint green laser beam bouncing off a lunar retroreflector on the Moon's surface on one side, and the silhouette of the three-legged Surveyor 3 probe standing in a dusty lunar crater on the other. Vintage radio receiver softly glowing on the right corner. Hanoi night skyline visible through the large window. Emotional, contemplative mood, crisp line art, no text, no numbers, no letters, no speech bubbles --ar 16:9 --style raw --v 6.0
```

---

### CẢNH S3: CHUYỂN TIẾP CHẶNG 2 $\rightarrow$ CHẶNG 3 (SURVEYOR 3 $\rightarrow$ XE TỰ HÀNH OPPORTUNITY)
* **Vị trí web:** `data-scene="story-to-ch3"` (`LUNAMARIS_FLOW.story.to_ch3`)
* **Tên file ảnh:** `assets/story/story-to-ch3.webp`
* **Nội dung:** Columbina hơi rướn người về phía trước, ánh mắt chăm chú và xúc động. Hai phong bì đã mở nằm gọn gàng trên bàn. Cô đang cầm trên tay phong bì thứ ba mang sắc đỏ cam của Sao Hỏa. Ánh sáng từ các màn hình máy tính chuyển từ màu xanh mát sang sắc cam hổ phách và đỏ thẫm của bụi Sao Hỏa, hiển thị hình ảnh xe tự hành Opportunity 6 bánh đang đứng im lìm trên sườn thung lũng đá dưới bầu trời bão bụi mù mịt.
* **Prompt:**

```text
2D digital illustration, clean dark line art, cozy graphic novel aesthetic, cel-shaded anime style, matching the exact visual style of the reference image. The young Vietnamese technician Columbina (short black bob hair, bangs, round glasses, white lab coat, dark shirt, cropped dark pants) leans forward with an empathetic, focused expression at her wooden L-shaped desk. Two unsealed envelopes rest open beside her notebook. She holds a third sealed envelope tinted in warm terracotta Martian red. The flat monitors on her desk have shifted their glow from cool cyan to dramatic dusty amber and warm red Martian tones, displaying a graphic illustration of the six-wheeled Opportunity rover sitting motionless on a rocky Martian valley slope under an ominous, darkening dust storm sky. The vintage gray radio receiver on the right glows with warm amber light. Outside the window, the peaceful Hanoi night skyline sleeps under dark indigo clouds. Moody, poetic, poignant sci-fi storytelling, crisp ink outlines, no text, no numbers, no words, no speech bubbles --ar 16:9 --style raw --v 6.0
```

---

### CẢNH S4: CHUYỂN TIẾP CHẶNG 3 $\rightarrow$ CHẶNG 4 (OPPORTUNITY $\rightarrow$ TRỰC THĂNG INGENUITY)
* **Vị trí web:** `data-scene="story-to-ch4"` (`LUNAMARIS_FLOW.story.to_ch4`)
* **Tên file ảnh:** `assets/story/story-to-ch4.webp`
* **Nội dung:** Columbina mỉm cười nhẹ nhõm, ánh mắt ấm áp. Ba phong bì đã mở trên bàn. Cô cầm phong bì thứ tư in biểu tượng trực thăng hai tầng cánh quạt. Dãy màn hình vi tính chuyển sang màu xanh ngọc bích và xanh lơ rực rỡ, chiếu sơ đồ đường bay radar uốn lượn qua những đồi cát Sao Hỏa và mô phỏng chiếc trực thăng bốn chân Ingenuity nhỏ bé đang bay lơ lửng.
* **Prompt:**

```text
2D digital illustration, clean dark line art, cozy graphic novel aesthetic, cel-shaded anime style, matching the exact visual style of the reference image. The young Vietnamese technician Columbina (short black bob hair with bangs, round glasses, white lab coat, dark navy shirt, cropped pants, casual slides) sits at her wooden desk with a gentle, fond smile. Three opened letters are neatly arranged across the desk. She happily picks up the fourth sealed envelope stamped with a twin-rotor drone insignia. The central computer monitors glow in cheerful emerald-green, teal, and amber, displaying radar flight trajectories curving across orange Martian sand ripples toward a stylized four-legged boxy micro-helicopter with twin carbon blades. The vintage radio receiver on the right corner pulses with friendly amber lights. Outside the window, Hanoi sleeps under a dark midnight sky with glowing city lights. Heartwarming, inspiring, clean line work, no text, no alphabets, no numbers, no speech bubbles --ar 16:9 --style raw --v 6.0
```

---

### CẢNH S5: CHUYỂN TIẾP CHẶNG 4 $\rightarrow$ QUYẾT ĐỊNH ARTEMIS IV (04:10 SÁNG)
* **Vị trí web:** `data-scene="story-to-artemis"` (`LUNAMARIS_FLOW.story.to_artemis`)
* **Tên file ảnh:** `assets/story/story-to-artemis.webp`
* **Nội dung:** 04:10 sáng. Cả 4 lá thư và các sơ đồ kỹ thuật đã mở tung trên bàn làm việc. Columbina đứng bật dậy khỏi ghế xoay, một tay chống lên mặt bàn gỗ, nét mặt bừng sáng vẻ quyết đoán và nhận ra chân lý. Toàn bộ căn phòng ngập trong ánh sáng cảnh báo màu hổ phách (amber alert) từ các màn hình lớn, chiếu bản đồ địa hình cực Nam Mặt Trăng chia thành 4 vùng hạ cánh (A, B, C, D) với các vòng tròn bán kính an toàn. Bên ngoài cửa sổ, đường chân trời Hà Nội bắt đầu le lói ánh sáng tím sẫm của rạng đông.
* **Prompt:**

```text
2D digital illustration, clean dark line art, graphic novel aesthetic, cel-shaded anime style, matching the exact character and room design of the reference image. Inside the Hanoi ground station control room at 4:10 AM before dawn. All four opened letters, envelopes, and field notes are spread wide across the wooden L-shaped desk. The young Vietnamese technician Columbina (short black bob hair, round glasses, white lab coat, dark navy shirt, cropped dark pants) stands up from her blue swivel chair with one hand firmly pressed against the wooden desk, looking at the main monitors with intense realization and determination. The room is dramatically illuminated by an urgent, glowing amber alert light from the computer screens, which display a detailed lunar topographical map divided into four landing sectors with glowing circular safety radii and crater contour lines. Through the large window behind her, the Hanoi skyline reveals the very first faint violet glow of pre-dawn on the horizon. High energy, dramatic climax, crisp dark outlines, no text, no letters, no numbers, no speech bubbles --ar 16:9 --style raw --v 6.0
```

---

### CẢNH S6: CÚ LẬT LỊCH SỬ – DUSTER Ở LẠI MẶT TRĂNG (THE TWIST) ⭐
* **Vị trí web:** `data-scene="story-ending"` (`LUNAMARIS_FLOW.story.ending`)
* **Tên file ảnh:** `assets/story/story-ending.webp`
* **Nội dung:** Cảnh 11 kịch bản. Tàu đổ bộ Artemis IV cất cánh rời Mặt Trăng, để lại chiếc xe tự hành đo bụi DUSTER cô đơn trên bề mặt Biển Yên Tĩnh. Để đảm bảo tính đồng nhất 100% với ảnh gốc, cảnh này được thiết kế theo góc nhìn: Columbina ngồi lặng người tại bàn làm việc ở Trạm Hà Nội, ngắm nhìn màn hình lớn chiếu hình ảnh chiếc xe DUSTER nhỏ bé 4 bánh đang đứng trơ trọi cạnh những dấu chân phi hành gia trên nền đất xám Mặt Trăng, phía xa trên nền trời đen là vệt sáng động cơ của con tàu đang bay về Trái Đất.
* **Prompt:**

```text
2D digital illustration, clean dark line art, graphic novel aesthetic, cel-shaded anime style, matching the exact character and room style of the reference image. The young Vietnamese technician Columbina (short black bob hair, round glasses, white lab coat, dark navy shirt, cropped dark pants) sits quietly in her blue office chair inside the dim Hanoi control room, resting her chin on her hand as she gazes with deep emotion and wistful reverence at the main computer screen. The large central monitor displays a live camera feed from the gray lunar surface: a small, brave four-wheeled robotic micro-rover with golden dust sensors (DUSTER) sits alone on the powdery lunar soil next to fresh astronaut bootprints, while far in the black starry sky above, the glowing exhaust trail of the departing Artemis IV spacecraft ascends back toward a small blue Earth. Soft ambient light from the screen illuminates Columbina's face. The vintage radio receiver on the right glows with a quiet amber signal. Poetic, poignant, profound legacy storytelling, crisp ink line-art, no text, no letters, no words, no speech bubbles --ar 16:9 --style raw --v 6.0
```

---

### CẢNH S7: KHÉP VÒNG LẶP DI SẢN – HÀ NỘI 02:40 SÁNG, NĂM 2076
* **Vị trí web:** `data-scene="story-future"` (`LUNAMARIS_FLOW.story.future`)
* **Tên file ảnh:** `assets/story/story-future.webp`
* **Nội dung:** 50 năm sau, năm 2076, đúng 02:40 sáng tại chính căn phòng trực Trạm Hà Nội trong ảnh gốc. Cấu trúc căn phòng và chiếc bàn gỗ chữ L vẫn giữ nguyên nhưng thiết bị đã hiện đại hơn với màn hình cảm ứng mờ trong suốt, riêng chiếc máy thu radio cổ điển ở góc phải vẫn được trân trọng bảo tồn và đang nhấp nháy đèn hổ phách. Một kỹ thuật viên trẻ mới ngồi trên ghế xoay quay lưng về phía người xem, nhìn lên màn hình bản đồ Mặt Trăng nơi một chấm sáng thứ 5 mang tên DUSTER đang phát tín hiệu. Bức thư thứ 5 được niêm phong từ năm 2026 đang nằm trên mặt bàn.
* **Prompt:**

```text
2D digital illustration, clean dark line art, cozy futuristic graphic novel aesthetic, cel-shaded anime style, preserving the exact room layout and architectural design of the reference image. Set in the same Hanoi ground control room fifty years later in the year 2076 at 2:40 AM. The iconic wooden L-shaped desk and panoramic window are identical, but outside the window the Hanoi night skyline now features subtle futuristic sky-towers and gentle light ribbons under an indigo sky. The desk is equipped with sleek translucent holographic displays alongside the cherished, preserved vintage gray radio receiver on the right corner, which is actively beeping with a warm amber light. A new young technician sits in the ergonomic office chair with their back turned to the viewer, looking at the main holographic screen showing a lunar map where a bright fifth amber beacon pulses on the Moon's surface. On the wooden desk rests a golden sealed envelope illuminated by soft light. Nostalgic full-circle ending, peaceful atmosphere, crisp outlines, no text, no letters, no numbers, no speech bubbles --ar 16:9 --style raw --v 6.0
```

---

## 3. BỘ PROMPT BỔ TRỢ (OPTIONAL ASSETS)

### ẢNH W1: NỀN MÀN MỞ ĐẦU "BẬT THU SÓNG" (PHÒNG TRỰC KHÔNG NGƯỜI)
* **Vị trí web:** Nền của `data-scene="start"` (`#scene-start`)
* **Tên file ảnh:** `assets/scenes/hero-hanoi-station.webp`
* **Nội dung:** Đúng căn phòng trong ảnh gốc nhưng ở trạng thái tĩnh trước khi Columbina vào ca trực: ghế xoay để trống, các màn hình máy tính đang hiển thị radar quét và bản đồ thế giới, chiếc máy thu ở góc phải đang chờ bắt tín hiệu, ngoài cửa sổ là thành phố Hà Nội về đêm.
* **Prompt:**

```text
2D digital illustration, clean dark line art, cozy graphic novel aesthetic, cel-shaded anime style, exact interior match to the reference image. Wide-angle shot of the empty Hanoi satellite ground station control room at late night. In the center is an empty blue ergonomic office chair facing an expansive wooden L-shaped corner desk. On the desk are retro bulky CRT monitors on the left and modern flat-panel screens in the center and right, glowing with mint-green, cyan, and deep blue telemetry graphics, radar sweeps, and planetary orbits. On the right corner rests the vintage gray radio receiver with its vertical antenna. An open notebook with a pen and a canvas tote bag on the floor complete the studious scene. Behind the desk, floor-to-ceiling panoramic glass windows reveal the tranquil Hanoi city skyline at night with soft bokeh lights under a deep indigo sky. Quiet, atmospheric, serene sci-fi mood, crisp outlines, no people, no text, no letters, no words --ar 16:9 --style raw --v 6.0
```

---

### ẢNH W2: THỰC ĐỊA MẶT TRĂNG – XE ĐO BỤI DUSTER CÔ ĐƠN (GÓC CẬN CẢNH)
* **Vị trí web:** Nền cảnh Lá thư thứ năm `data-scene="letter5"` hoặc popup Hồ sơ DUSTER
* **Tên file ảnh:** `assets/scenes/duster-surface-moon.webp`
* **Nội dung:** Cận cảnh xe tự hành nhỏ DUSTER 4 bánh trên nền cát xám Mặt Trăng, vẽ theo cùng phong cách nét viền đen cel-shaded của ảnh gốc.
* **Prompt:**

```text
2D digital illustration, clean dark line art, cel-shaded graphic novel aesthetic, consistent with the art style of the reference image. High-contrast close-up view of the lunar surface under a deep velvet-black sky filled with crystalline stars. Resting on the fine powdery gray lunar regolith is the DUSTER micro-rover—a compact, resilient robotic rover with four sturdy wire-mesh wheels, a small solar panel, and delicate golden electrostatic dust analyzer sensors. Long dramatic shadows stretch across the cratered soil. In the distance, a small glowing crescent Earth hangs serenely in the cosmos. Crisp black outlines, smooth cel-shading, poignant and brave atmosphere, no text, no letters, no words, no speech bubbles --ar 16:9 --style raw --v 6.0
```

---

## 4. BẢNG THAM SỐ MIDJOURNEY V6 DÙNG CHO TOÀN BỘ BỘ ẢNH

Để Midjourney giữ trọn vẹn nét vẽ và nhân vật của ảnh gốc bạn vừa tải lên:

1. **Bước 1:** Tải ảnh gốc bạn vừa cung cấp lên Discord / Midjourney, nhấn chuột phải chọn **Copy Image Link** (URL có dạng `https://.../media_....webp` hoặc `.png`).
2. **Bước 2:** Khi chạy prompt, thêm tham số phong cách (`--sref`) và tham số nhân vật (`--cref`) như sau:

| Nhóm Cảnh | Tham số tham chiếu cần gắn ở cuối Prompt |
| :--- | :--- |
| **Cảnh S1, S2, S3, S4, S5, S6** (Có Columbina) | `[PROMPT_TIẾNG_ANH] --cref [URL_ẢNH_GỐC] --cw 85 --sref [URL_ẢNH_GỐC] --sw 100 --ar 16:9 --style raw --v 6.0 --no text, typography, letters, watermark, speech bubbles` |
| **Cảnh S7** (Năm 2076, nhân vật mới quay lưng) | `[PROMPT_TIẾNG_ANH] --sref [URL_ẢNH_GỐC] --sw 100 --ar 16:9 --style raw --v 6.0 --no text, typography, letters, watermark, speech bubbles` *(Không dùng `--cref` để tránh gán mặt Columbina)* |
| **Ảnh W1, W2** (Cảnh phòng trống / Thực địa) | `[PROMPT_TIẾNG_ANH] --sref [URL_ẢNH_GỐC] --sw 100 --ar 16:9 --style raw --v 6.0 --no text, typography, letters, watermark, speech bubbles` *(Không dùng `--cref`)* |

---

## 5. CÁCH ĐƯA VÀO CODE WEB SAU KHI SINH ẢNH

Sau khi tải ảnh về, chỉ cần chuyển định dạng sang `.webp` (độ phân giải `1920x1080`), đặt vào thư mục `assets/story/` và mở file [js/flow-data.js](file:///d:/Project/NasaSpaceAppHanoi2026/Lunamaris_NASA_Hackathon_2026/js/flow-data.js) thêm đường dẫn ảnh vào slide đầu của mỗi chuỗi:

```javascript
// js/flow-data.js
intro: [
  { id: "intro-1", world: "earth", speaker: null, img: "assets/story/story-intro.webp", text_vi: "...", text_en: "..." },
  ...
],
to_ch2: [
  { id: "to2-1", world: "moon", speaker: C, img: "assets/story/story-to-ch2.webp", text_vi: "...", text_en: "..." },
  ...
],
to_ch3: [
  { id: "to3-1", world: "moon", speaker: C, img: "assets/story/story-to-ch3.webp", text_vi: "...", text_en: "..." },
  ...
],
to_ch4: [
  { id: "to4-1", world: "mars", speaker: C, img: "assets/story/story-to-ch4.webp", text_vi: "...", text_en: "..." },
  ...
],
to_artemis: [
  { id: "toA-1", world: "mars", speaker: C, img: "assets/story/story-to-artemis.webp", text_vi: "...", text_en: "..." },
  ...
],
ending: [
  { id: "end-1", world: "moon", speaker: null, img: "assets/story/story-ending.webp", text_vi: "...", text_en: "..." },
  ...
],
future: [
  { id: "fut-1", world: "earth", speaker: null, img: "assets/story/story-future.webp", text_vi: "...", text_en: "..." },
  ...
]
```

Web sẽ tự động hiển thị mượt mà trên mọi thiết bị và giữ nguyên toàn bộ phụ đề, nút bấm tương tác!
