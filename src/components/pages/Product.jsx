import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Product() {

    const [apiData, setApiData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    const ProductAPI = 'https://dummyjson.com/products'; 
    const ProductCategoriesAPI = `${ProductAPI}/categories`;

    useEffect(() => {
        fetch(ProductCategoriesAPI)
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);

            })
            .catch(() => {
                setError("Category Data Not Found");
            });
    }, []);

    useEffect(() => {
        fetch(ProductAPI)
            .then((res) => res.json())
            .then((data) => {
                setApiData(data.products);
            })
            .catch(() => {
                setError("Products Data Not Found");
            });
    }, []);

    return (
        <>
            <div className="min-h-screen p-6 bg-slate-900">
                <div className="max-w-[1320px] mx-auto rounded-2xl p-6">
                    <h1 className="text-3xl font-bold neon text-center mb-3">Products</h1>

                    <div className="grid lg:grid-cols-[20%_auto] gap-3">
                        <aside>
                            <h3 className="text-white text-xl border-b-3 mb-4">Filters</h3>
                            <ul>
                                {categories.map((obj, index) => (
                                    <li key={index} className="text-white border-b py-2">{obj.name}</li>
                                ))}
                            </ul>

                        </aside>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {error && (
                                <p className="text-red-500 text-center mb-4">{error}</p>
                            )}
                            {
                                apiData.map((obj, index) => <ProductCard data={obj} key={index} />)
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}


export function ProductCard({ data }) {
    const { title, price, description, thumbnail, id } = data;
    const discountPrice = price - (price * 15) / 100;
    return (
        <div className="w-full max-w-sm bg-neutral-primary-soft p-4 border border-default bg-white rounded-base shadow-xs">
            <img
                className="rounded-xl mb-6 w-full h-52 object-cover"
                src={thumbnail}
                alt={title}
            />
            <div>
                <h5 className="text-lg text-heading font-semibold tracking-tight">
                    {title}
                </h5>
                <p className="mt-3 text-gray-600">
                    {description}
                </p>
                <div className="flex items-center justify-between mt-6">
                    <div className="flex">
                        <span className="text-lg font-extrabold text-heading mr-1">
                            ${price} </span>
                        <span className="block text-md font-extrabold text-gray-400">
                            <del> ${discountPrice.toFixed(2)}</del>
                        </span>
                        <sup className="text-xs text-red-500">
                            15%OFF
                        </sup>
                    </div>
                    <button
                        type="button"
                        className="inline-flex text-xs items-center cursor-pointer text-white bg-blue-600 hover:bg-blue-700 border border-transparent font-medium rounded-lg px-3 py-2"
                    >
                       <Link to={`/product-details/${id}`} >Product Detail </Link>
                    </button>
                </div>
            </div>
        </div>

    )
}
