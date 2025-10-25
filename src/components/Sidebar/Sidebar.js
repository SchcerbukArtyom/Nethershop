import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes";


const Sidebar = () => {
    const { list } = useSelector(({ categories }) => categories);


    return (
        <section className="hidden lg:block mt-3 bg-main-color rounded">
            <div className="p-2">
                <div className="text-white text-3xl font-semibold pb-3">CATEGORIES</div>
                <nav>
                    <ul className="text-white pb-3">
                        {list.slice(0, 5).map(({ id, name }) => (
                            <li key={id}>
                                <NavLink to={`/categories/${id}`}
                                    className={({ isActive }) =>
                                        `block text-xl transition-all duration-200 ${isActive ? "text-cyan-400" : "text-white hover:translate-x-2"
                                        }`
                                    }>{name}
                                </NavLink>
                            </li>
                        ))}

                    </ul>
                </nav>
                <div className="flex justify-between text-white">
                    <Link to={ROUTES.HELP} className="block hover:scale-110 transition-transform duration-200">
                        Help
                    </Link>
                    <Link to={ROUTES.TERMS} className="block hover:scale-110 transition-transform duration-200">
                        Terms & Conditions
                    </Link>
                </div>
            </div>
        </section>
    )
};

export default Sidebar;