import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/authSlice";
import {productsApi} from "./api/productsApi";
import {productsReducer} from "./slices/productsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: productsReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;