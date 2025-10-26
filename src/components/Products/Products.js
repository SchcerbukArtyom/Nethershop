import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Products = React.memo(({ products = [], amount, title }) => {
    const { isLoading } = useSelector(state => state.products);

    const list = useMemo(() => {
        const uniqueProducts = [...new Map(products.map(item => [item.id, item])).values()].slice(0, amount);
        return uniqueProducts.map(item => ({
            ...item,
            purchases: Math.floor(Math.random() * 20 + 1)
        }));
    }, [products, amount]);

    const getImageSrc = (images) => {
        let originalSrc = '../../resources/noImage.webp';
        if (Array.isArray(images) && images.length > 0) {
            originalSrc = images[0];
        } else if (typeof images === 'string' && images.trim()) {
            originalSrc = images;
        }
        return originalSrc;
    };

    const handleImageError = (e) => {
        e.target.src = '/noImage.jpg';
    };

    const SkeletonCard = () => (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden col-span-1 hover:shadow-xl transition-shadow duration-300">

            <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-2xl animate-pulse relative overflow-hidden">

                <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
            </div>

            <div className="p-4">
                Title
                <div className="h-5 bg-gray-300 rounded mb-2 animate-pulse w-4/5"></div>


                <div className="flex items-center gap-1 mb-3">
                    <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
                        ))}
                    </div>
                    <div className="h-3 bg-gray-300 rounded w-8 animate-pulse ml-1"></div>
                </div>

                Price
                <div className="h-4 bg-gray-300 rounded mb-3 animate-pulse w-1/3 font-semibold"></div>


                <div className="space-y-1 mb-4">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>


                <div className="flex justify-between items-center gap-3">
                    <div className="h-10 bg-gray-300 rounded-lg animate-pulse flex-1">Add to cart</div>
                    <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse">Heart</div>
                </div>
            </div>
        </div>
    );


    if (isLoading) {
        return (
            <section className="col-span-4 flex flex-col justify-center items-center bg-main-color w-full rounded px-4">
                <h2 className="text-2xl lg:text-4xl text-white font-bold custom-shadow py-5">{title}</h2>
                <div className="flex justify-center flex-wrap gap-4 pb-4">
                    {Array.from({ length: amount }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="col-span-4 flex flex-col justify-center items-center bg-main-color w-full rounded px-4">
            <h2 className="text-2xl lg:text-4xl text-white font-bold custom-shadow py-5">{title}</h2>
            <div className="flex justify-center flex-wrap gap-4 pb-4">
                {list.map(({ id, title: productTitle, description, price, purchases, images }, index) => {
                    const originalSrc = getImageSrc(images);
                    const discount = 0.2;
                    const originalPrice = Math.round(price / (1 - discount));

                    return (
                        <Link
                            to={`/products/${id}`}
                            key={id}
                            className="bg-white overflow-hidden rounded-2xl transition-shadow duration-200 ease-in-out hover:shadow-2xl hover:shadow-amber-100 shadow-lg group block w-[200px] md:w-[256px]"
                        >
                            <img
                                src={originalSrc}
                                alt={productTitle}
                                loading={index === 0 ? "eager" : "lazy"}
                                fetchPriority={index === 0 ? "high" : "auto"}
                                onError={(e) => handleImageError(e, productTitle)}
                                className="w-full h-32 md:h-48 object-cover object-center rounded-t-2xl group-hover:opacity-90"
                                sizes="(max-width: 768px) 200px, 256px"
                            />
                            <div className="p-4">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                                    {productTitle}
                                </h4>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                    {description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 line-through">
                                            ${originalPrice}
                                        </span>
                                        <span className="text-xl font-bold text-gray-700">
                                            ${price}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs bg-main-color text-white px-2 py-1 rounded-full font-semibold">
                                            Sale!
                                        </span>
                                        <span className="text-xs text-gray-800 mt-1">
                                            {purchases} purchases
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
});

export default Products;
