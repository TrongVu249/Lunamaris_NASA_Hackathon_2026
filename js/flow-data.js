/**
 * LUNAMARIS — dữ liệu cho luồng truyện + trò chơi (2026-11-15)
 *  - LUNAMARIS_FLOW.story   : các chuỗi truyện chạm-để-sang (chỉ chữ; `img` là tùy chọn)
 *  - LUNAMARIS_FLOW.games   : cấu hình trò chơi của từng chương (giá trị bắt đầu, mục tiêu)
 *  - LUNAMARIS_FLOW.rules   : thẻ luật nhận được sau mỗi lá thư, dùng ở Game 5 (Artemis)
 *  - Bổ sung chữ giao diện vào window.UI_I18N (EN/VI)
 *  - LUNAMARIS_FLOW.letter5 : mẫu Lá thư thứ năm (DUSTER) + Sổ tay DUSTER cho popup Hồ sơ
 * Lời thoại lấy từ docs/Kich_ban_relic_Final_v2.md; Surveyor 3 dùng 160 m (đo từ ảnh LRO 2011, NASA SVS).
 * Thêm ảnh cho một cảnh: điền `img: "assets/story/<tên>.webp"` — thiếu ảnh thì dùng nền vẽ bằng CSS.
 */
(function () {
  "use strict";

  var C = "Columbina";

  window.LUNAMARIS_FLOW = {
    story: {
      intro: [
        {
          id: "intro-1", world: "earth", speaker: null, img: "assets/story/story-intro.webp",
          text_vi: "Trạm mặt đất Hà Nội, 02:40. Dưới đáy màn hình, một dòng tin chạy chậm: Artemis IV chuẩn bị đưa con người trở lại Mặt Trăng. Bãi đáp cho trạm đo bụi DUSTER: chưa chốt.",
          text_en: "Hanoi ground station, 02:40. A slow news ticker crawls along the bottom of the screen: Artemis IV is about to take people back to the Moon. Landing site for the DUSTER dust station: not decided."
        },
        {
          id: "intro-2", world: "earth", speaker: C, img: "assets/story/story-intro.webp",
          text_vi: "Ca đêm đầu tiên hả? Đừng lo, giờ này chẳng có gì xảy ra đâu.",
          text_en: "First night shift? Don't worry, nothing ever happens at this hour."
        },
        {
          id: "intro-3", world: "earth", speaker: null, img: "assets/story/story-intro.webp",
          text_vi: "Máy thu ở góc bàn kêu lên. Tích… tích… tích…",
          text_en: "The receiver in the corner starts to beep. Tick… tick… tick…"
        },
        {
          id: "intro-4", world: "earth", speaker: C, img: "assets/story/story-intro.webp",
          text_vi: "…Trừ cái đó.",
          text_en: "…Except that."
        },
        {
          id: "intro-5", world: "earth", speaker: C, img: "assets/story/story-intro.webp",
          text_vi: "Hai trên Mặt Trăng, hai trên Sao Hỏa. Toàn những cỗ máy người ta để lại từ lâu rồi. Không ai nghe chúng nữa. Nên mình nghe.",
          text_en: "Two on the Moon, two on Mars. Machines people left behind a long time ago. Nobody listens to them anymore. So we will."
        },
        {
          id: "intro-6", world: "earth", speaker: C, img: "assets/story/story-intro.webp",
          text_vi: "Mỗi tín hiệu là một lá thư. Nhưng muốn mở thì phải hiểu nó đã sống thế nào. Bạn mở cái đầu tiên đi.",
          text_en: "Each signal is a letter. But to open one, you have to understand how that machine lived. Go ahead, open the first one."
        }
      ],
      to_ch2: [
        {
          id: "to2-1", world: "moon", speaker: C, img: "assets/story/story-to-ch2.webp",
          text_vi: "Người ta đặt nó xuống rồi đi. Chắc không ai nghĩ nó sẽ làm việc lâu đến thế.",
          text_en: "They set it down and left. Nobody thought it would keep working this long."
        },
        {
          id: "to2-2", world: "moon", speaker: null, img: "assets/story/story-to-ch2.webp",
          text_vi: "Biển Bão Tố, Mặt Trăng. Một cỗ máy ba chân đứng trong lòng hố nông. Lớp sơn ngả màu nâu bẩn.",
          text_en: "Ocean of Storms, the Moon. A three-legged machine stands in a shallow crater. Its paint has turned a dirty brown."
        },
        {
          id: "to2-3", world: "moon", speaker: C, img: "assets/story/story-to-ch2.webp",
          text_vi: "Cái này từng bị thương. Do chúng ta.",
          text_en: "This one got hurt. By us."
        }
      ],
      to_ch3: [
        {
          id: "to3-1", world: "moon", speaker: C, img: "assets/story/story-to-ch3.webp",
          text_vi: "Người ta còn chọn chỗ đáp gần nó cho tiện đi bộ sang xem. Ai ngờ.",
          text_en: "They even landed close on purpose, so they could walk over and look. Who knew."
        },
        {
          id: "to3-2", world: "mars", speaker: null, img: "assets/story/story-to-ch3.webp",
          text_vi: "Thung lũng Perseverance, Sao Hỏa. Bầu trời màu cam, rồi đỏ thẫm. Một chiếc xe sáu bánh đứng yên, tấm pin phủ một lớp bụi mỏng.",
          text_en: "Perseverance Valley, Mars. The sky turns orange, then deep red. A six-wheeled rover sits still, a thin layer of dust on its solar panels."
        },
        {
          id: "to3-3", world: "mars", speaker: C, img: "assets/story/story-to-ch3.webp",
          text_vi: "Ôi. Bão bụi. Cả hành tinh luôn.",
          text_en: "Oh no. A dust storm. The whole planet."
        }
      ],
      to_ch4: [
        {
          id: "to4-1", world: "mars", speaker: C, img: "assets/story/story-to-ch4.webp",
          text_vi: "Nó không hỏng gì cả. Nó chỉ không còn thấy mặt trời.",
          text_en: "Nothing was broken. It just couldn't see the Sun anymore."
        },
        {
          id: "to4-2", world: "mars", speaker: null, img: "assets/story/story-to-ch4.webp",
          text_vi: "Hố Jezero, Sao Hỏa. Tiếng cánh quạt quay rít, nhanh và cao. Một chiếc trực thăng nhỏ như cái hộp, bốn chân mảnh, đứng trên nền cát.",
          text_en: "Jezero Crater, Mars. A high, fast whine of rotor blades. A helicopter the size of a tissue box stands on the sand on four thin legs."
        },
        {
          id: "to4-3", world: "mars", speaker: C, img: "assets/story/story-to-ch4.webp",
          text_vi: "Cái này thì chưa bao giờ chịu ngồi yên.",
          text_en: "This one never could sit still."
        }
      ],
      to_artemis: [
        {
          id: "toA-1", world: "mars", speaker: C, img: "assets/story/story-to-artemis.webp",
          text_vi: "Không ai cứu được nó đâu. Nhưng giờ mình biết vì sao nó ngã.",
          text_en: "Nobody could have saved it. But now we know why it fell."
        },
        {
          id: "toA-2", world: "earth", speaker: null, img: "assets/story/story-to-artemis.webp",
          text_vi: "Phòng trực, 04:10. Bốn lá thư nằm mở trên bàn. Dòng tin đổi màu hổ phách và chạy nhanh hơn: Artemis IV cần chọn bãi đáp trước bình minh. Bốn vùng ứng viên.",
          text_en: "The control room, 04:10. Four open letters lie on the desk. The ticker turns amber and speeds up: Artemis IV must pick a landing site before dawn. Four candidate zones."
        },
        {
          id: "toA-3", world: "earth", speaker: C, img: "assets/story/story-to-artemis.webp",
          text_vi: "Khoan. Chúng nó trả lời câu này từ lâu rồi.",
          text_en: "Wait. They answered this question a long time ago."
        }
      ],
      /* Cảnh 11 (cú lật): kết bằng câu hỏi → cảnh Lá thư thứ năm (letter5) */
      ending: [
        {
          id: "end-1", world: "moon", speaker: null, img: "assets/story/story-ending.webp",
          text_vi: "Trên bản đồ, con tàu ở vùng D đứng yên. Các phi hành gia đặt xuống chiếc xe nhỏ mang bộ đo bụi DUSTER, rồi quay lại tàu. Tàu cất cánh. DUSTER ở lại.",
          text_en: "On the map, the lander in zone D sits still. The astronauts set down a small rover carrying the DUSTER dust instruments, then walk back to the lander. The lander lifts off. DUSTER stays."
        },
        {
          id: "end-2", world: "moon", speaker: null, img: "assets/story/story-ending.webp",
          text_vi: "Columbina nhìn nó rất lâu.",
          text_en: "Columbina watches it for a long time."
        },
        {
          id: "end-3", world: "moon", speaker: C, img: "assets/story/story-ending.webp",
          text_vi: "Bạn thấy không?",
          text_en: "Do you see it?"
        },
        {
          id: "end-4", world: "moon", speaker: C, img: "assets/story/story-ending.webp",
          text_vi: "Cái máy mới đó tên là DUSTER. Người ta để nó lại để đo bụi Mặt Trăng, đúng thứ bụi từng làm khổ cái gương, làm xước Surveyor và che mắt Oppy.",
          text_en: "That new machine is called DUSTER. It was left there to measure lunar dust, the same dust that troubled the mirror, scarred Surveyor and blinded Oppy."
        },
        {
          id: "end-5", world: "moon", speaker: C, img: "assets/story/story-ending.webp",
          text_vi: "Rồi DUSTER cũng sẽ nằm lại đó. Năm mươi năm nữa, sẽ có ai đó ngồi đúng chỗ này lúc hai giờ sáng, và nghe nó gọi.",
          text_en: "One day DUSTER will be an old machine too. Fifty years from now, someone will sit right here at two in the morning and hear it call."
        },
        {
          id: "end-6", world: "earth", speaker: C, img: "assets/story/story-ending.webp",
          text_vi: "Vậy nó nên nói gì với họ?",
          text_en: "So what should it tell them?"
        }
      ],
      /* Cảnh 13 (Hà Nội 2076): xong thì sang cảnh "future" hiện lại lá thư người chơi vừa niêm phong */
      future: [
        {
          id: "fut-1", world: "earth", speaker: null, img: "assets/story/story-future.webp",
          text_vi: "Hà Nội, 02:40, năm 2076. Vẫn căn phòng đó. Màn hình mới hơn, ghế khác. Một người khác đang ngồi trực.",
          text_en: "Hanoi, 02:40, the year 2076. The same room. Newer screens, a different chair. Someone else is on the night shift."
        },
        {
          id: "fut-2", world: "earth", speaker: null, img: "assets/story/story-future.webp",
          text_vi: "Máy thu kêu lên. Tích… tích… tích…",
          text_en: "The receiver starts to beep. Tick… tick… tick…"
        },
        {
          id: "fut-3", world: "earth", speaker: null, img: "assets/story/story-future.webp",
          text_vi: "Trên bản đồ Mặt Trăng, cạnh chấm sáng của cái gương, có thêm một chấm sáng thứ năm mang tên DUSTER.",
          text_en: "On the lunar map, next to the mirror's light, there is a fifth light. It is called DUSTER."
        },
        {
          id: "fut-4", world: "earth", speaker: null, img: "assets/story/story-future.webp",
          text_vi: "Phong bì được mở. Đó là lá thư bạn vừa viết.",
          text_en: "The envelope opens. It is the letter you just wrote."
        }
      ]
    },

    /* Lá thư thứ năm (Cảnh 12). Chỉ chỗ trống cuối là do người chơi chọn hoặc tự viết. */
    letter5: {
      max_len: 120,
      greeting_vi: "Gửi người ở tương lai,",
      greeting_en: "To whoever comes in the future,",
      body_vi: [
        "Tôi là DUSTER, được phi hành gia Artemis IV đặt xuống Mặt Trăng để canh chừng những hạt bụi. Người ta chọn chỗ này cho tôi vì nó cách các di tích cũ hơn 2 km, có nắng và có đủ điểm mốc để tàu tìm đường.",
        "Chọn chỗ này là nhờ bốn người đi trước: một cái gương vẫn còn trả lời, một cỗ máy từng bị bụi làm bị thương, một chiếc xe đã chạy theo mặt trời, và một chiếc trực thăng từng bị lạc."
      ],
      body_en: [
        "I am DUSTER. The Artemis IV astronauts set me down on the Moon to keep watch over the dust. They chose this spot for me because it is more than 2 km from the old relics, it gets sunlight, and it has enough landmarks for landers to find their way.",
        "I owe this spot to four who came before me: a mirror that still answers, a machine once hurt by dust, a rover that chased the Sun, and a helicopter that once got lost."
      ],
      ask_vi: "Nếu bạn đến đây, xin hãy",
      ask_en: "If you come here, please",
      sign_vi: "DUSTER, Artemis IV",
      sign_en: "DUSTER, Artemis IV",
      suggestions_vi: ["đáp thật xa", "bắn laser chào cái gương bên cạnh", "kể cho tôi nghe Trái Đất giờ ra sao"],
      suggestions_en: ["land far away", "fire a laser to say hello to the mirror next door", "tell me what Earth is like now"],
      /* Sổ tay DUSTER (popup Hồ sơ Khoa học ở cảnh letter5) — chỉ ghi điều nguồn xác nhận */
      dossier: {
        title_vi: "DUSTER và sứ mệnh Artemis IV",
        title_en: "DUSTER and the Artemis IV mission",
        body_vi: [
          "DUSTER (DUst and plaSma environmenT survEyoR) là bộ thiết bị đo bụi và plasma do phòng thí nghiệm LASP, Đại học Colorado Boulder, chế tạo. Bộ này gồm máy phân tích bụi tĩnh điện (EDA) đo các hạt bụi bị bốc lên khỏi mặt đất, và máy dò RESOLVE đo mật độ electron phía trên bề mặt.",
          "Bộ thiết bị gắn trên một xe tự hành nhỏ (MAPP của công ty Lunar Outpost) và sẽ được phi hành gia triển khai ở gần cực Nam Mặt Trăng. Nó đo xem bụi và plasma phản ứng thế nào khi con người và tàu vũ trụ hoạt động, để giảm nguy hiểm cho sức khỏe và thiết bị của các sứ mệnh sau.",
          "Tháng 12/2025, NASA chọn DUSTER cùng trạm địa chấn SPSS để tiếp tục phát triển cho Artemis IV. NASA cho biết danh sách thiết bị cuối cùng của sứ mệnh sẽ được quyết định sau.",
          "Trong câu chuyện này, bãi đáp vùng D và việc DUSTER ở lại suốt 50 năm là phần hư cấu, dựng trên những dữ kiện trên."
        ],
        body_en: [
          "DUSTER (DUst and plaSma environmenT survEyoR) is a dust and plasma instrument suite built by the LASP laboratory at the University of Colorado Boulder. It pairs an Electrostatic Dust Analyzer (EDA), which measures dust grains lofted off the ground, with the RESOLVE sounder, which measures electron density above the surface.",
          "The suite rides on a small rover (Lunar Outpost's MAPP) that astronauts will deploy near the lunar south pole. It measures how dust and plasma respond when people and spacecraft are active, to reduce the hazard to the health and hardware of later missions.",
          "In December 2025, NASA selected DUSTER, together with the SPSS seismic station, for further development for Artemis IV. NASA says the mission's final manifest will be decided at a later date.",
          "In this story, the zone D landing site and DUSTER staying for 50 years are fiction, built on the facts above."
        ],
        links: [
          { label: "NASA: NASA Selects 2 Instruments for Artemis IV Lunar Surface Science", url: "https://science.nasa.gov/missions/artemis/artemis-4/nasa-selects-2-instruments-for-artemis-iv-lunar-surface-science/" },
          { label: "LASP: instruments target a trip to the Moon aboard Artemis IV", url: "https://lasp.colorado.edu/2025/12/05/lasp-instruments-target-a-trip-to-the-moon-aboard-nasas-artemis-iv-mission/" },
          { label: "NASA (2011): Recommendations to protect historic lunar sites (2 km)", url: "https://www.nasa.gov/wp-content/uploads/2017/10/617743main_nasa-usg_lunar_historic_sites_reva-508.pdf" }
        ]
      }
    },

    /* Trò chơi của từng chương. kind: "hold" (nhấn giữ) | "slider" (thanh trượt tới mục tiêu). */
    games: {
      "apollo11-lrrr": {
        kind: "hold",
        hold_ms: 2560,
        cue_vi: "Cái này không có pin, không có radio. Nó không gọi được ai cả. Muốn nói chuyện với nó thì phải chiếu ánh sáng vào.",
        cue_en: "It has no battery and no radio. It can't call anyone. To talk to it, you have to shine light at it.",
        goal_vi: "Nhấn giữ nút cho tới khi ánh sáng quay về Trái Đất, khoảng 2,56 giây.",
        goal_en: "Press and hold the button until the light comes back to Earth, about 2.56 seconds.",
        win_vi: "Một chấm sáng nhỏ quay về. Nó vẫn trả lời.",
        win_en: "A tiny point of light comes back. It still answers."
      },
      "surveyor-3": {
        kind: "slider",
        start: 2500,
        target: 160,
        tolerance: 15,
        cue_vi: "Năm 1969, tàu Intrepid của Apollo 12 hạ xuống gần Surveyor 3. Bụi từ động cơ bắn ngang mặt đất như cát phun.",
        cue_en: "In 1969, Apollo 12's lander Intrepid came down near Surveyor 3. Engine exhaust blasted dust sideways like a sandblaster.",
        goal_vi: "Kéo thanh để đưa tàu Intrepid tới đúng chỗ nó đã đáp: cách Surveyor 3 khoảng 160 m.",
        goal_en: "Drag the slider to bring Intrepid to where it really landed: about 160 m from Surveyor 3.",
        far_vi: "Còn xa. Kéo tàu lại gần hơn.",
        far_en: "Still far. Bring the lander closer.",
        near_vi: "Gần hơn cả năm 1969 rồi. Lùi ra một chút.",
        near_en: "That's closer than in 1969. Back off a little.",
        win_vi: "160 m. Lớp sơn trắng của Surveyor 3 ngả nâu, ống kính bị rỗ. Vẫn chưa đủ xa.",
        win_en: "160 m. Surveyor 3's white paint turns brown and its lens gets pitted. Still not far enough."
      },
      "opportunity-rover": {
        kind: "slider",
        start: 1,
        target: 10.8,
        cue_vi: "Ôi. Bão bụi phủ cả hành tinh. Nhìn đồng hồ điện kìa.",
        cue_en: "A dust storm is covering the whole planet. Look at the power meter.",
        goal_vi: "Kéo thanh độ dày của bụi tới khi điện còn 22 Wh, mức của tín hiệu cuối cùng.",
        goal_en: "Drag the dust thickness slider until power drops to 22 Wh, the level of the last signal.",
        win_vi: "22 Wh mỗi ngày. Không đủ để thức. Giữa trưa mà tối như nửa đêm.",
        win_en: "22 Wh a day. Not enough to stay awake. Noon is as dark as midnight."
      },
      "ingenuity-helicopter": {
        kind: "slider",
        start: 1,
        target: 72,
        cue_vi: "Không khí ở đây chỉ dày bằng khoảng 1% ở Trái Đất. Người ta chỉ mong nó bay 5 lần.",
        cue_en: "The air here is only about 1% as thick as Earth's. The team hoped for 5 flights.",
        goal_vi: "Kéo số chuyến bay tới chuyến 72, chuyến cuối cùng.",
        goal_en: "Drag the flight counter to flight 72, the last one.",
        win_vi: "Chuyến 72. Đồi cát trơn nhẵn, camera không tìm được viên đá nào làm mốc. Cánh quạt gãy.",
        win_en: "Flight 72. The sand ripples were smooth, the camera found no rock to track. A rotor blade broke."
      }
    },

    /* Thẻ luật: zone = vùng mà thẻ loại bỏ (hoặc làm hiện) ở Game 5. */
    rules: {
      "apollo11-lrrr": {
        zone: "A", effect: "reveal",
        title_vi: "Di tích vẫn đang làm việc", title_en: "The relic is still working",
        sub_vi: "“Tôi chỉ sợ bụi.”", sub_en: "“I am only afraid of dust.”",
        say_vi: "Ở vùng A có một thứ vẫn đang làm việc: cái gương.", say_en: "Something in zone A is still working: the mirror."
      },
      "surveyor-3": {
        zone: "A", effect: "cross",
        title_vi: "Cách di tích ít nhất 2 km", title_en: "Stay at least 2 km away",
        sub_vi: "“160 m vẫn chưa đủ xa.”", sub_en: "“160 m was still not far enough.”",
        say_vi: "Vùng A nằm trọn trong vòng 2 km. Gần quá, bụi sẽ phủ lên nó.", say_en: "Zone A is inside the 2 km ring. Too close, the dust would bury it."
      },
      "opportunity-rover": {
        zone: "B", effect: "cross",
        title_vi: "Phải có nắng", title_en: "There must be sunlight",
        sub_vi: "“Không đủ để thức.”", sub_en: "“Not enough to stay awake.”",
        say_vi: "Đáy hố B khuất nắng quanh năm. Không có mặt trời thì pin nào cũng cạn.", say_en: "Crater B sits in shadow all year. Without the Sun, every battery runs dry."
      },
      "ingenuity-helicopter": {
        zone: "C", effect: "cross",
        title_vi: "Phải có điểm mốc", title_en: "There must be landmarks",
        sub_vi: "“…không tìm được viên đá nào làm mốc.”", sub_en: "“…couldn't find a single rock to hold on to.”",
        say_vi: "Đồng bằng C phẳng lì, không có hố nhỏ hay đá nào làm mốc. Tàu sẽ trượt giống Ingenuity.", say_en: "Plain C is flat, with no small craters or rocks to track. The lander would slip, like Ingenuity."
      }
    }
  };

  /* ---------------- chữ giao diện bổ sung ---------------- */
  var extra = {
    en: {
      signals_lead: "Listen to them in order. Each letter opens once you understand how its machine lived.",
      dossier_btn: "Science dossier",
      dossier_close: "Close dossier",
      dossier_title: "Science dossier",
      skip_game: "Skip",
      skip_game_hint: "Skipping still gives you this chapter's rule card.",
      skip_story: "Skip",
      story_tap: "Tap to continue",
      story_label: "Story",
      story_titles: { intro: "Prologue", to_ch2: "Interlude", to_ch3: "Interlude", to_ch4: "Interlude", to_artemis: "Interlude", ending: "The twist", future: "Hanoi, 2076" },
      dossier_log_title: "Technical log (the long version of the letter)",
      letter5_title: "The fifth letter",
      letter5_lead: "One day DUSTER will be a machine left behind too. Finish its last line for the night-shift worker of 2076.",
      letter5_pick: "Choose the last line",
      letter5_custom: "Write my own",
      letter5_custom_label: "Your line",
      letter5_custom_ph: "Up to {n} characters",
      letter5_count: "{n} characters left",
      letter5_seal: "Seal the letter",
      letter5_sealed: "Sealed. This letter will wait here for the future.",
      letter5_reopen: "Unseal and edit",
      letter5_download: "Download",
      letter5_privacy: "The letter stays on this device only. Nothing is sent anywhere and we never ask for your name.",
      letter5_continue: "Continue",
      letter5_empty: "Write your line first, or choose a suggestion.",
      letter5_skip_hint: "Skipping still seals the letter. If you haven't written anything, it uses the first suggestion.",
      letter5_dossier: "Science dossier: DUSTER",
      future_kicker: "The envelope opens",
      future_tagline: "Listen to the old machines to know where to take the next step.",
      future_sources: "NASA data sources",
      future_teacher: "Teacher's corner",
      future_guardian: "Next: Space Heritage Guardian card",
      future_rewrite: "Rewrite the letter",
      scene_title_letter5: "The fifth letter",
      scene_title_future: "Hanoi, 2076",
      game_open_letter: "Open the letter",
      game_replay: "Play again",
      game_reread: "Read the letter again",
      letter_from: "A letter from",
      letter_continue: "Continue",
      rule_new: "New rule card",
      laser_hold: "Hold to fire the laser",
      laser_keys: "Or hold the Space key",
      laser_early: "Too early. The light hadn't come back yet. Hold again.",
      laser_returned: "Light returned",
      flight_of: "Flight {n} of 72",
      sig_done: "Heard",
      sig_open: "Waiting",
      sig_locked: "Not yet",
      sig_unlock: "Open this stage",
      sig_artemis: "Artemis IV landing site",
      sig_artemis_where: "After all four letters",
      replay_story: "Watch the story again",
      gate_locked: "Finish the game or press Skip to go on.",
      art_title: "Pick a landing site for Artemis IV",
      art_lead: "Tap a rule card, then tap the zone that card rules out. When only one zone is left, land there.",
      art_map_note: "Training map, not real coordinates.",
      art_cards_label: "Your rule cards",
      art_card_unheard: "letter not heard yet",
      art_pick_card: "Pick a rule card first.",
      art_zone: "Zone {z}",
      art_zone_desc: { A: "near an old relic", B: "bottom of a deep crater", C: "smooth, flat plain", D: "sunny slope with rocks" },
      art_wrong: "That rule doesn't rule out this zone. Try another one.",
      art_wrong_d: "Zone D has sunlight, rocks for landmarks, and is over 2 km from the relic. No rule rules it out.",
      art_done_zone: "This zone is already ruled out.",
      art_all_clear: "So it's D.",
      art_soil: "Surveyor 3's letter lights up once more: the ground here is firm enough.",
      game_send_packet: "Send the last packet",
      game_packet_sent: "The last 0s and 1s reach the antenna.",
      art_land_btn: "Land in zone D",
      art_land_wait: "Rule out zones A, B and C first.",
      art_laser_btn: "Fire the laser once more",
      art_still_answers: "It still answers.",
      art_continue: "Continue",
      scene_title_story_intro: "Prologue"
    },
    vi: {
      signals_lead: "Nghe lần lượt từng tín hiệu. Mỗi lá thư mở ra khi bạn hiểu cỗ máy đó đã sống thế nào.",
      dossier_btn: "Hồ sơ Khoa học",
      dossier_close: "Đóng hồ sơ",
      dossier_title: "Hồ sơ Khoa học",
      skip_game: "Bỏ qua",
      skip_game_hint: "Bỏ qua vẫn nhận được thẻ luật của chương này.",
      skip_story: "Bỏ qua",
      story_tap: "Chạm để tiếp",
      story_label: "Truyện",
      story_titles: { intro: "Mở đầu", to_ch2: "Chuyển cảnh", to_ch3: "Chuyển cảnh", to_ch4: "Chuyển cảnh", to_artemis: "Chuyển cảnh", ending: "Cú lật", future: "Hà Nội, 2076" },
      dossier_log_title: "Nhật ký kỹ thuật (bản dài của lá thư)",
      letter5_title: "Lá thư thứ năm",
      letter5_lead: "Rồi DUSTER cũng sẽ thành một cỗ máy bị bỏ lại. Hãy viết giúp nó lời nhắn cuối cho người trực đêm năm 2076.",
      letter5_pick: "Chọn lời nhắn cuối",
      letter5_custom: "Tự viết",
      letter5_custom_label: "Lời nhắn của bạn",
      letter5_custom_ph: "Tối đa {n} ký tự",
      letter5_count: "Còn {n} ký tự",
      letter5_seal: "Niêm phong",
      letter5_sealed: "Đã niêm phong. Lá thư sẽ chờ ở đây cho tương lai.",
      letter5_reopen: "Mở niêm phong để sửa",
      letter5_download: "Tải về",
      letter5_privacy: "Lá thư chỉ lưu trên máy này. Không gửi đi đâu và không hỏi tên bạn.",
      letter5_continue: "Đi tiếp",
      letter5_empty: "Viết lời nhắn trước, hoặc chọn một gợi ý.",
      letter5_skip_hint: "Bỏ qua vẫn niêm phong thư. Nếu bạn chưa viết gì, thư dùng gợi ý đầu tiên.",
      letter5_dossier: "Hồ sơ Khoa học: DUSTER",
      future_kicker: "Phong bì được mở",
      future_tagline: "Lắng nghe những cỗ máy cũ để biết nên đặt bước chân mới ở đâu.",
      future_sources: "Nguồn dữ liệu NASA",
      future_teacher: "Góc giáo viên",
      future_guardian: "Tiếp: Thẻ Space Heritage Guardian",
      future_rewrite: "Viết lại lá thư",
      scene_title_letter5: "Lá thư thứ năm",
      scene_title_future: "Hà Nội, 2076",
      game_open_letter: "Mở lá thư",
      game_replay: "Chơi lại",
      game_reread: "Đọc lại thư",
      letter_from: "Thư gửi từ",
      letter_continue: "Đi tiếp",
      rule_new: "Thẻ luật mới",
      laser_hold: "Giữ để bắn laser",
      laser_keys: "Hoặc giữ phím Space",
      laser_early: "Thả sớm quá, ánh sáng chưa kịp quay về. Giữ lại lần nữa.",
      laser_returned: "Ánh sáng đã về",
      flight_of: "Chuyến {n} / 72",
      sig_done: "Đã nghe",
      sig_open: "Đang chờ",
      sig_locked: "Chưa tới",
      sig_unlock: "Mở chặng này",
      sig_artemis: "Bãi đáp Artemis IV",
      sig_artemis_where: "Sau bốn lá thư",
      replay_story: "Xem lại câu chuyện",
      gate_locked: "Hoàn thành trò chơi hoặc bấm Bỏ qua để đi tiếp.",
      art_title: "Chọn bãi đáp cho Artemis IV",
      art_lead: "Chạm một thẻ luật, rồi chạm vùng mà thẻ đó loại bỏ. Khi chỉ còn một vùng, hạ cánh ở đó.",
      art_map_note: "Bản đồ mô phỏng huấn luyện, không phải tọa độ thực địa.",
      art_cards_label: "Thẻ luật của bạn",
      art_card_unheard: "chưa nghe lá thư này",
      art_pick_card: "Chọn một thẻ luật trước đã.",
      art_zone: "Vùng {z}",
      art_zone_desc: { A: "gần một di tích cũ", B: "đáy một hố sâu", C: "đồng bằng phẳng lì", D: "sườn dốc có nắng, có đá" },
      art_wrong: "Thẻ này không loại được vùng đó. Thử vùng khác xem.",
      art_wrong_d: "Vùng D có nắng, có đá làm mốc và cách di tích hơn 2 km. Không thẻ nào loại được nó.",
      art_done_zone: "Vùng này đã bị loại rồi.",
      art_all_clear: "Vậy là D.",
      art_soil: "Lá thư Surveyor 3 sáng lên lần nữa: đất ở đây đủ chắc.",
      game_send_packet: "Gửi gói tin cuối",
      game_packet_sent: "Những số 0 và 1 cuối cùng đã tới ăng-ten.",
      art_land_btn: "Hạ cánh ở vùng D",
      art_land_wait: "Loại xong các vùng A, B và C trước đã.",
      art_laser_btn: "Bắn laser lần nữa",
      art_still_answers: "Nó vẫn trả lời.",
      art_continue: "Đi tiếp",
      scene_title_story_intro: "Mở đầu"
    }
  };

  var all = window.UI_I18N || (window.UI_I18N = {});
  ["en", "vi"].forEach(function (lang) {
    all[lang] = all[lang] || {};
    Object.keys(extra[lang]).forEach(function (k) {
      all[lang][k] = extra[lang][k];
    });
  });
})();
