---
name: loi-ke-tu-nhien
description: Use when writing or rewriting LUNAMARIS story text (narration beats, Columbina's lines, game cues, rule-card lines, the machines' letters, DUSTER's letter) in Vietnamese or English, especially when it reads like stage directions, a news report, or a translation instead of a person telling a story to 11–15 year olds.
---

# Lời kể tự nhiên cho LUNAMARIS

## Cốt lõi

Lời kể cũ nghe như máy vì nó là **chỉ dẫn sân khấu** được chép thẳng từ kịch bản: tiêu đề địa danh, cụm danh từ, câu bị động. Thêm tiểu từ (*đấy, thì, mà*) không cứu được nó. Phải **dựng lại câu**: mỗi câu có người hoặc vật đang làm gì đó, và nơi chốn hay giờ giấc được lồng vào trong câu.

Người kể là người lớn đang kể cho một đứa em 11–15 tuổi nghe. Người kể đứng ngoài truyện (ngôi 3), kể bằng mắt và tai: thấy gì, nghe gì. Người kể không giảng giải và không báo trước điều sắp xảy ra.

## Nguồn sự thật

- Chi tiết lấy từ cảnh tương ứng trong `docs/Kich_ban_relic_Final_v2.md`. Kịch bản có nhiều chi tiết đời thường đã bị bỏ mất trên web (Columbina ngồi co chân, cốc trà nguội, thành phố đã ngủ, "Cô im một lúc"). Hãy lấy chúng lại.
- Con số, ngày tháng, đơn vị và tên riêng giữ **nguyên văn** (`02:40` vẫn là `02:40`).
- Chi tiết nào không có trong kịch bản hay trong thư thì không viết. Đặc biệt không viết điều trái với cảnh, ví dụ "chỉ còn một người trong phòng" trong khi Columbina đang ngồi đó.

## Công thức theo loại chữ

**Nhịp lời kể** (`speaker: null`), 2–3 câu, tối đa 230 ký tự:
1. Câu mở: nơi chốn hoặc giờ giấc nằm *bên trong* một câu có chủ ngữ và động từ ("Đã 02:40, Hà Nội ngủ cả rồi."). Không mở bằng "Địa danh, Thiên thể." hay "Nơi chốn, giờ.".
2. Một hình ảnh hoặc âm thanh cụ thể, nối với câu trước bằng *còn, mà, rồi, nơi, trong khi*.
3. (Tùy chọn) một câu ngắn chốt lại cảm giác. Câu chốt phải là sự việc, không phải lời bình.

Chữ trên màn hình (dòng tin chạy) được đặt sau dấu hai chấm, phần còn lại của câu thì viết thành lời kể.

Khi viết cả một chuỗi nhịp, mỗi nhịp mở bằng một kiểu câu khác. Ví dụ: một nhịp mở bằng giờ, nhịp sau mở bằng âm thanh, nhịp sau nữa mở bằng một hành động. Ví dụ bên dưới ("Đã 02:40, …") là một cách mở, không phải khuôn cho mọi nhịp.

**Thoại Columbina:** nói như chị khóa trên trực đêm. Câu ngắn, có tiểu từ (*hả, đấy, kìa, nhỉ, đi*), hơi trêu, xưng *mình*, gọi người chơi là *bạn*. Câu ngắn đắt giá thì giữ nguyên ("…Trừ cái đó.", "Bạn thấy không?"). Chỉ sửa câu mang dấu vết dịch: "Do chúng ta." → "Mà là tại chúng mình đấy."

**Giọng Bắc (Hà Nội)** cho mọi nhân vật và người kể: dùng *chúng mình / bọn mình, giúp, thế, nhé, ạ, đâu*. Không dùng từ miền Nam như *tụi, giùm, nè, hen, vậy nha, nhỏ xíu*.

**Thư của cỗ máy** (ngôi 1): giữ cách xưng hô. Ba máy đầu xưng *tôi – các bạn*, Ingenuity xưng *em – mọi người*, DUSTER xưng *tôi*. Mỗi đoạn chỉ câu đầu có "Tôi"/"Em". Các câu sau bỏ chủ ngữ, hoặc đổi chủ ngữ sang vật ("Bụi quất vào người tôi"), hoặc nối bằng *rồi, thế là, mà*.
- LRRR: người gác hải đăng, bình thản.
- Surveyor 3: người lính già, cộc, không than.
- Oppy: lạc quan, đùa.
- Ingenuity: em út, nhanh, nghịch.
- DUSTER: mới tinh, hơi trịnh trọng.

Thẻ luật (`rules.*.sub_vi/sub_en` trong `js/flow-data.js`) trích nguyên văn một câu trong thư, ví dụ "160 m vẫn chưa đủ xa." / "160 m was still not far enough.". Nếu viết lại câu được trích, phải sửa `sub` cho khớp từng chữ. Thư nằm ở hai nơi là `js/data.js` và `data/content.json`, hai nơi phải giống hệt nhau.

**Lời dẫn trò chơi:** `cue`/`win` là lời Columbina hoặc lời kể, theo hai công thức trên. `goal`/`far`/`near` là hướng dẫn thao tác: động từ đứng đầu, nói rõ phải làm gì.

**Người chơi:** chữ *bạn* có trong bản gốc thì giữ *bạn*. Ở cú lật cuối truyện, "lá thư **bạn** vừa viết" là câu đắt nhất, không đổi thành "người trực ban".

**Tiếng Anh:** viết lại theo ý của bản VI mới, với nhịp tự nhiên của người bản xứ (thì hiện tại, động từ mạnh). Không mở câu bằng "Place, time." và không dịch từng chữ từ VI.

## Ví dụ

Trước (intro-1):
> Trạm mặt đất Hà Nội, 02:40. Dưới đáy màn hình, một dòng tin chạy chậm: Artemis IV chuẩn bị đưa con người trở lại Mặt Trăng. Bãi đáp cho trạm đo bụi DUSTER: chưa chốt.

Sau:
> Đã 02:40, Hà Nội ngủ cả rồi. Phòng trực chỉ còn ánh sáng từ dãy màn hình, nơi một dòng tin cứ chạy chầm chậm: Artemis IV sắp đưa người trở lại Mặt Trăng, còn chỗ đặt trạm đo bụi DUSTER thì chưa ai chốt.
>
> It's 02:40 and Hanoi is asleep. The only light in the control room comes from the screens, where a news line crawls by: Artemis IV is about to take people back to the Moon, and nobody has picked a spot for the DUSTER dust station yet.

Vì sao bản sau tự nhiên hơn:
- Giờ giấc nằm trong một câu có chủ ngữ.
- "Thành phố đã ngủ" và "ánh sáng từ dãy màn hình" lấy lại từ kịch bản.
- Hai vế của dòng tin được nối bằng *còn… thì*, thay cho cụm danh từ có dấu hai chấm "Bãi đáp: chưa chốt".
- Mọi con số giữ nguyên.

Thư (Surveyor 3), trước → sau:
> Tôi chụp hơn 6.300 tấm ảnh. Tôi đào đất bằng cái gầu xúc nhỏ. Câu trả lời của tôi: …
>
> Tôi chụp hơn 6.300 tấm ảnh, lấy cái gầu xúc nhỏ đào thử đất. Rồi báo về: …

## Bảng tự soát (đọc to từng nhịp)

| Dấu hiệu | Sửa bằng |
|---|---|
| Câu mở là "Địa danh, Thiên thể." hoặc "Nơi chốn, giờ." | Lồng nơi chốn/giờ vào câu có chủ ngữ + động từ |
| Cụm danh từ đứng một mình ("Bốn vùng ứng viên.", "Bãi đáp: chưa chốt.") | Viết thành câu có động từ |
| Bị động dịch ("Phong bì được mở.") | Cho ai đó làm việc đó ("Người ấy mở phong bì.") |
| Hai câu liền nhau trong thư cùng mở bằng "Tôi"/"Em" | Bỏ chủ ngữ, gộp câu, hoặc nối bằng *rồi, thế là* |
| Từ sáo (*bao la, vô tận, lặng lẽ, im lìm, vỏn vẹn, ròng rã*) hoặc ẩn dụ chồng ẩn dụ | Dùng một chi tiết thật nhìn thấy được |
| Câu giải thích điều vừa xảy ra, hoặc lộ trước cú lật | Xóa câu đó |
| Chi tiết không có trong kịch bản hay thư | Xóa, hoặc thay bằng chi tiết có trong kịch bản |
| Từ miền Nam (*tụi, giùm, nè, hen, nhỏ xíu*) | Đổi sang giọng Hà Nội (*chúng mình, giúp, này, nhé, bé tí*) |
| Hai nhịp gần nhau mở cùng một kiểu ("Đã 02:40…", "Đã 04:10…") | Đổi cách mở của một nhịp |
| Số khác bản gốc, nhịp dài quá 230 ký tự, mất "bạn" ở chỗ gốc có | Trả về bản gốc |
