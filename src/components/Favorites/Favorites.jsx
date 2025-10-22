import { useState, useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';
import { sumBy } from '../../utils/common';
import { removeItemFromFavorites, addItemToCart } from '../../features/user/userSlice';
import { Trash3, Cart3 } from 'react-bootstrap-icons';

const SIZES = [4, 5, 6, 8, 9];

const Favorites = () => {
    const dispatch = useDispatch();
    const { favorites } = useSelector(({ user }) => user);
    
    const [selectedSizes, setSelectedSizes] = useState({});

    useEffect(() => {
        setSelectedSizes(prev => {
            const newSizes = { ...prev };
            let hasChanges = false;
            favorites.forEach(item => {
                if (item.size && !newSizes[item.id]) {
                    newSizes[item.id] = item.size;
                    hasChanges = true;
                }
            });
            return hasChanges ? newSizes : prev;
        });
    }, [favorites]); 

    const removeItem = (id) => {
        dispatch(removeItemFromFavorites(id));
       
        setSelectedSizes(prev => {
            const newSizes = { ...prev };
            delete newSizes[id];
            return newSizes;
        });
    };

    const addToCart = (item) => {
        const selectedSize = selectedSizes[item.id] || item.size;
        if (!selectedSize) {
            alert('Please select a size before adding to cart.');
            return;
        }
        dispatch(addItemToCart({ ...item, size: selectedSize }));
    };

    return (
        <section className="col-span-4 flex flex-col bg-main-color rounded mb-5 px-4 sm:px-6 md:px-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-white custom-shadow self-center mb-5">Your favorites items</h2>

            {!favorites.length ? (
                <div className="text-base sm:text-lg md:text-xl text-white custom-shadow self-center mb-5">No favorites yet</div>
            ) : (
                <>
                    <div className="list space-y-4">
                        {favorites.map((item, index) => {
                            const { title, images, category, price, id, size } = item;

                            return (
                                <div 
                                    className={`overflow-hidden border border-t-0 last:border-b rounded custom-border mx-2 sm:mx-4 md:mx-10 mb-4 bg-white/5 backdrop-blur-sm ${index === 0 ? 'border-t' : ''}`} 
                                    key={id}
                                >
                                    
                                    <div className="p-3 sm:p-4 pb-4 sm:pb-6"> 
                                        
                                        <div className='flex flex-col sm:flex-row sm:items-center flex-grow gap-3 sm:gap-4 min-h-0'>
                                            <div 
                                                className="flex-shrink-0 w-full sm:w-[150px] h-24 sm:h-auto rounded bg-center bg-cover max-w-full" 
                                                style={{ backgroundImage: `url(${images[0]})`, aspectRatio: '16/9' }}
                                            />   

                                            <div className="flex flex-col items-center sm:items-start flex-grow px-2 sm:px-4 custom-shadow break-words whitespace-normal text-center sm:text-left min-h-0 overflow-hidden"> 
                                                <div className="font-semibold text-white text-base sm:text-lg md:text-xl line-clamp-2">{title}</div>
                                                <div className="text-xs sm:text-sm text-white/80">{category?.name || 'No category'}</div>
                                            </div>
                                        </div>

                                        
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mt-3 sm:mt-0 mb-3 sm:mb-0">
                                            <div className="text-base sm:text-lg md:text-xl font-semibold text-white custom-shadow flex-shrink-0">
                                                Size: {selectedSizes[id] || size || 'Not selected'}
                                            </div>
                                            <div className="text-base sm:text-lg text-white custom-shadow flex-shrink-0">Price: {price} $</div> 
                                            
                                            <span className='text-xl custom-shadow text-white sm:text-lg '>Change the size:</span>
                                            <select 
                                                className="text-white text-base sm:text-lg bg-main-color/80 border border-white/20 rounded custom-shadow px-3 py-1 sm:py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                                value={selectedSizes[id] || size || ''}  
                                                onChange={(e) => setSelectedSizes(prev => ({ ...prev, [id]: e.target.value }))}
                                            >
                                                <option className="bg-main-color text-white" value="">Select size</option> 
                                                {SIZES.map(s => (
                                                    <option key={s} className="bg-main-color text-white" value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex justify-center space-x-3 sm:space-x-4 my-5">
                                            <Cart3 
                                                className='text-xl sm:text-2xl text-white custom-shadow cursor-pointer mr-10 hover:scale-110 sm:hover:scale-120 duration-300' 
                                                style={{ filter: 'drop-shadow(0 0 5px #00f5ff) drop-shadow(0 0 10px #00f5ff)' }}
                                                onClick={() => addToCart(item)}
                                            />                            
                                            <Trash3 
                                                className='text-xl sm:text-2xl text-white custom-shadow cursor-pointer hover:scale-110 sm:hover:scale-120 duration-300' 
                                                style={{ filter: 'drop-shadow(0 0 5px #00f5ff) drop-shadow(0 0 10px #00f5ff)' }}
                                                onClick={() => removeItem(item.id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center px-4 sm:px-10 my-5">
                        <div className="text-base sm:text-lg md:text-xl text-white custom-shadow mb-2 sm:mb-0">
                            TOTAL PRICE: {" "}
                            <span className="font-bold text-lg sm:text-xl">
                                {sumBy(favorites, 'price')} $
                            </span>
                        </div>
                    </div>
                </>            
            )}
        </section>
    );
};

export default Favorites;
