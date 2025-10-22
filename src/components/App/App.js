import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import AppRoutes from "../Routes/Routes";
import Error from "../Error/Error";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import Poster from "../Poster/Poster";
import UserForm from "../User/UserForm";

import { getCategories } from "../../features/categories/categoriseSlice";
import { getProducts } from "../../features/products/productsSlice";


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
    }, [dispatch])

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-slate-300 to-slate-800 min-h-screen">
            <Header />
            <UserForm />
            <div className="container grid grid-cols-4 gap-4">
                <Sidebar />
                <Poster />
                <ErrorBoundary FallbackComponent={Error}>
                    <AppRoutes />
                </ErrorBoundary >
            </div>
            <Footer />
        </div>
    )
}

export default App;