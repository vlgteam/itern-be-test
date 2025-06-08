import React, { useEffect, useState } from "react";
import homeContentApi from "../../features/content/homecontentApi";

interface Product {
  id?: string;
  name: string;
  link: string;
  imagePreview?: string;
}

const CMSViewOnly = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  // Load dữ liệu từ server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await homeContentApi.getallcontent();
        const formatted: Product[] = data.map((product: any) => ({
          id: product._id,
          name: product.name || "",
          link: product.link || "",
          imagePreview: product.imageUrls || "",
        }));
        setFeaturedProducts(formatted);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Danh sách sản phẩm nổi bật
        </h1>
        <p className="text-gray-500">
          Tổng cộng: {featuredProducts.length} sản phẩm
        </p>
      </div>

      {featuredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <p className="text-gray-500 text-lg">Chưa có sản phẩm nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {product.imagePreview ? (
                  <img
                    src={product.imagePreview}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-4xl">🖼️</div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg mb-2 truncate">
                  {product.name || "Chưa có tên"}
                </h3>
                <p className="text-gray-600 text-sm mb-3 truncate">
                  {product.link || "Chưa có link"}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}
                  >
                    Đã lưu
                  </span>
                  <span className="text-gray-400 text-xs">#{index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CMSViewOnly;
