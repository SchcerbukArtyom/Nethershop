import { Routes, Route } from "react-router-dom";

import { ROUTES } from "../../utils/routes";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import SingleProduct from "../Products/SingleProduct";
import SingleCategory from "../Categories/SingleCategory";
import Cart from "../Cart/Cart";
import Favorites from "../Favorites/Favorites";
import Terms from "../Terms/Terms";
import Help from "../Help/Help";

const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
        <Route path={ROUTES.FAVORITES} element={<Favorites />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.TERMS} element={<Terms />} />
        <Route path={ROUTES.HELP} element={<Help />} />
    </Routes>
);

export default AppRoutes;