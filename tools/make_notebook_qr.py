# -*- coding: utf-8 -*-
"""
[NOTEBOOK-QR 2026-11-14] Sinh mã QR trỏ tới sổ tay NotebookLM của nhóm LUNAMARIS.

Cách chạy (cần Python + thư viện segno):
    pip install segno
    python tools/make_notebook_qr.py

Kết quả: assets/qr-notebooklm.png  (PNG nền trắng, module màu navy #0e1120)

GHI CHÚ QUAN TRỌNG:
  - NOTEBOOK_URL bên dưới đã CHỦ ĐỘNG BỎ tham số `fbclid=...` vì đó chỉ là
    tham số theo dõi của Facebook, không ảnh hưởng đích đến. Bỏ đi giúp mã QR
    nhỏ hơn hẳn (ít ô hơn) -> camera điện thoại quét nhanh và chắc hơn,
    đặc biệt khi chiếu lên màn hình thuyết trình.
  - Nếu đổi URL, chạy lại script này; đồng thời sửa hằng NOTEBOOK_URL trong
    js/notebook-qr.js để phần liên kết chữ khớp với mã QR.
"""

import os

import segno

NOTEBOOK_URL = "https://notebook.google.com/notebook/eb772db5-b353-4fd7-aeea-b67ca4b120c4"

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "assets", "qr-notebooklm.png")


def main() -> None:
    # error='q' (khôi phục 25% lỗi): đủ bền cho in ấn / màn hình chiếu,
    # vẫn giữ số ô nhỏ vì URL ngắn.
    qr = segno.make(NOTEBOOK_URL, error="q", mode="byte")
    qr.save(
        OUT,
        scale=10,        # 1 ô QR = 10 px -> ảnh ~400px, phóng to vẫn nét
        border=2,        # viền lặng 2 ô; phần đệm trắng của thẻ QR bù thêm
        dark="#0e1120",  # màu navy của giao diện thay cho đen thuần
        light="#ffffff",
    )
    modules = len(qr.matrix)
    size = (modules + 4) * 10
    print("QR version:", qr.version, "| modules:", modules)
    print("PNG:", os.path.normpath(OUT), "| ~%dx%d px" % (size, size))


if __name__ == "__main__":
    main()
