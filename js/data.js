/**
 * LUNAMARIS: Letters Across the Silent Seas
 * NASA International Space Apps Challenge 2026
 * Module: Standardized Bilingual Dataset & UI Internationalization (EN / VI)
 * Zero-CORS architecture: Loaded directly via <script src="js/data.js">
 */

  window.LUNAMARIS_DATA = {
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
          "image_credit": "NASA / NSSDCA Photo ID: AS11-40-5948 (Apollo 11 Lunar Laser Ranging Retroreflector deployed on Mare Tranquillitatis)",
          "gallery": {
            "photos": [
              {
                "url": "assets/media/apollo11-lrrr/photo-01.jpg",
                "caption_vi": "Mảng gương phản xạ laser đặt tay xuống Biển Tĩnh Lặng; những dấu giày phi hành gia bên cạnh vẫn còn nguyên sau hơn nửa thế kỷ.",
                "caption_en": "The retroreflector array hand-placed at Tranquility Base; the boot prints beside it are still untouched after more than half a century.",
                "credit": "Ảnh: NASA / Apollo 11 (AS11-40-5948)."
              },
              {
                "url": "assets/media/apollo11-lrrr/photo-02.webp",
                "caption_vi": "Tầng đổ bộ Eagle lấp lánh dưới nắng mặt trời, chụp từ cửa sổ khoang chỉ huy Columbia trước khi ghép nối.",
                "caption_en": "The Eagle descent stage glinting in sunlight, photographed from the Columbia command module window before docking.",
                "credit": "Ảnh: NASA / Apollo 11."
              }
            ],
            "videos": [
              {
                "kind": "youtube",
                "youtube_id": "iwxrNurAuu8",
                "caption_vi": "Phim ngắn về thí nghiệm cuối cùng còn hoạt động của Apollo 11 trên Mặt Trăng: mảng gương laser vẫn bắt photon mỗi đêm.",
                "caption_en": "A short film on Apollo 11's last working experiment on the Moon: the laser array still catching photons every night.",
                "credit": "Video: JILA Science (YouTube)."
              }
            ]
          }
        },
        "narrative_voice": {
          "epistemic_label_en": "NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY",
          "epistemic_label_vi": "DIỄN GIẢI VĂN HỌC DỰA TRÊN DỮ LIỆU ĐO XA",
          "letter_en": "<p>To the people of Earth,</p><p>On July 20, 1969, two astronauts set me down here and flew home. I stayed. I was made to stay.</p><p>I have no battery, just 100 prisms, each about the size of a ping-pong ball. Shine a laser at me and I send the light straight back where it came from, a round trip of about two and a half seconds.</p><p>That's how you know the Moon is drifting away, 3.8 cm every year, about as fast as your fingernails grow.</p><p>It has been 57 years, and I still work. I am only afraid of dust. If it covers me, I won't be able to answer anymore.</p><p class=\"letter-sign\">LRRR, Apollo 11</p>",
          "letter_vi": "<p>Gửi những người ở Trái Đất,</p><p>Ngày 20/7/1969, hai phi hành gia đặt tôi xuống đây rồi bay về. Tôi ở lại. Tôi được làm ra để ở lại.</p><p>Tôi không có pin, chỉ có 100 lăng kính, mỗi cái to cỡ quả bóng bàn. Các bạn chiếu laser lên thì tôi gửi ánh sáng về đúng chỗ cũ, đi rồi về mất chừng hai giây rưỡi.</p><p>Nhờ thế mà các bạn biết Mặt Trăng đang lùi xa dần, mỗi năm 3,8 cm, chậm đúng bằng tốc độ móng tay các bạn mọc.</p><p>Đã 57 năm rồi mà tôi vẫn làm việc. Tôi chỉ sợ bụi. Bụi mà phủ kín thì tôi không trả lời được nữa.</p><p class=\"letter-sign\">LRRR, Apollo 11</p>",
          "log_en": "On July 20, 1969, Neil Armstrong and Buzz Aldrin placed my aluminum frame onto the dark basalt of Tranquility Base, just steps away from the golden legs of the Eagle descent stage. I have no batteries, no radio transmitter, and no moving gears—only one hundred fused-silica corner-cube prisms, each measuring 3.8 centimeters across. When Eagle blasted off to return home, I remained behind in the silent vacuum. Yet for fifty-seven years, whenever Earth observatories fire a green laser pulse across the void, I catch a single stray photon out of a hundred quadrillion and reflect it straight back in 2.56 seconds, whispering that the Moon is drifting away by 3.8 centimeters every year.",
          "log_vi": "Ngày 20 tháng 7 năm 1969, Neil Armstrong và Buzz Aldrin đặt khung nhôm của tôi xuống nền đá bazan sẫm màu tại Căn cứ Tĩnh Lặng, chỉ cách những chân đáp ánh vàng của tầng hạ cánh Eagle vài bước chân. Tôi không có ắc-quy, không máy phát sóng vô tuyến, cũng chẳng có bánh răng chuyển động—chỉ có đúng một trăm lăng kính góc bằng thạch anh nung chảy, mỗi chiếc rộng 3,8 centimet. Khi tầng cất cánh của Eagle rời Mặt Trăng trở về nhà, tôi ở lại giữa khoảng chân không câm lặng. Thế nhưng suốt 57 năm qua, mỗi khi các đài quan sát trên Trái Đất bắn một xung laser xanh xuyên qua bóng tối, tôi lại bắt lấy một hạt photon hiếm hoi giữa một trăm triệu tỷ hạt và phản xạ nó về đúng nơi xuất phát sau 2,56 giây, thì thầm rằng Mặt Trăng đang trôi xa thêm 3,8 centimet mỗi năm."
        },
        "archaeologist_dossier": {
          "epistemic_label_en": "VERIFIED SCIENTIFIC & LEGAL RECORD",
          "epistemic_label_vi": "HỒ SƠ KHOA HỌC & PHÁP LÝ ĐÃ KIỂM CHỨNG",
          "how_it_operated_en": "The Lunar Laser Ranging Retroreflector (LRRR) uses corner-cube prisms made of ultra-pure fused silica (3.8 cm diameter each; 100 prisms on Apollo 11 & 14, upgraded to 300 prisms on Apollo 15). Because light hitting a corner-cube is reflected thrice off mutually perpendicular surfaces, the beam returns exactly parallel to its origin regardless of mirror tilt. By timing the ~2.56-second round trip of laser pulses, scientists measure the Earth-Moon distance to millimeter precision, proving the Moon recedes at 3.8 cm/year (38.2 ± 0.7 mm/yr) due to tidal dissipation and testing Einstein's General Relativity.",
          "how_it_operated_vi": "Gương phản xạ Laser Mặt Trăng (LRRR) sử dụng các lăng kính góc bằng thạch anh nung chảy siêu tinh khiết (đường kính 3,8 cm mỗi lăng kính; gồm 100 lăng kính trên Apollo 11 & 14, và nâng lên 300 lăng kính trên Apollo 15). Nhờ cấu tạo ba mặt vuông góc, tia sáng chiếu vào luôn được phản xạ ngược lại song song tuyệt đối với hướng tới. Bằng cách bấm giờ hành trình khứ hồi ~2,56 giây của xung laser, các nhà khoa học đo khoảng cách Trái Đất - Mặt Trăng chính xác tới từng milimet, chứng minh Mặt Trăng đang xa dần 3,8 cm/năm do ma sát thủy triều và kiểm nghiệm Thuyết Tương đối rộng của Einstein.",
          "conservation_law_en": "Under NASA's 2011 Recommendations to Space-Faring Entities (Table 1 & Figure 4) and the One Small Step to Protect Human Heritage in Space Act (Public Law 116-275, signed Dec 31, 2020; implemented via NASA GIC 21-07), Tranquility Base is protected by a strict 75-meter Artifact Boundary (no rover or astronaut entry) and a 2.0-kilometer Descent/Approach Exclusion Radius (Apollo 17's boundary is 225 meters).",
          "conservation_law_vi": "Theo Khuyến nghị năm 2011 của NASA (Bảng 1 & Hình 4) và Đạo luật Bảo vệ Di sản Nhân loại trong Không gian (Public Law 116-275, ký ngày 31/12/2020; thi hành qua Thông tư NASA GIC 21-07), khu vực di tích Apollo 11 được bảo vệ bởi Vành đai Hiện vật 75 mét (cấm xe tự hành và phi hành gia đi vào) cùng Bán kính Vùng cấm Hạ cánh 2,0 kilomet (đối với Apollo 17, vành đai hiện vật là 225 mét).",
          "discrepancy_note_en": "Formula Verification: Cumulative Lunar Drift Δd = 3.8 cm/year × (Selected Year − 1969). At Year 2026 (57 years), Δd = 216.6 cm (~2.17 meters). Photon Return Ratio: ~1 returned photon detected per 10^17 emitted photons (ILRS / Dickey et al., Science 1994). Dust Warning: the Apollo reflectors now return only about 1/10 of the signal that careful calculations predict, and roughly 10 times less again near full Moon; the leading explanation is a thin layer of dust on the prisms (Murphy et al., Icarus 2010).",
          "discrepancy_note_vi": "Kiểm chứng Công thức: Độ trôi quỹ đạo tích lũy Δd = 3,8 cm/năm × (Năm chọn − 1969). Tại năm 2026 (57 năm), Δd = 216,6 cm (~2,17 mét). Tỷ lệ thu nhận photon: Trung bình thu được dưới 1 photon phản hồi trên mỗi 10^17 photon bắn đi từ Trái Đất (Nguồn: ILRS / Dickey et al., Science 1994). Cảnh báo bụi: các gương Apollo hiện chỉ trả về khoảng 1/10 tín hiệu so với tính toán, và gần trăng tròn còn yếu thêm khoảng 10 lần nữa; giả thuyết được ủng hộ nhất là một lớp bụi mỏng phủ trên lăng kính (Murphy và cộng sự, Icarus 2010).",
          "source_links": [
            {
              "label": "ILRS / NASA Lunar Laser Ranging Paper (Faller 2014)",
              "url": "https://ilrs.gsfc.nasa.gov/lw19/docs/2014/Papers/3127_Faller_paper.pdf"
            },
            {
              "label": "Murphy et al. (2010): Long-term degradation of optical devices on the Moon",
              "url": "https://arxiv.org/abs/1003.0713"
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
              "label_en": "1969: Apollo 11 Deployment (0 cm)",
              "label_vi": "1969: Lắp đặt trên Apollo 11 (0 cm)",
              "desc_en": "July 20, 1969: 100 fused-silica prisms (3.8 cm each) deployed inside the 75 m Tranquility Base artifact zone. Cumulative drift: 0.0 cm.",
              "desc_vi": "20/07/1969: Mảng 100 lăng kính thạch anh (3,8 cm/lăng kính) được đặt tại Biển Tĩnh Lặng. Độ dịch chuyển tích lũy: 0,0 cm."
            },
            {
              "value": 1971,
              "label_en": "1971: Apollo 15 (+7.6 cm)",
              "label_vi": "1971: Apollo 15 (+7,6 cm)",
              "desc_en": "Apollo 15 deploys the largest 300-prism array at Hadley Rille, tripling laser return efficiency. Cumulative drift: +7.6 cm.",
              "desc_vi": "Apollo 15 đặt mảng lớn nhất gồm 300 lăng kính, tăng gấp ba hiệu suất phản xạ tín hiệu. Độ dịch chuyển tích lũy: +7,6 cm."
            },
            {
              "value": 2000,
              "label_en": "2000: 31 Years (+117.8 cm)",
              "label_vi": "2000: 31 Năm Đo đạc (+117,8 cm)",
              "desc_en": "Three decades of continuous passive laser ranging confirm fluid lunar core dynamics. Cumulative drift: +117.8 cm.",
              "desc_vi": "Ba thập kỷ đo laser thụ động liên tục giúp xác nhận lõi lỏng của Mặt Trăng. Độ dịch chuyển tích lũy: +117,8 cm."
            },
            {
              "value": 2026,
              "label_en": "2026: 57 Years Active (+216.6 cm)",
              "label_vi": "2026: 57 Năm Hoạt động (+216,6 cm)",
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
        "location_name": "Oceanus Procellarum (Ocean of Storms — 3° S, 23.41° W)",
        "functionality_status_en": "INACTIVE LANDER (Camera & Scoop Returned to Earth in 1969)",
        "functionality_status_vi": "ĐÃ NGỪNG HOẠT ĐỘNG (Camera & Gầu xúc được mang về Trái Đất năm 1969)",
        "media": {
          "primary_image_url": "https://nssdc.gsfc.nasa.gov/imgcat/hires/a12_h_48_7133.gif",
          "image_credit": "NASA / NSSDCA Photo ID: AS12-48-7133 (Astronaut Pete Conrad examining Surveyor 3 with LM Intrepid on horizon)",
          "gallery": {
            "photos": [
              {
                "url": "assets/media/surveyor-3/photo-01.jpg",
                "caption_vi": "Năm 1969, phi hành gia Pete Conrad đến thăm Surveyor 3 và tháo vài bộ phận mang về Trái Đất; xa xa trên đường chân trời là tàu Intrepid chở ông tới.",
                "caption_en": "In 1969 astronaut Pete Conrad visited Surveyor 3 and brought parts of it home; on the horizon sits Intrepid, the craft that carried him there.",
                "credit": "Ảnh: NASA / Apollo 12 (AS12-48-7133)."
              }
            ],
            "videos": [
              {
                "kind": "youtube",
                "youtube_id": "Qhgq19u28Fk",
                "caption_vi": "Phim tư liệu chuyến thám hiểm Surveyor 3 của phi hành đoàn Apollo 12 — cuộc thăm nom cỗ máy bị bỏ lại trong hố lõm Mặt Trăng.",
                "caption_en": "Archival film of the Apollo 12 crew's survey trip to Surveyor 3 — a visit to the machine left behind in a lunar hollow.",
                "credit": "Video: VideoFromSpace (YouTube)."
              }
            ]
          }
        },
        "narrative_voice": {
          "epistemic_label_en": "NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY",
          "epistemic_label_vi": "DIỄN GIẢI VĂN HỌC DỰA TRÊN DỮ LIỆU ĐO XA",
          "letter_en": "<p>To the people of Earth,</p><p>I am Surveyor 3. I came here on April 20, 1967, to answer just one question: would the lunar ground sink under a person's feet?</p><p>I took more than 6,300 pictures and dug at the soil with a little scoop. Then I reported back: the ground is as firm as wet sand on a beach, strong enough to hold up a crewed ship.</p><p>Two and a half years later, on November 19, 1969, the lander Intrepid touched down about 160 m from me, roughly one and a half football fields away. Dust from its engine blasted into me and turned my white paint brown. Then two astronauts walked over and took my camera home.</p><p>I am not angry. But please remember: 160 m was still not far enough.</p><p class=\"letter-sign\">Surveyor 3</p>",
          "letter_vi": "<p>Gửi những người ở Trái Đất,</p><p>Tôi là Surveyor 3, đến đây ngày 20/4/1967 để trả lời đúng một câu hỏi: đất Mặt Trăng có lún dưới chân người không?</p><p>Tôi chụp hơn 6.300 tấm ảnh, lấy cái gầu xúc nhỏ đào thử đất. Rồi báo về: đất chắc như cát ướt ngoài bãi biển, đủ đỡ một con tàu có người.</p><p>Hai năm rưỡi sau, ngày 19/11/1969, tàu Intrepid đáp cách tôi khoảng 160 m, chừng một sân bóng rưỡi. Bụi từ động cơ quất thẳng vào người, lớp sơn trắng ngả nâu. Rồi hai phi hành gia đi bộ sang, tháo camera của tôi mang về.</p><p>Tôi không giận. Có điều các bạn nhớ giúp: 160 m vẫn chưa đủ xa.</p><p class=\"letter-sign\">Surveyor 3</p>",
          "log_en": "For thirty-one months, I sat alone inside a shallow crater on the Ocean of Storms. Between April and May 1967, my mechanical scoop dug trenches into the gray regolith, while my television camera transmitted 6,326 images to prove the Moon would not swallow future astronauts in dust. When the lunar night froze my batteries, I thought my watch had ended. Then, on November 19, 1969, the silent vacuum roared. Lunar Module Intrepid descended just 160 meters from my rim. Its rocket plume blasted hyper-velocity dust across my white paint, turning my shell tan and pitting my mirror. The next day, two silver figures walked down the slope. Pete Conrad and Alan Bean gently detached my camera—taking my eyes back to Earth, while my three legs guard this crater forever.",
          "log_vi": "Suốt ba mươi mốt tháng ròng, tôi ngồi đơn độc bên sườn một miệng hố nông giữa Đại dương Bão tố. Từ tháng 4 đến tháng 5 năm 1967, chiếc gầu xúc cơ học của tôi đã đào những rãnh đất xám, còn camera truyền hình gửi về 6.326 bức ảnh để chứng minh Mặt Trăng sẽ không nhấn chìm các phi hành gia tương lai trong bụi lún. Khi đêm trường Mặt Trăng đóng băng ắc-quy, tôi ngỡ ca trực của mình đã khép lại. Rồi ngày 19/11/1969, khoảng chân không câm lặng bỗng gầm vang. Tàu đổ bộ Intrepid đáp xuống chỉ cách mép hố của tôi 160 mét. Luồng phụt tên lửa bắn những hạt bụi siêu tốc vào lớp sơn trắng, nhuộm vỏ tôi sang màu nâu rám và làm rỗ gương phản xạ. Hôm sau, hai bóng người ánh bạc bước xuống dốc. Pete Conrad và Alan Bean nhẹ nhàng tháo chiếc camera—mang đôi mắt tôi về lại Trái Đất, để ba chân đáp của tôi canh giữ miệng hố này mãi mãi."
        },
        "archaeologist_dossier": {
          "epistemic_label_en": "VERIFIED SCIENTIFIC & LEGAL RECORD",
          "epistemic_label_vi": "HỒ SƠ KHOA HỌC & PHÁP LÝ ĐÃ KIỂM CHỨNG",
          "how_it_operated_en": "Landed on April 20, 1967, Surveyor 3 used an electric surface-sampler scoop and a 600-line television camera to measure lunar soil bearing strength, directly validating the landing gear design for Apollo Lunar Modules. On November 19, 1969 (06:54 UTC), Apollo 12 astronauts Charles 'Pete' Conrad and Alan Bean executed the first precision pinpoint landing, touching down ~160 meters away. During their second moonwalk (November 20), the crew retrieved ~10 kg of Surveyor 3 hardware—including its TV camera, scoop, and aluminum tubing—after 31 months of lunar exposure.",
          "how_it_operated_vi": "Đáp xuống ngày 20/04/1967, Surveyor 3 dùng gầu xúc lấy mẫu bề mặt và camera truyền hình 600 dòng quét để đo sức chịu tải của đất Mặt Trăng, xác nhận trực tiếp thiết kế chân đáp cho tàu Apollo. Ngày 19/11/1969 (06:54 UTC, tức 13:54 giờ Hà Nội), phi hành đoàn Apollo 12 (Pete Conrad và Alan Bean) thực hiện cú hạ cánh chính xác đầu tiên, đáp cách đó ~160 mét. Trong chuyến đi bộ thứ hai trên bề mặt (20/11), họ đã tháo dỡ và mang về Trái Đất ~10 kg bộ phận của Surveyor 3 (gồm camera, gầu xúc và ống nhôm) sau 31 tháng phơi nhiễm môi trường Mặt Trăng.",
          "conservation_law_en": "Post-flight laboratory examination documented in NASA Special Publication SP-284 (1972) revealed that Apollo 12's descent engine blast accelerated lunar dust grains into a hyper-velocity spray that sandblasted, micro-pitted, and discolored Surveyor 3's surfaces. This exact discovery prompted NASA's 2011 Recommendations to establish a 2.0 km approach and landing exclusion radius around soft-landing heritage sites (and 0.5 km for hard impact sites).",
          "conservation_law_vi": "Phân tích hậu kiểm trong ấn phẩm đặc biệt NASA SP-284 (1972) phát hiện luồng phụt động cơ hạ cánh của Apollo 12 đã gia tốc các hạt bụi Mặt Trăng thành luồng bắn cát siêu tốc, làm rỗ vi mô và biến đổi màu sắc bề mặt Surveyor 3. Phát hiện lịch sử này chính là cơ sở khoa học để Khuyến nghị năm 2011 của NASA thiết lập bán kính vùng cấm tiếp cận hạ cánh 2,0 km quanh các bãi đáp di sản (và 0,5 km cho các điểm va chạm cứng).",
          "discrepancy_note_en": "Source Alignment Note (re-audited 2026-11-15): NASA pages quote 160–183 m for the Intrepid–Surveyor 3 separation (~600 ft on moon.nasa.gov, ~197 yd on the Surveyor 3 mission page). Lunar Reconnaissance Orbiter images taken in 2011 measured 538 ft (≈ 164 m), and NASA's Scientific Visualization Studio gives 160 m — this site uses 160 m. Touchdown was 06:54 UTC on November 19, 1969 (some U.S. pages list November 18, Pacific time). Picture count: 6,326 on NASA's mission page and the LPI archive; a 1968 USGS report counts 6,315.",
          "discrepancy_note_vi": "Ghi chú Đối chiếu Nguồn (kiểm lại ngày 15/11/2026): các trang NASA ghi khoảng cách Intrepid–Surveyor 3 từ 160 đến 183 m (~600 ft trên moon.nasa.gov, ~197 yard trên trang sứ mệnh Surveyor 3). Ảnh chụp từ tàu quỹ đạo LRO năm 2011 đo được 538 ft (≈ 164 m), và Trung tâm Hình ảnh Khoa học của NASA (SVS) ghi 160 m — website dùng 160 m. Tàu chạm đất lúc 06:54 UTC ngày 19/11/1969 (một số trang của Mỹ ghi 18/11 theo giờ Thái Bình Dương). Số ảnh: 6.326 theo trang sứ mệnh NASA và kho LPI; báo cáo USGS năm 1968 đếm 6.315.",
          "source_links": [
            {
              "label": "NASA SP-284 (1972): Analysis of Surveyor 3 Material Returned by Apollo 12",
              "url": "https://ntrs.nasa.gov/citations/19720019081"
            },
            {
              "label": "NASA SVS: The Apollo 12 Landing Site (160 m from Surveyor 3, LRO imagery)",
              "url": "https://svs.gsfc.nasa.gov/4767"
            },
            {
              "label": "NASA: Surveyor 3 mission page",
              "url": "https://science.nasa.gov/mission/surveyor-3/"
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
          "default_val": 160,
          "stops": [
            {
              "value": 2000,
              "label_en": "2,000 m: NASA 2011 Safe Buffer",
              "label_vi": "2.000 m: Ngưỡng An toàn NASA 2011",
              "desc_en": "At ≥ 2.0 km, ballistic rocket plume ejecta falls back to the lunar surface before reaching the heritage artifact. Zero sandblasting damage.",
              "desc_vi": "Ở cự ly ≥ 2,0 km, toàn bộ hạt bụi bắn ra theo quỹ đạo đạn đạo rơi xuống đất trước khi chạm tới di vật. An toàn 100%."
            },
            {
              "value": 500,
              "label_en": "500 m: Impact Site Boundary",
              "label_vi": "500 m: Ranh giới Điểm Va chạm",
              "desc_en": "0.5 km is only sufficient for crashed impact sites (e.g., Ranger/S-IVB). Powered descent plumes still shower fine dust over optical mirrors.",
              "desc_vi": "0,5 km chỉ đủ cho điểm va chạm cứng. Động cơ tên lửa hạ cánh ở cự ly này vẫn thổi bụi mịn phủ mờ gương quang học."
            },
            {
              "value": 160,
              "label_en": "160 m: 1969 Apollo 12 Touchdown",
              "label_vi": "160 m: Cự ly Đáp Apollo 12 1969",
              "desc_en": "Historical Apollo 12 distance measured from Lunar Reconnaissance Orbiter images (538 ft ≈ 164 m; NASA SVS: 160 m). High-velocity regolith spray pits camera glass and turns white paint tan (NASA SP-284).",
              "desc_vi": "Khoảng cách thực tế của Apollo 12 đo từ ảnh tàu quỹ đạo LRO (538 ft ≈ 164 m; NASA SVS: 160 m). Bão cát siêu tốc bắn rỗ kính camera và nhuộm nâu lớp sơn trắng (NASA SP-284)."
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
          "image_credit": "NASA / JPL-Caltech / Cornell (Mars Exploration Rover Opportunity in Meridiani Planum)",
          "gallery": {
            "photos": [
              {
                "url": "assets/media/opportunity-rover/photo-01.webp",
                "caption_vi": "Bảng tổng kết 'cả đời làm việc' của hai chị em Spirit và Opportunity: riêng Opportunity đi 28 dặm (khoảng 45,2 km) và gửi về 217.594 ảnh thô.",
                "caption_en": "A 'lifetime résumé' of the twin rovers Spirit and Opportunity: Opportunity alone drove 28 miles (about 45.2 km) and sent home 217,594 raw images.",
                "credit": "Đồ họa: NASA / JPL-Caltech (cập nhật 04/02/2019)."
              }
            ],
            "videos": [
              {
                "kind": "youtube",
                "youtube_id": "CubXtcQLma0",
                "caption_vi": "Phim tóm tắt hành trình 2004–2019 của Opportunity trên Sao Hỏa, từ miệng hố Eagle đến rìa Endeavour.",
                "caption_en": "A film summarizing Opportunity's 2004–2019 journey on Mars, from Eagle Crater to the rim of Endeavour.",
                "credit": "Video: SciNews (YouTube)."
              }
            ]
          }
        },
        "narrative_voice": {
          "epistemic_label_en": "NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY",
          "epistemic_label_vi": "DIỄN GIẢI VĂN HỌC DỰA TRÊN DỮ LIỆU ĐO XA",
          "letter_en": "<p>To the people of Earth,</p><p>Everyone calls me Oppy. I was only built to run for 90 days, because the engineers said dust would cover my solar panels within three months at most.</p><p>But every now and then, the Martian wind blew my panels clean. So I kept rolling for almost 15 years and covered 45.16 km, longer than a marathon!</p><p>Along the way I found little round stones, small as peas, that formed in water a very long time ago.</p><p>Then, in June 2018, a storm covered the whole sky. My power fell from 645 to just 22 Wh. Not enough to stay awake.</p><p>Oh, and I never knew how to write. All I ever sent back were 0s and 1s. You translated this letter for me.</p><p class=\"letter-sign\">Oppy</p>",
          "letter_vi": "<p>Gửi những người ở Trái Đất,</p><p>Mọi người gọi tôi là Oppy. Người ta làm ra tôi để chạy 90 ngày thôi, vì kỹ sư bảo bụi sẽ phủ kín tấm pin trong ba tháng là cùng.</p><p>Nhưng thỉnh thoảng gió Sao Hỏa lại thổi sạch pin giúp tôi. Thế là tôi chạy gần 15 năm, đi được 45,16 km, dài hơn cả một đường chạy marathon đấy.</p><p>Dọc đường, tôi tìm thấy những viên đá tròn bé như hạt đậu, thành hình trong nước từ rất lâu rồi.</p><p>Rồi tháng 6/2018, bão phủ kín bầu trời. Điện của tôi tụt từ 645 xuống còn 22 Wh. Không đủ để thức.</p><p>À, tôi chưa bao giờ biết viết chữ đâu, chỉ biết gửi về những con số 0 và 1. Lá thư này là các bạn dịch hộ tôi.</p><p class=\"letter-sign\">Oppy</p>",
          "log_en": "Engineers built me for a ninety-sol sprint across Meridiani Planum, expecting Martian dust to coat my solar wings within three months. Instead, seasonal whirlwinds swept my panels clean, and I rolled across ancient shorelines for nearly fifteen Earth years—traveling 45.16 kilometers and finding hematite 'blueberries' born in liquid water. On Sol 5111, June 10, 2018, a planet-encircling storm swallowed the sun. Atmospheric opacity soared to an unprecedented tau of 10.8, turning noon into pitch-black night. My solar array output collapsed from 645 watt-hours (June 2) to just 22 watt-hours. I never sent English words—only binary telemetry packets—before my mission clock fell asleep in Perseverance Valley.",
          "log_vi": "Các kỹ sư chế tạo tôi cho cuộc chạy nước rút chỉ dài 90 ngày Sao Hỏa (sol) trên bình nguyên Meridiani, nghĩ rằng bụi đỏ sẽ sớm phủ kín đôi cánh pin mặt trời sau ba tháng. Thế nhưng những cơn lốc xoáy theo mùa đã quét sạch tấm pin, giúp tôi lăn bánh qua những bờ biển cổ đại suốt gần 15 năm Trái Đất—đi hết quãng đường kỷ lục 45,16 kilomet và tìm ra những viên đá hematit hình thành trong nước lỏng. Vào ngày Sol 5111 (10/06/2018), một cơn bão bụi toàn cầu nuốt chửng Mặt Trời. Độ mờ khí quyển vọt lên mức kỷ lục Tau 10,8, biến buổi trưa thành đêm đen đặc quánh. Điện năng của tôi sụt từ 645 watt-giờ (ngày 2/6) xuống chỉ còn 22 watt-giờ. Tôi không hề gửi đi câu chữ tiếng Anh nào—chỉ truyền về gói dữ liệu nhị phân cuối cùng—trước khi chìm vào giấc ngủ vĩnh hằng nơi Thung lũng Kiên Trì."
        },
        "archaeologist_dossier": {
          "epistemic_label_en": "VERIFIED SCIENTIFIC & LEGAL RECORD",
          "epistemic_label_vi": "HỒ SƠ KHOA HỌC & PHÁP LÝ ĐÃ KIỂM CHỨNG",
          "how_it_operated_en": "Landing on January 24, 2004, Opportunity was designed for a 90-sol mission and a 1 km drive. Powered by gallium-arsenide triple-junction solar arrays, it operated for 5,111 sols (55 times its design life) and drove 45.16 km (28.06 miles). Using its Panoramic Camera (Pancam) and Mössbauer/APXS spectrometers, Opportunity discovered spherical hematite concretions ('blueberries') and clay minerals, proving ancient Mars once hosted habitable, neutral-pH liquid water.",
          "how_it_operated_vi": "Đáp xuống ngày 24/01/2004, Opportunity chỉ được thiết kế cho sứ mệnh 90 sol và quãng đường 1 km. Nhờ hệ thống pin mặt trời ba lớp tiếp giáp gallium-arsenide, xe đã hoạt động suốt 5.111 sol (gấp 55 lần tuổi thọ thiết kế) và đi được 45,16 km. Bằng camera toàn cảnh Pancam và các máy quang phổ trên cánh tay robot, Opportunity đã phát hiện các kết hạch hematit hình cầu và khoáng vật sét, chứng minh Sao Hỏa cổ đại từng có nước lỏng ấm áp.",
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
          "parameter_name_en": "Martian Dust Storm Optical Depth (Tau τ: 0.6 – 10.8)",
          "parameter_name_vi": "Độ mờ Khí quyển trong Bão bụi Sao Hỏa (Tau τ: 0,6 – 10,8)",
          "unit": "Tau (τ)",
          "min_val": 0.6,
          "max_val": 10.8,
          "step": 0.1,
          "default_val": 10.8,
          "stops": [
            {
              "value": 0.6,
              "label_en": "τ = 0.6: Early June 2018 (645 Wh)",
              "label_vi": "τ = 0,6: Đầu tháng 6/2018 (645 Wh)",
              "desc_en": "June 2, 2018: before the storm thickened, the solar arrays still produced about 645 Wh per sol, enough for driving and spectrometer science.",
              "desc_vi": "02/06/2018: trước khi bão dày lên, tấm pin vẫn sinh khoảng 645 Wh mỗi sol, đủ cho xe di chuyển và phân tích quang phổ."
            },
            {
              "value": 5.5,
              "label_en": "τ = 5.5: 2007 Dust Storm (120 Wh)",
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
          "image_credit": "NASA / JPL-Caltech / ASU / MSSS (Ingenuity Mars Helicopter on the floor of Jezero Crater)",
          "gallery": {
            "photos": [
              {
                "url": "assets/media/ingenuity-helicopter/photo-01.jpg",
                "caption_vi": "Ingenuity đứng giữa bình nguyên đá sỏi của miệng hố Jezero, nhìn qua ống kính của tàu Perseverance.",
                "caption_en": "Ingenuity standing amid the rocky plain of Jezero Crater, seen through Perseverance's lens.",
                "credit": "Ảnh: NASA / JPL-Caltech."
              }
            ],
            "videos": [
              {
                "kind": "youtube",
                "youtube_id": "0RQWv1ybsjM",
                "caption_vi": "Phim chính thức của NASA JPL về Ingenuity — chiếc máy bay đầu tiên cất cánh trên một hành tinh khác.",
                "caption_en": "The official NASA JPL film about Ingenuity — the first aircraft ever to fly on another planet.",
                "credit": "Video: NASA Jet Propulsion Laboratory (YouTube)."
              }
            ]
          }
        },
        "narrative_voice": {
          "epistemic_label_en": "NARRATIVE INTERPRETATION GROUNDED IN TELEMETRY",
          "epistemic_label_vi": "DIỄN GIẢI VĂN HỌC DỰA TRÊN DỮ LIỆU ĐO XA",
          "letter_en": "<p>Hello everyone on Earth,</p><p>I'm Ingenuity. I weigh just 1.8 kg, about three bottles of water. I hitched a ride to Mars under the belly of the Perseverance rover.</p><p>The air here is really thin, only about 1% as thick as on Earth. My rotors have to spin more than 2,500 times a minute just to lift me up.</p><p>On April 19, 2021, I took off. It was the first time people had ever flown an aircraft on another planet. Everyone just hoped I'd fly 5 times. I flew 72!</p><p>On the last flight, the sand dunes below were too smooth, and my navigation camera couldn't find a single rock to hold on to. I missed my landing, hit the ground hard, and broke a rotor blade.</p><p>Now every morning I wake up, take a picture, check the temperature and save it all in my memory. If you come by, please pick it up for me.</p><p class=\"letter-sign\">Ingenuity</p>",
          "letter_vi": "<p>Gửi mọi người ở Trái Đất,</p><p>Em là Ingenuity, nặng có 1,8 kg, bằng ba chai nước thôi. Em đi nhờ dưới bụng xe Perseverance để sang Sao Hỏa.</p><p>Không khí ở đây loãng lắm, chỉ bằng khoảng 1% ở Trái Đất. Cánh quạt em phải quay hơn 2.500 vòng một phút mới nhấc nổi người lên.</p><p>Ngày 19/4/2021, em cất cánh. Đó là lần đầu tiên con người lái được máy bay trên một hành tinh khác. Mọi người chỉ mong em bay 5 lần, thế mà em bay tận 72 lần!</p><p>Lần cuối, đồi cát bên dưới trơn nhẵn quá, camera định vị của em không tìm được viên đá nào làm mốc để bám. Thế là em hạ cánh hụt nhịp, va mạnh xuống đất, gãy cả cánh quạt.</p><p>Giờ sáng nào em cũng thức dậy chụp một tấm ảnh, đo nhiệt độ rồi cất vào bộ nhớ. Ai sang thì lấy giúp em nhé.</p><p class=\"letter-sign\">Ingenuity</p>",
          "log_en": "Weighing just 1.8 kilograms, I was carried beneath Perseverance's belly to attempt what many thought impossible: aerodynamic flight in a Martian atmosphere with only one percent of Earth's surface air density. My carbon-fiber rotors had to spin at 2,537 revolutions per minute just to lift off on April 19, 2021. Built for only five test flights over thirty sols, I soared seventy-two times across Jezero Crater, scouting 17 kilometers of rocky ridges. On Flight 72 (January 18, 2024), featureless sand dunes confused my navigation camera, and my rotor tips struck the slope. Though my wings are clipped at Valinor Hills, my solar panel still wakes my computer every morning to record Martian weather for the next twenty years.",
          "log_vi": "Chỉ nặng vỏn vẹn 1,8 kilôgam, tôi được mang theo dưới bụng xe Perseverance để thử nghiệm điều tưởng chừng bất khả thi: bay khí động học trong bầu khí quyển Sao Hỏa mỏng manh chỉ bằng 1% mật độ không khí Trái Đất. Cặp cánh quạt sợi carbon của tôi phải quay tới 2.537 vòng/phút mới nâng nổi thân mình lên vào ngày 19/04/2021. Được thiết kế cho đúng 5 chuyến bay thử trong 30 sol, tôi đã tung cánh tới 72 lần trên miệng hố Jezero, trinh sát 17 kilomet địa hình hiểm trở. Ở chuyến bay thứ 72 (18/01/2024), những đồi cát đơn điệu làm hệ thống định vị quang học mất điểm bám, khiến đầu cánh quạt va vào sườn dốc. Dù đôi cánh đã gãy tại Đồi Valinor, tấm pin mặt trời vẫn đánh thức máy tính của tôi mỗi sáng để ghi nhật ký thời tiết Sao Hỏa suốt 20 năm tới."
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
              "label_en": "Flight 1: First Powered Flight on Another Planet",
              "label_vi": "Chuyến 1: Chuyến bay Đầu tiên trên Hành tinh Khác",
              "desc_en": "April 19, 2021 (Sol 58): First powered, controlled flight on another planet. Rotors spin at 2,537 rpm; hovers at 3 m altitude for 39.1 seconds.",
              "desc_vi": "19/04/2021 (Sol 58): Chuyến bay có điều khiển đầu tiên trên một hành tinh khác. Cánh quạt quay 2.537 vòng/phút; bay treo ở độ cao 3 m trong 39,1 giây."
            },
            {
              "value": 5,
              "label_en": "Flight 5: Original Design Limit Reached",
              "label_vi": "Chuyến 5: Đạt Giới hạn Thiết kế Ban đầu",
              "desc_en": "May 7, 2021: Completes its original 5-flight technology demonstration, transitioning into an operational scout for Perseverance.",
              "desc_vi": "07/05/2021: Hoàn thành trọn vẹn 5 chuyến bay thử nghiệm theo thiết kế ban đầu, chuyển sang giai đoạn trinh sát thực địa."
            },
            {
              "value": 72,
              "label_en": "Flight 72: Sol 1036 Rotor Damage & Stationary Rebirth",
              "label_vi": "Chuyến 72: Sol 1036 Gãy Cánh & Tái sinh Trạm Tĩnh",
              "desc_en": "Jan 18, 2024 (Sol 1036): Rotor tips damaged after 17.0 km total flight. Reprogrammed to log daily Martian weather and avionics data for ~20 years.",
              "desc_vi": "18/01/2024 (Sol 1036): Gãy đầu cánh quạt sau tổng quãng đường bay 17,0 km. Được lập trình lại để ghi dữ liệu thời tiết và vi mạch suốt ~20 năm tiếp theo."
            }
          ]
        }
      }
    ],
    "decision_station": {
      "title_en": "The Artemis landing site decision station",
      "title_vi": "Trạm quyết định bãi đáp sứ mệnh Artemis",
      "physics_callout_en": "Vacuum Ballistics Physics: Why does landing 160 meters away still damage a spacecraft? Because the Moon has NO atmosphere to slow down dust and 1/6th Earth's gravity. Rocket exhaust plumes accelerate jagged lunar regolith grains to 300–2,000 m/s (faster than a rifle bullet), creating a supersonic sandblasting spray across kilometers!",
      "physics_callout_vi": "Vật lý Đạn đạo trong Chân không: Tại sao đáp cách xa 160 mét vẫn làm hỏng tàu vũ trụ? Vì Mặt Trăng KHÔNG có không khí cản bụi lại và trọng lực chỉ bằng 1/6 Trái Đất. Luồng phụt tên lửa gia tốc các hạt bụi sắc nhọn tới vận tốc 300–2.000 m/s (nhanh hơn đạn súng trường), tạo ra cơn bão bắn cát siêu thanh văng xa hàng kilomet!",
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
          "distance_label": "160 m (Apollo 12 Historical)",
          "distance_num": 160,
          "status_badge_en": "WARNING — SUPERSONIC PLUME SANDBLASTING",
          "status_badge_vi": "CẢNH BÁO CAM — HIỆU ỨNG BÃO CÁT BẮN RỖ",
          "color_hex": "#F97316",
          "impact_en": "Replicates Apollo 12 LM Intrepid landing near Surveyor 3. Hyper-velocity dust spray micro-pits optical glass and turns white thermal paint tan.",
          "impact_vi": "Tái hiện đúng khoảng cách tàu Intrepid (Apollo 12) đáp cạnh Surveyor 3 năm 1969. Luồng bụi siêu tốc bắn rỗ kính quang học và làm ố nâu lớp sơn cách nhiệt.",
          "law_citation_en": "Proven empirically by post-flight laboratory analysis in NASA Special Publication SP-284 (1972); separation of ~160 m measured from Lunar Reconnaissance Orbiter images (538 ft; NASA SVS).",
          "law_citation_vi": "Được chứng minh thực nghiệm qua phân tích phòng thí nghiệm trong báo cáo NASA SP-284 (1972); khoảng cách ~160 m đo từ ảnh tàu quỹ đạo LRO (538 ft; NASA SVS).",
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
  };

  window.RELIC_DATA = window.LUNAMARIS_DATA;

  window.UI_I18N = {
    en: {
      character_name: "Thu Nguyet",
      character_full_name: "Tran Thu Nguyet",
      nav_stamps_label: "Signal stamps",
      filter_all: "All (4)",
      filter_moon: "Moon (2)",
      filter_mars: "Mars (2)",
      hero_badge: "2026 NASA INTERNATIONAL SPACE APPS CHALLENGE • ABANDONED BUT NOT FORGOTTEN",
      hero_title: "Letters across the silent seas",
      hero_subtitle: "Interactive Telemetry & Dual-Voice Storytelling about NASA's Forgotten Hardware on the Moon and Mars",
      hero_station_line1: "Hanoi ground station, 21.0285° N 105.8542° E",
      hero_station_line2: "LUNAR LASER ROUND-TRIP: 2.56 SECONDS | MARTIAN RADIO DELAY: 4 TO 24 MINUTES",
      hero_receiver_label: "DEEP-SPACE RECEIVER ARRAY:",
      hero_receiver_on: "ONLINE — LOCKING RELIC SIGNALS",
      hero_receiver_off: "STANDBY — CLICK TO ACTIVATE",
      hero_hook: "Looking up from the autumn night sky of Hanoi, we often think completed space missions are dead metal. Flip the receiver switch below: across the silent seas of the Moon and the dusty plains of Mars, NASA's forgotten hardware is still sending us decades of scientific truth.",
      cta_tune_in: "Tune Into the 4 Relic Signals ↓",
      cta_artemis: "Jump to Artemis Landing Simulator ⚡",
      chapter_prefix: "RELIC SIGNAL",
      moon_badge: "The Moon",
      mars_badge: "Mars",
      cospar_label: "COSPAR",
      location_label: "Location",
      status_label: "Status",
      telemetry_station_title: "Telemetry station",
      preset_label: "Historical milestones",
      where_number_btn: "Where does this number come from?",
      where_number_formula_title: "Physical model and data discrepancies",
      where_number_sources_title: "Verified NASA primary sources",
      tab_machine: "The machine's letter",
      tab_dossier: "Science dossier",
      view_both_btn: "Both",
      postmark_from: "Sent from",
      postmark_to: "to Hanoi ground station",
      dossier_sec1_title: "How it operated and the science it enabled",
      dossier_sec2_title: "Current state and materials",
      dossier_sec3_title: "Space heritage and conservation law",
      unlock_stamp_hint: "Drag the slider or pick a milestone to collect this chapter's stamp.",
      stamp_collected_badge: "★ Stamp collected",
      artemis_tag: "Exercise 1: you command the lander",
      artemis_subtitle: "Assume the role of Artemis Lunar Lander Commander. Select your touchdown distance from a historic Apollo/Surveyor site and observe the vacuum ballistics impact.",
      artemis_select_prompt: "Choose a touchdown distance",
      artemis_impact_label: "What the plume and dust do",
      artemis_law_label: "Scientific and legal basis",
      artemis_unlocked_msg: "2.0 km heritage safe zone confirmed. Your Space Heritage Guardian card is unlocked.",
      artemis_locked_msg: "Choose the ≥ 2,000 m zone (2.0 km safe buffer) to approve the landing and unlock your Guardian card.",
      cert_section_tag: "Exercise 2: a pledge card, no personal data stored",
      cert_section_title: "Space Heritage Guardian card",
      cert_section_desc: "Commit to protecting humanity's extraterrestrial laboratories. Rendered 100% locally in your browser — no personal data is ever stored or transmitted.",
      cert_step1_label: "Choose a pledge",
      cert_step2_label: "Display nickname (optional)",
      cert_input_placeholder: "e.g. Commander Minh - Hanoi Station",
      cert_privacy_note: "🔒 Rendered locally in your browser — no personal data is stored or transmitted, fully compliant with Space Apps Under-18 privacy rules.",
      cert_pledges: [
        "I pledge to respect the 2.0 km lunar exclusion buffer so future generations can study untouched space hardware.",
        "I pledge to verify space history through open telemetry data rather than internet myths.",
        "I pledge to view discarded spacecraft not as trash, but as humanity's longest-running extraterrestrial material laboratories."
      ],
      cert_badge_header: "SPACE HERITAGE GUARDIAN • OFFICIAL PLEDGE",
      cert_badge_subheader: "2026 NASA International Space Apps Challenge • Abandoned But Not Forgotten",
      cert_issued_to: "GUARDIAN CALLSIGN:",
      cert_default_name: "ARTEMIS CADET (HANOI GROUND STATION)",
      cert_stamps_title: "TELEMETRY STAMPS VERIFIED:",
      cert_download_btn: "⬇ Download certificate (PNG)",
      cert_print_btn: "🖨️ Print or save as PDF",
      cert_unlock_btn: "Pick the ≥ 2,000 m zone for me",
      teacher_tag: "For teachers",
      teacher_title: "15-minute STEM lesson (ages 11–15)",
      teacher_desc: "Designed for Middle & High School Physics and Natural Science teachers to integrate real NASA telemetry into a single 15-minute interactive activity.",
      teacher_cards: [
        {
          time: "Minutes 1–5",
          topic: "Optics & Astronomy (Chapter 01)",
          body: "Students drag the Chapter 1 slider (1969–2026) to explore retroreflection on 3.8 cm fused-silica corner-cube prisms (LRRR) and calculate lunar distance using the speed of light (d = c × t / 2) and tidal recession (+3.8 cm/year).",
          btn: "Go to Chapter 01",
          target: "#chapter-apollo11-lrrr"
        },
        {
          time: "Minutes 6–10",
          topic: "Solar Energy & Atmospheric Physics (Chapter 03)",
          body: "Students adjust Martian atmospheric optical depth (Tau τ from 0.6 to 10.8) in Chapter 3 to observe exponential solar irradiance attenuation on Opportunity's gallium-arsenide arrays (645 Wh down to 22 Wh).",
          btn: "Go to Chapter 03",
          target: "#chapter-opportunity-rover"
        },
        {
          time: "Minutes 11–15",
          topic: "Vacuum Ballistics & Space Ethics (Artemis Station)",
          body: "Students test 4 landing distances at the Artemis Decision Station to understand ballistic ejecta in 1/6g vacuum (300–2,000 m/s) and discuss the One Small Step to Protect Human Heritage in Space Act (2020).",
          btn: "Go to Artemis Station",
          target: "#artemis-station"
        }
      ],
      footer_sources_title: "NASA open data and legal sources",
      footer_si_title: "AI use disclosure (SI Disclosure)",
      footer_si_btn: "Open full disclosure",
      footer_compliance_notice: "Built for the 2026 NASA International Space Apps Challenge using NASA Open Data. No official NASA logos ('Meatball' or 'Worm') are used, in strict compliance with NASA Brand Guidelines.",
      /* [SCENES 2026-11-15] Cảnh toàn màn hình: mở đầu, 4 tín hiệu, thanh dưới */
      tune_in_btn: "Switch on the receiver",
      go_artemis_link: "Go to the Artemis station",
      continue_at: "Continue at {name}",
      fact_laser_label: "Lunar laser round trip",
      fact_laser_value: "2.56 s",
      fact_mars_label: "Mars radio delay",
      fact_mars_value: "4–24 min",
      signals_title: "Four signals are waiting",
      signals_lead: "Tap a point on the map to open the letter sent from there.",
      signals_more: "After the four letters",
      signals_map_label: "Map of the four machines on the Moon and Mars",
      toc_filter_label: "Show",
      toc_chapter: "Chapter",
      planet_moon: "The Moon",
      planet_mars: "Mars",
      signal_stamp_done: "Stamp collected",
      signal_stamp_todo: "No stamp yet",
      photo_credit: "Photo",
      voice_switch_label: "Choose a voice",
      artemis_distance_label: "Touchdown distance",
      cert_locked_msg: "The card unlocks when you choose the ≥ 2,000 m zone at the Artemis station.",
      si_close: "✕ Close",
      artemis_go_guardian: "Open your Guardian card",
      pager_back: "Back",
      pager_next: "Next",
      pager_next_to: "Next: {name}",
      pager_nav_label: "Scenes",
      scene_of: "Scene {n} of {total}",
      reading_mode_on: "Read as one scrolling page",
      reading_mode_off: "View scene by scene",
      group_earth: "Hanoi station",
      group_moon: "The Moon",
      group_mars: "Mars",
      group_artemis: "Artemis",
      group_appendix: "Appendix",
      scene_title_start: "Hanoi station",
      scene_title_signals: "Four signals",
      scene_title_artemis: "Artemis decision station",
      scene_title_guardian: "Guardian card",
      scene_title_teacher: "Teacher's corner",
      scene_title_sources: "Sources and AI disclosure",
      si_col_tool: "SI / AI Tool",
      si_col_role: "Technical Role in Development",
      si_col_human: "Human Verification Gate (Manual Audit)",
      /* [NOTEBOOK-QR 2026-11-14] Floating "?" button + NotebookLM QR side panel */
      nb_btn_title: "Our NotebookLM notebook — QR code & link",
      nb_eyebrow: "TEAM KNOWLEDGE BASE • NOTEBOOKLM",
      nb_title: "Scan to open our NotebookLM",
      nb_qr_alt: "QR code linking to the LUNAMARIS team NotebookLM notebook",
      nb_scan_hint: "Point your phone camera at the code — most phones need no extra app.",
      nb_link_label: "DIRECT LINK (CLICKABLE ON COMPUTER):",
      nb_copy: "Copy link",
      nb_copied: "Copied ✓",
      nb_copy_fail: "Copy blocked — select the blue link and press Ctrl+C.",
      nb_close: "Close panel",
      nb_steps_title: "HOW TO USE",
      nb_step1: "On your phone, open the Camera app (or any QR scanner).",
      nb_step2: "Point the lens at the white square above, then tap the link notification that pops up.",
      nb_step3: "On a computer, just click the blue link — the notebook opens in a new tab.",
      nb_note: "Judging-day tip: put this QR on your slides or poster so judges can scan it live. If the link ever fails to open, ask the team to re-check the notebook's sharing settings."
    },
    vi: {
      character_name: "Thu Nguyệt",
      character_full_name: "Trần Thu Nguyệt",
      nav_stamps_label: "Tem tín hiệu",
      filter_all: "Tất cả (4)",
      filter_moon: "Mặt Trăng (2)",
      filter_mars: "Sao Hỏa (2)",
      hero_badge: "NASA INTERNATIONAL SPACE APPS CHALLENGE 2026 • BỊ BỎ LẠI NHƯNG KHÔNG BỊ LÃNG QUÊN",
      hero_title: "Những lá thư qua biển lặng",
      hero_subtitle: "Kể chuyện Hai Giọng & Mô phỏng Thông số Đo xa về những Thiết bị NASA Bị Bỏ lại trên Mặt Trăng và Sao Hỏa",
      hero_station_line1: "Trạm mặt đất Hà Nội, 21.0285° N 105.8542° E",
      hero_station_line2: "KHỨ HỒI LASER MẶT TRĂNG: 2,56 GIÂY | ĐỘ TRỄ VÔ TUYẾN SAO HỎA: 4 ĐẾN 24 PHÚT",
      hero_receiver_label: "MẢNG ĂNG-TEN THU SÓNG KHÔNG GIAN SÂU:",
      hero_receiver_on: "ĐANG THU SÓNG — ĐÃ KHÓA 4 TÍN HIỆU DI VẬT",
      hero_receiver_off: "CHẾ ĐỘ CHỜ — BẤM ĐỂ BẬT THU SÓNG",
      hero_hook: "Ngước nhìn bầu trời đêm thu Hà Nội, chúng ta thường ngỡ những sứ mệnh vũ trụ đã khép lại chỉ còn là sắt vụn vô tri. Hãy bật công tắc thu sóng bên dưới: khắp các biển lặng Mặt Trăng và bình nguyên bụi đỏ Sao Hỏa, những thiết bị bị bỏ lại của NASA vẫn đang gửi về hàng thập kỷ chân lý khoa học.",
      cta_tune_in: "Thu sóng 4 Tín hiệu Di vật ↓",
      cta_artemis: "Trạm Mô phỏng Hạ cánh Artemis ⚡",
      chapter_prefix: "TÍN HIỆU DI VẬT",
      moon_badge: "Mặt Trăng",
      mars_badge: "Sao Hỏa",
      cospar_label: "COSPAR",
      location_label: "Vị trí",
      status_label: "Trạng thái",
      telemetry_station_title: "Trạm đo xa",
      preset_label: "Các mốc lịch sử",
      where_number_btn: "Số này từ đâu?",
      where_number_formula_title: "Mô hình vật lý và độ lệch số liệu",
      where_number_sources_title: "Tài liệu gốc NASA đã kiểm chứng",
      tab_machine: "Thư của cỗ máy",
      tab_dossier: "Hồ sơ khoa học",
      view_both_btn: "Cả hai",
      postmark_from: "Gửi từ",
      postmark_to: "tới Trạm mặt đất Hà Nội",
      dossier_sec1_title: "Cách sứ mệnh vận hành và thành tựu khoa học",
      dossier_sec2_title: "Trạng thái hiện tại và vật liệu",
      dossier_sec3_title: "Luật bảo tồn di sản không gian",
      unlock_stamp_hint: "Kéo thanh trượt hoặc chọn một mốc để nhận tem chương này.",
      stamp_collected_badge: "★ Đã nhận tem chương này",
      artemis_tag: "Bài tập 1: bạn là chỉ huy đổ bộ",
      artemis_subtitle: "Nhập vai Chỉ huy Đổ bộ tàu Artemis. Hãy chọn khoảng cách hạ cánh xuống gần một di sản lịch sử trên Mặt Trăng và quan sát hệ quả đạn đạo trong chân không.",
      artemis_select_prompt: "Chọn khoảng cách hạ cánh",
      artemis_impact_label: "Hệ quả của luồng phụt và bụi",
      artemis_law_label: "Căn cứ khoa học và pháp lý",
      artemis_unlocked_msg: "Đã xác nhận vùng an toàn di sản ≥ 2,0 km. Thẻ Space Heritage Guardian đã mở.",
      artemis_locked_msg: "Chọn vùng ≥ 2.000 m (vùng đệm an toàn 2,0 km) để phê duyệt bãi đáp và mở thẻ Guardian.",
      cert_section_tag: "Bài tập 2: thẻ cam kết, không lưu dữ liệu cá nhân",
      cert_section_title: "Thẻ Space Heritage Guardian",
      cert_section_desc: "Cam kết bảo vệ những phòng thí nghiệm ngoài Trái Đất của nhân loại. Được tạo 100% ngay trên trình duyệt — không lưu trữ hay truyền đi bất kỳ dữ liệu cá nhân nào.",
      cert_step1_label: "Chọn một lời cam kết",
      cert_step2_label: "Biệt danh hiển thị (không bắt buộc)",
      cert_input_placeholder: "VD: Chỉ huy Minh - Trạm Hà Nội",
      cert_privacy_note: "🔒 Được dựng trực tiếp trên trình duyệt của bạn — không lưu trữ hay gửi dữ liệu cá nhân, tuân thủ tuyệt đối quy tắc bảo vệ học sinh dưới 18 tuổi của Space Apps.",
      cert_pledges: [
        "Tôi cam kết tôn trọng vùng đệm an toàn 2,0 km trên Mặt Trăng để các thế hệ tương lai có thể nghiên cứu những thiết bị vũ trụ nguyên vẹn.",
        "Tôi cam kết kiểm chứng lịch sử không gian thông qua dữ liệu đo xa mở (Open Telemetry) thay vì những lời đồn trên mạng.",
        "Tôi cam kết nhìn nhận các thiết bị vũ trụ bị bỏ lại không phải là rác phế liệu, mà là những phòng thí nghiệm vật liệu ngoài Trái Đất lâu đời nhất của nhân loại."
      ],
      cert_badge_header: "SPACE HERITAGE GUARDIAN • CHỨNG NHẬN BẢO TỒN",
      cert_badge_subheader: "NASA International Space Apps Challenge 2026 • Abandoned But Not Forgotten",
      cert_issued_to: "BIỆT DANH NGƯỜI BẢO VỆ:",
      cert_default_name: "CHỈ HUY ARTEMIS (TRẠM MẶT ĐẤT HÀ NỘI)",
      cert_stamps_title: "BỘ SƯU TẬP 4 CON DẤU ĐO XA:",
      cert_download_btn: "⬇ Tải ảnh chứng nhận (PNG)",
      cert_print_btn: "🖨️ In hoặc lưu PDF",
      cert_unlock_btn: "Tự chọn vùng ≥ 2.000 m để mở thẻ",
      teacher_tag: "Dành cho giáo viên",
      teacher_title: "Góc giáo viên STEM 15 phút (học sinh 11–15 tuổi)",
      teacher_desc: "Thiết kế gọn gàng dành cho giáo viên THCS/THPT sử dụng ngay trong tiết Vật lý hoặc Khoa học Tự nhiên với dữ liệu thực từ NASA.",
      teacher_cards: [
        {
          time: "Phút 1–5",
          topic: "Quang học & Thiên văn (Chương 01)",
          body: "Học sinh kéo thanh trượt Chương 1 (1969–2026) để hiểu định luật phản xạ ánh sáng trên lăng kính góc LRRR (3,8 cm) và cách đo khoảng cách bằng tốc độ ánh sáng (d = c × t / 2) cùng độ trôi +3,8 cm/năm.",
          btn: "Tới Chương 01",
          target: "#chapter-apollo11-lrrr"
        },
        {
          time: "Phút 6–10",
          topic: "Năng lượng Tái tạo & Khí quyển (Chương 03)",
          body: "Học sinh kéo thanh trượt Chương 3 để quan sát sự suy giảm quang thông mặt trời theo độ mờ khí quyển (τ từ 0,6 lên 10,8) trên Sao Hỏa làm điện năng tụt từ 645 Wh xuống 22 Wh.",
          btn: "Tới Chương 03",
          target: "#chapter-opportunity-rover"
        },
        {
          time: "Phút 11–15",
          topic: "Đạn đạo Chân không & Đạo đức Không gian (Trạm Artemis)",
          body: "Học sinh thực hành tại Trạm Quyết định Artemis để hiểu chuyển động ném ngang của hạt bụi trong chân không trọng lực 1/6g (300–2.000 m/s) và thảo luận về Đạo luật One Small Step Act (2020).",
          btn: "Tới Trạm Artemis",
          target: "#artemis-station"
        }
      ],
      footer_sources_title: "Nguồn dữ liệu mở NASA và hồ sơ pháp lý",
      footer_si_title: "Khai báo sử dụng AI (SI Disclosure)",
      footer_si_btn: "Mở bản đầy đủ",
      footer_compliance_notice: "Được xây dựng cho cuộc thi 2026 NASA International Space Apps Challenge sử dụng Dữ liệu Mở NASA (NASA Open Data). Tuyệt đối không sử dụng logo chính thức của NASA ('Meatball' hay 'Worm') theo đúng Quy chuẩn Thương hiệu.",
      /* [SCENES 2026-11-15] Cảnh toàn màn hình: mở đầu, 4 tín hiệu, thanh dưới */
      tune_in_btn: "Bật thu sóng",
      go_artemis_link: "Tới Trạm Artemis",
      continue_at: "Tiếp tục ở {name}",
      fact_laser_label: "Khứ hồi laser Mặt Trăng",
      fact_laser_value: "2,56 s",
      fact_mars_label: "Độ trễ vô tuyến Sao Hỏa",
      fact_mars_value: "4–24 phút",
      signals_title: "Bốn tín hiệu đang chờ",
      signals_lead: "Chạm vào một điểm trên bản đồ để mở lá thư gửi từ nơi đó.",
      signals_more: "Sau bốn lá thư",
      signals_map_label: "Bản đồ vị trí 4 cỗ máy trên Mặt Trăng và Sao Hỏa",
      toc_filter_label: "Hiện",
      toc_chapter: "Chương",
      planet_moon: "Mặt Trăng",
      planet_mars: "Sao Hỏa",
      signal_stamp_done: "Đã nhận tem",
      signal_stamp_todo: "Chưa nhận tem",
      photo_credit: "Ảnh",
      voice_switch_label: "Chọn giọng kể",
      artemis_distance_label: "Khoảng cách chạm đất",
      cert_locked_msg: "Thẻ sẽ mở khi bạn chọn vùng ≥ 2.000 m ở Trạm Artemis.",
      si_close: "✕ Đóng",
      artemis_go_guardian: "Mở thẻ Guardian",
      pager_back: "Quay lại",
      pager_next: "Tiếp",
      pager_next_to: "Tiếp: {name}",
      pager_nav_label: "Chuyển cảnh",
      scene_of: "Cảnh {n} / {total}",
      reading_mode_on: "Đọc dạng cuộn một trang dài",
      reading_mode_off: "Xem từng cảnh",
      group_earth: "Trạm Hà Nội",
      group_moon: "Mặt Trăng",
      group_mars: "Sao Hỏa",
      group_artemis: "Artemis",
      group_appendix: "Phụ lục",
      scene_title_start: "Trạm Hà Nội",
      scene_title_signals: "Bốn tín hiệu",
      scene_title_artemis: "Trạm quyết định Artemis",
      scene_title_guardian: "Thẻ Guardian",
      scene_title_teacher: "Góc giáo viên",
      scene_title_sources: "Nguồn và khai báo AI",
      si_col_tool: "Công cụ SI / AI",
      si_col_role: "Vai trò Kỹ thuật trong Dự án",
      si_col_human: "Cổng Kiểm chứng Thủ công của Con người (Human Verification Gate)",
      /* [NOTEBOOK-QR 2026-11-14] Nút "?" nổi + bảng mã QR NotebookLM */
      nb_btn_title: "Sổ tay NotebookLM của nhóm — mã QR & liên kết",
      nb_eyebrow: "KHO TRI THỨC NHÓM • NOTEBOOKLM",
      nb_title: "Quét mã để mở NotebookLM của nhóm",
      nb_qr_alt: "Mã QR dẫn tới sổ tay NotebookLM của nhóm LUNAMARIS",
      nb_scan_hint: "Đưa camera điện thoại vào mã — hầu hết điện thoại không cần cài thêm ứng dụng.",
      nb_link_label: "LIÊN KẾT TRỰC TIẾP (BẤM ĐƯỢC TRÊN MÁY TÍNH):",
      nb_copy: "Sao chép liên kết",
      nb_copied: "Đã sao chép ✓",
      nb_copy_fail: "Trình duyệt chặn sao chép — hãy bôi đen liên kết màu xanh rồi ấn Ctrl+C.",
      nb_close: "Đóng bảng",
      nb_steps_title: "CÁCH DÙNG",
      nb_step1: "Trên điện thoại, mở ứng dụng Camera (hoặc một trình quét QR bất kỳ).",
      nb_step2: "Hướng ống kính vào ô vuông trắng phía trên, rồi chạm vào thông báo liên kết vừa hiện ra.",
      nb_step3: "Trên máy tính, bấm thẳng vào liên kết màu xanh — sổ tay sẽ mở sang tab mới.",
      nb_note: "Mẹo cho ngày thi: chiếu mã QR này lên slide hoặc poster để giám khảo quét trực tiếp. Nếu liên kết không mở được, hãy báo cả nhóm kiểm tra quyền chia sẻ của sổ tay."
    }
  };

