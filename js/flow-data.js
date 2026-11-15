/**
 * LUNAMARIS — dữ liệu cho luồng truyện + trò chơi (2026-11-15)
 *  - LUNAMARIS_FLOW.story   : các chuỗi truyện chạm-để-sang (chỉ chữ; `img` là tùy chọn)
 *  - LUNAMARIS_FLOW.games   : cấu hình trò chơi của từng chương (giá trị bắt đầu, mục tiêu)
 *  - LUNAMARIS_FLOW.rules   : thẻ luật nhận được sau mỗi lá thư, dùng ở Game 5 (Artemis)
 *  - Bổ sung chữ giao diện vào window.UI_I18N (EN/VI)
 *  - LUNAMARIS_FLOW.letter5 : mẫu Lá thư thứ năm (DUSTER) + Sổ tay DUSTER cho popup Hồ sơ
 * Lời thoại phỏng theo docs/Kich_ban_relic_Final_v2.md, viết lại cho web theo skill .claude/skills/loi-ke-tu-nhien; Surveyor 3 dùng 160 m (đo từ ảnh LRO 2011, NASA SVS).
 * Thêm ảnh cho một cảnh: điền `img: "assets/story/<tên>.webp"` — thiếu ảnh thì dùng nền vẽ bằng CSS.
 */
(function () {
  "use strict";

  var C = { vi: "Thu Nguyệt", en: "Thu Nguyet" };

  window.LUNAMARIS_FLOW = {
    story: {
      intro: [
        {
          id: "intro-1", world: "earth", speaker: null, img: "assets/story/intro-01-desk.webp",
          text_vi: "Đã 02:40, Hà Nội ngủ cả rồi. Phòng trực của trạm mặt đất chỉ còn ánh sáng từ dãy màn hình, nơi một dòng tin cứ chạy chầm chậm: Artemis IV sắp đưa người trở lại Mặt Trăng, còn chỗ đặt trạm đo bụi DUSTER thì chưa ai chốt.",
          text_en: "It's 02:40 and Hanoi is asleep. In the control room, the only light comes from the screens, where a news line crawls by: Artemis IV will soon take people back to the Moon, but no one has picked a spot for the DUSTER dust station."
        },
        {
          id: "intro-2", world: "earth", speaker: C, img: "assets/story/intro-02-thunguyet.webp",
          text_vi: "Ca đêm đầu tiên hả? Đừng lo, giờ này chẳng có gì xảy ra đâu.",
          text_en: "First night shift? Don't worry, nothing ever happens at this hour."
        },
        {
          id: "intro-3", world: "earth", speaker: null, img: "assets/story/intro-03-radio-beep.webp",
          text_vi: "Cô vừa dứt lời thì cái máy thu ở góc bàn bỗng kêu. Tích… tích… tích…",
          text_en: "She has barely finished speaking when the receiver in the corner of the desk starts to beep. Tick… tick… tick…"
        },
        {
          id: "intro-4", world: "earth", speaker: C, img: "assets/story/intro-03-radio-beep.webp",
          text_vi: "…Trừ cái đó.",
          text_en: "…Except that."
        },
        {
          id: "intro-5", world: "earth", speaker: C, img: "assets/story/intro-04-envelopes.webp",
          text_vi: "Hai cái trên Mặt Trăng, hai cái trên Sao Hỏa kìa. Toàn máy móc người ta bỏ lại từ lâu lắm rồi. Giờ chẳng ai nghe chúng nữa. Thế thì mình nghe.",
          text_en: "Two on the Moon, two on Mars, see? All machines people left behind ages ago. Nobody listens to them anymore. So we will."
        },
        {
          id: "intro-6", world: "earth", speaker: C, img: "assets/story/intro-04-envelopes.webp",
          text_vi: "Mỗi tín hiệu là một lá thư đấy. Nhưng muốn mở được thì phải hiểu cỗ máy ấy đã sống thế nào đã. Bạn mở cái đầu tiên đi.",
          text_en: "Every signal is a letter. But you can only open one once you understand how that machine lived. Go on, open the first one."
        }
      ],
      to_ch2: [
        {
          id: "to2-1", world: "moon", speaker: C, img: "assets/story/to2-01-lrrr-beam.webp",
          text_vi: "Người ta đặt nó xuống rồi đi về. Chắc chẳng ai nghĩ nó làm việc được lâu đến thế đâu.",
          text_en: "They set it down and went home. Nobody thought it would keep working this long."
        },
        {
          id: "to2-2", world: "moon", speaker: null, img: "assets/story/to2-02-surveyor3-scar.webp",
          text_vi: "Trên Biển Bão Tố của Mặt Trăng, một cỗ máy ba chân đứng trong lòng hố nông, lớp sơn đã ngả màu nâu bẩn. Ở đó chẳng có gió, vậy mà máy thu cứ rè rè như có gì đang cọ vào kim loại.",
          text_en: "Out on the Moon's Ocean of Storms, a three-legged machine stands in a shallow crater, its paint gone a dirty brown. There's no wind up there, yet the receiver keeps crackling, as if something is scraping metal."
        },
        {
          id: "to2-3", world: "moon", speaker: C, img: "assets/story/to2-02-surveyor3-scar.webp",
          text_vi: "Cái này từng bị thương. …Mà là tại chúng mình đấy.",
          text_en: "This one got hurt once. …And it was our fault."
        }
      ],
      to_ch3: [
        {
          id: "to3-1", world: "moon", speaker: C, img: "assets/story/story-to-ch2.webp",
          text_vi: "Thế mà người ta còn cố ý chọn chỗ đáp gần nó, cho tiện đi bộ sang xem đấy. Ai ngờ.",
          text_en: "And they landed close on purpose, so they could walk over and take a look. Who knew."
        },
        {
          id: "to3-2", world: "mars", speaker: null, img: "assets/story/story-to-ch3.webp",
          text_vi: "Gió rít từng cơn qua Thung lũng Perseverance trên Sao Hỏa, bầu trời ngả cam rồi đỏ thẫm. Giữa sườn thung lũng, một chiếc xe sáu bánh đứng yên, tấm pin đã phủ một lớp bụi mỏng.",
          text_en: "Wind howls through Perseverance Valley on Mars as the sky turns orange, then deep red. Halfway up the slope, a six-wheeled rover sits still, a thin layer of dust on its solar panels."
        },
        {
          id: "to3-3", world: "mars", speaker: C, img: "assets/story/story-to-ch3.webp",
          text_vi: "Chết thật, bão bụi. Phủ kín cả hành tinh luôn.",
          text_en: "Oh no, a dust storm. And it's covering the whole planet."
        }
      ],
      to_ch4: [
        {
          id: "to4-1", world: "mars", speaker: C, img: "assets/story/story-to-ch4.webp",
          text_vi: "Nó có hỏng gì đâu. Chỉ là không còn thấy mặt trời nữa thôi.",
          text_en: "Nothing was broken. It just couldn't see the Sun anymore."
        },
        {
          id: "to4-2", world: "mars", speaker: null, img: "assets/story/to4-02-ingenuity-flight.webp",
          text_vi: "Giữa hố Jezero trên Sao Hỏa, một chiếc trực thăng bé bằng cái hộp giấy ăn đang đứng trên bốn cái chân mảnh. Cánh quạt của nó quay tít, rít lên nhanh và cao.",
          text_en: "In Jezero Crater on Mars, a helicopter the size of a tissue box stands on four thin legs. Its rotors spin hard, with a high, fast whine."
        },
        {
          id: "to4-3", world: "mars", speaker: C, img: "assets/story/to4-02-ingenuity-flight.webp",
          text_vi: "Cái này thì chẳng bao giờ chịu ngồi yên đâu.",
          text_en: "This one never could sit still."
        }
      ],
      to_artemis: [
        {
          id: "toA-1", world: "mars", speaker: C, img: "assets/story/to4-02-ingenuity-flight.webp",
          text_vi: "Không ai cứu được nó đâu. Nhưng ít ra giờ mình biết vì sao nó ngã.",
          text_en: "Nobody could have saved it. But at least now we know why it fell."
        },
        {
          id: "toA-2", world: "earth", speaker: null, img: "assets/story/toA-02-artemis-alert.webp",
          text_vi: "Bốn lá thư nằm mở trên bàn, còn máy thu thì đã im. Đến 04:10, dòng tin dưới màn hình bỗng đổi sang màu hổ phách và chạy nhanh hơn: Artemis IV phải chọn bãi đáp trước bình minh, trong bốn vùng ứng viên.",
          text_en: "Four letters lie open on the desk, and the receiver has gone quiet. At 04:10 the news line turns amber and speeds up: Artemis IV has to pick a landing site before dawn, from four candidate zones."
        },
        {
          id: "toA-3", world: "earth", speaker: C, img: "assets/story/toA-02-artemis-alert.webp",
          text_vi: "Khoan đã. Mấy cỗ máy này trả lời câu đó từ lâu rồi mà.",
          text_en: "Wait. They answered this question a long time ago."
        }
      ],
      /* Cảnh 11 (cú lật): kết bằng câu hỏi → cảnh Lá thư thứ năm (letter5) */
      ending: [
        {
          id: "end-1", world: "moon", speaker: null, img: "assets/story/story-ending.webp",
          text_vi: "Con tàu ở vùng D nằm yên trên bản đồ. Các phi hành gia đặt xuống một chiếc xe nhỏ mang bộ đo bụi DUSTER, rồi quay về tàu. Tàu cất cánh, còn DUSTER thì ở lại.",
          text_en: "On the map, the lander in zone D sits still. The astronauts set down a small rover carrying the DUSTER dust instruments and head back. The lander lifts off, and DUSTER stays behind."
        },
        {
          id: "end-2", world: "moon", speaker: null, img: "assets/story/ending-02-thunguyet-gaze.webp",
          text_vi: "Thu Nguyệt ngả người ra ghế, lần đầu tiên trong đêm trông cô nhẹ nhõm. Cô nhìn nó rất lâu.",
          text_en: "Thu Nguyet leans back in her chair, relieved for the first time tonight. She watches it for a long time."
        },
        {
          id: "end-3", world: "moon", speaker: C, img: "assets/story/ending-02-thunguyet-gaze.webp",
          text_vi: "Bạn thấy không?",
          text_en: "Do you see it?"
        },
        {
          id: "end-4", world: "moon", speaker: C, img: "assets/story/ending-03-duster-alone.webp",
          text_vi: "Cái máy mới ấy tên là DUSTER. Người ta để nó lại đo bụi trên Mặt Trăng. Bụi, cái thứ từng làm khổ cái gương, làm xước Surveyor và che mắt Oppy.",
          text_en: "That new machine is DUSTER. They left it there to measure dust on the Moon. Dust: the thing that troubled the mirror, scarred Surveyor and blinded Oppy."
        },
        {
          id: "end-5", world: "moon", speaker: C, img: "assets/story/ending-03-duster-alone.webp",
          text_vi: "Rồi một ngày DUSTER cũng thành cỗ máy cũ nằm lại đó. Năm mươi năm nữa, sẽ có ai đó ngồi đúng chỗ này lúc hai giờ sáng, và nghe nó gọi.",
          text_en: "One day DUSTER will be an old machine too. Fifty years from now, someone will sit right here at two in the morning and hear it call."
        },
        {
          id: "end-6", world: "earth", speaker: C, img: "assets/story/ending-02-thunguyet-gaze.webp",
          text_vi: "Thế nó nên nói gì với họ nhỉ?",
          text_en: "So what should it tell them?"
        }
      ],
      /* Cảnh 13 (Hà Nội 2076): xong thì sang cảnh "future" hiện lại lá thư người chơi vừa niêm phong */
      future: [
        {
          id: "fut-1", world: "earth", speaker: null, img: "assets/story/future-01-room-2076.webp",
          text_vi: "Năm 2076, đồng hồ ở Hà Nội lại chỉ 02:40, trong đúng căn phòng ấy. Màn hình mới hơn, ghế cũng khác, và người ngồi trực là một người khác, quay lưng về phía chúng ta.",
          text_en: "It's 2076, and in Hanoi the clock reads 02:40 again, in that very same room. The screens are newer, the chair is different, and someone else is on the night shift, back turned to us."
        },
        {
          id: "fut-2", world: "earth", speaker: null, img: "assets/story/future-01-room-2076.webp",
          text_vi: "Rồi máy thu lại kêu. Tích… tích… tích…",
          text_en: "Then the receiver beeps again. Tick… tick… tick…"
        },
        {
          id: "fut-3", world: "earth", speaker: null, img: "assets/story/future-01-room-2076.webp",
          text_vi: "Trên bản đồ Mặt Trăng, cạnh chấm sáng của cái gương, giờ có thêm một chấm thứ năm. Nó mang tên DUSTER.",
          text_en: "On the lunar map, next to the mirror's light, there's a fifth light now. Its name is DUSTER."
        },
        {
          id: "fut-4", world: "earth", speaker: null, img: "assets/story/future-01-room-2076.webp",
          text_vi: "Người đang trực mở phong bì. Bên trong là lá thư bạn vừa viết.",
          text_en: "The person on duty opens the envelope. Inside is the letter you just wrote."
        }
      ]
    },

    /* Lá thư thứ năm (Cảnh 12). Chỉ chỗ trống cuối là do người chơi chọn hoặc tự viết. */
    letter5: {
      max_len: 120,
      greeting_vi: "Gửi người ở tương lai,",
      greeting_en: "To whoever comes in the future,",
      body_vi: [
        "Tôi là DUSTER. Các phi hành gia Artemis IV đã đặt tôi xuống Mặt Trăng để canh chừng những hạt bụi. Họ chọn chỗ này cho tôi vì nó cách các di tích cũ hơn 2 km, có nắng, lại có đủ điểm mốc để tàu tìm đường.",
        "Có được chỗ này là nhờ bốn người đi trước: một cái gương vẫn còn trả lời, một cỗ máy mang vết sẹo vì bụi, một chiếc xe từng chạy theo mặt trời, và một chiếc trực thăng từng bị lạc."
      ],
      body_en: [
        "I am DUSTER. The Artemis IV astronauts set me down on the Moon to keep watch over the dust. They chose this spot for me because it is more than 2 km from the old relics, it gets sunlight, and it has enough landmarks for landers to find their way.",
        "I owe this spot to four who came before me: a mirror that still answers, a machine scarred by dust, a rover that chased the Sun, and a helicopter that once got lost."
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
        cue_vi: "Cái này chẳng có pin, cũng chẳng có radio, nên nó không gọi được ai đâu. Muốn nói chuyện với nó thì phải chiếu ánh sáng vào.",
        cue_en: "This one has no battery and no radio, so it can't call anyone. If you want to talk to it, you have to shine light at it.",
        goal_vi: "Nhấn giữ nút cho tới khi ánh sáng quay về Trái Đất, khoảng 2,56 giây.",
        goal_en: "Press and hold the button until the light comes back to Earth, about 2.56 seconds.",
        win_vi: "Một chấm sáng bé tí quay về. Nó vẫn trả lời.",
        win_en: "A tiny dot of light comes back. It still answers."
      },
      "surveyor-3": {
        kind: "slider",
        start: 2500,
        target: 160,
        tolerance: 15,
        cue_vi: "Năm 1969, tàu Intrepid của Apollo 12 hạ xuống gần Surveyor 3. Động cơ phun xuống, bụi bắn ngang mặt đất như phun cát.",
        cue_en: "In 1969, Apollo 12's lander Intrepid came down near Surveyor 3. Its engine blasted dust sideways across the ground like a sandblaster.",
        goal_vi: "Kéo thanh để đưa tàu Intrepid tới đúng chỗ nó đã đáp: cách Surveyor 3 khoảng 160 m.",
        goal_en: "Drag the slider to bring Intrepid to where it really landed: about 160 m from Surveyor 3.",
        far_vi: "Vẫn còn xa. Kéo tàu lại gần thêm.",
        far_en: "Still far. Bring the lander closer.",
        near_vi: "Gần hơn cả hồi 1969 rồi đấy. Lùi ra một chút.",
        near_en: "That's even closer than in 1969. Back off a little.",
        win_vi: "160 m. Lớp sơn trắng của Surveyor 3 ngả nâu, ống kính rỗ lỗ chỗ. Vậy mà vẫn chưa đủ xa.",
        win_en: "160 m. Surveyor 3's white paint turns brown and its lens gets pitted. And that's still not far enough."
      },
      "opportunity-rover": {
        kind: "slider",
        start: 1,
        target: 10.8,
        cue_vi: "Bão bụi đang che kín mặt trời. Nhìn đồng hồ điện kìa.",
        cue_en: "The dust storm is blotting out the Sun. Look at the power meter.",
        goal_vi: "Kéo thanh độ dày của bụi tới khi điện còn 22 Wh, mức của tín hiệu cuối cùng.",
        goal_en: "Drag the dust thickness slider until power drops to 22 Wh, the level of the last signal.",
        win_vi: "22 Wh mỗi ngày, không đủ để thức. Giữa trưa mà trời tối như nửa đêm.",
        win_en: "22 Wh a day, not enough to stay awake. At noon it's as dark as midnight."
      },
      "ingenuity-helicopter": {
        kind: "slider",
        start: 1,
        target: 72,
        cue_vi: "Không khí ở đây loãng lắm, chỉ dày bằng khoảng 1% ở Trái Đất. Thế nên người ta chỉ mong nó bay được 5 lần.",
        cue_en: "The air here is thin, only about 1% as thick as Earth's. So the team only hoped it would fly 5 times.",
        goal_vi: "Kéo số chuyến bay tới chuyến 72, chuyến cuối cùng.",
        goal_en: "Drag the flight counter to flight 72, the last one.",
        win_vi: "Chuyến 72. Bên dưới chỉ có đồi cát trơn nhẵn, camera không tìm được viên đá nào làm mốc. Nó chạm đất mạnh, gãy cánh quạt.",
        win_en: "Flight 72. Below there's only smooth sand, and the camera can't find a single rock to track. It hits the ground hard and breaks a rotor blade."
      }
    },

    /* Thẻ luật: zone = vùng mà thẻ loại bỏ (hoặc làm hiện) ở Game 5. */
    rules: {
      "apollo11-lrrr": {
        zone: "A", effect: "reveal",
        title_vi: "Di tích vẫn đang làm việc", title_en: "The relic is still working",
        sub_vi: "“Tôi chỉ sợ bụi.”", sub_en: "“I am only afraid of dust.”",
        say_vi: "Ở vùng A có một thứ vẫn đang làm việc. Cái gương.", say_en: "Something in zone A is still working. The mirror."
      },
      "surveyor-3": {
        zone: "A", effect: "cross",
        title_vi: "Cách di tích ít nhất 2 km", title_en: "Stay at least 2 km away",
        sub_vi: "“160 m vẫn chưa đủ xa.”", sub_en: "“160 m was still not far enough.”",
        say_vi: "Vùng A nằm trọn trong vòng 2 km. Gần thế thì bụi sẽ phủ lên nó mất.", say_en: "Zone A sits inside the 2 km ring. That close, the dust would bury it."
      },
      "opportunity-rover": {
        zone: "B", effect: "cross",
        title_vi: "Phải có nắng", title_en: "There must be sunlight",
        sub_vi: "“Không đủ để thức.”", sub_en: "“Not enough to stay awake.”",
        say_vi: "Đáy hố B khuất nắng quanh năm. Không có mặt trời thì pin nào cũng cạn, Oppy hiểu điều đó hơn ai hết.", say_en: "Crater B sits in shadow all year. Without the Sun, every battery runs dry, and Oppy knows that better than anyone."
      },
      "ingenuity-helicopter": {
        zone: "C", effect: "cross",
        title_vi: "Phải có điểm mốc", title_en: "There must be landmarks",
        sub_vi: "“…không tìm được viên đá nào làm mốc.”", sub_en: "“…couldn't find a single rock to hold on to.”",
        say_vi: "Đồng bằng C phẳng lì, chẳng có hố nhỏ hay hòn đá nào làm mốc. Tàu đáp xuống đó sẽ trượt như Ingenuity thôi.", say_en: "Plain C is flat, with no small craters or rocks to track. A lander would slip, just like Ingenuity."
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
