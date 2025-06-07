# itern-be-test
---

## 📋 Tóm tắt đề bài

Xây dựng một CMS nhỏ cho phép admin điều chỉnh nội dung trên trang chủ — một trang chủ gồm đúng ba phần:

1. **Banner**

   * Hiển thị một hình ảnh đơn hoặc nhiều hình ảnh
2. **Tổng quan**

   * Tiêu đề (heading)
   * Đoạn nội dung (content)
   * Một hình ảnh
3. **Sản phẩm nổi bật**

   * Tiêu đề của phần (heading)
   * Một button (CTA) với nhãn và URL
   * Danh sách tối đa 5 “sản phẩm”, mỗi sản phẩm có:

     * Tên (name)
     * Hình ảnh (image URL)
     * Liên kết (link)

Không cần CRUD linh hoạt — chỉ một bản ghi cấu hình duy nhất cho ba phần này.

---

## 🚀 Các bước thực hiện

### 1. Cài đặt dự án

* **Khởi tạo** `npm init`
* **Cài đặt** các package:
### 2. Xác thực Admin
### 3. Định nghĩa dữ liệu cho Trang chủ & Lưu trữ

* **JSON File**: đọc/ghi vào `/data/homepage.json`.
* **MongoDB**: sử dụng Mongoose, lưu một document duy nhất, cập nhật bằng `findOneAndUpdate()`.

### 4. Giao diện & Routes cho Admin

| Phương thức | Đường dẫn         | Hành động                                | View                       |
| ----------- | ----------------- | ---------------------------------------- | -------------------------- |
| GET         | `/admin/homepage` | Đọc dữ liệu, hiển thị form chỉnh sửa    | `views/admin/homepage.ejs` |
| POST        | `/admin/homepage` | Validate & lưu dữ liệu, redirect về lại | —                          |

Form admin phải cho phép:

* Thêm/bớt tối đa 5 URL hình banner.
* Nhập tiêu đề, đoạn nội dung và URL hình ảnh cho phần Tổng quan.
* Nhập tiêu đề, nhãn & URL cho nút CTA ở phần Tính năng.
* Thêm/bớt tối đa 5 sản phẩm (tên, URL hình, link).

### 5. Hiển thị Trang chủ cho người dùng

### 6. Bonus (nếu còn thời gian)

* **Upload ảnh** bằng `multer`, lưu vào `/public/uploads`.
* **Flash messages** thông báo thành công/thất bại khi lưu.
* **Kéo thả** (drag-and-drop) để thay đổi thứ tự banner hoặc sản phẩm.

---

## 📦 Sản phẩm giao nộp
* **Tạo branch mới và tạo pull request vào main và ghi rõ thông tin **
---

## 📝 Tiêu chí đánh giá

| Tiêu chí            | Mô tả                                                             |
| ------------------- | ----------------------------------------------------------------- |
| **Chức năng chính** | Admin chỉnh được cả ba phần; trang chủ công khai hiển thị đúng.   |
| **Chất lượng code** | Cấu trúc rõ ràng, controller/module tách biệt, tên biến rõ nghĩa. |
| **Templating**      | Sử dụng EJS partials/layout.                                      |
| **UX & Validation** | Form kiểm tra input; route admin được bảo vệ.                     |
| **Xử lý lỗi**       | Hiển thị lỗi thân thiện; không crash khi input sai.               |
| **Bonus**           | Upload file, flash message, JS động, kéo-thả…                     |

---

⏱️ **Thời gian thực hiện**: 4–5 giờ. Ưu tiên hoàn thiện ba phần cốt lõi; làm bonus nếu còn dư thời gian. Chúc bạn may mắn!
