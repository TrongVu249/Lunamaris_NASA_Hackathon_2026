/**
 * LUNAMARIS — dữ liệu cho luồng truyện + trò chơi (2026-11-15)
 *  - LUNAMARIS_FLOW.story   : các chuỗi truyện chạm-để-sang (chỉ chữ; `img` là tùy chọn)
 *  - LUNAMARIS_FLOW.games   : cấu hình trò chơi của từng chương (giá trị bắt đầu, mục tiêu)
 *  - LUNAMARIS_FLOW.rules   : thẻ luật nhận được sau mỗi lá thư, dùng ở Game 5 (Artemis)
 *  - Bổ sung chữ giao diện vào window.UI_I18N (EN/VI)
 * Lời thoại lấy từ docs/Kich_ban_relic_Final_v2.md; số Surveyor 3 dùng 180 m (data.js đã đối chiếu NASA).
 * Thêm ảnh cho một cảnh: điền `img: "assets/story/<tên>.webp"` — thiếu ảnh thì dùng nền vẽ bằng CSS.
 */
(function () {
  "use strict";

  var C = "Columbina";

  window.LUNAMARIS_FLOW = {
    story: {
      intro: [
        {
          id: "intro-1", world: "earth", speaker: null,
          text_vi: "Trạm mặt đất Hà Nội, 02:40. Dưới đáy màn hình, một dòng tin chạy chậm: Artemis IV chuẩn bị đưa con người trở lại Mặt Trăng. Bãi đáp cho trạm đo bụi DUSTER: chưa chốt.",
          text_en: "Hanoi ground station, 02:40. A slow news ticker crawls along the bottom of the screen: Artemis IV is about to take people back to the Moon. Landing site for the DUSTER dust station: not decided."
        },
        {
          id: "intro-2", world: "earth", speaker: C,
          text_vi: "Ca đêm đầu tiên hả? Đừng lo, giờ này chẳng có gì xảy ra đâu.",
          text_en: "First night shift? Don't worry, nothing ever happens at this hour."
        },
        {
          id: "intro-3", world: "earth", speaker: null,
          text_vi: "Máy thu ở góc bàn kêu lên. Tích… tích… tích…",
          text_en: "The receiver in the corner starts to beep. Tick… tick… tick…"
        },
        {
          id: "intro-4", world: "earth", speaker: C,
          text_vi: "…Trừ cái đó.",
          text_en: "…Except that."
        },
        {
          id: "intro-5", world: "earth", speaker: C,
          text_vi: "Hai trên Mặt Trăng, hai trên Sao Hỏa. Toàn những cỗ máy người ta để lại từ lâu rồi. Không ai nghe chúng nữa. Nên mình nghe.",
          text_en: "Two on the Moon, two on Mars. Machines people left behind a long time ago. Nobody listens to them anymore. So we will."
        },
        {
          id: "intro-6", world: "earth", speaker: C,
          text_vi: "Mỗi tín hiệu là một lá thư. Nhưng muốn mở thì phải hiểu nó đã sống thế nào. Bạn mở cái đầu tiên đi.",
          text_en: "Each signal is a letter. But to open one, you have to understand how that machine lived. Go ahead, open the first one."
        }
      ],
      to_ch2: [
        {
          id: "to2-1", world: "moon", speaker: C,
          text_vi: "Người ta đặt nó xuống rồi đi. Chắc không ai nghĩ nó sẽ làm việc lâu đến thế.",
          text_en: "They set it down and left. Nobody thought it would keep working this long."
        },
        {
          id: "to2-2", world: "moon", speaker: null,
          text_vi: "Biển Bão Tố, Mặt Trăng. Một cỗ máy ba chân đứng trong lòng hố nông. Lớp sơn ngả màu nâu bẩn.",
          text_en: "Ocean of Storms, the Moon. A three-legged machine stands in a shallow crater. Its paint has turned a dirty brown."
        },
        {
          id: "to2-3", world: "moon", speaker: C,
          text_vi: "Cái này từng bị thương. Do chúng ta.",
          text_en: "This one got hurt. By us."
        }
      ],
      to_ch3: [
        {
          id: "to3-1", world: "moon", speaker: C,
          text_vi: "Người ta còn chọn chỗ đáp gần nó cho tiện đi bộ sang xem. Ai ngờ.",
          text_en: "They even landed close on purpose, so they could walk over and look. Who knew."
        },
        {
          id: "to3-2", world: "mars", speaker: null,
          text_vi: "Thung lũng Perseverance, Sao Hỏa. Bầu trời màu cam, rồi đỏ thẫm. Một chiếc xe sáu bánh đứng yên, tấm pin phủ một lớp bụi mỏng.",
          text_en: "Perseverance Valley, Mars. The sky turns orange, then deep red. A six-wheeled rover sits still, a thin layer of dust on its solar panels."
        },
        {
          id: "to3-3", world: "mars", speaker: C,
          text_vi: "Ôi. Bão bụi. Cả hành tinh luôn.",
          text_en: "Oh no. A dust storm. The whole planet."
        }
      ],
      to_ch4: [
        {
          id: "to4-1", world: "mars", speaker: C,
          text_vi: "Nó không hỏng gì cả. Nó chỉ không còn thấy mặt trời.",
          text_en: "Nothing was broken. It just couldn't see the Sun anymore."
        },
        {
          id: "to4-2", world: "mars", speaker: null,
          text_vi: "Hố Jezero, Sao Hỏa. Tiếng cánh quạt quay rít, nhanh và cao. Một chiếc trực thăng nhỏ như cái hộp, bốn chân mảnh, đứng trên nền cát.",
          text_en: "Jezero Crater, Mars. A high, fast whine of rotor blades. A helicopter the size of a tissue box stands on the sand on four thin legs."
        },
        {
          id: "to4-3", world: "mars", speaker: C,
          text_vi: "Cái này thì chưa bao giờ chịu ngồi yên.",
          text_en: "This one never could sit still."
        }
      ],
      to_artemis: [
        {
          id: "toA-1", world: "mars", speaker: C,
          text_vi: "Không ai cứu được nó đâu. Nhưng giờ mình biết vì sao nó ngã.",
          text_en: "Nobody could have saved it. But now we know why it fell."
        },
        {
          id: "toA-2", world: "earth", speaker: null,
          text_vi: "Phòng trực, 04:10. Bốn lá thư nằm mở trên bàn. Dòng tin đổi màu hổ phách và chạy nhanh hơn: Artemis IV cần chọn bãi đáp trước bình minh. Bốn vùng ứng viên.",
          text_en: "The control room, 04:10. Four open letters lie on the desk. The ticker turns amber and speeds up: Artemis IV must pick a landing site before dawn. Four candidate zones."
        },
        {
          id: "toA-3", world: "earth", speaker: C,
          text_vi: "Khoan. Chúng nó trả lời câu này từ lâu rồi.",
          text_en: "Wait. They answered this question a long time ago."
        }
      ],
      ending: [
        {
          id: "end-1", world: "moon", speaker: null,
          text_vi: "Các phi hành gia đặt trạm thiết bị DUSTER xuống vùng D, rồi quay lại tàu. Tàu cất cánh. DUSTER ở lại.",
          text_en: "The astronauts set the DUSTER station down in zone D and walk back to the lander. The lander lifts off. DUSTER stays."
        },
        {
          id: "end-2", world: "moon", speaker: C,
          text_vi: "Cái máy mới đó tên là DUSTER. Người ta đặt nó lại để đo bụi Mặt Trăng, đúng thứ bụi từng làm khổ cái gương, làm xước Surveyor và che mắt Opportunity.",
          text_en: "That new machine is called DUSTER. It was left there to measure lunar dust, the same dust that troubled the mirror, scarred Surveyor and blinded Opportunity."
        },
        {
          id: "end-3", world: "moon", speaker: C,
          text_vi: "Rồi DUSTER cũng sẽ nằm lại đó. Năm mươi năm nữa, sẽ có ai đó ngồi đúng chỗ này lúc hai giờ sáng, và nghe nó gọi.",
          text_en: "One day DUSTER will be an old machine too. Fifty years from now, someone will sit right here at two in the morning and hear it call."
        },
        {
          id: "end-4", world: "earth", speaker: null,
          text_vi: "Hà Nội, 02:40, năm 2076. Vẫn căn phòng đó. Máy thu kêu lên. Trên bản đồ Mặt Trăng, cạnh chấm sáng của cái gương, có thêm một chấm thứ năm mang tên DUSTER.",
          text_en: "Hanoi, 02:40, the year 2076. The same room. The receiver beeps. On the lunar map, next to the mirror's light, a fifth light appears. It is called DUSTER."
        },
        {
          id: "end-5", world: "earth", speaker: null,
          text_vi: "Lắng nghe những cỗ máy cũ để biết nên đặt bước chân mới ở đâu.",
          text_en: "Listen to the old machines to know where to take the next step."
        }
      ]
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
        target: 180,
        tolerance: 15,
        cue_vi: "Năm 1969, tàu Intrepid của Apollo 12 hạ xuống gần Surveyor 3. Bụi từ động cơ bắn ngang mặt đất như cát phun.",
        cue_en: "In 1969, Apollo 12's lander Intrepid came down near Surveyor 3. Engine exhaust blasted dust sideways like a sandblaster.",
        goal_vi: "Kéo thanh để đưa tàu Intrepid tới đúng chỗ nó đã đáp: cách Surveyor 3 khoảng 180 m.",
        goal_en: "Drag the slider to bring Intrepid to where it really landed: about 180 m from Surveyor 3.",
        far_vi: "Còn xa. Kéo tàu lại gần hơn.",
        far_en: "Still far. Bring the lander closer.",
        near_vi: "Gần hơn cả năm 1969 rồi. Lùi ra một chút.",
        near_en: "That's closer than in 1969. Back off a little.",
        win_vi: "180 m. Lớp sơn trắng của Surveyor 3 ngả nâu, ống kính bị rỗ. Vẫn chưa đủ xa.",
        win_en: "180 m. Surveyor 3's white paint turns brown and its lens gets pitted. Still not far enough."
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
        sub_vi: "Đừng phủ bụi lên nó.", sub_en: "Don't cover it in dust.",
        say_vi: "Ở vùng A có một thứ vẫn đang làm việc: cái gương.", say_en: "Something in zone A is still working: the mirror."
      },
      "surveyor-3": {
        zone: "A", effect: "cross",
        title_vi: "Cách di tích ít nhất 2 km", title_en: "Stay at least 2 km away",
        sub_vi: "180 m vẫn chưa đủ xa.", sub_en: "180 m was not far enough.",
        say_vi: "Vùng A nằm trọn trong vòng 2 km. Gần quá, bụi sẽ phủ lên nó.", say_en: "Zone A is inside the 2 km ring. Too close, the dust would bury it."
      },
      "opportunity-rover": {
        zone: "B", effect: "cross",
        title_vi: "Phải có nắng", title_en: "There must be sunlight",
        sub_vi: "Không đáp chỗ khuất nắng.", sub_en: "Never land in shadow.",
        say_vi: "Đáy hố B khuất nắng quanh năm. Không có mặt trời thì pin nào cũng cạn.", say_en: "Crater B sits in shadow all year. Without the Sun, every battery runs dry."
      },
      "ingenuity-helicopter": {
        zone: "C", effect: "cross",
        title_vi: "Phải có điểm mốc", title_en: "There must be landmarks",
        sub_vi: "Mặt đất phẳng lì thì tàu bị lạc.", sub_en: "On featureless ground, landers get lost.",
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
      story_titles: { intro: "Prologue", to_ch2: "Interlude", to_ch3: "Interlude", to_ch4: "Interlude", to_artemis: "Interlude", ending: "Epilogue" },
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
      art_land_btn: "Land in zone D",
      art_land_wait: "Rule out zones A, B and C first.",
      art_laser_btn: "Fire the laser once more",
      art_still_answers: "It still answers.",
      art_continue: "Continue",
      scene_title_story_intro: "Prologue",
      enclosure_ps: "P.S. — Columbina enclosed a real photo and a film clip with this letter.",
      enclosure_hint: "Tap the photo to view it full size and watch the film.",
      gallery_title: "Visual evidence",
      gallery_sub: "Real photos & footage of this machine. Tap a tile to view.",
      media_modal_title: "Image dossier",
      label_photo: "Photo",
      label_video: "Video"
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
      story_titles: { intro: "Mở đầu", to_ch2: "Chuyển cảnh", to_ch3: "Chuyển cảnh", to_ch4: "Chuyển cảnh", to_artemis: "Chuyển cảnh", ending: "Kết" },
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
      art_land_btn: "Hạ cánh ở vùng D",
      art_land_wait: "Loại xong các vùng A, B và C trước đã.",
      art_laser_btn: "Bắn laser lần nữa",
      art_still_answers: "Nó vẫn trả lời.",
      art_continue: "Đi tiếp",
      scene_title_story_intro: "Mở đầu",
      enclosure_ps: "Tái bút: Columbina đính kèm lá thư này một tấm ảnh thật và một đoạn phim.",
      enclosure_hint: "Chạm vào tấm ảnh để xem cỡ lớn và xem phim.",
      gallery_title: "Bằng chứng hình ảnh",
      gallery_sub: "Ảnh & video thật của cỗ máy này. Chạm vào ô để xem.",
      media_modal_title: "Hồ sơ hình ảnh",
      label_photo: "Ảnh",
      label_video: "Video"
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
