import { useDispatch, useSelector } from "react-redux";

import { createSelector } from "@reduxjs/toolkit";

import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
import { useEffect } from "react";
import { filterByPrice } from "../../features/products/productsSlice";

const selectHomeData = createSelector(
    (state) => state.products || { list: [], filtered: [] },
    (state) => state.categories || { list: [] },
    (products, categories) => ({ products, categories })
);

const Home = () => {
    const dispatch = useDispatch();

    const { products, categories } = useSelector(selectHomeData);

    const { list, filtered } = products;
    const categoriesList = categories.list;


    useEffect(() => {
        if (!list.length) return;
        dispatch(filterByPrice(100));
    }, [dispatch, list.length]);

    return (
        <>
            <Products products={list} amount={14} title="Shop Now!" />
            <Categories products={categoriesList} amount={5} title="Worth seeing" />
            <Banner />
            <Products products={filtered} amount={5} title="Cost less than 100 $" />
        </>
    );
};

export default Home;