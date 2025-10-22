import { ROUTES } from "../../utils/routes";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from 'react-bootstrap-icons';

import Logo from '../../resources/FullLogo_Transparent_NoBuffer.png'

const Footer = () => {
    return (
        <footer className="w-full max-w-md sm:max-w-none lg:max-w-12xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-8 bg-main-color py-4 sm:py-3 px-4 sm:px-6 lg:px-8 mt-5 relative hover:shadow-lg duration-300"
            role="contentinfo">
            <div className="custom-shadow">
                <Link to={ROUTES.HOME}>
                    <img src={Logo} alt="logo" className="w-20 sm:w-35 mx-auto hover:scale-105 duration-300 ease-in-out max-w-full" />
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