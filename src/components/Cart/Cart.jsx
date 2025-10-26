import { useDispatch, useSelector } from 'react-redux';
import { sumBy } from '../../utils/common';
import { addItemToCart, removeItemFromCart } from '../../features/user/userSlice';
import { Dash, Plus, Trash3 } from 'react-bootstrap-icons';

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector(({ user }) => user);

    const changeQuantity = (item, quantity) => {
        dispatch(addItemToCart({ ...item, quantity }));
    };

    const removeItem = (id) => {
        dispatch(removeItemFromCart(id));
    };

    return (
        <section className="col-span-4 flex flex-col bg-main-color rounded mb-5 p-2 sm:p-4">
            <h2 className="text-2xl sm:text-3xl text-white custom-shadow self-center mb-4 sm:mb-5">Your cart</h2>

            {!cart.length ? (
                <div className="text-lg sm:text-xl text-white custom-shadow self-center mb-5">Cart is empty</div>
            ) : (
                <>
                    <div className="space-y-3 sm:space-y-4 w-full">
                        {cart.map((item, index) => {
                            const { title, images, category, price, id, size, quantity } = item;

                            return (
                                <div
                                    key={id}
                                    className={`flex flex-col lg:flex-row lg:items-center lg:justify-between border rounded custom-border p-2 sm:p-4 ${
                                        index === cart.length - 1 ? '' : 'border-b-0 lg:border-b'
                                    } lg:mx-10 bg-white/5`} 
                                >
                                    
                                    <div className="flex-shrink-0 mb-3 lg:mb-0 lg:mr-4">
                                        
                                        <img 
                                            src={images[0]} 
                                            alt={`Product image: ${title}`} 
                                            className="rounded w-full lg:w-32 h-auto object-cover max-w-full" 
                                            style={{ aspectRatio: '16/9' }} 
                                            loading="lazy" 
                                        />
                                    </div>

                                   
                                    <div className="flex flex-col items-center lg:items-start flex-grow mb-3 lg:mb-0 lg:mr-4 px-2 sm:px-4 text-center lg:text-left">
                                        <div className="font-semibold text-white text-base sm:text-lg break-words whitespace-normal">
                                            {title}
                                        </div>
                                        <div className="text-sm text-white opacity-80">{category.name}</div>
                                        <div className="font-semibold text-white text-sm sm:text-base mt-1">
                                            Size: {size}
                                        </div>
                                    </div>

                                    
                                    <div className="text-lg sm:text-xl text-white custom-shadow mb-3 lg:mb-0 lg:mr-4 text-center lg:text-right">
                                        Price for one:  {price} $
                                    </div>

                                    
                                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start my-5 lg:mx-0 lg:mr-4 gap-1 sm:gap-2">
                                        <Dash
                                            className="size-6 sm:size-7 text-white custom-border rounded cursor-pointer custom-shadow hover:bg-white hover:text-black focus:ring-2 focus:ring-white/50 focus:outline-none transition duration-200"
                                            onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}
                                            aria-label="Decrease quantity"
                                            role="button"
                                        />
                                        <span className="text-lg sm:text-xl text-white my-5 sm:mx-4 min-w-[2rem] text-center">
                                            {quantity}
                                        </span>
                                        <Plus
                                            className="size-6 sm:size-7 text-white custom-border rounded cursor-pointer custom-shadow hover:bg-white hover:text-black focus:ring-2 focus:ring-white/50 focus:outline-none transition duration-200"
                                            onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}
                                            aria-label="Increase quantity"
                                            role="button"
                                        />
                                    </div>

                                   
                                    <div className="text-lg sm:text-xl text-white custom-shadow mb-3 lg:mb-0 lg:mr-4 text-center lg:text-right font-semibold">
                                        Price for all:  {price * quantity} $
                                    </div>
                                    
                                   <div className="custom-shadow color-main mx-4">
                                        <Trash3
                                            className="size-6 md:size-8 text-white justify-self-center hover:text-[#00f5ff] hover:scale-125 transition-transform duration-300 ease-in-out cursor-pointer"
                                            onClick={() => removeItem(item.id)}
                                            aria-label="Remove item from cart"
                                            role="button"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                   
                    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center px-2 sm:px-10 my-4 sm:my-5 gap-3 lg:gap-0">
                        <div className="text-lg sm:text-xl text-white custom-shadow text-center lg:text-left order-2 lg:order-1">
                            TOTAL PRICE: <span className="font-bold">{sumBy(cart.map(({ quantity, price }) => quantity * price))}$</span>
                        </div>
                        <button className="w-full lg:w-auto custom-border custom-shadow custom-btn px-6 py-2 text-base sm:text-lg order-1 lg:order-2">
                            Proceed to checkout
                        </button>
                    </div>
                </>
            )}
        </section>
    );
};

export default Cart;
