import { useState } from "react"; 
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { BagHeartFill, Person, Cart3, X, House, Tag, ChevronDown, InfoSquare, ShieldCheck } from 'react-bootstrap-icons'; 
import { ROUTES } from "../../utils/routes";

const MobileMenu = ({ isOpen, onClose, cart, favorites, handleClick, values }) => {
    const { list } = useSelector(({ categories }) => categories);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); 

    const handleProfileClick = () => {
        handleClick(); 
        onClose();
    };

    const toggleCategories = () => {
        setIsCategoriesOpen(prev => !prev); 
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40 lg:hidden" onClick={onClose}>
            
            <div
                className={`bg-main-color text-white w-64 h-full fixed left-0 top-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                onClick={(e) => e.stopPropagation()} 
            >
                
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button onClick={onClose} className="p-2 rounded hover:bg-gray-700" aria-label="Close menu">
                        <X className="size-6" />
                    </button>
                </div>

                
                <nav className="p-4 space-y-4">
                    <Link to={ROUTES.HOME} className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700" onClick={onClose}>
                        <House className="size-6" />
                        <span className="text-lg">Main page</span>
                    </Link>

                    
                    <div className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 cursor-pointer" onClick={handleProfileClick}>
                        <Person className="size-6" />
                        <div className="flex-1">
                            <span className="text-lg">Profile</span>
                            <div className="font-bold text-sm">{values.name}</div>
                        </div>
                    </div>

                    
                    <Link to={ROUTES.FAVORITES} className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 relative" onClick={onClose}>
                        <BagHeartFill className="size-6" />
                        <span className="text-lg">Favorites</span>
                        {favorites.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-cyan-800 text-xs px-2 py-1 rounded-full min-w-[2rem] flex items-center justify-center">
                                {favorites.length}
                            </span>
                        )}
                    </Link>

                    
                    <Link to={ROUTES.CART} className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 relative" onClick={onClose}>
                        <Cart3 className="size-6" />
                        <span className="text-lg">Cart</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-cyan-800 text-xs px-2 py-1 rounded-full min-w-[2rem] flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                  
                    <div className="space-y-2">
                        <div 
                            className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 cursor-pointer" 
                            onClick={toggleCategories}
                        >
                            <Tag className="size-6" />
                            <span className="text-lg">Categories</span> 
                            <ChevronDown 
                                className={`size-4 ml-auto transition-transform duration-200 ${
                                    isCategoriesOpen ? 'rotate-180' : ''
                                }`} 
                            />
                        </div>

                        
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isCategoriesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <ul className="pl-8 space-y-2 pb-3 text-white">
                                {list.slice(0, 5).map(({ id, name }) => (
                                    <li key={id}>
                                        <NavLink 
                                            to={`/categories/${id}`}
                                            className={({ isActive }) =>
                                                `block text-lg transition-all duration-300 ${
                                                    isActive ? "text-cyan-400" : "text-white hover:translate-x-2"
                                                }`
                                            }
                                            onClick={onClose} 
                                        >
                                            {name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link to={ROUTES.HELP} className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 relative" onClick={onClose} >
                             <InfoSquare className="size-6" />
                             <span className="text-lg">Help</span>
                        </Link>
                        <Link to={ROUTES.TERMS} className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 relative" onClick={onClose} >
                             <ShieldCheck className="size-6" />
                             <span className="text-lg">Terms & Conditions</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;
