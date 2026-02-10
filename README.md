# Woo Lucky Wheel Lite

Plugin WordPress mô phỏng tính năng vòng quay may mắn giống Woo Lucky Wheel:

- Popup vòng quay xuất hiện sau vài giây.
- Khách nhập email để quay.
- Trúng thưởng theo xác suất (weight).
- Tự tạo coupon WooCommerce theo loại thưởng.
- Có trang cài đặt trong `WooCommerce > Lucky Wheel`.

## Cài đặt

1. Copy thư mục `woo-lucky-wheel-lite` vào `wp-content/plugins/`.
2. Bật plugin `Woo Lucky Wheel Lite`.
3. Vào `WooCommerce > Lucky Wheel` để chỉnh sửa cấu hình.

## Cấu hình phần thưởng

Dùng JSON với cấu trúc:

```json
[
  { "label": "10% OFF", "weight": 20, "type": "percent", "value": 10 },
  { "label": "50.000đ OFF", "weight": 15, "type": "fixed", "value": 50000 },
  { "label": "Free Shipping", "weight": 10, "type": "free_shipping", "value": 0 },
  { "label": "Không trúng", "weight": 45, "type": "none", "value": 0 }
]
```

`type` hỗ trợ: `percent`, `fixed`, `free_shipping`, `none`.
