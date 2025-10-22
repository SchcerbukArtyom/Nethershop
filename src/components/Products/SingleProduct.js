import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/api/apiSlice";
import { useEffect } from "react";

import { ROUTES } from "../../utils/routes";
import Product from "./Product";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProducts } from "../../features/products/productsSlice";

const SingleProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isFetching, isError } = useGetProductQuery({ id });
    const { list, related } = useSelector(({ products }) => products);

    useEffect(() => {
        if (isError) {
            navigate(ROUTES.HOME);
        }
    }, [isError, navigate]);

    useEffect(() => {
        if (!data || !list.length) return;
        dispatch(getRelatedProducts(data.category.id));
    }, [data, dispatch, list.length]);

    if (isLoading || isFetching) {
        return <div>Loading product...</div>;
    }

    if (isError || !data) {
        return <div>Error loading product. Redirecting...</div>;
    }

    return (
        <div className="col-span-4">
            <Product {...data} />
            <Products products={related} amount={5} title="Related products" />
        </div>
    );
};

export default SingleProduct;
