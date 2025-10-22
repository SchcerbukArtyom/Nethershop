import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

import categoriesSlice from "./categories/categoriseSlice";
import userSlice from "./user/userSlice";
import productsSlice from "./products/productsSlice";


export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
    devTools: true,
});