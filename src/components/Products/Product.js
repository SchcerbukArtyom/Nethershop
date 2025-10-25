import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../utils/routes";
import { addItemToCart, addItemToFavorites, removeItemFromFavorites } from "../../features/user/userSlice";

const SIZES = [4, 5, 6, 8, 9];

const Product = (item) => {
    const { images, title, price, description } = item;
    const dispatch = useDispatch();
    const { favorites, cart } = useSelector(state => state.user);
    const { isLoading } = useSelector(state => state.products);
    const [currentImage, setCurrentImage] = useState('');
    const [currentSize, setCurrentSize] = useState();

    useEffect(() => {
        if (images?.length) {
            setCurrentImage(images[0]);
        }
    }, [images]);

    const isInFavorites = favorites.some(({ id: favId }) => favId === item.id);
    const isInCart = cart.some(cartItem => cartItem.id === item.id && cartItem.size === currentSize);

    const renderSkeleton = () => (
        <section className="grid col-span-1 lg:grid-cols-3 gap-3 mb-3">
            <div className="col-span-2 grid grid-cols-1 px-3 lg:grid-cols-2 gap-3">
                <div className="h-64 bg-gray-300 animate-pulse rounded-lg"></div>
                <div className="flex flex-wrap justify-around gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="size-30 bg-gray-300 animate-pulse rounded"></div>
                    ))}
                </div>
            </div>
            <div className="p-4">
                <div className="h-8 bg-gray-300 animate-pulse rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 animate-pulse rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded w-1/6"></div>
                <div className="flex gap-2">
                    {SIZES.map((size) => (
                        <div key={size} className="h-8 w-10 bg-gray-300 animate-pulse rounded"></div>
                    ))}
                </div>
                <div className="h-4 bg-gray-300 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2"></div>
                <div className="flex justify-between">
                    <div className="h-10 bg-gray-300 animate-pulse rounded w-2/6"></div>
                    <div className="h-10 bg-gray-300 animate-pulse rounded w-1/2"></div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2"></div>
                    <div className="h-10 bg-gray-300 animate-pulse rounded w-2/6"></div>
                </div>
            </div>
        </section>
    );

    if (isLoading) {
        return renderSkeleton();
    }

    const toggleFavorites = () => {
        if (isInFavorites) {
            dispatch(removeItemFromFavorites(item.id));
        } else {
            const payload = { ...item, size: currentSize };
            dispatch(addItemToFavorites(payload));
        }
    };

    const addToCart = () => {
        if (isInCart) return;
        dispatch(addItemToCart({ ...item, size: currentSize }));
    };

    return (
        <section className="grid col-span-1 lg:grid-cols-3 gap-3 mb-3">
            <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <img
                    src={currentImage}
                    alt={title}
                    className="w-full h-auto object-cover bg-center bg-no-repeat rounded-lg shadow-lg"
                    onError={() => setCurrentImage('/placeholder.jpg')}
                />
                <div className="flex flex-wrap justify-around gap-5 ml-5">
                    {images.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            alt={`${title} thumbnail ${i + 1}`}
                            className="w-1/2 h-30 object-cover bg-center bg-no-repeat rounded cursor-pointer hover:scale-105"
                            onClick={() => setCurrentImage(image)}
                            onError={() => { }}
                        />
                    ))}
                </div>
            </div>

            <div className="p-4">
                <h1 className="text-xl lg:text-2xl font-bold text-white">{title}</h1>
                <div className="text-lg lg:text-xl font-semibold text-color-blue">{price}$</div>
                <div className="text-lg lg:text-xl">
                    <span className="font-medium">Sizes:</span>
                    <div className="flex gap-x-3 py-3 flex-wrap">
                        {SIZES.map((size) => (
                            <div
                                onClick={() => setCurrentSize(currentSize === size ? null : size)}
                                className={`${currentSize === size ? 'ring-2 ring-color-blue -translate-y-2 shadow-lg' : ''
                                    } flex items-center justify-center rounded bg-main-color text-white custom-border custom-shadow cursor-pointer duration-300 px-3 py-1 text-lg font-semibold`}
                                key={size}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-lg text-gray-300 mb-5 leading-relaxed">{description}</p>
                <div className="flex flex-col sm:flex-row justify-between gap-3 mb-5">
                    <button
                        onClick={addToCart}
                        disabled={!currentSize || isInCart}
                        className="w-full sm:w-2/6 text-center custom-border custom-shadow custom-btn disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition bg-main-color text-gray-800 hover:bg-color-blue"
                    >
                        {isInCart ? 'Already in cart' : 'Add to cart'}
                    </button>
                    <button
                        onClick={toggleFavorites}
                        className="w-full sm:w-1/2 text-center custom-border custom-shadow custom-btn bg-color-blue text-gray-800 hover:bg-main-color"
                    >
                        {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
                    </button>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="text-xl text-color-blue custom-shadow mb-5 font-semibold">
                        19 people purchased
                    </div>
                    <Link
                        to={ROUTES.HOME}
                        className="w-full sm:w-2/6 text-center custom-border custom-shadow custom-btn bg-white text-main-color hover:bg-gray-200"
                    >
                        Return to store
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Product;

