import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, forwardRef } from "react";
import { useDebounce } from 'use-debounce';

import { BagHeartFill, Person, Cart3, List, Search } from 'react-bootstrap-icons';

import { ROUTES } from "../../utils/routes";
import MobileMenu from "../MobileMenu/MobileMenu";

import { toggleForm } from "../../features/user/userSlice"
import { useGetProductsQuery } from "../../features/api/apiSlice";

import Logo from '../../resources/FullLogo_Transparent_NoBuffer.png'

const Header = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, cart } = useSelector(({ user }) => user);
    const { favorites } = useSelector(({ user }) => user);
    const [values, setValues] = useState({ name: "Guest", avatar: "" });
    const [searchValue, setSearchValue] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [debouncedSearchValue] = useDebounce(searchValue, 400);

    const { data: rawData, isLoading, error } = useGetProductsQuery(
        { params: { title: debouncedSearchValue } },
        { skip: !debouncedSearchValue.trim() }
    );

    const handleClick = () => {
        if (!currentUser) dispatch(toggleForm(true));
        else navigate(ROUTES.PROFILE);
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const searchWords = debouncedSearchValue.toLowerCase().trim().split(/\s+/).filter(word => word.length > 0);
    const filteredData = rawData?.filter(item =>
        searchWords.some(word => item.title.toLowerCase().includes(word))
    ) || [];

    useEffect(() => {
        if (!currentUser) return;
        setValues(currentUser);
    }, [currentUser])

    return (
        <header 
            className="sticky flex items-center justify-around top-0 left-0 w-full z-50 bg-main-color py-2"
            role="banner">

            <div className="flex-shrink-0 custom-shadow ml-5">
                <Link to={ROUTES.HOME}>
                    
                    <img 
                        src={Logo} 
                        alt="logo" 
                        className="w-16 sm:w-32 mx-auto aspect-[3/1] max-w-full hover:scale-105 transition-transform duration-300 ease-in-out" 
                    />
                </Link>
            </div>

            
           <div className="relative w-full sm:max-w-md max-w-[50vw] mx-2 pt-5">
                <form className="flex flex-col w-full">
                    <div className="rounded custom-border mb-5 relative 
                                    focus-within:outline-none 
                                    custom-shadow
                                    focus-within:shadow-[0_0_0_3px_rgba(0,245,255,0.6)]
                                    transition-shadow duration-300">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
                    <input
                        className="pl-10 pr-2 text-white text-[12px] w-full sm:min-w-64 bg-transparent border-none outline-none"
                        type="search"
                        placeholder="Search..."
                        autoComplete="off"
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    </div>

                    {debouncedSearchValue.trim() && (
                    <div className="absolute top-full left-0 w-full sm:w-[280px] max-w-xs bg-black bg-opacity-50 rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
                        {isLoading && (
                        <div className="p-4 text-gray-400">Loading...</div>
                        )}
                        {error && (
                        <div className="p-4 text-red-500">Error loading results. Try again.</div>
                        )}
                        {!isLoading && !error && filteredData.length === 0 && (
                        <div className="p-4 text-gray-400">No exact matches found</div>
                        )}
                        {!isLoading && !error && filteredData.map((item) => {
                        const { title, images, id } = item;
                        return (
                                <Link 
                                    className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start p-3 mb-2 hover:bg-gray-700 hover:bg-opacity-30 transition-all duration-300 ease-in-out rounded w-full" 
                                    key={id} 
                                    onClick={() => setSearchValue("")} 
                                    to={`/products/${id}`}
                                >
                                   
                                    <img 
                                        src={images[0]} 
                                        alt={title} 
                                        className="w-16 h-12 sm:w-20 sm:h-16 rounded mx-auto lg:mx-0 object-cover aspect-[4/3] flex-shrink-0"
                                    />
                                    <div className="text-sm lg:text-base text-white mt-2 lg:mt-0 lg:ml-3 flex-1 text-center lg:text-left min-w-0 truncate">{title}</div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </form>
            </div>

           
            <div className="hidden lg:flex flex-col items-center custom-shadow mr-10 flex-shrink-0">
                <Person 
                    className="size-6 sm:size-8 text-white hover:scale-150 transition-transform duration-300 ease-in-out origin-center cursor-pointer" 
                    onClick={handleClick} 
                />
                <div className="font-bold text-lg sm:text-2xl text-white">{values.name}</div>
            </div>

            
            <div className="flex items-center space-x-2 justify-end min-w-0">
                <button
                    onClick={toggleMenu}
                    className="block lg:hidden p-2 rounded-full hover:bg-gray-700 transition-colors flex-shrink-0"
                    aria-label="Open menu"
                >
                 
                    <List className="w-6 h-6 sm:w-8 sm:h-8 text-white hover:scale-125 transition-transform duration-300 ease-in-out origin-center" />
                </button>

                <div className="hidden lg:flex items-center space-x-10 flex-shrink-0">
                    <Link to={ROUTES.FAVORITES}>
                        <div className="custom-shadow color-main relative">
                            
                            <BagHeartFill className="size-6 sm:size-8 text-white hover:text-[#00f5ff] hover:scale-150 transition-transform duration-300 ease-in-out origin-center cursor-pointer" />
                            <div className="rounded-full text-center size-5 sm:size-6 absolute -top-3 -right-5 bg-cyan-800 flex items-center justify-center" style={{ display: favorites.length === 0 ? 'none' : 'block' }}>
                                {!!favorites.length && (<span className="text-xs p-1">{favorites.length > 99 ? '99+' : favorites.length}</span>)}
                            </div>
                        </div>
                    </Link>

                    <Link to={ROUTES.CART}>
                        <div className="custom-shadow color-main mx-4 relative" ref={ref}>
                           
                            <Cart3 className="size-6 sm:size-8 text-white hover:text-[#00f5ff] hover:scale-150 transition-transform duration-300 ease-in-out origin-center cursor-pointer" />
                            <div className="rounded-full text-center size-5 sm:size-6 absolute -top-3 -right-5 bg-cyan-800 flex items-center justify-center" style={{ display: cart.length === 0 ? 'none' : 'block' }}>
                                {!!cart.length && (<span className="text-xs p-1">{cart.length > 99 ? '99+' : cart.length}</span>)}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {isMenuOpen && (
                <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} currentUser={currentUser} cart={cart} favorites={favorites} handleClick={handleClick} values={values} />
            )}
        </header>
    );
});

export default Header;

