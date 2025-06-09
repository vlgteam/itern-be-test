let editingProductId = null;

// 1. Tải danh sách sản phẩm
function loadProducts() {
  fetch("/api/content/")
    .then((res) => res.json())
    .then((data) => {
      const products = data.contents || [];
      const list = document.getElementById("product-list");
      list.innerHTML = "";

      products.forEach((product) => {
        const li = document.createElement("li");

        li.innerHTML = `
          <img src="${product.imageUrls}" width="150" />
          <h4>${product.name}</h4>
          <a href="${product.link}" target="_blank">Chi tiết</a>
          <button class="edit-btn" data-id="${product._id}">Sửa</button>
          <button class="delete-btn" data-id="${product._id}">Xoá</button>
        `;

        list.appendChild(li);
      });

      // Gắn sự kiện nút sửa
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          const product = products.find((p) => p._id === id);
          if (product) {
            populateFormForEdit(product);
          }
        });
      });

      // Gắn sự kiện nút xoá
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          if (confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
            deleteProduct(id);
          }
        });
      });
    })
    .catch((err) => {
      console.error("Lỗi khi tải dữ liệu sản phẩm nổi bật:", err);
    });
}

// 2. Điền thông tin vào form khi nhấn sửa
function populateFormForEdit(product) {
  document.querySelector("#name").value = product.name;
  document.querySelector("#link").value = product.link;
  editingProductId = product._id;
  alert("Đang sửa sản phẩm. Vui lòng chọn lại ảnh nếu muốn cập nhật ảnh mới.");
}

// 3. Gửi form tạo mới / cập nhật sản phẩm
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const url = editingProductId
    ? `/api/content/${editingProductId}`
    : "/api/content";
  const method = editingProductId ? "PUT" : "POST";

  fetch(url, {
    method,
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      alert(
        editingProductId ? "Cập nhật thành công!" : "Tạo sản phẩm thành công!"
      );
      this.reset();
      editingProductId = null;
      loadProducts();
    })
    .catch((err) => {
      console.error("Lỗi:", err);
      alert("Đã xảy ra lỗi khi lưu sản phẩm.");
    });
});

// 4. Xoá sản phẩm
function deleteProduct(id) {
  fetch(`/api/content/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Xoá sản phẩm thành công!");
      loadProducts();
    })
    .catch((err) => {
      console.error("Lỗi khi xoá sản phẩm:", err);
      alert("Xoá sản phẩm thất bại.");
    });
}

// 5. Gọi khi trang tải xong
loadProducts();
