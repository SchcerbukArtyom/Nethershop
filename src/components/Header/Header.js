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
        <header className="w-full max-w-md sm:max-w-none lg:max-w-12xl mx-auto flex items-center justify-between gap-4 lg:gap-8 bg-main-color py-3 sm:py-4 lg:py-6 px-4 sm:px-6 lg:px-8 relative hover:shadow-lg duration-300"
            role="banner">

            <div className="custom-shadow">
                <Link to={ROUTES.HOME}>
                    <img src={Logo} alt="logo" className="w-20 sm:w-35 mx-auto hover:scale-105 duration-300 ease-in-out max-w-full" />
                </Link>
            </div>

            <form className="relative w-full sm:w-auto flex-1 max-w-full sm:max-w-md">
                <div className="border-2 rounded custom-border custom-shadow mb-5 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
                    <input className="pl-10 pr-2 text-white text-[12px] focus:outline-blue w-full sm:min-w-64 bg-transparent"
                        type="search"
                        name="search"
                        placeholder="Search..."
                        autoComplete="off"
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue} />
                </div>
                {debouncedSearchValue.trim() && (
                    <div className="absolute top-full left-0 w-full sm:min-w-[300px] bg-black bg-opacity-50 rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
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
                                <Link className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start p-3 mb-2 hover:bg-gray-700 hover:bg-opacity-30 duration-300 rounded w-full" key={id} onClick={() => setSearchValue("")} to={`/products/${id}`}>
                                    <div className="bg-cover bg-center size-20 rounded mx-auto lg:mx-0" style={{ backgroundImage: `url(${images[0]})` }} />
                                    <div className="text-sm lg:text-base text-white mt-2 lg:mt-0 lg:ml-3 flex-1 text-center lg:text-left">{title}</div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </form>

            <div className="hidden lg:flex flex-col items-center custom-shadow">
                <Person className="text-2xl sm:text-3xl text-white hover:scale-150 duration-500 ease-in-out" onClick={handleClick} />
                <div className="font-bold text-lg sm:text-2xl text-white">{values.name}</div>
            </div>


            <div className="flex items-center space-x-2">

                <button
                    onClick={toggleMenu}
                    className="lg:hidden p-2 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Open menu"
                >
                    <List className="text-2xl sm:text-3xl text-white hover:scale-150 duration-500 ease-in-out" />
                </button>

                <div className="hidden lg:flex items-center space-x-4">

                    <Link to={ROUTES.FAVORITES}>
                        <div className="relative custom-shadow color-main">
                            <BagHeartFill className="text-2xl sm:text-3xl hover:text-[#00f5ff] hover:scale-150 duration-500 ease-in-out" />
                            <div className="rounded-full size-5 sm:size-6 absolute -top-4 -right-8 sm:-right-10 bg-cyan-800" style={{ display: favorites.length === 0 ? 'none' : 'block' }}>
                                {!!favorites.length && (<span className="count p-1 sm:p-1.5">{favorites.length}</span>)}
                            </div>
                        </div>
                    </Link>

                    <Link to={ROUTES.CART}>
                        <div className="relative custom-shadow color-main mx-10" ref={ref}>
                            <Cart3 className="text-2xl sm:text-3xl hover:text-[#00f5ff] hover:scale-150 duration-500 ease-in-out" />
                            <div className="rounded-full size-5 sm:size-6 absolute -top-4 -right-8 sm:-right-10 bg-cyan-800" style={{ display: cart.length === 0 ? 'none' : 'block' }}>
                                {!!cart.length && (<span className="count p-1 sm:p-1.5">{cart.length}</span>)}
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
