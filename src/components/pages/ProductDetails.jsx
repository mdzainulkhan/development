import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCertificate, FaShippingFast, FaStore, FaBackward, FaTextWidth, FaTextHeight } from "react-icons/fa";

export default function ProductDetails() {
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [error, setError] = useState("");

  const { id } = useParams();

  const ProductSingleAPI = "https://dummyjson.com/products";

  useEffect(() => {
    fetch(`${ProductSingleAPI}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        setDetailsProduct(data);
      })
      .catch(() => {
        setError("Product Data Not Found");
      });
  }, [id]);

  const discountPrice = detailsProduct
    ? detailsProduct.price - (detailsProduct.price * 15) / 100
    : 0;


  return (
    <>
      <div className="min-h-screen p-6 bg-slate-900">
        <div className="max-w-[1320px] mx-auto rounded-2xl p-6">
          <h1 className="text-3xl font-bold neon text-center mb-3 text-white">
            Product Details
          </h1>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          {!detailsProduct && !error && (
            <p className="text-white text-center">Loading...</p>
          )}

          {detailsProduct && (
            <div className="grid lg:grid-cols-[35%_auto] gap-6 bg-white rounded-xl p-6">
              <aside>
                <img
                  src={detailsProduct.thumbnail}
                  alt={detailsProduct.title}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </aside>

              <div>
                <h2 className="text-3xl font-bold mb-3">
                  {detailsProduct.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {detailsProduct.description}
                </p>
                <p className="mb-2">
                  <strong>Brand:</strong> {detailsProduct.brand}
                </p>

                <p className="mb-2">
                  <strong>Category:</strong> {detailsProduct.category}
                </p>

                <div className="mb-2 flex items-center gap-2">
                  <strong>Rating:</strong>
                  <span className="text-sm text-gray-500">
                    ({detailsProduct.rating})
                  </span>
                  <div className="flex text-yellow-400 text-xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= Math.round(detailsProduct.rating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mb-2">
                  <strong>Tags:</strong> {detailsProduct.tags}
                </p>
                <p className="mb-2">
                  <strong>SKU:</strong> {detailsProduct.sku}
                </p>
                <div className="flex items-baseline">
                  <span className="text-lg text-red-500">
                    15% OFF
                  </span>
                  <span className="block text-lg mx-3">
                    ${discountPrice.toFixed(2)}
                  </span>

                  <button
                    type="button"
                    className="mt-3 mx-3 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="mt-3 bg-yellow-400 text-black px-5 py-2 rounded-lg hover:bg-yellow-500 cursor-pointer"
                  >
                    Buy Now
                  </button>

                </div>
                <h3 className="text-sm me-4 text-gray-500">
                  M.R.P.: <del>${detailsProduct.price}</del>
                </h3>
                <div className="flex flex-wrap justify-between mt-4">
                  <div className="text-center">
                    <span className="flex justify-center"><FaCertificate size={20} /></span>
                    <span>{detailsProduct.warrantyInformation}</span>
                  </div>

                  <div>
                    <span className="flex justify-center"><FaTextWidth size={20} /></span>
                    <span>{detailsProduct.dimensions.width}</span>
                  </div>
                  <div>
                    <span className="flex justify-center"><FaTextHeight size={20} /></span>
                    <span>{detailsProduct.dimensions.height}</span>
                  </div>
                  <div>
                    <span className="flex justify-center"><FaShippingFast size={20} /></span>
                    <span>{detailsProduct.shippingInformation}</span>
                  </div>
                  <div>
                    <span className="flex justify-center"><FaStore size={20} /></span>
                    <span>{detailsProduct.availabilityStatus}</span>
                  </div>
                  <div>
                    <span className="flex justify-center"><FaBackward size={20} /></span>
                    <span>{detailsProduct.returnPolicy}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
