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
      /* [KIDS 2026-11-13] Fun-fact 1 câu cho hotspot "Cái gì đây?" trên cảnh SVG */
      "kid_fact_en": "Each prism is a corner-cube: light bounces off three mutually perpendicular faces and flies straight back to its source — nobody on the Moon ever has to aim anything!",
      "kid_fact_vi": "Mỗi lăng kính là một 'góc khối': ánh sáng chạm ba mặt vuông góc rồi bay ngược về đúng nơi phát — không ai trên Mặt Trăng phải ngắm gì cả!",
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
      },
      /* =====================================================================
         [REDESIGN 2026-11-13 • A+B HYBRID] EPISODE BLOCK
         Đây là NGUỒN DUY NHẤT cho phần kể chuyện của di vật này.
         Muốn sửa lời kể / thêm nhịp / đổi câu hỏi: chỉ cần sửa object này.
         - teaser_*   : một câu giới thiệu in trên phong bì ở Hộp thư.
         - steps[]    : các "nhịp" scrollytelling. svg_value là giá trị truyền
                        vào RelicSVGEngine.evaluateArtifact() để hình anim theo.
         - quiz       : câu hỏi chốt chương; trả lời đúng mới nhận Tem.
         ===================================================================== */
      "episode": {
        "teaser_en": "A mirror with no battery that still answers Earth every night.",
        "teaser_vi": "Tấm gương không pin vẫn trả lời Trái Đất mỗi đêm suốt 57 năm.",
        "steps": [
          {
            "svg_value": 1969,
            "text_en": "On July 20, 1969, two astronauts set a small aluminum frame on the Sea of Tranquility, then flew home. What stayed behind has no battery, no speaker, no moving gears.",
            "text_vi": "Ngày 20/7/1969, hai phi hành gia đặt một khung nhôm nhỏ xuống Biển Tĩnh Lặng rồi bay về nhà. Thứ ở lại không có pin, không loa, không bánh răng chuyển động."
          },
          {
            "svg_value": 1971,
            "text_en": "Three years later, Apollo 15 left a second mirror, three times bigger, at Hadley Rille. From then on, Earth always had a mirror to aim at.",
            "text_vi": "Ba năm sau, Apollo 15 đặt thêm một tấm gương lớn gấp ba ở rãnh Hadley. Từ đó Trái Đất luôn có một tấm gương để ngắm."
          },
          {
            "svg_value": 2000,
            "text_en": "Each night, observatories fire a green laser pulse toward the mirror. Out of a hundred quadrillion photons, a single one comes back to exactly where it started, 2.56 seconds later.",
            "text_vi": "Mỗi đêm, các đài quan sát bắn một xung laser xanh về phía gương. Trong hàng trăm triệu triệu hạt photon, chỉ một hạt quay về đúng chỗ cũ sau 2,56 giây."
          },
          {
            "svg_value": 2026,
            "text_en": "Thanks to that one lonely photon, we know the Moon drifts 3.8 cm farther from Earth every year — and we get to test Einstein's relativity at the same time.",
            "text_vi": "Nhờ hạt photon lẻ loi đó, ta biết Mặt Trăng đang trôi xa Trái Đất thêm 3,8 cm mỗi năm — và kiêm luôn việc kiểm nghiệm thuyết tương đối của Einstein."
          }
        ],
        "quiz": {
          "question_en": "Why does this mirror 'answer' Earth for 57 years without any battery?",
          "question_vi": "Vì sao tấm gương này 'trả lời' Trái Đất suốt 57 năm mà không cần pin?",
          "options_en": [
            "Because its corner-cube prisms bounce the incoming laser straight back to its source",
            "Because a hidden solar panel recharges it every lunar morning",
            "Because it broadcasts a radio beep every night"
          ],
          "options_vi": [
            "Vì các lăng kính góc phản xạ đúng tia laser bắn tới ngược về nơi phát",
            "Vì có pin mặt trời giấu bên trong sạc lại mỗi sáng",
            "Vì nó phát một tiếng bíp vô tuyến mỗi đêm"
          ],
          "answer_index": 0,
          "explain_en": "Corner-cube prisms reflect light back parallel to its origin, so no power is needed — the Earth's own laser is the power source.",
          "explain_vi": "Lăng kính góc phản xạ ánh sáng ngược lại song song với hướng tới, nên không cần điện — chính tia laser của Trái Đất là nguồn năng lượng."
        },
        /* [KIDS 2026-11-13] Trò chơi "đoán trước — kiểm tra sau": học sinh chốt
           một dự đoán trước khi cuộn nhịp / kéo con trượt, rồi tự đối chiếu. */
        "guess": {
          "question_en": "By 2026, how much farther away has the Moon moved?",
          "question_vi": "Đến năm 2026, Mặt Trăng đã trôi xa thêm bao nhiêu?",
          "options_en": [
            "~20 m — as long as a bus",
            "~2 m — a little taller than a grown-up",
            "~200 m — as long as a football pitch"
          ],
          "options_vi": [
            "~20 m — dài bằng chiếc xe buýt",
            "~2 m — cao hơn người lớn một chút",
            "~200 m — dài bằng một sân bóng"
          ],
          "answer_index": 1,
          "reveal_en": "True number in 2026: +216.6 cm (~2.17 m). The Moon slips 3.8 cm farther every single year — scroll the beats or open the engineer's notebook and slide to 2026 to see it!",
          "reveal_vi": "Số thật năm 2026: +216,6 cm (~2,17 m). Mỗi năm Mặt Trăng trôi xa thêm 3,8 cm — hãy cuộn các nhịp hoặc mở sổ tay kỹ sư kéo tới 2026 để thấy đúng con số này!"
        }
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
      "kid_fact_en": "This very camera flew home aboard Apollo 12 in 1969 — the only lunar camera ever retired to a museum on Earth (the Smithsonian).",
      "kid_fact_vi": "Chính chiếc camera này đã bay về Trái Đất cùng Apollo 12 năm 1969 — chiếc camera Mặt Trăng duy nhất được 'về hưu' trong bảo tàng ở Trái Đất (Smithsonian).",
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
            "value": 155,
            "label_en": "155 m: 1969 Apollo 12 Touchdown (LROC)",
            "label_vi": "155 m: Cự ly Đáp Apollo 12 1969 (LROC)",
            "desc_en": "Historical Apollo 12 distance (LROC verified; 1969 docs noted 160–180 m). High-velocity regolith spray pits camera glass and turns white paint tan (NASA SP-284).",
            "desc_vi": "Khoảng cách thực tế của Apollo 12 (theo LROC; tài liệu 1969 ghi 160–180 m). Bão cát siêu tốc bắn rỗ kính camera và nhuộm nâu lớp sơn trắng (NASA SP-284)."
          }
        ]
      },
      /* [REDESIGN 2026-11-13 • A+B HYBRID] EPISODE BLOCK — xem ghi chú ở chương 01.
         svg_value ở đây là khoảng cách hạ cánh (m) truyền vào SVG engine. */
      "episode": {
        "teaser_en": "The lander sandblasted by the dust of its own visitors.",
        "teaser_vi": "Chiếc tàu đổ bộ bị chính luồng bụi của người đến thăm làm rám sơn.",
        "steps": [
          {
            "svg_value": 2000,
            "text_en": "In April 1967, Surveyor 3 touched down inside a shallow crater on the Ocean of Storms. Its scoop dug trenches and its camera sent home 6,315 pictures: the Moon will not swallow astronauts in dust.",
            "text_vi": "Tháng 4/1967, Surveyor 3 đáp xuống một miệng hố nông ở Đại dương Bão tố. Gầu xúc của nó đào rãnh, còn camera gửi về 6.315 bức ảnh: Mặt Trăng sẽ không nuốt phi hành gia trong bụi."
          },
          {
            "svg_value": 500,
            "text_en": "Two and a half years later, Apollo 12's ship Intrepid came down nearby. The question of this episode: how far away is actually safe?",
            "text_vi": "Hai năm rưỡi sau, tàu Intrepid của Apollo 12 hạ cánh gần đó. Câu hỏi của tập này: đáp cách bao xa thì thật sự an toàn?"
          },
          {
            "svg_value": 155,
            "text_en": "The real 1969 answer: 155 meters. Intrepid's rocket plume blasted super-fast dust into Surveyor 3, tanning its white paint and pitting its camera glass.",
            "text_vi": "Câu trả lời thật của năm 1969: 155 mét. Luồng phụt tên lửa của Intrepid bắn bụi siêu tốc vào Surveyor 3, nhuộm sơn trắng thành nâu rám và rỗ kính camera."
          },
          {
            "svg_value": 2000,
            "text_en": "In 1972 NASA brought the camera home and studied it in the lab (report SP-284). Those very pits taught NASA the 2-kilometer safety rule used today.",
            "text_vi": "Năm 1972, NASA mang camera về Trái Đất và soi trong phòng thí nghiệm (báo cáo SP-284). Chính những vết rỗ đó đã dạy NASA quy tắc giữ khoảng cách 2 km ngày nay."
          }
        ],
        "quiz": {
          "question_en": "What damaged Surveyor 3's white paint?",
          "question_vi": "Điều gì đã làm hỏng lớp sơn trắng của Surveyor 3?",
          "options_en": [
            "Lunar dust accelerated by a visiting rocket's exhaust plume",
            "Moon rain during a storm",
            "Sunlight burning the paint over time"
          ],
          "options_vi": [
            "Bụi Mặt Trăng bị luồng phụt tên lửa của tàu ghé thăm bắn vào",
            "Mưa trên Mặt Trăng trong một cơn bão",
            "Ánh nắng Mặt Trời đốt cháy sơn theo thời gian"
          ],
          "answer_index": 0,
          "explain_en": "The Moon has no air and no rain. NASA SP-284 proved the damage came from hyper-velocity dust kicked up by Apollo 12's landing engine.",
          "explain_vi": "Mặt Trăng không có không khí và không có mưa. NASA SP-284 chứng minh hư hại đến từ bụi siêu tốc bị động cơ hạ cánh của Apollo 12 thổi lên."
        },
        "guess": {
          "question_en": "How far must a new spaceship land so its dust spray cannot scratch Surveyor 3?",
          "question_vi": "Một tàu mới phải đáp cách bao xa để luồng bụi của nó không làm xước Surveyor 3?",
          "options_en": [
            "At least 2,000 m (2 km)",
            "155 m is close enough",
            "Any distance — the Moon has no air to carry dust"
          ],
          "options_vi": [
            "Ít nhất 2.000 m (2 km)",
            "155 m là đủ gần",
            "Xa nào cũng được — Mặt Trăng không có không khí để mang bụi"
          ],
          "answer_index": 0,
          "reveal_en": "NASA's 2011 rule: ≥ 2.0 km. At 155 m — the real 1969 distance! — supersonic dust tan-painted Surveyor 3. Slide the distance in the engineer's notebook and watch the paint change colour.",
          "reveal_vi": "Chuẩn NASA 2011: ≥ 2,0 km. Ở 155 m — đúng cự ly năm 1969! — bụi siêu tốc đã nhuộm rám sơn Surveyor 3. Kéo khoảng cách trong sổ tay kỹ sư để xem lớp sơn đổi màu."
        }
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
      "kid_fact_en": "Martian whirlwinds sometimes swept the solar panels clean for free — that luck turned a 90-sol plan into nearly 15 years of driving.",
      "kid_fact_vi": "Những cơn lốc Sao Hỏa thỉnh thoảng quét sạch bụi trên tấm pin giúp miễn phí — nhờ vậy kế hoạch 90 sol hóa thành gần 15 năm lăn bánh.",
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
      },
      /* [REDESIGN 2026-11-13 • A+B HYBRID] EPISODE BLOCK — xem ghi chú ở chương 01.
         svg_value ở đây là độ mờ khí quyển Tau (τ) truyền vào SVG engine. */
      "episode": {
        "teaser_en": "The rover built for 90 days that drove for 15 years, then slept in a storm.",
        "teaser_vi": "Chiếc xe thiết kế cho 90 ngày đã lăn bánh 15 năm, rồi ngủ yên trong bão bụi.",
        "steps": [
          {
            "svg_value": 1.0,
            "text_en": "In 2004, Opportunity landed at Meridiani with a 90-day plan and a 1-kilometer drive. It stayed nearly fifteen years and rolled 45.16 kilometers.",
            "text_vi": "Năm 2004, Opportunity đáp xuống Meridiani với kế hoạch 90 ngày và quãng đường 1 km. Nó ở lại gần 15 năm và lăn bánh 45,16 km."
          },
          {
            "svg_value": 5.5,
            "text_en": "Dust is both friend and enemy. In 2007 a storm hid almost all of the Sun; the rover survived by hibernating between brief wake-ups.",
            "text_vi": "Bụi vừa là bạn vừa là thù. Năm 2007, một cơn bão che gần hết Mặt Trời; chiếc xe sống sót nhờ ngủ đông giữa những lần tỉnh giấc ngắn."
          },
          {
            "svg_value": 10.8,
            "text_en": "In June 2018 a planet-wide storm turned noon into black night (tau = 10.8). Power fell from 700 Wh to 22 Wh, and the last data packet went silent.",
            "text_vi": "Tháng 6/2018, một cơn bão toàn cầu biến buổi trưa thành đêm đen (τ = 10,8). Điện tụt từ 700 Wh xuống 22 Wh, và gói dữ liệu cuối cùng im lặng."
          },
          {
            "svg_value": 1.0,
            "text_en": "Before falling asleep it had found hematite 'blueberries' and clay minerals — proof that ancient Mars once held warm, liquid water.",
            "text_vi": "Trước khi ngủ, nó đã kịp tìm ra những viên 'việt quất' hematit và khoáng sét — bằng chứng Sao Hỏa cổ đại từng có nước lỏng ấm áp."
          }
        ],
        "quiz": {
          "question_en": "Why did Opportunity fall asleep?",
          "question_vi": "Vì sao Opportunity ngủ yên?",
          "options_en": [
            "A dust storm blocked the Sun, so its solar panels ran out of power",
            "It ran out of gasoline",
            "It crashed into a rock and broke a wheel"
          ],
          "options_vi": [
            "Bão bụi che Mặt Trời nên tấm pin mặt trời hết điện",
            "Nó hết xăng",
            "Nó va vào đá và gãy một bánh xe"
          ],
          "answer_index": 0,
          "explain_en": "Opportunity ran on sunlight. When the 2018 storm raised atmospheric opacity to tau 10.8, its arrays dropped to 22 Wh and the mission clock fell asleep.",
          "explain_vi": "Opportunity chạy bằng ánh nắng. Khi cơn bão 2018 nâng độ mờ khí quyển lên τ = 10,8, tấm pin chỉ còn 22 Wh và đồng hồ sứ mệnh chìm vào giấc ngủ."
        },
        "guess": {
          "question_en": "In the giant 2018 dust storm (tau = 10.8), how much solar power was left?",
          "question_vi": "Trong cơn bão bụi khổng lồ năm 2018 (τ = 10,8), tấm pin mặt trời còn bao nhiêu điện?",
          "options_en": [
            "Same as a clear day (~700 Wh)",
            "About half (~350 Wh)",
            "Only ~22 Wh — like a tiny night-light"
          ],
          "options_vi": [
            "Vẫn như ngày quang đãng (~700 Wh)",
            "Khoảng một nửa (~350 Wh)",
            "Chỉ ~22 Wh — như một chiếc đèn ngủ nhỏ"
          ],
          "answer_index": 2,
          "reveal_en": "Only ~22 Wh of the usual 700 Wh — that is why the rover fell asleep. Slide tau in the engineer's notebook and watch the battery bar drain.",
          "reveal_vi": "Chỉ ~22 Wh trong mức 700 Wh thường ngày — vì thế chiếc xe ngủ yên. Kéo tau trong sổ tay kỹ sư để xem thanh pin cạn dần."
        }
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
      "kid_fact_en": "Martian air is only 1% as thick as Earth's, so these rotors must spin ~2,537 rpm — like a giant fan blowing in a whisper of wind.",
      "kid_fact_vi": "Không khí Sao Hỏa chỉ đặc bằng 1% Trái Đất, nên cặp cánh quạt này phải quay ~2.537 vòng/phút — như chiếc quạt khổng lồ quay trong làn gió mỏng manh.",
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
      },
      /* [REDESIGN 2026-11-13 • A+B HYBRID] EPISODE BLOCK — xem ghi chú ở chương 01.
         svg_value ở đây là số thứ tự chuyến bay (1–72) truyền vào SVG engine. */
      "episode": {
        "teaser_en": "The clipped-wing helicopter that still wakes each morning to log the weather.",
        "teaser_vi": "Chú trực thăng gãy cánh vẫn thức dậy mỗi sáng để ghi nhật ký thời tiết.",
        "steps": [
          {
            "svg_value": 1,
            "text_en": "April 19, 2021: a 1.8-kilogram helicopter flies for 39.1 seconds at 3 meters altitude — the first powered, controlled flight on another planet.",
            "text_vi": "Ngày 19/4/2021: chiếc trực thăng 1,8 kg bay 39,1 giây ở độ cao 3 mét — chuyến bay có điều khiển đầu tiên trên một hành tinh khác."
          },
          {
            "svg_value": 5,
            "text_en": "Five flights was the whole plan. But Ingenuity was not ready to stop.",
            "text_vi": "Năm chuyến bay là toàn bộ kế hoạch. Nhưng Ingenuity chưa muốn dừng lại."
          },
          {
            "svg_value": 40,
            "text_en": "It became Perseverance's aerial scout: 72 flights in total, 17 kilometers of rocky ridges, 128.8 minutes aloft.",
            "text_vi": "Nó trở thành trinh sát đường không cho Perseverance: tổng cộng 72 chuyến bay, 17 km địa hình hiểm trở, 128,8 phút trên không."
          },
          {
            "svg_value": 72,
            "text_en": "On flight 72 the rotor tips struck a sandy slope. The wings are clipped — yet every morning its solar panel still wakes the computer to log Martian weather for about twenty years.",
            "text_vi": "Ở chuyến bay 72, đầu cánh quạt chạm vào sườn cát. Đôi cánh đã gãy — nhưng mỗi sáng tấm pin vẫn đánh thức máy tính để ghi thời tiết Sao Hỏa suốt khoảng 20 năm."
          }
        ],
        "quiz": {
          "question_en": "After its rotor blades broke, what does Ingenuity do now?",
          "question_vi": "Sau khi gãy cánh quạt, giờ Ingenuity làm gì?",
          "options_en": [
            "Works as a stationary weather and electronics test station",
            "Flew back to Earth",
            "Shut down forever on the spot"
          ],
          "options_vi": [
            "Làm trạm quan trắc thời tiết và vi mạch cố định",
            "Bay về Trái Đất",
            "Ngừng hoạt động mãi mãi tại chỗ"
          ],
          "answer_index": 0,
          "explain_en": "JPL uploaded a final software patch in April 2024: Ingenuity now wakes daily to test its avionics, measure temperature and store surface images for future retrieval.",
          "explain_vi": "JPL đã nạp bản cập nhật phần mềm cuối cùng tháng 4/2024: Ingenuity giờ thức dậy mỗi ngày để kiểm tra vi mạch, đo nhiệt độ và lưu ảnh bề mặt chờ thu hồi sau này."
        },
        "guess": {
          "question_en": "The plan was 5 flights. How many did Ingenuity actually fly?",
          "question_vi": "Kế hoạch chỉ có 5 chuyến bay. Ingenuity thực sự đã bay bao nhiêu chuyến?",
          "options_en": [
            "It stopped at 5, exactly as planned",
            "72 flights",
            "Exactly 100 flights"
          ],
          "options_vi": [
            "Dừng ở 5 chuyến, đúng kế hoạch",
            "72 chuyến bay",
            "Đúng 100 chuyến"
          ],
          "answer_index": 1,
          "reveal_en": "72 flights — 14 times the planned distance! Slide the flight log in the engineer's notebook from 1 to 72 to follow its whole life.",
          "reveal_vi": "72 chuyến — gấp 14 lần quãng đường thiết kế! Kéo nhật ký chuyến bay trong sổ tay kỹ sư từ 1 tới 72 để đi hết cuộc đời nó."
        }
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
};

window.UI_I18N = {
  en: {
    nav_stamps_label: "MISSION STAMPS",
    filter_all: "All (4)",
    filter_moon: "Moon (2)",
    filter_mars: "Mars (2)",
    hero_badge: "2026 NASA INTERNATIONAL SPACE APPS CHALLENGE • ABANDONED BUT NOT FORGOTTEN",
    hero_title: "LETTERS ACROSS THE SILENT SEAS",
    hero_subtitle: "Interactive Telemetry & Dual-Voice Storytelling about NASA's Forgotten Hardware on the Moon and Mars",
    hero_station_line1: "RECEIVING STATION: HANOI, VIETNAM (21.0285° N, 105.8542° E)",
    hero_station_line2: "LUNAR LASER ROUND-TRIP: 2.56 SECONDS | MARTIAN RADIO DELAY: 4 TO 24 MINUTES",
    hero_receiver_label: "DEEP-SPACE RECEIVER ARRAY:",
    hero_receiver_on: "ONLINE — LOCKING RELIC SIGNALS",
    hero_receiver_off: "STANDBY — CLICK TO ACTIVATE",
    hero_hook: "Looking up from the autumn night sky of Hanoi, we often think completed space missions are dead metal. Flip the receiver switch below: across the silent seas of the Moon and the dusty plains of Mars, NASA's forgotten hardware is still sending us decades of scientific truth.",
    cta_tune_in: "Tune Into the 4 Relic Signals ↓",
    cta_artemis: "Jump to Artemis Landing Simulator ⚡",
    chapter_prefix: "RELIC SIGNAL",
    moon_badge: "LUNAR SURFACE • MOON",
    mars_badge: "MARTIAN SURFACE • MARS",
    cospar_label: "COSPAR ID:",
    location_label: "COORDINATES:",
    status_label: "CURRENT STATE:",
    telemetry_station_title: "INTERACTIVE TELEMETRY & PHYSICS STATION",
    preset_label: "Preset Historical Milestones (Touch Fallback):",
    where_number_btn: "ⓘ Where does this number come from?",
    where_number_formula_title: "Physical Model & Historical Discrepancy Audit",
    where_number_sources_title: "Verified NASA Primary Sources:",
    tab_machine: "📡 The Machine's Pulse",
    tab_dossier: "🏛️ Archaeologist & Science Dossier",
    view_both_btn: "Split View",
    postmark_from: "TRANSMISSION ORIGIN:",
    postmark_to: "RECEIVED AT: HANOI STATION (21.0285° N)",
    dossier_sec1_title: "1. How the Mission Operated & The Science It Made Possible",
    dossier_sec2_title: "2. Current Functionality & Material State",
    dossier_sec3_title: "3. Space Heritage & Conservation Law",
    /* [REDESIGN 2026-11-13 • A+B HYBRID] Tem không còn thu bằng cách kéo
       thanh trượt, mà phải trả lời đúng câu hỏi cuối tập phim (quiz gate). */
    unlock_stamp_hint: "Answer the question at the end of this episode to collect its Mission Stamp!",
    stamp_collected_badge: "✓ STAMP COLLECTED",
    artemis_tag: "INTERACTIVE MODULE 01 • COMMANDER SIMULATION",
    artemis_subtitle: "Assume the role of Artemis Lunar Lander Commander. Select your touchdown distance from a historic Apollo/Surveyor site and observe the vacuum ballistics impact.",
    artemis_select_prompt: "Select Touchdown Separation Distance (4 Preset Zones):",
    artemis_impact_label: "Physical Plume & Regolith Consequence:",
    artemis_law_label: "Space Heritage Legal & Scientific Basis:",
    artemis_unlocked_msg: "🎉 2.0 KM HERITAGE SAFE ZONE CONFIRMED! You have unlocked the Space Heritage Guardian Certificate below.",
    artemis_locked_msg: "⚠️ Select the ≥ 2,000 m (2.0 km) Artemis Heritage Standard zone above to approve the landing and unlock your Guardian Certificate.",
    cert_section_tag: "INTERACTIVE MODULE 02 • ZERO-PII DIGITAL BADGE",
    cert_section_title: "SPACE HERITAGE GUARDIAN CERTIFICATE",
    cert_section_desc: "Commit to protecting humanity's extraterrestrial laboratories. Rendered 100% locally in your browser — no personal data is ever stored or transmitted.",
    cert_step1_label: "1. Choose Your Conservation Pledge:",
    cert_step2_label: "2. Enter Display Callsign / Nickname (Optional — Zero PII):",
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
    cert_download_btn: "⬇ Download Certificate PNG",
    cert_print_btn: "🖨️ Print / Save as PDF",
    cert_unlock_btn: "⚡ Auto-Verify ≥ 2,000 m Safe Zone to Unlock",
    teacher_tag: "STEM EDUCATION • 15-MINUTE CLASSROOM GUIDE",
    teacher_title: "15-MINUTE STEM CLASSROOM MODULE (AGES 11–15)",
    teacher_desc: "Designed for Middle & High School Physics and Natural Science teachers to integrate real NASA telemetry into a single 15-minute interactive activity.",
    teacher_cards: [
      {
        time: "MINUTES 1 – 5",
        topic: "Optics & Astronomy (Chapter 01)",
        body: "Students drag the Chapter 1 slider (1969–2026) to explore retroreflection on 3.8 cm fused-silica corner-cube prisms (LRRR) and calculate lunar distance using the speed of light (d = c × t / 2) and tidal recession (+3.8 cm/year).",
        btn: "Go to Chapter 01 ↑",
        target: "#chapter-apollo11-lrrr"
      },
      {
        time: "MINUTES 6 – 10",
        topic: "Solar Energy & Atmospheric Physics (Chapter 03)",
        body: "Students adjust Martian atmospheric optical depth (Tau τ from 1.0 to 10.8) in Chapter 3 to observe exponential solar irradiance attenuation on Opportunity's gallium-arsenide arrays (700 Wh down to 22 Wh).",
        btn: "Go to Chapter 03 ↑",
        target: "#chapter-opportunity-rover"
      },
      {
        time: "MINUTES 11 – 15",
        topic: "Vacuum Ballistics & Space Ethics (Artemis Station)",
        body: "Students test 4 landing distances at the Artemis Decision Station to understand ballistic ejecta in 1/6g vacuum (300–2,000 m/s) and discuss the One Small Step to Protect Human Heritage in Space Act (2020).",
        btn: "Go to Artemis Station ↑",
        target: "#artemis-station"
      }
    ],
    /* [REDESIGN 2026-11-13 • A+B HYBRID] New UI strings for the Mailbox + Episode flow */
    mailbox_eyebrow: "FOUR LETTERS ARE WAITING",
    mailbox_title: "The Cosmic Mailbox",
    mailbox_sub: "Four pieces of NASA hardware are still out there, and each one left a letter. Pick an envelope to hear its story — one at a time.",
    envelope_open: "Open the envelope",
    envelope_reopen: "Read again",
    envelope_done: "Stamp collected",
    episode_back: "Back to the mailbox",
    episode_switch: "Other envelopes:",
    step_word: "Beat",
    scroll_hint: "Scroll to hear the story",
    letter_heading: "A letter from the relic",
    dossier_toggle: "Engineer's notebook (open if you're curious)",
    quiz_title: "One small question",
    quiz_check: "Check answer",
    quiz_correct: "Correct! The postmark is yours.",
    quiz_wrong: "Not quite — scroll back through the beats, or try another answer.",
    quiz_explain: "Why:",
    next_envelope: "Next envelope →",
    all_done: "You collected all 4 stamps! The Guardian Certificate is waiting below.",
    /* [KIDS 2026-11-13] Chuỗi giao diện cho lớp tương tác trẻ em:
       đoán trước–kiểm tra sau, nút bắn laser, hotspot sticker. */
    guess_title: "GUESS FIRST — CHECK LATER!",
    guess_right: "You guessed it!",
    guess_miss: "Surprised? Here is the relic's true number:",
    laser_btn: "Fire the laser!",
    laser_flying: "Photon in flight — count aloud: 1… 2… 3…",
    laser_ping: "PING! One photon came home.",
    laser_counter: "Photons caught",
    laser_ratio: "out of 10¹⁷ fired",
    spot_hint: "What is this?",
    spot_got: "Discovery sticker collected!",
    sticker_tray: "Discovery stickers",
    cert_stickers_title: "DISCOVERY STICKERS:",
    sticker_all: "All 4 stickers — you are a true discovery detective!",
    /* [KIDS 2026-11-13 • v2] Chữ dẫn đường cho học sinh TỰ khám phá (10–18 tuổi) */
    help_title: "HOW TO EXPLORE THIS LETTER",
    help_step1: "Scroll slowly: each story beat changes the picture and the three numbers.",
    help_step2: "Drag the slider under the picture to try things yourself — everything reacts at once.",
    help_step3: "Tap the pulsing dot and the bright buttons on the picture to collect discovery stickers.",
    help_got: "Got it!",
    slider_hint: "Drag to explore freely. Scrolling the story on the right snaps the number back to each beat.",
    laser_hint: "Press the button: light races to the Moon and back in 2.56 seconds.",
    footer_sources_title: "VERIFIED NASA OPEN DATA & LEGAL ARCHIVES",
    footer_si_title: "SUPER INTELLIGENCE (SI) DISCLOSURE — SPACE APPS 2026",
    footer_si_btn: "Open Full SI Disclosure Modal",
    footer_compliance_notice: "Built for the 2026 NASA International Space Apps Challenge using NASA Open Data. No official NASA logos ('Meatball' or 'Worm') are used, in strict compliance with NASA Brand Guidelines.",
    si_col_tool: "SI / AI Tool",
    si_col_role: "Technical Role in Development",
    si_col_human: "Human Verification Gate (Manual Audit)"
  },
  vi: {
    nav_stamps_label: "TEM TÍN HIỆU",
    filter_all: "Tất cả (4)",
    filter_moon: "Mặt Trăng (2)",
    filter_mars: "Sao Hỏa (2)",
    hero_badge: "NASA INTERNATIONAL SPACE APPS CHALLENGE 2026 • BỊ BỎ LẠI NHƯNG KHÔNG BỊ LÃNG QUÊN",
    hero_title: "NHỮNG LÁ THƯ QUA BIỂN LẶNG",
    hero_subtitle: "Kể chuyện Hai Giọng & Mô phỏng Thông số Đo xa về những Thiết bị NASA Bị Bỏ lại trên Mặt Trăng và Sao Hỏa",
    hero_station_line1: "TRẠM THU SÓNG: HÀ NỘI, VIỆT NAM (21.0285° N, 105.8542° E)",
    hero_station_line2: "KHỨ HỒI LASER MẶT TRĂNG: 2,56 GIÂY | ĐỘ TRỄ VÔ TUYẾN SAO HỎA: 4 ĐẾN 24 PHÚT",
    hero_receiver_label: "MẢNG ĂNG-TEN THU SÓNG KHÔNG GIAN SÂU:",
    hero_receiver_on: "ĐANG THU SÓNG — ĐÃ KHÓA 4 TÍN HIỆU DI VẬT",
    hero_receiver_off: "CHẾ ĐỘ CHỜ — BẤM ĐỂ BẬT THU SÓNG",
    hero_hook: "Ngước nhìn bầu trời đêm thu Hà Nội, chúng ta thường ngỡ những sứ mệnh vũ trụ đã khép lại chỉ còn là sắt vụn vô tri. Hãy bật công tắc thu sóng bên dưới: khắp các biển lặng Mặt Trăng và bình nguyên bụi đỏ Sao Hỏa, những thiết bị bị bỏ lại của NASA vẫn đang gửi về hàng thập kỷ chân lý khoa học.",
    cta_tune_in: "Thu sóng 4 Tín hiệu Di vật ↓",
    cta_artemis: "Trạm Mô phỏng Hạ cánh Artemis ⚡",
    chapter_prefix: "TÍN HIỆU DI VẬT",
    moon_badge: "BỀ MẶT MẶT TRĂNG • MOON",
    mars_badge: "BỀ MẶT SAO HỎA • MARS",
    cospar_label: "MÃ ĐỊNH DANH COSPAR:",
    location_label: "TỌA ĐỘ ĐỊA LÝ:",
    status_label: "TRẠNG THÁI HIỆN TẠI:",
    telemetry_station_title: "TRẠM MÔ PHỎNG THANH TRƯỢT VẬT LÝ & ĐO XA",
    preset_label: "Các Mốc Trạng thái Cố định (Nút bấm dự phòng trên di động):",
    where_number_btn: "ⓘ Số này từ đâu? (Where does this number come from?)",
    where_number_formula_title: "Mô hình Vật lý & Đối chiếu Độ lệch Số liệu Lịch sử",
    where_number_sources_title: "Tài liệu Gốc Đã Kiểm chứng của NASA:",
    tab_machine: "📡 Giọng Cỗ máy (The Machine's Pulse)",
    tab_dossier: "🏛️ Hồ sơ Khảo cổ & Khoa học",
    view_both_btn: "Xem Song Song",
    postmark_from: "NGUỒN PHÁT TÍN HIỆU:",
    postmark_to: "ĐÀI THU: TRẠM MẶT ĐẤT HÀ NỘI (21,0285° B)",
    dossier_sec1_title: "1. Cơ chế Vận hành & Thành tựu Khoa học (How It Operated & Science)",
    dossier_sec2_title: "2. Trạng thái Hoạt động & Vật liệu Hiện tại (Current Functionality)",
    dossier_sec3_title: "3. Luật Bảo tồn Di sản Không gian (Space Heritage & Conservation Law)",
    /* [REDESIGN 2026-11-13 • A+B HYBRID] Tem không còn thu bằng cách kéo
       thanh trượt, mà phải trả lời đúng câu hỏi cuối tập phim (quiz gate). */
    unlock_stamp_hint: "Trả lời đúng câu hỏi ở cuối tập phim để thu Tem Tín hiệu của chương này!",
    stamp_collected_badge: "✓ ĐÃ THU THẬP TEM",
    artemis_tag: "MODULE ĐỘC LẬP 01 • TRẠM QUYẾT ĐỊNH CHỈ HUY",
    artemis_subtitle: "Nhập vai Chỉ huy Đổ bộ tàu Artemis. Hãy chọn khoảng cách hạ cánh xuống gần một di sản lịch sử trên Mặt Trăng và quan sát hệ quả đạn đạo trong chân không.",
    artemis_select_prompt: "Chọn Khoảng cách Hạ cánh (4 Vùng Quy chuẩn):",
    artemis_impact_label: "Hệ quả Vật lý Luồng phụt & Bụi Mặt Trăng:",
    artemis_law_label: "Căn cứ Khoa học & Pháp lý Bảo tồn:",
    artemis_unlocked_msg: "🎉 ĐÃ XÁC NHẬN VÙNG AN TOÀN DI SẢN ≥ 2,0 KM! Bạn đã mở khóa Thẻ Chứng nhận Space Heritage Guardian bên dưới.",
    artemis_locked_msg: "⚠️ Hãy chọn mốc chuẩn '≥ 2,000 m (2.0 km Safe Buffer)' phía trên để phê duyệt bãi đáp và mở khóa Thẻ Chứng nhận.",
    cert_section_tag: "MODULE ĐỘC LẬP 02 • THẺ CHỨNG NHẬN ZERO-PII",
    cert_section_title: "THẺ CHỨNG NHẬN SPACE HERITAGE GUARDIAN",
    cert_section_desc: "Cam kết bảo vệ những phòng thí nghiệm ngoài Trái Đất của nhân loại. Được tạo 100% ngay trên trình duyệt — không lưu trữ hay truyền đi bất kỳ dữ liệu cá nhân nào.",
    cert_step1_label: "1. Chọn Lời cam kết Bảo tồn (Conservation Pledge):",
    cert_step2_label: "2. Nhập Biệt danh / Tên hiển thị (Tùy chọn — Không lưu dữ liệu cá nhân):",
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
    cert_download_btn: "⬇ Tải Ảnh Chứng nhận (PNG)",
    cert_print_btn: "🖨️ In / Lưu PDF",
    cert_unlock_btn: "⚡ Tự động Chọn Mốc Chuẩn ≥ 2.000 m để Mở khóa",
    teacher_tag: "GIÁO DỤC STEM • GÓC GIÁO VIÊN 15 PHÚT",
    teacher_title: "GÓC GIÁO VIÊN STEM 15 PHÚT (DÀNH CHO HỌC SINH 11–15 TUỔI)",
    teacher_desc: "Thiết kế gọn gàng dành cho giáo viên THCS/THPT sử dụng ngay trong tiết Vật lý hoặc Khoa học Tự nhiên với dữ liệu thực từ NASA.",
    teacher_cards: [
      {
        time: "PHÚT 1 – 5",
        topic: "Quang học & Thiên văn (Chương 01)",
        body: "Học sinh kéo thanh trượt Chương 1 (1969–2026) để hiểu định luật phản xạ ánh sáng trên lăng kính góc LRRR (3,8 cm) và cách đo khoảng cách bằng tốc độ ánh sáng (d = c × t / 2) cùng độ trôi +3,8 cm/năm.",
        btn: "Tới Chương 01 ↑",
        target: "#chapter-apollo11-lrrr"
      },
      {
        time: "PHÚT 6 – 10",
        topic: "Năng lượng Tái tạo & Khí quyển (Chương 03)",
        body: "Học sinh kéo thanh trượt Chương 3 để quan sát sự suy giảm quang thông mặt trời theo độ mờ khí quyển (τ từ 1,0 lên 10,8) trên Sao Hỏa làm điện năng tụt từ 700 Wh xuống 22 Wh.",
        btn: "Tới Chương 03 ↑",
        target: "#chapter-opportunity-rover"
      },
      {
        time: "PHÚT 11 – 15",
        topic: "Đạn đạo Chân không & Đạo đức Không gian (Trạm Artemis)",
        body: "Học sinh thực hành tại Trạm Quyết định Artemis để hiểu chuyển động ném ngang của hạt bụi trong chân không trọng lực 1/6g (300–2.000 m/s) và thảo luận về Đạo luật One Small Step Act (2020).",
        btn: "Tới Trạm Artemis ↑",
        target: "#artemis-station"
      }
    ],
    /* [REDESIGN 2026-11-13 • A+B HYBRID] Chuỗi giao diện mới cho Hộp thư + Tập phim */
    mailbox_eyebrow: "BỐN LÁ THƯ ĐANG CHỜ",
    mailbox_title: "Hộp Thư Vũ Trụ",
    mailbox_sub: "Bốn thiết bị của NASA vẫn còn ở ngoài kia, và mỗi thiết bị để lại một lá thư. Hãy chọn một phong bì để nghe câu chuyện của nó — mỗi lần một phong bì.",
    envelope_open: "Mở phong bì",
    envelope_reopen: "Đọc lại",
    envelope_done: "Đã thu tem",
    episode_back: "Về hộp thư",
    episode_switch: "Phong bì khác:",
    step_word: "Nhịp",
    scroll_hint: "Cuộn để nghe câu chuyện",
    letter_heading: "Lá thư từ di vật",
    dossier_toggle: "Sổ tay kỹ sư (mở nếu bạn tò mò)",
    quiz_title: "Một câu hỏi nhỏ",
    quiz_check: "Kiểm tra đáp án",
    quiz_correct: "Chính xác! Con dấu bưu cục thuộc về bạn.",
    quiz_wrong: "Chưa đúng — hãy cuộn lại các nhịp, hoặc thử đáp án khác.",
    quiz_explain: "Vì sao:",
    next_envelope: "Phong bì kế tiếp →",
    all_done: "Bạn đã thu đủ 4 con tem! Thẻ chứng nhận Guardian đang chờ ở phía dưới.",
    /* [KIDS 2026-11-13] Chuỗi giao diện cho lớp tương tác trẻ em */
    guess_title: "ĐOÁN TRƯỚC — KIỂM TRA SAU!",
    guess_right: "Bạn đoán trúng rồi!",
    guess_miss: "Bất ngờ chưa? Đây là số thật của di vật:",
    laser_btn: "Bắn laser nào!",
    laser_flying: "Photon đang bay — đếm to nhé: 1… 2… 3…",
    laser_ping: "PING! Một photon đã về tới nhà.",
    laser_counter: "Photon bắt được",
    laser_ratio: "trong 10¹⁷ hạt bắn ra",
    spot_hint: "Cái gì đây?",
    spot_got: "Đã nhận sticker khám phá!",
    sticker_tray: "Sticker khám phá",
    cert_stickers_title: "STICKER KHÁM PHÁ:",
    sticker_all: "Đủ 4 sticker — bạn đúng là thám tử khám phá!",
    /* [KIDS 2026-11-13 • v2] Chữ dẫn đường cho học sinh TỰ khám phá (10–18 tuổi) */
    help_title: "CÁCH KHÁM PHÁ LÁ THƯ NÀY",
    help_step1: "Cuộn chậm: mỗi nhịp truyện sẽ đổi hình và ba ô số liệu bên cạnh.",
    help_step2: "Kéo con trượt dưới hình để tự thử — mọi thứ phản ứng ngay lập tức.",
    help_step3: "Bấm chấm nhấp nháy và các nút sáng trên hình để sưu tầm sticker khám phá.",
    help_got: "Đã hiểu!",
    slider_hint: "Kéo để tự do khám phá. Cuộn truyện bên phải sẽ đưa số về theo từng nhịp.",
    laser_hint: "Bấm nút: ánh sáng sẽ chạy khứ hồi Mặt Trăng trong 2,56 giây.",
    footer_sources_title: "DANH MỤC NGUỒN DỮ LIỆU MỞ NASA & HỒ SƠ PHÁP LÝ",
    footer_si_title: "KHAI BÁO SUPER INTELLIGENCE (SI DISCLOSURE 2026)",
    footer_si_btn: "Mở Cửa sổ Chi tiết SI Disclosure",
    footer_compliance_notice: "Được xây dựng cho cuộc thi 2026 NASA International Space Apps Challenge sử dụng Dữ liệu Mở NASA (NASA Open Data). Tuyệt đối không sử dụng logo chính thức của NASA ('Meatball' hay 'Worm') theo đúng Quy chuẩn Thương hiệu.",
    si_col_tool: "Công cụ SI / AI",
    si_col_role: "Vai trò Kỹ thuật trong Dự án",
    si_col_human: "Cổng Kiểm chứng Thủ công của Con người (Human Verification Gate)"
  }
};


/* Zero-CORS backwards-compatible alias (legacy modules read RELIC_DATA) */
window.RELIC_DATA = window.LUNAMARIS_DATA;
