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
    const [currentImage, setCurrentImage] = useState();
    const [currentSize, setCurrentSize] = useState();

    useEffect(() => {
        if (!images.length) return;
        setCurrentImage(images[0]);
    }, [images]);

    const isInFavorites = favorites.some(({ id }) => id === item.id);
    const isInCart = cart.some(cartItem => cartItem.id === item.id && cartItem.size === currentSize);


    const renderSkeleton = () => (
        <section className="grid col-span-1 lg:grid-cols-3 gap-3 mb-3">
            <div className="col-sp2 grid grid-cols-1 px-3 lg:grid-cols-2 gap-3 min-h-0">
                Image
                <div className="col-span-1 bg-gray-300 animate-pulse h-64 lg:h-auto w-full rounded"></div>
                Image
                <div className="flex flex-wrap justify-around gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-gray-300 animate-pulse size-30 rounded"></div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col p-4">
                Title
                <div className="h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
                Price
                <div className="h-5 bg-gray-300 animate-pulse rounded w-1/4 mb-3"></div>
                Sizes
                <div className="h-4 bg-gray-300 animate-pulse rounded w-1/6 mb-2"></div>
                <div className="flex gap-x-3 py-3">
                    {SIZES.map((size) => (
                        <div key={size} className="h-8 w-10 bg-gray-300 animate-pulse rounded"></div>
                    ))}
                </div>
                Description
                <div className="space-y-2 mb-5">
                    <div className="h-4 bg-gray-300 animate-pulse rounded"></div>
                    <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2"></div>
                </div>
                Buttons
                <div className="flex justify-between mb-5">
                    <div className="h-10 bg-gray-300 animate-pulse rounded w-2/6"></div>
                    <div className="h-10 bg-gray-300 animate-pulse rounded w-1/2"></div>
                </div>
                <div className="flex flex-col items-center">
                    To cart
                    <div className="h-5 bg-gray-300 animate-pulse rounded w-1/2 mb-5"></div>
                    Back to store
                    <div className="h-10 bg-gray-300 animate-pulse rounded w-2/6"></div>
                </div>
            </div>
        </section>
    );


    if (isLoading || !item || !item.id) {
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
        if (isInCart) {
            return;
        }
        dispatch(addItemToCart({ ...item, size: currentSize }));
    };

    return (
        <section className="grid col-span-1 lg:grid-cols-3 gap-3 mb-3">
            <div className="col-span-2 grid grid-cols-1 px-3 lg:grid-cols-2 gap-3 min-h-0">
                <div
                    className="col-span-1 bg-cover bg-center h-64 lg:h-auto w-full bg-no-repeat rounded"
                    style={{ backgroundImage: `url(${currentImage})` }}
                />
                <div className="flex flex-wrap justify-around gap-2">
                    {images.map((image, i) => (
                        <div
                            key={i}
                            className="bg-cover bg-center size-30 bg-no-repeat rounded hover:scale-110 transition duration-300 cursor-pointer"
                            style={{ backgroundImage: `url(${image})` }}
                            onClick={() => setCurrentImage(image)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col p-4">
                <h1 className="text-xl lg:text-2xl">{title}</h1>
                <div className="text-lg lg:text-xl">{price}$</div>
                <div className="text-lg lg:text-xl">
                    <span>Sizes:</span>
                    <div className="flex gap-x-3 py-3">
                        {SIZES.map((size) => (
                            <div
                                onClick={() => {
                                    setCurrentSize(currentSize === size ? null : size);
                                }}
                                className={`${currentSize === size ? '-translate-y-2' : ""} 
                                flex items-center justify-center rounded bg-white custom-border custom-shadow cursor-pointer hover:scale-120 duration-300 px-3 py-1 text-lg font-semibold`}
                                key={size}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-lg mb-5">{description}</p>
                <div className="flex justify-between mb-5">
                    <button onClick={addToCart}
                        className="w-2/6 text-center custom-border custom-shadow custom-btn disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition" disabled={!currentSize || isInCart}>
                        {isInCart ? 'Already in cart' : 'Add to cart'}
                    </button>
                    <button onClick={toggleFavorites}
                        className="w-1/2 text-center custom-border custom-shadow custom-btn">
                        {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-xl text-white custom-shadow mb-5">19 people purchased</div>
                    <Link to={ROUTES.HOME} className="w-2/6 text-center custom-border custom-shadow custom-btn">Return to store</Link>
                </div>
            </div>
        </section>
    );
};

export default Product;

