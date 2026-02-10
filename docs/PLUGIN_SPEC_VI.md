# Plugin Vòng Quay May Mắn (Hội chợ) – Đặc tả triển khai

## 1) Mục tiêu nghiệp vụ

- Thu thông tin người chơi tại booth: `họ tên + số điện thoại`.
- Tăng tương tác bằng mini game quay thưởng diễn ra nhanh trên mobile.
- Mỗi số điện thoại chỉ được chơi đúng **1 lần**.
- Hệ thống trả kết quả tự động dựa trên tỷ lệ trúng do admin cấu hình.
- Lưu đầy đủ dữ liệu để đối soát trao quà và kiểm tra lịch sử.
- Tích hợp gửi Zalo ZNS sau khi có kết quả chơi.

## 2) Luồng xử lý đề xuất

1. Khách quét QR tại booth.
2. Mở trang mini game (mobile-first).
3. Người chơi nhập:
   - Họ tên
   - Số điện thoại
4. Backend chuẩn hóa SĐT và kiểm tra tồn tại:
   - Đã tồn tại: trả thông báo `Số điện thoại đã tham gia trò chơi.`
   - Chưa tồn tại: cho phép quay.
5. Backend thực hiện random quà theo cấu hình tỷ lệ + kiểm tra tồn kho.
6. Trả kết quả hiển thị ngay trên giao diện.
7. Gửi ZNS theo loại quà (điện tử/vật lý).
8. Ghi log ZNS thành công hoặc thất bại để đối soát.
9. Lưu kết quả chơi vào DB.

## 3) Thành phần kỹ thuật cốt lõi

### 3.1 Backend logic

Module `plugin/luckyWheelPlugin.js` đã triển khai các chức năng cốt lõi:

- Validate cấu hình quà (tỷ lệ không vượt 100%, tồn kho hợp lệ).
- Chặn chơi nhiều lần theo SĐT đã chuẩn hóa.
- Rút quà theo tỷ lệ và trừ tồn kho ngay khi trúng.
- Gửi ZNS sau khi có kết quả.
- Ghi log ZNS thành công/thất bại.
- Cung cấp dashboard tổng quan.
- Lấy danh sách người chơi và export dữ liệu.

### 3.2 Dữ liệu quản trị

Dữ liệu nên lưu vào DB với các bảng chính:

- `players`: thông tin người chơi.
- `plays`: mỗi lượt quay + kết quả quà.
- `prizes`: cấu hình quà, tỷ lệ, tồn kho.
- `zns_logs`: log request/response lỗi ZNS.
- `admin_users`: tài khoản quản trị.

## 4) API gợi ý cho tích hợp thực tế

- `POST /api/play/register-and-spin`
  - Input: `fullName`, `phone`
  - Output: `alreadyPlayed`, `prize`, `message`, `playedAt`
- `GET /api/admin/dashboard`
- `GET /api/admin/players?phone=...`
- `GET /api/admin/export`
- `PATCH /api/admin/prizes/:id`

## 5) Chống gian lận

- Chỉ backend được quyền random kết quả.
- Unique index số điện thoại trong DB.
- Chuẩn hóa SĐT trước khi check (loại ký tự đặc biệt, khoảng trắng).
- Có thể bổ sung giới hạn IP/device fingerprint theo phiên hội chợ.

## 6) Yêu cầu giao diện

- Mobile-first, thao tác ít bước.
- Form đơn giản.
- Màn hình kết quả rõ ràng (trúng gì, nhận ở đâu).
- Thêm hiệu ứng quay và âm thanh nhẹ để tăng trải nghiệm.

## 7) Kiểm thử đã có

`plugin/luckyWheelPlugin.test.js` bao gồm:

- Test chặn chơi lặp SĐT.
- Test trừ tồn kho khi trúng quà.
- Test ghi log lỗi khi gọi ZNS thất bại.

## 8) Khuyến nghị triển khai production

- Dùng PostgreSQL/MySQL thay vì in-memory.
- Dùng queue (BullMQ/SQS) cho gửi ZNS không đồng bộ.
- Mã hóa dữ liệu nhạy cảm, tuân thủ quy định bảo mật dữ liệu.
- Thêm cơ chế retry ZNS thất bại và dashboard cảnh báo theo thời gian thực.
