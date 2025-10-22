import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/users`, payload);
            return res.data;
        } catch (err) {

            return thunkAPI.rejectWithValue({
                message: err.response?.data?.message || err.message || 'Unknown error',
                status: err.response?.status || null,
            });
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, payload);
            const login = await axios(`${BASE_URL}/auth/profile`, {
                headers: {
                    "Authorization": `Bearer ${res.data.access_token}`
                }
            });
            return login.data;
        } catch (err) {
            return thunkAPI.rejectWithValue({
                message: err.response?.data?.message || err.message || 'Unknown error',
                status: err.response?.status || null,
            });
        }
    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue({
                message: err.response?.data?.message || err.message || 'Unknown error',
                status: err.response?.status || null,
            });
        }
    }
);


const addCurrentUser = (state, { payload }) => {
    state.currentUser = payload;
    state.favorites = payload.favorites || [];
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        cart: [],
        favorites: [],
        isLoading: false,
        formType: "signup",
        showForm: false,
        error: null,
    },
    reducers: {
        addItemToCart: (state, { payload }) => {
            let newCart = [...state.cart];
            const found = state.cart.find(({ id, size }) => id === payload.id && size === payload.size);

            if (found) {
                newCart = newCart.map((item) => {
                    return (item.id === payload.id && item.size === payload.size)
                        ? { ...item, quantity: payload.quantity || item.quantity + 1 } : item;
                })
            } else newCart.push({ ...payload, quantity: 1 });

            state.cart = newCart;
        },

        addItemToFavorites: (state, { payload }) => {
            const found = state.favorites.find(({ id }) => id === payload.id);
            if (!found) {
                state.favorites.push(payload);
            }
        },

        removeItemFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(({ id }) => id !== payload)
        },

        removeItemFromFavorites: (state, { payload }) => {
            state.favorites = state.favorites.filter(({ id }) => id !== payload);
        },

        toggleForm: (state, { payload }) => {
            state.showForm = payload;
        },

        toggleFormType: (state, { payload }) => {
            state.formType = payload;
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                addCurrentUser(state, { payload });
                state.error = null;
            })
            .addCase(createUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload.message;
            });


        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                addCurrentUser(state, { payload });
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload.message;
            });


        builder
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                addCurrentUser(state, { payload });
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload.message;
            });
    },

})

export const { addItemToCart, addItemToFavorites, toggleForm, toggleFormType, removeItemFromCart, removeItemFromFavorites } = userSlice.actions;
export default userSlice.reducer;

