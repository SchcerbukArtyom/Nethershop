import { ROUTES } from "../../utils/routes";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from 'react-bootstrap-icons';

import Logo from '../../resources/FullLogo_Transparent_NoBuffer.png'

const Footer = () => {
    return (
        <footer className="flex items-center justify-around w-full z-50 bg-main-color py-2 mt-5"
            role="contentinfo">
            <div className="custom-shadow">
                <Link to={ROUTES.HOME}>
                    <img 
                        src={Logo} 
                        alt="logo" 
                        className="w-16 sm:w-32 mx-auto aspect-[3/1] max-w-full hover:scale-105 transition-transform duration-300 ease-in-out" 
                    />
                </Link>
            </div>

            <div className="hidden md:inline text-white">
                Developed by ME!
            </div>

            <div className="flex flex-row custom-shadow">
                <a className="flex flex-col items-center hover:scale-110 duration-400 ease-in-out pr-2" href="/">
                    <Instagram className="text-xl text-white sm:text-3xl mx-auto hover:scale-105 duration-300 ease-in-out max-w-full hover:text-purple-700" />
                    <p className="text-sm text-white">Instagram</p>
                </a>

                <a className="flex flex-col items-center hover:scale-110 duration-400 ease-in-out pr-2" href="/">
                    <Facebook className="text-xl text-white sm:text-3xl mx-auto hover:scale-105 duration-300 ease-in-out max-w-full hover:text-blue-500" />
                    <p className="text-sm text-white">Facebook</p>
                </a>

                <a className="flex flex-col items-center hover:scale-110 duration-400 ease-in-out" href="/">
                    <Youtube className="text-xl text-white sm:text-3xl mx-auto hover:scale-105 duration-300 ease-in-out max-w-full hover:text-red-800" />
                    <p className="text-sm text-white">Youtube</p>
                </a>

            </div >

        </ footer>
    )
};

export default Footer;