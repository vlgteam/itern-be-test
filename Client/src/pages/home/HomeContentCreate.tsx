import React, { useEffect, useState } from "react";
import homeContentApi from "../../features/content/homecontentApi";

interface Product {
  id?: string;
  name: string;
  link: string;
  imageUrls: File | null;
  imagePreview?: string;
}

const CMSForm = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState(true); // true = xem, false = sửa

  // Load dữ liệu từ server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await homeContentApi.getallcontent();
        const formatted: Product[] = data.map((product: any) => ({
          id: product._id,
          name: product.name || "",
          link: product.link || "",
          imageUrls: null,
          imagePreview: product.imageUrls || "",
        }));
        setFeaturedProducts(formatted);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  // Hàm xử lý click vào sản phẩm
  const handleProductClick = (product: Product) => {
    if (product.link) {
      // Kiểm tra xem link có protocol hay không
      const url =
        product.link.startsWith("http://") ||
        product.link.startsWith("https://")
          ? product.link
          : `https://${product.link}`;

      // Mở link trong tab mới
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("Sản phẩm này chưa có link!");
    }
  };

  // Cập nhật thay đổi input
  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: any
  ) => {
    const updatedProducts = [...featuredProducts];
    updatedProducts[index][field] = value;
    setFeaturedProducts(updatedProducts);
  };

  // Thêm sản phẩm mới
  const addProduct = () => {
    setFeaturedProducts([
      ...featuredProducts,
      { name: "", link: "", imageUrls: null },
    ]);
  };

  // Xoá sản phẩm
  const handleDelete = async (index: number) => {
    const product = featuredProducts[index];
    const confirmed = window.confirm("Bạn có chắc muốn xoá sản phẩm này?");
    if (!confirmed) return;

    try {
      if (product.id) {
        await homeContentApi.deletecontent(product.id);
        console.log("Đã xoá thành công từ server.");
      }

      const updated = [...featuredProducts];
      updated.splice(index, 1);
      setFeaturedProducts(updated);
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
      alert("Không thể xoá sản phẩm. Vui lòng thử lại.");
    }
  };

  // Gửi dữ liệu lên server
  const handleSubmit = async () => {
    try {
      for (let index = 0; index < featuredProducts.length; index++) {
        const product = featuredProducts[index];
        const formData = new FormData();

        formData.append("name", product.name);
        formData.append("link", product.link);
        if (product.imageUrls) {
          formData.append("image", product.imageUrls);
        }

        console.log("FormData gửi đi:");
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}:`, pair[1]);
        }

        await homeContentApi.createcontent(formData);
      }

      alert("Tất cả sản phẩm đã được gửi thành công!");
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      alert("Đã xảy ra lỗi khi gửi dữ liệu!");
    }
  };

  const handleUpdate = async (index: number) => {
    const product = featuredProducts[index];

    if (!product.id) {
      alert(
        "Sản phẩm chưa tồn tại trên server. Hãy lưu mới trước khi cập nhật."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("link", product.link);
      if (product.imageUrls) {
        formData.append("image", product.imageUrls);
      }

      console.log("Updating content with ID:", product.id);
      await homeContentApi.updatecontent(product.id, formData);
      alert("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Không thể cập nhật sản phẩm. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Quản lý sản phẩm nổi bật
        </h1>

        {/* Mode Toggle */}
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode(true)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              viewMode
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            📋 Xem danh sách
          </button>
          <button
            onClick={() => setViewMode(false)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              !viewMode
                ? "bg-green-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ✏️ Chỉnh sửa
          </button>
        </div>
      </div>

      {/* View Mode - Xem danh sách */}
      {viewMode ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Danh sách sản phẩm ({featuredProducts.length} sản phẩm)
          </h2>

          {featuredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <p className="text-gray-500 text-lg">Chưa có sản phẩm nào</p>
              <button
                onClick={() => setViewMode(false)}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Thêm sản phẩm đầu tiên
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleProductClick(product)}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden ${
                    product.link
                      ? "cursor-pointer hover:scale-105 hover:bg-blue-50"
                      : "cursor-default opacity-75"
                  }`}
                  title={
                    product.link
                      ? `Click để mở: ${product.link}`
                      : "Chưa có link"
                  }
                >
                  {/* Product Image */}
                  <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                    {product.imagePreview ? (
                      <img
                        src={product.imagePreview}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-4xl">🖼️</div>
                    )}

                    {/* Link indicator */}
                    {product.link && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full text-xs shadow-lg">
                        🔗
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-lg mb-2 truncate">
                      {product.name || "Chưa có tên"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 truncate">
                      {product.link ? (
                        <span className="text-blue-600">🔗 {product.link}</span>
                      ) : (
                        <span className="text-gray-400">Chưa có link</span>
                      )}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.id
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.id ? "Đã lưu" : "Chưa lưu"}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-400 text-xs">
                          #{index + 1}
                        </span>
                        {product.link && (
                          <span className="text-blue-500 text-xs">
                            👆 Click
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hướng dẫn sử dụng */}
          {featuredProducts.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 text-lg">💡</span>
                <p className="text-blue-800 text-sm">
                  <strong>Hướng dẫn:</strong> Click vào các sản phẩm có biểu
                  tượng 🔗 để mở link trong tab mới. Sản phẩm chưa có link sẽ
                  hiển thị mờ và không thể click.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Edit Mode - Chỉnh sửa */
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Chỉnh sửa sản phẩm
            </h2>
            <button
              onClick={addProduct}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2 shadow-md"
            >
              <span className="text-lg">+</span>
              <span>Thêm sản phẩm</span>
            </button>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">✏️</div>
              <p className="text-gray-500 text-lg mb-4">
                Chưa có sản phẩm để chỉnh sửa
              </p>
              <button
                onClick={addProduct}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Tạo sản phẩm mới
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      Sản phẩm #{index + 1}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdate(index)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm"
                      >
                        💾 Cập nhật
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm"
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form inputs */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tên sản phẩm
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập tên sản phẩm..."
                          value={product.name}
                          onChange={(e) =>
                            handleProductChange(index, "name", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Link sản phẩm
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập link sản phẩm... (vd: https://example.com)"
                          value={product.link}
                          onChange={(e) =>
                            handleProductChange(index, "link", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          💡 Link sẽ được mở trong tab mới khi click vào sản
                          phẩm
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hình ảnh
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "imageUrls",
                              e.target.files?.[0] || null
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                    </div>

                    {/* Image preview */}
                    <div className="flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        {product.imagePreview ? (
                          <img
                            src={product.imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center text-gray-400">
                            <div className="text-4xl mb-2">🖼️</div>
                            <p className="text-sm">Chưa có hình ảnh</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        product.id
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.id ? "✅ Đã lưu trên server" : "⏳ Chưa lưu"}
                    </span>
                  </div>
                </div>
              ))}

              {/* Save all button */}
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-lg font-medium shadow-lg"
                >
                  💾 Lưu tất cả cấu hình
                </button>
                <p className="text-gray-500 text-sm mt-2">
                  Lưu tất cả thay đổi lên server
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CMSForm;
